"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Integration, UserIntegration } from "@/types/integration";
import {
  useDisconnectIntegration,
  useTestIntegration,
} from "@/hooks/useIntegrations";
import { getLocalizedIntegration, getLocalizedCategory } from "@/utils/integrationLocalization";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  Circle,
  MoreVertical,
  ExternalLink,
  TestTube,
  Unplug,
  Settings,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { ConnectIntegrationDialog } from "./ConnectIntegrationDialog";

interface IntegrationCardProps {
  integration: Integration;
  isConnected: boolean;
  userIntegration?: UserIntegration;
}

export function IntegrationCard({
  integration,
  isConnected,
  userIntegration,
}: IntegrationCardProps) {
  const { t } = useTranslation();
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  // Get localized integration data based on current language
  const localizedIntegration = useMemo(
    () => getLocalizedIntegration(integration, t),
    [integration, t]
  );

  const disconnectMutation = useDisconnectIntegration();
  const testMutation = useTestIntegration();

  const handleConnect = () => {
    setShowConnectDialog(true);
  };

  const handleDisconnect = async () => {
    if (!userIntegration) return;
    await disconnectMutation.mutateAsync(userIntegration.id);
  };

  const handleTest = async () => {
    if (!userIntegration) return;
    await testMutation.mutateAsync(userIntegration.id);
  };

  const isLoading =
    disconnectMutation.isPending ||
    testMutation.isPending;

  return (
    <>
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {integration.iconUrl ? (
                <Image
                  src={integration.iconUrl}
                  alt={`${localizedIntegration.displayName} icon`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {localizedIntegration.displayName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {localizedIntegration.displayName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getLocalizedCategory(integration.category, t)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={isConnected ? "default" : "secondary"}
              className="gap-1"
            >
              {isConnected ? (
                <>
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  {t("integrations.status.connected") || "Connected"}
                </>
              ) : (
                <>
                  <Circle className="h-3 w-3" aria-hidden="true" />
                  {t("integrations.status.available") || "Available"}
                </>
              )}
            </Badge>

            {isConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={t("integrations.card.menu") || "Integration menu"}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleTest} disabled={isLoading}>
                    <TestTube className="mr-2 h-4 w-4" />
                    {t("integrations.card.test") || "Test Connection"}
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    {t("integrations.card.settings") || "Settings"}
                  </DropdownMenuItem>
                  {integration.websiteUrl && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a
                          href={integration.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("integrations.card.visitWebsite") || "Visit Website"}
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleDisconnect}
                    disabled={isLoading}
                    className="text-destructive focus:text-destructive"
                  >
                    <Unplug className="mr-2 h-4 w-4" />
                    {t("integrations.card.disconnect") || "Disconnect"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {localizedIntegration.description || t("integrations.card.noDescription") || "No description available"}
        </p>

        {isConnected && userIntegration && (
          <div className="text-xs text-muted-foreground space-y-1 mb-4">
            <div className="flex justify-between">
              <span>{t("integrations.card.usageCount") || "Usage"}:</span>
              <span className="font-medium">{userIntegration.usageCount}</span>
            </div>
            {userIntegration.lastSync && (
              <div className="flex justify-between">
                <span>{t("integrations.card.lastSync") || "Last Sync"}:</span>
                <span className="font-medium">
                  {new Date(userIntegration.lastSync).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {isConnected ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDisconnect}
            disabled={isLoading}
          >
            {isLoading && disconnectMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("integrations.card.disconnecting") || "Disconnecting..."}
              </>
            ) : (
              <>
                <Unplug className="mr-2 h-4 w-4" />
                {t("integrations.card.disconnect") || "Disconnect"}
              </>
            )}
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("integrations.card.connecting") || "Connecting..."}
              </>
            ) : (
              t("integrations.card.connect") || "Connect"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>

    <ConnectIntegrationDialog
      integration={integration}
      open={showConnectDialog}
      onOpenChange={setShowConnectDialog}
    />
    </>
  );
}
