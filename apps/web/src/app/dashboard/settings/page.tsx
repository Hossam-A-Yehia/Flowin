import { Metadata } from 'next';
import { SettingsClient } from '@/components/settings/SettingsClient';

export const metadata: Metadata = {
  title: 'Settings | Flowin',
  description: 'Manage your account settings, security, and preferences',
};

export default function SettingsPage() {
  return <SettingsClient />;
}

