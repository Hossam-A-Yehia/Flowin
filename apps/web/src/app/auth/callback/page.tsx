"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get("token");
        const error = searchParams.get("error");
        const provider = searchParams.get("provider");

        if (error) {
          setStatus("error");
          setMessage(`Authentication failed: ${error}`);

          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }

        if (!token) {
          setStatus("error");
          setMessage("No authentication token received");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }

        localStorage.setItem("auth_token", token);

        if (provider) {
          localStorage.setItem("auth_provider", provider);
        }

        setStatus("success");
        setMessage(`Successfully authenticated with ${provider || "OAuth"}!`);

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred during authentication");

        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {status === "loading" && (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center space-y-4">
                <XCircle className="w-12 h-12 text-red-600" />
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {status === "loading" && "Authenticating..."}
            {status === "success" && "Welcome to Flowin!"}
            {status === "error" && "Authentication Failed"}
          </h1>

          <p className="text-gray-600 mb-6">{message}</p>

          {status === "success" && (
            <div className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </div>
          )}

          {status === "error" && (
            <div className="text-sm text-gray-500">
              Redirecting to login page...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
