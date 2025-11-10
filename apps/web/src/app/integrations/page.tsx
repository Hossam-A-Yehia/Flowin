import { Metadata } from "next";
import { IntegrationsClient } from "@/components/integrations/IntegrationsClient";
import { IntegrationsMetadata } from "@/metadata/IntegrationsMetadata";

export const metadata: Metadata = IntegrationsMetadata.en;

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}
