'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useLogout } from '@/hooks/useAuth';
import { Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logoutMutation = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              {(!user || isLoading) ? (
                <span className="inline-block h-5 w-40 bg-gray-200 rounded animate-pulse" />
              ) : (
                <>Welcome back, {user.name || user.email}!</>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" disabled={!user || isLoading}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(!user || isLoading) ? (
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-medium">Email:</span> {user.email}
                  </div>
                  <div>
                    <span className="font-medium">Name:</span> {user.name || 'Not provided'}
                  </div>
                  <div>
                    <span className="font-medium">Plan:</span> {user.plan}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with Flowin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline" disabled={!user || isLoading}>
                  Create Your First Flow
                </Button>
                <Button className="w-full" variant="outline" disabled={!user || isLoading}>
                  Connect Integrations
                </Button>
                <Button className="w-full" variant="outline" disabled={!user || isLoading}>
                  Browse Templates
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Stats</CardTitle>
              <CardDescription>Your current usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(!user || isLoading) ? (
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-medium">Flows:</span> 0
                  </div>
                  <div>
                    <span className="font-medium">Executions:</span> 0
                  </div>
                  <div>
                    <span className="font-medium">Integrations:</span> 0
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
