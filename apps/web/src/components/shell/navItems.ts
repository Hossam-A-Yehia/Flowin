import { Settings, LayoutDashboard } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


