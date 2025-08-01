export type Language = 'fr' | 'ar' | 'en';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇲🇦',
    direction: 'rtl'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr'
  }
];

// Translation keys and values
export const TRANSLATIONS = {
  fr: {
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    'common.refresh': 'Actualiser',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.close': 'Fermer',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.methods': 'Nos Méthodes',
    'nav.gallery': 'Notre École',
    'nav.school.life': 'Vie Scolaire',
    'nav.registration': 'Inscription',
    'nav.contact': 'Contact',
    'nav.forms': 'Formulaires',
    'nav.open.menu': 'Ouvrir le menu',
    'nav.close.menu': 'Fermer le menu',
    
    // Hero Section
    'hero.title.part1': 'La Maternelle qui',
    'hero.title.part2': 'Fait la Différence',
    'hero.registration.open': 'Inscriptions Ouvertes 2025-2026',
    'hero.description': 'Une école maternelle moderne avec enseignement trilingue (français, arabe, anglais) et pédagogie innovante. Classes limitées à 15 élèves dans un environnement bienveillant et stimulant.',
    
    // CTA Buttons
    'cta.register.now': 'Inscrivez-vous maintenant',
    'cta.register.child': 'Inscrire mon enfant',
    'cta.access.forms': 'Accéder aux formulaires',
    'cta.discover.school': 'Découvrir notre école',
    
    // Trust Indicators
    'trust.certified': 'École certifiée',
    'trust.experience': '15 ans d\'expérience',
    'trust.caring': 'Approche bienveillante',
    
    // Info Cards
    'info.places.remaining': 'Places restantes',
    'info.children.per.class': 'Enfants/classe max',
    
    // Features
    'features.why.choose': 'Pourquoi Choisir',
    'features.description': 'Une approche pédagogique moderne qui respecte les valeurs culturelles et spirituelles marocaines.',
    'features.bilingual.title': 'Éducation Bilingue',
    'features.bilingual.description': 'Apprentissage en arabe et français pour préparer l\'avenir de votre enfant dans un contexte multiculturel.',
    'features.technology.title': 'Technologie Moderne',
    'features.technology.description': 'Tableaux interactifs et outils numériques adaptés aux jeunes enfants pour un apprentissage ludique.',
    'features.qualified.title': 'Équipe Qualifiée',
    'features.qualified.description': 'Enseignants formés aux méthodes pédagogiques modernes et aux valeurs culturelles marocaines.',
    'features.small.classes.title': 'Classes Réduites',
    'features.small.classes.description': 'Maximum 15 enfants par classe pour un accompagnement personnalisé de chaque élève.',
    'features.activities.title': 'Activités Enrichissantes',
    'features.activities.description': 'Arts, musique, théâtre, sport et activités culturelles pour développer tous les talents.',
    'features.secure.title': 'Environnement Sécurisé',
    'features.secure.description': 'Espace moderne, propre et organisé avec une sécurité renforcée pour la tranquillité des parents.',
    
    // Forms and Admin
    'forms.title': 'Système de Formulaires',
    'admin.access': 'Accès Administration',
    
    // School Info
    'school.since': 'Excellence éducative depuis 2009',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.logout': 'Déconnexion',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.remember': 'Se souvenir de moi',
    'auth.forgot': 'Mot de passe oublié ?',
    'auth.signin': 'Se connecter',
    'auth.welcome': 'Bienvenue',
    'auth.invalid': 'Identifiants invalides',
    'auth.success': 'Connexion réussie',
    'auth.required': 'Champ requis',
    'auth.reset': 'Réinitialiser le mot de passe',
    'auth.change': 'Changer le mot de passe',
    'auth.current': 'Mot de passe actuel',
    'auth.new': 'Nouveau mot de passe',
    'auth.confirm': 'Confirmer le mot de passe',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.overview': 'Vue d\'ensemble des activités de l\'école',
    'dashboard.stats.users': 'Total Utilisateurs',
    'dashboard.stats.children': 'Enfants Inscrits',
    'dashboard.stats.pending': 'Inscriptions en Attente',
    'dashboard.stats.active': 'Utilisateurs Actifs',
    'dashboard.stats.today': 'aujourd\'hui',
    'dashboard.stats.waiting': 'en attente',
    'dashboard.recent': 'Inscriptions Récentes',
    'dashboard.distribution': 'Répartition par Niveau',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.users': 'Utilisateurs',
    'nav.children': 'Enfants',
    'nav.appointments': 'Rendez-vous',
    'nav.messages': 'Messages',
    'nav.settings': 'Paramètres',
    'nav.admin': 'Administration NGP',
    'nav.school': 'Nouvelle Génération Pro',
    
    // Users
    'users.title': 'Gestion des Utilisateurs',
    'users.subtitle': 'Gérez les comptes parents et leurs enfants',
    'users.new': 'Nouvel utilisateur',
    'users.contact': 'Contact',
    'users.children': 'Enfants',
    'users.status': 'Statut',
    'users.registration': 'Inscription',
    'users.actions': 'Actions',
    'users.active': 'Actif',
    'users.inactive': 'Inactif',
    'users.search': 'Rechercher un utilisateur...',
    
    // Children
    'children.title': 'Gestion des Enfants',
    'children.subtitle': 'Gérez les inscriptions et statuts des enfants',
    'children.new': 'Nouvelle inscription',
    'children.child': 'Enfant',
    'children.parent': 'Parent',
    'children.level': 'Niveau',
    'children.search': 'Rechercher un enfant...',
    'children.boy': 'Garçon',
    'children.girl': 'Fille',
    'children.years': 'ans',
    'children.status.pending': 'En attente',
    'children.status.approved': 'Approuvé',
    'children.status.rejected': 'Rejeté',
    'children.level.petite': 'Petite Section',
    'children.level.moyenne': 'Moyenne Section',
    'children.level.grande': 'Grande Section',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Configurez les paramètres de votre école',
    'settings.school': 'Informations de l\'école',
    'settings.notifications': 'Paramètres de notification',
    'settings.name': 'Nom de l\'école',
    'settings.address': 'Adresse',
    'settings.phone': 'Téléphone',
    'settings.email.notifications': 'Notifications par email',
    'settings.new.registrations': 'Nouvelles inscriptions',
    'settings.appointment.reminders': 'Rappels de rendez-vous',
    'settings.save.changes': 'Sauvegarder les modifications',
    
    // Appointments
    'appointments.title': 'Gestion des Rendez-vous',
    'appointments.subtitle': 'Planifiez et gérez les rendez-vous avec les parents',
    'appointments.new': 'Nouveau rendez-vous',
    'appointments.none': 'Aucun rendez-vous programmé',
    'appointments.none.subtitle': 'Commencez par créer votre premier rendez-vous',
    'appointments.create': 'Créer un rendez-vous',
    
    // Currencies
    'currency.eur': 'Euro',
    'currency.mad': 'Dirham',
    'currency.symbol.eur': '€',
    'currency.symbol.mad': 'د.م.',
    
    // School info
    'school.name': 'Nouvelle Génération Pro',
    'school.subtitle': 'École Maternelle d\'Excellence',
    'school.experience': '15 ans d\'expérience',
    'school.location': 'Résidence Essafa 4, Salé',
    'school.phone': '+212 5 37 86 55 81',
    'school.email': 'periscolaire@nouvellegeneration.pro',
    
    // Gallery Section
    'gallery.title': 'Découvrez Notre École en Images',
    'gallery.subtitle': 'Plongez dans l\'univers coloré et bienveillant de notre école maternelle',
    'gallery.classroom.title': 'Salles de Classe Modernes',
    'gallery.classroom.description': 'Espaces lumineux et adaptés aux jeunes enfants avec équipements pédagogiques innovants',
    'gallery.playground.title': 'Aire de Jeux Sécurisée',
    'gallery.playground.description': 'Espace de récréation sûr et stimulant pour le développement moteur',
    'gallery.activities.title': 'Activités Créatives',
    'gallery.activities.description': 'Ateliers d\'arts plastiques, musique et expression corporelle',
    'gallery.library.title': 'Bibliothèque Enfantine',
    'gallery.library.description': 'Coin lecture chaleureux pour développer l\'amour des livres',
    'gallery.cafeteria.title': 'Espace Restauration',
    'gallery.cafeteria.description': 'Repas équilibrés préparés avec soin dans un environnement convivial',
    'gallery.garden.title': 'Jardin Pédagogique',
    'gallery.garden.description': 'Potager éducatif pour sensibiliser les enfants à la nature',
    'gallery.view.more': 'Voir plus de photos',
    'gallery.virtual.tour': 'Visite virtuelle',
    
    // School Life Section
    'school.life.title': 'La Vie Scolaire à Nouvelle Génération Pro',
    'school.life.subtitle': 'Une journée type dans notre école bienveillante',
    'school.life.schedule.title': 'Programme Quotidien',
    'school.life.schedule.description': 'Découvrez le déroulement d\'une journée enrichissante',
    'school.life.morning.title': 'Accueil Matinal',
    'school.life.morning.time': '8h00 - 8h30',
    'school.life.morning.description': 'Accueil personnalisé et activités libres pour commencer la journée en douceur',
    'school.life.learning.title': 'Apprentissages Fondamentaux',
    'school.life.learning.time': '8h30 - 10h00',
    'school.life.learning.description': 'Activités pédagogiques adaptées à chaque niveau avec méthodes innovantes',
    'school.life.break.title': 'Récréation',
    'school.life.break.time': '10h00 - 10h30',
    'school.life.break.description': 'Temps de jeu libre pour développer la socialisation et la motricité',
    'school.life.workshop.title': 'Ateliers Créatifs',
    'school.life.workshop.time': '10h30 - 11h30',
    'school.life.workshop.description': 'Arts plastiques, musique, conte et expression corporelle',
    'school.life.lunch.title': 'Déjeuner',
    'school.life.lunch.time': '12h00 - 13h00',
    'school.life.lunch.description': 'Repas équilibrés et moment de convivialité autour de la table',
    'school.life.rest.title': 'Temps Calme',
    'school.life.rest.time': '13h00 - 14h00',
    'school.life.rest.description': 'Sieste ou activités calmes selon les besoins de chaque enfant',
    'school.life.afternoon.title': 'Activités Diversifiées',
    'school.life.afternoon.time': '14h00 - 15h30',
    'school.life.afternoon.description': 'Jeux éducatifs, sport et découverte du monde qui nous entoure',
    'school.life.departure.title': 'Départ Échelonné',
    'school.life.departure.time': '15h30 - 16h00',
    'school.life.departure.description': 'Bilan de la journée et préparation au départ',
    'school.life.testimonial.parent1': '"Une école où mon enfant s\'épanouit chaque jour. L\'équipe est formidable !"',
    'school.life.testimonial.parent1.name': 'Mme Bennani, maman d\'Yasmine',
    'school.life.testimonial.parent2': '"L\'approche pédagogique respecte parfaitement nos valeurs culturelles."',
    'school.life.testimonial.parent2.name': 'M. El Fassi, papa d\'Adam',
    'school.life.testimonial.parent3': '"Mon fils a appris l\'arabe et le français naturellement. Merci !"',
    'school.life.testimonial.parent3.name': 'Mme Alaoui, maman de Mehdi',
    
    // Registration Section
    'registration.title': 'Inscriptions 2025-2026 : Places Limitées',
    'registration.subtitle': 'Réservez dès maintenant la place de votre enfant',
    'registration.places.available': 'Places disponibles',
    'registration.places.remaining': 'places restantes',
    'registration.deadline': 'Date limite d\'inscription',
    'registration.deadline.date': '30 juin 2025',
    'registration.start.date': 'Rentrée scolaire',
    'registration.start.date.value': '2 septembre 2025',
    'registration.process.title': 'Processus d\'inscription',
    'registration.process.step1': 'Pré-inscription en ligne',
    'registration.process.step1.description': 'Remplissez le formulaire de pré-inscription avec les informations de votre enfant',
    'registration.process.step2': 'Rendez-vous personnalisé',
    'registration.process.step2.description': 'Rencontre avec l\'équipe pédagogique et visite de l\'école',
    'registration.process.step3': 'Dossier d\'inscription',
    'registration.process.step3.description': 'Finalisation du dossier avec les documents requis',
    'registration.process.step4': 'Confirmation',
    'registration.process.step4.description': 'Validation de l\'inscription et intégration de l\'enfant',
    'registration.requirements.title': 'Pièces à fournir',
    'registration.requirements.birth.certificate': 'Copie acte de naissance',
    'registration.requirements.vaccination': 'Carnet de vaccination à jour',
    'registration.requirements.medical': 'Certificat médical',
    'registration.requirements.photos': '2 photos d\'identité',
    'registration.requirements.residence': 'Justificatif de domicile',
    'registration.requirements.id': 'Copie CIN des parents',
    'registration.fees.title': 'Frais de scolarité',
    'registration.fees.registration': 'Frais d\'inscription',
    'registration.fees.monthly': 'Mensualité',
    'registration.fees.materials': 'Matériel pédagogique',
    'registration.fees.meals': 'Repas (optionnel)',
    'registration.fees.payment': 'Facilités de paiement disponibles',
    
    // Nouvelles informations de contact
    'registration.deadline.removed': 'Inscriptions ouvertes toute l\'année',
    'registration.cta.new': 'Places Limitées - Inscrivez-vous Maintenant',
    
    // News Section
    'news.title': 'Notre École Évolue',
    'news.subtitle': 'Actualités et nouveautés de Nouvelle Génération Pro',
    'news.latest': 'Dernières actualités',
    'news.all': 'Toutes les actualités',
    'news.read.more': 'Lire la suite',
    'news.date.format': 'dd/mm/yyyy',
    'news.category.general': 'Général',
    'news.category.pedagogy': 'Pédagogie',
    'news.category.events': 'Événements',
    'news.category.health': 'Santé',
    'news.1.title': 'Nouvelle Salle Multisensorielle',
    'news.1.date': '15 janvier 2025',
    'news.1.category': 'Pédagogie',
    'news.1.excerpt': 'Découvrez notre nouvel espace dédié au développement sensoriel des enfants avec des équipements innovants.',
    'news.2.title': 'Rencontres Parents-Enseignants',
    'news.2.date': '22 janvier 2025',
    'news.2.category': 'Événements',
    'news.2.excerpt': 'Planifiez vos rendez-vous individuels pour faire le point sur l\'évolution de votre enfant.',
    'news.3.title': 'Nouveau Protocole Sanitaire',
    'news.3.date': '8 février 2025',
    'news.3.category': 'Santé',
    'news.3.excerpt': 'Mise à jour de nos mesures sanitaires pour garantir la sécurité de tous les enfants.',
    'news.4.title': 'Carnaval de Printemps',
    'news.4.date': '15 mars 2025',
    'news.4.category': 'Événements',
    'news.4.excerpt': 'Préparez-vous pour notre grand carnaval annuel avec défilé et spectacles.',
    
    // Contact Section
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes là pour répondre à toutes vos questions',
    'contact.info.title': 'Informations de contact',
    'contact.address.title': 'Adresse',
    'contact.hours.title': 'Horaires d\'ouverture',
    'contact.hours.monday.friday': 'Lundi - Vendredi',
    'contact.hours.morning': '8h00 - 12h00',
    'contact.hours.afternoon': '14h00 - 16h00',
    'contact.hours.saturday': 'Samedi',
    'contact.hours.saturday.time': '9h00 - 12h00',
    'contact.hours.sunday': 'Dimanche',
    'contact.hours.closed': 'Fermé',
    'contact.emergency.title': 'Numéro d\'urgence',
    'contact.emergency.hours': 'Disponible 24h/24',
    'contact.form.title': 'Formulaire de Contact',
    'contact.form.name': 'Nom complet',
    'contact.form.name.placeholder': 'Votre nom et prénom',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'votre@email.com',
    'contact.form.phone': 'Téléphone',
    'contact.form.phone.placeholder': '06 12 34 56 78',
    'contact.form.subject': 'Sujet',
    'contact.form.subject.placeholder': 'Objet de votre message',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Votre message...',
    'contact.form.send': 'Envoyer le message',
    'contact.form.success': 'Message envoyé avec succès !',
    'contact.form.error': 'Erreur lors de l\'envoi du message',
    'contact.form.required': 'Ce champ est requis',
    'contact.form.email.invalid': 'Email invalide',
    'contact.form.phone.invalid': 'Numéro de téléphone invalide',
    'contact.social.title': 'Suivez-nous',
    'contact.map.title': 'Localisation',
    'contact.phone': '05 37 00 00 00',
    'contact.email': 'periscolaire@nouvellegeneration.pro',
    'contact.address': 'Résidence Essafa 4, Salé',
    
    // Footer
    'footer.about.title': 'À Propos',
    'footer.about.description': 'École maternelle d\'excellence proposant une éducation bilingue et bienveillante depuis 2009.',
    'footer.quick.links': 'Liens Rapides',
    'footer.contact.info': 'Informations de Contact',
    'footer.follow.us': 'Suivez-nous',
    'footer.legal.title': 'Mentions Légales',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'footer.cookies': 'Gestion des Cookies',
    'footer.copyright': 'Tous droits réservés',
    'footer.developed.by': 'Développé avec ❤️ par',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.description': 'Restez informé de nos actualités',
    'footer.newsletter.email': 'Votre email',
    'footer.newsletter.subscribe': 'S\'abonner',
    'footer.newsletter.success': 'Inscription réussie !',
    
    // Additional translations
    'months.january': 'Janvier',
    'months.february': 'Février',
    'months.march': 'Mars',
    'months.april': 'Avril',
    'months.may': 'Mai',
    'months.june': 'Juin',
    'months.july': 'Juillet',
    'months.august': 'Août',
    'months.september': 'Septembre',
    'months.october': 'Octobre',
    'months.november': 'Novembre',
    'months.december': 'Décembre'
  },
  
  ar: {
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.refresh': 'تحديث',
    'common.back': 'العودة',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
    'common.confirm': 'تأكيد',
    'common.yes': 'نعم',
    'common.no': 'لا',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.methods': 'طرق التعليم',
    'nav.gallery': 'مدرستنا',
    'nav.school.life': 'الحياة المدرسية',
    'nav.registration': 'التسجيل',
    'nav.contact': 'اتصل بنا',
    'nav.forms': 'النماذج',
    'nav.open.menu': 'فتح القائمة',
    'nav.close.menu': 'إغلاق القائمة',
    
    // Hero Section
    'hero.title.part1': 'الروضة التي',
    'hero.title.part2': 'تحدث الفرق',
    'hero.registration.open': 'التسجيل مفتوح 2025-2026',
    'hero.description': 'روضة أطفال حديثة مع تعليم ثلاثي اللغات (العربية، الفرنسية، الإنجليزية) وتربية مبتكرة. فصول محدودة بـ 15 طفل في بيئة مريحة ومحفزة.',
    
    // CTA Buttons
    'cta.register.now': 'سجل الآن',
    'cta.register.child': 'سجل طفلي',
    'cta.access.forms': 'الوصول للنماذج',
    'cta.discover.school': 'اكتشف مدرستنا',
    
    // Trust Indicators
    'trust.certified': 'مدرسة معتمدة',
    'trust.experience': '15 سنة خبرة',
    'trust.caring': 'نهج عطوف',
    
    // Info Cards
    'info.places.remaining': 'الأماكن المتبقية',
    'info.children.per.class': 'طفل/فصل كحد أقصى',
    
    // Features
    'features.why.choose': 'لماذا تختار',
    'features.description': 'نهج تعليمي حديث يحترم القيم الثقافية والروحية المغربية.',
    'features.bilingual.title': 'تعليم ثنائي اللغة',
    'features.bilingual.description': 'تعلم باللغة العربية والفرنسية لتحضير مستقبل طفلك في سياق متعدد الثقافات.',
    'features.technology.title': 'تقنية حديثة',
    'features.technology.description': 'سبورات تفاعلية وأدوات رقمية مناسبة للأطفال الصغار للتعلم التفاعلي.',
    'features.qualified.title': 'فريق مؤهل',
    'features.qualified.description': 'معلمون مدربون على الطرق التعليمية الحديثة والقيم الثقافية المغربية.',
    'features.small.classes.title': 'فصول صغيرة',
    'features.small.classes.description': 'بحد أقصى 15 طفل لكل فصل لمتابعة شخصية لكل طالب.',
    'features.activities.title': 'أنشطة مثرية',
    'features.activities.description': 'فنون، موسيقى، مسرح، رياضة وأنشطة ثقافية لتطوير جميع المواهب.',
    'features.secure.title': 'بيئة آمنة',
    'features.secure.description': 'مكان حديث، نظيف ومنظم مع أمان معزز لراحة الوالدين.',
    
    // Forms and Admin
    'forms.title': 'نظام النماذج',
    'admin.access': 'الوصول للإدارة',
    
    // School Info
    'school.since': 'التميز التعليمي منذ 2009',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.remember': 'تذكرني',
    'auth.forgot': 'هل نسيت كلمة المرور؟',
    'auth.signin': 'تسجيل الدخول',
    'auth.welcome': 'مرحباً',
    'auth.invalid': 'بيانات خاطئة',
    'auth.success': 'تم تسجيل الدخول بنجاح',
    'auth.required': 'حقل مطلوب',
    'auth.reset': 'إعادة تعيين كلمة المرور',
    'auth.change': 'تغيير كلمة المرور',
    'auth.current': 'كلمة المرور الحالية',
    'auth.new': 'كلمة المرور الجديدة',
    'auth.confirm': 'تأكيد كلمة المرور',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة على أنشطة المدرسة',
    'dashboard.stats.users': 'إجمالي المستخدمين',
    'dashboard.stats.children': 'الأطفال المسجلين',
    'dashboard.stats.pending': 'التسجيلات المعلقة',
    'dashboard.stats.active': 'المستخدمين النشطين',
    'dashboard.stats.today': 'اليوم',
    'dashboard.stats.waiting': 'في الانتظار',
    'dashboard.recent': 'التسجيلات الأخيرة',
    'dashboard.distribution': 'التوزيع حسب المستوى',
    
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.users': 'المستخدمين',
    'nav.children': 'الأطفال',
    'nav.appointments': 'المواعيد',
    'nav.messages': 'الرسائل',
    'nav.settings': 'الإعدادات',
    'nav.admin': 'إدارة NGP',
    'nav.school': 'الجيل الجديد برو',
    
    // Users
    'users.title': 'إدارة المستخدمين',
    'users.subtitle': 'إدارة حسابات الأهل وأطفالهم',
    'users.new': 'مستخدم جديد',
    'users.contact': 'جهة الاتصال',
    'users.children': 'الأطفال',
    'users.status': 'الحالة',
    'users.registration': 'التسجيل',
    'users.actions': 'الإجراءات',
    'users.active': 'نشط',
    'users.inactive': 'غير نشط',
    'users.search': 'البحث عن مستخدم...',
    
    // Children
    'children.title': 'إدارة الأطفال',
    'children.subtitle': 'إدارة التسجيلات وحالات الأطفال',
    'children.new': 'تسجيل جديد',
    'children.child': 'الطفل',
    'children.parent': 'الوالد',
    'children.level': 'المستوى',
    'children.search': 'البحث عن طفل...',
    'children.boy': 'ذكر',
    'children.girl': 'أنثى',
    'children.years': 'سنوات',
    'children.status.pending': 'في الانتظار',
    'children.status.approved': 'مقبول',
    'children.status.rejected': 'مرفوض',
    'children.level.petite': 'القسم الصغير',
    'children.level.moyenne': 'القسم المتوسط',
    'children.level.grande': 'القسم الكبير',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.subtitle': 'تكوين إعدادات مدرستك',
    'settings.school': 'معلومات المدرسة',
    'settings.notifications': 'إعدادات الإشعارات',
    'settings.name': 'اسم المدرسة',
    'settings.address': 'العنوان',
    'settings.phone': 'الهاتف',
    'settings.email.notifications': 'إشعارات البريد الإلكتروني',
    'settings.new.registrations': 'التسجيلات الجديدة',
    'settings.appointment.reminders': 'تذكيرات المواعيد',
    'settings.save.changes': 'حفظ التغييرات',
    
    // Appointments
    'appointments.title': 'إدارة المواعيد',
    'appointments.subtitle': 'تخطيط وإدارة المواعيد مع الأهل',
    'appointments.new': 'موعد جديد',
    'appointments.none': 'لا توجد مواعيد مجدولة',
    'appointments.none.subtitle': 'ابدأ بإنشاء موعدك الأول',
    'appointments.create': 'إنشاء موعد',
    
    // Currencies
    'currency.eur': 'يورو',
    'currency.mad': 'درهم',
    'currency.symbol.eur': '€',
    'currency.symbol.mad': 'د.م.',
    
    // School info
    'school.name': 'الجيل الجديد برو',
    'school.subtitle': 'روضة أطفال للتميز',
    'school.experience': '15 سنة خبرة',
    'school.location': 'إقامة الصفا 4، سلا',
    'school.phone': '+212 5 37 86 55 81',
    'school.email': 'periscolaire@nouvellegeneration.pro',
    
    // Gallery Section
    'gallery.title': 'اكتشف مدرستنا بالصور',
    'gallery.subtitle': 'انغمس في عالم مدرسة الروضة الملون والمريح',
    'gallery.classroom.title': 'فصول دراسية حديثة',
    'gallery.classroom.description': 'مساحات مضيئة ومناسبة للأطفال الصغار مع معدات تعليمية مبتكرة',
    'gallery.playground.title': 'منطقة ألعاب آمنة',
    'gallery.playground.description': 'مساحة ترفيهية آمنة ومحفزة للتطور الحركي',
    'gallery.activities.title': 'أنشطة إبداعية',
    'gallery.activities.description': 'ورش الفنون التشكيلية والموسيقى والتعبير الجسدي',
    'gallery.library.title': 'مكتبة الأطفال',
    'gallery.library.description': 'ركن قراءة دافئ لتطوير حب الكتب',
    'gallery.cafeteria.title': 'مساحة الطعام',
    'gallery.cafeteria.description': 'وجبات متوازنة محضرة بعناية في بيئة ودية',
    'gallery.garden.title': 'حديقة تعليمية',
    'gallery.garden.description': 'حديقة تعليمية لتوعية الأطفال بالطبيعة',
    'gallery.view.more': 'عرض المزيد من الصور',
    'gallery.virtual.tour': 'جولة افتراضية',
    
    // School Life Section
    'school.life.title': 'الحياة المدرسية في الجيل الجديد برو',
    'school.life.subtitle': 'يوم نموذجي في مدرستنا المتفهمة',
    'school.life.schedule.title': 'البرنامج اليومي',
    'school.life.schedule.description': 'اكتشف مجرى يوم مثري',
    'school.life.morning.title': 'الاستقبال الصباحي',
    'school.life.morning.time': '8:00 - 8:30',
    'school.life.morning.description': 'استقبال شخصي وأنشطة حرة لبدء اليوم بلطف',
    'school.life.learning.title': 'التعلم الأساسي',
    'school.life.learning.time': '8:30 - 10:00',
    'school.life.learning.description': 'أنشطة تعليمية مناسبة لكل مستوى مع طرق مبتكرة',
    'school.life.break.title': 'الاستراحة',
    'school.life.break.time': '10:00 - 10:30',
    'school.life.break.description': 'وقت اللعب الحر لتطوير التواصل الاجتماعي والحركة',
    'school.life.workshop.title': 'ورش إبداعية',
    'school.life.workshop.time': '10:30 - 11:30',
    'school.life.workshop.description': 'الفنون التشكيلية والموسيقى والحكايات والتعبير الجسدي',
    'school.life.lunch.title': 'الغداء',
    'school.life.lunch.time': '12:00 - 13:00',
    'school.life.lunch.description': 'وجبات متوازنة ولحظة مودة حول المائدة',
    'school.life.rest.title': 'وقت الهدوء',
    'school.life.rest.time': '13:00 - 14:00',
    'school.life.rest.description': 'قيلولة أو أنشطة هادئة حسب احتياجات كل طفل',
    'school.life.afternoon.title': 'أنشطة متنوعة',
    'school.life.afternoon.time': '14:00 - 15:30',
    'school.life.afternoon.description': 'ألعاب تعليمية ورياضة واكتشاف العالم من حولنا',
    'school.life.departure.title': 'المغادرة المتدرجة',
    'school.life.departure.time': '15:30 - 16:00',
    'school.life.departure.description': 'تقييم اليوم والتحضير للمغادرة',
    'school.life.testimonial.parent1': '"مدرسة ينمو فيها طفلي كل يوم. الفريق رائع!"',
    'school.life.testimonial.parent1.name': 'السيدة بناني، والدة ياسمين',
    'school.life.testimonial.parent2': '"النهج التعليمي يحترم قيمنا الثقافية تماماً."',
    'school.life.testimonial.parent2.name': 'السيد الفاسي، والد آدم',
    'school.life.testimonial.parent3': '"تعلم ابني العربية والفرنسية بطبيعية. شكراً!"',
    'school.life.testimonial.parent3.name': 'السيدة علوي، والدة مهدي',
    
    // Registration Section
    'registration.title': 'التسجيل 2025-2026: أماكن محدودة',
    'registration.subtitle': 'احجز مكان طفلك الآن',
    'registration.places.available': 'الأماكن المتاحة',
    'registration.places.remaining': 'مكان متبقي',
    'registration.deadline': 'الموعد النهائي للتسجيل',
    'registration.deadline.date': '30 يونيو 2025',
    'registration.start.date': 'بداية العام الدراسي',
    'registration.start.date.value': '2 سبتمبر 2025',
    'registration.process.title': 'عملية التسجيل',
    'registration.process.step1': 'التسجيل المسبق عبر الإنترنت',
    'registration.process.step1.description': 'املأ نموذج التسجيل المسبق بمعلومات طفلك',
    'registration.process.step2': 'موعد شخصي',
    'registration.process.step2.description': 'لقاء مع الفريق التعليمي وزيارة المدرسة',
    'registration.process.step3': 'ملف التسجيل',
    'registration.process.step3.description': 'إنهاء الملف بالمستندات المطلوبة',
    'registration.process.step4': 'التأكيد',
    'registration.process.step4.description': 'تأكيد التسجيل ودمج الطفل',
    'registration.requirements.title': 'المستندات المطلوبة',
    'registration.requirements.birth.certificate': 'نسخة من شهادة الميلاد',
    'registration.requirements.vaccination': 'دفتر التطعيمات محدث',
    'registration.requirements.medical': 'شهادة طبية',
    'registration.requirements.photos': 'صورتان شخصيتان',
    'registration.requirements.residence': 'إثبات الإقامة',
    'registration.requirements.id': 'نسخة من بطاقة الهوية للوالدين',
    'registration.fees.title': 'رسوم التعليم',
    'registration.fees.registration': 'رسوم التسجيل',
    'registration.fees.monthly': 'الرسوم الشهرية',
    'registration.fees.materials': 'المواد التعليمية',
    'registration.fees.meals': 'الوجبات (اختيارية)',
    'registration.fees.payment': 'تسهيلات الدفع متاحة',
    'registration.deadline.removed': 'التسجيل مفتوح طوال السنة',
    'registration.cta.new': 'أماكن محدودة - سجل الآن',
    
    // News Section
    'news.title': 'مدرستنا تتطور',
    'news.subtitle': 'أخبار وجديد الجيل الجديد برو',
    'news.latest': 'آخر الأخبار',
    'news.all': 'جميع الأخبار',
    'news.read.more': 'اقرأ المزيد',
    'news.date.format': 'dd/mm/yyyy',
    'news.category.general': 'عام',
    'news.category.pedagogy': 'التربية',
    'news.category.events': 'الأحداث',
    'news.category.health': 'الصحة',
    'news.1.title': 'قاعة جديدة متعددة الحواس',
    'news.1.date': '15 يناير 2025',
    'news.1.category': 'التربية',
    'news.1.excerpt': 'اكتشف مساحتنا الجديدة المخصصة للتطوير الحسي للأطفال مع معدات مبتكرة.',
    'news.2.title': 'لقاءات الأهل والمعلمين',
    'news.2.date': '22 يناير 2025',
    'news.2.category': 'الأحداث',
    'news.2.excerpt': 'اجدول مواعيدك الفردية لمناقشة تطور طفلك.',
    'news.3.title': 'بروتوكول صحي جديد',
    'news.3.date': '8 فبراير 2025',
    'news.3.category': 'الصحة',
    'news.3.excerpt': 'تحديث إجراءاتنا الصحية لضمان سلامة جميع الأطفال.',
    'news.4.title': 'كرنفال الربيع',
    'news.4.date': '15 مارس 2025',
    'news.4.category': 'الأحداث',
    'news.4.excerpt': 'استعدوا لكرنفالنا السنوي الكبير مع العروض والاستعراضات.',
    
    // Contact Section
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'نحن هنا للإجابة على جميع أسئلتك',
    'contact.info.title': 'معلومات الاتصال',
    'contact.address.title': 'العنوان',
    'contact.hours.title': 'ساعات العمل',
    'contact.hours.monday.friday': 'الاثنين - الجمعة',
    'contact.hours.morning': '8:00 - 12:00',
    'contact.hours.afternoon': '14:00 - 16:00',
    'contact.hours.saturday': 'السبت',
    'contact.hours.saturday.time': '9:00 - 12:00',
    'contact.hours.sunday': 'الأحد',
    'contact.hours.closed': 'مغلق',
    'contact.emergency.title': 'رقم الطوارئ',
    'contact.emergency.hours': 'متاح 24/7',
    'contact.form.title': 'نموذج الاتصال',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.name.placeholder': 'اسمك الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.phone': 'الهاتف',
    'contact.form.phone.placeholder': '06 12 34 56 78',
    'contact.form.subject': 'الموضوع',
    'contact.form.subject.placeholder': 'موضوع رسالتك',
    'contact.form.message': 'الرسالة',
    'contact.form.message.placeholder': 'رسالتك...',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.success': 'تم إرسال الرسالة بنجاح!',
    'contact.form.error': 'خطأ في إرسال الرسالة',
    'contact.form.required': 'هذا الحقل مطلوب',
    'contact.form.email.invalid': 'بريد إلكتروني غير صحيح',
    'contact.form.phone.invalid': 'رقم هاتف غير صحيح',
    'contact.social.title': 'تابعنا',
    'contact.map.title': 'الموقع',
    'contact.phone': '05 37 00 00 00',
    'contact.email': 'periscolaire@nouvellegeneration.pro',
    'school.phone': '+212 5 37 86 55 81',
    'school.email': 'periscolaire@nouvellegeneration.pro',
    'registration.deadline.removed': 'التسجيل مفتوح طوال السنة',
    'registration.cta.new': 'أماكن محدودة - سجل الآن',
    'contact.address': 'Résidence Essafa 4, Salé',
    
    // Footer
    'footer.about.title': 'حول',
    'footer.about.description': 'مدرسة روضة للتميز تقدم تعليماً ثنائي اللغة ومتفهماً منذ 2009.',
    'footer.quick.links': 'روابط سريعة',
    'footer.contact.info': 'معلومات الاتصال',
    'footer.follow.us': 'تابعنا',
    'footer.legal.title': 'الملاحظات القانونية',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.cookies': 'إدارة الكوكيز',
    'footer.copyright': 'جميع الحقوق محفوظة',
    'footer.developed.by': 'تم التطوير بـ ❤️ بواسطة',
    'footer.newsletter.title': 'النشرة الإخبارية',
    'footer.newsletter.description': 'ابق على اطلاع بأخبارنا',
    'footer.newsletter.email': 'بريدك الإلكتروني',
    'footer.newsletter.subscribe': 'اشترك',
    'footer.newsletter.success': 'تم الاشتراك بنجاح!',
    
    // Additional translations
    'months.january': 'يناير',
    'months.february': 'فبراير',
    'months.march': 'مارس',
    'months.april': 'أبريل',
    'months.may': 'مايو',
    'months.june': 'يونيو',
    'months.july': 'يوليو',
    'months.august': 'أغسطس',
    'months.september': 'سبتمبر',
    'months.october': 'أكتوبر',
    'months.november': 'نوفمبر',
    'months.december': 'ديسمبر'
  },
  
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.refresh': 'Refresh',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Navigation
    'nav.home': 'Home',
    'nav.methods': 'Our Methods',
    'nav.gallery': 'Our School',
    'nav.school.life': 'School Life',
    'nav.registration': 'Registration',
    'nav.contact': 'Contact',
    'nav.forms': 'Forms',
    'nav.open.menu': 'Open menu',
    'nav.close.menu': 'Close menu',
    
    // Hero Section
    'hero.title.part1': 'The Kindergarten that',
    'hero.title.part2': 'Makes the Difference',
    'hero.registration.open': 'Registration Open 2025-2026',
    'hero.description': 'A modern kindergarten with trilingual education (French, Arabic, English) and innovative pedagogy. Classes limited to 15 students in a caring and stimulating environment.',
    
    // CTA Buttons
    'cta.register.now': 'Register Now',
    'cta.register.child': 'Register My Child',
    'cta.access.forms': 'Access Forms',
    'cta.discover.school': 'Discover Our School',
    
    // Trust Indicators
    'trust.certified': 'Certified School',
    'trust.experience': '15 years experience',
    'trust.caring': 'Caring Approach',
    
    // Info Cards
    'info.places.remaining': 'Places Remaining',
    'info.children.per.class': 'Children/class max',
    
    // Features
    'features.why.choose': 'Why Choose',
    'features.description': 'A modern pedagogical approach that respects Moroccan cultural and spiritual values.',
    'features.bilingual.title': 'Bilingual Education',
    'features.bilingual.description': 'Learning in Arabic and French to prepare your child\'s future in a multicultural context.',
    'features.technology.title': 'Modern Technology',
    'features.technology.description': 'Interactive boards and digital tools adapted to young children for playful learning.',
    'features.qualified.title': 'Qualified Team',
    'features.qualified.description': 'Teachers trained in modern pedagogical methods and Moroccan cultural values.',
    'features.small.classes.title': 'Small Classes',
    'features.small.classes.description': 'Maximum 15 children per class for personalized support of each student.',
    'features.activities.title': 'Enriching Activities',
    'features.activities.description': 'Arts, music, theater, sports and cultural activities to develop all talents.',
    'features.secure.title': 'Secure Environment',
    'features.secure.description': 'Modern, clean and organized space with enhanced security for parents\' peace of mind.',
    
    // Forms and Admin
    'forms.title': 'Forms System',
    'admin.access': 'Admin Access',
    
    // School Info
    'school.since': 'Educational excellence since 2009',
    
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.remember': 'Remember me',
    'auth.forgot': 'Forgot password?',
    'auth.signin': 'Sign in',
    'auth.welcome': 'Welcome',
    'auth.invalid': 'Invalid credentials',
    'auth.success': 'Login successful',
    'auth.required': 'Required field',
    'auth.reset': 'Reset password',
    'auth.change': 'Change password',
    'auth.current': 'Current password',
    'auth.new': 'New password',
    'auth.confirm': 'Confirm password',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview of school activities',
    'dashboard.stats.users': 'Total Users',
    'dashboard.stats.children': 'Registered Children',
    'dashboard.stats.pending': 'Pending Registrations',
    'dashboard.stats.active': 'Active Users',
    'dashboard.stats.today': 'today',
    'dashboard.stats.waiting': 'waiting',
    'dashboard.recent': 'Recent Registrations',
    'dashboard.distribution': 'Distribution by Level',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.users': 'Users',
    'nav.children': 'Children',
    'nav.appointments': 'Appointments',
    'nav.messages': 'Messages',
    'nav.settings': 'Settings',
    'nav.admin': 'NGP Administration',
    'nav.school': 'New Generation Pro',
    
    // Users
    'users.title': 'User Management',
    'users.subtitle': 'Manage parent accounts and their children',
    'users.new': 'New user',
    'users.contact': 'Contact',
    'users.children': 'Children',
    'users.status': 'Status',
    'users.registration': 'Registration',
    'users.actions': 'Actions',
    'users.active': 'Active',
    'users.inactive': 'Inactive',
    'users.search': 'Search user...',
    
    // Children
    'children.title': 'Children Management',
    'children.subtitle': 'Manage registrations and children statuses',
    'children.new': 'New registration',
    'children.child': 'Child',
    'children.parent': 'Parent',
    'children.level': 'Level',
    'children.search': 'Search child...',
    'children.boy': 'Boy',
    'children.girl': 'Girl',
    'children.years': 'years',
    'children.status.pending': 'Pending',
    'children.status.approved': 'Approved',
    'children.status.rejected': 'Rejected',
    'children.level.petite': 'Small Section',
    'children.level.moyenne': 'Middle Section',
    'children.level.grande': 'Large Section',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Configure your school settings',
    'settings.school': 'School Information',
    'settings.notifications': 'Notification Settings',
    'settings.name': 'School Name',
    'settings.address': 'Address',
    'settings.phone': 'Phone',
    'settings.email.notifications': 'Email notifications',
    'settings.new.registrations': 'New registrations',
    'settings.appointment.reminders': 'Appointment reminders',
    'settings.save.changes': 'Save Changes',
    
    // Appointments
    'appointments.title': 'Appointments Management',
    'appointments.subtitle': 'Schedule and manage appointments with parents',
    'appointments.new': 'New appointment',
    'appointments.none': 'No appointments scheduled',
    'appointments.none.subtitle': 'Start by creating your first appointment',
    'appointments.create': 'Create appointment',
    
    // Currencies
    'currency.eur': 'Euro',
    'currency.mad': 'Dirham',
    'currency.symbol.eur': '€',
    'currency.symbol.mad': 'د.م.',
    
    // School info
    'school.name': 'New Generation Pro',
    'school.subtitle': 'Excellence Kindergarten',
    'school.experience': '15 years experience',
    'school.location': 'Residence Essafa 4, Salé',
    'school.phone': '+212 5 37 86 55 81',
    'school.email': 'periscolaire@nouvellegeneration.pro',
    
    // Gallery Section
    'gallery.title': 'Discover Our School in Pictures',
    'gallery.subtitle': 'Immerse yourself in the colorful and caring universe of our kindergarten',
    'gallery.classroom.title': 'Modern Classrooms',
    'gallery.classroom.description': 'Bright spaces adapted to young children with innovative educational equipment',
    'gallery.playground.title': 'Secure Playground',
    'gallery.playground.description': 'Safe and stimulating recreational space for motor development',
    'gallery.activities.title': 'Creative Activities',
    'gallery.activities.description': 'Art workshops, music and body expression',
    'gallery.library.title': 'Children\'s Library',
    'gallery.library.description': 'Warm reading corner to develop love of books',
    'gallery.cafeteria.title': 'Dining Area',
    'gallery.cafeteria.description': 'Balanced meals carefully prepared in a friendly environment',
    'gallery.garden.title': 'Educational Garden',
    'gallery.garden.description': 'Educational vegetable garden to raise children\'s awareness of nature',
    'gallery.view.more': 'View more photos',
    'gallery.virtual.tour': 'Virtual tour',
    
    // School Life Section
    'school.life.title': 'School Life at New Generation Pro',
    'school.life.subtitle': 'A typical day in our caring school',
    'school.life.schedule.title': 'Daily Program',
    'school.life.schedule.description': 'Discover the flow of an enriching day',
    'school.life.morning.title': 'Morning Welcome',
    'school.life.morning.time': '8:00 AM - 8:30 AM',
    'school.life.morning.description': 'Personalized welcome and free activities to start the day gently',
    'school.life.learning.title': 'Fundamental Learning',
    'school.life.learning.time': '8:30 AM - 10:00 AM',
    'school.life.learning.description': 'Educational activities adapted to each level with innovative methods',
    'school.life.break.title': 'Recess',
    'school.life.break.time': '10:00 AM - 10:30 AM',
    'school.life.break.description': 'Free play time to develop socialization and motor skills',
    'school.life.workshop.title': 'Creative Workshops',
    'school.life.workshop.time': '10:30 AM - 11:30 AM',
    'school.life.workshop.description': 'Visual arts, music, storytelling and body expression',
    'school.life.lunch.title': 'Lunch',
    'school.life.lunch.time': '12:00 PM - 1:00 PM',
    'school.life.lunch.description': 'Balanced meals and moment of conviviality around the table',
    'school.life.rest.title': 'Quiet Time',
    'school.life.rest.time': '1:00 PM - 2:00 PM',
    'school.life.rest.description': 'Nap or quiet activities according to each child\'s needs',
    'school.life.afternoon.title': 'Diverse Activities',
    'school.life.afternoon.time': '2:00 PM - 3:30 PM',
    'school.life.afternoon.description': 'Educational games, sports and discovery of the world around us',
    'school.life.departure.title': 'Staggered Departure',
    'school.life.departure.time': '3:30 PM - 4:00 PM',
    'school.life.departure.description': 'Day review and preparation for departure',
    'school.life.testimonial.parent1': '"A school where my child thrives every day. The team is wonderful!"',
    'school.life.testimonial.parent1.name': 'Mrs. Bennani, Yasmine\'s mother',
    'school.life.testimonial.parent2': '"The pedagogical approach perfectly respects our cultural values."',
    'school.life.testimonial.parent2.name': 'Mr. El Fassi, Adam\'s father',
    'school.life.testimonial.parent3': '"My son learned Arabic and French naturally. Thank you!"',
    'school.life.testimonial.parent3.name': 'Mrs. Alaoui, Mehdi\'s mother',
    
    // Registration Section
    'registration.title': 'Registration 2025-2026: Limited Places',
    'registration.subtitle': 'Reserve your child\'s place now',
    'registration.places.available': 'Available places',
    'registration.places.remaining': 'places remaining',
    'registration.deadline': 'Registration deadline',
    'registration.deadline.date': 'June 30, 2025',
    'registration.start.date': 'School start',
    'registration.start.date.value': 'September 2, 2025',
    'registration.process.title': 'Registration process',
    'registration.process.step1': 'Online pre-registration',
    'registration.process.step1.description': 'Fill out the pre-registration form with your child\'s information',
    'registration.process.step2': 'Personal appointment',
    'registration.process.step2.description': 'Meeting with the educational team and school visit',
    'registration.process.step3': 'Registration file',
    'registration.process.step3.description': 'Finalization of the file with required documents',
    'registration.process.step4': 'Confirmation',
    'registration.process.step4.description': 'Registration validation and child integration',
    'registration.requirements.title': 'Required documents',
    'registration.requirements.birth.certificate': 'Copy of birth certificate',
    'registration.requirements.vaccination': 'Updated vaccination record',
    'registration.requirements.medical': 'Medical certificate',
    'registration.requirements.photos': '2 ID photos',
    'registration.requirements.residence': 'Proof of residence',
    'registration.requirements.id': 'Copy of parents\' ID',
    'registration.fees.title': 'School fees',
    'registration.fees.registration': 'Registration fee',
    'registration.fees.monthly': 'Monthly fee',
    'registration.fees.materials': 'Educational materials',
    'registration.fees.meals': 'Meals (optional)',
    'registration.fees.payment': 'Payment facilities available',
    'registration.deadline.removed': 'Registration open all year',
    'registration.cta.new': 'Limited Spots - Register Now',
    
    // News Section
    'news.title': 'Our School Evolves',
    'news.subtitle': 'News and updates from New Generation Pro',
    'news.latest': 'Latest news',
    'news.all': 'All news',
    'news.read.more': 'Read more',
    'news.date.format': 'mm/dd/yyyy',
    'news.category.general': 'General',
    'news.category.pedagogy': 'Pedagogy',
    'news.category.events': 'Events',
    'news.category.health': 'Health',
    'news.1.title': 'New Multi-Sensory Room',
    'news.1.date': 'January 15, 2025',
    'news.1.category': 'Pedagogy',
    'news.1.excerpt': 'Discover our new space dedicated to children\'s sensory development with innovative equipment.',
    'news.2.title': 'Parent-Teacher Meetings',
    'news.2.date': 'January 22, 2025',
    'news.2.category': 'Events',
    'news.2.excerpt': 'Schedule your individual appointments to discuss your child\'s progress.',
    'news.3.title': 'New Health Protocol',
    'news.3.date': 'February 8, 2025',
    'news.3.category': 'Health',
    'news.3.excerpt': 'Update of our health measures to ensure the safety of all children.',
    'news.4.title': 'Spring Carnival',
    'news.4.date': 'March 15, 2025',
    'news.4.category': 'Events',
    'news.4.excerpt': 'Get ready for our big annual carnival with parade and shows.',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer all your questions',
    'contact.info.title': 'Contact Information',
    'contact.address.title': 'Address',
    'contact.hours.title': 'Opening Hours',
    'contact.hours.monday.friday': 'Monday - Friday',
    'contact.hours.morning': '8:00 AM - 12:00 PM',
    'contact.hours.afternoon': '2:00 PM - 4:00 PM',
    'contact.hours.saturday': 'Saturday',
    'contact.hours.saturday.time': '9:00 AM - 12:00 PM',
    'contact.hours.sunday': 'Sunday',
    'contact.hours.closed': 'Closed',
    'contact.emergency.title': 'Emergency Number',
    'contact.emergency.hours': 'Available 24/7',
    'contact.form.title': 'Contact Form',
    'contact.form.name': 'Full Name',
    'contact.form.name.placeholder': 'Your full name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.phone': 'Phone',
    'contact.form.phone.placeholder': '06 12 34 56 78',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'Subject of your message',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Your message...',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Error sending message',
    'contact.form.required': 'This field is required',
    'contact.form.email.invalid': 'Invalid email',
    'contact.form.phone.invalid': 'Invalid phone number',
    'contact.social.title': 'Follow Us',
    'contact.map.title': 'Location',
    'contact.phone': '05 37 00 00 00',
    'contact.email': 'periscolaire@nouvellegeneration.pro',
    'school.phone': '+212 5 37 86 55 81',
    'school.email': 'periscolaire@nouvellegeneration.pro',
    'registration.deadline.removed': 'Registration open all year',
    'registration.cta.new': 'Limited Spots - Register Now',
    'contact.address': 'Résidence Essafa 4, Salé',
    
    // Footer
    'footer.about.title': 'About',
    'footer.about.description': 'Excellence kindergarten offering bilingual and caring education since 2009.',
    'footer.quick.links': 'Quick Links',
    'footer.contact.info': 'Contact Information',
    'footer.follow.us': 'Follow Us',
    'footer.legal.title': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Management',
    'footer.copyright': 'All rights reserved',
    'footer.developed.by': 'Developed with ❤️ by',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.description': 'Stay informed about our news',
    'footer.newsletter.email': 'Your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.newsletter.success': 'Successfully subscribed!',
    
    // Additional translations
    'months.january': 'January',
    'months.february': 'February',
    'months.march': 'March',
    'months.april': 'April',
    'months.may': 'May',
    'months.june': 'June',
    'months.july': 'July',
    'months.august': 'August',
    'months.september': 'September',
    'months.october': 'October',
    'months.november': 'November',
    'months.december': 'December'
  }
};

