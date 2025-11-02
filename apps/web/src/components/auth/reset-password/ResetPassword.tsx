'use client';

import { useSearchParams } from 'next/navigation';
import { KeyRound, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { AuthLayout } from '../shared/AuthLayout';
import { AuthHero } from '../shared/AuthHero';
import { AuthHeader } from '../shared/AuthHeader';
import { ResetPasswordHero } from './ResetPasswordHero';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useValidateResetToken } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export function ResetPassword() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  
  const { data: tokenValidation, isLoading, error } = useValidateResetToken(token);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      );
    }

    if (error || !tokenValidation?.valid) {
      return (
        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="space-y-2">
                <p className="font-medium">{t('auth.resetPassword.invalidToken')}</p>
                <p className="text-sm">{t('auth.resetPassword.invalidTokenDescription')}</p>
              </div>
            </AlertDescription>
          </Alert>

          <Link href="/auth/forgot-password">
            <button className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200">
              {t('auth.resetPassword.requestNewLink')}
            </button>
          </Link>
        </div>
      );
    }

    return <ResetPasswordForm token={token} />;
  };
  
  return (
    <AuthLayout
      hero={
        <AuthHero>
          <ResetPasswordHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<KeyRound className="w-6 h-6 text-white" />}
            title={t('auth.resetPassword.title')}
            subtitle={t('auth.resetPassword.subtitle')}
            mobileTitle={t('auth.resetPassword.mobileTitle')}
            mobileSubtitle={t('auth.resetPassword.mobileSubtitle')}
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              {renderContent()}
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full text-center">
                <Link 
                  href="/auth/login" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {t('auth.resetPassword.backToLogin')}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
