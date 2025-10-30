"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { AuthLayout } from "../shared/AuthLayout";
import { AuthHero } from "../shared/AuthHero";
import { AuthHeader } from "../shared/AuthHeader";
import { OAuthButtons } from "../shared/OAuthButtons";
import { FormDivider } from "../shared/FormDivider";
import { RegisterHero } from "./RegisterHero";
import { RegisterForm } from "./RegisterForm";

export function RegisterClient() {
  return (
    <AuthLayout
      hero={
        <AuthHero gradient="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <RegisterHero />
        </AuthHero>
      }
      form={
        <>
          <AuthHeader
            icon={<Sparkles className="w-6 h-6 text-white" />}
            title="Create your account"
            subtitle="Start automating your workflows in minutes."
            mobileTitle="Join Flowin"
            mobileSubtitle="Create your account to get started"
          />

          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <OAuthButtons />
              <FormDivider text="Or create with email" />
              <RegisterForm />
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <div className="w-full space-y-3">
                <div className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign in instead
                  </Link>
                </div>

                <div className="text-xs text-center text-gray-500 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      }
    />
  );
}
