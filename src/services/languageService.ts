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
    'school.phone': '05 37 00 00 00',
    'school.email': 'info@nouvellegeneration.pro'
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
    'school.phone': '05 37 00 00 00',
    'school.email': 'info@nouvellegeneration.pro'
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
    'school.phone': '05 37 00 00 00',
    'school.email': 'info@nouvellegeneration.pro'
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