"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  MessageSquare,
  Globe,
  Blocks,
  Brain,
  DollarSign,
  Smartphone,
  Shield,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: MessageSquare,
      titleKey: "landing.features.arabicFirst.title",
      descriptionKey: "landing.features.arabicFirst.description",
      badgeKey: "landing.features.arabicFirst.badge",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Blocks,
      titleKey: "landing.features.noCode.title",
      descriptionKey: "landing.features.noCode.description",
      badgeKey: "landing.features.noCode.badge",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Brain,
      titleKey: "landing.features.aiAssistant.title",
      descriptionKey: "landing.features.aiAssistant.description",
      badgeKey: "landing.features.aiAssistant.badge",
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: Zap,
      titleKey: "landing.features.integrations.title",
      descriptionKey: "landing.features.integrations.description",
      badgeKey: "landing.features.integrations.badge",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: DollarSign,
      titleKey: "landing.features.pricing.title",
      descriptionKey: "landing.features.pricing.description",
      badgeKey: "landing.features.pricing.badge",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Globe,
      titleKey: "landing.features.bilingual.title",
      descriptionKey: "landing.features.bilingual.description",
      badgeKey: "landing.features.bilingual.badge",
      color: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  const additionalFeatures = [
    {
      icon: Smartphone,
      titleKey: "landing.features.additional.mobile.title",
      descriptionKey: "landing.features.additional.mobile.description",
    },
    {
      icon: Shield,
      titleKey: "landing.features.additional.security.title",
      descriptionKey: "landing.features.additional.security.description",
    },
    {
      icon: Clock,
      titleKey: "landing.features.additional.monitoring.title",
      descriptionKey: "landing.features.additional.monitoring.description",
    },
  ];

  return (
    <section
      className="py-24 bg-white dark:bg-gray-900"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {t("landing.features.title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("landing.features.subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 ${feature.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {t(feature.badgeKey)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t(feature.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-12">
            {t("landing.features.additional.title")}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/20 dark:to-violet-900/20">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t(feature.titleKey)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("landing.features.valueProposition.title")}
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {t("landing.features.valueProposition.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              {t("landing.features.valueProposition.setup")}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              {t("landing.features.valueProposition.support")}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              {t("landing.features.valueProposition.ai")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
