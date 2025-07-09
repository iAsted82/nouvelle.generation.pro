import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Shield, 
  FileText, 
  Calendar, 
  Users, 
  Globe, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Clock,
  UserCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'À Propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Gestion des Documents',
      description: 'Téléchargez, gérez et suivez vos documents consulaires en toute sécurité.',
      features: ['Passeports', 'Visas', 'Certificats', 'Attestations']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Prise de Rendez-vous',
      description: 'Planifiez vos rendez-vous consulaires en ligne, facilement et rapidement.',
      features: ['Calendrier interactif', 'Rappels automatiques', 'Reprogrammation', 'Confirmation']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Inscription Consulaire',
      description: 'Inscrivez-vous au registre consulaire et bénéficiez de tous nos services.',
      features: ['Inscription en ligne', 'Suivi du dossier', 'Mise à jour profil', 'Notifications']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Services d\'Urgence',
      description: 'Accès rapide aux services d\'urgence et d\'assistance consulaire.',
      features: ['Support 24/7', 'Assistance légale', 'Urgences médicales', 'Rapatriement']
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Sécurisé',
      description: 'Vos données sont protégées par un chiffrement de niveau bancaire'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: 'Rapide',
      description: 'Traitement accéléré de vos demandes et démarches'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-purple-500" />,
      title: 'Personnalisé',
      description: 'Interface adaptée à vos besoins spécifiques'
    },
    {
      icon: <Globe className="w-6 h-6 text-orange-500" />,
      title: 'Accessible',
      description: 'Disponible 24h/24 depuis n\'importe où dans le monde'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Consulat.ga</h1>
                <p className="text-xs text-gray-600">Services Consulaires Digitaux</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Vos Services Consulaires,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {' '}Digitalisés
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Simplifiez vos démarches consulaires avec notre plateforme numérique sécurisée. 
              Gérez vos documents, prenez rendez-vous et accédez à tous nos services en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                Commencer maintenant
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Consulat.ga ?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne conçue pour offrir une expérience utilisateur exceptionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services consulaires numériques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{service.title}</h4>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de citoyens gabonais qui utilisent déjà nos services numériques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg">
              Créer un compte
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Consulat.ga</h4>
                  <p className="text-gray-400 text-sm">Services Consulaires Digitaux</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Plateforme numérique officielle pour les services consulaires gabonais à l'étranger.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Contact</h5>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-400">+33 1 42 79 40 00</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-400">contact@consulat.ga</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-400">Paris, France</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Liens Utiles</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Consulat.ga. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;