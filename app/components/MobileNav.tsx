"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Building, FileText, MapPin, MessageCircle } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/soul/", icon: Home },
  { label: "Journey", href: "/soul/journey", icon: MapPin },
  { label: "Building", href: "/soul/building", icon: Building },
  { label: "Writing", href: "/soul/writing", icon: FileText },
  { label: "Connect", href: "/soul/connect", icon: MessageCircle },
];

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/soul/" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/soul/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium text-white">Ahiya</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.filter(item => item.href !== "/soul/").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-slate-300 hover:text-white transition-colors ${
                    currentPath === item.href ? "text-purple-300" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="fixed top-16 right-0 bottom-0 w-72 max-w-[80vw] bg-[#0a0f1a]/95 backdrop-blur-xl border-l border-white/10 z-40 md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="p-6">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive
                          ? "bg-purple-500/15 text-purple-200 border border-purple-500/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Sacred Quote */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <span className="text-3xl block mb-3">&#x1F954;</span>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    &quot;Technology that serves presence,
                    <br />
                    not productivity.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MobileNav;
