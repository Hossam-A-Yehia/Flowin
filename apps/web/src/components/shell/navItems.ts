import { Settings, LayoutDashboard, Workflow, Plug2 } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/flows", label: "Flows", icon: Workflow },
  { href: "/integrations", label: "Integrations", icon: Plug2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


