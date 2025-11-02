'use client';

import { KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { AuthLayout } from '../shared/AuthLayout';
import { AuthHero } from '../shared/AuthHero';
import { AuthHeader } from '../shared/AuthHeader';
import { ForgotPasswordHero } from './ForgotPasswordHero';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function ForgotPassword() {
  const { t } = useTranslation();
  
  return (
    <AuthLayout
      hero={
        <AuthHero>
          <ForgotPasswordHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<KeyRound className="w-6 h-6 text-white" />}
            title={t('auth.forgotPassword.title')}
            subtitle={t('auth.forgotPassword.subtitle')}
            mobileTitle={t('auth.forgotPassword.mobileTitle')}
            mobileSubtitle={t('auth.forgotPassword.mobileSubtitle')}
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <ForgotPasswordForm />
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full text-center">
                <Link 
                  href="/auth/login" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {t('auth.forgotPassword.backToLogin')}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
