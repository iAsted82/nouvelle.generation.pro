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
    });
    return unsubscribe;
  }, []);

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
              {t('gallery.tabs.activities', 'Activités')}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <LanguageSelector variant="compact" />
              {t('gallery.tabs.events', 'Événements')}
              onClick={() => setShowForms(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 xl:px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm xl:text-base"
            >
              {t('nav.forms', 'Formulaires')}
            </button>
            <button 
              onClick={() => handleNavClick('#inscription')}
              className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 xl:px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 animate-pulse focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm xl:text-base"
            >
              {t('gallery.tabs.staff', 'Notre Équipe')}
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
              {t('about.subtitle', 'Découvrez notre approche pédagogique innovante')}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                {t('hero.title.part1', 'La Maternelle qui')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> {t('hero.title.part2', 'Fait la Différence')}</span>
              </h1>
              <div className="flex items-center space-x-2 text-2xl md:text-3xl text-orange-500 font-semibold">
                <Calendar className="w-8 h-8" />
                <span>{t('hero.registration.open', 'Inscriptions Ouvertes 2025-2026')}</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('about.feature1.title', 'Méthodes Pédagogiques Innovantes')}</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('about.feature1.description', 'Nous utilisons des approches modernes et créatives pour stimuler l\'apprentissage de chaque enfant, en respectant son rythme et ses intérêts.')}
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
          {features.map((feature, index) => (
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
            <span>Voir notre vidéo de présentation</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// School Life Section
const SchoolLife = () => {
  const activities = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Apprentissage Bilingue",
      description: "Enseignement en arabe classique et français avec méthodes interactives",
      image: "Enfants apprenant l'alphabet arabe et français"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      title: "Éducation Spirituelle",
      description: "Initiation respectueuse aux valeurs islamiques et au Coran",
      image: "Moment de récitation du Coran"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "Activités Créatives",
      description: "Ateliers d'arts, musique traditionnelle et expression corporelle",
      image: "Enfants en atelier créatif"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Développement Social",
      description: "Apprentissage du vivre-ensemble et des valeurs de partage",
      image: "Enfants jouant ensemble"
    }
  ];

  return (
    <section id="vie-scolaire" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            La Vie Scolaire à 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Nouvelle Génération Pro</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un quotidien riche en apprentissages, découvertes et moments de bonheur partagés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {activity.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={getActivityImage(index)}
                      alt={activity.image}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to get gallery images
const getGalleryImage = (type) => {
  const images = {
    classroom: "/istockphoto-1044045462-1024x1024.jpg",
    learning: "/istockphoto-1500447955-1024x1024.jpg",
    playground: "/istockphoto-1458807880-1024x1024.jpg",
    arts: "/istockphoto-952059200-1024x1024.jpg",
    reading: "/istockphoto-1044045462-1024x1024.jpg",
    teachers: "/istockphoto-1500447955-1024x1024.jpg"
  };
  return images[type] || images.classroom;
};

// Helper function to get activity images
              {t('school-life.subtitle', 'Un quotidien riche en découvertes')}
  const images = [
    "/istockphoto-1500447955-1024x1024.jpg", // Apprentissage bilingue
    "/istockphoto-1458807880-1024x1024.jpg", // Éducation spirituelle
    "/istockphoto-952059200-1024x1024.jpg", // Activités créatives
    "/istockphoto-1044045462-1024x1024.jpg"  // Développement social
  ];
  return images[index] || images[0];
};

              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('school-life.daily.title', 'Journée Type')}</h3>
const Counter = ({ value, label, icon }) => {
                {t('school-life.daily.description', 'Une journée bien structurée alternant apprentissages, jeux et repos.')}

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < value) {
          return prevCount + 1;
                  <span className="text-gray-700">{t('school-life.daily.8h', 'Accueil des enfants')}</span>
        clearInterval(timer);
        return value;
      });
    }, 100);

                  <span className="text-gray-700">{t('school-life.daily.8h30', 'Activités pédagogiques')}</span>
  }, [value]);

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-700">{t('school-life.daily.10h', 'Récréation et collation')}</span>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{count}</div>
      <div className="text-white/90">{label}</div>
    </div>
  );
                  <span className="text-gray-700">{t('school-life.daily.10h30', 'Ateliers créatifs')}</span>

