"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Activity,
  Wallet,
  CheckSquare,
  Target,
  Menu,
  X,
  Moon,
  Sun,
  Zap,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Budget", href: "/buget", icon: Wallet },
  { name: "Todo", href: "/Todo", icon: CheckSquare },
  { name: "Milestones", href: "/Milestones", icon: Target },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Apply dark mode by default
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-neutral-950/85 backdrop-blur-xl border-b border-primary-500/15 shadow-lg shadow-primary-500/5"
            : "bg-neutral-950/70 backdrop-blur-md border-b border-neutral-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 group relative"
            >
              {/* Modern Logo */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-info-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Logo container */}
                <div className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-info-600 p-2.5 rounded-xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-primary-400/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                  <Zap className="h-6 w-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                
                {/* Decorative dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-warning-500 rounded-full animate-pulse delay-300" />
              </div>
              
              {/* Brand Name & Title */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl bg-gradient-to-r from-primary-400 via-secondary-400 to-info-400 bg-clip-text group-hover:from-primary-300 group-hover:via-secondary-300 group-hover:to-info-300 transition-all duration-300">
                    Tracker
                  </span>
                  <div className="h-1 w-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-8 transition-all duration-500" />
                </div>
                <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 tracking-wide">
                  Activity & Budget Dashboard
                </span>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <div
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {/* Active background with glow */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl" />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-xl opacity-60 animate-pulse" />
                        </>
                      )}

                      {/* Hover effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-secondary-600/0 group-hover:from-primary-600/20 group-hover:to-secondary-600/20 rounded-xl transition-all duration-300" />
                      )}

                      {/* Icon with background */}
                      <div className={cn(
                        "relative p-1.5 rounded-lg transition-all duration-300",
                        isActive 
                          ? "bg-white/10" 
                          : "bg-neutral-800/50 group-hover:bg-neutral-700/50"
                      )}>
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-transform duration-300 relative z-10",
                            isActive
                              ? "scale-110"
                              : "group-hover:scale-110"
                          )}
                        />
                      </div>
                      
                      {/* Label */}
                      <span className="relative z-10 font-medium text-sm">
                        {item.name}
                      </span>
                    </div>

                    {/* Bottom indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle - Modern design */}
              {/* <button
                onClick={toggleDarkMode}
                className="relative group"
                aria-label="Toggle dark mode"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="relative w-5 h-5">
                    {isDarkMode ? (
                      <Moon className="h-5 w-5 text-primary-400 group-hover:rotate-12 transition-transform duration-300 absolute inset-0" />
                    ) : (
                      <Sun className="h-5 w-5 text-warning-400 group-hover:rotate-180 transition-transform duration-500 absolute inset-0" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 hidden sm:inline">
                    {isDarkMode ? "Dark" : "Light"}
                  </span>
                </div>
              </button> */}

              {/* Mobile menu button - Modern design */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative group"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative p-2.5 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-primary-500/50 transition-all duration-300">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-primary-400 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-6 w-6 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Modern Design */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-6 space-y-3 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative group block"
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg shadow-primary-500/20"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/70"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-md opacity-50 -z-10" />
                    )}
                    
                    {/* Icon with background */}
                    <div className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      isActive 
                        ? "bg-white/10" 
                        : "bg-neutral-800/50 group-hover:bg-neutral-700/50"
                    )}>
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        } transition-transform duration-300`}
                      />
                    </div>
                    
                    <span className="font-medium flex-1">{item.name}</span>
                    
                    {isActive && (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-100" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-200" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-16" />

      {/* Animated background gradient */}
      <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-20 left-1/2 w-96 h-96 bg-info-600/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
    </>
  );
}

