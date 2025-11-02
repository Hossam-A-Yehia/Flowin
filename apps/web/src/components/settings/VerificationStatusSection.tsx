'use client';

import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useVerificationStatus, useResendVerification } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function VerificationStatusSection() {
  const { t } = useTranslation();
  const { data: status, isLoading, error } = useVerificationStatus();
  const resendMutation = useResendVerification();

  const handleResendEmail = async () => {
    try {
      await resendMutation.mutateAsync({ type: 'email' });
    } catch (error) {
      console.error('Resend verification error:', error);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-gray-200">
        <CardContent className="py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              Failed to load verification status. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const emailVerified = status?.email?.verified ?? false;
  const emailVerifiedAt = status?.email?.verifiedAt;

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Verification Status
        </CardTitle>
        <CardDescription>
          Manage your account verification status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Email Verification */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Email Verification</div>
                  <div className="text-sm text-gray-600">
                    {emailVerified
                      ? emailVerifiedAt
                        ? `Verified on ${new Date(emailVerifiedAt).toLocaleDateString()}`
                        : 'Verified'
                      : 'Not verified'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={emailVerified ? 'default' : 'secondary'}>
                  {emailVerified ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Verified
                    </>
                  )}
                </Badge>
                {!emailVerified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendEmail}
                    disabled={resendMutation.isPending}
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-none"
                  >
                    {resendMutation.isPending ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Resend Email'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {resendMutation.isSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Verification email sent successfully! Please check your inbox.
            </AlertDescription>
          </Alert>
        )}

        {resendMutation.error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {resendMutation.error.message || 'Failed to send verification email'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

