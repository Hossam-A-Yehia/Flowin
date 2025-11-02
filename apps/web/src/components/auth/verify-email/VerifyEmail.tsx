'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Mail, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { AuthLayout } from '../shared/AuthLayout';
import { AuthHero } from '../shared/AuthHero';
import { AuthHeader } from '../shared/AuthHeader';
import { VerifyEmailHero } from './VerifyEmailHero';
import { useVerifyEmail, useSendEmailVerification } from '@/hooks/useAuth';

export function VerifyEmail() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  
  const verifyEmailMutation = useVerifyEmail();
  const resendEmailMutation = useSendEmailVerification();

  useEffect(() => {
    if (token && !verifyEmailMutation.isSuccess && !verifyEmailMutation.error) {
      verifyEmailMutation.mutate({ token });
    }
  }, [token]);

  const handleResend = async () => {
    const email = searchParams.get('email');
    if (email) {
      await resendEmailMutation.mutateAsync({ email });
    }
  };

  const renderContent = () => {
    if (verifyEmailMutation.isPending) {
      return (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 text-center">{t('auth.verifyEmail.verifying')}</p>
        </div>
      );
    }

    if (verifyEmailMutation.isSuccess) {
      return (
        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-700">
              <div className="space-y-2">
                <p className="font-medium">{t('auth.verifyEmail.successTitle')}</p>
                <p className="text-sm">{t('auth.verifyEmail.successMessage')}</p>
                <p className="text-sm">{t('auth.verifyEmail.redirecting')}</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    if (verifyEmailMutation.error) {
      return (
        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="space-y-2">
                <p className="font-medium">{t('auth.verifyEmail.invalidToken')}</p>
                <p className="text-sm">{t('auth.verifyEmail.invalidTokenDescription')}</p>
              </div>
            </AlertDescription>
          </Alert>

          {resendEmailMutation.isSuccess ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-700">
                <p className="text-sm">{t('auth.verifyEmail.emailSentDescription')}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                {t('auth.verifyEmail.didntReceive')}
              </p>
              <button
                onClick={handleResend}
                disabled={resendEmailMutation.isPending}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {resendEmailMutation.isPending ? (
                  <>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    {t('auth.forgotPassword.sending')}
                  </>
                ) : (
                  t('auth.verifyEmail.resendLink')
                )}
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <Alert className="border-blue-200 bg-blue-50">
          <Mail className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <div className="space-y-2">
              <p className="font-medium">{t('auth.verifyEmail.checkEmail')}</p>
              <p className="text-sm">{t('auth.verifyEmail.emailSentDescription')}</p>
            </div>
          </AlertDescription>
        </Alert>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            {t('auth.verifyEmail.didntReceive')}
          </p>
          <button
            onClick={handleResend}
            disabled={resendEmailMutation.isPending}
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {resendEmailMutation.isPending ? (
              <>
                <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                {t('auth.forgotPassword.sending')}
              </>
            ) : (
              t('auth.verifyEmail.resendLink')
            )}
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <AuthLayout
      hero={
        <AuthHero>
          <VerifyEmailHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<Mail className="w-6 h-6 text-white" />}
            title={t('auth.verifyEmail.title')}
            subtitle={t('auth.verifyEmail.subtitle')}
            mobileTitle={t('auth.verifyEmail.mobileTitle')}
            mobileSubtitle={t('auth.verifyEmail.mobileSubtitle')}
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
