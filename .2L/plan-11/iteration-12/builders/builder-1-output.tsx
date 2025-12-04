"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Lock, ArrowRight } from "lucide-react";

// TypeScript interfaces
interface ReflectionQuestion {
  question: string;
  guidance: string;
}

interface ToneOption {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  accentRgba: string;
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

// The 5 ACTUAL Reflection Questions from Mirror of Dreams
const SACRED_QUESTIONS: ReflectionQuestion[] = [
  {
    question: "What is your dream?",
    guidance: "Choose just one - the one that calls you most right now."
  },
  {
    question: "What is your plan for achieving this dream?",
    guidance: "Write what you already know. It's okay if it's unclear."
  },
  {
    question: "Have you set a definite date for fulfilling your dream?",
    guidance: "A commitment transforms a wish into intention."
  },
  {
    question: "What is your current relationship with this dream?",
    guidance: "Do you believe you'll achieve it? Why or why not?"
  },
  {
    question: "What are you willing to give in return?",
    guidance: "Energy, focus, love, time - what will you offer?"
  }
];

// The 3 AI Tone Options
const AI_TONES: ToneOption[] = [
  {
    id: "sacred-fusion",
    name: "Sacred Fusion",
    description: "Let the Mirror Breathe",
    accentColor: "amber",
    accentRgba: "rgba(251, 191, 36, 0.9)"
  },
  {
    id: "gentle-clarity",
    name: "Gentle Clarity",
    description: "Soft illumination",
    accentColor: "white",
    accentRgba: "rgba(255, 255, 255, 0.9)"
  },
  {
    id: "luminous-fire",
    name: "Luminous Fire",
    description: "Purple intensity",
    accentColor: "violet",
    accentRgba: "rgba(196, 181, 253, 0.9)"
  }
];

// Sample AI Response (Sacred Fusion tone)
const SAMPLE_AI_RESPONSE = `Alex,

You describe yourself as someone who 'doesn't have a detailed plan' while outlining exactly what you want to create and who you want to serve. You claim uncertainty about your qualifications while demonstrating the primary qualification for mentorship: you've walked the path and remember what it felt like to need guidance.

What I see is someone who is already mentoring - through onboarding new hires, through the advice-seeking conversations that naturally happen around you. You're not someone who might be able to help others find their footing. You're someone who already helps others find their footing, wondering if you're allowed to do it more intentionally.

The only thing standing between you and your dream is your recognition of what you already are.`;

// Cosmic Mirror Demo Component
function CosmicMirrorDemo() {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Cycle through questions every 4 seconds
    const questionInterval = setInterval(() => {
      setActiveQuestion(prev => (prev + 1) % SACRED_QUESTIONS.length);
    }, 4000);

    // Start typing after a delay
    let typeInterval: NodeJS.Timeout;
    const startDelay = setTimeout(() => {
      let i = 0;
      typeInterval = setInterval(() => {
        if (i < SAMPLE_AI_RESPONSE.length) {
          setDisplayedText(SAMPLE_AI_RESPONSE.slice(0, i + 1));
          i++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typeInterval);
        }
      }, 25);
    }, 1500);

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

  // Get current tone styling
  const currentTone = AI_TONES[selectedTone];
  const getToneGlowStyle = useCallback(() => {
    switch (currentTone.id) {
      case "sacred-fusion":
        return "shadow-[0_0_60px_rgba(251,191,36,0.15),0_0_30px_rgba(251,191,36,0.1)]";
      case "gentle-clarity":
        return "shadow-[0_0_60px_rgba(255,255,255,0.1),0_0_30px_rgba(255,255,255,0.05)]";
      case "luminous-fire":
        return "shadow-[0_0_60px_rgba(196,181,253,0.15),0_0_30px_rgba(196,181,253,0.1)]";
      default:
        return "";
    }
  }, [currentTone.id]);

  const getToneBorderColor = useCallback(() => {
    switch (currentTone.id) {
      case "sacred-fusion":
        return "border-amber-500/30";
      case "gentle-clarity":
        return "border-white/20";
      case "luminous-fire":
        return "border-violet-400/30";
      default:
        return "border-purple-500/20";
    }
  }, [currentTone.id]);

  const getToneTextColor = useCallback(() => {
    switch (currentTone.id) {
      case "sacred-fusion":
        return "text-amber-300";
      case "gentle-clarity":
        return "text-slate-200";
      case "luminous-fire":
        return "text-violet-300";
      default:
        return "text-purple-300";
    }
  }, [currentTone.id]);

  if (!mounted) return <div className="h-[600px] bg-slate-800/50 rounded-2xl animate-pulse" />;

