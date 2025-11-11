import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import AppShell from '@/components/shell/AppShell';
import { IntegrationsMetadata } from '@/metadata/IntegrationsMetadata';

export const metadata: Metadata = IntegrationsMetadata.en;

export default async function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) {
    redirect('/auth/login');
  }

  return (
    <>
      <DynamicMetadata page="integrations" />
      <AppShell>
        {children}
      </AppShell>
    </>
  );
}
