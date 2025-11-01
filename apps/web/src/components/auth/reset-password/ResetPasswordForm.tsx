'use client';

import { useState, useCallback, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff, Loader2, AlertCircle, Lock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useResetPassword } from '@/hooks/useAuth';
import { ResetPasswordFormData } from '@/types/auth';
import { 
  getResetPasswordValidationSchema, 
  getResetPasswordInitialValues,
  calculatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor
} from './resetPasswordUtils';

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { t } = useTranslation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const resetPasswordMutation = useResetPassword();
  const validationSchema = getResetPasswordValidationSchema();
  const initialValues = useMemo(() => getResetPasswordInitialValues(token), [token]);

  const handleSubmit = useCallback(async (values: ResetPasswordFormData) => {
    try {
      await resetPasswordMutation.mutateAsync(values);
    } catch (error) {
      console.error('Reset password form submission error:', error);
    }
  }, [resetPasswordMutation]);

  const toggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = calculatePasswordStrength(e.target.value);
    setPasswordStrength(strength);
  }, []);

  if (resetPasswordMutation.isSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-700">
            <div className="space-y-2">
              <p className="font-medium">{t('auth.resetPassword.successMessage')}</p>
              <p className="text-sm">{t('auth.resetPassword.redirecting')}</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {resetPasswordMutation.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {resetPasswordMutation.error?.message || 'Failed to reset password'}
          </AlertDescription>
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, values, handleChange }) => (
          <Form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                {t('auth.resetPassword.newPasswordLabel')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder={t('auth.resetPassword.newPasswordPlaceholder')}
                  disabled={resetPasswordMutation.isPending}
                  onFocus={() => setFocusedField('newPassword')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePasswordChange(e);
                    handleChange(e);
                  }}
                  className={`pl-10 pr-12 h-11 transition-all duration-200 ${
                    focusedField === 'newPassword' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${errors.newPassword && touched.newPassword ? 'border-red-500 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={resetPasswordMutation.isPending}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage name="newPassword">
                {(msg) => (
                  <div className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>

              {values.newPassword && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{t('auth.resetPassword.passwordStrength')}</span>
                    <span className="font-medium text-gray-700">{getPasswordStrengthLabel(passwordStrength)}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                      style={{ width: `${(passwordStrength / 6) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                {t('auth.resetPassword.confirmPasswordLabel')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
                  disabled={resetPasswordMutation.isPending}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={`pl-10 pr-12 h-11 transition-all duration-200 ${
                    focusedField === 'confirmPassword' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  } ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={resetPasswordMutation.isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage name="confirmPassword">
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
              disabled={resetPasswordMutation.isPending || !isValid}
            >
              {resetPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.resetPassword.resetting')}
                </>
              ) : (
                <>
                  {t('auth.resetPassword.resetButton')}
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
