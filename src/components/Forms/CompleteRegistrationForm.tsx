import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  Baby, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Loader2, 
  Eye, 
  EyeOff,
  UserPlus,
  Home,
  Briefcase,
  Flag,
  Stethoscope,
  GraduationCap
} from 'lucide-react';
import { 
  CompleteRegistrationData, 
  completeRegistrationSchema, 
  registrationService,
  RegistrationResult 
} from '../../services/registrationService';

interface CompleteRegistrationFormProps {
  onSuccess?: (result: RegistrationResult) => void;
  onError?: (error: string) => void;
}

const CompleteRegistrationForm: React.FC<CompleteRegistrationFormProps> = ({ 
  onSuccess, 
  onError 
}) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger
  } = useForm<CompleteRegistrationData>({
    resolver: zodResolver(completeRegistrationSchema),
    defaultValues: {
      acceptTerms: false,
      acceptPrivacy: false
    }
  });

  const password = watch('parent.password');
  const parentDateOfBirth = watch('parent.dateOfBirth');
  const childDateOfBirth = watch('child.dateOfBirth');

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: 'gray' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const levels = [
      { strength: 0, text: 'Très faible', color: 'red' },
      { strength: 1, text: 'Faible', color: 'red' },
      { strength: 2, text: 'Moyen', color: 'yellow' },
      { strength: 3, text: 'Bon', color: 'blue' },
      { strength: 4, text: 'Fort', color: 'green' },
      { strength: 5, text: 'Très fort', color: 'green' }
    ];

    return levels[strength];
  };

  const handleFormSubmit = async (data: CompleteRegistrationData) => {
    setSubmitStatus('loading');
    setSubmitMessage('');
    setSubmitErrors([]);

    try {
      const result = await registrationService.registerParentAndChild(data);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        reset();
        setCurrentStep(1);
        onSuccess?.(result);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
        setSubmitErrors(result.errors || []);
        onError?.(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Erreur inattendue lors de l\'inscription');
      setSubmitErrors(['Une erreur technique s\'est produite']);
      onError?.('Erreur technique');
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return [
          'parent.firstName',
          'parent.lastName',
          'parent.email',
          'parent.password',
          'parent.phone',
          'parent.dateOfBirth',
          'parent.nationality'
        ] as const;
      case 2:
        return [
          'parent.address',
          'parent.profession',
          'child.firstName',
          'child.lastName',
          'child.dateOfBirth',
          'child.gender',
          'child.currentLevel',
          'child.emergencyContact',
          'child.emergencyPhone'
        ] as const;
      case 3:
        return ['acceptTerms', 'acceptPrivacy'] as const;
      default:
        return [];
    }
  };

  const passwordStrength = getPasswordStrength(password);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Informations du Parent</h3>
              <p className="text-gray-600">Commençons par vos informations personnelles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('parent.firstName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parent?.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre prénom"
                  />
                </div>
                {errors.parent?.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.parent.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('parent.lastName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parent?.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre nom"
                  />
                </div>
                {errors.parent?.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.parent.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('parent.email')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parent?.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.parent?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.parent.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('parent.password')}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parent?.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mot de passe sécurisé"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.color === 'red' ? 'bg-red-500' :
                          passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                          passwordStrength.color === 'blue' ? 'bg-blue-500' :
                          passwordStrength.color === 'green' ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.color === 'red' ? 'text-red-600' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                      passwordStrength.color === 'blue' ? 'text-blue-600' :
                      passwordStrength.color === 'green' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                </div>
              )}
              {errors.parent?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.parent.password.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register('parent.phone')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parent?.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {errors.parent?.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.parent.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    {...register('parent.dateOfBirth')}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parent?.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {parentDateOfBirth && (
                  <p className="mt-1 text-sm text-gray-600">
                    Âge: {calculateAge(parentDateOfBirth)} ans
                  </p>
                )}
                {errors.parent?.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.parent.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationalité *
              </label>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  {...register('parent.nationality')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parent?.nationality ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez votre nationalité</option>
                  <option value="marocaine">Marocaine</option>
                  <option value="française">Française</option>
                  <option value="espagnole">Espagnole</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              {errors.parent?.nationality && (
                <p className="mt-1 text-sm text-red-600">{errors.parent.nationality.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Informations Complémentaires</h3>
              <p className="text-gray-600">Finalisez votre profil et ajoutez les informations de votre enfant</p>
            </div>

            {/* Informations parent complémentaires */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-4">Informations Parent (suite)</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse complète *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('parent.address')}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.parent?.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Adresse complète avec code postal et ville"
                    />
                  </div>
                  {errors.parent?.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.parent.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('parent.profession')}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.parent?.profession ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre profession"
                    />
                  </div>
                  {errors.parent?.profession && (
                    <p className="mt-1 text-sm text-red-600">{errors.parent.profession.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informations enfant */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-4">Informations de l'Enfant</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom de l'enfant *
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        {...register('child.firstName')}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.child?.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Prénom de l'enfant"
                      />
                    </div>
                    {errors.child?.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'enfant *
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        {...register('child.lastName')}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.child?.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nom de l'enfant"
                      />
                    </div>
                    {errors.child?.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de naissance *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        {...register('child.dateOfBirth')}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.child?.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {childDateOfBirth && (
                      <p className="mt-1 text-sm text-gray-600">
                        Âge: {calculateAge(childDateOfBirth)} ans
                      </p>
                    )}
                    {errors.child?.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genre *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          {...register('child.gender')}
                          value="male"
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Garçon</span>
                      </label>
                      <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          {...register('child.gender')}
                          value="female"
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Fille</span>
                      </label>
                    </div>
                    {errors.child?.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.gender.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau scolaire souhaité *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      {...register('child.currentLevel')}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                        errors.child?.currentLevel ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionner un niveau</option>
                      <option value="petite_section">Petite Section (3-4 ans)</option>
                      <option value="moyenne_section">Moyenne Section (4-5 ans)</option>
                      <option value="grande_section">Grande Section (5-6 ans)</option>
                    </select>
                  </div>
                  {errors.child?.currentLevel && (
                    <p className="mt-1 text-sm text-red-600">{errors.child.currentLevel.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact d'urgence *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        {...register('child.emergencyContact')}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.child?.emergencyContact ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nom du contact d'urgence"
                      />
                    </div>
                    {errors.child?.emergencyContact && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.emergencyContact.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone d'urgence *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        {...register('child.emergencyPhone')}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.child?.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    {errors.child?.emergencyPhone && (
                      <p className="mt-1 text-sm text-red-600">{errors.child.emergencyPhone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies ou régimes spéciaux (optionnel)
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('child.allergies')}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Allergies alimentaires, régimes spéciaux, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conditions médicales (optionnel)
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('child.medicalConditions')}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Conditions médicales, handicaps, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    École précédente (optionnel)
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('child.previousSchool')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Nom de l'école précédente"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Conditions d'Utilisation</h3>
              <p className="text-gray-600">Lisez et acceptez nos conditions pour finaliser votre inscription</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Règlement Intérieur</h4>
              <div className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto">
                <p>• Respect des horaires d'ouverture et de fermeture</p>
                <p>• Paiement des frais de scolarité dans les délais</p>
                <p>• Participation aux activités éducatives</p>
                <p>• Respect du personnel et des autres enfants</p>
                <p>• Notification obligatoire en cas d'absence</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Politique de Confidentialité</h4>
              <div className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto">
                <p>• Collecte et traitement des données personnelles</p>
                <p>• Protection des informations de l'enfant</p>
                <p>• Partage d'informations avec les autorités compétentes</p>
                <p>• Droit d'accès et de rectification des données</p>
                <p>• Conservation des données selon la réglementation</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('acceptTerms')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <span className="text-sm text-gray-700">
                  J'accepte le{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                    règlement intérieur
                  </a>{' '}
                  de l'école Nouvelle Génération Pro
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="ml-7 text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('acceptPrivacy')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <span className="text-sm text-gray-700">
                  J'accepte la{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                    politique de confidentialité
                  </a>{' '}
                  et autorise le traitement des données personnelles
                </span>
              </label>
              {errors.acceptPrivacy && (
                <p className="ml-7 text-sm text-red-600">{errors.acceptPrivacy.message}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📧 Prochaines étapes</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Confirmation par email dans les 5 minutes</li>
                <li>• Examen du dossier sous 48 heures</li>
                <li>• Appel de notre équipe pour finaliser</li>
                <li>• Visite de l'école sur rendez-vous</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/logo-ngp.png" 
              alt="Logo Nouvelle Génération Pro" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-3xl font-bold text-gray-800">Inscription Nouvelle Génération Pro</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Inscription complète parent-enfant pour la rentrée 2025-2026
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% complété
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Parent</span>
            <span className="text-xs text-gray-500">Enfant</span>
            <span className="text-xs text-gray-500">Validation</span>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Inscription réussie !</p>
              <p className="text-green-700 text-sm">{submitMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Erreur d'inscription</p>
            </div>
            <p className="text-red-700 text-sm mb-2">{submitMessage}</p>
            {submitErrors.length > 0 && (
              <ul className="text-red-600 text-sm space-y-1">
                {submitErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Step Content */}
            <div className="min-h-[500px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>

              <div className="flex space-x-4">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Suivant</span>
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Inscription en cours...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Finaliser l'inscription</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistrationForm;