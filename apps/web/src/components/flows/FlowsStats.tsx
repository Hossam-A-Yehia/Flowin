"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flow } from "@/types/flow";
import { Activity, CheckCircle2, XCircle, Workflow } from "lucide-react";

interface FlowsStatsProps {
  flows: Flow[];
}

export function FlowsStats({ flows }: FlowsStatsProps) {
  const stats = {
    total: flows.length,
    active: flows.filter((f) => f.isActive).length,
    paused: flows.filter((f) => !f.isActive).length,
    totalExecutions: flows.reduce((sum, f) => sum + f.totalRuns, 0),
    successfulExecutions: flows.reduce((sum, f) => sum + f.successfulRuns, 0),
    failedExecutions: flows.reduce((sum, f) => sum + f.failedRuns, 0),
  };

  const successRate = stats.totalExecutions > 0
    ? Math.round((stats.successfulExecutions / stats.totalExecutions) * 100)
    : 0;

  const statCards = [
    {
      label: "Total Flows",
      value: stats.total,
      icon: Workflow,
      description: `${stats.active} active, ${stats.paused} paused`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Executions",
      value: stats.totalExecutions,
      icon: Activity,
      description: "All time runs",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Successful",
      value: stats.successfulExecutions,
      icon: CheckCircle2,
      description: `${successRate}% success rate`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Failed",
      value: stats.failedExecutions,
      icon: XCircle,
      description: "Needs attention",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-bold tracking-tight">
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
