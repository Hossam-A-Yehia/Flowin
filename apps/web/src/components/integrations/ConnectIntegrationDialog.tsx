"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Integration } from "@/types/integration";
import { useConnectIntegration } from "@/hooks/useIntegrations";
import { getLocalizedIntegration } from "@/utils/integrationLocalization";
import { getIntegrationGuide, hasSetupGuide } from "@/data/integrationGuides";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ExternalLink, AlertCircle, BookOpen, HelpCircle } from "lucide-react";
import { SetupGuideDialog } from "./SetupGuideDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConnectIntegrationDialogProps {
  integration: Integration;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectIntegrationDialog({
  integration,
  open,
  onOpenChange,
}: ConnectIntegrationDialogProps) {
  const { t } = useTranslation();
  const connectMutation = useConnectIntegration();

  // Get localized integration data
  const localizedIntegration = useMemo(
    () => getLocalizedIntegration(integration, t),
    [integration, t]
  );

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [error, setError] = useState("");
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const integrationGuide = useMemo(
    () => getIntegrationGuide(integration.name),
    [integration.name]
  );
  const hasGuide = hasSetupGuide(integration.name);

  const handleConnect = async () => {
    setError("");

    // Validate based on auth type
    let credentials: Record<string, any> = {};

    switch (integration.authType) {
      case "API_KEY":
        if (!apiKey.trim()) {
          setError(t("integrations.errors.apiKeyRequired"));
          return;
        }
        credentials = {
          apiKey: apiKey.trim(),
          ...(apiSecret.trim() && { apiSecret: apiSecret.trim() }),
        };
        break;

      case "WEBHOOK":
        if (!webhookUrl.trim()) {
          setError(t("integrations.errors.webhookUrlRequired"));
          return;
        }
        // Validate URL format
        try {
          new URL(webhookUrl);
          credentials = { webhookUrl: webhookUrl.trim() };
        } catch {
          setError(t("integrations.errors.invalidUrl"));
          return;
        }
        break;

      case "OAUTH2":
        // For OAuth2, we'll redirect to the OAuth flow
        // This is a placeholder - you'll need to implement OAuth flow
        setError(t("integrations.errors.oauthNotImplemented"));
        return;

      default:
        setError(t("integrations.errors.unsupportedAuthType"));
        return;
    }

    try {
      await connectMutation.mutateAsync({
        integrationId: integration.id,
        credentials,
      });
      setApiKey("");
      setApiSecret("");
      setWebhookUrl("");
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t("integrations.errors.connectionFailed"));
    }
  };

  const handleClose = () => {
    setApiKey("");
    setApiSecret("");
    setWebhookUrl("");
    setError("");
    setShowSetupGuide(false);
    onOpenChange(false);
  };

  const handleOpenGuide = () => {
    setShowSetupGuide(true);
  };

  const handleGuideComplete = () => {
    setShowSetupGuide(false);
    // Keep the main dialog open so user can enter credentials
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {t("integrations.connect")} {localizedIntegration.displayName}
              </span>
              {hasGuide && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleOpenGuide}
                        className="h-8 gap-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        {t("integrations.setupGuide.button")}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("integrations.setupGuide.tooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </DialogTitle>
            <DialogDescription>
              {localizedIntegration.description}
            </DialogDescription>
          </DialogHeader>

        <div className="space-y-4 py-4">
          {integration.authType === "API_KEY" && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="apiKey">
                    {t("integrations.form.apiKey")} *
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{t("integrations.form.apiKeyTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder={t("integrations.form.apiKeyPlaceholder")}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={connectMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="apiSecret">
                    {t("integrations.form.apiSecret")}{" "}
                    <span className="text-muted-foreground">
                      ({t("integrations.form.optional")})
                    </span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{t("integrations.form.apiSecretTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="apiSecret"
                  type="password"
                  placeholder={t("integrations.form.apiSecretPlaceholder")}
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  disabled={connectMutation.isPending}
                />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p>{t("integrations.form.apiKeyHelp")}</p>
                    <div className="flex flex-wrap gap-2">
                      {hasGuide && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleOpenGuide}
                          className="h-7 text-xs"
                        >
                          <BookOpen className="mr-1 h-3 w-3" />
                          {t("integrations.form.viewGuide")}
                        </Button>
                      )}
                      {integration.websiteUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(integration.websiteUrl, '_blank')}
                          className="h-7 text-xs"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          {t("integrations.form.getApiKey")}
                        </Button>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </>
          )}
          {integration.authType === "WEBHOOK" && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="webhookUrl">
                    {t("integrations.form.webhookUrl")} *
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{t("integrations.form.webhookUrlTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="webhookUrl"
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  disabled={connectMutation.isPending}
                />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p>{t("integrations.form.webhookHelp")}</p>
                    <div className="flex flex-wrap gap-2">
                      {hasGuide && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleOpenGuide}
                          className="h-7 text-xs"
                        >
                          <BookOpen className="mr-1 h-3 w-3" />
                          {t("integrations.form.viewGuide")}
                        </Button>
                      )}
                      {integration.websiteUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(integration.websiteUrl, '_blank')}
                          className="h-7 text-xs"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          {t("integrations.form.learnMore")}
                        </Button>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </>
          )}
          {integration.authType === "OAUTH2" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("integrations.form.oauthComingSoon")}
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={connectMutation.isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleConnect}
            disabled={connectMutation.isPending || integration.authType === "OAUTH2"}
          >
            {connectMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("integrations.connecting")}
              </>
            ) : (
              t("integrations.connect")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Setup Guide Dialog */}
    {integrationGuide && (
      <SetupGuideDialog
        guide={integrationGuide}
        integrationDisplayName={localizedIntegration.displayName}
        open={showSetupGuide}
        onOpenChange={setShowSetupGuide}
        onComplete={handleGuideComplete}
      />
    )}
    </>
  );
}
