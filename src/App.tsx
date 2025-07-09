import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  FileText, 
  Calendar, 
  UserCheck, 
  Shield, 
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Consulat.ga</h1>
                <p className="text-xs text-gray-500">Digital Consular Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#documents" className="text-gray-700 hover:text-blue-600 transition-colors">
                Documents
              </a>
              <a href="#appointments" className="text-gray-700 hover:text-blue-600 transition-colors">
                Appointments
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#documents" className="block text-gray-700 hover:text-blue-600 transition-colors">
                Documents
              </a>
              <a href="#appointments" className="block text-gray-700 hover:text-blue-600 transition-colors">
                Appointments
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <div className="pt-4 border-t space-y-2">
                <button className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </button>
                <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your Digital Consular Services
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Streamlined consular services for Gabonese citizens abroad. 
              Manage documents, schedule appointments, and access services online.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive consular services designed to make your experience efficient and hassle-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Document Management</h4>
              <p className="text-gray-600">Secure document upload, verification, and tracking for all your consular needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Appointment Scheduling</h4>
              <p className="text-gray-600">Easy online appointment booking with real-time availability and notifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Registration Services</h4>
              <p className="text-gray-600">Complete your consular registration and maintain your citizen records online.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Emergency Support</h4>
              <p className="text-gray-600">24/7 emergency assistance and support for citizens abroad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of Gabonese citizens who have already simplified their consular experience
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center mx-auto">
              Create Your Account
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Consulat.ga</span>
              </div>
              <p className="text-gray-400">
                Digital consular services for Gabonese citizens worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Document Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Appointments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Registration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+241 XX XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@consulat.ga</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Libreville, Gabon</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Consulat.ga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;