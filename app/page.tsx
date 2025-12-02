"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo-symbol.png"
            alt="Ahiya"
            width={64}
            height={64}
            className="mx-auto opacity-80"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light mb-6 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
          Something new is emerging. In the meantime, explore the soul of what
          I'm building.
        </p>

        {/* CTA Button */}
        <Link
          href="/soul/"
          className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/20 hover:border-purple-400/40 rounded-xl text-purple-200 font-medium transition-all duration-300 hover:scale-105"
        >
          <span>Enter the Soul</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        {/* Quote */}
        <div className="mt-16 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-slate-300 italic text-sm md:text-base leading-relaxed">
            "A sacred potato experiencing the present moment in all its ordinary
            magnificence."
          </p>
        </div>
      </div>
    </div>
  );
}
