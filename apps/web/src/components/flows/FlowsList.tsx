"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFlows, useToggleFlowStatus, useDuplicateFlow, useDeleteFlow, useExecuteFlow } from "@/hooks/useFlows";
import { FlowsHeader } from "@/components/flows/FlowsHeader";
import { FlowsStats } from "@/components/flows/FlowsStats";
import { FlowCard } from "@/components/flows/FlowCard";
import { FlowsEmptyState } from "@/components/flows/FlowsEmptyState";
import { FlowFilters, parseTags } from "@/types/flow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Button } from "@/components/ui/button";

export function FlowsListClient() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FlowFilters>({
    status: "all",
    triggerType: "all",
    sortBy: "updatedAt",
    sortOrder: "desc",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flowToDelete, setFlowToDelete] = useState<string | null>(null);

  const { data: flows = [], isLoading, error, refetch } = useFlows();

  const { toggle: toggleStatus, isLoading: isTogglingStatus } = useToggleFlowStatus();
  const duplicateMutation = useDuplicateFlow();
  const deleteMutation = useDeleteFlow();
  const executeMutation = useExecuteFlow();

  const filteredFlows = useMemo(() => {
    let result = [...flows];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (flow) =>
          flow.name.toLowerCase().includes(query) ||
          flow.description?.toLowerCase().includes(query) ||
          parseTags(flow.tags).some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.status !== "all") {
      result = result.filter((flow) =>
        filters.status === "active" ? flow.isActive : !flow.isActive
      );
    }

    if (filters.triggerType !== "all") {
      result = result.filter((flow) => flow.triggerType === filters.triggerType);
    }

    result.sort((a, b) => {
      const order = filters.sortOrder === "asc" ? 1 : -1;
      
      switch (filters.sortBy) {
        case "name":
          return order * a.name.localeCompare(b.name);
        case "createdAt":
          return order * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case "updatedAt":
          return order * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        case "lastRun":
          if (!a.lastRun && !b.lastRun) return 0;
          if (!a.lastRun) return 1;
          if (!b.lastRun) return -1;
          return order * (new Date(a.lastRun).getTime() - new Date(b.lastRun).getTime());
        default:
          return 0;
      }
    });

    return result;
  }, [flows, searchQuery, filters]);

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    toggleStatus(id, currentStatus);
  };

  const handleDuplicate = (id: string) => {
    const flow = flows.find((f) => f.id === id);
    if (flow) {
      duplicateMutation.mutate({ id, newName: `${flow.name} (Copy)` });
    }
  };

  const handleDeleteClick = (id: string) => {
    setFlowToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (flowToDelete) {
      deleteMutation.mutate(flowToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setFlowToDelete(null);
        },
      });
    }
  };

  const handleExecute = (id: string) => {
    executeMutation.mutate({ id });
  };

  const isAnyMutationLoading =
    isTogglingStatus ||
    duplicateMutation.isPending ||
    deleteMutation.isPending ||
    executeMutation.isPending;

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <FlowsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        totalFlows={filteredFlows.length}
      />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('flows.errors.loadFailed')}
            <Button
              variant="link"
              className="ml-2 h-auto p-0"
              onClick={() => refetch()}
            >
              {t('flows.errors.retry')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && !error && (
        <>
          {flows.length === 0 ? (
            <FlowsEmptyState />
          ) : (
            <>
              <FlowsStats flows={flows} />
              {filteredFlows.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    {t('flows.errors.noMatch')}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFlows.map((flow) => (
                    <FlowCard
                      key={flow.id}
                      flow={flow}
                      onToggleStatus={handleToggleStatus}
                      onDuplicate={handleDuplicate}
                      onDelete={handleDeleteClick}
                      onExecute={handleExecute}
                      isLoading={isAnyMutationLoading}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('common.deleteDialog.title')}
        description={t('common.deleteDialog.description')}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
