import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Calendar, 
  FileText, 
  Settings as SettingsIcon, 
  BarChart3, 
  Mail, 
  Phone, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  LogOut, 
  Home, 
  Bell, 
  Clock,
  UserPlus,
  GraduationCap,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  RefreshCw,
  MessageSquare,
  Camera,
  MapPin,
  Globe,
  Heart,
  Award,
  Target,
  BookOpen,
  Palette,
  Monitor,
  UserCheck
} from 'lucide-react';

// Types
interface Student {
  id: string;
  name: string;
  age: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  status: 'active' | 'pending' | 'graduated';
  photo?: string;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive';
  photo?: string;
}

interface Registration {
  id: string;
  childName: string;
  childAge: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  contactPreference: string;
  message: string;
  submissionDate: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'rejected';
}

// Mock Data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Amina Benali',
    age: 4,
    parentName: 'Fatima Benali',
    parentPhone: '06 12 34 56 78',
    parentEmail: 'fatima.benali@gmail.com',
    enrollmentDate: '2024-09-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Youssef Alami',
    age: 3,
    parentName: 'Mohamed Alami',
    parentPhone: '06 87 65 43 21',
    parentEmail: 'mohamed.alami@gmail.com',
    enrollmentDate: '2024-09-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Lila Chakir',
    age: 5,
    parentName: 'Aicha Chakir',
    parentPhone: '06 55 44 33 22',
    parentEmail: 'aicha.chakir@gmail.com',
    enrollmentDate: '2024-08-20',
    status: 'active'
  }
];

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Nadia Benjelloun',
    role: 'Directrice',
    phone: '06 11 22 33 44',
    email: 'nadia.benjelloun@nouvellegenerationpro.ma',
    hireDate: '2020-01-15',
    salary: 8000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Samira Idrissi',
    role: 'Enseignante',
    phone: '06 55 66 77 88',
    email: 'samira.idrissi@nouvellegenerationpro.ma',
    hireDate: '2021-09-01',
    salary: 5500,
    status: 'active'
  },
  {
    id: '3',
    name: 'Hassan Zemrani',
    role: 'Enseignant',
    phone: '06 99 88 77 66',
    email: 'hassan.zemrani@nouvellegenerationpro.ma',
    hireDate: '2022-01-10',
    salary: 5200,
    status: 'active'
  }
];

const mockRegistrations: Registration[] = [
  {
    id: '1',
    childName: 'Omar Bousaid',
    childAge: 4,
    parentName: 'Laila Bousaid',
    parentPhone: '06 44 55 66 77',
    parentEmail: 'laila.bousaid@gmail.com',
    contactPreference: 'telephone',
    message: 'Je souhaite inscrire mon fils pour la rentrée 2025',
    submissionDate: '2024-12-20',
    status: 'pending'
  },
  {
    id: '2',
    childName: 'Zineb Fassi',
    childAge: 3,
    parentName: 'Rachid Fassi',
    parentPhone: '06 33 22 11 00',
    parentEmail: 'rachid.fassi@gmail.com',
    contactPreference: 'whatsapp',
    message: 'Demande d\'information sur les frais de scolarité',
    submissionDate: '2024-12-18',
    status: 'contacted'
  }
];

