"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Workflow, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

interface FlowsEmptyStateProps {
  onCreateFlow?: () => void;
}

export function FlowsEmptyState({ onCreateFlow }: FlowsEmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <Workflow className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold mb-2">No flows yet</h3>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Get started by creating your first automation flow. Connect your apps and automate your workflows in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={onCreateFlow} asChild>
            <Link href="/flows/builder">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Flow
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/flows/templates">
              <Sparkles className="mr-2 h-5 w-5" />
              Browse Templates
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-medium mb-1">Visual Builder</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop to create workflows
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="font-medium mb-1">AI-Powered</h4>
            <p className="text-sm text-muted-foreground">
              Build flows with natural language
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-medium mb-1">Real-time</h4>
            <p className="text-sm text-muted-foreground">
              Execute and monitor instantly
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
