"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FlowEditError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error("Flow edit error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle 
              className="h-16 w-16 text-destructive" 
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("flowEdit.error.title") || "Something Went Wrong"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("flowEdit.error.description") ||
              "We encountered an error while loading your flow. Please try again."}
          </p>
          {error.message && (
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted p-2 rounded">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={reset} variant="default" size="lg" className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {t("flowEdit.error.retry") || "Try Again"}
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/flows" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("flowEdit.error.backToFlows") || "Back to Flows"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
