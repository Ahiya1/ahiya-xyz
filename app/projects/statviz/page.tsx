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

// Interactive StatViz Demo Component
function StatVizDemo() {
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState<'distribution' | 'correlation' | 'significance'>('distribution');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setAnimate(true), 300);
  }, []);

  // Reset animation when view changes
  useEffect(() => {
    if (mounted) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  }, [activeView, mounted]);

  if (!mounted) return <div className="h-64 bg-slate-800/50 rounded-lg" />;

  const barHeights = activeView === 'distribution'
    ? [45, 78, 92, 65, 38, 55, 82]
    : activeView === 'correlation'
    ? [25, 45, 65, 85, 75, 55, 35]
    : [60, 40, 80, 30, 70, 50, 90];

  const metrics = activeView === 'distribution'
    ? { mean: '42.7', stdDev: '12.3', n: '1,247' }
    : activeView === 'correlation'
    ? { mean: '0.73', stdDev: '0.18', n: '856' }
    : { mean: 'p<0.01', stdDev: 't=3.42', n: '512' };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-500">StatViz</span>
      </div>

      <div className="p-6">
        {/* Toggle buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['distribution', 'correlation', 'significance'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                activeView === view
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-300'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between h-32 gap-2 mb-4">
          {barHeights.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm demo-bar"
              style={{
                height: animate ? `${height}%` : '0%',
                transition: `height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Metrics row */}
        <div className="flex justify-between text-xs text-slate-400">
          <span>Mean: <span className="text-slate-200 tabular-nums">{metrics.mean}</span></span>
          <span>Std Dev: <span className="text-slate-200 tabular-nums">{metrics.stdDev}</span></span>
          <span>N: <span className="text-slate-200 tabular-nums">{metrics.n}</span></span>
        </div>
      </div>
    </div>
  );
}

// Mockup Element Renderer
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
        <div className={`p-3 rounded-lg ${element.accent ? 'bg-purple-500/10 border border-purple-400/20' : 'bg-white/[0.04]'}`}>
          <div className="text-xs text-slate-500 mb-1">{element.label}</div>
          <div className={`text-lg font-semibold ${element.accent ? 'text-purple-300' : 'text-slate-300'}`}>
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
        <div className="h-8 bg-purple-500/20 rounded-lg flex items-center justify-center px-3">
          <span className="text-xs text-purple-300">{element.label}</span>
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
              className="w-4 bg-purple-400/40 rounded-t"
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

const StatVizPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://statviz.xyz";

  // Visual Mockup
  const mockupScreens: MockupScreen[] = [
    {
      title: "Admin Dashboard",
      description: "Centralized project management interface",
      elements: [
        { type: 'header', label: 'Projects Overview' },
        { type: 'card', label: 'Active Projects', accent: true },
        { type: 'table', label: 'Recent Reports' },
        { type: 'button', label: 'Create New Project' },
      ]
    },
    {
      title: "Student Report View",
      description: "Secure, password-protected access to reports",
      elements: [
        { type: 'header', label: 'Your Report' },
        { type: 'chart', label: 'Statistical Analysis' },
        { type: 'list', label: 'Key Findings' },
        { type: 'button', label: 'Download DOCX' },
      ]
    },
  ];

  // Metrics
  const metrics: MetricItem[] = [
    { value: "2", label: "Format Options" },
    { value: "100%", label: "Hebrew RTL Support" },
    { value: "Secure", label: "Password Protected" },
    { value: "Fast", label: "Centralized Access" },
  ];

  // Tech Deep-Dive
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js", why: "Full-stack framework for seamless admin and student experiences." },
    { name: "TypeScript", why: "Type-safe codebase. Fewer runtime errors." },
    { name: "Prisma", why: "Type-safe database queries. Easy schema management." },
    { name: "PostgreSQL", why: "Reliable relational database for project and user data." },
    { name: "JWT", why: "Secure, stateless authentication for student access." },
  ];

  // Next Project
  const nextProject: NextProject = {
    href: "/projects/mirror-of-dreams",
    emoji: "\u{1F319}",
    title: "Mirror of Dreams",
    subtitle: "Dream Journal with AI Insight"
  };

  const features = [
    {
      icon: "\u{1F527}",
      title: "Admin Panel",
      description:
        "Comprehensive dashboard for managing projects, user access, and report distribution.",
    },
    {
      icon: "\u{1F512}",
      title: "Secure Access",
      description:
        "Password-protected login ensuring only authorized students access their reports.",
    },
    {
      icon: "\u{1F4CA}",
      title: "Interactive Reports",
      description:
        "Dual format delivery: interactive HTML visualizations plus downloadable DOCX.",
    },
    {
      icon: "\u{1F5E8}",
      title: "Hebrew RTL",
      description:
        "Full right-to-left layout support for natural Hebrew reading experience.",
    },
  ];

  const challenges = [
    "Email delivery is insecure and untracked",
    "Students lose access or forward inappropriately",
    "No central system for managing multiple projects",
    "Hebrew RTL breaks in standard document viewers",
  ];

  const solutions = [
    "Password-protected individual access",
    "Centralized admin panel for project management",
    "Interactive HTML reports with embedded visualizations",
    "Full Hebrew RTL support",
    "Dual format delivery (HTML + DOCX)",
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
            {"\u{1F4CA}"}
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            Statistical Analysis, Visualized
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
            Complex data made clear and beautiful.
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

          {/* Interactive Demo */}
          <div className="mt-12 max-w-md mx-auto">
            <StatVizDemo />
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
              Statistical report delivery breaks down:
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
              A secure, centralized platform:
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
                <h3 className="heading-lg text-purple-300 mb-2">{tech.name}</h3>
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
            <h2 className="heading-xl mb-6">Ready to Explore?</h2>
            <p className="body-lg text-slate-300 mb-8">
              Statistical reports delivered with elegance and security.
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

export default StatVizPage;
