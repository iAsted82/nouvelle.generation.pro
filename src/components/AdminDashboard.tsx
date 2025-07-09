import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  CheckCircle,
  Info,
  LogOut,
  Home,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  MoreHorizontal,
  Save,
  RefreshCw,
  Shield,
  Database,
  Server,
  Globe,
  Lock,
  User,
  UserPlus,
  UserMinus,
  FileText,
  PieChart,
  BarChart,
  LineChart
} from 'lucide-react';

// Types pour les données
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  description: string;
  image?: string;
  createdAt: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  amount: number;
  type: 'purchase' | 'refund' | 'subscription';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: string;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
}

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  totalTransactions: number;
  activeUsers: number;
  monthlyGrowth: number;
  revenueGrowth: number;
  conversionRate: number;
}

// Gestionnaire de données simulé
class AdminDataManager {
  private static instance: AdminDataManager;
  private users: User[] = [];
  private products: Product[] = [];
  private transactions: Transaction[] = [];
  private notifications: Notification[] = [];

  static getInstance(): AdminDataManager {
    if (!AdminDataManager.instance) {
      AdminDataManager.instance = new AdminDataManager();
      AdminDataManager.instance.initializeData();
    }
    return AdminDataManager.instance;
  }

  private initializeData() {
    // Données utilisateurs simulées
    this.users = [
      {
        id: '1',
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        role: 'user',
        status: 'active',
        lastLogin: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        phone: '06 12 34 56 78',
        address: '123 Rue de la Paix, Paris'
      },
      {
        id: '2',
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
        role: 'moderator',
        status: 'active',
        lastLogin: '2024-01-14T15:45:00Z',
        createdAt: '2024-01-02T00:00:00Z',
        phone: '06 98 76 54 32',
        address: '456 Avenue des Champs, Lyon'
      },
      {
        id: '3',
        name: 'Pierre Durand',
        email: 'pierre.durand@example.com',
        role: 'user',
        status: 'suspended',
        lastLogin: '2024-01-10T08:20:00Z',
        createdAt: '2024-01-03T00:00:00Z',
        phone: '06 11 22 33 44',
        address: '789 Boulevard du Centre, Marseille'
      }
    ];

    // Données produits simulées
    this.products = [
      {
        id: '1',
        name: 'Inscription Maternelle',
        category: 'Services',
        price: 150,
        stock: 50,
        status: 'active',
        description: 'Inscription pour la maternelle avec dossier complet',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Rendez-vous Urgent',
        category: 'Services',
        price: 25,
        stock: 100,
        status: 'active',
        description: 'Service de rendez-vous prioritaire',
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        name: 'Consultation Pédagogique',
        category: 'Services',
        price: 75,
        stock: 30,
        status: 'active',
        description: 'Consultation avec un expert pédagogique',
        createdAt: '2024-01-03T00:00:00Z'
      }
    ];

    // Transactions simulées
    this.transactions = [
      {
        id: '1',
        userId: '1',
        userName: 'Jean Dupont',
        productId: '1',
        productName: 'Inscription Maternelle',
        amount: 150,
        type: 'purchase',
        status: 'completed',
        date: '2024-01-15T10:30:00Z',
        paymentMethod: 'Carte bancaire'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Marie Martin',
        productId: '2',
        productName: 'Rendez-vous Urgent',
        amount: 25,
        type: 'purchase',
        status: 'pending',
        date: '2024-01-14T15:45:00Z',
        paymentMethod: 'PayPal'
      }
    ];

    // Notifications simulées
    this.notifications = [
      {
        id: '1',
        type: 'info',
        title: 'Nouvelle inscription',
        message: 'Jean Dupont s\'est inscrit pour la maternelle',
        timestamp: '2024-01-15T10:30:00Z',
        read: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Stock faible',
        message: 'Le stock de consultations pédagogiques est faible',
        timestamp: '2024-01-14T15:45:00Z',
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Paiement reçu',
        message: 'Paiement de 150€ reçu de Jean Dupont',
        timestamp: '2024-01-13T12:20:00Z',
        read: true
      }
    ];
  }

