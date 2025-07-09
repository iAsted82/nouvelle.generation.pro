Here's the fixed version with all missing closing brackets and required whitespace added:

```javascript
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, BookOpen, Monitor, Users, UserCheck, Palette, Shield, Phone, Mail, MapPin, Clock, Calendar, Star, ArrowRight, CheckCircle, Camera, Play, Image as ImageIcon, Award, Heart, GraduationCap, Sparkles } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import FormManager from './components/Forms/FormManager';
import LanguageSelector from './components/LanguageSelector';
import { languageService } from './services/languageService';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [newsletter, setNewsletter] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  const navItems = [
    { href: '#accueil', label: t('nav.home', 'Accueil') },
    { href: '#methodes', label: t('nav.methods', 'Nos Méthodes') },
    { href: '#galerie', label: t('nav.gallery', 'Notre École') },
    { href: '#vie-scolaire', label: t('nav.school.life', 'Vie Scolaire') },
    { href: '#inscription', label: t('nav.registration', 'Inscription') },
    { href: '#contact', label: t('nav.contact', 'Contact') }
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg h-16 lg:h-20' : 'bg-white/95 backdrop-blur-sm h-16 lg:h-20'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/logo-ngp.png" 
              alt="Logo Nouvelle Génération Pro" 
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 hover:scale-105"
              style={{ 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                margin: '4px' // Marge de sécurité de 4px autour du logo
              }}
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-bold text-gray-800">
              {t('school.name', 'NOUVELLE GÉNÉRATION PRO')}
            </h1>
            <p className="text-xs lg:text-sm text-orange-500 font-medium">
              {t('school.subtitle', 'École Maternelle d\'Excellence')}
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <LanguageSelector variant="compact" />
            <button 
              onClick={() => setShowForms(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 xl:px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm xl:text-base"
            >
              {t('nav.forms', 'Formulaires')}
            </button>
            <button 
              onClick={() => handleNavClick('#inscription')}
              className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 xl:px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 animate-pulse focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm xl:text-base"
            >
              {t('cta.register.now', 'Inscrivez-vous maintenant')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded touch-target"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.close.menu', 'Fermer le menu') : t('nav.open.menu', 'Ouvrir le menu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-25 animate-fadeIn"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-slideDown">
              <nav className="flex flex-col py-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-left touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Actions */}
                <div className="mt-4 px-4 space-y-3">
                  <div className="flex justify-center mb-4">
                    <LanguageSelector />
                  </div>
                  <button
                    onClick={() => {
                      setShowForms(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-full hover:bg-green-700 transition-colors touch-target focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    {t('nav.forms', 'Formulaires')}
                  </button>
                  <button 
                    onClick={() => {
                      handleNavClick('#inscription');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t('cta.register.now', 'Inscrivez-vous maintenant')}
                  </button>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>

      {/* Forms Modal */}
      {showForms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-8 h-8 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800">{t('forms.title', 'Système de Formulaires')}</h2>
              </div>
              <button
                onClick={() => setShowForms(false)}
                className="text-gray-500 hover:text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full overflow-auto">
              <FormManager />
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard Modal */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-8 h-8 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800">{t('admin.access', 'Accès Administration')}</h2>
              </div>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-gray-500 hover:text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full overflow-auto">
              <AdminDashboard />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Floating Shape Component
const FloatingShape = ({ size, color, animationDelay, position }) => (
  <div
    className={`absolute ${position} w-${size} h-${size} ${color} rounded-full opacity-20 animate-bounce`}
    style={{ animationDelay: `${animationDelay}s`, animationDuration: '3s' }}
  />
);

// Hero Section
const Hero = () => {
  const [showForms, setShowForms] = useState(false);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());

  useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 overflow-hidden">
      {/* Floating Shapes */}
      <FloatingShape size="20" color="bg-blue-300" animationDelay="0" position="top-20 left-20" />
      <FloatingShape size="16" color="bg-purple-300" animationDelay="1" position="top-40 right-40" />
      <FloatingShape size="24" color="bg-orange-300" animationDelay="2" position="bottom-40 left-40" />
      <FloatingShape size="12" color="bg-green-300" animationDelay="0.5" position="bottom-20 right-20" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fadeInUp">
            {/* Logo Hero - Version grande */}
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="/logo-ngp.png" 
                alt="Logo Nouvelle Génération Pro" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
                  margin: '8px'
                }}
              />
              <div className="text-blue-600 font-bold text-2xl md:text-3xl">
                {t('about.title', 'Une École Unique pour Votre Enfant')}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                {t('hero.title.part1', 'La Maternelle qui')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> {t('hero.title.part2', 'Fait la Différence')}</span>
              </h1>
              <div className="flex items-center space-x-2 text-2xl md:text-3xl text-orange-500 font-semibold">
                <Calendar className="w-8 h-8" />
                <span>{t('hero.registration.open', 'Inscriptions Ouvertes 2025-2026')}</span>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('hero.description', 'Une approche pédagogique innovante qui respecte les valeurs culturelles et spirituelles marocaines.')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{t('cta.register.child', 'Inscrire mon enfant')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowForms(true)}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{t('cta.access.forms', 'Accéder aux formulaires')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.querySelector('#galerie')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>{t('cta.discover.school', 'Découvrir notre école')}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-gray-600">{t('trust.certified', 'École certifiée')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">{t('trust.experience', '15 ans d\'expérience')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="text-gray-600">{t('trust.caring', 'Approche bienveillante')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                      <img 
                        src="/istockphoto-952059200-1024x1024.jpg"
                        alt="Enfants heureux dans une classe maternelle moderne"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <img 
                        src="/logo-ngp.png" 
                        alt="Logo Nouvelle Génération Pro" 
                        className="w-8 h-8 object-contain"
                        style={{ 
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                          margin: '2px'
                        }}
                      />
                      <h3 className="text-2xl font-bold text-gray-800">{t('school.name', 'Nouvelle Génération Pro')}</h3>
                    </div>
                    <p className="text-gray-600">{t('school.since', 'Excellence éducative depuis 2009')}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">30</div>
                      <div className="text-sm text-gray-600">{t('info.places.remaining', 'Places restantes')}</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-orange-600">15</div>
                      <div className="text-sm text-gray-600">{t('info.children.per.class', 'Enfants/classe max')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forms Modal */}
      {showForms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-8 h-8 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800">Système de Formulaires</h2>
              </div>
              <button
                onClick={() => setShowForms(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full overflow-auto">
              <FormManager />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group card-hover"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Features Section
const Features = () => {
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());

  useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      title: t('features.bilingual.title', 'Éducation Bilingue'),
      description: t('features.bilingual.description', 'Apprentissage en arabe et français pour préparer l\'avenir de votre enfant dans un contexte multiculturel.')
    },
    {
      icon: <Monitor className="w-6 h-6 text-white" />,
      title: t('features.technology.title', 'Technologie Moderne'),
      description: t('features.technology.description', 'Tableaux interactifs et outils numériques adaptés aux jeunes enfants pour un apprentissage ludique.')
    },
    {
      icon: <UserCheck className="w-6 h-6 text-white" />,
      title: t('features.qualified.title', 'Équipe Qualifiée'),
      description: t('features.qualified.description', 'Enseignants formés aux méthodes pédagogiques modernes et aux valeurs culturelles marocaines.')
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('features.small.classes.title', 'Classes Réduites'),
      description: t('features.small.classes.description', 'Maximum 15 enfants par classe pour un accompagnement personnalisé de chaque élève.')
    },
    {
      icon: <Palette className="w-6 h-6 text-white" />,
      title: t('features.activities.title', 'Activités Enrichissantes'),
      description: t('features.activities.description', 'Arts, musique, théâtre, sport et activités culturelles pour développer tous les talents.')
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: t('features.secure.title', 'Environnement Sécurisé'),
      description: t('features.secure.description', 'Espace moderne, propre et organisé avec une sécurité renforcée pour la tranquillité des parents.')
    }
  ];

  return (
    <section id="methodes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t('features.why.choose', 'Pourquoi Choisir')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> {t('school.name', 'Nouvelle Génération Pro')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.description', 'Une approche pédagogique moderne qui respecte les valeurs culturelles et spirituelles marocaines.')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      \    {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const Gallery = () => {
  const galleryItems = [
    {
      title: "Salle de Classe Moderne",
      description: "Nos classes colorées avec affichages bilingues",
      type: "classroom",
      placeholder: "Salle avec tableaux d'alphabet arabe et français"
    },
    {
      title: "Moment d'Apprentissage",
      description: "Enfants en activité d'écriture arabe",
      type: "learning",
      placeholder: "Enfants avec tabliers apprenant l'écriture"
    },
    {
      title: "Cour de Récréation",
      description: "Espace de jeu sécurisé avec structures adaptées",
      type: "playground",
      placeholder: "Cour avec jeux et arcades traditionnelles"
    },
    {
      title: "Activités Artistiques",
      description: "Ateliers créatifs et expression artistique",
      type: "arts",
      placeholder: "Enfants en atelier peinture et arts"
    }
  ];

  return (
    <section id="galerie" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Découvrez Notre 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> École en Images</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plongez dans l'univers de Nouvelle Génération Pro et découvrez nos espaces modernes et nos activités enrichissantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={getGalleryImage(item.type)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto btn-hover">
            <Play className="w-5 h-5" />
            <span>Voir notre vidéo de
