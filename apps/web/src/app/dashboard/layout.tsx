import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { dashboardMetadata } from '@/metadata';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import AppShell from '@/components/shell/AppShell';

export const metadata: Metadata = dashboardMetadata.en;

export default async function DashboardLayout({
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
      <DynamicMetadata page="dashboard" />
      <AppShell>
        {children}
      </AppShell>
    </>
  );
}
