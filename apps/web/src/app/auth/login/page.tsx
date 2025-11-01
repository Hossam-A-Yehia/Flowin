import { Metadata } from 'next';
import { loginMetadata } from '@/metadata';
import { LoginClient } from '@/components/auth/login/LoginClient';
import { DynamicMetadata } from '@/components/DynamicMetadata';

export const metadata: Metadata = loginMetadata.en;

export default function LoginPage() {
  return (
    <>
      <DynamicMetadata page="login" />
      <LoginClient />
    </>
  );
}
