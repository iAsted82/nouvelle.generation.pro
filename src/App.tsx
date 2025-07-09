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
  UserPlus
} from 'lucide-react';
import { languageService } from './services/languageService';
import { currencyService } from './services/currencyService';
import LanguageSelector from './components/LanguageSelector';
import CurrencySelector from './components/CurrencySelector';
import AdminAuth from './components/AdminAuth';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());
  const [currency, setCurrency] = useState(currencyService.getCurrentCurrency());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Subscribe to language and currency changes
  useEffect(() => {
    const unsubscribeLang = languageService.subscribe(setLanguage);
    const unsubscribeCurr = currencyService.subscribe(setCurrency);
    
    return () => {
      unsubscribeLang();
      unsubscribeCurr();
    };
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  // Gallery images
  const galleryImages = [
    {
      src: '/istockphoto-952059200-1024x1024.jpg',
      alt: t('gallery.classroom.alt', 'Salle de classe moderne'),
      title: t('gallery.classroom.title', 'Salle de Classe Moderne'),
      description: t('gallery.classroom.desc', 'Espaces d\'apprentissage équipés de technologies modernes')
    },
    {
      src: '/istockphoto-1044045462-1024x1024.jpg',
      alt: t('gallery.playground.alt', 'Aire de jeux sécurisée'),
      title: t('gallery.playground.title', 'Aire de Jeux Sécurisée'),
      description: t('gallery.playground.desc', 'Espace de récréation adapté aux jeunes enfants')
    },
    {
      src: '/istockphoto-1458807880-1024x1024.jpg',
      alt: t('gallery.library.alt', 'Bibliothèque enfantine'),
      title: t('gallery.library.title', 'Bibliothèque Enfantine'),
      description: t('gallery.library.desc', 'Coin lecture pour développer l\'amour des livres')
    },
    {
      src: '/istockphoto-1500447955-1024x1024.jpg',
      alt: t('gallery.dining.alt', 'Salle de restauration'),
      title: t('gallery.dining.title', 'Salle de Restauration'),
      description: t('gallery.dining.desc', 'Espace repas convivial et hygiénique')
    },
    {
      src: '/logo-ngp.png',
      alt: t('gallery.activities.alt', 'Salle d\'activités'),
      title: t('gallery.activities.title', 'Salle d\'Activités'),
      description: t('gallery.activities.desc', 'Espace polyvalent pour les activités créatives')
    },
    {
      src: '/logo-ngp.png',
      alt: t('gallery.garden.alt', 'Jardin pédagogique'),
      title: t('gallery.garden.title', 'Jardin Pédagogique'),
      description: t('gallery.garden.desc', 'Espace vert pour l\'éveil à la nature')
    }
  ];

  // Daily schedule
  const dailySchedule = [
    {
      time: '08:00 - 08:30',
      activity: t('schedule.welcome', 'Accueil et Jeux Libres'),
      description: t('schedule.welcome.desc', 'Arrivée des enfants et activités d\'accueil')
    },
    {
      time: '08:30 - 09:00',
      activity: t('schedule.circle', 'Cercle du Matin'),
      description: t('schedule.circle.desc', 'Chansons, comptines et présentation de la journée')
    },
    {
      time: '09:00 - 10:30',
      activity: t('schedule.learning', 'Apprentissages Dirigés'),
      description: t('schedule.learning.desc', 'Activités pédagogiques adaptées à chaque niveau')
    },
    {
      time: '10:30 - 11:00',
      activity: t('schedule.snack', 'Collation et Récréation'),
      description: t('schedule.snack.desc', 'Pause nutritive et jeux en plein air')
    },
    {
      time: '11:00 - 12:00',
      activity: t('schedule.workshops', 'Ateliers Créatifs'),
      description: t('schedule.workshops.desc', 'Art, musique, bricolage et découvertes')
    },
    {
      time: '12:00 - 13:30',
      activity: t('schedule.lunch', 'Déjeuner et Repos'),
      description: t('schedule.lunch.desc', 'Repas équilibré et temps calme')
    },
    {
      time: '13:30 - 15:00',
      activity: t('schedule.afternoon', 'Activités de l\'Après-midi'),
      description: t('schedule.afternoon.desc', 'Jeux éducatifs et activités motrices')
    },
    {
      time: '15:00 - 16:00',
      activity: t('schedule.departure', 'Préparation du Départ'),
      description: t('schedule.departure.desc', 'Rangement et départ échelonné')
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Fatima El Mansouri',
      role: t('testimonials.parent', 'Maman d\'Amira'),
      content: t('testimonials.fatima', 'Une école exceptionnelle où mon enfant s\'épanouit chaque jour. L\'équipe est attentionnée et professionnelle.'),
      rating: 5
    },
    {
      name: 'Youssef Berrada',
      role: t('testimonials.parent', 'Papa de Mehdi'),
      content: t('testimonials.youssef', 'Le niveau d\'enseignement et l\'approche pédagogique sont remarquables. Je recommande vivement cette école.'),
      rating: 5
    },
    {
      name: 'Aicha Benali',
      role: t('testimonials.parent', 'Maman de Lina'),
      content: t('testimonials.aicha', 'Un environnement bienveillant qui favorise l\'apprentissage et le développement personnel de chaque enfant.'),
      rating: 5
    }
  ];

  // News items
  const newsItems = [
    {
      id: 1,
      category: t('news.category.pedagogical', 'Pédagogique'),
      title: t('news.title.1', 'Nouveau Programme d\'Éveil Scientifique'),
      excerpt: t('news.excerpt.1', 'Découvrez notre nouveau programme d\'éveil scientifique pour les 4-6 ans, alliant expériences ludiques et apprentissages fondamentaux.'),
      date: '2025-01-15',
      image: '/istockphoto-952059200-1024x1024.jpg'
    },
    {
      id: 2,
      category: t('news.category.events', 'Événements'),
      title: t('news.title.2', 'Portes Ouvertes - Février 2025'),
      excerpt: t('news.excerpt.2', 'Rejoignez-nous pour découvrir notre école lors de nos journées portes ouvertes les 8 et 15 février 2025.'),
      date: '2025-01-10',
      image: '/istockphoto-1044045462-1024x1024.jpg'
    },
    {
      id: 3,
      category: t('news.category.infrastructure', 'Infrastructure'),
      title: t('news.title.3', 'Nouveaux Équipements Numériques'),
      excerpt: t('news.excerpt.3', 'Installation de nouveaux tableaux interactifs et tablettes éducatives pour enrichir l\'expérience d\'apprentissage.'),
      date: '2025-01-05',
      image: '/istockphoto-1458807880-1024x1024.jpg'
    },
    {
      id: 4,
      category: t('news.category.success', 'Succès'),
      title: t('news.title.4', 'Certification Qualité Obtenue'),
      excerpt: t('news.excerpt.4', 'Nouvelle Génération Pro obtient la certification qualité ISO 21001 pour l\'excellence de ses services éducatifs.'),
      date: '2025-01-01',
      image: '/istockphoto-1500447955-1024x1024.jpg'
    }
  ];

  // Form handling
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setContactForm({ name: '', email: '', phone: '', message: '', subject: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate newsletter subscription
    setTimeout(() => {
      setNewsletterEmail('');
      alert(t('newsletter.success', 'Inscription à la newsletter réussie !'));
    }, 1000);
  };

  // Statistics
  const stats = [
    { label: t('stats.experience', 'Ans d\'Expérience'), value: '15+' },
    { label: t('stats.students', 'Élèves Formés'), value: '500+' },
    { label: t('stats.teachers', 'Enseignants Qualifiés'), value: '12' },
    { label: t('stats.success', 'Taux de Réussite'), value: '98%' }
  ];

  // Available places (dynamic)
  const availablePlaces = {
    petite: 8,
    moyenne: 12,
    grande: 5
  };

  // Important dates
  const importantDates = [
    {
      date: '2025-02-01',
      event: t('dates.registration.start', 'Début des inscriptions'),
      status: 'upcoming'
    },
    {
      date: '2025-02-08',
      event: t('dates.open.house', 'Journée portes ouvertes'),
      status: 'upcoming'
    },
    {
      date: '2025-06-30',
      event: t('dates.registration.end', 'Fin des inscriptions'),
      status: 'upcoming'
    },
    {
      date: '2025-09-01',
      event: t('dates.school.start', 'Rentrée scolaire'),
      status: 'upcoming'
    }
  ];

  // Registration process steps
  const registrationSteps = [
    {
      step: 1,
      title: t('registration.step1', 'Pré-inscription'),
      description: t('registration.step1.desc', 'Remplissez le formulaire de pré-inscription en ligne')
    },
    {
      step: 2,
      title: t('registration.step2', 'Visite de l\'école'),
      description: t('registration.step2.desc', 'Prenez rendez-vous pour visiter nos locaux')
    },
    {
      step: 3,
      title: t('registration.step3', 'Dossier complet'),
      description: t('registration.step3.desc', 'Constituez et soumettez votre dossier complet')
    },
    {
      step: 4,
      title: t('registration.step4', 'Confirmation'),
      description: t('registration.step4.desc', 'Recevez la confirmation d\'inscription')
    }
  ];

  // Required documents
  const requiredDocuments = [
    t('documents.birth.certificate', 'Acte de naissance'),
    t('documents.vaccination', 'Carnet de vaccination'),
    t('documents.medical.certificate', 'Certificat médical'),
    t('documents.photos', 'Photos d\'identité (4)'),
    t('documents.parent.id', 'Pièce d\'identité des parents'),
    t('documents.residence.proof', 'Justificatif de domicile')
  ];

  // Pricing
  const pricing = {
    registration: 500,
    monthly: 2500,
    transport: 800,
    meals: 600
  };

  // Format price with currency
  const formatPrice = (amount: number) => {
    if (currency === 'EUR') {
      return `${amount}€`;
    } else {
      const convertedAmount = Math.round(amount * 10.5); // 1 EUR = 10.5 MAD
      return `${convertedAmount} د.م.`;
    }
  };

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className={`min-h-screen bg-gray-50 ${languageService.isRTL() ? 'rtl' : 'ltr'}`} dir={languageService.isRTL() ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-ngp.png" 
                alt="Logo Nouvelle Génération Pro" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t('school.name', 'Nouvelle Génération Pro')}</h1>
                <p className="text-xs text-gray-600">{t('school.subtitle', 'École Maternelle d\'Excellence')}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.home', 'Accueil')}</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.about', 'À Propos')}</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.gallery', 'Galerie')}</a>
              <a href="#school-life" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.school.life', 'Vie Scolaire')}</a>
              <a href="#registration" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.registration', 'Inscription')}</a>
              <a href="#news" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.news', 'Actualités')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.contact', 'Contact')}</a>
            </nav>

            {/* Language, Currency, and Admin */}
            <div className="flex items-center space-x-4">
              <LanguageSelector variant="compact" />
              <CurrencySelector variant="compact" />
              <button
                onClick={() => setShowAdminModal(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
                title={t('admin.access', 'Accès Administration')}
              >
                <Shield className="w-5 h-5" />
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-2 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.home', 'Accueil')}</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.about', 'À Propos')}</a>
              <a href="#gallery" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.gallery', 'Galerie')}</a>
              <a href="#school-life" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.school.life', 'Vie Scolaire')}</a>
              <a href="#registration" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.registration', 'Inscription')}</a>
              <a href="#news" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.news', 'Actualités')}</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('nav.contact', 'Contact')}</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title.part1', 'La Maternelle qui')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                {t('hero.title.part2', 'Fait la Différence')}
              </span>
            </h1>
            
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block mb-6 animate-pulse">
              <span className="font-semibold">{t('hero.registration.open', 'Inscriptions Ouvertes 2025-2026')}</span>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto">
              {t('hero.description', 'Une école maternelle moderne avec enseignement trilingue (français, arabe, anglais) et pédagogie innovante. Classes limitées à 15 élèves dans un environnement bienveillant et stimulant.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
                {t('cta.register.child', 'Inscrire mon enfant')}
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all backdrop-blur-sm">
                {t('cta.discover.school', 'Découvrir notre école')}
              </button>
            </div>
            
            <div className="mt-12 flex justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>{t('trust.certified', 'École certifiée')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>{t('trust.experience', '15 ans d\'expérience')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>{t('trust.caring', 'Approche bienveillante')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('features.why.choose', 'Pourquoi Choisir')} <span className="text-blue-600">{t('school.name', 'Nouvelle Génération Pro')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.description', 'Une approche pédagogique moderne qui respecte les valeurs culturelles et spirituelles marocaines.')}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {t('school.since', 'Excellence éducative depuis 2009')}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.trilingual.title', 'Enseignement Trilingue')}
              </h3>
              <p className="text-gray-600">
                {t('features.trilingual.description', 'Apprentissage simultané en français, arabe et anglais pour une ouverture internationale.')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.small.classes.title', 'Classes Réduites')}
              </h3>
              <p className="text-gray-600">
                {t('features.small.classes.description', 'Maximum 15 enfants par classe pour un accompagnement personnalisé de chaque élève.')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.qualified.title', 'Équipe Qualifiée')}
              </h3>
              <p className="text-gray-600">
                {t('features.qualified.description', 'Enseignants formés aux méthodes pédagogiques modernes et aux valeurs culturelles marocaines.')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.activities.title', 'Activités Enrichissantes')}
              </h3>
              <p className="text-gray-600">
                {t('features.activities.description', 'Arts, musique, théâtre, sport et activités culturelles pour développer tous les talents.')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.secure.title', 'Environnement Sécurisé')}
              </h3>
              <p className="text-gray-600">
                {t('features.secure.description', 'Espace moderne, propre et organisé avec une sécurité renforcée pour la tranquillité des parents.')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('features.technology.title', 'Technologie Moderne')}
              </h3>
              <p className="text-gray-600">
                {t('features.technology.description', 'Tableaux interactifs et outils numériques adaptés aux jeunes enfants pour un apprentissage ludique.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('gallery.title', 'Découvrez Notre École en Images')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('gallery.description', 'Visitez virtuellement nos espaces modernes et sécurisés, conçus pour l\'épanouissement de votre enfant.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-gray-200">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{t('gallery.see.more', 'Voir Plus d\'Images')}</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>{t('gallery.virtual.tour', 'Visite Virtuelle')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* School Life Section */}
      <section id="school-life" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('school.life.title', 'La Vie Scolaire à Nouvelle Génération Pro')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('school.life.description', 'Découvrez le programme quotidien de votre enfant dans un environnement structuré et épanouissant.')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Daily Schedule */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('school.life.schedule', 'Programme Quotidien')}
              </h3>
              <div className="space-y-6">
                {dailySchedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.activity}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('school.life.testimonials', 'Témoignages de Parents')}
              </h3>
              <div className="relative">
                <div className="transition-all duration-500">
                  <div className="mb-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</p>
                        <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('registration.title', 'Inscriptions 2025-2026 : Places Limitées')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('registration.description', 'Réservez dès maintenant la place de votre enfant dans notre école d\'excellence.')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Available Places */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('registration.available.places', 'Places Disponibles')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{t('registration.level.petite', 'Petite Section (3-4 ans)')}</p>
                    <p className="text-sm text-gray-600">{t('registration.level.petite.desc', 'Première année de maternelle')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{availablePlaces.petite}</p>
                    <p className="text-sm text-gray-500">{t('registration.places.left', 'places restantes')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{t('registration.level.moyenne', 'Moyenne Section (4-5 ans)')}</p>
                    <p className="text-sm text-gray-600">{t('registration.level.moyenne.desc', 'Deuxième année de maternelle')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{availablePlaces.moyenne}</p>
                    <p className="text-sm text-gray-500">{t('registration.places.left', 'places restantes')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{t('registration.level.grande', 'Grande Section (5-6 ans)')}</p>
                    <p className="text-sm text-gray-600">{t('registration.level.grande.desc', 'Dernière année de maternelle')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">{availablePlaces.grande}</p>
                    <p className="text-sm text-gray-500">{t('registration.places.left', 'places restantes')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Important Dates */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('registration.important.dates', 'Dates Importantes')}
              </h3>
              <div className="space-y-4">
                {importantDates.map((date, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{date.event}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(date.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-MA' : 'en-US')}
                      </p>
                    </div>
                    <div className="text-orange-600">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Registration Process */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {t('registration.process.title', 'Processus d\'Inscription')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {registrationSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < registrationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Documents and Pricing */}
          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            {/* Required Documents */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('registration.required.documents', 'Documents Requis')}
              </h3>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('registration.pricing', 'Tarifs')}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">{t('registration.fee.registration', 'Frais d\'inscription')}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(pricing.registration)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">{t('registration.fee.monthly', 'Scolarité mensuelle')}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(pricing.monthly)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">{t('registration.fee.transport', 'Transport (optionnel)')}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(pricing.transport)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">{t('registration.fee.meals', 'Repas (optionnel)')}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(pricing.meals)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              {t('registration.start.now', 'Commencer l\'Inscription')}
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('news.title', 'Notre École Évolue')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('news.description', 'Découvrez les dernières actualités, innovations et événements de Nouvelle Génération Pro.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(item.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-MA' : 'en-US')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2">
                    <span>{t('news.read.more', 'Lire la suite')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              {t('news.view.all', 'Voir Toutes les Actualités')}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('contact.title', 'Contactez-nous')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.description', 'N\'hésitez pas à nous contacter pour toute question ou pour planifier une visite de notre école.')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {t('contact.info', 'Informations de Contact')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.address', 'Adresse')}</p>
                      <p className="text-gray-600">{t('school.location', 'Résidence Essafa 4, Salé')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.phone', 'Téléphone')}</p>
                      <p className="text-gray-600">{t('school.phone', '05 37 00 00 00')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.email', 'Email')}</p>
                      <p className="text-gray-600">{t('school.email', 'info@nouvellegeneration.pro')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t('contact.hours', 'Horaires')}</p>
                      <p className="text-gray-600">{t('contact.hours.details', 'Lun-Ven: 8h00-16h00')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {t('contact.social', 'Suivez-nous')}
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {t('contact.form.title', 'Envoyez-nous un Message')}
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name', 'Nom complet')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.name.placeholder', 'Votre nom complet')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email', 'Email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.email.placeholder', 'votre@email.com')}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.phone', 'Téléphone')}
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.phone.placeholder', '06 12 34 56 78')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject', 'Sujet')} *
                    </label>
                    <select
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t('contact.form.subject.placeholder', 'Choisir un sujet')}</option>
                      <option value="info">{t('contact.form.subject.info', 'Demande d\'information')}</option>
                      <option value="visit">{t('contact.form.subject.visit', 'Visite de l\'école')}</option>
                      <option value="registration">{t('contact.form.subject.registration', 'Inscription')}</option>
                      <option value="other">{t('contact.form.subject.other', 'Autre')}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message', 'Message')} *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={t('contact.form.message.placeholder', 'Décrivez votre demande...')}
                  />
                </div>
                
                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">{t('contact.form.success', 'Message envoyé avec succès!')}</span>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">{t('contact.form.error', 'Erreur lors de l\'envoi du message.')}</span>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {formStatus === 'sending' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.form.send', 'Envoyer le Message')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo-ngp.png" 
                  alt="Logo Nouvelle Génération Pro" 
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h3 className="font-bold text-lg">{t('school.name', 'Nouvelle Génération Pro')}</h3>
                  <p className="text-gray-400 text-sm">{t('school.subtitle', 'École Maternelle d\'Excellence')}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                {t('footer.school.description', 'Une école maternelle moderne dédiée à l\'excellence éducative et à l\'épanouissement de chaque enfant.')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('footer.quick.links', 'Liens Rapides')}</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">{t('nav.home', 'Accueil')}</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">{t('nav.about', 'À Propos')}</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">{t('nav.gallery', 'Galerie')}</a></li>
                <li><a href="#school-life" className="text-gray-400 hover:text-white transition-colors">{t('nav.school.life', 'Vie Scolaire')}</a></li>
                <li><a href="#registration" className="text-gray-400 hover:text-white transition-colors">{t('nav.registration', 'Inscription')}</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">{t('nav.contact', 'Contact')}</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('footer.contact', 'Contact')}</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-400">{t('school.location', 'Résidence Essafa 4, Salé')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-400">{t('school.phone', '05 37 00 00 00')}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-400">{t('school.email', 'info@nouvellegeneration.pro')}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-400">{t('contact.hours.details', 'Lun-Ven: 8h00-16h00')}</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('footer.newsletter', 'Newsletter')}</h4>
              <p className="text-gray-400 mb-4">
                {t('footer.newsletter.description', 'Restez informé de nos actualités et événements.')}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder', 'Votre email')}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  {t('footer.newsletter.subscribe', 'S\'abonner')}
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 {t('school.name', 'Nouvelle Génération Pro')}. {t('footer.rights', 'Tous droits réservés.')
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
  );
};

export default App;