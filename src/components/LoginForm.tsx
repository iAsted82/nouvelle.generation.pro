import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Shield,
  User
} from 'lucide-react';
import { authService, LoginCredentials, AuthResult } from '../services/authService';
import { languageService } from '../services/languageService';

const loginSchema = z.object({
  email: z.string().email('Format email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (result: AuthResult) => void;
  onError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [language, setLanguage] = useState(languageService.getCurrentLanguage());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  // Subscribe to language changes
  React.useEffect(() => {
    const unsubscribe = languageService.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
  }, []);

  const t = (key: string, fallback?: string) => languageService.translate(key, fallback);

  const handleFormSubmit = async (data: LoginFormData) => {
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      const result = await authService.login(data);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        reset();
        onSuccess(result);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
        onError?.(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Erreur lors de la connexion');
      onError?.('Erreur technique');
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      setSubmitMessage('Veuillez entrer votre adresse email');
      return;
    }

    try {
      const result = await authService.resetPassword(email);
      setSubmitMessage(result.message);
      setShowForgotPassword(false);
    } catch (error) {
      setSubmitMessage('Erreur lors de la réinitialisation');
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img 
                src="/logo-ngp.png" 
                alt="Logo Nouvelle Génération Pro" 
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {t('auth.reset', 'Réinitialiser le mot de passe')}
              </h2>
            </div>
            <p className="text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleForgotPassword(formData.get('email') as string);
          }}>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email', 'Email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="info@nouvellegeneration.pro"
                />
              </div>
            </div>

            {submitMessage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">{submitMessage}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('common.cancel', 'Annuler')}
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('auth.reset', 'Réinitialiser')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/logo-ngp.png" 
              alt="Logo Nouvelle Génération Pro" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t('nav.admin', 'Administration NGP')}</h2>
              <p className="text-gray-600">{t('nav.school', 'Nouvelle Génération Pro')}</p>
            </div>
          </div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('auth.welcome', 'Bienvenue')}</h3>
          <p className="text-gray-600">
            Connectez-vous pour accéder à votre espace administrateur
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">{submitMessage}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">{submitMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email', 'Email')} *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="info@nouvellegeneration.pro"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password', 'Mot de passe')} *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {t('auth.remember', 'Se souvenir de moi')}
              </span>
            </label>

            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('auth.forgot', 'Mot de passe oublié ?')}
            </button>
          </div>

          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {submitStatus === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('common.loading', 'Chargement...')}</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{t('auth.signin', 'Se connecter')}</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-yellow-800 mb-2">🔐 Accès Administrateur</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Email:</strong> info@nouvellegeneration.pro</p>
            <p><strong>Mot de passe:</strong> Karima1982*</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2025 {t('school.name', 'Nouvelle Génération Pro')}</p>
          <p>{t('school.subtitle', 'École Maternelle d\'Excellence')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;