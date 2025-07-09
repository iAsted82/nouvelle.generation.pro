import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, FileText, Calendar, Users, Shield, Globe, ChevronRight, CheckCircle, Star } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [activeForm, setActiveForm] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFormOpen = (formType: string) => {
    setActiveForm(formType);
    setShowForms(true);
    setIsMenuOpen(false);
  };

  const services = [
    {
      icon: FileText,
      title: "Inscription Consulaire",
      description: "Enregistrez-vous auprès du consulat en ligne, rapidement et en toute sécurité.",
      features: ["Formulaire numérique", "Validation instantanée", "Suivi en temps réel"]
    },
    {
      icon: Calendar,
      title: "Prise de Rendez-vous",
      description: "Planifiez vos rendez-vous consulaires selon vos disponibilités.",
      features: ["Calendrier interactif", "Rappels automatiques", "Reprogrammation facile"]
    },
    {
      icon: Users,
      title: "Services Familiaux",
      description: "Gérez les démarches pour toute votre famille depuis un seul compte.",
      features: ["Compte familial", "Gestion des enfants", "Historique partagé"]
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Vos données sont protégées avec les plus hauts standards de sécurité.",
      features: ["Chiffrement avancé", "Authentification OTP", "Conformité RGPD"]
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Accessible 24/7",
      description: "Accédez à vos services consulaires à tout moment, depuis n'importe où dans le monde."
    },
    {
      icon: Phone,
      title: "Support Multilingue",
      description: "Interface disponible en français, anglais et autres langues locales."
    },
    {
      icon: CheckCircle,
      title: "Processus Simplifié",
      description: "Démarches administratives simplifiées avec un suivi en temps réel."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Globe className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">Consulat.ga</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Fonctionnalités</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button 
                onClick={() => handleFormOpen('login')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Se connecter
              </button>
              <button 
                onClick={() => handleFormOpen('register')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Fonctionnalités</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button 
                onClick={() => handleFormOpen('login')}
                className="block w-full text-left px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Se connecter
              </button>
              <button 
                onClick={() => handleFormOpen('register')}
                className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Vos services consulaires
                <span className="block text-yellow-400">100% numériques</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Simplifiez vos démarches administratives avec notre plateforme moderne et sécurisée. 
                Inscription, rendez-vous, documents - tout en quelques clics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleFormOpen('register')}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center group"
                >
                  Commencer maintenant
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => handleFormOpen('demo')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Voir la démo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Inscription rapide et sécurisée</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Suivi en temps réel</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Support multilingue</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Accessible 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Consulat.ga ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme moderne conçue pour simplifier vos démarches consulaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des services consulaires complets adaptés à vos besoins
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à moderniser vos démarches consulaires ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers de citoyens qui ont déjà adopté nos services numériques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleFormOpen('register')}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center group"
            >
              S'inscrire gratuitement
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => handleFormOpen('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">Consulat.ga</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Plateforme numérique officielle pour les services consulaires gabonais. 
                Simplifiez vos démarches administratives en ligne.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-gray-400">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>4.8/5 - 2,847 avis</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Inscription consulaire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rendez-vous</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documents</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services familiaux</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+241 01 23 45 67</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@consulat.ga</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Libreville, Gabon</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>24h/24 - 7j/7</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Consulat.ga. Tous droits réservés. | Gouvernement de la République Gabonaise</p>
          </div>
        </div>
      </footer>

      {/* Form Modal Placeholder */}
      {showForms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {activeForm === 'register' && 'Inscription'}
                {activeForm === 'login' && 'Connexion'}
                {activeForm === 'contact' && 'Contact'}
                {activeForm === 'demo' && 'Demande de Démo'}
              </h3>
              <button
                onClick={() => setShowForms(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600">
              Cette fonctionnalité sera bientôt disponible. 
              Nous travaillons actuellement sur l'implémentation des formulaires.
            </p>
            <button
              onClick={() => setShowForms(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;