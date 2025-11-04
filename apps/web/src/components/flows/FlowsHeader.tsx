"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, SortAsc, Sparkles } from "lucide-react";
import Link from "next/link";
import { FlowFilters } from "@/types/flow";

interface FlowsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FlowFilters;
  onFiltersChange: (filters: FlowFilters) => void;
  totalFlows: number;
}

export function FlowsHeader({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  totalFlows,
}: FlowsHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('flows.title')}</h1>
          <p className="text-muted-foreground">
            {t('flows.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/flows/templates">
              <Sparkles className="mr-2 h-4 w-4" />
              {t('flows.templates')}
            </Link>
          </Button>
          
          <Button asChild>
            <Link href="/flows/builder">
              <Plus className="mr-2 h-4 w-4" />
              {t('flows.createFlow')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('flows.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default">
                <Filter className="mr-2 h-4 w-4" />
                {t('flows.filter')}
                {(filters.status !== "all" || filters.triggerType !== "all") && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {[
                      filters.status !== "all" ? 1 : 0,
                      filters.triggerType !== "all" ? 1 : 0,
                    ].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('flows.status.active')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "all" })}
              >
                <span className={filters.status === "all" ? "font-semibold" : ""}>
                  {t('flows.status.all')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "active" })}
              >
                <span className={filters.status === "active" ? "font-semibold" : ""}>
                  {t('flows.status.activeOnly')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "paused" })}
              >
                <span className={filters.status === "paused" ? "font-semibold" : ""}>
                  {t('flows.status.pausedOnly')}
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>{t('flows.triggerType.label')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "all" })}
              >
                <span className={filters.triggerType === "all" ? "font-semibold" : ""}>
                  {t('flows.triggerType.all')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "webhook" as any })}
              >
                <span className={filters.triggerType === "webhook" ? "font-semibold" : ""}>
                  {t('flows.triggerType.webhook')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "schedule" as any })}
              >
                <span className={filters.triggerType === "schedule" ? "font-semibold" : ""}>
                  {t('flows.triggerType.schedule')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "manual" as any })}
              >
                <span className={filters.triggerType === "manual" ? "font-semibold" : ""}>
                  {t('flows.triggerType.manual')}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default">
                <SortAsc className="mr-2 h-4 w-4" />
                {t('flows.sort')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t('flows.sortBy.label')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "updatedAt", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "updatedAt" ? "font-semibold" : ""}>
                  {t('flows.sortBy.recentlyUpdated')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "createdAt", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "createdAt" ? "font-semibold" : ""}>
                  {t('flows.sortBy.recentlyCreated')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "name", sortOrder: "asc" })}
              >
                <span className={filters.sortBy === "name" ? "font-semibold" : ""}>
                  {t('flows.sortBy.nameAZ')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "lastRun", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "lastRun" ? "font-semibold" : ""}>
                  {t('flows.sortBy.lastRun')}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {totalFlows > 0 && (
        <div className="text-sm text-muted-foreground">
          {t('flows.showing')} {totalFlows} {totalFlows === 1 ? t('flows.flow') : t('flows.flows')}
        </div>
      )}
    </div>
  );
}
