import { ReactNode } from "react";

interface AuthHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  mobileTitle: string;
  mobileSubtitle: string;
}

export function AuthHeader({
  icon,
  title,
  subtitle,
  mobileTitle,
  mobileSubtitle,
}: AuthHeaderProps) {
  return (
    <>
      <div className="lg:hidden text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl mb-3">
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{mobileTitle}</h1>
        <p className="text-gray-600">{mobileSubtitle}</p>
      </div>

      <div className="hidden lg:block mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </>
  );
}
