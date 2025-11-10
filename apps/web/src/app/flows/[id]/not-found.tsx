"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function FlowNotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <FileQuestion className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("flowEdit.notFound.title") || "Flow Not Found"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("flowEdit.notFound.description") ||
              "The flow you're looking for doesn't exist or has been deleted."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="default" size="lg">
            <Link href="/flows" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("flowEdit.notFound.backToFlows") || "Back to Flows"}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              {t("flowEdit.notFound.goHome") || "Go Home"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
