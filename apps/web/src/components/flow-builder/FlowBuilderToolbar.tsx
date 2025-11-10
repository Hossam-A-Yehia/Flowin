"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Play,
  Settings,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useReactFlow } from "@xyflow/react";

interface FlowBuilderToolbarProps {
  onSave: () => void;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  flowName?: string;
  isEditMode?: boolean;
}

export function FlowBuilderToolbar({
  onSave,
  isSaving,
  hasUnsavedChanges,
  flowName,
  isEditMode = false,
}: FlowBuilderToolbarProps) {
  const { t } = useTranslation();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="h-16 border-b bg-card flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/flows" aria-label={t("common.back")}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        
        <Separator orientation="vertical" className="h-8" />
        
        <div>
          <h1 className="text-lg font-semibold">
            {isEditMode && flowName ? flowName : t("flowBuilder.title")}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isEditMode ? t("flowEdit.subtitle") || "Edit your automation workflow" : t("flowBuilder.subtitle")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled
          aria-label={t("flowBuilder.toolbar.undo")}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          disabled
          aria-label={t("flowBuilder.toolbar.redo")}
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-8" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => zoomIn()}
          aria-label={t("flowBuilder.toolbar.zoomIn")}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => zoomOut()}
          aria-label={t("flowBuilder.toolbar.zoomOut")}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fitView()}
          aria-label={t("flowBuilder.toolbar.fitView")}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-8" />

        <Button
          variant="outline"
          size="sm"
          disabled
          aria-label={t("flowBuilder.toolbar.testRun")}
        >
          <Play className="h-4 w-4 mr-2" />
          {t("flowBuilder.toolbar.testRun")}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("flowBuilder.toolbar.settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>

        <Button
          onClick={onSave}
          disabled={isSaving}
          className="min-w-24"
          aria-label={t("flowBuilder.toolbar.save")}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t("flowBuilder.toolbar.saving")}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {hasUnsavedChanges
                ? t("flowBuilder.toolbar.save")
                : t("flowBuilder.toolbar.saved")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
