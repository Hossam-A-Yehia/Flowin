"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
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

import { FlowBuilderToolbar } from "../flow-builder/FlowBuilderToolbar";
import { FlowBuilderSidebar } from "../flow-builder/FlowBuilderSidebar";
import { FlowBuilderProperties } from "../flow-builder/FlowBuilderProperties";
import { SaveFlowDialog } from "../flow-builder/SaveFlowDialog";
import { FlowEditSkeleton } from "./FlowEditSkeleton";
import { toast } from "sonner";
import { useFlow, useUpdateFlow } from "@/hooks/useFlows";
import { nodeTypes } from "../flow-builder/nodes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface FlowEditClientProps {
  flowId: string;
}

function FlowEditContent({ flowId }: FlowEditClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const {
    data: flowData,
    isLoading,
    isError,
    error,
  } = useFlow(flowId);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateFlowMutation = useUpdateFlow();

  useEffect(() => {
    if (flowData && !isInitialized) {
      try {
        const flowNodes = Array.isArray(flowData.nodes) 
          ? flowData.nodes.map((node: any) => ({
              id: node.id,
              type: node.type?.toLowerCase() || "action",
              position: node.position || { x: 0, y: 0 },
              data: {
                label: node.name || "Untitled Node",
                type: node.type,
                description: node.description,
                config: node.config || {},
                integrationId: node.integrationId,
                isEnabled: node.isEnabled !== false,
              },
            }))
          : [];

        const flowEdges = Array.isArray(flowData.edges)
          ? flowData.edges.map((edge: any) => ({
              id: edge.id,
              source: edge.source,
              target: edge.target,
              data: edge.condition ? { condition: edge.condition } : undefined,
            }))
          : [];

        setNodes(flowNodes as any);
        setEdges(flowEdges as any);
        setIsInitialized(true);
      } catch (err) {
        console.error("Error initializing flow:", err);
        toast.error(t("flowEdit.error.initializationFailed") || "Failed to load flow data");
      }
    }
  }, [flowData, isInitialized, setNodes, setEdges, t]);

  useEffect(() => {
    if (isInitialized && (nodes.length > 0 || edges.length > 0)) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges, isInitialized]);

  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find((node: any) => node.id === selectedNode.id);
      if (updatedNode) {
        setSelectedNode(updatedNode as Node);
      }
    }
  }, [nodes, selectedNode?.id]);

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
      toast.success(t("flowBuilder.toast.nodeAdded") || "Node added");
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
    async (flowDataInput: {
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
          name: flowDataInput.name,
          description: flowDataInput.description,
          triggerType: flowDataInput.triggerType,
          tags: flowDataInput.tags,
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

        await updateFlowMutation.mutateAsync({
          id: flowId,
          data: flowPayload as any,
        });

        setHasUnsavedChanges(false);
        setSaveDialogOpen(false);
        toast.success(t("flowEdit.toast.saved") || "Flow updated successfully");

        router.push("/flows");
      } catch (error) {
        console.error("Failed to update flow:", error);
        toast.error(t("flowEdit.toast.saveError") || "Failed to update flow");
      } finally {
        setIsSaving(false);
      }
    },
    [nodes, edges, flowId, updateFlowMutation, t]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setSaveDialogOpen(true);
      }

      // Escape: Close properties panel
      if (e.key === "Escape" && selectedNode) {
        setSelectedNode(null);
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

  if (isLoading) {
    return <FlowEditSkeleton />;
  }

  if (isError) {
    if ((error as any)?.response?.status === 404) {
      notFound();
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-6">
              <AlertCircle className="h-16 w-16 text-destructive" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {t("flowEdit.error.title") || "Failed to Load Flow"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("flowEdit.error.description") ||
                "We couldn't load your flow. Please try again."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => window.location.reload()} variant="default" size="lg">
              {t("flowEdit.error.retry") || "Try Again"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/flows" className="gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("flowEdit.error.backToFlows") || "Back to Flows"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!flowData) {
    notFound();
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <FlowBuilderToolbar
        onSave={() => setSaveDialogOpen(true)}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        flowName={flowData.name}
        isEditMode={true}
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
        initialData={{
          name: flowData.name,
          description: flowData.description || undefined,
          tags: flowData.tags 
            ? (typeof flowData.tags === 'string' ? JSON.parse(flowData.tags) : flowData.tags)
            : undefined,
          triggerType: flowData.triggerType as any,
        }}
        isEditMode={true}
      />

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {hasUnsavedChanges && "You have unsaved changes"}
        {isSaving && "Saving flow..."}
      </div>
    </div>
  );
}

export function FlowEditClient(props: FlowEditClientProps) {
  return (
    <ReactFlowProvider>
      <FlowEditContent {...props} />
    </ReactFlowProvider>
  );
}
