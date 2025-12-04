"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";

// Placeholder hook - sections are always visible
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  return { ref };
}

const WealthPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  // Scroll reveal hooks for each section
  const challengeReveal = useScrollReveal();
  const solutionReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const techReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://selahwealth.xyz";

  const features = [
    {
      icon: "\u{1F3E6}",
      title: "Bank Sync",
      description:
        "Connect Israeli bank accounts for automatic transaction imports. Real-time sync.",
    },
    {
      icon: "\u{1F3F7}\uFE0F",
      title: "AI Categorization",
      description:
        "Claude-powered categorization that learns your patterns. Automatic, accurate.",
    },
    {
      icon: "\u{1F4CA}",
      title: "Budget Alerts",
      description:
        "Set budgets by category. Get smart alerts before you overspend.",
    },
    {
      icon: "\u{1F4AC}",
      title: "AI Advisor",
      description:
        "Financial advisor that understands your complete picture. Personalized guidance.",
    },
  ];

  const techStack = [
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Claude API",
    "tRPC",
  ];

  const challenges = [
    "Manual transaction entry gets abandoned",
    "Generic categorization misses personal patterns",
    "Israeli bank integration is rare",
    "Budget alerts come after overspending",
  ];

  const solutions = [
    "Automatic bank sync imports transactions in real-time",
    "Claude AI learns your unique spending patterns",
    "Native support for Israeli banks and local payments",
    "Proactive alerts before you exceed limits",
    "AI advisor provides personalized guidance",
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
              </Link>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Visit Live Site</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full viewport with gradient */}
      <section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20">
        <div className="container-content text-center relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-slate-400 hover:text-white text-sm mb-8 inline-block transition-colors"
          >
            &larr; Back to Work
          </Link>

          {/* Large emoji with float animation */}
          <div className="text-6xl md:text-8xl mb-6 animate-float">
            {"\u{1F4B0}"}
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            Personal Finance, Simplified
          </h1>

          {/* One powerful line */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Clarity from financial chaos.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>Visit Live Site</span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section
        ref={challengeReveal.ref}
        className="py-24"
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Personal finance tools fail Israeli users:
            </p>
            <ul className="space-y-4">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section
        ref={solutionReveal.ref}
        className="py-24"
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Intelligent, localized financial management:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresReveal.ref}
        className="py-24"
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="contemplative-card p-6 md:p-8"
              >
                <div className="text-3xl md:text-4xl mb-6">{feature.icon}</div>
                <h3 className="heading-lg mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        ref={techReveal.ref}
        className="py-24"
      >
        <div className="container-content text-center">
          <h2 className="heading-xl mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* View Next Project */}
      <div className="text-center mb-16">
        <Link
          href="/projects/ai-research-pipeline"
          className="text-slate-400 hover:text-white transition-colors"
        >
          Next: AI Research Pipeline &rarr;
        </Link>
      </div>

      {/* CTA Section */}
      <section
        ref={ctaReveal.ref}
        className="py-24"
      >
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl mb-6">Ready to Take Control?</h2>
            <p className="body-lg text-slate-300 mb-8">
              AI-powered insights for your finances.
            </p>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>Visit Live Site</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={24}
              height={24}
              className="opacity-40"
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by <span className="text-gentle">Ahiya</span>
          </p>
          <p className="text-slate-500 text-xs">
            {new Date().getFullYear()} - Building systems that work
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WealthPage;
