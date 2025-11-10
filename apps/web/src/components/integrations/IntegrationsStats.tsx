"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Plug2, CheckCircle2, Grid3x3 } from "lucide-react";

interface IntegrationsStatsProps {
  totalIntegrations: number;
  connectedCount: number;
  categories: string[];
}

export function IntegrationsStats({
  totalIntegrations,
  connectedCount,
  categories,
}: IntegrationsStatsProps) {
  const { t } = useTranslation();

  const stats = [
    {
      label: t("integrations.stats.available") || "Available",
      value: totalIntegrations,
      icon: Plug2,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: t("integrations.stats.connected") || "Connected",
      value: connectedCount,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: t("integrations.stats.categories") || "Categories",
      value: categories.length,
      icon: Grid3x3,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8" role="region" aria-label="Integration statistics">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
