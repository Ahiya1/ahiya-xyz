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

// Demo constants - defined outside component to avoid re-creation
const DEMO_DREAM_TITLE = "Launch My Sustainable Fashion Brand";
const DEMO_DREAM_CATEGORY = "Entrepreneurial";
const DEMO_DAYS_REMAINING = 180;
const DEMO_REFLECTION_QUESTIONS = [
  "What draws you to this dream?",
  "What's one step you could take today?",
  "What fears are you holding?",
  "What would success feel like?"
];
const DEMO_AI_REFLECTION = "Your dream of sustainable fashion reveals a deep alignment between your values and your ambitions. You speak about 'willingness to fail publicly' - this isn't fear, this is courage that has already decided. The 15 hours weekly you're offering isn't sacrifice; it's investment in becoming who you already are...";

// MirrorDemo - Custom interactive demo showing LIFE DREAMS companion
function MirrorDemo() {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Cycle through questions
    const questionInterval = setInterval(() => {
      setActiveQuestion(prev => (prev + 1) % DEMO_REFLECTION_QUESTIONS.length);
    }, 3000);

    // Start typing after a delay
    let typeInterval: NodeJS.Timeout;
    const startDelay = setTimeout(() => {
      let i = 0;
      typeInterval = setInterval(() => {
        if (i < DEMO_AI_REFLECTION.length) {
          setDisplayedText(DEMO_AI_REFLECTION.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 35);
    }, 1000);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(startDelay);
      if (typeInterval) clearInterval(typeInterval);
      clearInterval(cursorInterval);
      clearInterval(questionInterval);
    };
  }, []);

  if (!mounted) return <div className="h-80 bg-slate-800/50 rounded-lg animate-pulse" />;

  // Generate random stars
  const stars = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Cosmic background with stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white demo-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Window chrome */}
      <div className="relative flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-500">Mirror of Dreams</span>
      </div>

      <div className="relative p-6 space-y-6">
        {/* Dream Card */}
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-purple-400/70 px-2 py-1 bg-purple-500/10 rounded-full">{DEMO_DREAM_CATEGORY}</span>
            <span className="text-xs text-slate-500">{DEMO_DAYS_REMAINING} days remaining</span>
          </div>
          <h3 className="text-lg text-white font-medium mb-3">{DEMO_DREAM_TITLE}</h3>

          {/* Reflection Questions */}
          <div className="space-y-2">
            {DEMO_REFLECTION_QUESTIONS.map((question, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded transition-all duration-300 ${
                  i === activeQuestion
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-slate-500'
                }`}
              >
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* AI Companion Response */}
        <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20 demo-cosmic-glow">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs text-purple-400">AI Companion</div>
            <span className="text-xs text-slate-600">Gentle Clarity</span>
          </div>
          <p className="text-slate-200 leading-relaxed min-h-[5rem]">
            {displayedText}
            <span className={`inline-block w-0.5 h-4 bg-purple-400 ml-0.5 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </p>
        </div>
      </div>
    </div>
  );
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

const MirrorOfDreamsPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://selahmirror.xyz";

  // Visual Mockup data
  const mockupScreens: MockupScreen[] = [
    {
      title: "Create Your Dream",
      description: "Define your life aspirations with guided reflection",
      elements: [
        { type: 'header', label: 'New Dream' },
        { type: 'input', label: 'What do you dream of becoming?' },
        { type: 'list', label: '4 Reflection Questions' },
        { type: 'button', label: 'Begin Journey' },
      ]
    },
    {
      title: "AI Companion",
      description: "Personalized guidance from Claude",
      elements: [
        { type: 'header', label: 'Your Reflection' },
        { type: 'card', label: 'AI Insight', accent: true },
        { type: 'list', label: 'Evolution Over Time' },
        { type: 'button', label: 'Continue Growing' },
      ]
    },
  ];

  // Metrics data
  const metrics: MetricItem[] = [
    { value: "4", label: "Reflection Questions" },
    { value: "3", label: "AI Tones" },
    { value: "Track", label: "Evolution Reports" },
    { value: "Secure", label: "PayPal Integration" },
  ];

  // Tech Deep-Dive data
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js", why: "React framework with server-side rendering for fast loads." },
    { name: "TypeScript", why: "Type safety for complex dream and reflection data structures." },
    { name: "Supabase", why: "Authentication and PostgreSQL database in one." },
    { name: "Claude API", why: "Emotionally intelligent AI companion for personalized reflections." },
    { name: "tRPC", why: "End-to-end type-safe API for dream and reflection management." },
    { name: "PayPal", why: "Trusted subscription management for tier upgrades." },
  ];

  // Next Project data - Updated from /projects/wealth to /projects/statviz
  const nextProject: NextProject = {
    href: "/projects/statviz",
    emoji: "\u{1F4CA}",
    title: "StatViz",
    subtitle: "Data Visualization Dashboard"
  };

  const features = [
    {
      icon: "\u{2728}",
      title: "AI Companion",
      description:
        "Three calibrated tones: Gentle Clarity, Luminous Intensity, Sacred Fusion. Each offers a different lens for your aspirations.",
    },
    {
      icon: "\u{1F4AD}",
      title: "4 Reflection Questions",
      description:
        "Structured prompts guide you deeper: What draws you? What step today? What fears? What would success feel like?",
    },
    {
      icon: "\u{1F4C8}",
      title: "Evolution Reports",
      description:
        "After 4+ reflections, see how your relationship with each dream has evolved over time.",
    },
    {
      icon: "\u{1F451}",
      title: "Subscription Tiers",
      description:
        "Free, Pro, and Unlimited. Each tier unlocks deeper AI insights and more dreams to track.",
    },
  ];

  const challenges = [
    "Goal tracking apps focus on tasks, not meaning",
    "No space for reflection on what dreams truly mean to you",
    "Disconnection between daily actions and life aspirations",
    "Generic productivity tools ignore the emotional journey",
  ];

  const solutions = [
    "AI companion that knows your journey and reflects it back",
    "4 structured questions guide deeper self-understanding",
    "Evolution tracking reveals how you grow toward your dreams",
    "Three AI tones match your mood and needs",
    "Cosmic glass aesthetic invites contemplation, not hustle",
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
            {"\u{1F319}"}
          </div>

          {/* Bold title - FIXED: Now about LIFE DREAMS */}
          <h1 className="display-xl text-white mb-4">
            AI Companion for Life Dreams
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

          {/* One powerful line - FIXED: About aspirations, not sleep */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Connect with your aspirations through AI-guided reflection.
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

      {/* Visual Mockup Section - Custom MirrorDemo */}
      <section className="py-24 section-reveal section-reveal-1">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">See It In Action</h2>
          <p className="text-center text-slate-400 mb-12">
            Watch the AI companion reflect on your life dreams
          </p>

          <MirrorDemo />
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-2">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Tools for life aspirations fall short:
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
              A space for genuine self-discovery:
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
            <h2 className="heading-xl mb-6">Ready to Explore Your Dreams?</h2>
            <p className="body-lg text-slate-300 mb-8">
              Connect with your life aspirations through AI-guided reflection.
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

export default MirrorOfDreamsPage;
