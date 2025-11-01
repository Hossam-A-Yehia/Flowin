import { Metadata } from 'next';
import { Suspense } from 'react';
import { resetPasswordMetadata } from '@/metadata';
import { ResetPassword } from '@/components/auth/reset-password/ResetPassword';
import { Loader2 } from 'lucide-react';
import { DynamicMetadata } from '@/components/DynamicMetadata';

export const metadata: Metadata = resetPasswordMetadata.en;

function ResetPasswordLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <DynamicMetadata page="reset-password" />
      <Suspense fallback={<ResetPasswordLoading />}>
        <ResetPassword />
      </Suspense>
    </>
  );
}
