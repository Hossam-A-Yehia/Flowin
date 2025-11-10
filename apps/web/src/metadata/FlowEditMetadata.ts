import {
  PageMetadata,
  BASE_URL,
  commonMetadata,
  privateRobots,
} from "./config";

export const FlowEditMetadata: PageMetadata = {
  en: {
    ...commonMetadata,
    title: "Edit Flow - Flowin | Modify Your Automation Workflow",
    description:
      "Edit and optimize your automation workflow with our intuitive visual editor. Update nodes, modify connections, and refine your automation logic. Real-time validation and performance optimization.",
    keywords: [
      "edit flow",
      "modify workflow",
      "update automation",
      "workflow editor",
      "flow modification",
      "automation editing",
      "workflow optimization",
      "flow refinement",
      "automation updates",
      "workflow changes",
      "flow versioning",
      "automation management",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar_SA"],
      url: `${BASE_URL}/flows/[id]`,
      title: "Edit Flow - Flowin | Modify Your Automation Workflow",
      description:
        "Edit and optimize your automation workflow with our intuitive visual editor. Update nodes, modify connections, and refine your automation logic.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-flow-edit.png",
          width: 1200,
          height: 630,
          alt: "Flowin Flow Editor - Modify Your Automation Workflow",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Edit Flow - Flowin | Modify Your Automation Workflow",
      description:
        "Edit and optimize your automation workflow with our intuitive visual editor. Update nodes, modify connections, and refine your automation logic.",
      images: ["/og-flow-edit.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/flows/[id]`,
      languages: {
        "en-US": `${BASE_URL}/flows/[id]`,
        "ar-SA": `${BASE_URL}/ar/flows/[id]`,
      },
    },
  },
  ar: {
    ...commonMetadata,
    title: "تحرير التدفق - Flowin | تعديل سير العمل التلقائي",
    description:
      "حرر وحسّن سير العمل التلقائي باستخدام محررنا المرئي البديهي. حدّث العقد، عدّل الاتصالات، وحسّن منطق التشغيل التلقائي. التحقق الفوري وتحسين الأداء.",
    keywords: [
      "تحرير التدفق",
      "تعديل سير العمل",
      "تحديث التشغيل التلقائي",
      "محرر سير العمل",
      "تعديل التدفق",
      "تحرير التشغيل التلقائي",
      "تحسين سير العمل",
      "تحسين التدفق",
      "تحديثات التشغيل التلقائي",
      "تغييرات سير العمل",
      "إصدارات التدفق",
      "إدارة التشغيل التلقائي",
    ],
    robots: privateRobots,
    openGraph: {
      type: "website",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      url: `${BASE_URL}/ar/flows/[id]`,
      title: "تحرير التدفق - Flowin | تعديل سير العمل التلقائي",
      description:
        "حرر وحسّن سير العمل التلقائي باستخدام محررنا المرئي البديهي. حدّث العقد، عدّل الاتصالات، وحسّن منطق التشغيل التلقائي.",
      siteName: "Flowin",
      images: [
        {
          url: "/og-flow-edit-ar.png",
          width: 1200,
          height: 630,
          alt: "محرر التدفق Flowin - تعديل سير العمل التلقائي",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "تحرير التدفق - Flowin | تعديل سير العمل التلقائي",
      description:
        "حرر وحسّن سير العمل التلقائي باستخدام محررنا المرئي البديهي. حدّث العقد، عدّل الاتصالات، وحسّن منطق التشغيل التلقائي.",
      images: ["/og-flow-edit-ar.png"],
      creator: "@flowinapp",
    },
    alternates: {
      canonical: `${BASE_URL}/ar/flows/[id]`,
      languages: {
        "en-US": `${BASE_URL}/flows/[id]`,
        "ar-SA": `${BASE_URL}/ar/flows/[id]`,
      },
    },
  },
};