  // Méthodes pour les utilisateurs
  getUsers(): User[] {
    return [...this.users];
  }

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: Date.now().toString()
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }

  // Méthodes pour les produits
  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  // Méthodes pour les transactions
  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  // Méthodes pour les notifications
  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  markNotificationAsRead(id: string): boolean {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return false;
    
    notification.read = true;
    return true;
  }

  // Statistiques
  getStats(): DashboardStats {
    const activeUsers = this.users.filter(u => u.status === 'active').length;
    const totalRevenue = this.transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalUsers: this.users.length,
      totalProducts: this.products.length,
      totalRevenue,
      totalTransactions: this.transactions.length,
      activeUsers,
      monthlyGrowth: 12.5,
      revenueGrowth: 8.7,
      conversionRate: 3.2
    };
  }
}

// Composants UI réutilisables
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const Toast: React.FC<{
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}> = ({ type, message, isVisible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm w-full ${colors[type]} border rounded-lg p-4 shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="text-sm font-medium text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, trend, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {change && (
          <div className="flex items-center space-x-1 mt-2">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change}
            </span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const DataTable: React.FC<{
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ columns, data, onEdit, onDelete, onView, currentPage, totalPages, onPageChange }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column.label}
              </th>
            ))}
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {/* Pagination */}
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Page {currentPage} sur {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Composant principal AdminDashboard
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'user' | 'product' | 'delete' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });

  const dataManager = AdminDataManager.getInstance();
  const [users, setUsers] = useState<User[]>(dataManager.getUsers());
  const [products, setProducts] = useState<Product[]>(dataManager.getProducts());
  const [transactions, setTransactions] = useState<Transaction[]>(dataManager.getTransactions());
  const [notifications, setNotifications] = useState<Notification[]>(dataManager.getNotifications());
  const [stats, setStats] = useState<DashboardStats>(dataManager.getStats());

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setToast({ type, message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const refreshData = () => {
    setUsers(dataManager.getUsers());
    setProducts(dataManager.getProducts());
    setTransactions(dataManager.getTransactions());
    setNotifications(dataManager.getNotifications());
    setStats(dataManager.getStats());
  };

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    try {
      dataManager.addUser(userData);
      refreshData();
      setShowModal(false);
      showToast('success', 'Utilisateur ajouté avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  const handleUpdateUser = (id: string, userData: Partial<User>) => {
    try {
      dataManager.updateUser(id, userData);
      refreshData();
      setShowModal(false);
      showToast('success', 'Utilisateur mis à jour avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de la mise à jour de l\'utilisateur');
    }
  };

  const handleDeleteUser = (id: string) => {
    try {
      dataManager.deleteUser(id);
      refreshData();
      setShowModal(false);
      showToast('success', 'Utilisateur supprimé avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    try {
      dataManager.addProduct(productData);
      refreshData();
      setShowModal(false);
      showToast('success', 'Produit ajouté avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de l\'ajout du produit');
    }
  };

  const handleUpdateProduct = (id: string, productData: Partial<Product>) => {
    try {
      dataManager.updateProduct(id, productData);
      refreshData();
      setShowModal(false);
      showToast('success', 'Produit mis à jour avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de la mise à jour du produit');
    }
  };

  const handleDeleteProduct = (id: string) => {
    try {
      dataManager.deleteProduct(id);
      refreshData();
      setShowModal(false);
      showToast('success', 'Produit supprimé avec succès');
    } catch (error) {
      showToast('error', 'Erreur lors de la suppression du produit');
    }
  };

  const openModal = (type: 'user' | 'product' | 'delete', item: any = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedItem(null);
  };

  // Menu de navigation latéral
  const AdminSidebar: React.FC<{
    activeTab: string;
    onTabChange: (tab: string) => void;
    user: User;
  }> = ({ activeTab, onTabChange, user }) => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: <BarChart3 className="w-5 h-5" /> },
      { id: 'users', label: 'Utilisateurs', icon: <Users className="w-5 h-5" /> },
      { id: 'products', label: 'Produits/Services', icon: <Package className="w-5 h-5" /> },
      { id: 'transactions', label: 'Transactions', icon: <CreditCard className="w-5 h-5" /> },
      { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
      { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> }
    ];

    return (
      <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <p className="text-sm text-gray-400">Nouvelle Génération Pro</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    );
  };

  // En-tête avec barre de recherche
  const AdminHeader: React.FC = () => {
    const unreadNotifications = notifications.filter(n => !n.read).length;

    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'users' && 'Gestion des utilisateurs'}
              {activeTab === 'products' && 'Gestion des produits'}
              {activeTab === 'transactions' && 'Historique des transactions'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'settings' && 'Paramètres'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    );
  };

  // Tableau de bord principal
  const DashboardContent: React.FC = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          change={`+${stats.monthlyGrowth}%`}
          trend="up"
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Produits/Services"
          value={stats.totalProducts}
          icon={<Package className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
        <StatsCard
          title="Chiffre d'affaires"
          value={`${stats.totalRevenue}€`}
          change={`+${stats.revenueGrowth}%`}
          trend="up"
          icon={<DollarSign className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <StatsCard
          title="Transactions"
          value={stats.totalTransactions}
          change={`${stats.conversionRate}%`}
          trend="up"
          icon={<CreditCard className="w-6 h-6 text-orange-600" />}
          color="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.productName}</p>
                    <p className="text-sm text-gray-600">{transaction.userName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{transaction.amount}€</p>
                  <p className={`text-sm ${
                    transaction.status === 'completed' ? 'text-green-600' :
                    transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications récentes</h3>
          <div className="space-y-4">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' :
                  notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                  {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                  {notification.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Gestion des utilisateurs
  const UsersContent: React.FC = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const userColumns = [
      { key: 'name', label: 'Nom' },
      { key: 'email', label: 'Email' },
      { 
        key: 'role', 
        label: 'Rôle',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'admin' ? 'bg-red-100 text-red-800' :
            value === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Statut',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'active' ? 'bg-green-100 text-green-800' :
            value === 'inactive' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'lastLogin', 
        label: 'Dernière connexion',
        render: (value: string) => new Date(value).toLocaleDateString()
      }
    ];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Gestion des utilisateurs</h2>
          <button
            onClick={() => openModal('user')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un utilisateur</span>
          </button>
        </div>

        <DataTable
          columns={userColumns}
          data={paginatedUsers}
          onEdit={(user) => openModal('user', user)}
          onDelete={(user) => openModal('delete', { type: 'user', item: user })}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  };

  // Gestion des produits
  const ProductsContent: React.FC = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const productColumns = [
      { key: 'name', label: 'Nom' },
      { key: 'category', label: 'Catégorie' },
      { 
        key: 'price', 
        label: 'Prix',
        render: (value: number) => `${value}€`
      },
      { key: 'stock', label: 'Stock' },
      { 
        key: 'status', 
        label: 'Statut',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'active' ? 'bg-green-100 text-green-800' :
            value === 'inactive' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      }
    ];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Gestion des produits/services</h2>
          <button
            onClick={() => openModal('product')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un produit</span>
          </button>
        </div>

        <DataTable
          columns={productColumns}
          data={paginatedProducts}
          onEdit={(product) => openModal('product', product)}
          onDelete={(product) => openModal('delete', { type: 'product', item: product })}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  };

  // Historique des transactions
  const TransactionsContent: React.FC = () => {
    const filteredTransactions = transactions.filter(transaction =>
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    const transactionColumns = [
      { key: 'userName', label: 'Utilisateur' },
      { key: 'productName', label: 'Produit/Service' },
      { 
        key: 'amount', 
        label: 'Montant',
        render: (value: number) => `${value}€`
      },
      { 
        key: 'type', 
        label: 'Type',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'purchase' ? 'bg-green-100 text-green-800' :
            value === 'refund' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Statut',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'completed' ? 'bg-green-100 text-green-800' :
            value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'date', 
        label: 'Date',
        render: (value: string) => new Date(value).toLocaleDateString()
      }
    ];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Historique des transactions</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>

        <DataTable
          columns={transactionColumns}
          data={paginatedTransactions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  };

  // Notifications
  const NotificationsContent: React.FC = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Marquer toutes comme lues
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' :
                  notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                  {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                  {notification.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              {!notification.read && (
                <button
                  onClick={() => {
                    dataManager.markNotificationAsRead(notification.id);
                    setNotifications(dataManager.getNotifications());
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Marquer comme lue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Paramètres
  const SettingsContent: React.FC = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres du compte</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Paramètres généraux</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'école
              </label>
              <input
                type="text"
                defaultValue="Nouvelle Génération Pro"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de contact
              </label>
              <input
                type="email"
                defaultValue="admin@nouvellegeneration.pro"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue="05 37 00 00 00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sécurité</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Recevoir les notifications par email
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Notifications de nouvelles inscriptions
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Notifications de paiement
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Annuler
          </button>
          <button
            onClick={() => showToast('success', 'Paramètres sauvegardés avec succès')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Formulaires de gestion
  const UserForm: React.FC<{ user?: User; onSubmit: (data: any) => void; onCancel: () => void }> = ({ 
    user, 
    onSubmit, 
    onCancel 
  }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user',
      status: user?.status || 'active',
      phone: user?.phone || '',
      address: user?.address || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">Utilisateur</option>
              <option value="moderator">Modérateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {user ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>
    );
  };

  const ProductForm: React.FC<{ product?: Product; onSubmit: (data: any) => void; onCancel: () => void }> = ({ 
    product, 
    onSubmit, 
    onCancel 
  }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      status: product?.status || 'active',
      description: product?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du produit/service *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock *
            </label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Product['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="discontinued">Discontinué</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {product ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>
    );
  };

  const DeleteConfirmation: React.FC<{ item: any; onConfirm: () => void; onCancel: () => void }> = ({ 
    item, 
    onConfirm, 
    onCancel 
  }) => (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Confirmer la suppression
      </h3>
      <p className="text-gray-600 mb-6">
        Êtes-vous sûr de vouloir supprimer{' '}
        <span className="font-medium">
          {item.item.name || item.item.userName || item.item.title}
        </span>
        ? Cette action est irréversible.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'products':
        return <ProductsContent />;
      case 'transactions':
        return <TransactionsContent />;
      case 'notifications':
        return <NotificationsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  const renderModal = () => {
    if (!showModal || !modalType) return null;

    switch (modalType) {
      case 'user':
        return (
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title={selectedItem ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
          >
            <UserForm
              user={selectedItem}
              onSubmit={(data) => {
                if (selectedItem) {
                  handleUpdateUser(selectedItem.id, data);
                } else {
                  handleAddUser({
                    ...data,
                    lastLogin: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                  });
                }
              }}
              onCancel={closeModal}
            />
          </Modal>
        );
      case 'product':
        return (
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title={selectedItem ? 'Modifier le produit' : 'Ajouter un produit'}
          >
            <ProductForm
              product={selectedItem}
              onSubmit={(data) => {
                if (selectedItem) {
                  handleUpdateProduct(selectedItem.id, data);
                } else {
                  handleAddProduct({
                    ...data,
                    createdAt: new Date().toISOString()
                  });
                }
              }}
              onCancel={closeModal}
            />
          </Modal>
        );
      case 'delete':
        return (
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title="Confirmer la suppression"
          >
            <DeleteConfirmation
              item={selectedItem}
              onConfirm={() => {
                if (selectedItem.type === 'user') {
                  handleDeleteUser(selectedItem.item.id);
                } else if (selectedItem.type === 'product') {
                  handleDeleteProduct(selectedItem.item.id);
                }
              }}
              onCancel={closeModal}
            />
          </Modal>
        );
      default:
        return null;
    }
  };

  const adminUser: User = {
    id: 'admin',
    name: 'Administrateur',
    email: 'admin@nouvellegeneration.pro',
    role: 'admin',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        user={adminUser}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {renderContent()}
        </main>
      </div>

      {renderModal()}
      
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default AdminDashboard;