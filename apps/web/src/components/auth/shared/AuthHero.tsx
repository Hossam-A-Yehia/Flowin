import { ReactNode } from "react";
import Image from "next/image";

interface AuthHeroProps {
  children: ReactNode;
}

export function AuthHero({ children }: AuthHeroProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/auth-hero.webp"
          alt="Background"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
        {children}
      </div>
    </div>
  );
}
