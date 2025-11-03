"use client"

import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";

export default function NavigationWrapper() {
  const { t } = useTranslation();

  const translations = {
    openMenu: t("common.openMenu"),
    closeMenu: t("common.closeMenu"),
    solutions: t("landing.navigation.solutions"),
    main: t("landing.navigation.main"),
    signIn: t("landing.navigation.signIn"),
    getStarted: t("landing.navigation.getStarted"),
    features: t("landing.navigation.features"),
    pricing: t("landing.navigation.pricing"),
    templates: t("landing.navigation.templates"),
    docs: t("landing.navigation.docs"),
    freelancers: t("landing.solutions.freelancers"),
    business: t("landing.solutions.business"),
    agencies: t("landing.solutions.agencies"),
    developers: t("landing.solutions.developers"),
  };

  return <Navigation translations={translations} />;
}