// Admin Authentication Component
const AdminAuth: React.FC<{ onLogin: (credentials: any) => void }> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'authentification
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'nouvelle2025') {
        onLogin({
          id: '1',
          name: 'Administrateur',
          role: 'admin',
          email: 'admin@nouvellegenerationpro.ma'
        });
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
            <p className="text-gray-600">Nouvelle Génération Pro</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez votre nom d'utilisateur"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Accès restreint aux administrateurs autorisés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Élèves Inscrits",
      value: "48",
      change: "+5 cette semaine",
      color: "blue"
    },
    {
      icon: <UserPlus className="w-8 h-8 text-green-600" />,
      title: "Nouvelles Demandes",
      value: "12",
      change: "+3 aujourd'hui",
      color: "green"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      title: "Personnel",
      value: "8",
      change: "Équipe complète",
      color: "purple"
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: "Places Restantes",
      value: "32",
      change: "Pour 2025-2026",
      color: "orange"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'inscription',
      message: 'Nouvelle inscription : Omar Bousaid',
      time: 'Il y a 2 heures',
      icon: <UserPlus className="w-5 h-5 text-green-600" />
    },
    {
      id: 2,
      type: 'contact',
      message: 'Demande de contact : Zineb Fassi',
      time: 'Il y a 4 heures',
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />
    },
    {
      id: 3,
      type: 'staff',
      message: 'Nouveau membre : Samira Idrissi',
      time: 'Hier',
      icon: <UserCheck className="w-5 h-5 text-purple-600" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inscriptions Mensuelles</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Graphique des inscriptions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Students Management Component
const StudentsManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const AddStudentModal = () => {
    const [newStudent, setNewStudent] = useState({
      name: '',
      age: 3,
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active' as const
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const student: Student = {
        id: Date.now().toString(),
        ...newStudent
      };
      setStudents([...students, student]);
      setShowAddModal(false);
      setNewStudent({
        name: '',
        age: 3,
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active'
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Ajouter un Élève</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'enfant
              </label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Âge
              </label>
              <select
                value={newStudent.age}
                onChange={(e) => setNewStudent({...newStudent, age: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3 ans</option>
                <option value={4}>4 ans</option>
                <option value={5}>5 ans</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du parent
              </label>
              <input
                type="text"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={newStudent.parentEmail}
                onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Élèves</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un élève</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un élève ou parent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="graduated">Diplômés</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtrer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Élève
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Âge
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Inscrit le {student.enrollmentDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.age} ans
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.parentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{student.parentPhone}</div>
                    <div className="text-gray-500">{student.parentEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : student.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status === 'active' ? 'Actif' : 
                       student.status === 'pending' ? 'En attente' : 'Diplômé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddStudentModal />}
    </div>
  );
};

// Staff Management Component
const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestion du Personnel</h1>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Ajouter un employé</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {member.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Embauché le {member.hireDate}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                member.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {member.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-yellow-600 hover:text-yellow-900">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Registrations Management Component
const RegistrationsManagement: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRegistrations = registrations.filter(reg => 
    filterStatus === 'all' || reg.status === filterStatus
  );

  const updateRegistrationStatus = (id: string, status: Registration['status']) => {
    setRegistrations(registrations.map(reg => 
      reg.id === id ? { ...reg, status } : reg
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Demandes d'Inscription</h1>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="contacted">Contacté</option>
            <option value="enrolled">Inscrit</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      {/* Registrations List */}
      <div className="space-y-4">
        {filteredRegistrations.map((registration) => (
          <div key={registration.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {registration.childName} ({registration.childAge} ans)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Parent: {registration.parentName}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {registration.parentPhone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {registration.parentEmail}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {registration.submissionDate}
                  </div>
                </div>
                {registration.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{registration.message}</p>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  registration.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : registration.status === 'contacted'
                    ? 'bg-blue-100 text-blue-800'
                    : registration.status === 'enrolled'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {registration.status === 'pending' ? 'En attente' :
                   registration.status === 'contacted' ? 'Contacté' :
                   registration.status === 'enrolled' ? 'Inscrit' : 'Rejeté'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateRegistrationStatus(registration.id, 'contacted')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Marquer comme contacté
                </button>
                <button
                  onClick={() => updateRegistrationStatus(registration.id, 'enrolled')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Inscrire
                </button>
                <button
                  onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Rejeter
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="text-purple-600 hover:text-purple-900">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Component
const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    schoolName: 'Nouvelle Génération Pro',
    address: 'Résidence Essafa 4, Salé',
    phone: '05 37 00 00 00',
    email: 'info@nouvellegenerationpro.ma',
    capacity: 80,
    pricePerMonth: 800,
    openingHours: '8h00-18h00',
    description: 'École maternelle moderne avec éducation bilingue arabe-français'
  });

  const handleSave = () => {
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de l'École</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'école
              </label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Operational Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Paramètres Opérationnels</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacité totale
              </label>
              <input
                type="number"
                value={settings.capacity}
                onChange={(e) => setSettings({...settings, capacity: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frais mensuels (DH)
              </label>
              <input
                type="number"
                value={settings.pricePerMonth}
                onChange={(e) => setSettings({...settings, pricePerMonth: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horaires d'ouverture
              </label>
              <input
                type="text"
                value={settings.openingHours}
                onChange={(e) => setSettings({...settings, openingHours: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={settings.description}
                onChange={(e) => setSettings({...settings, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'students', label: 'Élèves', icon: <Users className="w-5 h-5" /> },
    { id: 'staff', label: 'Personnel', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'registrations', label: 'Inscriptions', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <SettingsIcon className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'students':
        return <StudentsManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'registrations':
        return <RegistrationsManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
              <p className="text-sm text-gray-600">Nouvelle Génération Pro</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;