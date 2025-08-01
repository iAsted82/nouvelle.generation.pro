import { useState, useEffect } from 'react';

export interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  canInstall: boolean;
  showInstallPrompt: boolean;
}

export const usePWA = () => {
  const [pwaState, setPWAState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: !navigator.onLine,
    platform: 'unknown',
    canInstall: false,
    showInstallPrompt: false
  });

  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);

  // Detect platform
  const detectPlatform = (): PWAState['platform'] => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    } else if (/android/.test(userAgent)) {
      return 'android';
    } else if (/windows|macintosh|linux/.test(userAgent)) {
      return 'desktop';
    }
    
    return 'unknown';
  };

  // Check if app is installed
  const checkIfInstalled = (): boolean => {
    // For iOS
    if ('standalone' in window.navigator && (window.navigator as any).standalone) {
      return true;
    }
    
    // For Android and Desktop
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    
    // Check if launched from home screen
    if (document.referrer.includes('android-app://')) {
      return true;
    }
    
    return false;
  };

  // Should show install prompt
  const shouldShowInstallPrompt = (): boolean => {
    const visitCount = parseInt(localStorage.getItem('pwa-visit-count') || '0');
    const lastPromptDate = localStorage.getItem('pwa-last-prompt');
    const userDismissed = localStorage.getItem('pwa-user-dismissed');
    
    // Don't show if user already dismissed
    if (userDismissed === 'true') return false;
    
    // Show after 3 visits
    if (visitCount < 3) return false;
    
    // Don't show more than once per week
    if (lastPromptDate) {
      const daysSinceLastPrompt = (Date.now() - parseInt(lastPromptDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceLastPrompt < 7) return false;
    }
    
    return true;
  };

  // Install the PWA
  const installPWA = async (): Promise<boolean> => {
    try {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed successfully');
          setDeferredPrompt(null);
          setPWAState(prev => ({ ...prev, isInstalled: true, showInstallPrompt: false }));
          localStorage.setItem('pwa-installed', 'true');
          return true;
        } else {
          console.log('PWA installation dismissed');
          localStorage.setItem('pwa-user-dismissed', 'true');
          setPWAState(prev => ({ ...prev, showInstallPrompt: false }));
          return false;
        }
      }
      
      // For iOS, show manual installation instructions
      if (pwaState.platform === 'ios') {
        setPWAState(prev => ({ ...prev, showInstallPrompt: true }));
        return false;
      }
      
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  // Dismiss install prompt
  const dismissInstallPrompt = () => {
    localStorage.setItem('pwa-user-dismissed', 'true');
    localStorage.setItem('pwa-last-prompt', Date.now().toString());
    setPWAState(prev => ({ ...prev, showInstallPrompt: false }));
  };

  // Check for updates
  const checkForUpdates = async (): Promise<boolean> => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        return registration.waiting !== null;
      }
    }
    return false;
  };

  // Apply update
  const applyUpdate = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const platform = detectPlatform();
    const isInstalled = checkIfInstalled();
    
    // Update visit count
    const visitCount = parseInt(localStorage.getItem('pwa-visit-count') || '0');
    localStorage.setItem('pwa-visit-count', (visitCount + 1).toString());

    setPWAState(prev => ({
      ...prev,
      platform,
      isInstalled,
      showInstallPrompt: !isInstalled && shouldShowInstallPrompt()
    }));

    // Listen for beforeinstallprompt event (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installPrompt = e as any as PWAInstallPrompt;
      setDeferredPrompt(installPrompt);
      
      setPWAState(prev => ({
        ...prev,
        isInstallable: true,
        canInstall: true
      }));
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setPWAState(prev => ({
        ...prev,
        isInstalled: true,
        showInstallPrompt: false
      }));
      localStorage.setItem('pwa-installed', 'true');
      setDeferredPrompt(null);
    };

    // Listen for online/offline events
    const handleOnline = () => {
      setPWAState(prev => ({ ...prev, isOffline: false }));
    };

    const handleOffline = () => {
      setPWAState(prev => ({ ...prev, isOffline: true }));
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    ...pwaState,
    installPWA,
    dismissInstallPrompt,
    checkForUpdates,
    applyUpdate
  };
};