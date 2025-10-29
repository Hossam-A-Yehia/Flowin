import { Shield, ArrowRight, KeyRound } from 'lucide-react';
import { HeroContent } from '../shared/HeroContent';

export function LoginHero() {
  const features = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level encryption"
    },
    {
      icon: <ArrowRight className="w-4 h-4" />,
      title: "Instant Automation", 
      description: "Connect your tools and automate workflows in minutes"
    },
    {
      icon: <KeyRound className="w-4 h-4" />,
      title: "AI-Powered",
      description: "Smart suggestions to optimize your workflows"
    }
  ];


  return (
    <HeroContent
      title="Welcome back to Flowin"
      subtitle="Continue building powerful automations that save you hours every day."
      features={features}
    />
  );
}
