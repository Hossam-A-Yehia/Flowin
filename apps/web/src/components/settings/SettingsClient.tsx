'use client';

import { useAuth } from '@/hooks/useAuth';
import { SettingsLayout } from './SettingsLayout';
import { TwoFactorSection } from './TwoFactorSection';
import { ApiKeysSection } from './ApiKeysSection';
import { VerificationStatusSection } from './VerificationStatusSection';
import { AccountDeletionSection } from './AccountDeletionSection';
import { Loader2 } from 'lucide-react';

export function SettingsClient() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <SettingsLayout>
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings, security, and preferences</p>
        </div>
        <VerificationStatusSection />
        <TwoFactorSection />
        <ApiKeysSection />
        <AccountDeletionSection />
      </div>
    </SettingsLayout>
  );
}

