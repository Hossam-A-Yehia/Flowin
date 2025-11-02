'use client';

import { useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Shield, AlertCircle, CheckCircle, Loader2, Copy, Key } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { use2FAStatus, useEnable2FA, useDisable2FA, useRegenerateBackupCodes } from '@/hooks/useAuth';
import { Enable2FAData, Disable2FAData } from '@/types/auth';

const enable2FAValidationSchema = Yup.object().shape({
  method: Yup.string().oneOf(['email', 'sms']).required('Please select a method'),
  password: Yup.string().required('Password is required to enable 2FA'),
});

const disable2FAValidationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required to disable 2FA'),
});

export function TwoFactorSection() {
  const { t } = useTranslation();
  const [enableDialogOpen, setEnableDialogOpen] = useState(false);
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [backupCodesDialogOpen, setBackupCodesDialogOpen] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const { data: status, isLoading: statusLoading } = use2FAStatus();
  const enable2FAMutation = useEnable2FA();
  const disable2FAMutation = useDisable2FA();
  const regenerateBackupCodesMutation = useRegenerateBackupCodes();

  const handleEnable2FA = useCallback(async (values: Enable2FAData) => {
    try {
      const result = await enable2FAMutation.mutateAsync(values);
      setBackupCodes(result.backupCodes);
      setEnableDialogOpen(false);
      setBackupCodesDialogOpen(true);
    } catch (error) {
      console.error('Enable 2FA error:', error);
    }
  }, [enable2FAMutation]);

  const handleDisable2FA = useCallback(async (values: Disable2FAData) => {
    try {
      await disable2FAMutation.mutateAsync(values);
      setDisableDialogOpen(false);
    } catch (error) {
      console.error('Disable 2FA error:', error);
    }
  }, [disable2FAMutation]);

  const handleRegenerateBackupCodes = useCallback(async () => {
    try {
      const result = await regenerateBackupCodesMutation.mutateAsync();
      setBackupCodes(result.backupCodes);
      setBackupCodesDialogOpen(true);
    } catch (error) {
      console.error('Regenerate backup codes error:', error);
    }
  }, [regenerateBackupCodesMutation]);

  const copyToClipboard = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, []);

  if (statusLoading) {
    return (
      <Card className="border-gray-200">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  const isEnabled = status?.enabled ?? false;

  return (
    <>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">
                {isEnabled ? '2FA is Enabled' : '2FA is Disabled'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {isEnabled
                  ? `Using ${status?.method === 'email' ? 'Email' : 'SMS'} for authentication`
                  : 'Enable 2FA to secure your account'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEnabled ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDisableDialogOpen(true)}
                    disabled={disable2FAMutation.isPending}
                  >
                    Disable
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateBackupCodes}
                    disabled={regenerateBackupCodesMutation.isPending}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Backup Codes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEnableDialogOpen(true)}
                  disabled={enable2FAMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                >
                  Enable 2FA
                </Button>
              )}
            </div>
          </div>

          {enable2FAMutation.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {enable2FAMutation.error.message || 'Failed to enable 2FA'}
              </AlertDescription>
            </Alert>
          )}

          {disable2FAMutation.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {disable2FAMutation.error.message || 'Failed to disable 2FA'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Dialog open={enableDialogOpen} onOpenChange={setEnableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Choose your preferred 2FA method and enter your password to continue
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{ method: 'email' as 'email' | 'sms', password: '' }}
            validationSchema={enable2FAValidationSchema}
            onSubmit={handleEnable2FA}
          >
            {({ values, errors, touched, isValid }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="method">2FA Method</Label>
                  <Field
                    as="select"
                    id="method"
                    name="method"
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </Field>
                  <ErrorMessage name="method">
                    {(msg) => (
                      <div className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    disabled={enable2FAMutation.isPending}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEnableDialogOpen(false)}
                    disabled={enable2FAMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={enable2FAMutation.isPending || !isValid}
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  >
                    {enable2FAMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enabling...
                      </>
                    ) : (
                      'Enable 2FA'
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password to disable 2FA. This will make your account less secure.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={disable2FAValidationSchema}
            onSubmit={handleDisable2FA}
          >
            {({ errors, touched, isValid }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    disabled={disable2FAMutation.isPending}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDisableDialogOpen(false)}
                    disabled={disable2FAMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={disable2FAMutation.isPending || !isValid}
                  >
                    {disable2FAMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Disabling...
                      </>
                    ) : (
                      'Disable 2FA'
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={backupCodesDialogOpen} onOpenChange={setBackupCodesDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Backup Codes</DialogTitle>
            <DialogDescription>
              Save these codes in a safe place. You can use them to access your account if you lose access to your 2FA device.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                These codes will only be shown once. Make sure to save them securely.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 rounded-lg">
              {backupCodes.map((code, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <code className="text-sm font-mono">{code}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(code, index)}
                    className="ml-2 p-1 hover:bg-gray-100 rounded"
                    title="Copy code"
                  >
                    <Copy className={`h-3 w-3 ${copiedIndex === index ? 'text-green-600' : 'text-gray-400'}`} />
                  </button>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                onClick={() => setBackupCodesDialogOpen(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                I've Saved These Codes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