// Urgent Registration Section
const UrgentRegistration = () => {
  const [showForms, setShowForms] = useState(false);

                  <span className="text-gray-700">{t('school-life.daily.12h', 'Déjeuner et repos')}</span>
    <section id="inscription" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
                  <span className="text-gray-700">{t('school-life.daily.14h', 'Éveil et découvertes')}</span>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚨 Inscriptions 2025-2026 : Places Limitées !
          </h2>
                  <span className="text-gray-700">{t('school-life.daily.15h30', 'Activités libres')}</span>
            Ne manquez pas cette opportunité unique d'offrir à votre enfant une éducation d'excellence dans notre école modernisée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <span className="text-gray-700">{t('school-life.daily.16h', 'Sortie des classes')}</span>
            value={30} 
            label="Places restantes" 
            icon={<Users className="w-8 h-8 text-white" />}
          />
          <Counter 
            value={15} 
            label="Jours avant clôture" 
            icon={<Calendar className="w-8 h-8 text-white" />}
          />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('school-life.meals.title', 'Restauration')}</h3>
            value={1} 
                {t('school-life.meals.description', 'Des repas équilibrés préparés avec soin, adaptés aux besoins nutritionnels des enfants.')}
            icon={<img src="/logo-ngp.png" alt="Logo" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />}
          />
        </div>

                  <span className="text-gray-700">{t('school-life.meals.feature1', 'Repas bio et locaux')}</span>
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg btn-hover"
                  <span className="text-gray-700">{t('school-life.meals.feature2', 'Menus équilibrés')}</span>
            Demander un Rendez-vous Urgent
          </button>
          <button 
                  <span className="text-gray-700">{t('school-life.meals.feature3', 'Allergies prises en compte')}</span>
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 block mx-auto btn-hover"
          >
            Accéder aux Formulaires
                  <span className="text-gray-700">{t('school-life.meals.feature4', 'Éducation alimentaire')}</span>
          <p className="text-white/80 mt-4">
            Contactez-nous dès maintenant pour visiter notre nouveau campus
          </p>
        </div>
      </div>

      {/* Forms Modal */}
      {showForms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('school-life.safety.title', 'Sécurité et Bien-être')}</h3>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                {t('school-life.safety.description', 'La sécurité de vos enfants est notre priorité absolue.')}
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-8 h-8 object-contain"
                  <span className="text-gray-700">{t('school-life.safety.feature1', 'Surveillance continue')}</span>
                <h2 className="text-2xl font-bold text-gray-800">Système de Formulaires</h2>
              </div>
              <button
                  <span className="text-gray-700">{t('school-life.safety.feature2', 'Équipements sécurisés')}</span>
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
                  <span className="text-gray-700">{t('school-life.safety.feature3', 'Personnel formé')}</span>
            </div>
            <div className="h-full overflow-auto">
              <FormManager />
                  <span className="text-gray-700">{t('school-life.safety.feature4', 'Protocoles d\'urgence')}</span>
          </div>
        </div>
      )}
    </section>
  );
};

// Info Section
const InfoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
              {t('registration.title', 'Inscriptions 2025-2026 : Places Limitées')}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-start space-x-4">
              {t('registration.subtitle', 'Réservez dès maintenant la place de votre enfant')}
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-6 h-6 object-contain"
                  style={{ filter: 'hue-rotate(25deg) saturate(1.2)' }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏫 Notre École Évolue</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Nouvelle Génération Pro a récemment centralisé ses opérations à la <strong>Résidence Essafa 4, Salé</strong> pour mieux vous servir. 
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('registration.deadline', 'Date limite d\'inscription')}</h3>
                    <p className="text-orange-600 font-bold">30 {t('months.june', 'Juin')} 2025</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2 btn-hover">
                    <Phone className="w-5 h-5" />
                    <span>Appeler le 05 37 00 00 00</span>
                  </button>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('registration.places', 'Places disponibles')}</h3>
                    <MapPin className="w-5 h-5" />
                    <span>Confirmer l'adresse de visite</span>
                  </button>
                </div>
              </div>
            </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('registration.requirements.title', 'Conditions d\'inscription')}</h3>
        </div>
      </div>
    </section>
  );
                      <h4 className="font-semibold text-gray-800">{t('registration.requirements.age', 'Âge requis selon la section')}</h4>
                      <p className="text-gray-600">(3-6 ans)</p>
// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
                      <h4 className="font-semibold text-gray-800">{t('registration.requirements.docs', 'Documents obligatoires')}</h4>
                      <p className="text-gray-600">Dossier complet à télécharger</p>
    email: '',
    contactPreference: '',
    message: ''
  });

                      <h4 className="font-semibold text-gray-800">{t('registration.requirements.visit', 'Visite de l\'école')}</h4>
                      <p className="text-gray-600">Rencontre avec l'équipe pédagogique</p>
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
  };

                      <h4 className="font-semibold text-gray-800">{t('registration.requirements.payment', 'Frais d\'inscription')}</h4>
                      <p className="text-gray-600">Tarifs détaillés disponibles</p>
      ...formData,
      [e.target.name]: e.target.value
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.facilities.library', 'Bibliothèque enfantine')}</h3>
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('registration.process.title', 'Processus d\'inscription')}</h3>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    alt={t('gallery.facilities.canteen', 'Cantine équipée')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à offrir à votre enfant une éducation d'excellence ? Contactez-nous pour plus d'informations ou pour planifier une visite.
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.facilities.canteen', 'Cantine équipée')}</h3>
                      <h4 className="font-semibold text-gray-800 mb-2">{t('registration.process.step1', 'Pré-inscription en ligne')}</h4>
                      <p className="text-gray-600">Remplissez le formulaire de pré-inscription sur notre site</p>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informations de Contact</h3>
                    alt={t('gallery.facilities.garden', 'Jardin pédagogique')}
              <div className="space-y-6">
                      <h4 className="font-semibold text-gray-800 mb-2">{t('registration.process.step2', 'Rendez-vous personnalisé')}</h4>
                      <p className="text-gray-600">Rencontre avec la directrice et visite de l'école</p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.facilities.garden', 'Jardin pédagogique')}</h3>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse Principale</h4>
                    <p className="text-gray-600">Résidence Essafa 4, Salé</p>
                    <p className="text-sm text-orange-600 mt-1">Contactez-nous pour confirmer l'adresse exacte de visite</p>
                  </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{t('registration.process.step3', 'Validation du dossier')}</h4>
                      <p className="text-gray-600">Remise des documents et validation du dossier</p>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.facilities.computer', 'Salle informatique')}</h3>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">05 37 00 00 00</p>
                      <h4 className="font-semibold text-gray-800 mb-2">{t('registration.process.step4', 'Confirmation définitive')}</h4>
                      <p className="text-gray-600">Confirmation de l'inscription et préparation de la rentrée</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                    {t('registration.cta.register', 'S\'inscrire maintenant')}
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@nouvellegeneration.pro</p>
                    {t('registration.cta.info', 'Demander des informations')}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.art', 'Atelier d\'art créatif')}</h3>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horaires d'ouverture</h4>
                    alt={t('gallery.activities.music', 'Éveil musical')}
                    <p className="text-gray-600">Samedi: 9h00-13h00 (sur rendez-vous uniquement)</p>
                  </div>
                </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.music', 'Éveil musical')}</h3>
              {t('news.title', 'Notre École Évolue')}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
              {t('news.subtitle', 'Découvrez nos dernières actualités')}
                  Possibilité de visite sur rendez-vous. Contactez-nous pour plus d'informations sur nos nouvelles installations modernes.
                </p>
              </div>
                    alt={t('gallery.activities.sport', 'Activité sportive')}
          </div>

          {/* Contact Form */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.sport', 'Activité sportive')}</h3>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Formulaire de Contact</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <span className="text-sm text-blue-600 font-semibold">{t('news.new-playground.date', 'Janvier 2025')}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('news.new-playground.title', 'Nouvelle Aire de Jeux')}</h3>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('news.new-playground.description', 'Installation d\'une nouvelle aire de jeux moderne et sécurisée pour le plus grand bonheur des enfants.')}
                    alt={t('gallery.activities.reading', 'Temps de lecture')}
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center">
                  {t('news.read-more', 'Lire la suite')} <ArrowRight className="w-4 h-4 ml-1" />
                    name="parentName"
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.reading', 'Temps de lecture')}</h3>
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                    alt={t('gallery.activities.cooking', 'Atelier cuisine')}
                    Nom de l'Enfant *
                <span className="text-sm text-green-600 font-semibold">{t('news.digital-tools.date', 'Décembre 2024')}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('news.digital-tools.title', 'Outils Numériques')}</h3>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.cooking', 'Atelier cuisine')}</h3>
                  {t('news.digital-tools.description', 'Intégration d\'outils numériques éducatifs pour enrichir l\'expérience d\'apprentissage.')}
                    value={formData.childName}
                <a href="#" className="text-green-600 font-semibold hover:text-green-800 transition-colors flex items-center">
                  {t('news.read-more', 'Lire la suite')} <ArrowRight className="w-4 h-4 ml-1" />
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                    alt={t('gallery.activities.science', 'Découverte scientifique')}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.activities.science', 'Découverte scientifique')}</h3>
                </label>
                <select
                  name="childAge"
                <span className="text-sm text-orange-600 font-semibold">{t('news.partnership.date', 'Novembre 2024')}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('news.partnership.title', 'Partenariat Musical')}</h3>
                  required
                  {t('news.partnership.description', 'Nouveau partenariat avec l\'École de Musique de Salé pour des cours d\'éveil musical.')}
                >
                <a href="#" className="text-orange-600 font-semibold hover:text-orange-800 transition-colors flex items-center">
                  {t('news.read-more', 'Lire la suite')} <ArrowRight className="w-4 h-4 ml-1" />
                  <option value="4">4 ans</option>
                    alt={t('gallery.events.graduation', 'Cérémonie de remise des diplômes')}
                </select>
              </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.events.graduation', 'Cérémonie de remise des diplômes')}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
              {t('contact.title', 'Contactez-nous')}
                    alt={t('gallery.events.festival', 'Festival culturel')}
                    onChange={handleChange}
              {t('contact.subtitle', 'Nous sommes là pour répondre à vos questions')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.events.festival', 'Festival culturel')}</h3>
                </div>
                
                <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">{t('contact.info.title', 'Informations de Contact')}</h3>
                    Email *
                  </label>
                  <input
                    alt={t('gallery.events.sports', 'Journée sportive')}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.address', 'Adresse')}</h4>
                    <p className="text-gray-600">{t('footer.contact.address', 'Résidence Essafa 4, Salé')}</p>
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    alt={t('gallery.events.exhibition', 'Exposition des travaux')}
                </label>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.phone', 'Téléphone')}</h4>
                    <p className="text-gray-600">{t('footer.contact.phone', '05 37 00 00 00')}</p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.events.exhibition', 'Exposition des travaux')}</h3>
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez votre préférence</option>
                  <option value="telephone">Téléphone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.email', 'Email')}</h4>
                    <p className="text-gray-600">{t('footer.contact.email', 'info@nouvellegeneration.pro')}</p>

              <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.events.celebration', 'Célébration de fin d\'année')}</h3>
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.hours', 'Horaires')}</h4>
                  rows="4"
                      <p><strong>{t('contact.info.hours.school', 'École')}:</strong> 8h00 - 16h00</p>
                      <p><strong>{t('contact.info.hours.office', 'Secrétariat')}:</strong> 8h00 - 17h00</p>
                />
              </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('gallery.events.parents', 'Rencontre parents-enseignants')}</h3>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 btn-hover"
              >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form.title', 'Formulaire de Contact')}</h3>
              </button>
            </form>
          </div>
        </div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.name', 'Nom complet')}</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={t('contact.form.name', 'Nom complet')} />
                    alt={t('gallery.staff.director', 'Directrice')}
};
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.email', 'Email')}</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="votre@email.com" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mme. Karima {t('gallery.staff.director', 'Directrice')}</h3>
  const [showAdmin, setShowAdmin] = useState(false);

              {t('programs.subtitle', 'Des parcours adaptés à chaque âge')}
    <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.phone', 'Téléphone')}</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="06 12 34 56 78" />
          <div className="grid md:grid-cols-3 gap-8">
                    alt={t('gallery.staff.teacher1', 'Enseignante petite section')}
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.subject', 'Sujet')}</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={t('contact.form.subject', 'Sujet')} />
                  <img 
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mme. Aicha {t('gallery.staff.teacher1', 'Enseignante petite section')}</h3>
                    alt={t('gallery.facilities.classroom', 'Salle de classe moderne')}
                    className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110"
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.message', 'Message')}</label>
                  <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={t('contact.form.message', 'Message')}></textarea>
                    alt={t('gallery.facilities.playground', 'Aire de jeux sécurisée')}
                    }}
                  />
                  {t('contact.form.send', 'Envoyer le message')}
                <div>
                  <h3 className="text-xl font-bold">NOUVELLE GÉNÉRATION PRO</h3>
                  <p className="text-gray-400">École Maternelle d'Excellence</p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mme. Fatima {t('gallery.staff.teacher2', 'Enseignante moyenne section')}</h3>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('programs.petite.title', 'Petite Section')}</h3>
              <p className="text-green-600 font-semibold mb-4">{t('programs.petite.age', '3-4 ans')}</p>
                Depuis 2009, nous accompagnons les enfants dans leur développement avec passion et professionnalisme, 
                {t('programs.petite.description', 'Première socialisation, développement du langage et découverte des activités créatives.')}
              </p>
            </div>
            
                    alt={t('gallery.staff.teacher3', 'Enseignante grande section')}
              <h3 className="text-xl font-bold mb-4">{t('footer.about.title', 'À propos')}</h3>
              <div className="space-y-2 text-gray-400">
                {t('footer.about.description', 'École maternelle d\'excellence offrant un environnement éducatif stimulant et bienveillant.')}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mme. Zineb {t('gallery.staff.teacher3', 'Enseignante grande section')}</h3>
                <p>📱 WhatsApp disponible</p>
                <p>✉️ info@nouvellegeneration.pro</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horaires</h4>
                    alt={t('gallery.staff.assistant', 'Assistante pédagogique')}
                <p>Lundi - Vendredi: 8h00 - 18h00</p>
                <p>Samedi: 9h00 - 13h00</p>
                <p>(sur rendez-vous uniquement)</p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mme. Rajaa {t('gallery.staff.assistant', 'Assistante pédagogique')}</h3>
            </div>
          </div>
                {t('programs.petite.features', 'Adaptation douce • Éveil sensoriel • Jeux éducatifs • Motricité fine').split(' • ').map((feature, index) => (
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('programs.grande.title', 'Grande Section')}</h3>
              <p className="text-purple-600 font-semibold mb-4">{t('programs.grande.age', '5-6 ans')}</p>
              <h3 className="text-xl font-bold mb-4">{t('footer.quick-links.title', 'Liens Rapides')}</h3>
                {t('programs.grande.description', 'Préparation à l\'entrée en primaire, consolidation des acquis.')}
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">{t('footer.quick-links.about', 'À propos')}</a></li>
                <li><a href="#programs" className="text-gray-300 hover:text-white transition-colors">{t('footer.quick-links.programs', 'Programmes')}</a></li>
                <li><a href="#admissions" className="text-gray-300 hover:text-white transition-colors">{t('footer.quick-links.admissions', 'Admissions')}</a></li>
                <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors">{t('footer.quick-links.gallery', 'Galerie')}</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('footer.quick-links.contact', 'Contact')}</a></li>
                    {feature}
                  </div>
                ))}
              <AdminDashboard />
              <h3 className="text-xl font-bold mb-4">{t('footer.services.title', 'Services')}</h3>
          </div>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.registration', 'Inscription')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.visit', 'Visite')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.appointment', 'Rendez-vous')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.forms', 'Formulaires')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.support', 'Support')}</a></li>

