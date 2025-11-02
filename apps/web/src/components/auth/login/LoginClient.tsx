'use client';

import { KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { AuthLayout } from '../shared/AuthLayout';
import { AuthHero } from '../shared/AuthHero';
import { AuthHeader } from '../shared/AuthHeader';
import { OAuthButtons } from '../shared/OAuthButtons';
import { FormDivider } from '../shared/FormDivider';
import { LoginHero } from './LoginHero';
import { LoginForm } from './LoginForm';

export function LoginClient() {
  const { t } = useTranslation();
  
  return (
    <AuthLayout
      hero={
        <AuthHero>
          <LoginHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<KeyRound className="w-6 h-6 text-white" />}
            title={t('auth.login.title')}
            subtitle={t('auth.login.subtitle')}
            mobileTitle={t('auth.login.mobileTitle')}
            mobileSubtitle={t('auth.login.mobileSubtitle')}
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <OAuthButtons />
              <FormDivider text={t('auth.login.orSignInWith')} />
              <LoginForm />
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full space-y-3">
                <div className="text-sm text-center text-gray-600">
                  {t('auth.login.noAccount')}{' '}
                  <Link 
                    href="/auth/register" 
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {t('auth.login.createAccount')}
                  </Link>
                </div>
                
                <div className="text-xs text-center text-gray-500 leading-relaxed">
                  {t('auth.login.securityNote')}
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
