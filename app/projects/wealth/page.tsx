"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Lock, ArrowRight } from "lucide-react";

// TypeScript interfaces
interface MockupScreen {
  title: string;
  description: string;
  elements: { type: string; label: string; accent?: boolean }[];
}

interface MetricItem {
  value: string;
  label: string;
}

interface TechDeepDiveItem {
  name: string;
  why: string;
}

interface NextProject {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
}

// Mockup element renderer
function MockupElement({ element }: { element: MockupScreen['elements'][0] }) {
  switch (element.type) {
    case 'header':
      return (
        <div className="h-8 bg-white/[0.08] rounded-lg flex items-center px-3">
          <span className="text-xs text-slate-400">{element.label}</span>
        </div>
      );
    case 'card':
      return (
        <div className={`p-3 rounded-lg ${element.accent ? 'bg-emerald-500/10 border border-emerald-400/20' : 'bg-white/[0.04]'}`}>
          <div className="text-xs text-slate-500 mb-1">{element.label}</div>
          <div className={`text-lg font-semibold ${element.accent ? 'text-emerald-300' : 'text-slate-300'}`}>
            ---
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="space-y-2">
          <div className="text-xs text-slate-500">{element.label}</div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-white/[0.04] rounded" />
          ))}
        </div>
      );
    case 'button':
      return (
        <div className="h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center px-3">
          <span className="text-xs text-emerald-300">{element.label}</span>
        </div>
      );
    case 'input':
      return (
        <div className="h-8 bg-white/[0.04] rounded-lg border border-white/10 flex items-center px-3">
          <span className="text-xs text-slate-500">{element.label}</span>
        </div>
      );
    case 'chart':
      return (
        <div className="h-24 bg-white/[0.04] rounded-lg flex items-end justify-center gap-1 p-3">
          {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
            <div
              key={i}
              className="w-4 bg-emerald-400/40 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="space-y-1">
          <div className="text-xs text-slate-500 mb-2">{element.label}</div>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-5 bg-white/[0.04] rounded" />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

const WealthPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://selahwealth.xyz";

  // Visual Mockup data
  const mockupScreens: MockupScreen[] = [
    {
      title: "Financial Dashboard",
      description: "Real-time overview of your finances",
      elements: [
        { type: 'header', label: 'Dashboard' },
        { type: 'card', label: 'Total Balance', accent: true },
        { type: 'chart', label: 'Monthly Spending' },
        { type: 'list', label: 'Recent Transactions' },
      ]
    },
    {
      title: "Transaction View",
      description: "AI-categorized transaction management",
      elements: [
        { type: 'header', label: 'Transactions' },
        { type: 'input', label: 'Search transactions...' },
        { type: 'table', label: 'Transaction List' },
        { type: 'button', label: 'Export Data' },
      ]
    },
  ];

  // Metrics data
  const metrics: MetricItem[] = [
    { value: "Local", label: "Israeli Bank Sync" },
    { value: "AI", label: "Smart Categorization" },
    { value: "Real-time", label: "Budget Alerts" },
    { value: "Personal", label: "AI Financial Advisor" },
  ];

  // Tech Deep-Dive data
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js 15", why: "Full-stack framework for responsive financial dashboard." },
    { name: "TypeScript", why: "Type-safe financial calculations. No currency bugs." },
    { name: "Prisma + PostgreSQL", why: "Reliable ORM for transaction storage and querying." },
    { name: "Claude API", why: "AI-powered categorization and personalized financial advice." },
    { name: "tRPC", why: "Type-safe API layer between frontend and backend." },
    { name: "Supabase Auth", why: "Secure authentication for sensitive financial data." },
  ];

  // Next Project data
  const nextProject: NextProject = {
    href: "/projects/ai-research-pipeline",
    emoji: "\u{1F52C}",
    title: "AI Research Pipeline",
    subtitle: "AI-Powered Academic Research"
  };

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

          {/* Built with 2L Badge */}
          <div className="mb-6">
            <Link
              href="/2l"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300"
            >
              Built with 2L
            </Link>
          </div>

          {/* One powerful line */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Clarity from financial chaos.
          </p>

          {/* CTA Buttons - Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>View Live</span>
            </a>
            <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
              <Lock className="w-5 h-5" aria-hidden="true" />
              <span>Private Repository</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* Visual Mockup Section */}
      <section className="py-24 section-reveal section-reveal-1">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">See It In Action</h2>
          <p className="text-center text-slate-400 mb-12">
            A glimpse into the interface
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {mockupScreens.map((screen, index) => (
              <div key={index} className="contemplative-card p-6 overflow-hidden">
                {/* Mockup Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <span className="text-xs text-slate-500 ml-2">{screen.title}</span>
                </div>

                {/* Mockup Content */}
                <div className="space-y-3">
                  {screen.elements.map((element, idx) => (
                    <MockupElement key={idx} element={element} />
                  ))}
                </div>

                {/* Caption */}
                <p className="mt-4 pt-3 border-t border-white/5 text-sm text-slate-500">
                  {screen.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-2">
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
      <section className="py-24 section-reveal section-reveal-3">
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
      <section className="py-24 section-reveal section-reveal-4">
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

      {/* Tech Deep-Dive Section */}
      <section className="py-24 section-reveal section-reveal-5">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Built With</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {techDeepDive.map((tech, index) => (
              <div key={index} className="contemplative-card p-6">
                <h3 className="heading-lg text-emerald-300 mb-2">{tech.name}</h3>
                <p className="text-slate-400">{tech.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 section-reveal section-reveal-6">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="breathing-glass p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gentle mb-2">
                  {metric.value}
                </div>
                <div className="text-slate-400 text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-24 section-reveal section-reveal-7">
        <div className="container-content">
          <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

          <Link href={nextProject.href} className="group block max-w-md mx-auto">
            <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-purple-400/20 transition-all">
              <div className="text-4xl">{nextProject.emoji}</div>
              <div className="flex-1">
                <h3 className="heading-lg text-white group-hover:text-purple-300 transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-reveal section-reveal-8">
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
