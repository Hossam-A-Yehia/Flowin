"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Sparkles, Zap, Users, Building2, Code2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavigationProps {
  translations: {
    openMenu: string;
    closeMenu: string;
    solutions: string;
    main: string;
    signIn: string;
    getStarted: string;
    features: string;
    pricing: string;
    templates: string;
    docs: string;
    freelancers: string;
    business: string;
    agencies: string;
    developers: string;
  };
}

export default function Navigation({ translations: t }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Performance optimization: memoize handlers
  const handleMobileMenuOpen = useCallback(() => setMobileMenuOpen(true), []);
  const handleMobileMenuClose = useCallback(() => setMobileMenuOpen(false), []);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t.features, href: "#features" },
    { name: t.pricing, href: "#pricing" },
    { name: t.templates, href: "/templates" },
    { name: t.docs, href: "/docs" },
  ];

  const solutions = [
    { 
      name: t.freelancers, 
      href: "/solutions/freelancers",
      icon: Users,
      description: "Perfect for independent professionals"
    },
    { 
      name: t.business, 
      href: "/solutions/business",
      icon: Building2,
      description: "Streamline your business operations"
    },
    { 
      name: t.agencies, 
      href: "/solutions/agencies",
      icon: Zap,
      description: "Scale your agency workflows"
    },
    { 
      name: t.developers, 
      href: "/solutions/developers",
      icon: Code2,
      description: "Build powerful integrations"
    },
  ];

  return (
    <div className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200 dark:border-gray-700 shadow-sm" 
        : "bg-white dark:bg-gray-900 border-transparent"
    )}>
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Flowin
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={handleMobileMenuOpen}
          >
            <span className="sr-only">{t.openMenu}</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              {t.solutions}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2">
              <div className="grid gap-1">
                {solutions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link 
                        href={item.href} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Button 
            variant="ghost" 
            asChild 
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <Link href="/auth/login">{t.signIn}</Link>
          </Button>
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105"
          >
            <Link href="/auth/register">{t.getStarted}</Link>
          </Button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
            onClick={handleMobileMenuClose}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={handleMobileMenuClose}>
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Flowin
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={handleMobileMenuClose}
              >
                <span className="sr-only">{t.closeMenu}</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-6 py-6">
                  <div>
                    <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                      {t.solutions}
                    </div>
                    <div className="space-y-2">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleMobileMenuClose}
                            className="flex items-center gap-3 -mx-3 rounded-lg px-3 py-3 text-sm leading-7 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-lg flex items-center justify-center">
                              <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                      {t.main}
                    </div>
                    <div className="space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleMobileMenuClose}
                          className="-mx-3 block rounded-lg px-3 py-3 text-sm font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <Button
                    variant="ghost"
                    className="w-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    asChild
                  >
                    <Link
                      href="/auth/login"
                      onClick={handleMobileMenuClose}
                    >
                      {t.signIn}
                    </Link>
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg transition-all duration-200" 
                    asChild
                  >
                    <Link
                      href="/auth/register"
                      onClick={handleMobileMenuClose}
                    >
                      {t.getStarted}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
