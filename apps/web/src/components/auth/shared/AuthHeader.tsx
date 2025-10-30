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
        <div className="relative mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            <div className="relative">{icon}</div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {mobileTitle}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            {mobileSubtitle}
          </p>
        </div>
      </div>
      <div className="hidden lg:block mb-8">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-base leading-relaxed ml-5">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
