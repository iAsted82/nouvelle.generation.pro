import React from 'react';
import Logo from './Logo';

interface PDFHeaderProps {
  documentTitle: string;
  documentDate?: string;
  showContactInfo?: boolean;
}

const PDFHeader: React.FC<PDFHeaderProps> = ({ 
  documentTitle, 
  documentDate = new Date().toLocaleDateString('fr-FR'),
  showContactInfo = true 
}) => {
  return (
    <div className="pdf-header border-b-2 border-blue-600 pb-6 mb-8">
      <div className="flex items-start justify-between">
        {/* Logo et informations école */}
        <div className="flex items-center space-x-4">
          <Logo variant="default" size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">NOUVELLE GÉNÉRATION PRO</h1>
            <p className="text-orange-500 font-semibold">École Maternelle d'Excellence</p>
            {showContactInfo && (
              <div className="mt-2 text-sm text-gray-600">
                <p>📍 Résidence Essafa 4, Salé</p>
                <p>📞 05 37 00 00 00 • ✉️ info@nouvellegenerationpro.ma</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Informations document */}
        <div className="text-right text-sm text-gray-600">
          <p className="font-semibold">{documentDate}</p>
          <p>Document officiel</p>
        </div>
      </div>
      
      {/* Titre du document */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold text-blue-600 uppercase tracking-wide">
          {documentTitle}
        </h2>
      </div>
    </div>
  );
};

export default PDFHeader;