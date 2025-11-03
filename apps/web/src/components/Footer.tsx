
"use client";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const getNavigation = (t: any) => ({
  solutions: [
    { nameKey: "landing.footer.solutions.freelancers", href: "/solutions/freelancers" },
    { nameKey: "landing.footer.solutions.business", href: "/solutions/business" },
    { nameKey: "landing.footer.solutions.agencies", href: "/solutions/agencies" },
    { nameKey: "landing.footer.solutions.developers", href: "/solutions/developers" },
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
  const navigation = getNavigation(t);
  return (
    <footer className="bg-white dark:bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Flowin
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {t('landing.footer.description')}
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {t('landing.footer.sections.solutions')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {t('landing.footer.sections.product')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {t('landing.footer.sections.resources')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {t('landing.footer.sections.company')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 dark:border-gray-700 pt-8 sm:mt-20 lg:mt-24">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                {t('landing.footer.newsletter.title')}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {t('landing.footer.newsletter.description')}
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md xl:mt-0">
              <label htmlFor="email-address" className="sr-only">
                {t('landing.footer.newsletter.emailLabel')}
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder={t('landing.footer.newsletter.placeholder')}
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {t('landing.footer.newsletter.subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900/10 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="/privacy"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {t('landing.footer.legal.privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {t('landing.footer.legal.terms')}
            </Link>
            <Link
              href="/cookies"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {t('landing.footer.legal.cookies')}
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 dark:text-gray-400 md:order-1 md:mt-0">
            {t('landing.footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
