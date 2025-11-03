import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Flowin - AI-Powered No-Code Automation Platform",
    template: "%s | Flowin"
  },
  description: "Connect Google Sheets, WhatsApp, Notion & more. Build powerful automations in minutes with our AI-driven, no-code platform. Arabic & English support. Start free today!",
  keywords: [
    "automation", "no-code", "workflow", "AI", "Arabic", "integration", 
    "Google Sheets", "WhatsApp", "Notion", "Zapier alternative", "workflow automation",
    "business automation", "freelancer tools", "small business", "productivity"
  ],
  authors: [{ name: "Flowin Team" }],
  creator: "Flowin",
  publisher: "Flowin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AE", "ar_SA"],
    url: "https://flowin.com",
    siteName: "Flowin",
    title: "Flowin - AI-Powered No-Code Automation Platform",
    description: "Connect your favorite tools and automate workflows in minutes. No coding required. Arabic & English support.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flowin - AI-Powered Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@flowin",
    creator: "@flowin",
    title: "Flowin - AI-Powered No-Code Automation Platform",
    description: "Connect your favorite tools and automate workflows in minutes. No coding required.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://flowin.com",
    languages: {
      "en-US": "https://flowin.com",
      "ar-AE": "https://flowin.com/ar",
    },
  },
  category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('lang')?.value || 'en';
  const dir = langCookie === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={langCookie} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased`}
      >
        <QueryProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
