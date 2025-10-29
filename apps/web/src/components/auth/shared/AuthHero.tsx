import { ReactNode } from "react";

interface AuthHeroProps {
  children: ReactNode;
  gradient: string;
}

export function AuthHero({ children, gradient }: AuthHeroProps) {
  return (
    <div
      className={`hidden lg:flex lg:w-1/2 ${gradient} relative overflow-hidden`}
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-400/20 rounded-full blur-2xl" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-blue-300/20 rounded-full blur-xl" />
      </div>
      <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
        {children}
      </div>
    </div>
  );
}
