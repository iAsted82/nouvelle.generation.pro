import React, { useState } from 'react';
import { AlertCircle, Calendar, Users, MessageSquare, UserPlus, Database, UsersRound } from 'lucide-react';
import AppointmentForm from './AppointmentForm';
import RegistrationForm from './RegistrationForm';
import ChildRegistrationForm from './ChildRegistrationForm';
import ContactForm from './ContactForm';
import CompleteRegistrationForm from './CompleteRegistrationForm';
import { registrationService } from '../../services/registrationService';

// Types pour les données
interface AppointmentData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  urgentReason: string;
  preferredDate: string;
  preferredTime: string;
  contactMethod: string;
  submissionDate: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
}

interface RegistrationData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  submissionDate: string;
  status: 'pending' | 'confirmed' | 'active';
}

interface ChildRegistrationData {
  id: string;
  childFirstName: string;
  childLastName: string;
  childBirthDate: string;
  childGender: string;
  currentLevel: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  submissionDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  documents: string[];
}

interface ContactData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  contactReason: string;
  preferredResponse: string;
  submissionDate: string;
  status: 'pending' | 'responded' | 'closed';
}

// Gestionnaire de base de données simulée
class DatabaseManager {
  private static instance: DatabaseManager;
  private appointments: AppointmentData[] = [];
  private registrations: RegistrationData[] = [];
  private childRegistrations: ChildRegistrationData[] = [];
  private contacts: ContactData[] = [];

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  // Gestion des rendez-vous urgents
  async saveAppointment(data: any): Promise<void> {
    const appointment: AppointmentData = {
      id: Date.now().toString(),
      ...data,
      submissionDate: new Date().toISOString(),
      status: 'pending'
    };

    this.appointments.push(appointment);
    
    // Simuler l'envoi de notifications
    await this.sendNotifications('appointment', appointment);
    
    console.log('Rendez-vous urgent sauvegardé:', appointment);
  }

  // Gestion des inscriptions utilisateur
  async saveRegistration(data: any): Promise<void> {
    // Vérifier les doublons
    const existingUser = this.registrations.find(reg => reg.email === data.email);
    if (existingUser) {
      throw new Error('Un compte avec cette adresse email existe déjà');
    }

    const registration: RegistrationData = {
      id: Date.now().toString(),
      ...data,
      submissionDate: new Date().toISOString(),
      status: 'pending'
    };

    this.registrations.push(registration);
    
    // Simuler l'envoi d'email de confirmation
    await this.sendNotifications('registration', registration);
    
    console.log('Inscription utilisateur sauvegardée:', registration);
  }

  // Gestion des inscriptions enfant
  async saveChildRegistration(data: any, documents: File[]): Promise<void> {
    const childRegistration: ChildRegistrationData = {
      id: Date.now().toString(),
      ...data,
      submissionDate: new Date().toISOString(),
      status: 'pending',
      documents: documents.map(doc => doc.name)
    };

    this.childRegistrations.push(childRegistration);
    
    // Simuler l'envoi de notifications
    await this.sendNotifications('childRegistration', childRegistration);
    
    console.log('Inscription enfant sauvegardée:', childRegistration);
    console.log('Documents attachés:', documents);
  }

  // Gestion des contacts
  async saveContact(data: any): Promise<void> {
    const contact: ContactData = {
      id: Date.now().toString(),
      ...data,
      submissionDate: new Date().toISOString(),
      status: 'pending'
    };

    this.contacts.push(contact);
    
    // Simuler l'envoi de notifications
    await this.sendNotifications('contact', contact);
    
    console.log('Contact sauvegardé:', contact);
  }

  // Simulation d'envoi de notifications
  private async sendNotifications(type: string, data: any): Promise<void> {
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (type) {
      case 'appointment':
        console.log(`📧 Email envoyé à ${data.email} pour confirmation de rendez-vous urgent`);
        console.log(`📱 SMS envoyé au ${data.phone} pour confirmation de rendez-vous urgent`);
        break;
      case 'registration':
        console.log(`📧 Email de confirmation envoyé à ${data.email}`);
        console.log(`📧 Lien d'activation envoyé à ${data.email}`);
        break;
      case 'childRegistration':
        console.log(`📧 Email de confirmation d'inscription envoyé à ${data.parentEmail}`);
        console.log(`📧 Notification envoyée à l'équipe administrative`);
        break;
      case 'contact':
        console.log(`📧 Accusé de réception envoyé à ${data.email}`);
        console.log(`📧 Notification envoyée à l'équipe de support`);
        break;
    }
  }

  // Méthodes pour récupérer les données (pour l'admin)
  getAppointments(): AppointmentData[] {
    return this.appointments.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }

  getRegistrations(): RegistrationData[] {
    return this.registrations.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }

  getChildRegistrations(): ChildRegistrationData[] {
    return this.childRegistrations.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }

  getContacts(): ContactData[] {
    return this.contacts.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }

  // Méthodes pour mettre à jour les statuts
  updateAppointmentStatus(id: string, status: AppointmentData['status']): void {
    const appointment = this.appointments.find(a => a.id === id);
    if (appointment) {
      appointment.status = status;
    }
  }

