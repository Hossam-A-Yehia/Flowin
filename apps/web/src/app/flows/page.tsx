import { Metadata } from "next";
import { FlowsListClient } from "@/components/flows/FlowsList";
import { DynamicMetadata } from "@/components/DynamicMetadata";
import { FlowsMetadata } from "@/metadata/FlowsMetadata";

export const metadata: Metadata = FlowsMetadata.en;

export default function FlowsPage() {
  return (
    <>
      <DynamicMetadata page="flows" />
      <FlowsListClient />
    </>
  );
}
