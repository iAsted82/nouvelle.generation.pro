import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Users, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Heart,
  BookOpen,
  Palette,
  Music,
  Gamepad2,
  Shield,
  UserCheck,
  GraduationCap,
  Baby,
  Sparkles,
  Target,
  Zap,
  Eye,
  MessageCircle,
  Navigation,
  ExternalLink,
  AlertCircle,
  Check
} from 'lucide-react';
import { languageService, Language, LANGUAGES } from './services/languageService';
import AdminAuth from './components/AdminAuth';
import FormManager from './components/Forms/FormManager';

// Types pour les erreurs de navigation
interface NavigationError {
  type: 'link' | 'button' | 'form';
  message: string;
  element: string;
}

// Configuration des sections de navigation
const NAVIGATION_SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  PROGRAMS: 'programs', 
  ADMISSIONS: 'admissions',
  CONTACT: 'contact',
  ADMIN: 'admin',
  FORMS: 'forms'
} as const;

type NavigationSection = typeof NAVIGATION_SECTIONS[keyof typeof NAVIGATION_SECTIONS];

const App: React.FC = () => {
  // État pour la gestion de la navigation et de l'interface
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languageService.getCurrentLanguage());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavigationSection>(NAVIGATION_SECTIONS.HOME);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationErrors, setNavigationErrors] = useState<NavigationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  // Surveillance des changements de langue
  useEffect(() => {
    const unsubscribe = languageService.subscribe((language) => {
      setCurrentLanguage(language);
    });
    return unsubscribe;
  }, []);

  // Surveillance du scroll pour l'effet header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du redimensionnement pour fermer le menu mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction helper pour les traductions
  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  // Gestionnaire de changement de langue avec validation
  const handleLanguageChange = (language: Language) => {
    try {
      languageService.setLanguage(language);
      setCurrentLanguage(language);
      // Log pour le suivi
      console.log(`Language changed to: ${language}`);
    } catch (error) {
      console.error('Error changing language:', error);
      addNavigationError('button', 'Erreur lors du changement de langue', 'language-selector');
    }
  };

  // Gestionnaire d'erreurs de navigation
  const addNavigationError = (type: NavigationError['type'], message: string, element: string) => {
    const error: NavigationError = { type, message, element };
    setNavigationErrors(prev => [...prev, error]);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
      setNavigationErrors(prev => prev.filter(e => e !== error));
    }, 5000);
  };

  // Navigation fluide avec validation
  const handleSectionNavigation = (section: NavigationSection, elementId?: string) => {
    try {
      setIsLoading(true);
      setCurrentSection(section);
      
      if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        } else {
          console.warn(`Element with id '${elementId}' not found`);
          addNavigationError('link', `Section ${elementId} introuvable`, elementId);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Navigation error:', error);
      addNavigationError('link', 'Erreur de navigation', section);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // Gestionnaire de clic sur bouton avec feedback visuel
  const handleButtonClick = (buttonId: string, action: () => void) => {
    try {
      setClickedButton(buttonId);
      
      // Feedback visuel temporaire
      setTimeout(() => setClickedButton(null), 150);
      
      // Exécuter l'action
      action();
      
      console.log(`Button clicked: ${buttonId}`);
    } catch (error) {
      console.error(`Button error (${buttonId}):`, error);
      addNavigationError('button', `Erreur sur le bouton ${buttonId}`, buttonId);
    }
  };

  // Validation des liens externes
  const handleExternalLink = (url: string, linkName: string) => {
    try {
      // Validation de l'URL
      new URL(url);
      
      // Ouverture sécurisée
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        addNavigationError('link', 'Popup bloqué - veuillez autoriser les popups', linkName);
      }
      
      console.log(`External link opened: ${url}`);
    } catch (error) {
      console.error(`Invalid URL: ${url}`, error);
      addNavigationError('link', `URL invalide: ${url}`, linkName);
    }
  };

  // Gestionnaire de formulaire avec validation
  const handleFormAction = (formType: 'inscription' | 'contact' | 'rdv') => {
    try {
      setIsLoading(true);
      
      // Simulation d'une action de formulaire
      setTimeout(() => {
        setCurrentSection(NAVIGATION_SECTIONS.FORMS);
        setIsLoading(false);
      }, 500);
      
      console.log(`Form action: ${formType}`);
    } catch (error) {
      console.error(`Form error (${formType}):`, error);
      addNavigationError('form', `Erreur sur le formulaire ${formType}`, formType);
      setIsLoading(false);
    }
  };

  // Configuration des éléments de navigation
  const navigationItems = [
    { 
      key: 'home', 
      label: t('nav.home', 'Accueil'), 
      section: NAVIGATION_SECTIONS.HOME,
      elementId: 'home'
    },
    { 
      key: 'about', 
      label: t('nav.about', 'À Propos'), 
      section: NAVIGATION_SECTIONS.ABOUT,
      elementId: 'about'
    },
    { 
      key: 'programs', 
      label: t('nav.programs', 'Programmes'), 
      section: NAVIGATION_SECTIONS.PROGRAMS,
      elementId: 'programs'
    },
    { 
      key: 'admissions', 
      label: t('nav.admissions', 'Inscriptions'), 
      section: NAVIGATION_SECTIONS.ADMISSIONS,
      elementId: 'admissions'
    },
    { 
      key: 'contact', 
      label: t('nav.contact', 'Contact'), 
      section: NAVIGATION_SECTIONS.CONTACT,
      elementId: 'contact'
    }
  ];

  // Rendu conditionnel des sections
  if (currentSection === NAVIGATION_SECTIONS.ADMIN) {
    return <AdminAuth />;
  }

  if (currentSection === NAVIGATION_SECTIONS.FORMS) {
    return <FormManager />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50" dir={languageService.isRTL() ? 'rtl' : 'ltr'}>
      {/* Affichage des erreurs de navigation */}
      {navigationErrors.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {navigationErrors.map((error, index) => (
            <div 
              key={index}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center space-x-2 animate-slideDown"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 z-50">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo et nom */}
            <button 
              onClick={() => handleButtonClick('logo', () => handleSectionNavigation(NAVIGATION_SECTIONS.HOME))}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onMouseEnter={() => setHoveredButton('logo')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <img 
                src="/logo-ngp.png" 
                alt="Logo Nouvelle Génération Pro" 
                className={`school-logo transition-transform duration-200 ${
                  hoveredButton === 'logo' ? 'scale-110' : ''
                }`}
                onError={(e) => {
                  console.error('Logo loading error');
                  addNavigationError('link', 'Erreur de chargement du logo', 'logo');
                }}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                  {t('school.name', 'Nouvelle Génération Pro')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('school.subtitle', 'École Maternelle d\'Excellence')}
                </p>
              </div>
            </button>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleButtonClick(`nav-${item.key}`, () => handleSectionNavigation(item.section, item.elementId))}
                  className={`header-nav-link text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 ${
                    currentSection === item.section ? 'text-orange-600' : ''
                  } ${clickedButton === `nav-${item.key}` ? 'scale-95' : ''}`}
                  onMouseEnter={() => setHoveredButton(`nav-${item.key}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
              {/* Sélecteur de langue */}
              <div className="relative">
                <button
                  onClick={() => handleButtonClick('language-toggle', () => setIsMenuOpen(!isMenuOpen))}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm transition-all duration-200"
                  onMouseEnter={() => setHoveredButton('language-toggle')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {LANGUAGES.find(lang => lang.code === currentLanguage)?.flag}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>

                {/* Dropdown des langues */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
                    {LANGUAGES.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleButtonClick(`lang-${language.code}`, () => {
                          handleLanguageChange(language.code);
                          setIsMenuOpen(false);
                        })}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                          currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium">{language.nativeName}</span>
                        {currentLanguage === language.code && (
                          <Check className="w-4 h-4 text-blue-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bouton Admin */}
              <button
                onClick={() => handleButtonClick('admin', () => handleSectionNavigation(NAVIGATION_SECTIONS.ADMIN))}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 btn-hover"
                onMouseEnter={() => setHoveredButton('admin')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Shield className="w-4 h-4" />
                <span className="font-medium">{t('nav.admin', 'Admin')}</span>
              </button>

              {/* Menu mobile toggle */}
              <button
                onClick={() => handleButtonClick('mobile-menu', () => setIsMenuOpen(!isMenuOpen))}
                className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                onMouseEnter={() => setHoveredButton('mobile-menu')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-slideDown">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleButtonClick(`mobile-nav-${item.key}`, () => handleSectionNavigation(item.section, item.elementId))}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleButtonClick('mobile-admin', () => handleSectionNavigation(NAVIGATION_SECTIONS.ADMIN))}
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>{t('nav.admin', 'Admin')}</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Section Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background avec animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/5 to-orange-500/10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Contenu principal */}
            <div className="text-center lg:text-left animate-fadeInUp">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-blue-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {t('hero.badge', 'École Maternelle d\'Excellence')}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">
                  {t('hero.title', 'Nouvelle Génération Pro')}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                {t('hero.subtitle', 'L\'école qui prépare vos enfants à un avenir brillant avec des méthodes modernes et bienveillantes')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => handleButtonClick('cta-inscription', () => handleFormAction('inscription'))}
                  className="btn-primary px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onMouseEnter={() => setHoveredButton('cta-inscription')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>{t('hero.cta.register', 'Inscrire Mon Enfant')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
                
                <button
                  onClick={() => handleButtonClick('cta-visit', () => handleSectionNavigation(NAVIGATION_SECTIONS.CONTACT, 'contact'))}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onMouseEnter={() => setHoveredButton('cta-visit')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{t('hero.cta.visit', 'Visiter l\'École')}</span>
                  </span>
                </button>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">150+</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.students', 'Élèves')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.teachers', 'Enseignants')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">10+</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.years', 'Années')}</div>
                </div>
              </div>
            </div>

            {/* Image principale */}
            <div className="relative animate-float">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/8715095/pexels-photo-8715095.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt={t('hero.image.alt', 'Enfants heureux à l\'école')}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  onError={(e) => {
                    console.error('Hero image loading error');
                    addNavigationError('link', 'Erreur de chargement de l\'image principale', 'hero-image');
                  }}
                />
                
                {/* Badge flottant */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">
                      {t('hero.badge.open', 'Inscriptions Ouvertes')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t('about.title', 'Pourquoi Choisir Notre École ?')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle', 'Nous offrons une éducation moderne, bienveillante et adaptée à chaque enfant')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Heart className="w-8 h-8 text-red-500" />,
                title: t('about.values.caring', 'Environnement Bienveillant'),
                description: t('about.values.caring.desc', 'Un cadre sécurisant où chaque enfant peut s\'épanouir')
              },
              {
                icon: <BookOpen className="w-8 h-8 text-blue-500" />,
                title: t('about.values.education', 'Méthodes Modernes'),
                description: t('about.values.education.desc', 'Approches pédagogiques innovantes et personnalisées')
              },
              {
                icon: <Users className="w-8 h-8 text-green-500" />,
                title: t('about.values.community', 'Équipe Experte'),
                description: t('about.values.community.desc', 'Enseignants qualifiés et passionnés par l\'éducation')
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Programmes */}
      <section id="programs" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t('programs.title', 'Nos Programmes Éducatifs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('programs.subtitle', 'Des programmes adaptés à chaque tranche d\'âge pour un développement optimal')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                age: '3-4 ans',
                title: t('programs.petite.title', 'Petite Section'),
                icon: <Baby className="w-8 h-8 text-pink-500" />,
                description: t('programs.petite.desc', 'Découverte et socialisation'),
                features: [
                  t('programs.petite.feature1', 'Éveil sensoriel'),
                  t('programs.petite.feature2', 'Jeux éducatifs'),
                  t('programs.petite.feature3', 'Motricité fine'),
                  t('programs.petite.feature4', 'Expression artistique')
                ]
              },
              {
                age: '4-5 ans',
                title: t('programs.moyenne.title', 'Moyenne Section'),
                icon: <Palette className="w-8 h-8 text-purple-500" />,
                description: t('programs.moyenne.desc', 'Créativité et expression'),
                features: [
                  t('programs.moyenne.feature1', 'Arts plastiques'),
                  t('programs.moyenne.feature2', 'Musique et chant'),
                  t('programs.moyenne.feature3', 'Premières lettres'),
                  t('programs.moyenne.feature4', 'Jeux coopératifs')
                ]
              },
              {
                age: '5-6 ans',
                title: t('programs.grande.title', 'Grande Section'),
                icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
                description: t('programs.grande.desc', 'Préparation au primaire'),
                features: [
                  t('programs.grande.feature1', 'Lecture et écriture'),
                  t('programs.grande.feature2', 'Mathematics de base'),
                  t('programs.grande.feature3', 'Sciences naturelles'),
                  t('programs.grande.feature4', 'Autonomie et responsabilité')
                ]
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 card-hover">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {program.icon}
                  </div>
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 rounded-full text-sm font-semibold text-orange-700">
                    {program.age}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <ul className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleButtonClick(`program-${index}`, () => handleFormAction('contact'))}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 btn-hover"
                  onMouseEnter={() => setHoveredButton(`program-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {t('programs.learn.more', 'En Savoir Plus')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Inscriptions */}
      <section id="admissions" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t('admissions.title', 'Inscriptions 2025-2026')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('admissions.subtitle', 'Rejoignez notre communauté éducative d\'excellence')}
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mt-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">
                {t('admissions.open', 'Inscriptions Ouvertes Toute l\'Année')}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    step: '1',
                    title: t('admissions.step1.title', 'Pré-inscription'),
                    description: t('admissions.step1.desc', 'Remplissez le formulaire en ligne'),
                    icon: <Navigation className="w-6 h-6 text-blue-500" />
                  },
                  {
                    step: '2',
                    title: t('admissions.step2.title', 'Visite de l\'école'),
                    description: t('admissions.step2.desc', 'Découvrez nos installations'),
                    icon: <Eye className="w-6 h-6 text-purple-500" />
                  },
                  {
                    step: '3',
                    title: t('admissions.step3.title', 'Confirmation'),
                    description: t('admissions.step3.desc', 'Finalisation du dossier'),
                    icon: <CheckCircle className="w-6 h-6 text-green-500" />
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-4">
                <button
                  onClick={() => handleButtonClick('admission-register', () => handleFormAction('inscription'))}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 btn-hover"
                  onMouseEnter={() => setHoveredButton('admission-register')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>{t('admissions.register.now', 'S\'inscrire Maintenant')}</span>
                  </span>
                </button>
                
                <button
                  onClick={() => handleButtonClick('admission-appointment', () => handleFormAction('rdv'))}
                  className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onMouseEnter={() => setHoveredButton('admission-appointment')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{t('admissions.schedule.visit', 'Programmer une Visite')}</span>
                  </span>
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8923095/pexels-photo-8923095.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t('admissions.image.alt', 'Enfants en classe')}
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  console.error('Admissions image loading error');
                  addNavigationError('link', 'Erreur de chargement de l\'image inscription', 'admissions-image');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t('contact.title', 'Contactez-Nous')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle', 'Notre équipe est là pour répondre à toutes vos questions')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('contact.info.title', 'Informations de Contact')}
                </h3>
                
                <div className="space-y-6">
                  <button
                    onClick={() => handleButtonClick('contact-phone', () => handleExternalLink('tel:+212537865581', 'phone'))}
                    className="flex items-center space-x-4 w-full text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onMouseEnter={() => setHoveredButton('contact-phone')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.phone', 'Téléphone')}</p>
                      <p className="text-blue-600">+212 5 37 86 55 81</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>

                  <button
                    onClick={() => handleButtonClick('contact-email', () => handleExternalLink('mailto:periscolaire@nouvellegeneration.pro', 'email'))}
                    className="flex items-center space-x-4 w-full text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onMouseEnter={() => setHoveredButton('contact-email')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.email', 'Email')}</p>
                      <p className="text-green-600">periscolaire@nouvellegeneration.pro</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.address', 'Adresse')}</p>
                      <p className="text-gray-600">{t('school.location', 'Résidence Essafa 4, Salé')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('contact.hours.title', 'Horaires d\'Ouverture')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('contact.hours.weekdays', 'Lundi - Vendredi')}</span>
                    <span className="text-gray-600">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('contact.hours.saturday', 'Samedi')}</span>
                    <span className="text-gray-600">8h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">{t('contact.hours.sunday', 'Dimanche')}</span>
                    <span className="text-red-600">{t('contact.hours.closed', 'Fermé')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact rapide */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t('contact.form.title', 'Message Rapide')}
              </h3>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleButtonClick('contact-form-submit', () => handleFormAction('contact'));
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.firstname', 'Prénom')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder={t('contact.form.firstname.placeholder', 'Votre prénom')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.lastname', 'Nom')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder={t('contact.form.lastname.placeholder', 'Votre nom')}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email', 'Email')}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t('contact.form.email.placeholder', 'votre@email.com')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.phone', 'Téléphone')}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+212 6 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message', 'Message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t('contact.form.message.placeholder', 'Votre message...')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 btn-hover"
                  onMouseEnter={() => setHoveredButton('contact-form-submit')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>{t('contact.form.submit', 'Envoyer le Message')}</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">{t('school.name', 'Nouvelle Génération Pro')}</h3>
                  <p className="text-gray-400">{t('school.subtitle', 'École Maternelle d\'Excellence')}</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t('footer.description', 'Nous nous engageons à offrir une éducation de qualité dans un environnement bienveillant et stimulant pour tous nos élèves.')}
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleButtonClick('social-facebook', () => handleExternalLink('https://facebook.com', 'Facebook'))}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">f</span>
                </button>
                <button
                  onClick={() => handleButtonClick('social-instagram', () => handleExternalLink('https://instagram.com', 'Instagram'))}
                  className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">@</span>
                </button>
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className="text-lg font-bold mb-6">{t('footer.quicklinks', 'Liens Rapides')}</h4>
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => handleButtonClick(`footer-${item.key}`, () => handleSectionNavigation(item.section, item.elementId))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">{t('footer.contact', 'Contact')}</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleButtonClick('footer-phone', () => handleExternalLink('tel:+212537865581', 'phone'))}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors w-full text-left"
                >
                  <Phone className="w-4 h-4" />
                  <span>+212 5 37 86 55 81</span>
                </button>
                
                <button
                  onClick={() => handleButtonClick('footer-email', () => handleExternalLink('mailto:periscolaire@nouvellegeneration.pro', 'email'))}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors w-full text-left"
                >
                  <Mail className="w-4 h-4" />
                  <span>periscolaire@nouvellegeneration.pro</span>
                </button>
                
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{t('school.location', 'Résidence Essafa 4, Salé')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 {t('school.name', 'Nouvelle Génération Pro')}. {t('footer.rights', 'Tous droits réservés.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;