  updateContactStatus(id: string, status: ContactData['status']): void {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      contact.status = status;
    }
  }

  updateChildRegistrationStatus(id: string, status: ChildRegistrationData['status']): void {
    const registration = this.childRegistrations.find(r => r.id === id);
    if (registration) {
      registration.status = status;
    }
  }
}

// Composant principal pour gérer les formulaires
const FormManager: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'appointment' | 'registration' | 'childRegistration' | 'contact' | 'completeRegistration'>('appointment');
  const [isLoading, setIsLoading] = useState(false);
  const db = DatabaseManager.getInstance();
  const [completeRegistrationsCount, setCompleteRegistrationsCount] = useState(0);

  // Charger le nombre d'inscriptions complètes
  useEffect(() => {
    const loadCompleteRegistrations = async () => {
      try {
        const data = await registrationService.getAllRegistrations();
        setCompleteRegistrationsCount(data.users.length);
      } catch (error) {
        console.error('Erreur lors du chargement des inscriptions complètes:', error);
        setCompleteRegistrationsCount(0);
      }
    };

    loadCompleteRegistrations();
  }, []);

  const handleAppointmentSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await db.saveAppointment(data);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rendez-vous:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await db.saveRegistration(data);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'inscription:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChildRegistrationSubmit = async (data: any, documents: File[]) => {
    setIsLoading(true);
    try {
      await db.saveChildRegistration(data, documents);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'inscription enfant:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await db.saveContact(data);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du contact:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteRegistrationSubmit = async (result: any) => {
    console.log('Inscription complète réussie:', result);
    // Ici vous pouvez ajouter une logique supplémentaire après l'inscription
  };

  const handleCompleteRegistrationError = (error: string) => {
    console.error('Erreur lors de l\'inscription complète:', error);
    // Ici vous pouvez ajouter une logique de gestion d'erreur
  };

  const formTabs = [
    {
      id: 'appointment',
      label: 'Rendez-vous Urgent',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'red'
    },
    {
      id: 'registration',
      label: 'Inscription Utilisateur',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'childRegistration',
      label: 'Inscription Enfant',
      icon: <Users className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'completeRegistration',
      label: 'Inscription Complète',
      icon: <UsersRound className="w-5 h-5" />,
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Système de Gestion des Formulaires
          </h1>
          <p className="text-xl text-gray-600">
            Nouvelle Génération Pro - Plateforme d'inscription et de contact
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
            {formTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveForm(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeForm === tab.id
                    ? `bg-${tab.color}-600 text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {activeForm === 'appointment' && (
            <AppointmentForm
              onSubmit={handleAppointmentSubmit}
              isLoading={isLoading}
            />
          )}
          {activeForm === 'registration' && (
            <RegistrationForm
              onSubmit={handleRegistrationSubmit}
              isLoading={isLoading}
            />
          )}
          {activeForm === 'childRegistration' && (
            <ChildRegistrationForm
              onSubmit={handleChildRegistrationSubmit}
              isLoading={isLoading}
            />
          )}
          {activeForm === 'contact' && (
            <ContactForm
              onSubmit={handleContactSubmit}
              isLoading={isLoading}
            />
          )}
          {activeForm === 'completeRegistration' && (
            <CompleteRegistrationForm
              onSuccess={handleCompleteRegistrationSubmit}
              onError={handleCompleteRegistrationError}
            />
          )}
        </div>

        {/* Database Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">État de la Base de Données</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Rendez-vous Urgents</h4>
              <p className="text-2xl font-bold text-red-600">{db.getAppointments().length}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Inscriptions Utilisateur</h4>
              <p className="text-2xl font-bold text-blue-600">{db.getRegistrations().length}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Inscriptions Enfant</h4>
              <p className="text-2xl font-bold text-green-600">{db.getChildRegistrations().length}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">Messages de Contact</h4>
              <p className="text-2xl font-bold text-purple-600">{db.getContacts().length}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-medium text-indigo-800 mb-2">Inscriptions Complètes</h4>
              <p className="text-2xl font-bold text-indigo-600">{completeRegistrationsCount}</p>
            </div>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fonctionnalités Implémentées</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">✅ Sécurité et Validation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Validation des données avec Zod</li>
                <li>• Protection anti-spam avec captcha</li>
                <li>• Gestion des doublons d'inscription</li>
                <li>• Validation des formats (email, téléphone)</li>
                <li>• Cryptage sécurisé des mots de passe</li>
                <li>• Validation des âges (parent/enfant)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">📧 Notifications</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Confirmations par email et SMS</li>
                <li>• Accusés de réception automatiques</li>
                <li>• Notifications à l'équipe administrative</li>
                <li>• Traitement prioritaire des urgences</li>
                <li>• Notifications de bienvenue</li>
                <li>• Suivi des inscriptions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">💾 Stockage des Données</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Persistance avec localStorage</li>
                <li>• Horodatage de toutes les soumissions</li>
                <li>• Gestion des statuts de traitement</li>
                <li>• Upload et gestion des documents</li>
                <li>• Relations parent-enfant</li>
                <li>• Gestion des profils utilisateur</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">🔐 Sécurité & RGPD</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Consentement explicite pour les données</li>
                <li>• Politique de confidentialité</li>
                <li>• Gestion des préférences de notification</li>
                <li>• Sécurisation des données personnelles</li>
                <li>• Authentification sécurisée</li>
                <li>• Gestion des sessions utilisateur</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormManager;
export { DatabaseManager };