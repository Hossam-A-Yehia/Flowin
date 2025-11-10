import {
  PageMetadata,
  BASE_URL,
  commonMetadata,
  privateRobots,
} from "./config";

export const IntegrationsMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: "Integrations - Flowin | Connect Your Favorite Apps",
    description:
      "Connect and manage your favorite apps and services with Flowin. Seamlessly integrate Google Sheets, Gmail, WhatsApp, Notion, Shopify, and more. Secure OAuth authentication and easy setup.",
    keywords: [
      "app integrations",
      "connect apps",
      "integration management",
      "oauth authentication",
      "google sheets integration",
      "gmail integration",
      "whatsapp business api",
      "notion integration",
      "shopify integration",
      "api connections",
      "workflow integrations",
      "automation connectors",
      "third-party apps",
      "app marketplace",
      "integration hub",
      "connected services",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar_SA"],
      url: `${BASE_URL}/integrations`,
      title: "Flowin Integrations - Connect Your Favorite Apps",
      description:
        "Connect and manage all your favorite apps in one place. Secure OAuth authentication, easy setup, and seamless integration with Google Sheets, Gmail, WhatsApp, Notion, and more.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-integrations.png",
          width: 1200,
          height: 630,
          alt: "Flowin Integrations - Connect Your Apps",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flowin Integrations - Connect Your Favorite Apps",
      description:
        "Connect and manage all your favorite apps in one place. Secure OAuth authentication and easy setup.",
      images: ["/og-integrations.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/integrations`,
      languages: {
        "en-US": `${BASE_URL}/integrations`,
        "ar-SA": `${BASE_URL}/ar/integrations`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: "التكاملات - Flowin | اربط تطبيقاتك المفضلة",
    description:
      "اربط وأدر تطبيقاتك وخدماتك المفضلة مع Flowin. تكامل سلس مع جداول Google، Gmail، WhatsApp، Notion، Shopify، والمزيد. مصادقة OAuth آمنة وإعداد سهل.",
    keywords: [
      "تكاملات التطبيقات",
      "ربط التطبيقات",
      "إدارة التكاملات",
      "مصادقة OAuth",
      "تكامل جداول Google",
      "تكامل Gmail",
      "واجهة WhatsApp Business",
      "تكامل Notion",
      "تكامل Shopify",
      "اتصالات API",
      "تكاملات سير العمل",
      "موصلات التشغيل التلقائي",
      "تطبيقات الطرف الثالث",
      "سوق التطبيقات",
      "مركز التكامل",
      "الخدمات المتصلة",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      url: `${BASE_URL}/ar/integrations`,
      title: "تكاملات Flowin - اربط تطبيقاتك المفضلة",
      description:
        "اربط وأدر جميع تطبيقاتك المفضلة في مكان واحد. مصادقة OAuth آمنة، إعداد سهل، وتكامل سلس مع جداول Google، Gmail، WhatsApp، Notion، والمزيد.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-integrations-ar.png",
          width: 1200,
          height: 630,
          alt: "تكاملات Flowin - اربط تطبيقاتك",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "تكاملات Flowin - اربط تطبيقاتك المفضلة",
      description:
        "اربط وأدر جميع تطبيقاتك المفضلة في مكان واحد. مصادقة OAuth آمنة وإعداد سهل.",
      images: ["/og-integrations-ar.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/ar/integrations`,
      languages: {
        "en-US": `${BASE_URL}/integrations`,
        "ar-SA": `${BASE_URL}/ar/integrations`,
      },
    },
  },
};