class LanguageService {
  private static instance: LanguageService;
  private currentLanguage: Language = 'fr';
  private listeners: Array<(language: Language) => void> = [];

  static getInstance(): LanguageService {
    if (!LanguageService.instance) {
      LanguageService.instance = new LanguageService();
    }
    return LanguageService.instance;
  }

  constructor() {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    const saved = localStorage.getItem('adminLanguage');
    if (saved && ['fr', 'ar', 'en'].includes(saved)) {
      this.currentLanguage = saved as Language;
    }
    this.updateDocumentDirection();
  }

  private saveLanguage(): void {
    localStorage.setItem('adminLanguage', this.currentLanguage);
  }

  private updateDocumentDirection(): void {
    const config = LANGUAGES.find(lang => lang.code === this.currentLanguage);
    if (config) {
      document.documentElement.dir = config.direction;
      document.documentElement.lang = config.code;
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    this.saveLanguage();
    this.updateDocumentDirection();
    this.notifyListeners();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  getLanguageConfig(): LanguageConfig {
    return LANGUAGES.find(lang => lang.code === this.currentLanguage) || LANGUAGES[0];
  }

  translate(key: string, fallback?: string): string {
    const translations = TRANSLATIONS[this.currentLanguage];
    return translations[key] || fallback || key;
  }

  t(key: string, fallback?: string): string {
    return this.translate(key, fallback);
  }

  isRTL(): boolean {
    return this.getLanguageConfig().direction === 'rtl';
  }

  subscribe(listener: (language: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }
}

export const languageService = LanguageService.getInstance();