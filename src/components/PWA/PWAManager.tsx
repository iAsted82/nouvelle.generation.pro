import React, { useState, useEffect } from 'react';
import { usePWA } from '../../hooks/usePWA';
import InstallPrompt from './InstallPrompt';
import OfflineIndicator from './OfflineIndicator';
import UpdatePrompt from './UpdatePrompt';

const PWAManager: React.FC = () => {
  const {
    showInstallPrompt,
    isOffline,
    platform,
    canInstall,
    installPWA,
    dismissInstallPrompt,
    checkForUpdates,
    applyUpdate
  } = usePWA();

  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  // Check for updates periodically
  useEffect(() => {
    const checkUpdates = async () => {
      const hasUpdate = await checkForUpdates();
      if (hasUpdate) {
        setShowUpdatePrompt(true);
      }
    };

    // Check immediately and then every 30 minutes
    checkUpdates();
    const interval = setInterval(checkUpdates, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkForUpdates]);

  const handleUpdate = async () => {
    await applyUpdate();
    setShowUpdatePrompt(false);
  };

  const handleUpdateDismiss = () => {
    setShowUpdatePrompt(false);
    // Check again in 1 hour
    setTimeout(() => setShowUpdatePrompt(true), 60 * 60 * 1000);
  };

  return (
    <>
      {/* Install Prompt */}
      {showInstallPrompt && (
        <InstallPrompt
          platform={platform}
          onInstall={installPWA}
          onDismiss={dismissInstallPrompt}
          canInstall={canInstall}
        />
      )}

      {/* Offline Indicator */}
      <OfflineIndicator isOffline={isOffline} />

      {/* Update Prompt */}
      {showUpdatePrompt && (
        <UpdatePrompt
          onUpdate={handleUpdate}
          onDismiss={handleUpdateDismiss}
        />
      )}
    </>
  );
};

export default PWAManager;