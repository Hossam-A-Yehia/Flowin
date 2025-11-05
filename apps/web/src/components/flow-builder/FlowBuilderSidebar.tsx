"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Play,
  GitBranch,
  Clock,
  Webhook,
  Sparkles,
  Search,
} from "lucide-react";

interface FlowBuilderSidebarProps {
  onAddNode: (type: string) => void;
}

const nodeTypes = [
  {
    type: "trigger",
    icon: Zap,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    type: "action",
    icon: Play,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    type: "condition",
    icon: GitBranch,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    type: "delay",
    icon: Clock,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    type: "webhook",
    icon: Webhook,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    type: "ai",
    icon: Sparkles,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

export function FlowBuilderSidebar({ onAddNode }: FlowBuilderSidebarProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNodes = nodeTypes.filter((node) =>
    t(`flowBuilder.sidebar.nodeTypes.${node.type}`)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">{t("flowBuilder.sidebar.nodes")}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("flowBuilder.sidebar.searchNodes")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {filteredNodes.map((node) => {
            const Icon = node.icon;
            return (
              <Card
                key={node.type}
                className={`p-4 cursor-move hover:shadow-md transition-shadow ${node.bgColor} border-2 border-transparent hover:border-primary/20`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/reactflow", node.type);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onClick={() => onAddNode(node.type)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onAddNode(node.type);
                  }
                }}
                aria-label={`Add ${t(
                  `flowBuilder.sidebar.nodeTypes.${node.type}`
                )} node`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${node.bgColor}`}>
                    <Icon className={`h-5 w-5 ${node.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">
                      {t(`flowBuilder.sidebar.nodeTypes.${node.type}`)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {t(`flowBuilder.nodes.${node.type}.description`)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
