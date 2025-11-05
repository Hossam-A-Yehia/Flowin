"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Play,
  GitBranch,
  Clock,
  Webhook,
  Sparkles,
} from "lucide-react";

export const TriggerNode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-green-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2 bg-green-500/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-green-500/10">
            <Zap className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "Trigger"}</h3>
          </div>
          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
            Start
          </Badge>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background"
      />
    </Card>
  );
});

TriggerNode.displayName = "TriggerNode";

export const ActionNode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-blue-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-500/10">
            <Play className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "Action"}</h3>
          </div>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-background"
      />
    </Card>
  );
});

ActionNode.displayName = "ActionNode";

export const ConditionNode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-amber-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-500/10">
            <GitBranch className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "Condition"}</h3>
          </div>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !w-3 !h-3 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background !-bottom-1 !left-1/4"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="!bg-red-500 !w-3 !h-3 !border-2 !border-background !-bottom-1 !right-1/4"
      />
    </Card>
  );
});

ConditionNode.displayName = "ConditionNode";

export const DelayNode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-purple-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-purple-500/10">
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "Delay"}</h3>
          </div>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-background"
      />
    </Card>
  );
});

DelayNode.displayName = "DelayNode";

export const WebhookNode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-pink-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-pink-500/10">
            <Webhook className="h-4 w-4 text-pink-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "Webhook"}</h3>
          </div>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-pink-500 !w-3 !h-3 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-pink-500 !w-3 !h-3 !border-2 !border-background"
      />
    </Card>
  );
});

WebhookNode.displayName = "WebhookNode";

export const AINode = memo(({ data, selected }: any) => {
  return (
    <Card
      className={`min-w-[200px] transition-all ${
        selected ? "ring-2 ring-cyan-500 shadow-lg" : "shadow-md"
      }`}
    >
      <div className="p-3 space-y-2 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-cyan-500/10">
            <Sparkles className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{data.label || "AI"}</h3>
          </div>
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
            AI
          </Badge>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-background"
      />
    </Card>
  );
});

AINode.displayName = "AINode";

export const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
  webhook: WebhookNode,
  ai: AINode,
};
