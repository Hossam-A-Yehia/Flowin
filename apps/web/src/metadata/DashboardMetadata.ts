import { PageMetadata, BASE_URL, commonMetadata, privateRobots } from './config';
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
