'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Shield, Loader2, AlertCircle, CheckCircle, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSend2FACode, useVerify2FA } from '@/hooks/useAuth';

interface TwoFactorVerificationProps {
  email: string;
  method: 'email' | 'sms' | null;
  onSuccess: () => void;
}

const verify2FAValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('2FA code is required')
    .min(6, 'Code must be at least 6 characters')
    .max(12, 'Code cannot be longer than 12 characters'),
});

export function TwoFactorVerification({ email, method, onSuccess }: TwoFactorVerificationProps) {
  const { t } = useTranslation();
  const [codeSent, setCodeSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const hasSentCodeRef = useRef(false);
  const send2FACodeMutation = useSend2FACode();
  const verify2FAMutation = useVerify2FA();

  const handleSendCode = useCallback(async () => {
    if (hasSentCodeRef.current || send2FACodeMutation.isPending) {
      return;
    }

    try {
      hasSentCodeRef.current = true;
      await send2FACodeMutation.mutateAsync(email);
      setCodeSent(true);
    } catch (error) {
      console.error('Error sending 2FA code:', error);
      hasSentCodeRef.current = false; 
    }
  }, [email, send2FACodeMutation]);

  useEffect(() => {
    if (!hasSentCodeRef.current && email) {
      handleSendCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSubmit = useCallback(async (values: { code: string }) => {
    try {
      await verify2FAMutation.mutateAsync({
        email,
        code: values.code,
      });
    } catch (error) {
      console.error('Error verifying 2FA code:', error);
    }
  }, [email, verify2FAMutation]);

  const methodIcon = method === 'sms' ? MessageSquare : Mail;
  const methodName = method === 'sms' ? 'SMS' : 'Email';

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Two-Factor Authentication Required
        </CardTitle>
        <CardDescription>
          Please enter the verification code sent to your {methodName.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {codeSent && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Verification code sent to your {methodName.toLowerCase()} ({email})
            </AlertDescription>
          </Alert>
        )}

        {send2FACodeMutation.error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {send2FACodeMutation.error.message || 'Failed to send verification code'}
            </AlertDescription>
          </Alert>
        )}

        {verify2FAMutation.error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {verify2FAMutation.error.message || 'Invalid verification code'}
            </AlertDescription>
          </Alert>
        )}

        <Formik
          initialValues={{ code: '' }}
          validationSchema={verify2FAValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isValid }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                  Verification Code
                </Label>
                <div className="relative">
                  {methodIcon === Mail ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  ) : (
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  )}
                  <Field
                    as={Input}
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    disabled={verify2FAMutation.isPending}
                    onFocus={() => setFocusedField('code')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-10 h-11 transition-all duration-200 ${
                      focusedField === 'code'
                        ? 'ring-2 ring-blue-500 border-blue-500'
                        : ''
                    } ${errors.code && touched.code ? 'border-red-500 ring-red-500' : ''}`}
                    maxLength={12}
                  />
                </div>
                <ErrorMessage name="code">
                  {(msg) => (
                    <div className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
                <p className="text-xs text-gray-500">
                  Enter the 6-digit code sent to your {methodName.toLowerCase()} or use a backup code
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                  disabled={verify2FAMutation.isPending || !isValid}
                >
                  {verify2FAMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    hasSentCodeRef.current = false; 
                    handleSendCode();
                  }}
                  disabled={send2FACodeMutation.isPending}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50"
                >
                  {send2FACodeMutation.isPending ? (
                    <>
                      <Loader2 className="inline mr-2 h-3 w-3 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    `Resend code to ${methodName.toLowerCase()}`
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}



