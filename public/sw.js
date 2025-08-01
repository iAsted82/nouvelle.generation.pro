const CACHE_NAME = 'ngp-pwa-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-ngp.png',
  // Add critical CSS and JS files here when available
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
  '/api/',
  '/.netlify/functions/',
];

// Cache-first resources (images, fonts, static assets)
const CACHE_FIRST = [
  '/logo-ngp.png',
  '/images/',
  '/fonts/',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and moz-extension requests
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }

  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Network-first strategy for API calls
    if (NETWORK_FIRST.some(path => url.pathname.startsWith(path))) {
      return await networkFirst(request);
    }
    
    // Cache-first strategy for static assets
    if (CACHE_FIRST.some(ext => url.pathname.includes(ext))) {
      return await cacheFirst(request);
    }
    
    // Stale-while-revalidate for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
      return await staleWhileRevalidate(request);
    }
    
    // Default: network-first
    return await networkFirst(request);
    
  } catch (error) {
    console.error('[SW] Error handling request:', error);
    return await fallbackResponse(request);
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache-first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first failed:', error);
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);
  
  return cachedResponse || networkResponsePromise;
}

// Fallback response for offline scenarios
async function fallbackResponse(request) {
  const url = new URL(request.url);
  
  // Return cached page or offline page for HTML requests
  if (request.headers.get('accept').includes('text/html')) {
    const cachedResponse = await caches.match('/');
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hors ligne - Nouvelle Génération Pro</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 20px;
          }
          .container {
            max-width: 400px;
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
          }
          h1 { margin-bottom: 20px; }
          p { margin-bottom: 30px; opacity: 0.9; }
          button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
          }
          button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌐 Mode Hors Ligne</h1>
          <p>Vous êtes actuellement hors ligne. L'application fonctionne en mode limité avec les données mises en cache.</p>
          <button onclick="window.location.reload()">Réessayer</button>
        </div>
      </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Return 404 for other requests
  return new Response('Not Found', { status: 404 });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-registration') {
    event.waitUntil(syncRegistrations());
  }
  
  if (event.tag === 'background-sync-contact') {
    event.waitUntil(syncContactForms());
  }
});

async function syncRegistrations() {
  try {
    // Get pending registrations from IndexedDB
    const pendingRegistrations = await getPendingRegistrations();
    
    for (const registration of pendingRegistrations) {
      try {
        await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registration.data)
        });
        
        // Remove from pending after successful sync
        await removePendingRegistration(registration.id);
        
      } catch (error) {
        console.error('[SW] Failed to sync registration:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Error in syncRegistrations:', error);
  }
}

async function syncContactForms() {
  try {
    const pendingContacts = await getPendingContacts();
    
    for (const contact of pendingContacts) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact.data)
        });
        
        await removePendingContact(contact.id);
        
      } catch (error) {
        console.error('[SW] Failed to sync contact:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Error in syncContactForms:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    title: 'Nouvelle Génération Pro',
    body: 'Vous avez reçu une nouvelle notification de l\'école.',
    icon: '/logo-ngp.png',
    badge: '/logo-ngp.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir',
        icon: '/logo-ngp.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/logo-ngp.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.title = data.title || options.title;
    options.body = data.body || options.body;
  }
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Helper functions for IndexedDB operations
async function getPendingRegistrations() {
  // Implementation would use IndexedDB
  return [];
}

async function removePendingRegistration(id) {
  // Implementation would use IndexedDB
  console.log('[SW] Removing pending registration:', id);
}

async function getPendingContacts() {
  // Implementation would use IndexedDB
  return [];
}

async function removePendingContact(id) {
  // Implementation would use IndexedDB
  console.log('[SW] Removing pending contact:', id);
}

// Update notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});