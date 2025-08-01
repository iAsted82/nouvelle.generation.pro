import bcrypt from 'bcryptjs';

// Types
export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'super-admin';
  name: string;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  failedLoginAttempts: number;
  lockUntil?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: Omit<AdminUser, 'passwordHash'>;
  token?: string;
}

// Admin credentials
const DEFAULT_ADMIN: AdminUser = {
  id: 'admin-ngp-001',
  email: 'periscolaire@nouvellegeneration.pro',
  passwordHash: '', // Will be set when service initializes
  role: 'super-admin',
  name: 'Administrateur NGP',
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  failedLoginAttempts: 0
};

class AuthService {
  private static instance: AuthService;
  private currentUser: Omit<AdminUser, 'passwordHash'> | null = null;
  private sessionToken: string | null = null;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    this.initializeDefaultAdmin();
    this.loadSession();
  }

  private async initializeDefaultAdmin(): Promise<void> {
    const admins = this.getAdmins();
    if (admins.length === 0) {
      const hashedPassword = await bcrypt.hash('Karima1982*', 12);
      const admin: AdminUser = {
        ...DEFAULT_ADMIN,
        passwordHash: hashedPassword
      };
      localStorage.setItem('admins', JSON.stringify([admin]));
    }
  }

  private getAdmins(): AdminUser[] {
    const admins = localStorage.getItem('admins');
    return admins ? JSON.parse(admins) : [];
  }

  private saveAdmins(admins: AdminUser[]): void {
    localStorage.setItem('admins', JSON.stringify(admins));
  }

  private generateToken(): string {
    return `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveSession(user: Omit<AdminUser, 'passwordHash'>, token: string, rememberMe: boolean = false): void {
    this.currentUser = user;
    this.sessionToken = token;
    
    const sessionData = {
      user,
      token,
      expiresAt: rememberMe 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
  }

  private loadSession(): void {
    const session = localStorage.getItem('adminSession');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (new Date(sessionData.expiresAt) > new Date()) {
          this.currentUser = sessionData.user;
          this.sessionToken = sessionData.token;
        } else {
          this.clearSession();
        }
      } catch (error) {
        this.clearSession();
      }
    }
  }

  private clearSession(): void {
    this.currentUser = null;
    this.sessionToken = null;
    localStorage.removeItem('adminSession');
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const { email, password, rememberMe } = credentials;
      const admins = this.getAdmins();
      const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());

      if (!admin) {
        return {
          success: false,
          message: 'Identifiants incorrects'
        };
      }

      // Check if account is locked
      if (admin.lockUntil && new Date(admin.lockUntil) > new Date()) {
        const lockRemaining = Math.ceil((new Date(admin.lockUntil).getTime() - Date.now()) / 60000);
        return {
          success: false,
          message: `Compte verrouillé. Réessayez dans ${lockRemaining} minute(s).`
        };
      }

      // Check if account is active
      if (!admin.isActive) {
        return {
          success: false,
          message: 'Compte désactivé'
        };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
      
      if (!isPasswordValid) {
        // Increment failed attempts
        admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
        
        // Lock account if max attempts reached
        if (admin.failedLoginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
          admin.lockUntil = new Date(Date.now() + this.LOCKOUT_DURATION).toISOString();
        }
        
        this.saveAdmins(admins);
        
        return {
          success: false,
          message: `Identifiants incorrects. ${this.MAX_LOGIN_ATTEMPTS - admin.failedLoginAttempts} tentative(s) restante(s).`
        };
      }

      // Success - reset failed attempts and update last login
      admin.failedLoginAttempts = 0;
      admin.lockUntil = undefined;
      admin.lastLogin = new Date().toISOString();
      this.saveAdmins(admins);

      // Create session
      const token = this.generateToken();
      const userWithoutPassword = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        name: admin.name,
        lastLogin: admin.lastLogin,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
        failedLoginAttempts: admin.failedLoginAttempts
      };

      this.saveSession(userWithoutPassword, token, rememberMe);

      return {
        success: true,
        message: 'Connexion réussie',
        user: userWithoutPassword,
        token
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Erreur lors de la connexion'
      };
    }
  }

  logout(): void {
    this.clearSession();
  }

  getCurrentUser(): Omit<AdminUser, 'passwordHash'> | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.sessionToken !== null;
  }

  getSessionToken(): string | null {
    return this.sessionToken;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResult> {
    if (!this.currentUser) {
      return {
        success: false,
        message: 'Non authentifié'
      };
    }

    try {
      const admins = this.getAdmins();
      const admin = admins.find(a => a.id === this.currentUser!.id);
      
      if (!admin) {
        return {
          success: false,
          message: 'Utilisateur introuvable'
        };
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
      if (!isCurrentPasswordValid) {
        return {
          success: false,
          message: 'Mot de passe actuel incorrect'
        };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      admin.passwordHash = hashedNewPassword;
      this.saveAdmins(admins);

      return {
        success: true,
        message: 'Mot de passe modifié avec succès'
      };

    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Erreur lors du changement de mot de passe'
      };
    }
  }

  async resetPassword(email: string): Promise<AuthResult> {
    try {
      const admins = this.getAdmins();
      const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());

      if (!admin) {
        // Don't reveal if email exists for security
        return {
          success: true,
          message: 'Si cette adresse email existe, un lien de réinitialisation a été envoyé.'
        };
      }

      // In a real application, you would send an email here
      console.log('Password reset requested for:', email);

      return {
        success: true,
        message: 'Un lien de réinitialisation a été envoyé à votre adresse email.'
      };

    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Erreur lors de la réinitialisation'
      };
    }
  }

  extendSession(): void {
    if (this.isAuthenticated() && this.currentUser) {
      const sessionData = {
        user: this.currentUser,
        token: this.sessionToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
    }
  }
}

export const authService = AuthService.getInstance();