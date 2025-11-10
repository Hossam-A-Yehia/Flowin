"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useIntegrations, useUserIntegrations } from "@/hooks/useIntegrations";
import { IntegrationsSkeleton } from "./IntegrationsSkeleton";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationsStats } from "./IntegrationsStats";
import { IntegrationsHeader } from "./IntegrationsHeader";
import { IntegrationsFilters } from "./IntegrationsFilters";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationsClient() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const {
    data: integrations,
    isLoading: integrationsLoading,
    isError: integrationsError,
    refetch: refetchIntegrations,
  } = useIntegrations();

  const {
    data: userIntegrations,
    isLoading: userIntegrationsLoading,
    isError: userIntegrationsError,
  } = useUserIntegrations();

  const isLoading = integrationsLoading || userIntegrationsLoading;
  const isError = integrationsError || userIntegrationsError;

  const categories = useMemo(() => {
    if (!integrations) return [];
    const uniqueCategories = [
      ...new Set(integrations.map((int) => int.category)),
    ];
    return uniqueCategories;
  }, [integrations]);

  const filteredIntegrations = useMemo(() => {
    if (!integrations) return [];

    return integrations.filter((integration) => {
      const matchesSearch =
        integration.displayName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        integration.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || integration.category === selectedCategory;

      return matchesSearch && matchesCategory && integration.isActive;
    });
  }, [integrations, searchQuery, selectedCategory]);

  const connectedIntegrations = useMemo(() => {
    if (!userIntegrations) return [];
    return userIntegrations.filter((ui) => ui.isConnected);
  }, [userIntegrations]);

  const isConnected = (integrationId: string) => {
    return connectedIntegrations.some(
      (ui) => ui.integrationId === integrationId
    );
  };

  const getUserIntegration = (integrationId: string) => {
    return userIntegrations?.find((ui) => ui.integrationId === integrationId);
  };

  if (isLoading) {
    return <IntegrationsSkeleton />;
  }

  if (isError) {
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
              {t("integrations.error.title") || "Failed to Load Integrations"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("integrations.error.description") ||
                "We couldn't load the integrations. Please try again."}
            </p>
          </div>

          <Button onClick={() => refetchIntegrations()} size="lg">
            {t("integrations.error.retry") || "Try Again"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <IntegrationsHeader />

        <IntegrationsStats
          totalIntegrations={integrations?.length || 0}
          connectedCount={connectedIntegrations.length}
          categories={categories}
        />

        <div className="space-y-6">
          <IntegrationsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {t("integrations.emptyState.noResults") ||
                  "No integrations found. Try adjusting your search or filters."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  isConnected={isConnected(integration.id)}
                  userIntegration={getUserIntegration(integration.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {filteredIntegrations.length > 0 &&
          `Showing ${filteredIntegrations.length} integrations`}
      </div>
    </div>
  );
}
