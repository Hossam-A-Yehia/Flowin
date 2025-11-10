import { Metadata } from "next";
import { FlowEditClient } from "@/components/flow-edit/FlowEditClient";
import { FlowEditMetadata } from "@/metadata/FlowEditMetadata";
import { BASE_URL } from "@/metadata/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
    const baseMetadata = FlowEditMetadata.en;
  
  return {
    ...baseMetadata,
    title: `Edit Flow - Flowin`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: `${BASE_URL}/flows/${id}`,
    },
    alternates: {
      canonical: `${BASE_URL}/flows/${id}`,
      languages: {
        "en-US": `${BASE_URL}/flows/${id}`,
        "ar-SA": `${BASE_URL}/ar/flows/${id}`,
      },
    },
  };
}

export default async function FlowEditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  return <FlowEditClient flowId={id} />;
}
