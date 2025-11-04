"use client";

import { useTranslation } from "react-i18next";
import { Flow, parseTags } from "@/types/flow";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Play, 
  Pause, 
  Copy, 
  Trash2, 
  MoreVertical, 
  Edit,
  Calendar,
  Activity,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FlowCardProps {
  flow: Flow;
  onToggleStatus?: (id: string, currentStatus: boolean) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExecute?: (id: string) => void;
  isLoading?: boolean;
}

export function FlowCard({
  flow,
  onToggleStatus,
  onDuplicate,
  onDelete,
  onExecute,
  isLoading = false,
}: FlowCardProps) {
  const { t } = useTranslation();
  const successRate = flow.totalRuns > 0 
    ? Math.round((flow.successfulRuns / flow.totalRuns) * 100) 
    : 0;

  const getTriggerBadgeColor = (triggerType: string) => {
    switch (triggerType) {
      case "webhook":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "schedule":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "manual":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-200 hover:border-primary/50",
      !flow.isActive && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg truncate">
                <Link 
                  href={`/flows/${flow.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {flow.name}
                </Link>
              </CardTitle>
              {flow.isActive ? (
                <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  {t('flows.status.active')}
                </Badge>
              ) : (
                <Badge variant="secondary">{t('flows.status.paused')}</Badge>
              )}
            </div>
            {flow.description && (
              <CardDescription className="line-clamp-2">
                {flow.description}
              </CardDescription>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isLoading}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">{t('flows.card.openMenu')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/flows/${flow.id}`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  {t('flows.card.editFlow')}
                </Link>
              </DropdownMenuItem>
              
              {flow.isActive && onExecute && (
                <DropdownMenuItem 
                  onClick={() => onExecute(flow.id)}
                  disabled={isLoading}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t('flows.card.executeNow')}
                </DropdownMenuItem>
              )}

              {onToggleStatus && (
                <DropdownMenuItem 
                  onClick={() => onToggleStatus(flow.id, flow.isActive)}
                  disabled={isLoading}
                >
                  {flow.isActive ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      {t('flows.card.pauseFlow')}
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      {t('flows.card.activateFlow')}
                    </>
                  )}
                </DropdownMenuItem>
              )}

              {onDuplicate && (
                <DropdownMenuItem 
                  onClick={() => onDuplicate(flow.id)}
                  disabled={isLoading}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {t('flows.card.duplicate')}
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(flow.id)}
                  disabled={isLoading}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('flows.card.delete')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={getTriggerBadgeColor(flow.triggerType)}>
            {flow.triggerType}
          </Badge>
          {parseTags(flow.tags).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs mb-1">{t('flows.card.totalRuns')}</span>
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{flow.totalRuns}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs mb-1">{t('flows.card.success')}</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-500">
                {flow.successfulRuns}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs mb-1">{t('flows.card.failed')}</span>
            <div className="flex items-center gap-1">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="font-semibold text-destructive">
                {flow.failedRuns}
              </span>
            </div>
          </div>
        </div>

        {flow.totalRuns > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{t('flows.card.successRate')}</span>
              <span className="font-medium">{successRate}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {t('flows.card.created')} {formatDistanceToNow(new Date(flow.createdAt), { addSuffix: true })}
            </span>
          </div>
          {flow.lastRun && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {t('flows.card.lastRun')} {formatDistanceToNow(new Date(flow.lastRun), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
