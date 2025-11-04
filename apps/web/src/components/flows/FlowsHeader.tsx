"use client";

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
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flows</h1>
          <p className="text-muted-foreground">
            Manage and monitor your automation workflows
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/flows/templates">
              <Sparkles className="mr-2 h-4 w-4" />
              Templates
            </Link>
          </Button>
          
          <Button asChild>
            <Link href="/flows/builder">
              <Plus className="mr-2 h-4 w-4" />
              Create Flow
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search flows..."
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
                Filter
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
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "all" })}
              >
                <span className={filters.status === "all" ? "font-semibold" : ""}>
                  All Flows
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "active" })}
              >
                <span className={filters.status === "active" ? "font-semibold" : ""}>
                  Active Only
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, status: "paused" })}
              >
                <span className={filters.status === "paused" ? "font-semibold" : ""}>
                  Paused Only
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Trigger Type</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "all" })}
              >
                <span className={filters.triggerType === "all" ? "font-semibold" : ""}>
                  All Types
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "webhook" as any })}
              >
                <span className={filters.triggerType === "webhook" ? "font-semibold" : ""}>
                  Webhook
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "schedule" as any })}
              >
                <span className={filters.triggerType === "schedule" ? "font-semibold" : ""}>
                  Schedule
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, triggerType: "manual" as any })}
              >
                <span className={filters.triggerType === "manual" ? "font-semibold" : ""}>
                  Manual
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default">
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "updatedAt", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "updatedAt" ? "font-semibold" : ""}>
                  Recently Updated
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "createdAt", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "createdAt" ? "font-semibold" : ""}>
                  Recently Created
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "name", sortOrder: "asc" })}
              >
                <span className={filters.sortBy === "name" ? "font-semibold" : ""}>
                  Name (A-Z)
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFiltersChange({ ...filters, sortBy: "lastRun", sortOrder: "desc" })}
              >
                <span className={filters.sortBy === "lastRun" ? "font-semibold" : ""}>
                  Last Run
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {totalFlows > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {totalFlows} {totalFlows === 1 ? "flow" : "flows"}
        </div>
      )}
    </div>
  );
}
