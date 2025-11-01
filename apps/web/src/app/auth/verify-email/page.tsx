import { Metadata } from 'next';
import { Suspense } from 'react';
import { verifyEmailMetadata } from '@/metadata';
import { VerifyEmail } from '@/components/auth/verify-email/VerifyEmail';
import { Loader2 } from 'lucide-react';
import { DynamicMetadata } from '@/components/DynamicMetadata';

export const metadata: Metadata = verifyEmailMetadata.en;

function VerifyEmailLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <DynamicMetadata page="verify-email" />
      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmail />
      </Suspense>
    </>
  );
}
