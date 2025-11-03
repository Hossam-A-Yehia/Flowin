"use client";
import React, { useMemo, useRef, useEffect } from "react";
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
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import "@/styles/hero-animations.css";

export default function Features() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = useMemo(
    () => [
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
    ],
    [t]
  );

  const additionalFeatures = useMemo(
    () => [
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
    ],
    [t]
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
        >
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              {t("landing.features.title")}
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("landing.features.subtitle")}
          </p>
        </div>

        <div
          className={cn(
            "mx-auto mt-20 max-w-6xl transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={cn(
                    "group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2",
                    isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                  )}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:from-blue-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div
                          className={cn(
                            "inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300",
                            feature.color
                          )}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform duration-200"
                      >
                        {t(feature.badgeKey)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {t(feature.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </CardDescription>

                    <div className="flex items-center mt-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                      <span className="text-sm font-medium mr-2">
                        Learn more
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-24 max-w-5xl transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("landing.features.additional.title")}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "group text-center transition-all duration-500 hover:scale-105",
                    isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                  )}
                  style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                >
                  <div className="relative mx-auto mb-6">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-violet-100 to-purple-100 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-purple-900/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div
                      className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {t(feature.titleKey)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                    {t(feature.descriptionKey)}
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-24 max-w-5xl transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "1.4s" }}
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-violet-900/20 p-12 text-center overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-violet-400/10 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl mb-6 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {t("landing.features.valueProposition.title")}
                </span>
              </h3>

              <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("landing.features.valueProposition.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {t("landing.features.valueProposition.setup")}
                  </span>
                </div>

                <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {t("landing.features.valueProposition.support")}
                  </span>
                </div>

                <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {t("landing.features.valueProposition.ai")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
