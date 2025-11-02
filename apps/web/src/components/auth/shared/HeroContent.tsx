import { ReactNode } from "react";
import Image from "next/image";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface HeroContentProps {
  title: string;
  subtitle: string;
  features?: Feature[];
}

export function HeroContent({ title, subtitle, features }: HeroContentProps) {
  return (
    <>
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center mb-6 h-[100px] w-[100px]">
          <Image 
            src="/logo.svg" 
            alt="Flowin Logo" 
            width={100} 
            height={100}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-blue-100 leading-relaxed">{subtitle}</p>
      </div>

      {features && (
        <div className="space-y-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h2 className="font-semibold mb-1 text-lg">{feature.title}</h2>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
