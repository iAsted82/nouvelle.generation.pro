import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Schémas de validation
export const parentSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Format email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'),
  phone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone invalide'),
  address: z.string().min(10, 'L\'adresse doit contenir au moins 10 caractères'),
  profession: z.string().min(2, 'La profession est requise'),
  dateOfBirth: z.string().min(1, 'La date de naissance est requise'),
  nationality: z.string().min(2, 'La nationalité est requise')
});

export const childSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  dateOfBirth: z.string().min(1, 'La date de naissance est requise'),
  gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Le genre est requis' }) }),
  allergies: z.string().optional(),
  specialDiet: z.string().optional(),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().min(2, 'Contact d\'urgence requis'),
  emergencyPhone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro d\'urgence invalide'),
  currentLevel: z.enum(['petite_section', 'moyenne_section', 'grande_section'], {
    errorMap: () => ({ message: 'Le niveau scolaire est requis' })
  }),
  previousSchool: z.string().optional()
});

export const completeRegistrationSchema = z.object({
  parent: parentSchema,
  child: childSchema,
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions d\'utilisation'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'Vous devez accepter la politique de confidentialité')
});

export type ParentData = z.infer<typeof parentSchema>;
export type ChildData = z.infer<typeof childSchema>;
export type CompleteRegistrationData = z.infer<typeof completeRegistrationSchema>;

// Types pour la base de données
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phone: string;
  address: string;
  profession: string;
  dateOfBirth: string;
  nationality: string;
  role: 'parent' | 'admin';
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface Child {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  allergies?: string;
  specialDiet?: string;
  medicalConditions?: string;
  emergencyContact: string;
  emergencyPhone: string;
  currentLevel: 'petite_section' | 'moyenne_section' | 'grande_section';
  previousSchool?: string;
  registrationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  data?: {
    parent: User;
    child: Child;
  };
  errors?: string[];
}

// Service de base de données simulée avec localStorage
class DatabaseService {
  private static instance: DatabaseService;
  
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getChildren(): Child[] {
    const children = localStorage.getItem('children');
    return children ? JSON.parse(children) : [];
  }

