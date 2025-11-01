import { Metadata } from 'next';

interface PageMetadata {
  en: Metadata;
  ar: Metadata;
}

// Base URL for the application
const BASE_URL = 'http://localhost:3000';

// Common metadata shared across pages
const commonMetadata = {
  authors: [{ name: 'Flowin' }],
  creator: 'Flowin',
  publisher: 'Flowin',
  category: 'Technology' as const,
};

// Common robots configuration for public pages
const publicRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
};

// Common robots configuration for private pages
const privateRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

/**
 * Register Page Metadata
 */
export const registerMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Create Account - Flowin | Start Automating Your Workflows',
    description: 'Join Flowin and start automating your workflows in minutes. Connect your favorite apps like Google Sheets, WhatsApp, Notion, and Shopify without writing code. Free account with no credit card required.',
    keywords: [
      'workflow automation',
      'no-code automation',
      'app integration',
      'business automation',
      'productivity tools',
      'zapier alternative',
      'workflow builder',
      'automation platform',
      'connect apps',
      'automate tasks',
      'Google Sheets automation',
      'WhatsApp automation',
      'Notion integration',
      'Shopify automation',
      'free automation tool',
      'Arabic automation platform'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/auth/register`,
      title: 'Create Your Free Flowin Account - Start Automating Today',
      description: 'Join thousands of professionals who save hours every day with intelligent workflow automation. Connect apps, automate tasks, and boost productivity without coding.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-register.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - Workflow Automation Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Create Your Free Flowin Account - Start Automating Today',
      description: 'Join thousands of professionals who save hours every day with intelligent workflow automation. No coding required.',
      images: ['/og-register.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/auth/register`,
      languages: {
        'en-US': `${BASE_URL}/auth/register`,
        'ar-SA': `${BASE_URL}/ar/auth/register`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'إنشاء حساب - Flowin | ابدأ في ربط تطبيقاتك',
    description: 'انضم إلى Flowin وابدأ في ربط تطبيقاتك وتشغيلها تلقائياً في دقائق. اربط تطبيقاتك المفضلة مثل Google Sheets وWhatsApp وNotion وShopify بدون برمجة. حساب مجاني بدون بطاقة ائتمان.',
    keywords: [
      'ربط التطبيقات',
      'تشغيل تلقائي',
      'ربط الأدوات',
      'أتمتة الأعمال',
      'أدوات الإنتاجية',
      'بديل زابير',
      'منصة ربط التطبيقات',
      'بدون برمجة',
      'ربط جوجل شيتس',
      'ربط واتساب',
      'ربط نوشن',
      'ربط شوبيفاي',
      'أداة مجانية',
      'منصة عربية'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/auth/register`,
      title: 'أنشئ حسابك المجاني في Flowin - ابدأ اليوم',
      description: 'انضم إلى آلاف المحترفين الذين يوفرون ساعات كل يوم بربط تطبيقاتهم وتشغيلها تلقائياً. بدون برمجة.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-register-ar.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - منصة ربط التطبيقات',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'أنشئ حسابك المجاني في Flowin - ابدأ اليوم',
      description: 'انضم إلى آلاف المحترفين الذين يوفرون ساعات كل يوم بربط تطبيقاتهم. بدون برمجة.',
      images: ['/og-register-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/auth/register`,
      languages: {
        'en-US': `${BASE_URL}/auth/register`,
        'ar-SA': `${BASE_URL}/ar/auth/register`,
      },
    },
  },
};

/**
 * Login Page Metadata
 */
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

/**
 * Dashboard Page Metadata
 */
export const dashboardMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Dashboard - Flowin | Manage Your Workflows & Automations',
    description: 'Access your Flowin dashboard to create, manage, and monitor your workflow automations. View execution logs, connect integrations, browse templates, and track your productivity gains in real-time.',
    keywords: [
      'workflow dashboard',
      'automation dashboard',
      'workflow management',
      'automation control panel',
      'flow builder',
      'integration management',
      'workflow monitoring',
      'automation analytics',
      'execution logs',
      'workflow templates',
      'productivity dashboard',
      'business automation tools',
      'app integration dashboard',
      'workflow execution',
      'automation statistics',
      'real-time monitoring'
    ],
    robots: privateRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/dashboard`,
      title: 'Flowin Dashboard - Manage Your Workflow Automations',
      description: 'Your central hub for creating, managing, and monitoring workflow automations. Connect apps, build flows, and track your productivity gains.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-dashboard.png',
          width: 1200,
          height: 630,
          alt: 'Flowin Dashboard - Workflow Automation Control Center',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Flowin Dashboard - Manage Your Workflow Automations',
      description: 'Your central hub for creating, managing, and monitoring workflow automations.',
      images: ['/og-dashboard.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/dashboard`,
      languages: {
        'en-US': `${BASE_URL}/dashboard`,
        'ar-SA': `${BASE_URL}/ar/dashboard`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'لوحة التحكم - Flowin | إدارة التطبيقات وسير العمل',
    description: 'الوصول إلى لوحة التحكم في Flowin لإنشاء وإدارة ومراقبة ربط تطبيقاتك. عرض سجلات التنفيذ، وربط التطبيقات، وتصفح القوالب، وتتبع مكاسب إنتاجيتك في الوقت الفعلي.',
    keywords: [
      'لوحة التحكم',
      'إدارة سير العمل',
      'لوحة تحكم الربط',
      'إدارة التطبيقات',
      'مراقبة سير العمل',
      'تحليلات الأداء',
      'سجلات التنفيذ',
      'قوالب سير العمل',
      'لوحة الإنتاجية',
      'أدوات الأعمال',
      'إحصائيات الأداء',
      'مراقبة فورية'
    ],
    robots: privateRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/dashboard`,
      title: 'لوحة التحكم Flowin - إدارة ربط التطبيقات',
      description: 'مركزك الرئيسي لإنشاء وإدارة ومراقبة ربط التطبيقات. اربط التطبيقات وتتبع مكاسب إنتاجيتك.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-dashboard-ar.png',
          width: 1200,
          height: 630,
          alt: 'لوحة التحكم Flowin - مركز التحكم في ربط التطبيقات',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'لوحة التحكم Flowin - إدارة ربط التطبيقات',
      description: 'مركزك الرئيسي لإنشاء وإدارة ومراقبة ربط التطبيقات.',
      images: ['/og-dashboard-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/dashboard`,
      languages: {
        'en-US': `${BASE_URL}/dashboard`,
        'ar-SA': `${BASE_URL}/ar/dashboard`,
      },
    },
  },
};

/**
 * Helper function to get metadata based on locale
 */
export function getPageMetadata(
  page: 'register' | 'login' | 'dashboard',
  locale: 'en' | 'ar' = 'en'
): Metadata {
  const metadataMap = {
    register: registerMetadata,
    login: loginMetadata,
    dashboard: dashboardMetadata,
  };

  return metadataMap[page][locale];
}
