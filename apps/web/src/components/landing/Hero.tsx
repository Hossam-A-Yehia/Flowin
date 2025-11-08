"use client";

import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Globe,
  Code2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import "@/styles/hero-animations.css";

export default function Hero() {
  const { t } = useTranslation();

  const benefitItems = useMemo(
    () => [
      {
        icon: Code2,
        text: t("landing.hero.benefits.noCoding"),
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
      },
      {
        icon: Globe,
        text: t("landing.hero.benefits.bilingual"),
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
      },
      {
        icon: Zap,
        text: t("landing.hero.benefits.aiPowered"),
        color: "from-violet-500 to-purple-500",
        bgColor: "bg-violet-50 dark:bg-violet-900/20",
      },
    ],
    [t]
  );

  const handleDemoClick = useCallback(() => {
    console.log("Demo clicked");
  }, []);
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <Badge
            variant="secondary"
            className="mb-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            role="status"
            aria-label="Product category"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" aria-hidden="true" />
            </div>
            {t("landing.hero.badge")}
          </Badge>
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl leading-tight"
          >
            <span className="block">
              {t("landing.hero.title")
                .split("flow")
                .map((part, index) =>
                  index === 0 ? (
                    <span
                      key={index}
                      className="inline-block animate-fade-in-up"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={index} className="inline-block">
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                          flow
                        </span>
                        <span
                          className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 blur-lg -z-10 animate-pulse"
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                      >
                        {part}
                      </span>
                    </span>
                  )
                )}
            </span>
          </h1>

          <p
            className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
            role="doc-subtitle"
          >
            {t("landing.hero.subtitle")}
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
            role="list"
            aria-label="Key product benefits"
          >
            {benefitItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  role="listitem"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    item.bgColor,
                    "border border-white/20 dark:border-gray-700/50 backdrop-blur-sm"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r",
                      item.color
                    )}
                  >
                    <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
            role="group"
            aria-label="Primary actions"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-base font-semibold"
            >
              <Link href="/auth/register">
                <span className="relative z-10 flex items-center">
                  {t("landing.hero.cta.primary")}
                  <ArrowRight
                    className="mx-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 ltr:rotate-0"
                    aria-hidden="true"
                  />
                </span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg px-8 py-4 text-base font-semibold"
              onClick={handleDemoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <Play
                  className="h-4 w-4 text-white ml-0.5"
                  aria-hidden="true"
                />
              </div>
              {t("landing.hero.cta.secondary")}
            </Button>
          </div>

          <div
            className="mt-12 text-center animate-fade-in-up"
            style={{ animationDelay: "1s" }}
            role="complementary"
            aria-label="Social proof"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t("landing.hero.socialProof")}
            </p>
          </div>
        </div>

        <div
          className="mt-20 sm:mt-24 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
          role="img"
          aria-label="Flow builder interface preview"
        >
          <div className="relative mx-auto max-w-6xl">
            <div
              className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-violet-400/20 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-2xl"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl bg-white/90 dark:bg-gray-800/90 p-8 shadow-2xl backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500 group">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-700 dark:via-slate-700 dark:to-gray-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                  <div className="absolute top-8 right-8 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                  <div
                    className="absolute bottom-6 left-8 w-4 h-4 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute bottom-4 right-4 w-3 h-3 bg-pink-500 rounded-full animate-ping"
                    style={{ animationDelay: "2s" }}
                  />
                </div>

                <div className="text-center relative z-10">
                  <div className="relative mb-6">
                    <div
                      className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <Sparkles className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl blur-lg animate-pulse"
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t("landing.hero.preview.title")}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {t("landing.hero.preview.subtitle")}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-green-700 dark:text-green-300">
                        Visual Builder
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                        AI Powered
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
                        No Code
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
