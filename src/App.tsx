import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, BookOpen, Monitor, Users, UserCheck, Palette, Shield, Phone, Mail, MapPin, Clock, Calendar, Star, ArrowRight, CheckCircle, Camera, Play, Image as ImageIcon, Award, Heart, GraduationCap, Sparkles } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#methodes', label: 'Nos Méthodes' },
    { href: '#galerie', label: 'Notre École' },
    { href: '#vie-scolaire', label: 'Vie Scolaire' },
    { href: '#inscription', label: 'Inscription' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Globe className="w-8 h-8 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">NOUVELLE GÉNÉRATION</h1>
              <p className="text-sm text-orange-500 font-medium">PRO</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => setShowAdmin(true)}
              className="text-gray-700 hover:text-blue-600 transition-colors relative group"
            >
              Admin
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 animate-pulse">
            Inscrivez-vous maintenant
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setShowAdmin(true);
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-left"
              >
                Admin
              </button>
              <button className="mx-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full">
                Inscrivez-vous maintenant
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Admin Dashboard Modal */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Accès Administration</h2>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
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
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                La Maternelle qui 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Fait la Différence</span>
              </h1>
              <div className="flex items-center space-x-2 text-2xl md:text-3xl text-orange-500 font-semibold">
                <Calendar className="w-8 h-8" />
                <span>Inscriptions Ouvertes 2025-2026</span>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Une école maternelle moderne qui respecte les valeurs culturelles marocaines. Éducation bilingue arabe-français dans un environnement bienveillant et stimulant.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Inscrire mon enfant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Découvrir notre école</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-gray-600">École certifiée</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">15 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="text-gray-600">Approche bienveillante</span>
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
                    <h3 className="text-2xl font-bold text-gray-800">Nouvelle Génération Pro</h3>
                    <p className="text-gray-600">Excellence éducative depuis 2009</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">30</div>
                      <div className="text-sm text-gray-600">Places restantes</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-orange-600">15</div>
                      <div className="text-sm text-gray-600">Enfants/classe max</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
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
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      title: "Éducation Bilingue",
      description: "Apprentissage en arabe et français pour préparer l'avenir de votre enfant dans un contexte multiculturel."
    },
    {
      icon: <Monitor className="w-6 h-6 text-white" />,
      title: "Technologie Moderne",
      description: "Tableaux interactifs et outils numériques adaptés aux jeunes enfants pour un apprentissage ludique."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-white" />,
      title: "Équipe Qualifiée",
      description: "Enseignants formés aux méthodes pédagogiques modernes et aux valeurs culturelles marocaines."
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Classes Réduites",
      description: "Maximum 15 enfants par classe pour un accompagnement personnalisé de chaque élève."
    },
    {
      icon: <Palette className="w-6 h-6 text-white" />,
      title: "Activités Enrichissantes",
      description: "Arts, musique, théâtre, sport et activités culturelles pour développer tous les talents."
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Environnement Sécurisé",
      description: "Espace moderne, propre et organisé avec une sécurité renforcée pour la tranquillité des parents."
    }
  ];

  return (
    <section id="methodes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Pourquoi Choisir 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Nouvelle Génération Pro</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une approche pédagogique moderne qui respecte les valeurs culturelles et spirituelles marocaines.
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
    },
    {
      title: "Lecture et Découverte",
      description: "Coin lecture avec livres bilingues",
      type: "reading",
      placeholder: "Bibliothèque avec livres arabe-français"
    },
    {
      title: "Équipe Pédagogique",
      description: "Nos enseignants dévoués et bienveillants",
      type: "teachers",
      placeholder: "Enseignants avec enfants en activité"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
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
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
const getActivityImage = (index) => {
  const images = [
    "/istockphoto-1500447955-1024x1024.jpg", // Apprentissage bilingue
    "/istockphoto-1458807880-1024x1024.jpg", // Éducation spirituelle
    "/istockphoto-952059200-1024x1024.jpg", // Activités créatives
    "/istockphoto-1044045462-1024x1024.jpg"  // Développement social
  ];
  return images[index] || images[0];
};

// Counter Component
const Counter = ({ value, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < value) {
          return prevCount + 1;
        }
        clearInterval(timer);
        return value;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-2">{count}</div>
      <div className="text-white/90">{label}</div>
    </div>
  );
};

