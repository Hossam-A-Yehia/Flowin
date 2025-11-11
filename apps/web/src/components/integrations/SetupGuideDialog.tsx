"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IntegrationGuide, SetupStep } from "@/data/integrationGuides";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Video,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SetupGuideDialogProps {
  guide: IntegrationGuide;
  integrationDisplayName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function SetupGuideDialog({
  guide,
  integrationDisplayName,
  open,
  onOpenChange,
  onComplete,
}: SetupGuideDialogProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleNext = () => {
    if (currentStep < guide.steps.length - 1) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleComplete = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    onComplete?.();
    onOpenChange(false);
  };

  const handleClose = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    onOpenChange(false);
  };

  const currentStepData = guide.steps[currentStep];
  const isLastStep = currentStep === guide.steps.length - 1;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">
                {t("integrations.setupGuide.title")} {integrationDisplayName}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {t("integrations.setupGuide.description")}
              </DialogDescription>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge className={getDifficultyColor(guide.difficulty)}>
                {t(`integrations.setupGuide.difficulty.${guide.difficulty}`)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{t(guide.estimatedTimeKey)}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Prerequisites */}
        {guide.prerequisitesKeys && guide.prerequisitesKeys.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">
                {t("integrations.setupGuide.prerequisites")}:
              </div>
              <ul className="list-disc list-inside space-y-1">
                {guide.prerequisitesKeys.map((prereqKey: string, index: number) => (
                  <li key={index} className="text-sm">
                    {t(prereqKey)}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Video Tutorial */}
        {guide.videoUrl && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(guide.videoUrl, '_blank')}
          >
            <Video className="mr-2 h-4 w-4" />
            {t("integrations.setupGuide.watchVideo")}
          </Button>
        )}

        {/* Step Progress Indicator */}
        <div className="flex items-center gap-2 py-4">
          {guide.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={cn(
                "flex-1 h-2 rounded-full transition-all",
                index === currentStep
                  ? "bg-primary"
                  : completedSteps.has(index)
                  ? "bg-green-500"
                  : "bg-muted hover:bg-muted-foreground/20"
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Current Step Content */}
        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                {currentStep + 1}
              </div>
              <h3 className="text-lg font-semibold">
                {t(currentStepData.titleKey)}
              </h3>
            </div>
            <p className="text-muted-foreground pl-10">
              {t(currentStepData.descriptionKey)}
            </p>
          </div>

          {/* Step Image */}
          {currentStepData.imageUrl && (
            <div className="pl-10">
              <img
                src={currentStepData.imageUrl}
                alt={t(currentStepData.titleKey)}
                className="rounded-lg border w-full"
              />
            </div>
          )}

          {/* External Link */}
          {currentStepData.externalLink && (
            <div className="pl-10">
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open(currentStepData.externalLink!.url, '_blank')
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t(currentStepData.externalLink.labelKey)}
              </Button>
            </div>
          )}

          {/* Tips */}
          {currentStepData.tipsKeys && currentStepData.tipsKeys.length > 0 && (
            <Alert className="ml-10">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">
                  {t("integrations.setupGuide.tips")}:
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {currentStepData.tipsKeys.map((tipKey: string, index: number) => (
                    <li key={index} className="text-sm">
                      {t(tipKey)}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Troubleshooting (shown on last step) */}
          {isLastStep && guide.troubleshootingKeys && guide.troubleshootingKeys.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <AlertTriangle className="h-5 w-5" />
                  {t("integrations.setupGuide.troubleshooting")}
                </div>
                {guide.troubleshootingKeys.map((item: { issueKey: string; solutionKey: string }, index: number) => (
                  <Alert key={index} variant="default">
                    <AlertDescription>
                      <div className="font-semibold mb-1">{t(item.issueKey)}</div>
                      <div className="text-sm">{t(item.solutionKey)}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("common.previous")}
          </Button>

          <div className="text-sm text-muted-foreground">
            {t("integrations.setupGuide.stepProgress", {
              current: currentStep + 1,
              total: guide.steps.length,
            })}
          </div>

          {isLastStep ? (
            <Button onClick={handleComplete}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {t("integrations.setupGuide.complete")}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {t("common.next")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
