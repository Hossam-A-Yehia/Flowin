'use client';

import { Shield, ArrowRight, KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HeroContent } from '../shared/HeroContent';

export function LoginHero() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: t('auth.login.hero.feature1Title'),
      description: t('auth.login.hero.feature1Description')
    },
    {
      icon: <ArrowRight className="w-4 h-4" />,
      title: t('auth.login.hero.feature2Title'), 
      description: t('auth.login.hero.feature2Description')
    },
    {
      icon: <KeyRound className="w-4 h-4" />,
      title: t('auth.login.hero.feature3Title'),
      description: t('auth.login.hero.feature3Description')
    }
  ];

  return (
    <HeroContent
      title={t('auth.login.hero.title')}
      subtitle={t('auth.login.hero.subtitle')}
      features={features}
    />
  );
}