  return (
    <div className={`relative bg-gradient-to-b from-[#0f0f23] via-purple-900/10 to-[#1a1a2e] rounded-2xl border border-slate-700/30 overflow-hidden ${getToneGlowStyle()}`}>
      {/* Demo cosmic background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle nebula effect */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-violet-500/5 rounded-full blur-[60px]" />

        {/* Mini stars in demo */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Window chrome */}
      <div className="relative flex items-center gap-2 px-4 py-3 bg-[#0f0f23]/80 border-b border-slate-700/30 backdrop-blur-sm">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-500 font-medium tracking-wide">Mirror of Dreams - Cosmic Reflection Chamber</span>
      </div>

      <div className="relative p-6 md:p-8 space-y-6">
        {/* Header message */}
        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm tracking-widest uppercase mb-2">Consciousness Recognition Technology</p>
          <p className="text-purple-300/80 text-xs">5 sacred questions. 1 AI-powered reflection.</p>
        </div>

        {/* Sacred Questions Display */}
        <div className="p-5 bg-white/[0.03] rounded-xl border border-slate-700/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-purple-400/70 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
              The 5 Sacred Questions
            </span>
            <span className="text-xs text-slate-500">
              Question {activeQuestion + 1} of 5
            </span>
          </div>

          {/* Questions list with cycling highlight */}
          <div className="space-y-3">
            {SACRED_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className={`px-4 py-3 rounded-lg transition-all duration-500 ${
                  i === activeQuestion
                    ? 'bg-purple-500/15 border border-purple-500/30 scale-[1.02]'
                    : 'bg-white/[0.02] border border-transparent opacity-50'
                }`}
              >
                <p className={`text-sm font-medium transition-colors duration-500 ${
                  i === activeQuestion ? 'text-purple-200' : 'text-slate-500'
                }`}>
                  {q.question}
                </p>
                {i === activeQuestion && (
                  <p className="text-xs text-slate-400 mt-1 animate-fadeIn">
                    {q.guidance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tone Selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          {AI_TONES.map((tone, i) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(i)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedTone === i
                  ? tone.id === "sacred-fusion"
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                    : tone.id === "gentle-clarity"
                    ? 'bg-white/10 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(196,181,253,0.2)]'
                  : 'bg-white/[0.03] text-slate-500 border border-slate-700/30 hover:border-slate-600/50'
              }`}
            >
              {tone.name}
            </button>
          ))}
        </div>

        {/* AI Response Mirror Frame */}
        <div className={`relative p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.02] rounded-xl border ${getToneBorderColor()} backdrop-blur-sm transition-all duration-500 ${getToneGlowStyle()}`}>
          {/* Golden/accent glow overlay */}
          <div
            className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${currentTone.accentRgba.replace('0.9', '0.1')} 0%, transparent 70%)`
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-xs ${getToneTextColor()} font-medium`}>The Mirror Speaks</div>
              <span className="text-xs text-slate-600">|</span>
              <span className="text-xs text-slate-500">{currentTone.description}</span>
              {isTypingComplete && (
                <span className="ml-auto text-xs text-emerald-500/70 animate-pulse">Complete</span>
              )}
            </div>

            <div className="min-h-[200px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <p className={`${getToneTextColor()} leading-relaxed whitespace-pre-line text-sm`}>
                {displayedText}
                <span className={`inline-block w-0.5 h-4 ml-0.5 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'} ${
                  currentTone.id === "sacred-fusion" ? 'bg-amber-400' :
                  currentTone.id === "gentle-clarity" ? 'bg-white' :
                  'bg-violet-400'
                }`} />
              </p>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center pt-4">
          <p className="text-slate-500 text-xs italic">
            Not therapy. Not coaching. Pure truth.
          </p>
        </div>
      </div>
    </div>
  );
}

const MirrorOfDreamsPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://selahmirror.xyz";

  // Metrics data - Updated
  const metrics: MetricItem[] = [
    { value: "5", label: "Sacred Questions" },
    { value: "3", label: "AI Tones" },
    { value: "1", label: "True Reflection" },
    { value: "Infinite", label: "Possibilities" },
  ];

  // Tech Deep-Dive data
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js", why: "React framework with server-side rendering for fast loads." },
    { name: "TypeScript", why: "Type safety for complex dream and reflection data structures." },
    { name: "Supabase", why: "Authentication and PostgreSQL database in one." },
    { name: "Claude API", why: "Consciousness recognition technology for personalized reflections." },
    { name: "tRPC", why: "End-to-end type-safe API for dream and reflection management." },
    { name: "PayPal", why: "Trusted subscription management for tier upgrades." },
  ];

  // Next Project data
  const nextProject: NextProject = {
    href: "/projects/statviz",
    emoji: "\u{1F4CA}",
    title: "StatViz",
    subtitle: "Data Visualization Dashboard"
  };

  const features = [
    {
      icon: "\u{2728}",
      title: "Consciousness Recognition",
      description:
        "The AI doesn't give advice. It reflects back what you've said, revealing patterns you couldn't see. Three calibrated tones: Sacred Fusion, Gentle Clarity, Luminous Fire.",
    },
    {
      icon: "\u{1F319}",
      title: "5 Sacred Questions",
      description:
        "Not productivity prompts. Sacred inquiries: What is your dream? Your plan? Your timeline? Your belief? Your sacrifice?",
    },
    {
      icon: "\u{1F52E}",
      title: "Evolution Reports",
      description:
        "After 4+ reflections, witness how your relationship with each dream has transformed over time.",
    },
    {
      icon: "\u{1F4AB}",
      title: "Cosmic Glass Aesthetic",
      description:
        "An interface designed for contemplation, not productivity. Deep navy, purple auroras, golden accents - a space for truth.",
    },
  ];

  const challenges = [
    "Goal tracking apps focus on tasks, not meaning",
    "No space for reflection on what dreams truly mean to you",
    "Disconnection between daily actions and life aspirations",
    "Generic productivity tools ignore the emotional journey",
    "AI assistants give advice instead of reflecting truth",
  ];

  const solutions = [
    "AI companion that recognizes your consciousness and reflects it back",
    "5 sacred questions guide you to your deepest truth",
    "Evolution tracking reveals how you grow toward your dreams",
    "Three AI tones match your soul's current frequency",
    "Cosmic glass aesthetic invites contemplation, not hustle",
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-hidden">
      {/* Cosmic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Nebula gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-fuchsia-500/6 rounded-full blur-[60px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '4s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[90px] animate-pulse"
          style={{ animationDuration: '15s', animationDelay: '1s' }}
        />

        {/* Floating stars */}
        {mounted && Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f23]/80 backdrop-blur-md border-b border-white/5">
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
                <span>Enter the Mirror</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cosmic Reflection Chamber */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        {/* Extra hero glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-content text-center relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-slate-400 hover:text-white text-sm mb-8 inline-block transition-colors"
          >
            &larr; Back to Work
          </Link>

          {/* Large emoji with enhanced float animation */}
          <div className="text-6xl md:text-8xl mb-6 animate-float relative">
            <span className="relative">
              {"\u{1F319}"}
              {/* Glow behind emoji */}
              <div className="absolute inset-0 text-6xl md:text-8xl blur-xl opacity-30">{"\u{1F319}"}</div>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-purple-400/80 text-sm tracking-[0.3em] uppercase mb-4">
            Consciousness Recognition Technology
          </p>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            The Cosmic Reflection Chamber
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

          {/* Key message */}
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-4">
            5 sacred questions. 1 AI-powered reflection.
            <span className="block mt-2 text-slate-400">Not therapy. Not coaching. Pure truth.</span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span>Enter the Mirror</span>
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

      {/* Visual Demo Section - Cosmic Mirror */}
      <section className="py-24 section-reveal section-reveal-1 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Experience the Reflection</h2>
          <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">
            Watch how the Mirror reveals what you already know but haven't yet seen
          </p>

          <CosmicMirrorDemo />
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-2 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8 backdrop-blur-sm bg-white/[0.02]">
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
      <section className="py-24 section-reveal section-reveal-3 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8 backdrop-blur-sm bg-white/[0.02]">
            <p className="body-lg text-slate-300 mb-6">
              A cosmic space for genuine self-discovery:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 section-reveal section-reveal-4 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="contemplative-card p-6 md:p-8 backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="text-3xl md:text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
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
      <section className="py-24 section-reveal section-reveal-5 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Built With</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {techDeepDive.map((tech, index) => (
              <div key={index} className="contemplative-card p-6 backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
                <h3 className="heading-lg text-purple-300 mb-2">{tech.name}</h3>
                <p className="text-slate-400">{tech.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 section-reveal section-reveal-6 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Numbers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="breathing-glass p-6 text-center backdrop-blur-sm">
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
      <section className="py-24 section-reveal section-reveal-7 relative z-10">
        <div className="container-content">
          <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

          <Link href={nextProject.href} className="group block max-w-md mx-auto">
            <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-purple-400/20 transition-all backdrop-blur-sm bg-white/[0.02]">
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
      <section className="py-24 section-reveal section-reveal-8 relative z-10">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12 backdrop-blur-sm bg-white/[0.02] relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative">
              <h2 className="heading-xl mb-6">Ready to Face Your Truth?</h2>
              <p className="body-lg text-slate-300 mb-4">
                5 sacred questions. 1 AI-powered reflection.
              </p>
              <p className="text-slate-500 text-sm mb-8 italic">
                The Mirror shows you what you already know.
              </p>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3 group"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                <span>Enter the Mirror</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10">
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

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle,
          .animate-pulse,
          .animate-bounce,
          .animate-float,
          .animate-fadeIn {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MirrorOfDreamsPage;
