"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Pricing() {
  const { t } = useTranslation();
  
  const plans = [
  {
    nameKey: "landing.pricing.free.name",
    priceKey: "landing.pricing.free.price",
    periodKey: "landing.pricing.free.period",
    descriptionKey: "landing.pricing.free.description",
    featuresKeys: [
      "landing.pricing.free.features.activeFlows",
      "landing.pricing.free.features.executions",
      "landing.pricing.free.features.integrations",
      "landing.pricing.free.features.support",
      "landing.pricing.free.features.community"
    ],
    limitationsKeys: [
      "landing.pricing.free.limitations.whatsapp",
      "landing.pricing.free.limitations.aiBuilder",
      "landing.pricing.free.limitations.templates"
    ],
    ctaKey: "landing.pricing.free.cta",
    href: "/auth/register",
    popular: false,
    color: "border-gray-200 dark:border-gray-700"
  },
  {
    nameKey: "landing.pricing.starter.name",
    priceKey: "landing.pricing.starter.price",
    periodKey: "landing.pricing.starter.period",
    descriptionKey: "landing.pricing.starter.description",
    featuresKeys: [
      "landing.pricing.starter.features.activeFlows",
      "landing.pricing.starter.features.executions",
      "landing.pricing.starter.features.integrations",
      "landing.pricing.starter.features.support",
      "landing.pricing.starter.features.templates",
      "landing.pricing.starter.features.analytics"
    ],
    limitationsKeys: [
      "landing.pricing.starter.limitations.whatsappAlerts",
      "landing.pricing.starter.limitations.aiFeatures"
    ],
    ctaKey: "landing.pricing.starter.cta",
    href: "/auth/register?plan=starter",
    popular: true,
    color: "border-blue-500 dark:border-blue-400"
  },
  {
    nameKey: "landing.pricing.pro.name",
    priceKey: "landing.pricing.pro.price",
    periodKey: "landing.pricing.pro.period",
    descriptionKey: "landing.pricing.pro.description",
    featuresKeys: [
      "landing.pricing.pro.features.activeFlows",
      "landing.pricing.pro.features.executions",
      "landing.pricing.pro.features.integrations",
      "landing.pricing.pro.features.aiBuilder",
      "landing.pricing.pro.features.analytics",
      "landing.pricing.pro.features.support",
      "landing.pricing.pro.features.templates",
      "landing.pricing.pro.features.collaboration"
    ],
    limitationsKeys: [],
    ctaKey: "landing.pricing.pro.cta",
    href: "/auth/register?plan=pro",
    popular: false,
    color: "border-violet-500 dark:border-violet-400"
  },
  {
    nameKey: "landing.pricing.business.name",
    priceKey: "landing.pricing.business.price",
    periodKey: "landing.pricing.business.period",
    descriptionKey: "landing.pricing.business.description",
    featuresKeys: [
      "landing.pricing.business.features.unlimitedFlows",
      "landing.pricing.business.features.unlimitedExecutions",
      "landing.pricing.business.features.customIntegrations",
      "landing.pricing.business.features.dedicatedSupport",
      "landing.pricing.business.features.slaGuarantee",
      "landing.pricing.business.features.advancedSecurity",
      "landing.pricing.business.features.apiAccess",
      "landing.pricing.business.features.customBranding"
    ],
    limitationsKeys: [],
    ctaKey: "landing.pricing.business.cta",
    href: "/contact",
    popular: false,
    color: "border-emerald-500 dark:border-emerald-400"
  }
];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('landing.pricing.title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t('landing.pricing.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                    <Star className="mr-1 h-3 w-3" />
                    {t('landing.pricing.mostPopular') || 'Most Popular'}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t(plan.nameKey)}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {t(plan.priceKey)}
                  </span>
                  {t(plan.priceKey) !== "Custom" && (
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      /{t(plan.periodKey)}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {t(plan.descriptionKey)}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.featuresKeys.map((featureKey, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {t(featureKey)}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.limitationsKeys.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {t('landing.pricing.notIncluded') || 'Not included:'}
                    </p>
                    {plan.limitationsKeys.map((limitationKey, limitIndex) => (
                      <div key={limitIndex} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {t(limitationKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <Button 
                  asChild 
                  className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.href}>
                    {plan.ctaKey ? t(plan.ctaKey) : 'Get Started'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-center">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('landing.pricing.allPlansInclude')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                {t('landing.pricing.trial')}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                {t('landing.pricing.cancel')}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                {t('landing.pricing.payment')}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('landing.pricing.customSolution')}{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t('landing.pricing.contactSales')}
            </Link>{" "}
            {t('landing.pricing.discussNeeds')}
          </p>
        </div>
      </div>
    </section>
  );
}
