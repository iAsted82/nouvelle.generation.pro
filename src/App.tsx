import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Calendar, 
  MessageSquare, 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Shield, 
  Award, 
  Users, 
  BookOpen, 
  Heart, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe,
  Baby,
  GraduationCap,
  Target,
  Zap,
  Settings,
  LogIn,
  UserPlus,
  MessageCircle,
  Palette,
  Send
} from 'lucide-react';
import PWAManager from './components/PWA/PWAManager';
import AdminAuth from './components/AdminAuth';
import FormManager from './components/Forms/FormManager';
import LanguageSelector from './components/LanguageSelector';
import CurrencySelector from './components/CurrencySelector';
import { languageService } from './services/languageService';

type Section = 'home' | 'services' | 'inscription' | 'contact' | 'about' | 'admin' | 'forms';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate gallery images
  useEffect(() => {
    const images = [
      '/istockphoto-952059200-1024x1024.jpg',
      '/istockphoto-1044045462-1024x1024.jpg',
      '/istockphoto-1458807880-1024x1024.jpg',
      '/istockphoto-1500447955-1024x1024.jpg'
    ];

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  const handleSectionChange = async (section: Section) => {
    setIsLoading(true);
    setCurrentSection(section);
    setIsMenuOpen(false);
    
    // Simulate loading for smooth transition
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert(t('contact.success', 'Message envoyé avec succès !'));
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert(t('contact.error', 'Erreur lors de l\'envoi du message'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'inscription':
        handleSectionChange('inscription');
        break;
      case 'contact':
        handleSectionChange('contact');
        break;
      case 'appointment':
        // Open appointment modal or redirect
        window.location.href = '/?action=appointment';
        break;
      case 'call':
        window.location.href = 'tel:+212537865581';
        break;
      case 'email':
        window.location.href = 'mailto:periscolaire@nouvellegeneration.pro';
        break;
      case 'whatsapp':
        window.open('https://wa.me/212537865581', '_blank');
        break;
      default:
        console.log('Action not implemented:', action);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const images = [
    '/istockphoto-952059200-1024x1024.jpg',
    '/istockphoto-1044045462-1024x1024.jpg',
    '/istockphoto-1458807880-1024x1024.jpg',
    '/istockphoto-1500447955-1024x1024.jpg'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (currentSection === 'admin') {
    return <AdminAuth />;
  }

  if (currentSection === 'forms') {
    return (
      <div>
        <FormManager />
        <button
          onClick={() => handleSectionChange('home')}
          className="fixed top-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/60"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                      Nouvelle Génération Pro
                    </h1>
                    <h2 className="text-xl lg:text-2xl text-gray-700 mb-6">
                      École Maternelle d'Excellence à Salé
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Offrez à votre enfant un environnement d'apprentissage moderne avec des méthodes pédagogiques innovantes et un encadrement personnalisé. Notre équipe pédagogique expérimentée accompagne chaque enfant dans son développement global.
                    </p>
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-8">
                      <p className="text-green-800 font-semibold">📅 Inscriptions ouvertes toute l'année</p>
                      <p className="text-green-700 text-sm">🎯 Places limitées - Réservez dès maintenant</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleQuickAction('inscription')}
                        disabled={isLoading}
                        className="btn-hover bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        Inscrire Mon Enfant
                      </button>
                      <button
                        onClick={() => handleQuickAction('contact')}
                        disabled={isLoading}
                        className="btn-hover bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 disabled:opacity-50"
                      >
                        📞 Nous Contacter
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={() => handleQuickAction('call')}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Appeler</span>
                      </button>
                      <button
                        onClick={() => handleQuickAction('email')}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </button>
                      <button
                        onClick={() => handleQuickAction('whatsapp')}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                      <img 
                        src="https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg" 
                        alt="École Nouvelle Génération Pro - Enfants heureux" 
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Pourquoi Choisir NGP ?</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Méthodes pédagogiques modernes et adaptées</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Encadrement par une équipe qualifiée</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Suivi individualisé de chaque enfant</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Activités créatives et éducatives</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Environnement sécurisé et stimulant</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">150+</div>
                    <div className="text-gray-600">{t('stats.students', 'Élèves')}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">15+</div>
                    <div className="text-gray-600">{t('stats.experience', 'Ans d\'Expérience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">20+</div>
                    <div className="text-gray-600">{t('stats.teachers', 'Enseignants')}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">98%</div>
                    <div className="text-gray-600">{t('stats.satisfaction', 'Satisfaction')}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Services d'Excellence</h2>
                  <p className="text-xl text-gray-600">Un accompagnement complet pour le développement optimal de votre enfant</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Programme Pédagogique</h3>
                    <p className="text-gray-600">
                      Méthodes d'apprentissage modernes basées sur le jeu et l'éveil sensoriel. 
                      Développement des compétences linguistiques, mathématiques et artistiques.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>• Apprentissage du français et de l'arabe</li>
                      <li>• Initiation aux mathématiques ludiques</li>
                      <li>• Éveil artistique et musical</li>
                    </ul>
                  </div>
                  
                  <div className="card-hover bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Encadrement Expert</h3>
                    <p className="text-gray-600">
                      Équipe pédagogique qualifiée et expérimentée. Ratio éducateur/enfants optimal 
                      pour un suivi personnalisé et un accompagnement bienveillant.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>• Éducatrices diplômées</li>
                      <li>• Suivi psycho-pédagogique</li>
                      <li>• Communication régulière avec les parents</li>
                    </ul>
                  </div>
                  
                  <div className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Activités d'Éveil</h3>
                    <p className="text-gray-600">
                      Large gamme d'activités créatives et sportives adaptées à l'âge. 
                      Développement de la motricité, de la créativité et de l'esprit d'équipe.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>• Ateliers créatifs et manuels</li>
                      <li>• Activités sportives adaptées</li>
                      <li>• Sorties pédagogiques</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    {t('gallery.title', 'Notre École en Images')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('gallery.subtitle', 'Découvrez nos espaces modernes et notre environnement d\'apprentissage')}
                  </p>
                </div>

                <div className="relative">
                  <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={images[currentImageIndex]}
                      alt={t('gallery.alt', 'École Nouvelle Génération Pro')}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30"></div>
                    
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex justify-center mt-6 space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-blue-600 scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Notre Mission</h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Chez <strong>Nouvelle Génération Pro</strong>, nous nous engageons à offrir une éducation préscolaire 
                      de qualité exceptionnelle. Notre école maternelle, située dans la résidence Essafa 4 à Salé, 
                      accueille les enfants de 3 à 6 ans dans un environnement sécurisé et stimulant.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                      Notre approche pédagogique moderne combine les meilleures pratiques éducatives internationales 
                      avec les valeurs culturelles marocaines, préparant ainsi nos petits élèves à un avenir brillant.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Excellence Pédagogique</h4>
                          <p className="text-gray-600 text-sm">Programmes adaptés au développement de l'enfant</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Environnement Sécurisé</h4>
                          <p className="text-gray-600 text-sm">Locaux modernes et sécurisés avec espaces adaptés</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Suivi Personnalisé</h4>
                          <p className="text-gray-600 text-sm">Accompagnement individuel de chaque enfant</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                      <img 
                        src="https://images.pexels.com/photos/8613200/pexels-photo-8613200.jpeg" 
                        alt="Enfants en activité pédagogique" 
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Nos Valeurs</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Respect et bienveillance</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Innovation pédagogique</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Épanouissement de l'enfant</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Prêt à Offrir le Meilleur à Votre Enfant ?</h2>
                <p className="text-xl text-blue-100 mb-8">Rejoignez notre communauté éducative d'excellence dès aujourd'hui</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleQuickAction('inscription')}
                    disabled={isLoading}
                    className="btn-hover bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    📋 Demande d'Inscription
                  </button>
                  <button
                    onClick={() => handleQuickAction('contact')}
                    disabled={isLoading}
                    className="btn-hover bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 disabled:opacity-50"
                  >
                    📞 Prendre Rendez-vous
                  </button>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Contactez-nous</h2>
                  <p className="text-xl text-gray-600">Nous sommes là pour répondre à toutes vos questions</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800">Informations de Contact</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Téléphone</h4>
                          <p className="text-gray-600">+212 5 37 86 55 81</p>
                          <p className="text-sm text-gray-500">Lundi - Vendredi : 8h00 - 17h00</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Email</h4>
                          <p className="text-gray-600">periscolaire@nouvellegeneration.pro</p>
                          <p className="text-sm text-gray-500">Réponse sous 24h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Adresse</h4>
                          <p className="text-gray-600">Résidence Essafa 4, Salé</p>
                          <p className="text-sm text-gray-500">Maroc</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">🏫 Horaires d'Ouverture</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><strong>Lundi - Vendredi :</strong> 8h00 - 17h00</p>
                          <p><strong>Samedi :</strong> 8h00 - 12h00</p>
                          <p><strong>Dimanche :</strong> Fermé</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un Message</h3>
                    
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Votre nom complet"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input 
                          type="tel" 
                          placeholder="06 12 34 56 78"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sujet *</label>
                        <select 
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Choisissez un sujet</option>
                          <option value="inscription">Demande d'inscription</option>
                          <option value="information">Demande d'information</option>
                          <option value="visite">Visite de l'école</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea 
                          required 
                          rows={4} 
                          placeholder="Décrivez votre demande..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Envoyer le Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'services':
        return (
          <div className="min-h-screen py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {t('services.page.title', 'Nos Services d\'Excellence')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('services.page.subtitle', 'Un accompagnement complet pour chaque enfant')}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <GraduationCap className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {t('services.levels.title', 'Niveaux Scolaires')}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{t('services.levels.petite', 'Petite Section (3-4 ans)')}</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{t('services.levels.moyenne', 'Moyenne Section (4-5 ans)')}</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{t('services.levels.grande', 'Grande Section (5-6 ans)')}</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleQuickAction('inscription')}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>{t('common.register', 'S\'inscrire')}</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {t('services.schedule.title', 'Horaires')}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center justify-between">
                      <span>{t('schedule.monday_friday', 'Lundi - Vendredi')}</span>
                      <span className="font-semibold">8h00 - 17h00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t('schedule.saturday', 'Samedi')}</span>
                      <span className="font-semibold">8h00 - 12h00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t('schedule.sunday', 'Dimanche')}</span>
                      <span className="font-semibold text-red-600">{t('schedule.closed', 'Fermé')}</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleQuickAction('appointment')}
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{t('cta.appointment', 'Prendre RDV')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inscription':
        return (
          <div className="min-h-screen py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {t('inscription.title', 'Inscription 2025-2026')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('inscription.subtitle', 'Rejoignez notre école d\'excellence')}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {t('inscription.step1', '1. Créer un Compte')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('inscription.step1_desc', 'Créez votre compte parent')}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Baby className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {t('inscription.step2', '2. Inscrire l\'Enfant')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('inscription.step2_desc', 'Remplissez le dossier d\'inscription')}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {t('inscription.step3', '3. Validation')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('inscription.step3_desc', 'Confirmation sous 48h')}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => handleSectionChange('forms')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 btn-hover flex items-center justify-center space-x-2 mx-auto"
                  >
                    <UserPlus className="w-6 h-6" />
                    <span>{t('inscription.start', 'Commencer l\'Inscription')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {t('contact.title', 'Contactez-nous')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('contact.subtitle', 'Nous sommes là pour répondre à toutes vos questions')}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {t('contact.form.title', 'Envoyez-nous un message')}
                  </h2>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.name', 'Nom complet')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder={t('contact.form.name_placeholder', 'Votre nom complet')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.email', 'Email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder={t('contact.form.email_placeholder', 'votre@email.com')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.message', 'Message')} *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder={t('contact.form.message_placeholder', 'Votre message...')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t('common.sending', 'Envoi en cours...')}</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>{t('contact.form.send', 'Envoyer le message')}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="space-y-8">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      {t('contact.info.title', 'Informations de contact')}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {t('contact.phone', 'Téléphone')}
                          </h4>
                          <button 
                            onClick={() => handleQuickAction('call')}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            +212 5 37 86 55 81
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {t('contact.email', 'Email')}
                          </h4>
                          <button 
                            onClick={() => handleQuickAction('email')}
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            periscolaire@nouvellegeneration.pro
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {t('contact.address', 'Adresse')}
                          </h4>
                          <p className="text-gray-600">
                            {t('school.location', 'Résidence Essafa 4, Salé')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">
                      {t('contact.urgent.title', 'Besoin Urgent ?')}
                    </h3>
                    <p className="mb-6 text-blue-100">
                      {t('contact.urgent.subtitle', 'Contactez-nous directement pour une réponse rapide')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => handleQuickAction('call')}
                        className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-5 h-5" />
                        <span>{t('common.call', 'Appeler')}</span>
                      </button>
                      <button 
                        onClick={() => handleQuickAction('whatsapp')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="min-h-screen py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {t('about.title', 'À Propos de Nous')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('about.subtitle', 'Notre histoire et nos valeurs')}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                      {t('about.mission.title', 'Notre Mission')}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t('about.mission.text', 'Chez Nouvelle Génération Pro, nous nous engageons à offrir une éducation de qualité supérieure qui prépare nos jeunes élèves à un avenir brillant. Notre approche pédagogique innovante combine les meilleures pratiques éducatives avec un environnement stimulant et bienveillant.')}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="text-gray-700">{t('about.values.excellence', 'Excellence pédagogique')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="text-gray-700">{t('about.values.innovation', 'Innovation éducative')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="text-gray-700">{t('about.values.care', 'Encadrement personnalisé')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/istockphoto-1458807880-1024x1024.jpg"
                      alt={t('about.image.alt', 'Notre équipe pédagogique')}
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white" dir={languageService.isRTL() ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button 
              onClick={() => handleSectionChange('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo-ngp.png" 
                alt="Logo Nouvelle Génération Pro" 
                className="w-12 h-12 object-contain school-logo"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">
                  {t('school.name', 'Nouvelle Génération Pro')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('school.subtitle', 'École Maternelle d\'Excellence')}
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => handleSectionChange('home')}
                className={`header-nav-link ${currentSection === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
              >
                {t('nav.home', 'Accueil')}
              </button>
              <button 
                onClick={() => handleSectionChange('services')}
                className={`header-nav-link ${currentSection === 'services' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
              >
                {t('nav.services', 'Services')}
              </button>
              <button 
                onClick={() => handleSectionChange('inscription')}
                className={`header-nav-link ${currentSection === 'inscription' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
              >
                {t('nav.inscription', 'Inscription')}
              </button>
              <button 
                onClick={() => handleSectionChange('contact')}
                className={`header-nav-link ${currentSection === 'contact' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
              >
                {t('nav.contact', 'Contact')}
              </button>
              <button 
                onClick={() => handleSectionChange('about')}
                className={`header-nav-link ${currentSection === 'about' ? 'text-blue-600 font-semibent' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
              >
                {t('nav.about', 'À Propos')}
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector variant="compact" />
              
              {/* Currency Selector */}
              <CurrencySelector variant="compact" />
              
              {/* Quick Actions */}
              <div className="hidden sm:flex items-center space-x-2">
                <button 
                  onClick={() => handleQuickAction('call')}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title={t('common.call', 'Appeler')}
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleQuickAction('email')}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                  title={t('common.email', 'Email')}
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>

              {/* Admin Access */}
              <button 
                onClick={() => handleSectionChange('admin')}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                title={t('nav.admin', 'Administration')}
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 mobile-menu-slide-enter">
            <div className="px-4 py-4 space-y-2">
              <button 
                onClick={() => handleSectionChange('home')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentSection === 'home' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.home', 'Accueil')}
              </button>
              <button 
                onClick={() => handleSectionChange('services')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentSection === 'services' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.services', 'Services')}
              </button>
              <button 
                onClick={() => handleSectionChange('inscription')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentSection === 'inscription' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.inscription', 'Inscription')}
              </button>
              <button 
                onClick={() => handleSectionChange('contact')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentSection === 'contact' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.contact', 'Contact')}
              </button>
              <button 
                onClick={() => handleSectionChange('about')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentSection === 'about' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.about', 'À Propos')}
              </button>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex space-x-4 px-4">
                  <button 
                    onClick={() => handleQuickAction('call')}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{t('common.call', 'Appeler')}</span>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('inscription')}
                    className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>{t('common.register', 'S\'inscrire')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">{t('common.loading', 'Chargement...')}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen">
        {renderContent()}
      </main>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('video.coming_soon', 'Vidéo de présentation')}
              </h3>
              <p className="text-gray-300">
                {t('video.description', 'Découvrez notre école à travers cette vidéo de présentation détaillée.')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 btn-hover z-40"
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo-ngp.png" alt="NGP" className="w-10 h-10" />
                <h3 className="text-xl font-bold">Nouvelle Génération Pro</h3>
              </div>
              <p className="text-gray-300 mb-4">
                École maternelle d'excellence située à Salé, offrant un environnement d'apprentissage moderne et stimulant 
                pour les enfants de 3 à 6 ans. Notre mission est d'accompagner chaque enfant dans son développement global.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleQuickAction('call')}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleQuickAction('email')}
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleQuickAction('whatsapp')}
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleSectionChange('accueil')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Accueil
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('services')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Nos Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('inscription')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Inscription
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('contact')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Résidence Essafa 4, Salé</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+212 5 37 86 55 81</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>periscolaire@nouvellegeneration.pro</span>
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm">
                    <strong>Horaires d'ouverture :</strong><br/>
                    Lun-Ven : 8h00-17h00<br/>
                    Samedi : 8h00-12h00
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Nouvelle Génération Pro. Tous droits réservés.</p>
            <p className="text-sm mt-2">École maternelle d'excellence - Salé, Maroc</p>
          </div>
        </div>
      </footer>

      {/* PWA Manager */}
      <PWAManager />
    </div>
  );
}

export default App;