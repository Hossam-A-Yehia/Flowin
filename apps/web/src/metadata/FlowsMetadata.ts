import {
  PageMetadata,
  BASE_URL,
  commonMetadata,
  privateRobots,
} from "./config";

export const FlowsMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: "Flows - Flowin | Manage Your Automation Workflows",
    description:
      "View, manage, and monitor all your automation flows in one place. Create new workflows, track execution history, optimize your automations, and boost productivity with intelligent workflow management.",
    keywords: [
      "automation flows",
      "workflow management",
      "flow builder",
      "automation dashboard",
      "workflow automation",
      "no-code automation",
      "flow monitoring",
      "workflow execution",
      "automation analytics",
      "flow statistics",
      "workflow templates",
      "automation control",
      "flow optimization",
      "workflow tracking",
      "automation tools",
      "business process automation",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar_SA"],
      url: `${BASE_URL}/flows`,
      title: "Flowin Flows - Manage Your Automation Workflows",
      description:
        "Your central hub for managing automation workflows. Create, monitor, and optimize your flows with real-time analytics and execution tracking.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-flows.png",
          width: 1200,
          height: 630,
          alt: "Flowin Flows - Workflow Automation Management",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flowin Flows - Manage Your Automation Workflows",
      description:
        "Your central hub for managing automation workflows. Create, monitor, and optimize your flows.",
      images: ["/og-flows.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/flows`,
      languages: {
        "en-US": `${BASE_URL}/flows`,
        "ar-SA": `${BASE_URL}/ar/flows`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: "التدفقات - Flowin | إدارة تدفقات العمل التلقائية",
    description:
      "عرض وإدارة ومراقبة جميع تدفقات العمل التلقائية في مكان واحد. إنشاء تدفقات جديدة، تتبع سجل التنفيذ، تحسين التشغيل التلقائي، وزيادة الإنتاجية من خلال إدارة ذكية لتدفقات العمل.",
    keywords: [
      "تدفقات العمل",
      "إدارة التدفقات",
      "منشئ التدفقات",
      "لوحة تحكم التشغيل التلقائي",
      "تشغيل المهام تلقائيًا",
      "تشغيل بدون كود",
      "مراقبة التدفقات",
      "تنفيذ سير العمل",
      "تحليلات التشغيل التلقائي",
      "إحصائيات التدفقات",
      "قوالب سير العمل",
      "التحكم في التشغيل التلقائي",
      "تحسين التدفقات",
      "تتبع سير العمل",
      "أدوات التشغيل التلقائي",
      "تشغيل العمليات تلقائيًا",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      url: `${BASE_URL}/ar/flows`,
      title: "تدفقات Flowin - إدارة تدفقات العمل الآلية",
      description:
        "مركزك الرئيسي لإدارة تدفقات العمل الآلية. إنشاء ومراقبة وتحسين التدفقات مع التحليلات والتتبع الفوري.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-flows-ar.png",
          width: 1200,
          height: 630,
          alt: "تدفقات Flowin - إدارة تدفقات العمل الآلية",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "تدفقات Flowin - إدارة تدفقات العمل الآلية",
      description:
        "مركزك الرئيسي لإدارة تدفقات العمل الآلية. إنشاء ومراقبة وتحسين التدفقات.",
      images: ["/og-flows-ar.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/ar/flows`,
      languages: {
        "en-US": `${BASE_URL}/flows`,
        "ar-SA": `${BASE_URL}/ar/flows`,
      },
    },
  },
};
