import { Metadata } from 'next';
import { dashboardMetadata } from '@/metadata';
import { DynamicMetadata } from '@/components/DynamicMetadata';

export const metadata: Metadata = dashboardMetadata.en;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicMetadata page="dashboard" />
      {children}
    </>
  );
}
