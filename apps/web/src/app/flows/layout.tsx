import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import AppShell from '@/components/shell/AppShell';
import { FlowsMetadata } from '@/metadata/FlowsMetadata';

export const metadata: Metadata = FlowsMetadata.en;

export default async function FlowsLayout({
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
      <DynamicMetadata page="flows" />
      <AppShell>
        {children}
      </AppShell>
    </>
  );
}
