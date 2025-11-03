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
  title: "Flowin - Let your work flow effortlessly",
  description: "AI-driven, no-code automation platform to connect your favorite tools and automate workflows in minutes.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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
