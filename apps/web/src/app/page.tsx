import { Metadata } from "next";
import NavigationWrapper from "@/components/NavigationWrapper";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Flowin - AI-Powered No-Code Automation Platform",
  description: "Connect Google Sheets, WhatsApp, Notion & more. Build powerful automations in minutes with our AI-driven, no-code platform. Arabic & English support. Start free today!",
  openGraph: {
    title: "Flowin - Let Your Work Flow Effortlessly",
    description: "The first Arabic-supported automation platform. Connect your tools, build workflows with AI, no coding required.",
    url: "https://flowin.com",
    type: "website",
  },
  alternates: {
    canonical: "https://flowin.com",
  },
};


export default async function Home() {
  
  return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <NavigationWrapper />
        <main role="main">
          <Hero />
          <section id="features" aria-labelledby="features-heading">
            <Features />
          </section>
          <section id="pricing" aria-labelledby="pricing-heading">
            <Pricing />
          </section>
          <CTA />
        </main>
        <Footer />
      </div>
  );
}
