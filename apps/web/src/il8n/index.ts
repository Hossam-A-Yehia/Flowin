import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const getDeviceLanguage = (): string => {
  if (typeof window === "undefined") return "en";
  
  const savedLanguage = localStorage.getItem("appLanguage");
  if (savedLanguage) return savedLanguage;
  
  const browserLanguage = navigator.language || (navigator as any).userLanguage;
  
  const languageCode = browserLanguage.split('-')[0].toLowerCase();
  
  const supportedLanguages = ['en', 'ar'];
  return supportedLanguages.includes(languageCode) ? languageCode : 'en';
};

const detectedLanguage = getDeviceLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: detectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
