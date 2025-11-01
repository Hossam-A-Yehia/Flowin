"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/il8n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    
    if (currentLang === "ar") {
      document.body.classList.add("font-cairo");
      document.body.classList.remove("font-geist");
    } else {
      document.body.classList.add("font-geist");
      document.body.classList.remove("font-cairo");
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="relative">
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </I18nextProvider>
  );
}