// Main App
function App() {
              {t('school-life.title', 'La Vie Scolaire à Nouvelle Génération Pro')}
              <h3 className="text-xl font-bold mb-4">{t('footer.contact.title', 'Contact')}</h3>
  const [showForms, setShowForms] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
                  <span>{t('footer.contact.address', 'Résidence Essafa 4, Salé')}</span>
    phone: '',
    subject: '',
    message: ''
                  <span>{t('footer.contact.phone', '05 37 00 00 00')}</span>
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [newsletter, setNewsletter] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
                  <span>{t('footer.contact.email', 'info@nouvellegeneration.pro')}</span>
  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  // Check for admin access via URL parameter
  useEffect(() => {
                  <a href="#" className="hover:text-white transition-colors">{t('footer.privacy', 'Politique de confidentialité')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('footer.terms', 'Conditions d\'utilisation')}</a>
                  <a href="#" className="hover:text-white transition-colors">{t('footer.legal', 'Mentions légales')}</a>
    }
    // Check for forms access via URL parameter
    if (urlParams.get('forms') === 'true') {
      setShowForms(true);
    }
  }, []);

  if (showAdminDashboard) {
    return <AdminDashboard />;
  }

  if (showForms) {
    return <FormManager />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <SchoolLife />
      <UrgentRegistration />
      <InfoSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
