'use client';

import { useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Key, Plus, Trash2, Eye, EyeOff, AlertCircle, CheckCircle, Copy, Loader2, AlertTriangle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useApiKeys, useCreateApiKey, useDeleteApiKey, useToggleApiKey } from '@/hooks/useAuth';
import { CreateApiKeyData, ApiKey } from '@/types/auth';

const createApiKeyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('API key name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
});

const initialValues: CreateApiKeyData = {
  name: '',
};

export function ApiKeysSection() {
  const { t } = useTranslation();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const { data: apiKeys, isLoading: keysLoading } = useApiKeys();
  const createApiKeyMutation = useCreateApiKey();
  const deleteApiKeyMutation = useDeleteApiKey();
  const toggleApiKeyMutation = useToggleApiKey();

  const handleCreateApiKey = useCallback(async (values: CreateApiKeyData) => {
    try {
      const result = await createApiKeyMutation.mutateAsync(values);
      setNewApiKey(result.key);
      setCreateDialogOpen(false);
      // Show success message or the key in a dialog
    } catch (error) {
      console.error('Create API key error:', error);
    }
  }, [createApiKeyMutation]);

  const handleDeleteApiKey = useCallback(async () => {
    if (!selectedKey) return;
    try {
      await deleteApiKeyMutation.mutateAsync(selectedKey.id);
      setDeleteDialogOpen(false);
      setSelectedKey(null);
    } catch (error) {
      console.error('Delete API key error:', error);
    }
  }, [selectedKey, deleteApiKeyMutation]);

  const handleToggleApiKey = useCallback(async (key: ApiKey) => {
    try {
      await toggleApiKeyMutation.mutateAsync(key.id);
    } catch (error) {
      console.error('Toggle API key error:', error);
    }
  }, [toggleApiKeyMutation]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, []);

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const maskApiKey = useCallback((key: string) => {
    if (key.length <= 12) return key;
    return `${key.substring(0, 8)}${'•'.repeat(key.length - 12)}${key.substring(key.length - 4)}`;
  }, []);

  return (
    <>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your API keys for programmatic access to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {apiKeys ? `${apiKeys.length} key${apiKeys.length !== 1 ? 's' : ''}` : '0 keys'}
            </div>
            <Button
              onClick={() => setCreateDialogOpen(true)}
              disabled={keysLoading || createApiKeyMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </div>

          {createApiKeyMutation.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {createApiKeyMutation.error.message || 'Failed to create API key'}
              </AlertDescription>
            </Alert>
          )}

          {deleteApiKeyMutation.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {deleteApiKeyMutation.error.message || 'Failed to delete API key'}
              </AlertDescription>
            </Alert>
          )}

          {keysLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : apiKeys && apiKeys.length > 0 ? (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{key.name}</h4>
                        <Badge variant={key.isActive ? 'default' : 'secondary'}>
                          {key.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
                        <code>{maskApiKey(key.key)}</code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(key.key)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copy key"
                        >
                          <Copy className={`h-3 w-3 ${copiedKey ? 'text-green-600' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Created: {formatDate(key.createdAt)}</div>
                        {key.lastUsed && (
                          <div>Last used: {formatDate(key.lastUsed)}</div>
                        )}
                        {key.expiresAt && (
                          <div className="flex items-center gap-1">
                            Expires: {formatDate(key.expiresAt)}
                            {new Date(key.expiresAt) < new Date() && (
                              <AlertTriangle className="h-3 w-3 text-yellow-600" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleApiKey(key)}
                        disabled={toggleApiKeyMutation.isPending}
                      >
                        {key.isActive ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedKey(key);
                          setDeleteDialogOpen(true);
                        }}
                        disabled={deleteApiKeyMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No API keys yet. Create your first one to get started.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Give your API key a descriptive name to help you identify it later
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={createApiKeyValidationSchema}
            onSubmit={handleCreateApiKey}
          >
            {({ values, errors, touched, isValid }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">API Key Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="e.g., Production Server, Development, etc."
                    disabled={createApiKeyMutation.isPending}
                  />
                  <ErrorMessage name="name">
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
                    onClick={() => setCreateDialogOpen(false)}
                    disabled={createApiKeyMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createApiKeyMutation.isPending || !isValid}
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  >
                    {createApiKeyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Key'
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={!!newApiKey} onOpenChange={(open) => !open && setNewApiKey(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Copy your API key now. You won't be able to see it again!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                This key will only be shown once. Make sure to copy it and store it securely.
              </AlertDescription>
            </Alert>
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg border">
              <code className="flex-1 font-mono text-sm break-all">{newApiKey}</code>
              <button
                type="button"
                onClick={() => newApiKey && copyToClipboard(newApiKey)}
                className="p-2 hover:bg-gray-200 rounded"
                title="Copy key"
              >
                <Copy className={`h-4 w-4 ${copiedKey ? 'text-green-600' : 'text-gray-400'}`} />
              </button>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setNewApiKey(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                I've Copied The Key
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this API key? This action cannot be undone. Any applications using this key will stop working.
            </DialogDescription>
          </DialogHeader>
          {selectedKey && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">{selectedKey.name}</div>
              <div className="text-sm text-gray-600 font-mono mt-1">{maskApiKey(selectedKey.key)}</div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedKey(null);
              }}
              disabled={deleteApiKeyMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteApiKey}
              disabled={deleteApiKeyMutation.isPending}
            >
              {deleteApiKeyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Key'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

