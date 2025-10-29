import { Zap, Users, TrendingUp, User } from "lucide-react";
import { HeroContent } from "../shared/HeroContent";

export function RegisterHero() {
  const features = [
    {
      icon: <Zap className="w-4 h-4" />,
      title: "No-Code Automation",
      description:
        "Build powerful workflows without writing a single line of code",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Team Collaboration",
      description: "Share and collaborate on automations with your team",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Analytics & Insights",
      description: "Track performance and optimize your workflows",
    },
  ];

  return (
    <HeroContent
      title="Start your automation journey"
      subtitle="Join thousands of professionals who save hours every day with intelligent workflow automation."
      features={features}
    />
  );
}
