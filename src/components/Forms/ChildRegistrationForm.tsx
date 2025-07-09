import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Calendar, 
  GraduationCap, 
  Users, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Loader2,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// Schéma de validation pour l'inscription enfant
const childRegistrationSchema = z.object({
  // Informations de l'enfant
  childFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  childLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  childBirthDate: z.string().min(1, 'La date de naissance est requise'),
  childGender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Veuillez sélectionner le genre' })
  }),
  currentLevel: z.enum(['petite_section', 'moyenne_section', 'grande_section'], {
    errorMap: () => ({ message: 'Veuillez sélectionner le niveau scolaire' })
  }),
  previousSchool: z.string().optional(),
  specialNeeds: z.string().optional(),
  
  // Informations du parent/tuteur principal
  parentFirstName: z.string().min(2, 'Le prénom du parent est requis'),
  parentLastName: z.string().min(2, 'Le nom du parent est requis'),
  parentEmail: z.string().email('Email invalide'),
  parentPhone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone invalide'),
  parentAddress: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
  parentProfession: z.string().min(2, 'La profession est requise'),
  parentRelationship: z.enum(['mother', 'father', 'guardian'], {
    errorMap: () => ({ message: 'Veuillez préciser le lien de parenté' })
  }),
  
  // Informations du second parent (optionnel)
  secondParentFirstName: z.string().optional(),
  secondParentLastName: z.string().optional(),
  secondParentEmail: z.string().email('Email invalide').optional().or(z.literal('')),
  secondParentPhone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone invalide').optional().or(z.literal('')),
  secondParentProfession: z.string().optional(),
  
  // Informations médicales
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().min(2, 'Contact d\'urgence requis'),
  emergencyPhone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro d\'urgence invalide'),
  
  // Préférences et autorisations
  transportMode: z.enum(['parent', 'school_bus', 'other'], {
    errorMap: () => ({ message: 'Veuillez sélectionner le mode de transport' })
  }),
  photoAuthorization: z.boolean().default(false),
  pickupAuthorization: z.string().optional(),
  
  // Acceptation des conditions
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter le règlement intérieur'),
  acceptMedicalPolicy: z.boolean().refine(val => val === true, 'Vous devez accepter la politique médicale')
});

type ChildRegistrationFormData = z.infer<typeof childRegistrationSchema>;

interface ChildRegistrationFormProps {
  onSubmit: (data: ChildRegistrationFormData, documents: File[]) => Promise<void>;
  isLoading?: boolean;
}

