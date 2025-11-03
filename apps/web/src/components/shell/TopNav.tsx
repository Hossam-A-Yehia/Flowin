"use client";
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, Search } from 'lucide-react';
import { navItems } from './navItems';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';

export default function TopNav() {
  const pathname = usePathname();
  const logoutMutation = useLogout();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="fixed inset-y-0 left-0 top-0 m-0 h-full w-72 translate-x-0 translate-y-0 rounded-none border-0 p-0 shadow-xl data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
                <DialogTitle className="sr-only">Navigation menu</DialogTitle>
                <DialogDescription className="sr-only">Mobile navigation drawer</DialogDescription>
                <nav className="h-full bg-white flex flex-col">
                  <ul className="p-3 space-y-1">
                    {navItems.map((item) => {
                      const isActive = item.href === '/dashboard'
                        ? pathname === '/dashboard'
                        : pathname === item.href || pathname?.startsWith(item.href + '/');
                      return (
                        <li key={item.href}>
                          <DialogClose asChild>
                            <Link
                              href={item.href}
                              className={
                                "block px-3 py-2 rounded-md text-sm font-medium " +
                                (isActive ? "bg-gray-100" : "hover:bg-gray-100")
                              }
                            >
                              <div className="flex items-center gap-2">
                                {item.icon ? <item.icon className="h-4 w-4" /> : null}
                                {item.label}
                              </div>
                            </Link>
                          </DialogClose>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto p-3">
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 rounded-md border border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-500"
                        onClick={() => logoutMutation.mutate()}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </DialogClose>
                  </div>
                </nav>
              </DialogContent>
            </Dialog>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 h-[24px] w-[24px]">
            <Image src="/logo.svg" alt="Flowin" width={24} height={24} style={{ width: '24px', height: '24px' }} />
            <span className="font-semibold tracking-tight">Flowin</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="sm">Settings</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}


