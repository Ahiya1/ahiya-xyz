# Iteration 2: Code Patterns & Conventions

## Page Structure Pattern

Business homepage follows single-page layout with anchor sections:

```tsx
// app/page.tsx structure
export default function HomePage() {
  return (
    <main className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section - above fold */}
      <section className="section-breathing pt-32">
        {/* ... */}
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-breathing">
        {/* ... */}
      </section>

      {/* How I Work Section */}
      <section id="how-i-work" className="section-breathing">
        {/* ... */}
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-breathing">
        {/* ... */}
      </section>

      <Footer />
    </main>
  );
}
```

## Navigation Component Pattern

```tsx
// app/components/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
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

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-white/5">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={28}
              height={28}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-lg font-medium text-white">Ahiya</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/soul/"
              className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Soul</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-16 right-0 w-72 max-w-[80vw] h-[calc(100vh-4rem)] bg-[#0a0f1a] border-l border-white/10 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/soul/"
                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Soul</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
```

## PortfolioCard Component Pattern

```tsx
// app/components/PortfolioCard.tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  techStack: string[];
}

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-purple-400/10 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm">{project.subtitle}</p>
        </div>
        <span
          className={`text-sm font-medium ${
            project.status === "live" ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          ● {project.status === "live" ? "Live" : "In Progress"}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-300 mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md text-xs text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
        >
          <span>Visit site</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
```

## SectionHeading Component Pattern

```tsx
// app/components/SectionHeading.tsx
interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="display-lg text-white mb-4">{title}</h2>
      {description && (
        <p className="body-xl text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
```

## Footer Component Pattern

```tsx
// app/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="container-content">
        {/* Soul Link */}
        <div className="text-center mb-8">
          <Link
            href="/soul/"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-purple-300 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>The philosophical side</span>
          </Link>
        </div>

        {/* Attribution */}
        <div className="text-center">
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
            Built by <span className="text-gentle">Ahiya Butman</span>
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

## Hero Section Pattern

```tsx
{/* Hero Section */}
<section className="section-breathing pt-32">
  <div className="container-content text-center">
    {/* Optional badge */}
    <div className="breathing-glass inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8">
      <Zap className="w-4 h-4 text-purple-300" />
      <span className="text-sm text-slate-300">Full-Stack Developer</span>
    </div>

    {/* Headline */}
    <h1 className="display-xl text-white mb-6">
      I Build SaaS Systems <span className="text-gentle">Fast</span>
    </h1>

    {/* Subheadline */}
    <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10">
      Full-stack development powered by AI orchestration.
      From idea to deployed product, independently.
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#portfolio"
        className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
      >
        View Portfolio
      </a>
      <a
        href="#contact"
        className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
      >
        Work With Me
      </a>
    </div>
  </div>
</section>
```

## Contact Section Pattern

```tsx
{/* Contact Section */}
<section id="contact" className="section-breathing">
  <div className="container-narrow text-center">
    <div className="contemplative-card p-8 md:p-12">
      <h2 className="heading-xl text-white mb-4">Work With Me</h2>
      <p className="body-lg text-slate-300 mb-8">
        Looking for a developer who can own your next feature or MVP?
      </p>

      <div className="space-y-4">
        <a
          href="mailto:ahiya.butman@gmail.com"
          className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20"
        >
          <Mail className="w-5 h-5 mr-2" />
          Send a Message
        </a>

        <div className="flex items-center justify-center space-x-6 text-slate-400">
          <a
            href="https://github.com/Ahiya1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Import Conventions

```tsx
// External packages first
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Icons
import { ArrowRight, ExternalLink, Mail, Github, Sparkles, Zap } from "lucide-react";

// Internal components
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PortfolioCard } from "@/app/components/PortfolioCard";
import { SectionHeading } from "@/app/components/SectionHeading";
```

## Data Pattern (Portfolio Projects)

```tsx
const portfolioProjects = [
  {
    id: "mirror-of-dreams",
    title: "Mirror of Dreams",
    subtitle: "AI Reflection Tool",
    description: "Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights.",
    status: "live" as const,
    liveUrl: "https://mirror-of-truth.xyz",
    techStack: ["Next.js", "TypeScript", "Claude API", "PayPal", "Supabase", "tRPC"],
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Personal Finance SaaS",
    description: "Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.",
    status: "live" as const,
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "tRPC"],
  },
  {
    id: "statviz",
    title: "StatViz",
    subtitle: "Statistical Reports Platform",
    description: "Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
    status: "live" as const,
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    id: "ai-research-pipeline",
    title: "AI Research Pipeline",
    subtitle: "Factorial Design Research Tool",
    description: "Research tool for generating controlled prompts for academic study on youth sports dropout in Israel. Supports random, equal, and weighted distributions.",
    status: "live" as const,
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];
```
