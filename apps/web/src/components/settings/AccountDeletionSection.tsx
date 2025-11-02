'use client';

import { useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Trash2, AlertCircle, Loader2, AlertTriangle } from 'lucide-react';
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
import { useDeleteAccount } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';

const deleteAccountValidationSchema = Yup.object().shape({
  confirmText: Yup.string()
    .required('Confirmation text is required')
    .oneOf(['DELETE'], 'You must type DELETE to confirm'),
  password: Yup.string()
    .required('Password is required to delete your account'),
});

const initialValues = {
  confirmText: '',
  password: '',
};

export function AccountDeletionSection() {
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useAuth();
  const deleteAccountMutation = useDeleteAccount();

  const handleDeleteAccount = useCallback(async (values: typeof initialValues) => {
    try {
      await deleteAccountMutation.mutateAsync();
      // The hook will handle redirect
    } catch (error) {
      console.error('Delete account error:', error);
    }
  }, [deleteAccountMutation]);

  return (
    <>
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription className="text-red-600">
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <strong>Warning:</strong> This action is permanent and cannot be undone. All your data, including flows, integrations, and settings, will be permanently deleted.
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-white rounded-lg border border-red-200">
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>What will be deleted:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All your flows and automation configurations</li>
                <li>Integration connections and credentials</li>
                <li>Execution logs and history</li>
                <li>API keys and access tokens</li>
                <li>Profile information and settings</li>
              </ul>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={deleteAccountMutation.isPending}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete My Account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-700">Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Please confirm your email and password to delete your account permanently.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={deleteAccountValidationSchema}
            onSubmit={handleDeleteAccount}
          >
            {({ errors, touched, isValid }) => (
              <Form className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 text-sm">
                    You are about to permanently delete your account. This action cannot be undone.
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-medium text-gray-900">Account Email</div>
                  <div className="text-sm text-gray-600 mt-1">{user?.email || 'N/A'}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmText">
                    Type <strong>DELETE</strong> to confirm
                  </Label>
                  <Field
                    as={Input}
                    id="confirmText"
                    name="confirmText"
                    placeholder="DELETE"
                    disabled={deleteAccountMutation.isPending}
                  />
                  <ErrorMessage name="confirmText">
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
                    disabled={deleteAccountMutation.isPending}
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

                {deleteAccountMutation.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {deleteAccountMutation.error.message || 'Failed to delete account'}
                    </AlertDescription>
                  </Alert>
                )}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={deleteAccountMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={deleteAccountMutation.isPending || !isValid}
                  >
                    {deleteAccountMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete My Account'
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

