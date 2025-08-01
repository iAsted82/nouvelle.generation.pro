import React, { useState, useEffect } from 'react';
import { 
  Users, 
  User, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Home,
  LogOut,
  Shield,
  Phone,
  Mail,
  MapPin,
  Baby,
  Filter,
  Download,
  Upload,
  RefreshCw,
  BarChart3,
  UserPlus,
  Clock,
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';
import { registrationService, User as UserType, Child } from '../services/registrationService';
import { authService } from '../services/authService';
import { languageService } from '../services/languageService';
import { currencyService } from '../services/currencyService';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';

// Types pour le dashboard
interface DashboardStats {
  totalUsers: number;
  totalChildren: number;
  pendingRegistrations: number;
  totalRevenue: number;
  newSignupsToday: number;
  activeUsers: number;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalChildren: 0,
    pendingRegistrations: 0,
    totalRevenue: 0,
    newSignupsToday: 0,
    activeUsers: 0
  });
  
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());
  const [currency, setCurrency] = useState(currencyService.getCurrentCurrency());

  // Subscribe to language and currency changes
  useEffect(() => {
    const unsubscribeLang = languageService.subscribe(setLanguage);
    const unsubscribeCurr = currencyService.subscribe(setCurrency);
    
    return () => {
      unsubscribeLang();
      unsubscribeCurr();
    };
  }, []);

  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);

  // Load current user
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: '/logo-ngp.png'
      });
    }
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const registrations = await registrationService.getAllRegistrations();
      setUsers(registrations.users);
      setChildren(registrations.children);
      
      // Calculer les statistiques
      const today = new Date().toISOString().split('T')[0];
      const newSignupsToday = registrations.users.filter(user => 
        user.createdAt.startsWith(today)
      ).length;
      
      const pendingRegistrations = registrations.children.filter(child => 
        child.registrationStatus === 'pending'
      ).length;
      
      const activeUsers = registrations.users.filter(user => user.isActive).length;
      
      setStats({
        totalUsers: registrations.users.length,
        totalChildren: registrations.children.length,
        pendingRegistrations,
        totalRevenue: registrations.children.length * 2500, // Estimation
        newSignupsToday,
        activeUsers
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (childId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await registrationService.updateChildStatus(childId, newStatus);
      await loadData(); // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await registrationService.deleteRegistration(userId);
        await loadData(); // Recharger les données
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    onLogout?.();
  };

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard', 'Tableau de bord'), icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', label: t('nav.users', 'Utilisateurs'), icon: <Users className="w-5 h-5" /> },
    { id: 'children', label: t('nav.children', 'Enfants'), icon: <Baby className="w-5 h-5" /> },
    { id: 'appointments', label: t('nav.appointments', 'Rendez-vous'), icon: <Calendar className="w-5 h-5" /> },
    { id: 'messages', label: t('nav.messages', 'Messages'), icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', label: t('nav.settings', 'Paramètres'), icon: <Settings className="w-5 h-5" /> }
  ];

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('users.title', 'Gestion des Utilisateurs')}</h2>
          <p className="text-gray-600">{t('users.subtitle', 'Gérez les comptes parents et leurs enfants')}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>{t('users.new', 'Nouvel utilisateur')}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('users.search', 'Rechercher un utilisateur...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>{t('common.filter', 'Filtrer')}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.user', 'Utilisateur')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.contact', 'Contact')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.children', 'Enfants')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.status', 'Statut')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.registration', 'Inscription')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.filter(user => 
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user) => {
                const userChildren = children.filter(child => child.parentId === user.id);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.profession}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {userChildren.length} {t('users.children', 'enfant')}{userChildren.length > 1 ? 's' : ''}
                      </div>
                      {userChildren.map(child => (
                        <div key={child.id} className="text-xs text-gray-500">
                          {child.firstName} {child.lastName}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? t('users.active', 'Actif') : t('users.inactive', 'Inactif')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderChildrenTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('children.title', 'Gestion des Enfants')}</h2>
          <p className="text-gray-600">{t('children.subtitle', 'Gérez les inscriptions et statuts des enfants')}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>{t('common.export', 'Exporter')}</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>{t('children.new', 'Nouvelle inscription')}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('children.search', 'Rechercher un enfant...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">{t('children.status.all', 'Tous les statuts')}</option>
              <option value="pending">{t('children.status.pending', 'En attente')}</option>
              <option value="approved">{t('children.status.approved', 'Approuvé')}</option>
              <option value="rejected">{t('children.status.rejected', 'Rejeté')}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('children.child', 'Enfant')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('children.parent', 'Parent')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('children.level', 'Niveau')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.status', 'Statut')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.registration', 'Inscription')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('users.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {children.filter(child => 
                child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                child.lastName.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((child) => {
                const parent = users.find(user => user.id === child.parentId);
                return (
                  <tr key={child.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <Baby className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {child.firstName} {child.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {child.gender === 'male' ? t('children.boy', 'Garçon') : t('children.girl', 'Fille')} • {new Date().getFullYear() - new Date(child.dateOfBirth).getFullYear()} {t('children.years', 'ans')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {parent ? `${parent.firstName} ${parent.lastName}` : 'Parent introuvable'}
                      </div>
                      <div className="text-sm text-gray-500">{parent?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {child.currentLevel === 'petite_section' ? t('children.level.petite', 'Petite Section') :
                         child.currentLevel === 'moyenne_section' ? t('children.level.moyenne', 'Moyenne Section') :
                         child.currentLevel === 'grande_section' ? t('children.level.grande', 'Grande Section') : child.currentLevel}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={child.registrationStatus}
                        onChange={(e) => handleStatusChange(child.id, e.target.value as any)}
                        className={`text-sm rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                          child.registrationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          child.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">{t('children.status.pending', 'En attente')}</option>
                        <option value="approved">{t('children.status.approved', 'Approuvé')}</option>
                        <option value="rejected">{t('children.status.rejected', 'Rejeté')}</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(child.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('appointments.title', 'Gestion des Rendez-vous')}</h2>
          <p className="text-gray-600">{t('appointments.subtitle', 'Planifiez et gérez les rendez-vous avec les parents')}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>{t('appointments.new', 'Nouveau rendez-vous')}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">{t('appointments.none', 'Aucun rendez-vous programmé')}</h3>
          <p className="text-gray-600 mb-4">{t('appointments.none.subtitle', 'Commencez par créer votre premier rendez-vous')}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {t('appointments.create', 'Créer un rendez-vous')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{t('settings.title', 'Paramètres')}</h2>
        <p className="text-gray-600">{t('settings.subtitle', 'Configurez les paramètres de votre école')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('settings.school', 'Informations de l\'école')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.name', 'Nom de l\'école')}</label>
              <input
                type="text"
                defaultValue={t('school.name', 'Nouvelle Génération Pro')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.address', 'Adresse')}</label>
              <textarea
                defaultValue={t('school.location', 'Résidence Essafa 4, Salé')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.phone', 'Téléphone')}</label>
              <input
                type="tel"
                defaultValue={t('school.phone', '+212 5 37 86 55 81')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('settings.notifications', 'Paramètres de notification')}</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">{t('settings.email.notifications', 'Notifications par email')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">{t('settings.new.registrations', 'Nouvelles inscriptions')}</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">{t('settings.appointment.reminders', 'Rappels de rendez-vous')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          {t('settings.save.changes', 'Sauvegarder les modifications')}
        </button>
      </div>
    </div>
  );

  const renderStatCard = (title: string, value: string | number, icon: React.ReactNode, color: string, trend?: string) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('dashboard.title', 'Tableau de Bord')}</h2>
          <p className="text-gray-600">{t('dashboard.overview', 'Vue d\'ensemble des activités de l\'école')}</p>
        </div>
        <button 
          onClick={loadData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>{t('common.refresh', 'Actualiser')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard(
          t('dashboard.stats.users', 'Total Utilisateurs'),
          stats.totalUsers,
          <Users className="w-6 h-6 text-blue-600" />,
          'bg-blue-100',
          `+${stats.newSignupsToday} ${t('dashboard.stats.today', 'aujourd\'hui')}`
        )}
        {renderStatCard(
          t('dashboard.stats.children', 'Enfants Inscrits'),
          stats.totalChildren,
          <Baby className="w-6 h-6 text-green-600" />,
          'bg-green-100',
          `${stats.pendingRegistrations} ${t('dashboard.stats.waiting', 'en attente')}`
        )}
        {renderStatCard(
          t('dashboard.stats.pending', 'Inscriptions en Attente'),
          stats.pendingRegistrations,
          <Clock className="w-6 h-6 text-yellow-600" />,
          'bg-yellow-100'
        )}
        {renderStatCard(
          t('dashboard.stats.active', 'Utilisateurs Actifs'),
          stats.activeUsers,
          <Activity className="w-6 h-6 text-purple-600" />,
          'bg-purple-100'
        )}
      </div>

      {/* Graphiques et tableaux récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('dashboard.recent', 'Inscriptions Récentes')}</h3>
          <div className="space-y-3">
            {children.slice(0, 5).map((child) => {
              const parent = users.find(user => user.id === child.parentId);
              return (
                <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <Baby className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {child.firstName} {child.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('children.parent', 'Parent')}: {parent ? `${parent.firstName} ${parent.lastName}` : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    child.registrationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    child.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {child.registrationStatus === 'pending' ? t('children.status.pending', 'En attente') :
                     child.registrationStatus === 'approved' ? t('children.status.approved', 'Approuvé') : 
                     t('children.status.rejected', 'Rejeté')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('dashboard.distribution', 'Répartition par Niveau')}</h3>
          <div className="space-y-3">
            {['petite_section', 'moyenne_section', 'grande_section'].map((level) => {
              const count = children.filter(child => child.currentLevel === level).length;
              const percentage = children.length > 0 ? (count / children.length) * 100 : 0;
              const levelName = level === 'petite_section' ? t('children.level.petite', 'Petite Section') :
                              level === 'moyenne_section' ? t('children.level.moyenne', 'Moyenne Section') : 
                              t('children.level.grande', 'Grande Section');
              
              return (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{levelName}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsersTab();
      case 'children':
        return renderChildrenTab();
      case 'appointments':
        return renderAppointmentsTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-ngp.png" 
              alt="Logo Nouvelle Génération Pro" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">{t('nav.admin', 'Administration NGP')}</h1>
              <p className="text-sm text-gray-600">{t('nav.school', 'Nouvelle Génération Pro')}</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('common.search', 'Rechercher...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <LanguageSelector variant="compact" />
            
            {/* Currency Selector */}
            <CurrencySelector variant="compact" />
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {stats.pendingRegistrations > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.pendingRegistrations}
                  </span>
                )}
              </button>

              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800">{t('nav.notifications', 'Notifications')}</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {stats.pendingRegistrations > 0 ? (
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {stats.pendingRegistrations} inscription{stats.pendingRegistrations > 1 ? 's' : ''} {t('dashboard.stats.waiting', 'en attente')}
                            </p>
                            <p className="text-xs text-gray-500">{t('notifications.attention', 'Nécessite votre attention')}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <p className="text-sm">{t('notifications.none', 'Aucune notification')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur */}
            <div className="relative group">
              <div className="flex items-center space-x-3 cursor-pointer">
                <img
                  src={currentUser?.avatar || '/logo-ngp.png'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
              
              {/* User dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('auth.logout', 'Déconnexion')}</span>
                </button>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title={t('auth.logout', 'Déconnexion')}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex" dir={languageService.isRTL() ? 'rtl' : 'ltr'}>
        {/* Sidebar */}
        <nav className={`w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen ${
          languageService.isRTL() ? 'border-l border-r-0' : 'border-r'
        }`}>
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${languageService.isRTL() ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;