'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLogin, useSendEmailVerification } from '@/hooks/useAuth';
import { LoginFormData } from '@/types/auth';
import { getLoginValidationSchema, loginInitialValues } from './loginUtils';

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const loginMutation = useLogin();
  const resendVerificationMutation = useSendEmailVerification();
  const validationSchema = getLoginValidationSchema();

  const handleSubmit = useCallback(async (values: LoginFormData) => {
    try {
      setUserEmail(values.email);
      loginMutation.mutate(values);
    } catch (error) {
      console.error('Login form submission error:', error);
    }
  }, [loginMutation]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleResendVerification = useCallback(async () => {
    if (userEmail) {
      await resendVerificationMutation.mutateAsync({ email: userEmail });
      router.push(`/auth/verify-email?email=${encodeURIComponent(userEmail)}`);
    }
  }, [userEmail, resendVerificationMutation, router]);

  // Check if error is about email verification
  const isEmailNotVerified = loginMutation.error?.message?.toLowerCase().includes('verify');

  return (
    <>
      {loginMutation.error && (
        <>
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="space-y-2">
                <p className="text-sm">
                  {loginMutation.error?.message || t('auth.login.loginFailed')}
                </p>
              </div>
            </AlertDescription>
          </Alert>
          {isEmailNotVerified && userEmail && (
            <button
              onClick={handleResendVerification}
              disabled={resendVerificationMutation.isPending}
              className="w-full mt-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 text-sm"
            >
              {resendVerificationMutation.isPending ? (
                <>
                  <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                  {t('auth.forgotPassword.sending')}
                </>
              ) : (
                t('auth.login.resendVerification')
              )}
            </button>
          )}
        </>
      )}

      <Formik
        initialValues={loginInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                {t('auth.login.emailLabel')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('auth.login.emailPlaceholder')}
                  disabled={loginMutation.isPending}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`pl-10 h-11 transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${errors.email && touched.email ? 'border-red-500 ring-red-500' : ''}`}
                />
              </div>
              <ErrorMessage name="email">
                {(msg) => (
                  <div className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('auth.login.passwordLabel')}
                </Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.login.passwordPlaceholder')}
                  disabled={loginMutation.isPending}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`pl-10 pr-12 h-11 transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${errors.password && touched.password ? 'border-red-500 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage name="password">
                {(msg) => (
                  <div className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
              disabled={loginMutation.isPending || !isValid}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.login.signingIn')}
                </>
              ) : (
                <>
                  {t('auth.login.signInButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
