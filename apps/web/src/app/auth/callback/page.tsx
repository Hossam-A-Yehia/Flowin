import { Suspense } from "react";
import { Metadata } from "next";
import { AuthCallbackClient } from "@/components/auth/callback/AuthCallback";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Authentication - Flowin",
  description: "Completing your authentication with Flowin",
  robots: {
    index: false,
    follow: false,
  },
};
function AuthCallbackLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Loading...
          </h1>
          
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            Preparing your authentication experience...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthCallbackLoading />}>
      <AuthCallbackClient />
    </Suspense>
  );
}
