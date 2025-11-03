"use client";
import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  CheckCircle2,
  Star,
  Rocket,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import "@/styles/hero-animations.css";

export default function CTA() {
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

  const stats = useMemo(
    () => [
      {
        icon: Users,
        value: "5,000+",
        labelKey: "landing.cta.stats.users",
        color: "from-blue-400 to-cyan-400",
      },
      {
        icon: Zap,
        value: "50,000+",
        labelKey: "landing.cta.stats.automations",
        color: "from-violet-400 to-purple-400",
      },
      {
        icon: Sparkles,
        value: "100+",
        labelKey: "landing.cta.stats.integrations",
        color: "from-pink-400 to-rose-400",
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      { textKey: "landing.cta.trial", icon: CheckCircle2 },
      { textKey: "landing.cta.noCard", icon: CheckCircle2 },
      { textKey: "landing.cta.cancel", icon: CheckCircle2 },
      { textKey: "landing.cta.setup", icon: CheckCircle2 },
    ],
    []
  );

  const handlePrimaryClick = useCallback(() => {
    // Add analytics tracking here if needed
  }, []);

  const handleSecondaryClick = useCallback(() => {
    // Add analytics tracking here if needed
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-white/40 rounded-full animate-ping" />
        <div
          className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-violet-200/40 rounded-full animate-bounce"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto max-w-5xl text-center transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl">
            <Rocket className="h-10 w-10 text-white animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl leading-tight">
            <span className="block">{t("landing.cta.title")}</span>
          </h2>
          <p className="mt-8 text-xl leading-8 text-blue-100 sm:text-2xl max-w-3xl mx-auto">
            {t("landing.cta.subtitle")}
          </p>

          <div
            className={cn(
              "mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 transition-all duration-1000",
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "group text-center transition-all duration-500 hover:scale-110",
                    isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                  )}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="relative mx-auto mb-6">
                    <div
                      className={cn(
                        "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r shadow-2xl group-hover:scale-110 transition-transform duration-300",
                        stat.color
                      )}
                    >
                      <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -inset-2 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-blue-100 font-medium">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              "mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row transition-all duration-1000",
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
              onClick={handlePrimaryClick}
            >
              <Link href="/auth/register">
                <span className="relative z-10 flex items-center">
                  <Rocket className="mx-3 h-5 w-5 transition-transform group-hover:scale-110" />
                  {t("landing.cta.primary")}
                  <ArrowRight className="mx-3 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 ltr:rotate-0" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-lg px-8 py-4 text-lg font-semibold"
              onClick={handleSecondaryClick}
            >
              <Link href="/contact" className="flex items-center">
                <Globe className="mx-3 h-5 w-5 transition-transform group-hover:scale-110" />
                {t("landing.cta.secondary")}
              </Link>
            </Button>
          </div>

          <div
            className={cn(
              "mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000",
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "1s" }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105",
                    isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                  )}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <Icon className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100 font-medium text-sm">
                    {t(feature.textKey)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "mt-16 text-center transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "1.6s" }}
        >
          <div className="inline-flex items-center gap-2 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
            <Star className="h-5 w-5 text-yellow-300" />
            <p className="text-blue-100 text-lg">
              {t("landing.cta.help")}{" "}
              <Link
                href="/contact"
                className="font-semibold text-white hover:text-yellow-200 underline decoration-2 underline-offset-4 transition-colors duration-200"
              >
                {t("landing.cta.getInTouch")}
              </Link>{" "}
              {t("landing.cta.or")}{" "}
              <Link
                href="/docs"
                className="font-semibold text-white hover:text-yellow-200 underline decoration-2 underline-offset-4 transition-colors duration-200"
              >
                {t("landing.cta.documentation")}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
