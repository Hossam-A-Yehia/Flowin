"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle, Sparkles, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { authCookies } from "@/utils/cookies";

type CallbackStatus = "loading" | "success" | "error";

export function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [message, setMessage] = useState("Processing authentication...");
  const [progress, setProgress] = useState(0);
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        const token = searchParams.get("token");
        const error = searchParams.get("error");
        const authProvider = searchParams.get("provider");

        setProvider(authProvider);

        if (error) {
          clearInterval(progressInterval);
          setProgress(100);
          setStatus("error");
          setMessage(`Authentication failed: ${error}`);

          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
          return;
        }

        if (!token) {
          clearInterval(progressInterval);
          setProgress(100);
          setStatus("error");
          setMessage("No authentication token received");

          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        authCookies.setToken(token);
        if (authProvider) {
          authCookies.setProvider(authProvider);
        }

        clearInterval(progressInterval);
        setProgress(100);
        setStatus("success");
        setMessage(
          `Successfully authenticated with ${authProvider || "OAuth"}!`
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred during authentication");

        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
      <Card className="relative w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            {status === "loading" && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full max-w-xs">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">
                    {progress}% complete
                  </p>
                </div>
              </div>
            )}
            {status === "success" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full">
                    <Sparkles className="w-4 h-4 text-white m-1" />
                  </div>
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-rose-400 rounded-full">
                    <Shield className="w-4 h-4 text-white m-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {status === "loading" && "Authenticating..."}
              {status === "success" && "Welcome to Flowin!"}
              {status === "error" && "Authentication Failed"}
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
            {provider && status === "success" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Signed in with {provider}
              </div>
            )}
          </div>
          <div className="mt-8">
            {status === "success" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500 flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Redirecting to your dashboard...</span>
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="space-y-4">
                <Button
                  onClick={handleRetry}
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Try Again
                </Button>
                <div className="text-sm text-gray-500">
                  Redirecting to login page in a moment...
                </div>
              </div>
            )}
            {status === "loading" && (
              <div className="text-sm text-gray-500">
                Please wait while we verify your identity...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
