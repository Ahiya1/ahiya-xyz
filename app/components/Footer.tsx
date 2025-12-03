"use client";

import React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="container-content">
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
          Made with intention by <span className="text-gentle">Ahiya</span>
        </p>

        {/* Tagline and Year */}
        <p className="text-center text-slate-500 text-xs">
          2025 · Building systems that work
        </p>
      </div>
    </footer>
  );
}

export default Footer;
