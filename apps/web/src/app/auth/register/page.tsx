import { Metadata } from 'next';
import { registerMetadata } from '@/metadata';
import { RegisterClient } from '@/components/auth/register/RegisterClient';
import { DynamicMetadata } from '@/components/DynamicMetadata';

export const metadata: Metadata = registerMetadata.en;

export default function RegisterPage() {
  return (
    <>
      <DynamicMetadata page="register" />
      <RegisterClient />
    </>
  );
}
