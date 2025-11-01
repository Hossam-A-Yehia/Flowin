import { PageMetadata, BASE_URL, commonMetadata, publicRobots } from './config';

export const verifyEmailMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: 'Verify Email - Flowin | Confirm Your Account',
    description: 'Verify your email address to activate your Flowin account and start automating your workflows. Quick and secure email verification process.',
    keywords: [
      'verify email',
      'email verification',
      'confirm email',
      'flowin verification',
      'account activation',
      'email confirmation',
      'verify account',
      'activate account',
      'email security',
      'account verification',
      'confirm account',
      'email validation'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      url: `${BASE_URL}/auth/verify-email`,
      title: 'Verify Email - Flowin | Activate Your Account',
      description: 'One step away from automating your workflows! Verify your email address to unlock the full power of Flowin.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-verify-email.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - Email Verification',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Verify Email - Flowin | Activate Your Account',
      description: 'One step away! Verify your email to start automating.',
      images: ['/og-verify-email.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/auth/verify-email`,
      languages: {
        'en-US': `${BASE_URL}/auth/verify-email`,
        'ar-SA': `${BASE_URL}/ar/auth/verify-email`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: 'تأكيد البريد الإلكتروني - Flowin | تفعيل حسابك',
    description: 'أكد عنوان بريدك الإلكتروني لتفعيل حسابك في Flowin وابدأ في ربط تطبيقاتك. عملية تأكيد سريعة وآمنة.',
    keywords: [
      'تأكيد البريد الإلكتروني',
      'التحقق من البريد',
      'تفعيل الحساب',
      'تأكيد الحساب',
      'التحقق من الحساب',
      'تأكيد البريد',
      'تفعيل البريد',
      'أمان البريد الإلكتروني'
    ],
    robots: publicRobots,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: ['en_US'],
      url: `${BASE_URL}/ar/auth/verify-email`,
      title: 'تأكيد البريد الإلكتروني - Flowin | تفعيل حسابك',
      description: 'خطوة واحدة فقط لربط تطبيقاتك! أكد بريدك الإلكتروني لفتح القوة الكاملة لـ Flowin.',
      siteName: 'Flowin',
      images: [
        {
          url: '/og-verify-email-ar.png',
          width: 1200,
          height: 630,
          alt: 'Flowin - تأكيد البريد الإلكتروني',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'تأكيد البريد الإلكتروني - Flowin | تفعيل حسابك',
      description: 'خطوة واحدة فقط! أكد بريدك لبدء ربط تطبيقاتك.',
      images: ['/og-verify-email-ar.png'],
      creator: '@flowinapp',
    },
    alternates: {
      canonical: `${BASE_URL}/ar/auth/verify-email`,
      languages: {
        'en-US': `${BASE_URL}/auth/verify-email`,
        'ar-SA': `${BASE_URL}/ar/auth/verify-email`,
      },
    },
  },
};