  private saveChildren(children: Child[]): void {
    localStorage.setItem('children', JSON.stringify(children));
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async createUser(userData: ParentData): Promise<User> {
    const users = this.getUsers();
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const newUser: User = {
      id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      passwordHash: hashedPassword,
      phone: userData.phone,
      address: userData.address,
      profession: userData.profession,
      dateOfBirth: userData.dateOfBirth,
      nationality: userData.nationality,
      role: 'parent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEmailVerified: false,
      isActive: true
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  async createChild(childData: ChildData, parentId: string): Promise<Child> {
    const children = this.getChildren();
    const id = `child_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newChild: Child = {
      id,
      parentId,
      firstName: childData.firstName,
      lastName: childData.lastName,
      dateOfBirth: childData.dateOfBirth,
      gender: childData.gender,
      allergies: childData.allergies,
      specialDiet: childData.specialDiet,
      medicalConditions: childData.medicalConditions,
      emergencyContact: childData.emergencyContact,
      emergencyPhone: childData.emergencyPhone,
      currentLevel: childData.currentLevel,
      previousSchool: childData.previousSchool,
      registrationStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    children.push(newChild);
    this.saveChildren(children);
    return newChild;
  }

  async getUserById(id: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  async getChildrenByParentId(parentId: string): Promise<Child[]> {
    const children = this.getChildren();
    return children.filter(child => child.parentId === parentId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getUsers();
  }

  async getAllChildren(): Promise<Child[]> {
    return this.getChildren();
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
    this.saveUsers(users);
    return users[userIndex];
  }

  async updateChild(id: string, updates: Partial<Child>): Promise<Child | null> {
    const children = this.getChildren();
    const childIndex = children.findIndex(child => child.id === id);
    
    if (childIndex === -1) return null;
    
    children[childIndex] = { ...children[childIndex], ...updates, updatedAt: new Date().toISOString() };
    this.saveChildren(children);
    return children[childIndex];
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) return false;
    
    this.saveUsers(filteredUsers);
    
    // Supprimer aussi les enfants associés
    const children = this.getChildren();
    const filteredChildren = children.filter(child => child.parentId !== id);
    this.saveChildren(filteredChildren);
    
    return true;
  }

  async deleteChild(id: string): Promise<boolean> {
    const children = this.getChildren();
    const filteredChildren = children.filter(child => child.id !== id);
    
    if (filteredChildren.length === children.length) return false;
    
    this.saveChildren(filteredChildren);
    return true;
  }
}

// Service d'inscription principal
export class RegistrationService {
  private db: DatabaseService;

  constructor() {
    this.db = DatabaseService.getInstance();
  }

  async registerParentAndChild(data: CompleteRegistrationData): Promise<RegistrationResult> {
    try {
      // 1. Validation des données
      const validationResult = completeRegistrationSchema.safeParse(data);
      if (!validationResult.success) {
        return {
          success: false,
          message: 'Données invalides',
          errors: validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }

      // 2. Vérification de l'email unique
      const existingUser = await this.db.findUserByEmail(data.parent.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Un compte avec cette adresse email existe déjà',
          errors: ['Email déjà utilisé']
        };
      }

      // 3. Validation de l'âge de l'enfant
      const childAge = this.calculateAge(data.child.dateOfBirth);
      if (childAge < 3 || childAge > 6) {
        return {
          success: false,
          message: 'L\'âge de l\'enfant doit être entre 3 et 6 ans',
          errors: ['Âge invalide']
        };
      }

      // 4. Validation de l'âge du parent
      const parentAge = this.calculateAge(data.parent.dateOfBirth);
      if (parentAge < 18) {
        return {
          success: false,
          message: 'Le parent doit être majeur',
          errors: ['Âge du parent invalide']
        };
      }

      // 5. Créer le parent
      const parent = await this.db.createUser(data.parent);

      // 6. Créer l'enfant et établir la relation
      const child = await this.db.createChild(data.child, parent.id);

      // 7. Envoyer les notifications (simulation)
      await this.sendWelcomeNotifications(parent, child);

      // 8. Retourner le succès
      return {
        success: true,
        message: 'Inscription réussie ! Un email de confirmation a été envoyé.',
        data: {
          parent: { ...parent, passwordHash: '' }, // Ne pas retourner le hash du mot de passe
          child
        }
      };

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        success: false,
        message: 'Erreur interne du serveur',
        errors: ['Une erreur inattendue s\'est produite']
      };
    }
  }

  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  private async sendWelcomeNotifications(parent: User, child: Child): Promise<void> {
    // Simulation d'envoi de notifications
    console.log('📧 Email de bienvenue envoyé à:', parent.email);
    console.log('📱 SMS de confirmation envoyé au:', parent.phone);
    console.log('👶 Inscription de l\'enfant:', child.firstName, child.lastName);
    
    // Ici, vous pourriez intégrer un vrai service d'email/SMS
    // comme SendGrid, Mailgun, Twilio, etc.
  }

  async authenticateUser(email: string, password: string): Promise<{ user: User | null, success: boolean }> {
    try {
      const user = await this.db.findUserByEmail(email);
      if (!user) {
        return { user: null, success: false };
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return { user: null, success: false };
      }

      if (!user.isActive) {
        return { user: null, success: false };
      }

      return { user: { ...user, passwordHash: '' }, success: true };
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      return { user: null, success: false };
    }
  }

  async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.db.getUserById(userId);
      if (!user) return false;

      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!isOldPasswordValid) return false;

      const newPasswordHash = await bcrypt.hash(newPassword, 12);
      const updated = await this.db.updateUser(userId, { passwordHash: newPasswordHash });
      
      return !!updated;
    } catch (error) {
      console.error('Erreur de mise à jour du mot de passe:', error);
      return false;
    }
  }

  async getParentWithChildren(parentId: string): Promise<{ parent: User | null, children: Child[] }> {
    try {
      const parent = await this.db.getUserById(parentId);
      const children = await this.db.getChildrenByParentId(parentId);
      
      return {
        parent: parent ? { ...parent, passwordHash: '' } : null,
        children
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return { parent: null, children: [] };
    }
  }

  async getAllRegistrations(): Promise<{ users: User[], children: Child[] }> {
    try {
      const users = await this.db.getAllUsers();
      const children = await this.db.getAllChildren();
      
      return {
        users: users.map(user => ({ ...user, passwordHash: '' })),
        children
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions:', error);
      return { users: [], children: [] };
    }
  }

  async updateChildStatus(childId: string, status: 'pending' | 'approved' | 'rejected'): Promise<boolean> {
    try {
      const updated = await this.db.updateChild(childId, { registrationStatus: status });
      return !!updated;
    } catch (error) {
      console.error('Erreur de mise à jour du statut:', error);
      return false;
    }
  }

  async deleteRegistration(userId: string): Promise<boolean> {
    try {
      return await this.db.deleteUser(userId);
    } catch (error) {
      console.error('Erreur de suppression:', error);
      return false;
    }
  }
}

// Instance globale
export const registrationService = new RegistrationService();