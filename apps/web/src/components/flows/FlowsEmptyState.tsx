"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Workflow, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

interface FlowsEmptyStateProps {
  onCreateFlow?: () => void;
}

export function FlowsEmptyState({ onCreateFlow }: FlowsEmptyStateProps) {
  const { t } = useTranslation();
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <Workflow className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold mb-2">{t('flows.emptyState.title')}</h3>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          {t('flows.emptyState.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={onCreateFlow} asChild>
            <Link href="/flows/builder">
              <Plus className="mr-2 h-5 w-5" />
              {t('flows.emptyState.createFirst')}
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/flows/templates">
              <Sparkles className="mr-2 h-5 w-5" />
              {t('flows.emptyState.browseTemplates')}
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-medium mb-1">{t('flows.emptyState.visualBuilder')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('flows.emptyState.visualBuilderDesc')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="font-medium mb-1">{t('flows.emptyState.aiPowered')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('flows.emptyState.aiPoweredDesc')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-medium mb-1">{t('flows.emptyState.realTime')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('flows.emptyState.realTimeDesc')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
