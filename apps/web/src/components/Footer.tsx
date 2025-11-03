"use client";
import React, { useMemo, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Heart,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import "@/styles/hero-animations.css";

const getNavigation = (t: any) => ({
  solutions: [
    {
      nameKey: "landing.footer.solutions.freelancers",
      href: "/solutions/freelancers",
    },
    {
      nameKey: "landing.footer.solutions.business",
      href: "/solutions/business",
    },
    {
      nameKey: "landing.footer.solutions.agencies",
      href: "/solutions/agencies",
    },
    {
      nameKey: "landing.footer.solutions.developers",
      href: "/solutions/developers",
    },
  ],
  product: [
    { nameKey: "landing.footer.product.features", href: "#features" },
    { nameKey: "landing.footer.product.integrations", href: "/integrations" },
    { nameKey: "landing.footer.product.templates", href: "/templates" },
    { nameKey: "landing.footer.product.api", href: "/api" },
    { nameKey: "landing.footer.product.pricing", href: "#pricing" },
  ],
  resources: [
    { nameKey: "landing.footer.resources.documentation", href: "/docs" },
    { nameKey: "landing.footer.resources.helpCenter", href: "/help" },
    { nameKey: "landing.footer.resources.blog", href: "/blog" },
    { nameKey: "landing.footer.resources.community", href: "/community" },
    { nameKey: "landing.footer.resources.status", href: "/status" },
  ],
  company: [
    { nameKey: "landing.footer.company.about", href: "/about" },
    { nameKey: "landing.footer.company.careers", href: "/careers" },
    { nameKey: "landing.footer.company.contact", href: "/contact" },
    { nameKey: "landing.footer.company.privacy", href: "/privacy" },
    { nameKey: "landing.footer.company.terms", href: "/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:hello@flowin.com",
      icon: Mail,
    },
  ],
});

export default function Footer() {
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

  const navigation = useMemo(() => getNavigation(t), [t]);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  }, []);
  return (
    <footer
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-violet-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/5 to-pink-400/5 rounded-full blur-3xl" />
      </div>

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div
            className={cn(
              "space-y-8 transition-all duration-1000",
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            )}
          >
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Flowin
              </span>
            </Link>

            <p className="text-base leading-7 text-gray-600 dark:text-gray-300 max-w-md">
              {t("landing.footer.description")}
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-500 transition-all duration-300 hover:scale-110 hover:shadow-lg",
                      isVisible
                        ? "animate-fade-in-up"
                        : "opacity-0 translate-y-8"
                    )}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon
                      className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />

                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {item.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div
            className={cn(
              "mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 transition-all duration-1000",
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div
                className={cn(
                  "transition-all duration-1000",
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold leading-6 text-gray-900 dark:text-white uppercase tracking-wider">
                    {t("landing.footer.sections.solutions")}
                  </h3>
                </div>
                <ul role="list" className="space-y-3">
                  {navigation.solutions.map((item, index) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-sm leading-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={cn(
                  "mt-10 md:mt-0 transition-all duration-1000",
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: "0.7s" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <h3 className="text-sm font-bold leading-6 text-gray-900 dark:text-white uppercase tracking-wider">
                    {t("landing.footer.sections.product")}
                  </h3>
                </div>
                <ul role="list" className="space-y-3">
                  {navigation.product.map((item, index) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-sm leading-6 text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-all duration-200 hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div
                className={cn(
                  "transition-all duration-1000",
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-sm font-bold leading-6 text-gray-900 dark:text-white uppercase tracking-wider">
                    {t("landing.footer.sections.resources")}
                  </h3>
                </div>
                <ul role="list" className="space-y-3">
                  {navigation.resources.map((item, index) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-sm leading-6 text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200 hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={cn(
                  "mt-10 md:mt-0 transition-all duration-1000",
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: "0.9s" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  <h3 className="text-sm font-bold leading-6 text-gray-900 dark:text-white uppercase tracking-wider">
                    {t("landing.footer.sections.company")}
                  </h3>
                </div>
                <ul role="list" className="space-y-3">
                  {navigation.company.map((item, index) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-sm leading-6 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 transition-all duration-200 hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "mt-20 border-t  border-gray-700/50 pt-12 sm:mt-24 lg:mt-28 transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "1s" }}
        >
          <div className="xl:grid xl:grid-cols-3 xl:gap-12 items-center">
            <div className="xl:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">
                  {t("landing.footer.newsletter.title")}
                </h3>
              </div>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                {t("landing.footer.newsletter.description")}
              </p>
            </div>

            <div className="xl:col-span-2 mt-8 xl:mt-0">
              <form
                onSubmit={handleNewsletterSubmit}
                className="sm:flex sm:max-w-md xl:max-w-lg mx-auto xl:mx-0"
              >
                <label htmlFor="email-address" className="sr-only">
                  {t("landing.footer.newsletter.emailLabel")}
                </label>
                <div className="relative flex-1">
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full appearance-none rounded-lg border-0 bg-white dark:bg-gray-800 px-4 py-3 text-base text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 transition-all duration-200"
                    placeholder={t("landing.footer.newsletter.placeholder")}
                  />
                </div>
                <div className="mt-4 sm:mx-4 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
                  >
                    {t("landing.footer.newsletter.subscribe")}
                    <ArrowRight className="mx-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 ltr:rotate-0" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "mt-12 border-t border-gray-200/50 dark:border-gray-700/50 pt-8 md:flex md:items-center md:justify-between transition-all duration-1000",
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "1.2s" }}
        >
          <div className="flex flex-wrap gap-6 md:order-2">
            {[
              { key: "privacy", href: "/privacy" },
              { key: "terms", href: "/terms" },
              { key: "cookies", href: "/cookies" },
            ].map((item, index) => (
              <Link
                key={item.key}
                href={item.href}
                className="group text-sm leading-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:underline underline-offset-4"
              >
                {t(`landing.footer.legal.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className="mt-8 md:order-1 md:mt-0">
            <p className="flex items-center gap-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
              {t("landing.footer.copyright")}
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
