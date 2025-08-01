import React from 'react';
import { RefreshCw, X } from 'lucide-react';

interface UpdatePromptProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onUpdate, onDismiss }) => {
  return (
    <div className="fixed top-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-2xl p-4 z-50 animate-slideDown">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              Mise à jour disponible
            </h3>
            <p className="text-blue-100 text-sm mb-3">
              Une nouvelle version de l'application est disponible avec des améliorations et corrections.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={onUpdate}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Mettre à jour</span>
              </button>
              
              <button
                onClick={onDismiss}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UpdatePrompt;