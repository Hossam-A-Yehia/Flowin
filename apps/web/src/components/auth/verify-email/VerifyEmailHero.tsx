'use client';

import { Shield, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function VerifyEmailHero() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('auth.verifyEmail.hero.feature1Title'),
      description: t('auth.verifyEmail.hero.feature1Description'),
    },
    {
      icon: CheckCircle,
      title: t('auth.verifyEmail.hero.feature2Title'),
      description: t('auth.verifyEmail.hero.feature2Description'),
    },
    {
      icon: Clock,
      title: t('auth.verifyEmail.hero.feature3Title'),
      description: t('auth.verifyEmail.hero.feature3Description'),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {t('auth.verifyEmail.hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
          {t('auth.verifyEmail.hero.subtitle')}
        </p>
      </div>

      <div className="space-y-6 pt-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