const ChildRegistrationForm: React.FC<ChildRegistrationFormProps> = ({ onSubmit, isLoading = false }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger
  } = useForm<ChildRegistrationFormData>({
    resolver: zodResolver(childRegistrationSchema),
    defaultValues: {
      photoAuthorization: false,
      acceptTerms: false,
      acceptMedicalPolicy: false
    }
  });

  const childBirthDate = watch('childBirthDate');

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleFormSubmit = async (data: ChildRegistrationFormData) => {
    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(data, uploadedDocuments);
      setSubmitStatus('success');
      reset();
      setUploadedDocuments([]);
      setCurrentStep(1);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erreur lors de l\'inscription:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
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

  const getFieldsForStep = (step: number): (keyof ChildRegistrationFormData)[] => {
    switch (step) {
      case 1:
        return ['childFirstName', 'childLastName', 'childBirthDate', 'childGender', 'currentLevel'];
      case 2:
        return ['parentFirstName', 'parentLastName', 'parentEmail', 'parentPhone', 'parentAddress', 'parentProfession', 'parentRelationship'];
      case 3:
        return ['emergencyContact', 'emergencyPhone', 'transportMode'];
      case 4:
        return ['acceptTerms', 'acceptMedicalPolicy'];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations de l'enfant</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom de l'enfant *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('childFirstName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.childFirstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Prénom de l'enfant"
                  />
                </div>
                {errors.childFirstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.childFirstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de famille *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('childLastName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.childLastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nom de famille"
                  />
                </div>
                {errors.childLastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.childLastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    {...register('childBirthDate')}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.childBirthDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {childBirthDate && (
                  <p className="mt-1 text-sm text-gray-600">
                    Âge: {calculateAge(childBirthDate)} ans
                  </p>
                )}
                {errors.childBirthDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.childBirthDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      {...register('childGender')}
                      value="male"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Garçon</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      {...register('childGender')}
                      value="female"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Fille</span>
                  </label>
                </div>
                {errors.childGender && (
                  <p className="mt-1 text-sm text-red-600">{errors.childGender.message}</p>
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
                  {...register('currentLevel')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.currentLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="petite_section">Petite Section (3-4 ans)</option>
                  <option value="moyenne_section">Moyenne Section (4-5 ans)</option>
                  <option value="grande_section">Grande Section (5-6 ans)</option>
                </select>
              </div>
              {errors.currentLevel && (
                <p className="mt-1 text-sm text-red-600">{errors.currentLevel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                École précédente (optionnel)
              </label>
              <input
                type="text"
                {...register('previousSchool')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Nom de l'école précédente"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Besoins spéciaux ou remarques (optionnel)
              </label>
              <textarea
                {...register('specialNeeds')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Allergies, handicaps, régimes alimentaires spéciaux, etc."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations des parents/tuteurs</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Parent/Tuteur Principal</h4>
              <p className="text-sm text-blue-700">
                Personne responsable principale de l'enfant
              </p>
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
                    {...register('parentFirstName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parentFirstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Prénom du parent"
                  />
                </div>
                {errors.parentFirstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentFirstName.message}</p>
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
                    {...register('parentLastName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parentLastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nom du parent"
                  />
                </div>
                {errors.parentLastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentLastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...register('parentEmail')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parentEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@exemple.com"
                  />
                </div>
                {errors.parentEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register('parentPhone')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.parentPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {errors.parentPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentPhone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register('parentAddress')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parentAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Adresse complète"
                />
              </div>
              {errors.parentAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.parentAddress.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession *
                </label>
                <input
                  type="text"
                  {...register('parentProfession')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parentProfession ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Profession"
                />
                {errors.parentProfession && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentProfession.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de parenté *
                </label>
                <select
                  {...register('parentRelationship')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.parentRelationship ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner</option>
                  <option value="mother">Mère</option>
                  <option value="father">Père</option>
                  <option value="guardian">Tuteur/Tutrice</option>
                </select>
                {errors.parentRelationship && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentRelationship.message}</p>
                )}
              </div>
            </div>

            {/* Second parent (optionnel) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Second Parent/Tuteur (Optionnel)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    {...register('secondParentFirstName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Prénom du second parent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    {...register('secondParentLastName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Nom du second parent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('secondParentEmail')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="email@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    {...register('secondParentPhone')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  {...register('secondParentProfession')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Profession"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations médicales et pratiques</h3>
            
            {/* Informations médicales */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-800 mb-2">Informations Médicales</h4>
              <p className="text-sm text-red-700">
                Ces informations sont essentielles pour la sécurité de votre enfant
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact d'urgence *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('emergencyContact')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nom du contact d'urgence"
                  />
                </div>
                {errors.emergencyContact && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
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
                    {...register('emergencyPhone')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {errors.emergencyPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies connues
              </label>
              <textarea
                {...register('allergies')}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Allergies alimentaires, médicamenteuses, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Médicaments réguliers
              </label>
              <textarea
                {...register('medications')}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Médicaments pris régulièrement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conditions médicales particulières
              </label>
              <textarea
                {...register('medicalConditions')}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Handicaps, maladies chroniques, etc."
              />
            </div>

            {/* Transport */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-800 mb-4">Transport</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode de transport *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      {...register('transportMode')}
                      value="parent"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Déposé/récupéré par les parents
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      {...register('transportMode')}
                      value="school_bus"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Transport scolaire
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      {...register('transportMode')}
                      value="other"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Autre (à préciser)
                    </span>
                  </label>
                </div>
                {errors.transportMode && (
                  <p className="mt-1 text-sm text-red-600">{errors.transportMode.message}</p>
                )}
              </div>
            </div>

            {/* Autorisations */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Autorisations</h4>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register('photoAuthorization')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  J'autorise la prise de photos de mon enfant pour les activités scolaires
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personnes autorisées à récupérer l'enfant (autres que les parents)
                </label>
                <textarea
                  {...register('pickupAuthorization')}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nom, lien de parenté, numéro de téléphone"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents requis et validation</h3>
            
            {/* Upload des documents */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-4">Documents à fournir</h4>
              
              <div className="space-y-2 text-sm text-yellow-700 mb-4">
                <p>• Copie de la carte d'identité nationale (parent)</p>
                <p>• Acte de naissance de l'enfant</p>
                <p>• Certificat de vaccination</p>
                <p>• Certificat médical</p>
                <p>• Photos d'identité de l'enfant (2 photos)</p>
                <p>• Attestation de domicile</p>
              </div>

              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-12 h-12 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">
                    Cliquez pour télécharger les documents
                  </span>
                  <span className="text-sm text-yellow-600">
                    PDF, JPG, PNG, DOC (max 10MB par fichier)
                  </span>
                </label>
              </div>

              {/* Documents uploadés */}
              {uploadedDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h5 className="font-medium text-yellow-800">Documents téléchargés:</h5>
                  {uploadedDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Acceptation des conditions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Acceptation des conditions</h4>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('acceptTerms')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    J'accepte le{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      règlement intérieur
                    </a>{' '}
                    de l'école et m'engage à le respecter
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="ml-7 text-sm text-red-600">{errors.acceptTerms.message}</p>
                )}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('acceptMedicalPolicy')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    J'accepte la{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      politique médicale
                    </a>{' '}
                    de l'école et autorise les soins d'urgence si nécessaire
                  </span>
                </label>
                {errors.acceptMedicalPolicy && (
                  <p className="ml-7 text-sm text-red-600">{errors.acceptMedicalPolicy.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription Enfant</h2>
        <p className="text-gray-600">
          Inscription complète pour la rentrée scolaire 2025-2026
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
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Inscription soumise avec succès !</p>
            <p className="text-green-700 text-sm">
              Nous examinerons votre dossier et vous contacterons dans les 48 heures.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Erreur lors de l'inscription</p>
            <p className="text-red-700 text-sm">
              Veuillez vérifier vos informations et réessayer.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Step Content */}
        <div className="min-h-[400px]">
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Inscription en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Finaliser l'inscription</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChildRegistrationForm;