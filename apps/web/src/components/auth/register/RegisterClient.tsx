"use client";

import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { AuthLayout } from "../shared/AuthLayout";
import { AuthHero } from "../shared/AuthHero";
import { AuthHeader } from "../shared/AuthHeader";
import { OAuthButtons } from "../shared/OAuthButtons";
import { FormDivider } from "../shared/FormDivider";
import { RegisterHero } from "./RegisterHero";
import { RegisterForm } from "./RegisterForm";

export function RegisterClient() {
  const { t } = useTranslation();
  
  return (
    <AuthLayout
      hero={
        <AuthHero>
          <RegisterHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<Sparkles className="w-6 h-6 text-white" />}
            title={t('auth.register.title')}
            subtitle={t('auth.register.subtitle')}
            mobileTitle={t('auth.register.mobileTitle')}
            mobileSubtitle={t('auth.register.mobileSubtitle')}
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <OAuthButtons />
              <FormDivider text={t('auth.register.orCreateWith')} />
              <RegisterForm />
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full space-y-3">
                <div className="text-sm text-center text-gray-600">
                  {t('auth.register.haveAccount')}{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {t('auth.register.signInInstead')}
                  </Link>
                </div>

                <div className="text-xs text-center text-gray-500 leading-relaxed">
                  {t('auth.register.termsPrefix')}{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {t('auth.register.termsOfService')}
                  </Link>{" "}
                  {t('auth.register.and')}{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {t('auth.register.privacyPolicy')}
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
