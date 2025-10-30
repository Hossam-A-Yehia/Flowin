import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-blue-100 leading-relaxed">{subtitle}</p>
      </div>

      {features && (
        <div className="space-y-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
