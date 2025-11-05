"use client";

import { useTranslation } from "react-i18next";
import { Node } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";

interface FlowBuilderPropertiesProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, updates: Partial<Node>) => void;
}

export function FlowBuilderProperties({
  selectedNode,
  onUpdateNode,
}: FlowBuilderPropertiesProps) {
  const { t } = useTranslation();

  if (!selectedNode) {
    return (
      <div className="w-80 border-l bg-card flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <Settings2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">{t("flowBuilder.sidebar.noSelection")}</p>
        </div>
      </div>
    );
  }

  const handleLabelChange = (value: string) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, label: value },
    });
  };

  const handleDescriptionChange = (value: string) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, description: value },
    });
  };

  const handleEnabledToggle = (checked: boolean) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, isEnabled: checked },
    });
  };

  return (
    <div className="w-80 border-l bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          {t("flowBuilder.sidebar.properties")}
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {selectedNode.type || "Node"}
                </span>
                <span className="text-xs text-muted-foreground">
                  #{selectedNode.id.slice(-8)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-name">
                {t("flowBuilder.properties.nodeName")}
              </Label>
              <Input
                id="node-name"
                value={(selectedNode.data as any).label || ""}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder={t("flowBuilder.untitled")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-description">
                {t("flowBuilder.properties.nodeDescription")}
              </Label>
              <Textarea
                id="node-description"
                value={(selectedNode.data as any).description || ""}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder={t("flowBuilder.properties.nodeDescription")}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="node-enabled" className="cursor-pointer">
                {(selectedNode.data as any).isEnabled !== false
                  ? t("flowBuilder.properties.enabled")
                  : t("flowBuilder.properties.disabled")}
              </Label>
              <Switch
                id="node-enabled"
                checked={(selectedNode.data as any).isEnabled !== false}
                onCheckedChange={handleEnabledToggle}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              {t("flowBuilder.properties.configuration")}
            </h3>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground text-center">
                  {t(`flowBuilder.nodes.${selectedNode.type || "action"}.description`)}
                </p>
              </CardContent>
            </Card>

            {selectedNode.type === "delay" && (
              <div className="space-y-2">
                <Label htmlFor="delay-duration">
                  {t("flowBuilder.nodes.delay.duration")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="delay-duration"
                    type="number"
                    placeholder="5"
                    min={1}
                    className="flex-1"
                  />
                  <select className="px-3 py-2 border rounded-md bg-background" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => console.log(e.target.value)}>
                    <option>{t("flowBuilder.nodes.delay.seconds")}</option>
                    <option>{t("flowBuilder.nodes.delay.minutes")}</option>
                    <option>{t("flowBuilder.nodes.delay.hours")}</option>
                  </select>
                </div>
              </div>
            )}

            {selectedNode.type === "condition" && (
              <div className="space-y-2">
                <Label>{t("flowBuilder.nodes.condition.if")}</Label>
                <Input placeholder="condition..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)} />
              </div>
            )}

            {selectedNode.type === "ai" && (
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">
                  {t("flowBuilder.nodes.ai.prompt")}
                </Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Enter AI prompt..."
                  rows={4}
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("flowBuilder.properties.advanced")}
            </h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Position:</span>
                <span>
                  X: {Math.round(selectedNode.position.x)}, Y:{" "}
                  {Math.round(selectedNode.position.y)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ID:</span>
                <span className="font-mono">{selectedNode.id}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
