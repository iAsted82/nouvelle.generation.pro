export type Language = 'fr' | 'en' | 'ar';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇲🇦',
    rtl: true
  }
];

// Comprehensive translations
const TRANSLATIONS = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.inscription': 'Inscription',
    'nav.contact': 'Contact',
    'nav.about': 'À Propos',
    'nav.admin': 'Administration',
    'nav.dashboard': 'Tableau de bord',
    'nav.users': 'Utilisateurs',
    'nav.children': 'Enfants',
    'nav.appointments': 'Rendez-vous',
    'nav.messages': 'Messages',
    'nav.settings': 'Paramètres',
    'nav.notifications': 'Notifications',
    'nav.school': 'Nouvelle Génération Pro',

    // Hero Section
    'hero.title': 'Nouvelle Génération Pro',
    'hero.subtitle': 'École Maternelle d\'Excellence à Salé',
    'hero.description': 'Offrez à votre enfant un environnement d\'apprentissage moderne avec des méthodes pédagogiques innovantes et un encadrement personnalisé.',
    'hero.enrollment': 'Inscriptions ouvertes toute l\'année',
    'hero.limited': 'Places Limitées - Inscrivez-vous Maintenant',

    // Call to Action
    'cta.register': 'Inscrire Mon Enfant',
    'cta.video': 'Découvrir l\'École',
    'cta.contact': 'Nous Contacter',
    'cta.appointment': 'Prendre RDV',
    'cta.title': 'Prêt à Offrir le Meilleur à Votre Enfant ?',
    'cta.subtitle': 'Rejoignez notre communauté éducative d\'excellence dès aujourd\'hui',

    // Services
    'services.title': 'Nos Services d\'Excellence',
    'services.subtitle': 'Un accompagnement complet pour le développement optimal de votre enfant',
    'services.education.title': 'Éducation Moderne',
    'services.education.description': 'Programmes éducatifs innovants adaptés à chaque niveau de développement.',
    'services.care.title': 'Encadrement Personnalisé',
    'services.care.description': 'Suivi individuel avec une équipe pédagogique expérimentée et bienveillante.',
    'services.activities.title': 'Activités Créatives',
    'services.activities.description': 'Ateliers artistiques, sportifs et ludiques pour développer tous les talents.',
    'services.page.title': 'Nos Services d\'Excellence',
    'services.page.subtitle': 'Un accompagnement complet pour chaque enfant',
    'services.levels.title': 'Niveaux Scolaires',
    'services.levels.petite': 'Petite Section (3-4 ans)',
    'services.levels.moyenne': 'Moyenne Section (4-5 ans)',
    'services.levels.grande': 'Grande Section (5-6 ans)',
    'services.schedule.title': 'Horaires',

    // Stats
    'stats.students': 'Élèves',
    'stats.experience': 'Ans d\'Expérience',
    'stats.teachers': 'Enseignants',
    'stats.satisfaction': 'Satisfaction',

    // Gallery
    'gallery.title': 'Notre École en Images',
    'gallery.subtitle': 'Découvrez nos espaces modernes et notre environnement d\'apprentissage',
    'gallery.alt': 'École Nouvelle Génération Pro',

    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes là pour répondre à toutes vos questions',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom complet',
    'contact.form.name_placeholder': 'Votre nom complet',
    'contact.form.email': 'Email',
    'contact.form.email_placeholder': 'votre@email.com',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Votre message...',
    'contact.form.send': 'Envoyer le message',
    'contact.info.title': 'Informations de contact',
    'contact.urgent.title': 'Besoin Urgent ?',
    'contact.urgent.subtitle': 'Contactez-nous directement pour une réponse rapide',
    'contact.success': 'Message envoyé avec succès !',
    'contact.error': 'Erreur lors de l\'envoi du message',

    // About
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Notre histoire et nos valeurs',
    'about.mission.title': 'Notre Mission',
    'about.mission.text': 'Chez Nouvelle Génération Pro, nous nous engageons à offrir une éducation de qualité supérieure qui prépare nos jeunes élèves à un avenir brillant. Notre approche pédagogique innovante combine les meilleures pratiques éducatives avec un environnement stimulant et bienveillant.',
    'about.values.excellence': 'Excellence pédagogique',
    'about.values.innovation': 'Innovation éducative',
    'about.values.care': 'Encadrement personnalisé',
    'about.image.alt': 'Notre équipe pédagogique',

    // Inscription
    'inscription.title': 'Inscription 2025-2026',
    'inscription.subtitle': 'Rejoignez notre école d\'excellence',
    'inscription.step1': '1. Créer un Compte',
    'inscription.step1_desc': 'Créez votre compte parent',
    'inscription.step2': '2. Inscrire l\'Enfant',
    'inscription.step2_desc': 'Remplissez le dossier d\'inscription',
    'inscription.step3': '3. Validation',
    'inscription.step3_desc': 'Confirmation sous 48h',
    'inscription.start': 'Commencer l\'Inscription',

    // Schedule
    'schedule.monday_friday': 'Lundi - Vendredi',
    'schedule.saturday': 'Samedi',
    'schedule.sunday': 'Dimanche',
    'schedule.closed': 'Fermé',

    // Common
    'common.learn_more': 'En savoir plus',
    'common.register': 'S\'inscrire',
    'common.call': 'Appeler',
    'common.email': 'Email',
    'common.loading': 'Chargement...',
    'common.sending': 'Envoi en cours...',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.refresh': 'Actualiser',
    'common.search': 'Rechercher...',

    // School Info
    'school.name': 'Nouvelle Génération Pro',
    'school.subtitle': 'École Maternelle d\'Excellence',
    'school.location': 'Résidence Essafa 4, Salé',
    'school.phone': '+212 5 37 86 55 81',

    // Footer
    'footer.description': 'École maternelle d\'excellence offrant un environnement d\'apprentissage moderne et stimulant.',
    'footer.quick_links': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',

    // Video
    'video.coming_soon': 'Vidéo de présentation',
    'video.description': 'Découvrez notre école à travers cette vidéo de présentation détaillée.',

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

    // Users Management
    'users.title': 'Gestion des Utilisateurs',
    'users.subtitle': 'Gérez les comptes parents et leurs enfants',
    'users.new': 'Nouvel utilisateur',
    'users.search': 'Rechercher un utilisateur...',
    'users.user': 'Utilisateur',
    'users.contact': 'Contact',
    'users.children': 'Enfants',
    'users.status': 'Statut',
    'users.registration': 'Inscription',
    'users.actions': 'Actions',
    'users.active': 'Actif',
    'users.inactive': 'Inactif',

    // Children Management
    'children.title': 'Gestion des Enfants',
    'children.subtitle': 'Gérez les inscriptions et statuts des enfants',
    'children.new': 'Nouvelle inscription',
    'children.search': 'Rechercher un enfant...',
    'children.child': 'Enfant',
    'children.parent': 'Parent',
    'children.level': 'Niveau',
    'children.boy': 'Garçon',
    'children.girl': 'Fille',
    'children.years': 'ans',
    'children.level.petite': 'Petite Section',
    'children.level.moyenne': 'Moyenne Section',
    'children.level.grande': 'Grande Section',
    'children.status.all': 'Tous les statuts',
    'children.status.pending': 'En attente',
    'children.status.approved': 'Approuvé',
    'children.status.rejected': 'Rejeté',

    // Appointments
    'appointments.title': 'Gestion des Rendez-vous',
    'appointments.subtitle': 'Planifiez et gérez les rendez-vous avec les parents',
    'appointments.new': 'Nouveau rendez-vous',
    'appointments.none': 'Aucun rendez-vous programmé',
    'appointments.none.subtitle': 'Commencez par créer votre premier rendez-vous',
    'appointments.create': 'Créer un rendez-vous',

    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Configurez les paramètres de votre école',
    'settings.school': 'Informations de l\'école',
    'settings.name': 'Nom de l\'école',
    'settings.address': 'Adresse',
    'settings.phone': 'Téléphone',
    'settings.notifications': 'Paramètres de notification',
    'settings.email.notifications': 'Notifications par email',
    'settings.new.registrations': 'Nouvelles inscriptions',
    'settings.appointment.reminders': 'Rappels de rendez-vous',
    'settings.save.changes': 'Sauvegarder les modifications',

    // Auth
    'auth.welcome': 'Bienvenue',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.remember': 'Se souvenir de moi',
    'auth.forgot': 'Mot de passe oublié ?',
    'auth.signin': 'Se connecter',
    'auth.logout': 'Déconnexion',
    'auth.reset': 'Réinitialiser le mot de passe',

    // Notifications
    'notifications.none': 'Aucune notification',
    'notifications.attention': 'Nécessite votre attention'
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.inscription': 'Registration',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.admin': 'Administration',
    'nav.dashboard': 'Dashboard',
    'nav.users': 'Users',
    'nav.children': 'Children',
    'nav.appointments': 'Appointments',
    'nav.messages': 'Messages',
    'nav.settings': 'Settings',
    'nav.notifications': 'Notifications',
    'nav.school': 'Nouvelle Génération Pro',

    // Hero Section
    'hero.title': 'Nouvelle Génération Pro',
    'hero.subtitle': 'Excellence Kindergarten in Salé',
    'hero.description': 'Give your child a modern learning environment with innovative pedagogical methods and personalized supervision.',
    'hero.enrollment': 'Registration open all year round',
    'hero.limited': 'Limited Spots - Register Now',

    // Call to Action
    'cta.register': 'Register My Child',
    'cta.video': 'Discover the School',
    'cta.contact': 'Contact Us',
    'cta.appointment': 'Book Appointment',
    'cta.title': 'Ready to Give the Best to Your Child?',
    'cta.subtitle': 'Join our educational community of excellence today',

    // Services
    'services.title': 'Our Excellence Services',
    'services.subtitle': 'Complete support for your child\'s optimal development',
    'services.education.title': 'Modern Education',
    'services.education.description': 'Innovative educational programs adapted to each development level.',
    'services.care.title': 'Personalized Care',
    'services.care.description': 'Individual follow-up with an experienced and caring teaching team.',
    'services.activities.title': 'Creative Activities',
    'services.activities.description': 'Artistic, sports and fun workshops to develop all talents.',
    'services.page.title': 'Our Excellence Services',
    'services.page.subtitle': 'Complete support for each child',
    'services.levels.title': 'School Levels',
    'services.levels.petite': 'Small Section (3-4 years)',
    'services.levels.moyenne': 'Medium Section (4-5 years)',
    'services.levels.grande': 'Large Section (5-6 years)',
    'services.schedule.title': 'Schedule',

    // Stats
    'stats.students': 'Students',
    'stats.experience': 'Years of Experience',
    'stats.teachers': 'Teachers',
    'stats.satisfaction': 'Satisfaction',

    // Gallery
    'gallery.title': 'Our School in Pictures',
    'gallery.subtitle': 'Discover our modern spaces and learning environment',
    'gallery.alt': 'Nouvelle Génération Pro School',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer all your questions',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Full name',
    'contact.form.name_placeholder': 'Your full name',
    'contact.form.email': 'Email',
    'contact.form.email_placeholder': 'your@email.com',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Your message...',
    'contact.form.send': 'Send message',
    'contact.info.title': 'Contact information',
    'contact.urgent.title': 'Urgent Need?',
    'contact.urgent.subtitle': 'Contact us directly for a quick response',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message',

    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our history and values',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'At Nouvelle Génération Pro, we are committed to providing superior quality education that prepares our young students for a bright future. Our innovative pedagogical approach combines the best educational practices with a stimulating and caring environment.',
    'about.values.excellence': 'Pedagogical excellence',
    'about.values.innovation': 'Educational innovation',
    'about.values.care': 'Personalized supervision',
    'about.image.alt': 'Our teaching team',

    // Inscription
    'inscription.title': 'Registration 2025-2026',
    'inscription.subtitle': 'Join our school of excellence',
    'inscription.step1': '1. Create Account',
    'inscription.step1_desc': 'Create your parent account',
    'inscription.step2': '2. Register Child',
    'inscription.step2_desc': 'Fill out the registration file',
    'inscription.step3': '3. Validation',
    'inscription.step3_desc': 'Confirmation within 48h',
    'inscription.start': 'Start Registration',

    // Schedule
    'schedule.monday_friday': 'Monday - Friday',
    'schedule.saturday': 'Saturday',
    'schedule.sunday': 'Sunday',
    'schedule.closed': 'Closed',

    // Common
    'common.learn_more': 'Learn more',
    'common.register': 'Register',
    'common.call': 'Call',
    'common.email': 'Email',
    'common.loading': 'Loading...',
    'common.sending': 'Sending...',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.refresh': 'Refresh',
    'common.search': 'Search...',

    // School Info
    'school.name': 'Nouvelle Génération Pro',
    'school.subtitle': 'Excellence Kindergarten',
    'school.location': 'Essafa 4 Residence, Salé',
    'school.phone': '+212 5 37 86 55 81',

    // Footer
    'footer.description': 'Excellence kindergarten offering a modern and stimulating learning environment.',
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    // Video
    'video.coming_soon': 'Presentation video',
    'video.description': 'Discover our school through this detailed presentation video.',

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

    // Users Management
    'users.title': 'User Management',
    'users.subtitle': 'Manage parent accounts and their children',
    'users.new': 'New user',
    'users.search': 'Search user...',
    'users.user': 'User',
    'users.contact': 'Contact',
    'users.children': 'Children',
    'users.status': 'Status',
    'users.registration': 'Registration',
    'users.actions': 'Actions',
    'users.active': 'Active',
    'users.inactive': 'Inactive',

    // Children Management
    'children.title': 'Children Management',
    'children.subtitle': 'Manage registrations and children status',
    'children.new': 'New registration',
    'children.search': 'Search child...',
    'children.child': 'Child',
    'children.parent': 'Parent',
    'children.level': 'Level',
    'children.boy': 'Boy',
    'children.girl': 'Girl',
    'children.years': 'years',
    'children.level.petite': 'Small Section',
    'children.level.moyenne': 'Medium Section',
    'children.level.grande': 'Large Section',
    'children.status.all': 'All statuses',
    'children.status.pending': 'Pending',
    'children.status.approved': 'Approved',
    'children.status.rejected': 'Rejected',

    // Appointments
    'appointments.title': 'Appointment Management',
    'appointments.subtitle': 'Schedule and manage appointments with parents',
    'appointments.new': 'New appointment',
    'appointments.none': 'No scheduled appointments',
    'appointments.none.subtitle': 'Start by creating your first appointment',
    'appointments.create': 'Create appointment',

    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Configure your school settings',
    'settings.school': 'School information',
    'settings.name': 'School name',
    'settings.address': 'Address',
    'settings.phone': 'Phone',
    'settings.notifications': 'Notification settings',
    'settings.email.notifications': 'Email notifications',
    'settings.new.registrations': 'New registrations',
    'settings.appointment.reminders': 'Appointment reminders',
    'settings.save.changes': 'Save changes',

    // Auth
    'auth.welcome': 'Welcome',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.remember': 'Remember me',
    'auth.forgot': 'Forgot password?',
    'auth.signin': 'Sign in',
    'auth.logout': 'Logout',
    'auth.reset': 'Reset password',

    // Notifications
    'notifications.none': 'No notifications',
    'notifications.attention': 'Requires your attention'
  },

  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.inscription': 'التسجيل',
    'nav.contact': 'اتصل بنا',
    'nav.about': 'معلومات عنا',
    'nav.admin': 'الإدارة',
    'nav.dashboard': 'لوحة التحكم',
    'nav.users': 'المستخدمون',
    'nav.children': 'الأطفال',
    'nav.appointments': 'المواعيد',
    'nav.messages': 'الرسائل',
    'nav.settings': 'الإعدادات',
    'nav.notifications': 'الإشعارات',
    'nav.school': 'الجيل الجديد المهني',

    // Hero Section
    'hero.title': 'الجيل الجديد المهني',
    'hero.subtitle': 'روضة التميز في سلا',
    'hero.description': 'امنح طفلك بيئة تعليمية حديثة مع أساليب تربوية مبتكرة وإشراف شخصي.',
    'hero.enrollment': 'التسجيل مفتوح طوال السنة',
    'hero.limited': 'أماكن محدودة - سجل الآن',

    // Call to Action
    'cta.register': 'سجل طفلي',
    'cta.video': 'اكتشف المدرسة',
    'cta.contact': 'اتصل بنا',
    'cta.appointment': 'احجز موعد',
    'cta.title': 'مستعد لتقديم الأفضل لطفلك؟',
    'cta.subtitle': 'انضم إلى مجتمعنا التعليمي المتميز اليوم',

    // Services
    'services.title': 'خدماتنا المتميزة',
    'services.subtitle': 'دعم شامل للتطوير الأمثل لطفلك',
    'services.education.title': 'التعليم الحديث',
    'services.education.description': 'برامج تعليمية مبتكرة تتكيف مع كل مستوى تطوير.',
    'services.care.title': 'الرعاية الشخصية',
    'services.care.description': 'متابعة فردية مع فريق تعليمي ذو خبرة ومهتم.',
    'services.activities.title': 'الأنشطة الإبداعية',
    'services.activities.description': 'ورش فنية ورياضية وترفيهية لتطوير جميع المواهب.',
    'services.page.title': 'خدماتنا المتميزة',
    'services.page.subtitle': 'دعم شامل لكل طفل',
    'services.levels.title': 'المستويات المدرسية',
    'services.levels.petite': 'القسم الصغير (3-4 سنوات)',
    'services.levels.moyenne': 'القسم المتوسط (4-5 سنوات)',
    'services.levels.grande': 'القسم الكبير (5-6 سنوات)',
    'services.schedule.title': 'المواعيد',

    // Stats
    'stats.students': 'الطلاب',
    'stats.experience': 'سنوات الخبرة',
    'stats.teachers': 'المعلمون',
    'stats.satisfaction': 'الرضا',

    // Gallery
    'gallery.title': 'مدرستنا بالصور',
    'gallery.subtitle': 'اكتشف مساحاتنا الحديثة وبيئة التعلم',
    'gallery.alt': 'مدرسة الجيل الجديد المهني',

    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'نحن هنا للإجابة على جميع أسئلتك',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.address': 'العنوان',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.name_placeholder': 'اسمك الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.email_placeholder': 'your@email.com',
    'contact.form.message': 'الرسالة',
    'contact.form.message_placeholder': 'رسالتك...',
    'contact.form.send': 'إرسال الرسالة',
    'contact.info.title': 'معلومات الاتصال',
    'contact.urgent.title': 'حاجة عاجلة؟',
    'contact.urgent.subtitle': 'اتصل بنا مباشرة للحصول على رد سريع',
    'contact.success': 'تم إرسال الرسالة بنجاح!',
    'contact.error': 'خطأ في إرسال الرسالة',

    // About
    'about.title': 'معلومات عنا',
    'about.subtitle': 'تاريخنا وقيمنا',
    'about.mission.title': 'مهمتنا',
    'about.mission.text': 'في الجيل الجديد المهني، نلتزم بتقديم تعليم عالي الجودة يعد طلابنا الصغار لمستقبل مشرق. نهجنا التربوي المبتكر يجمع بين أفضل الممارسات التعليمية وبيئة محفزة ومهتمة.',
    'about.values.excellence': 'التميز التربوي',
    'about.values.innovation': 'الابتكار التعليمي',
    'about.values.care': 'الإشراف الشخصي',
    'about.image.alt': 'فريقنا التعليمي',

    // Inscription
    'inscription.title': 'التسجيل 2025-2026',
    'inscription.subtitle': 'انضم إلى مدرسة التميز',
    'inscription.step1': '1. إنشاء حساب',
    'inscription.step1_desc': 'أنشئ حساب ولي الأمر',
    'inscription.step2': '2. تسجيل الطفل',
    'inscription.step2_desc': 'املأ ملف التسجيل',
    'inscription.step3': '3. التحقق',
    'inscription.step3_desc': 'تأكيد خلال 48 ساعة',
    'inscription.start': 'بدء التسجيل',

    // Schedule
    'schedule.monday_friday': 'الاثنين - الجمعة',
    'schedule.saturday': 'السبت',
    'schedule.sunday': 'الأحد',
    'schedule.closed': 'مغلق',

    // Common
    'common.learn_more': 'اعرف المزيد',
    'common.register': 'سجل',
    'common.call': 'اتصل',
    'common.email': 'البريد الإلكتروني',
    'common.loading': 'جار التحميل...',
    'common.sending': 'جار الإرسال...',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
    'common.refresh': 'تحديث',
    'common.search': 'بحث...',

    // School Info
    'school.name': 'الجيل الجديد المهني',
    'school.subtitle': 'روضة التميز',
    'school.location': 'إقامة الصفاء 4، سلا',
    'school.phone': '+212 5 37 86 55 81',

    // Footer
    'footer.description': 'روضة متميزة تقدم بيئة تعليمية حديثة ومحفزة.',
    'footer.quick_links': 'روابط سريعة',
    'footer.contact': 'اتصل',
    'footer.rights': 'جميع الحقوق محفوظة.',

    // Video
    'video.coming_soon': 'فيديو تقديمي',
    'video.description': 'اكتشف مدرستنا من خلال هذا الفيديو التقديمي المفصل.',

    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة على أنشطة المدرسة',
    'dashboard.stats.users': 'إجمالي المستخدمين',
    'dashboard.stats.children': 'الأطفال المسجلون',
    'dashboard.stats.pending': 'التسجيلات المعلقة',
    'dashboard.stats.active': 'المستخدمون النشطون',
    'dashboard.stats.today': 'اليوم',
    'dashboard.stats.waiting': 'في الانتظار',
    'dashboard.recent': 'التسجيلات الحديثة',
    'dashboard.distribution': 'التوزيع حسب المستوى',

    // Users Management
    'users.title': 'إدارة المستخدمين',
    'users.subtitle': 'أدر حسابات الأولياء وأطفالهم',
    'users.new': 'مستخدم جديد',
    'users.search': 'بحث عن مستخدم...',
    'users.user': 'المستخدم',
    'users.contact': 'اتصال',
    'users.children': 'الأطفال',
    'users.status': 'الحالة',
    'users.registration': 'التسجيل',
    'users.actions': 'الإجراءات',
    'users.active': 'نشط',
    'users.inactive': 'غير نشط',

    // Children Management
    'children.title': 'إدارة الأطفال',
    'children.subtitle': 'أدر التسجيلات وحالات الأطفال',
    'children.new': 'تسجيل جديد',
    'children.search': 'بحث عن طفل...',
    'children.child': 'الطفل',
    'children.parent': 'ولي الأمر',
    'children.level': 'المستوى',
    'children.boy': 'ولد',
    'children.girl': 'بنت',
    'children.years': 'سنوات',
    'children.level.petite': 'القسم الصغير',
    'children.level.moyenne': 'القسم المتوسط',
    'children.level.grande': 'القسم الكبير',
    'children.status.all': 'جميع الحالات',
    'children.status.pending': 'في الانتظار',
    'children.status.approved': 'موافق عليه',
    'children.status.rejected': 'مرفوض',

    // Appointments
    'appointments.title': 'إدارة المواعيد',
    'appointments.subtitle': 'جدولة وإدارة المواعيد مع الأولياء',
    'appointments.new': 'موعد جديد',
    'appointments.none': 'لا توجد مواعيد مجدولة',
    'appointments.none.subtitle': 'ابدأ بإنشاء موعدك الأول',
    'appointments.create': 'إنشاء موعد',

    // Settings
    'settings.title': 'الإعدادات',
    'settings.subtitle': 'تكوين إعدادات مدرستك',
    'settings.school': 'معلومات المدرسة',
    'settings.name': 'اسم المدرسة',
    'settings.address': 'العنوان',
    'settings.phone': 'الهاتف',
    'settings.notifications': 'إعدادات الإشعارات',
    'settings.email.notifications': 'إشعارات البريد الإلكتروني',
    'settings.new.registrations': 'التسجيلات الجديدة',
    'settings.appointment.reminders': 'تذكيرات المواعيد',
    'settings.save.changes': 'حفظ التغييرات',

    // Auth
    'auth.welcome': 'مرحبا',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.remember': 'تذكرني',
    'auth.forgot': 'نسيت كلمة المرور؟',
    'auth.signin': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.reset': 'إعادة تعيين كلمة المرور',

    // Notifications
    'notifications.none': 'لا توجد إشعارات',
    'notifications.attention': 'يتطلب انتباهك'
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
    const saved = localStorage.getItem('language');
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      this.currentLanguage = saved as Language;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('fr')) {
        this.currentLanguage = 'fr';
      } else if (browserLang.startsWith('ar')) {
        this.currentLanguage = 'ar';
      } else {
        this.currentLanguage = 'en';
      }
    }
    this.updateDocumentDirection();
  }

  private saveLanguage(): void {
    localStorage.setItem('language', this.currentLanguage);
  }

  private updateDocumentDirection(): void {
    const isRTL = this.isRTL();
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
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

  isRTL(): boolean {
    const config = LANGUAGES.find(lang => lang.code === this.currentLanguage);
    return config?.rtl || false;
  }

  translate(key: string, fallback?: string): string {
    const translations = TRANSLATIONS[this.currentLanguage];
    return translations?.[key] || fallback || key;
  }

  t(key: string, fallback?: string): string {
    return this.translate(key, fallback);
  }

  getLanguageConfig(language?: Language): LanguageConfig {
    const lang = language || this.currentLanguage;
    return LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
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

  // Formatting helpers
  formatDate(date: Date): string {
    return date.toLocaleDateString(this.getLocale());
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString(this.getLocale());
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString(this.getLocale());
  }

  formatNumber(number: number): string {
    return number.toLocaleString(this.getLocale());
  }

  formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat(this.getLocale(), {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private getLocale(): string {
    switch (this.currentLanguage) {
      case 'fr':
        return 'fr-FR';
      case 'en':
        return 'en-US';
      case 'ar':
        return 'ar-MA';
      default:
        return 'fr-FR';
    }
  }
}

export const languageService = LanguageService.getInstance();