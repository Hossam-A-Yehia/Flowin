"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CTA() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 py-24">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("landing.cta.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">
            {t("landing.cta.subtitle")}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">5,000+</span>
              <span className="text-sm text-blue-100">
                {t("landing.cta.stats.users")}
              </span>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">50,000+</span>
              <span className="text-sm text-blue-100">
                {t("landing.cta.stats.automations")}
              </span>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">100+</span>
              <span className="text-sm text-blue-100">
                {t("landing.cta.stats.integrations")}
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 group"
            >
              <Link href="/auth/register">
                {t("landing.cta.primary")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/contact">{t("landing.cta.secondary")}</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
            <li className="flex items-center gap-2 text-blue-100">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>{t("landing.cta.trial")}</span>
            </li>
            <li className="flex items-center gap-2 text-blue-100">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>{t("landing.cta.noCard")}</span>
            </li>
            <li className="flex items-center gap-2 text-blue-100">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>{t("landing.cta.cancel")}</span>
            </li>
            <li className="flex items-center gap-2 text-blue-100">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>{t("landing.cta.setup")}</span>
            </li>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-blue-100">
            {t("landing.cta.help")}{" "}
            <Link
              href="/contact"
              className="font-semibold text-white hover:text-blue-100 underline"
            >
              {t("landing.cta.getInTouch")}
            </Link>{" "}
            {t("landing.cta.or")}{" "}
            <Link
              href="/docs"
              className="font-semibold text-white hover:text-blue-100 underline"
            >
              {t("landing.cta.documentation")}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
