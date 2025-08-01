import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  Loader2,
  Shield
} from 'lucide-react';

// Schéma de validation pour le formulaire de contact
const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone invalide').optional().or(z.literal('')),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
  contactReason: z.enum(['information', 'inscription', 'complaint', 'suggestion', 'other'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un motif de contact' })
  }),
  preferredResponse: z.enum(['email', 'phone', 'both'], {
    errorMap: () => ({ message: 'Veuillez sélectionner votre préférence de réponse' })
  }),
  captcha: z.string().min(1, 'Veuillez résoudre le captcha'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'Vous devez accepter la politique de confidentialité')
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState<{question: string, answer: number}>({ question: '', answer: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactReason: 'information',
      preferredResponse: 'email'
    }
  });

  const contactReason = watch('contactReason');
  const preferredResponse = watch('preferredResponse');

  // Générer une question captcha simple
  React.useEffect(() => {
    const generateCaptcha = () => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({
        question: `Combien font ${num1} + ${num2} ?`,
        answer: num1 + num2
      });
    };
    generateCaptcha();
  }, []);

  const handleFormSubmit = async (data: ContactFormData) => {
    // Vérifier le captcha
    if (parseInt(data.captcha) !== captchaQuestion.answer) {
      alert('Réponse captcha incorrecte');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(data);
      setSubmitStatus('success');
      reset();
      // Régénérer le captcha
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({
        question: `Combien font ${num1} + ${num2} ?`,
        answer: num1 + num2
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getSubjectSuggestions = () => {
    const suggestions = {
      information: [
        'Demande d\'informations générales',
        'Tarifs et frais de scolarité',
        'Horaires et calendrier scolaire',
        'Méthodes pédagogiques',
        'Activités extrascolaires'
      ],
      inscription: [
        'Processus d\'inscription',
        'Documents requis',
        'Places disponibles',
        'Visite de l\'école',
        'Critères d\'admission'
      ],
      complaint: [
        'Réclamation concernant un service',
        'Problème avec un enseignant',
        'Incident avec un élève',
        'Problème de facturation',
        'Autre réclamation'
      ],
      suggestion: [
        'Amélioration des services',
        'Nouvelle activité proposée',
        'Suggestion pédagogique',
        'Amélioration des installations',
        'Autre suggestion'
      ],
      other: [
        'Autre demande',
        'Question spécifique',
        'Demande personnalisée'
      ]
    };
    return suggestions[contactReason] || [];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contactez-nous</h2>
        <p className="text-gray-600">
          Nous sommes là pour répondre à toutes vos questions. Laissez-nous un message et nous vous répondrons rapidement.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
            <p className="text-green-700 text-sm">
              Nous vous répondrons dans les 24 heures ouvrables. Un accusé de réception a été envoyé à votre adresse email.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
            <p className="text-red-700 text-sm">
              Veuillez vérifier vos informations et réessayer. Si le problème persiste, contactez-nous directement.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Informations personnelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                {...register('firstName')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre prénom"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
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
                {...register('lastName')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email et téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone (optionnel)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                {...register('phone')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="06 12 34 56 78"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Motif de contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motif de votre contact *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('contactReason')}
                value="information"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Demande d'informations</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('contactReason')}
                value="inscription"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Inscription</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('contactReason')}
                value="complaint"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Réclamation</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('contactReason')}
                value="suggestion"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Suggestion</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('contactReason')}
                value="other"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Autre</span>
            </label>
          </div>
          {errors.contactReason && (
            <p className="mt-1 text-sm text-red-600">{errors.contactReason.message}</p>
          )}
        </div>

        {/* Sujet avec suggestions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sujet *
          </label>
          <input
            type="text"
            {...register('subject')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Résumé de votre message"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
          
          {/* Suggestions de sujets */}
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Suggestions de sujets :</p>
            <div className="flex flex-wrap gap-2">
              {getSubjectSuggestions().map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setValue('subject', suggestion)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Décrivez votre demande en détail..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Préférence de réponse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment préférez-vous être contacté ? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('preferredResponse')}
                value="email"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Email</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('preferredResponse')}
                value="phone"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Téléphone</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                {...register('preferredResponse')}
                value="both"
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Les deux</span>
            </label>
          </div>
          {errors.preferredResponse && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredResponse.message}</p>
          )}
        </div>

        {/* Captcha anti-spam */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Protection anti-spam</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {captchaQuestion.question} *
            </label>
            <input
              type="number"
              {...register('captcha')}
              className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                errors.captcha ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Réponse"
            />
            {errors.captcha && (
              <p className="mt-1 text-sm text-red-600">{errors.captcha.message}</p>
            )}
          </div>
        </div>

        {/* Acceptation politique de confidentialité */}
        <div>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('acceptPrivacy')}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
            />
            <span className="text-sm text-gray-700">
              J'accepte que mes données personnelles soient utilisées pour traiter ma demande conformément à la{' '}
              <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                politique de confidentialité
              </a>
            </span>
          </label>
          {errors.acceptPrivacy && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptPrivacy.message}</p>
          )}
        </div>

        {/* Bouton de soumission */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Envoyer le message</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Informations supplémentaires */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-sm font-semibold text-purple-800 mb-2">
          📞 Autres moyens de contact
        </h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Téléphone: +212 5 37 86 55 81</li>
          <li>• Email: periscolaire@nouvellegeneration.pro</li>
          <li>• WhatsApp: Disponible aux horaires d'ouverture</li>
          <li>• Adresse: Résidence Essafa 4, Salé</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;