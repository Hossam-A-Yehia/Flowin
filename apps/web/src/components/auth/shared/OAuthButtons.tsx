'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface OAuthButtonsProps {
  disabled?: boolean;
}

export function OAuthButtons({ disabled }: OAuthButtonsProps) {
  const { t } = useTranslation();
  
  const handleGoogleAuth = useCallback(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/google`;
  }, []);

  const handleGithubAuth = useCallback(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/github`;
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={handleGoogleAuth}
        disabled={disabled}
        className="w-full h-11 text-sm font-medium border-2 hover:bg-gray-50 transition-all duration-200"
      >
        <FcGoogle className="w-5 h-5" />
        {t('auth.oauth.continueWithGoogle')}
      </Button>
      
      <Button
        variant="outline"
        onClick={handleGithubAuth}
        disabled={disabled}
        className="w-full h-11 text-sm font-medium border-2 hover:bg-gray-50 transition-all duration-200"
      >
        <FaGithub className="w-5 h-5" />
        {t('auth.oauth.continueWithGithub')}
      </Button>
    </div>
  );
}
