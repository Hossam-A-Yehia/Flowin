"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div 
        className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
        aria-hidden="true"
      />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge 
            variant="secondary" 
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
            role="status"
            aria-label="Product category"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t('landing.hero.badge')}
          </Badge>

          <h1 
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            {t('landing.hero.title').split('flow').map((part, index) => 
              index === 0 ? (
                <span key={index}>{part}</span>
              ) : (
                <span key={index}>
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    flow
                  </span>
                  {part}
                </span>
              )
            )}
          </h1>

          <p 
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl"
            role="doc-subtitle"
          >
            {t('landing.hero.subtitle')}
          </p>

          <ul 
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400"
            role="list"
            aria-label="Key product benefits"
          >
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              <span>{t('landing.hero.benefits.noCoding')}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
              <span>{t('landing.hero.benefits.bilingual')}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-violet-500" aria-hidden="true" />
              <span>{t('landing.hero.benefits.aiPowered')}</span>
            </li>
          </ul>

          <div 
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            role="group"
            aria-label="Primary actions"
          >
            <Button 
              asChild 
              size="lg" 
              className="group"
            >
              <Link href="/auth/register">
                {t('landing.hero.cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
            >
              <Play className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('landing.hero.cta.secondary')}
            </Button>
          </div>

          <div className="mt-12 text-center" role="complementary" aria-label="Social proof">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('landing.hero.socialProof')}
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20" role="img" aria-label="Flow builder interface preview">
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:bg-gray-800/80">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t('landing.hero.preview.title')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('landing.hero.preview.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
