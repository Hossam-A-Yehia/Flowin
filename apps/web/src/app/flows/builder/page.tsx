import { Metadata } from "next";
import { FlowBuilderMetadata } from "@/metadata/FlowBuilderMetadata";
import { DynamicMetadata } from "@/components/DynamicMetadata";
import { FlowBuilderClient } from "@/components/flow-builder/FlowBuilderClient";

export const metadata: Metadata = FlowBuilderMetadata.en;

export default function FlowBuilderPage() {
  return (
    <>
      <DynamicMetadata page="flow-builder" />
      <FlowBuilderClient />
    </>
  );
}
