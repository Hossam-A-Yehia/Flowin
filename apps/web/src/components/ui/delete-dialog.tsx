"use client";

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
import { Loader2 } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  isLoading = false,
  confirmText,
  cancelText,
}: DeleteDialogProps) {
  const { t } = useTranslation();
  
  const finalTitle = title || t('common.deleteDialog.title');
  const finalDescription = description || t('common.deleteDialog.description');
  const finalConfirmText = confirmText || t('common.deleteDialog.confirm');
  const finalCancelText = cancelText || t('common.deleteDialog.cancel');
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent >
        <DialogHeader>
          <DialogTitle>{finalTitle}</DialogTitle>
          <DialogDescription>{finalDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {finalCancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('common.deleteDialog.deleting')}
              </>
            ) : (
              finalConfirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
