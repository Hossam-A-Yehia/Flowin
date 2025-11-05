"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { FlowBuilderToolbar } from "./FlowBuilderToolbar";
import { FlowBuilderSidebar } from "./FlowBuilderSidebar";
import { FlowBuilderProperties } from "./FlowBuilderProperties";
import { SaveFlowDialog } from "./SaveFlowDialog";
import { toast } from "sonner";
import { useCreateFlow } from "@/hooks/useFlows";
import { nodeTypes } from "./nodes";

interface FlowBuilderClientProps {
  flowId?: string; 
}

function FlowBuilderContent({ flowId }: FlowBuilderClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const createFlowMutation = useCreateFlow();

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      setHasUnsavedChanges(true);
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onNodeDragStop = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const onNodesDelete = useCallback(() => {
    setHasUnsavedChanges(true);
    toast.success(t("flowBuilder.toast.nodeDeleted"));
  }, [t]);

  const handleAddNode = useCallback(
    (type: string) => {
      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: type.toLowerCase(),
        position: { x: 250, y: 250 },
        data: {
          label: t(`flowBuilder.nodes.${type.toLowerCase()}.title`),
          type,
          config: {},
        },
      };

      setNodes((nds) => [...nds, newNode] as any);
      setHasUnsavedChanges(true);
      toast.success(t("flowBuilder.toast.nodeCopied"));
    },
    [setNodes, t]
  );

  const handleUpdateNode = useCallback(
    (nodeId: string, updates: Partial<Node>) => {
      setNodes((nds) =>
        nds.map((node: any) =>
          node.id === nodeId ? { ...node, ...updates } : node
        ) as any
      );
      setHasUnsavedChanges(true);
    },
    [setNodes]
  );

  const handleSave = useCallback(
    async (flowData: {
      name: string;
      description?: string;
      tags?: string[];
      triggerType: "webhook" | "schedule" | "manual";
    }) => {
      try {
        setIsSaving(true);

        if (nodes.length === 0) {
          toast.error(t("flowBuilder.validation.nodesRequired"));
          return;
        }

        const hasTrigger = nodes.some((node: Node) => node.type === "trigger");
        if (!hasTrigger) {
          toast.error(t("flowBuilder.validation.triggerRequired"));
          return;
        }

        const flowPayload = {
          name: flowData.name,
          description: flowData.description,
          triggerType: flowData.triggerType,
          tags: flowData.tags,
          nodes: nodes.map((node: Node) => ({
            id: node.id,
            type: node.type?.toUpperCase() || "ACTION",
            name: (node.data as any).label || "Untitled Node",
            description: (node.data as any).description,
            config: (node.data as any).config || {},
            position: node.position,
            integrationId: (node.data as any).integrationId,
            isEnabled: (node.data as any).isEnabled !== false,
          })),
          edges: edges.map((edge: Edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            condition: (edge.data as any)?.condition,
          })),
        };

        await createFlowMutation.mutateAsync(flowPayload as any);
        
        setHasUnsavedChanges(false);
        setSaveDialogOpen(false);
        toast.success(t("flowBuilder.toast.saved"));
        
       router.push("/flows");
      } catch (error) {
        console.error("Failed to save flow:", error);
        toast.error(t("flowBuilder.toast.saveError"));
      } finally {
        setIsSaving(false);
      }
    },
    [nodes, edges, createFlowMutation, t, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setSaveDialogOpen(true);
      }

      // Delete: Delete/Backspace
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedNode &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setNodes((nds) => nds.filter((node: any) => node.id !== selectedNode.id) as any);
        setSelectedNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, setNodes]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <FlowBuilderToolbar
        onSave={() => setSaveDialogOpen(true)}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="flex-1 flex overflow-hidden">
        <FlowBuilderSidebar onAddNode={handleAddNode} />
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
            fitView
            attributionPosition="bottom-left"
            className="bg-background"
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "trigger":
                    return "#10b981";
                  case "action":
                    return "#3b82f6";
                  case "condition":
                    return "#f59e0b";
                  case "delay":
                    return "#8b5cf6";
                  case "webhook":
                    return "#ec4899";
                  case "ai":
                    return "#06b6d4";
                  default:
                    return "#6b7280";
                }
              }}
              className="bg-background border border-border"
            />
            
            {nodes.length === 0 && (
              <Panel position="top-center" className="pointer-events-none">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                  <p className="text-muted-foreground text-center">
                    {t("flowBuilder.canvas.emptyState")}
                  </p>
                </div>
              </Panel>
            )}
          </ReactFlow>
        </div>

        <FlowBuilderProperties
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
        />
      </div>
      <SaveFlowDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSave}
        isLoading={isSaving}
      />
    </div>
  );
}

export function FlowBuilderClient(props: FlowBuilderClientProps) {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent {...props} />
    </ReactFlowProvider>
  );
}
