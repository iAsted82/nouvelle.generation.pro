import React, { useState } from 'react';
import { X, Download, Share, Plus, ArrowUp, Smartphone, Monitor } from 'lucide-react';

interface InstallPromptProps {
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  onInstall: () => Promise<boolean>;
  onDismiss: () => void;
  canInstall: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({
  platform,
  onInstall,
  onDismiss,
  canInstall
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    if (platform === 'ios' || !canInstall) {
      setShowInstructions(true);
      return;
    }

    setIsInstalling(true);
    try {
      await onInstall();
    } finally {
      setIsInstalling(false);
    }
  };

  const renderInstructions = () => {
    switch (platform) {
      case 'ios':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Installer sur iOS</h3>
              <p className="text-blue-100 text-sm mt-2">
                Ajoutez NGP École à votre écran d'accueil
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Appuyez sur le bouton Partager</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Share className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">en bas de Safari</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Sélectionnez "Sur l'écran d'accueil"</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Ajouter à l'écran d'accueil</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Confirmez l'ajout</p>
                  <p className="text-sm text-gray-600 mt-1">
                    L'application apparaîtra sur votre écran d'accueil
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex space-x-3">
              <button
                onClick={() => setShowInstructions(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Compris
              </button>
              <button
                onClick={onDismiss}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        );

      case 'android':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Installer sur Android</h3>
              <p className="text-green-100 text-sm mt-2">
                Installez l'application NGP École
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Appuyez sur "Ajouter à l'écran d'accueil"</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Dans le menu de Chrome ou la notification
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Confirmez l'installation</p>
                  <p className="text-sm text-gray-600 mt-1">
                    L'app sera téléchargée et installée
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex space-x-3">
              <button
                onClick={() => setShowInstructions(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Compris
              </button>
              <button
                onClick={onDismiss}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        );

      case 'desktop':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
              <Monitor className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Installer sur Bureau</h3>
              <p className="text-purple-100 text-sm mt-2">
                Accédez rapidement à NGP École
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Cherchez l'icône d'installation</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Dans la barre d'adresse de votre navigateur
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Cliquez sur "Installer"</p>
                  <p className="text-sm text-gray-600 mt-1">
                    L'application s'ouvrira dans sa propre fenêtre
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex space-x-3">
              <button
                onClick={() => setShowInstructions(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Compris
              </button>
              <button
                onClick={onDismiss}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowInstructions(false)}
            className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          {renderInstructions()}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-40 animate-slideUp">
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <img 
            src="/logo-ngp.png" 
            alt="NGP" 
            className="w-8 h-8 object-contain"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            Installer NGP École
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Accédez rapidement à l'école depuis votre écran d'accueil. 
            Notifications, mode hors-ligne et navigation rapide.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {isInstalling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Installation...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Installer</span>
                </>
              )}
            </button>
            
            <button
              onClick={onDismiss}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;