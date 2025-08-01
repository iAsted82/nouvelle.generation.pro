import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOffline }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (isOffline && !wasOffline) {
      // Just went offline
      setShowNotification(true);
      setWasOffline(true);
      
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else if (!isOffline && wasOffline) {
      // Just came back online
      setShowNotification(true);
      setWasOffline(false);
      
      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOffline, wasOffline]);

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
        isOffline 
          ? 'bg-orange-500 text-white' 
          : 'bg-green-500 text-white'
      }`}>
        {isOffline ? (
          <>
            <WifiOff className="w-5 h-5" />
            <div>
              <p className="font-medium">Mode Hors Ligne</p>
              <p className="text-sm opacity-90">
                Fonctionnement limité avec les données en cache
              </p>
            </div>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Connexion Rétablie</p>
              <p className="text-sm opacity-90">
                Toutes les fonctionnalités sont disponibles
              </p>
            </div>
          </>
        )}
        
        <button
          onClick={() => setShowNotification(false)}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OfflineIndicator;