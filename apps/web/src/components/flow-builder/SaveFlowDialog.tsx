"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface SaveFlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    name: string;
    description?: string;
    tags?: string[];
    triggerType: "webhook" | "schedule" | "manual";
  }) => void;
  isLoading: boolean;
  initialData?: {
    name?: string;
    description?: string;
    tags?: string[];
    triggerType?: "webhook" | "schedule" | "manual";
  };
  isEditMode?: boolean;
}

export function SaveFlowDialog({
  open,
  onOpenChange,
  onSave,
  isLoading,
  initialData,
  isEditMode = false,
}: SaveFlowDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [tags, setTags] = useState(
    initialData?.tags ? initialData.tags.join(", ") : ""
  );
  const [triggerType, setTriggerType] = useState<
    "webhook" | "schedule" | "manual"
  >(initialData?.triggerType || "manual");

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      triggerType,
    });
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("flowBuilder.dialogs.save.title")}</DialogTitle>
          <DialogDescription>
            {t("flowBuilder.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="flow-name">
              {t("flowBuilder.dialogs.save.name")} *
            </Label>
            <Input
              id="flow-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("flowBuilder.untitled")}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="flow-description">
              {t("flowBuilder.dialogs.save.description")}
            </Label>
            <Textarea
              id="flow-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("flowBuilder.dialogs.save.description")}
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger-type">
              {t("flowBuilder.dialogs.save.triggerType")} *
            </Label>
            <Select
              value={triggerType}
              onValueChange={(value: any) => setTriggerType(value)}
              disabled={isLoading}
            >
              <SelectTrigger id="trigger-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">
                  {t("flows.triggerType.manual")}
                </SelectItem>
                <SelectItem value="webhook">
                  {t("flows.triggerType.webhook")}
                </SelectItem>
                <SelectItem value="schedule">
                  {t("flows.triggerType.schedule")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flow-tags">
              {t("flowBuilder.dialogs.save.tags")}
            </Label>
            <Input
              id="flow-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="automation, ecommerce, ..."
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            {t("flowBuilder.dialogs.save.cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("flowBuilder.toolbar.saving")}
              </>
            ) : (
              t("flowBuilder.dialogs.save.save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
