"use client";

import { useTranslation } from "react-i18next";
import { Plug2 } from "lucide-react";

export function IntegrationsHeader() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Plug2 className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("integrations.title") || "Integrations"}
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        {t("integrations.subtitle") ||
          "Connect your favorite apps and automate your workflows"}
      </p>
    </div>
  );
}
