import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Star, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  GraduationCap,
  Heart,
  Shield,
  Award,
  BookOpen,
  Palette,
  Music,
  Globe,
  Baby,
  CheckCircle,
  AlertCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  PlayCircle,
  Eye,
  Camera,
  MessageSquare,
  Calendar as CalendarIcon,
  FileText,
  CreditCard,
  Sparkles,
  TrendingUp,
  Building,
  UserPlus,
  User
} from 'lucide-react';
import { languageService } from './services/languageService';
import { currencyService } from './services/currencyService';
import LanguageSelector from './components/LanguageSelector';
import CurrencySelector from './components/CurrencySelector';
import AdminAuth from './components/AdminAuth';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  
  const { t, currentLanguage, setLanguage } = languageService;
  const { currentCurrency, setCurrency } = currencyService;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Main content would go here */}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">
                  © 2025 {t('school.name', 'Nouvelle Génération Pro')}. {t('footer.rights', 'Tous droits réservés.')}
                </p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-white transition-colors">{t('footer.privacy', 'Politique de confidentialité')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('footer.terms', 'Conditions d\'utilisation')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('footer.legal', 'Mentions légales')}</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Admin Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t('admin.access', 'Accès Administration')}</h3>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AdminAuth />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;