import { PageMetadata, BASE_URL, commonMetadata, publicRobots } from './config';

export const forgotPasswordMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Forgot Password - Flowin | Reset Your Account Password',
    description: 'Reset your Flowin account password securely. Enter your email to receive a password reset link. Quick and secure password recovery with enterprise-grade security.',
    keywords: [
      'forgot password',
      'reset password',
      'password recovery',
      'flowin password reset',
      'account recovery',
      'password help',
      'secure password reset',
      'email verification',
      'account access',
      'password assistance',
      'recover account',
      'reset link'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/auth/forgot-password`,
      title: 'Forgot Password - Flowin | Secure Password Recovery',
      description: 'Reset your password securely and get back to automating your workflows. We\'ll send you a secure reset link to your email address.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-forgot-password.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - Forgot Password Recovery',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Forgot Password - Flowin | Secure Password Recovery',
      description: 'Reset your password securely and get back to automating your workflows.',
      images: ['/og-forgot-password.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/auth/forgot-password`,
      languages: {
        'en-US': `${BASE_URL}/auth/forgot-password`,
        'ar-SA': `${BASE_URL}/ar/auth/forgot-password`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'نسيت كلمة المرور - Flowin | استعادة كلمة المرور',
    description: 'استعد كلمة مرور حسابك في Flowin بشكل آمن. أدخل بريدك الإلكتروني لتلقي رابط استعادة كلمة المرور. استعادة سريعة وآمنة مع أمان على مستوى المؤسسات.',
    keywords: [
      'نسيت كلمة المرور',
      'استعادة كلمة المرور',
      'إعادة تعيين كلمة المرور',
      'استعادة الحساب',
      'مساعدة كلمة المرور',
      'استعادة آمنة',
      'التحقق من البريد',
      'الوصول للحساب',
      'رابط الاستعادة'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/auth/forgot-password`,
      title: 'نسيت كلمة المرور - Flowin | استعادة آمنة',
      description: 'استعد كلمة مرورك بشكل آمن وعد لربط تطبيقاتك. سنرسل لك رابط استعادة آمن إلى بريدك الإلكتروني.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-forgot-password-ar.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - استعادة كلمة المرور',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'نسيت كلمة المرور - Flowin | استعادة آمنة',
      description: 'استعد كلمة مرورك بشكل آمن وعد لربط تطبيقاتك.',
      images: ['/og-forgot-password-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/auth/forgot-password`,
      languages: {
        'en-US': `${BASE_URL}/auth/forgot-password`,
        'ar-SA': `${BASE_URL}/ar/auth/forgot-password`,
      },
    },
  },
};
