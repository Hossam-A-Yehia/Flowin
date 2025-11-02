import { PageMetadata, BASE_URL, commonMetadata, publicRobots } from './config';

export const resetPasswordMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Reset Password - Flowin | Create New Password',
    description: 'Create a new secure password for your Flowin account. Complete your password reset and regain access to your automation dashboard with enterprise-grade security.',
    keywords: [
      'reset password',
      'new password',
      'password reset',
      'flowin password',
      'secure password',
      'account security',
      'password update',
      'create password',
      'password change',
      'account access',
      'secure reset'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/auth/reset-password`,
      title: 'Reset Password - Flowin | Create New Secure Password',
      description: 'Almost there! Create a new secure password and get back to building powerful automations that save you hours every day.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-reset-password.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - Reset Password',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Reset Password - Flowin | Create New Secure Password',
      description: 'Almost there! Create a new secure password and get back to automating.',
      images: ['/og-reset-password.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/auth/reset-password`,
      languages: {
        'en-US': `${BASE_URL}/auth/reset-password`,
        'ar-SA': `${BASE_URL}/ar/auth/reset-password`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'إعادة تعيين كلمة المرور - Flowin | إنشاء كلمة مرور جديدة',
    description: 'أنشئ كلمة مرور آمنة جديدة لحسابك في Flowin. أكمل إعادة تعيين كلمة المرور واستعد الوصول إلى لوحة التحكم مع أمان على مستوى المؤسسات.',
    keywords: [
      'إعادة تعيين كلمة المرور',
      'كلمة مرور جديدة',
      'تغيير كلمة المرور',
      'كلمة مرور آمنة',
      'أمان الحساب',
      'تحديث كلمة المرور',
      'إنشاء كلمة مرور',
      'الوصول للحساب',
      'إعادة تعيين آمنة'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/auth/reset-password`,
      title: 'إعادة تعيين كلمة المرور - Flowin | كلمة مرور آمنة جديدة',
      description: 'أوشكت على الانتهاء! أنشئ كلمة مرور آمنة جديدة وعد لبناء سير عمل ذكي يوفر لك ساعات كل يوم.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-reset-password-ar.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - إعادة تعيين كلمة المرور',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'إعادة تعيين كلمة المرور - Flowin | كلمة مرور آمنة جديدة',
      description: 'أوشكت على الانتهاء! أنشئ كلمة مرور آمنة جديدة وعد لربط تطبيقاتك.',
      images: ['/og-reset-password-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/auth/reset-password`,
      languages: {
        'en-US': `${BASE_URL}/auth/reset-password`,
        'ar-SA': `${BASE_URL}/ar/auth/reset-password`,
      },
    },
  },
};
