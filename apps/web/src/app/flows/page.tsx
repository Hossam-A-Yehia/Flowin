import { Metadata } from "next";
import { getPageMetadata } from "@/metadata";
import { FlowsListClient } from "@/components/flows/FlowsList";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('flows');
}

export default function FlowsPage() {
  return <FlowsListClient />;
}
