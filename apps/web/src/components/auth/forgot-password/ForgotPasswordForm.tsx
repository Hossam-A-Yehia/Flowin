'use client';

import { useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForgotPassword } from '@/hooks/useAuth';
import { ForgotPasswordFormData } from '@/types/auth';
import { getForgotPasswordValidationSchema, forgotPasswordInitialValues } from './forgotPasswordUtils';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();
  const validationSchema = getForgotPasswordValidationSchema();

  const handleSubmit = useCallback(async (values: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync(values);
      setEmailSent(true);
    } catch (error) {
      console.error('Forgot password form submission error:', error);
    }
  }, [forgotPasswordMutation]);

  if (emailSent) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-700">
            <div className="space-y-2">
              <p className="font-medium">{t('auth.forgotPassword.checkEmail')}</p>
              <p className="text-sm">{t('auth.forgotPassword.emailSentDescription')}</p>
            </div>
          </AlertDescription>
        </Alert>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            {t('auth.forgotPassword.didntReceive')}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="w-full"
          >
            {t('auth.forgotPassword.resendLink')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {forgotPasswordMutation.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {forgotPasswordMutation.error?.message || t('auth.forgotPassword.successMessage')}
          </AlertDescription>
        </Alert>
      )}

      <Formik
        initialValues={forgotPasswordInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                {t('auth.forgotPassword.emailLabel')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('auth.forgotPassword.emailPlaceholder')}
                  disabled={forgotPasswordMutation.isPending}
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

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
              disabled={forgotPasswordMutation.isPending || !isValid}
            >
              {forgotPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.forgotPassword.sending')}
                </>
              ) : (
                <>
                  {t('auth.forgotPassword.sendButton')}
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
