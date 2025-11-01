"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("appLanguage", languageCode);

    if (typeof document !== "undefined") {
      document.documentElement.dir = languageCode === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = languageCode;

      if (languageCode === "ar") {
        document.body.classList.add("font-cairo");
        document.body.classList.remove("font-geist");
      } else {
        document.body.classList.add("font-geist");
        document.body.classList.remove("font-cairo");
      }

      // Force a small delay to ensure i18n state is updated before DynamicMetadata reacts
      setTimeout(() => {
        // Trigger a custom event that DynamicMetadata can listen to
        window.dispatchEvent(
          new CustomEvent("languageChanged", {
            detail: { language: languageCode },
          })
        );
      }, 100);
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${
              currentLanguage.code === language.code ? "bg-accent" : ""
            }`}
          >
            <span className="mr-2 text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
