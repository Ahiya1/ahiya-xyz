"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-white/5">
      <div className="container-content">
        {/* Soul Link */}
        <div className="text-center mb-10">
          <Link
            href="/soul/"
            className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors group"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-sm">The philosophical side</span>
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-symbol.png"
            alt="Ahiya"
            width={40}
            height={40}
            className="opacity-40"
          />
        </div>

        {/* Attribution */}
        <p className="text-center text-slate-500 text-sm mb-2">
          Built by <span className="text-gentle">Ahiya Butman</span>
        </p>

        {/* Copyright */}
        <p className="text-center text-slate-500 text-xs">
          &copy; {currentYear} All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
