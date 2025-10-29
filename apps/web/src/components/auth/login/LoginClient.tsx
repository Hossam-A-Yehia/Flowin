'use client';

import { KeyRound } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { AuthLayout } from '../shared/AuthLayout';
import { AuthHero } from '../shared/AuthHero';
import { AuthHeader } from '../shared/AuthHeader';
import { OAuthButtons } from '../shared/OAuthButtons';
import { FormDivider } from '../shared/FormDivider';
import { LoginHero } from './LoginHero';
import { LoginForm } from './LoginForm';

export function LoginClient() {
  return (
    <AuthLayout
      hero={
        <AuthHero gradient="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <LoginHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<KeyRound className="w-6 h-6 text-white" />}
            title="Sign in to your account"
            subtitle="Welcome back! Please enter your details."
            mobileTitle="Welcome Back"
            mobileSubtitle="Sign in to your account"
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <OAuthButtons />
              <FormDivider text="Or sign in with email" />
              <LoginForm />
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full space-y-3">
                <div className="text-sm text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/register" 
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Create one now
                  </Link>
                </div>
                
                <div className="text-xs text-center text-gray-500 leading-relaxed">
                  Protected by industry-standard encryption and security protocols
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