// Urgent Registration Section
const UrgentRegistration = () => {
  return (
    <section id="inscription" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚨 Inscriptions 2025-2026 : Places Limitées !
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Ne manquez pas cette opportunité unique d'offrir à votre enfant une éducation d'excellence dans notre école modernisée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Counter 
            value={30} 
            label="Places restantes" 
            icon={<Users className="w-8 h-8 text-white" />}
          />
          <Counter 
            value={15} 
            label="Jours avant clôture" 
            icon={<Calendar className="w-8 h-8 text-white" />}
          />
          <Counter 
            value={1} 
            label="École centralisée moderne" 
            icon={<Globe className="w-8 h-8 text-white" />}
          />
        </div>

        <div className="text-center">
          <button className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Demander un Rendez-vous Urgent
          </button>
          <p className="text-white/80 mt-4">
            Contactez-nous dès maintenant pour visiter notre nouveau campus
          </p>
        </div>
      </div>
    </section>
  );
};

// Info Section
const InfoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏫 Notre École Évolue</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Nouvelle Génération Pro a récemment centralisé ses opérations à la <strong>Résidence Essafa 4, Salé</strong> pour mieux vous servir. 
                  Cette modernisation nous permet d'offrir des installations plus modernes et un service encore plus personnalisé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Appeler le 05 37 00 00 00</span>
                  </button>
                  <button className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Confirmer l'adresse de visite</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    contactPreference: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à offrir à votre enfant une éducation d'excellence ? Contactez-nous pour plus d'informations ou pour planifier une visite.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse Principale</h4>
                    <p className="text-gray-600">Résidence Essafa 4, Salé</p>
                    <p className="text-sm text-orange-600 mt-1">Contactez-nous pour confirmer l'adresse exacte de visite</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">05 37 00 00 00</p>
                    <p className="text-sm text-green-600 mt-1">Contact WhatsApp disponible</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@nouvellegenerationpro.ma</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horaires d'ouverture</h4>
                    <p className="text-gray-600">Lundi-Vendredi: 8h00-18h00</p>
                    <p className="text-gray-600">Samedi: 9h00-13h00 (sur rendez-vous uniquement)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Note importante:</strong> École récemment centralisée pour un meilleur service. 
                  Possibilité de visite sur rendez-vous. Contactez-nous pour plus d'informations sur nos nouvelles installations modernes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Formulaire de Contact</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du Parent *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'Enfant *
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Âge de l'Enfant *
                </label>
                <select
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez l'âge</option>
                  <option value="3">3 ans</option>
                  <option value="4">4 ans</option>
                  <option value="5">5 ans</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Préférence de Contact
                </label>
                <select
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez votre préférence</option>
                  <option value="telephone">Téléphone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Dites-nous comment nous pouvons vous aider..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Envoyer la Demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">NOUVELLE GÉNÉRATION PRO</h3>
                <p className="text-gray-400">École Maternelle d'Excellence</p>
              </div>
            </div>
            <p className="text-gray-400">
              Depuis 2009, nous accompagnons les enfants dans leur développement avec passion et professionnalisme, 
              en respectant les valeurs culturelles marocaines.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>📍 Résidence Essafa 4, Salé</p>
              <p>📞 05 37 00 00 00</p>
              <p>📱 WhatsApp disponible</p>
              <p>✉️ info@nouvellegenerationpro.ma</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <div className="space-y-2 text-gray-400">
              <p>Lundi - Vendredi: 8h00 - 18h00</p>
              <p>Samedi: 9h00 - 13h00</p>
              <p>(sur rendez-vous uniquement)</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Nouvelle Génération Pro. Tous droits réservés.</p>
          <p className="mt-2 text-sm">École maternelle moderne • Éducation bilingue • Valeurs culturelles marocaines</p>
        </div>
      </div>
    </footer>
  );
};

// Image Upload Helper Component
const ImageUploader = ({ onImageUpload, placeholder, className = "" }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${className} ${dragActive ? 'border-blue-400 bg-blue-50' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center space-y-2">
        <Camera className="w-12 h-12 text-gray-400" />
        <p className="text-gray-600 font-medium">Glisser une image ici</p>
        <p className="text-sm text-gray-500">{placeholder}</p>
        <button type="button" className="text-blue-600 hover:text-blue-700 underline">
          ou cliquer pour sélectionner
        </button>
      </div>
    </div>
  );
};

// Main App
function App() {
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Check for admin access via URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminDashboard(true);
    }
  }, []);

  if (showAdminDashboard) {
    return <AdminDashboard />;
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