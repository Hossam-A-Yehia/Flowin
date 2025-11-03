"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navItems } from "./navItems";
import { useLogout } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
      <div className="flex h-full flex-col">
      <nav className="p-3">
        <div className="px-2 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href} className="block">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={"w-full justify-start" + (isActive ? " font-medium" : "")}
                  >
                    {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-md border border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-500"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      </div>
    </aside>
  );
}


