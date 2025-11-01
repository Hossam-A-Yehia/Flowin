"use client";

import { Zap, Users, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HeroContent } from "../shared/HeroContent";

export function RegisterHero() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Zap className="w-4 h-4" />,
      title: t('auth.register.hero.feature1Title'),
      description: t('auth.register.hero.feature1Description'),
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: t('auth.register.hero.feature2Title'),
      description: t('auth.register.hero.feature2Description'),
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: t('auth.register.hero.feature3Title'),
      description: t('auth.register.hero.feature3Description'),
    },
  ];

  return (
    <HeroContent
      title={t('auth.register.hero.title')}
      subtitle={t('auth.register.hero.subtitle')}
      features={features}
    />
  );
}
