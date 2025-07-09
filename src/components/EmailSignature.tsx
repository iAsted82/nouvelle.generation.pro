import React from 'react';
import Logo from './Logo';

interface EmailSignatureProps {
  name: string;
  title: string;
  phone?: string;
  email?: string;
}

const EmailSignature: React.FC<EmailSignatureProps> = ({ 
  name, 
  title, 
  phone = "05 37 00 00 00", 
  email = "info@nouvellegenerationpro.ma" 
}) => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '14px', 
      lineHeight: '1.4',
      maxWidth: '400px',
      borderTop: '2px solid #3B82F6',
      paddingTop: '15px',
      marginTop: '20px'
    }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
        <tr>
          <td style={{ verticalAlign: 'top', paddingRight: '15px' }}>
            <div style={{ width: '60px', height: '60px' }}>
              <Logo variant="default" size="md" />
            </div>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#1F2937', fontSize: '16px' }}>{name}</strong>
              <br />
              <span style={{ color: '#6B7280', fontSize: '13px' }}>{title}</span>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#3B82F6', fontSize: '15px' }}>NOUVELLE GÉNÉRATION PRO</strong>
              <br />
              <span style={{ color: '#F97316', fontSize: '12px', fontWeight: 'bold' }}>École Maternelle d'Excellence</span>
            </div>
            
            <div style={{ fontSize: '12px', color: '#4B5563' }}>
              <div style={{ marginBottom: '3px' }}>
                📞 <a href={`tel:${phone}`} style={{ color: '#3B82F6', textDecoration: 'none' }}>{phone}</a>
              </div>
              <div style={{ marginBottom: '3px' }}>
                ✉️ <a href={`mailto:${email}`} style={{ color: '#3B82F6', textDecoration: 'none' }}>{email}</a>
              </div>
              <div style={{ marginBottom: '3px' }}>
                📍 Résidence Essafa 4, Salé
              </div>
              <div style={{ color: '#10B981', fontSize: '11px', fontWeight: 'bold' }}>
                Inscriptions 2025-2026 ouvertes !
              </div>
            </div>
          </td>
        </tr>
      </table>
      
      <div style={{ 
        marginTop: '12px', 
        paddingTop: '8px', 
        borderTop: '1px solid #E5E7EB',
        fontSize: '10px',
        color: '#9CA3AF'
      }}>
        Éducation bilingue • Valeurs culturelles marocaines • Classes réduites
      </div>
    </div>
  );
};

export default EmailSignature;