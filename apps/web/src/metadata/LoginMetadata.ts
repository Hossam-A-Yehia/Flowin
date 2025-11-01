import { PageMetadata, BASE_URL, commonMetadata, publicRobots } from './config';
export const loginMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Sign In - Flowin | Access Your Automation Dashboard',
    description: 'Sign in to your Flowin account to manage your workflows, connect apps, and automate tasks. Access your automation dashboard with enterprise-grade security and AI-powered suggestions.',
    keywords: [
      'flowin login',
      'workflow automation login',
      'automation dashboard',
      'sign in',
      'workflow management',
      'automation platform login',
      'business automation access',
      'secure login',
      'workflow builder access',
      'app integration dashboard',
      'automation control panel',
      'productivity platform login'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/auth/login`,
      title: 'Sign In to Flowin - Access Your Automation Dashboard',
      description: 'Welcome back! Sign in to continue building powerful automations that save you hours every day. Manage workflows, connect apps, and boost productivity.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-login.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - Sign In to Your Automation Dashboard',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sign In to Flowin - Access Your Automation Dashboard',
      description: 'Welcome back! Continue building powerful automations that save you hours every day.',
      images: ['/og-login.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/auth/login`,
      languages: {
        'en-US': `${BASE_URL}/auth/login`,
        'ar-SA': `${BASE_URL}/ar/auth/login`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'تسجيل الدخول - Flowin | الوصول إلى لوحة التحكم',
    description: 'سجل الدخول إلى حسابك في Flowin لإدارة سير عملك، وربط التطبيقات، وتشغيلها تلقائياً. الوصول إلى لوحة التحكم مع أمان على مستوى المؤسسات واقتراحات مدعومة بالذكاء الاصطناعي.',
    keywords: [
      'تسجيل دخول flowin',
      'تسجيل دخول ربط التطبيقات',
      'لوحة التحكم',
      'تسجيل الدخول',
      'إدارة سير العمل',
      'الوصول للمنصة',
      'تسجيل دخول آمن',
      'لوحة تحكم الإنتاجية'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/auth/login`,
      title: 'تسجيل الدخول إلى Flowin - الوصول إلى لوحة التحكم',
      description: 'مرحباً بعودتك! سجل الدخول لمواصلة بناء سير عمل ذكي يوفر لك ساعات كل يوم. إدارة التطبيقات وزيادة الإنتاجية.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-login-ar.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - تسجيل الدخول إلى لوحة التحكم',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'تسجيل الدخول إلى Flowin - الوصول إلى لوحة التحكم',
      description: 'مرحباً بعودتك! واصل بناء سير عمل ذكي يوفر لك ساعات كل يوم.',
      images: ['/og-login-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/auth/login`,
      languages: {
        'en-US': `${BASE_URL}/auth/login`,
        'ar-SA': `${BASE_URL}/ar/auth/login`,
      },
    },
  },
};
