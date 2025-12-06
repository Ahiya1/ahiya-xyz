"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import {
  Target,
  FileText,
  Hammer,
  Shield,
  RefreshCw,
  Zap,
  Eye,
  ChevronDown,
  Mail,
  ArrowDown,
} from "lucide-react";

// 2L Components
import { TerminalAnimation } from "@/app/components/2l/TerminalAnimation";
import { LiveDashboard } from "@/app/components/2l/LiveDashboard";

// 4 Steps data
const steps = [
  {
    name: "Vision",
    icon: Target,
    description: "You describe what you need",
  },
  {
    name: "Plan",
    icon: FileText,
    description: "AI architects the solution",
  },
  {
    name: "Build",
    icon: Hammer,
    description: "Parallel agents execute",
  },
  {
    name: "Ship",
    icon: Shield,
    description: "Validated, tested, deployed",
  },
];

// The Promise - What You Get
const promise = [
  {
    title: "Speed",
    primary: "Days, not months",
    secondary: "Parallel execution",
    color: "#a78bfa",
  },
  {
    title: "Quality",
    primary: "Self-healing validation",
    secondary: "Automated testing",
    color: "#22c55e",
  },
  {
    title: "Visibility",
    primary: "Real-time progress",
    secondary: "Full audit trail",
    color: "#60a5fa",
  },
];

// What Makes 2L Different
const differentiators = [
  {
    title: "Self-Healing",
    description:
      "Validation fails? System fixes itself. Up to 3 healing rounds with zero manual intervention.",
    icon: RefreshCw,
  },
  {
    title: "Parallel Execution",
    description:
      "Multiple features built simultaneously. What takes weeks with traditional approaches ships in days.",
    icon: Zap,
  },
  {
    title: "Audit Trail",
    description:
      "Every decision logged and traceable. You never wonder where your project stands.",
    icon: Eye,
  },
];

// Technical accordion items
const technicalItems = [
  {
    name: "Multi-Iteration Architecture",
    content:
      "Complex projects break into iterations. Foundation first, core features second, advanced features third. Each iteration is self-contained with its own exploration, planning, building, and validation phases.",
  },
  {
    name: "Event-Driven Observability",
    content:
      "All events stream to a real-time dashboard. 8 event types track everything from phase changes to validation results. Non-blocking writes ensure events never slow the build.",
  },
  {
    name: "Graceful Degradation",
    content:
      "Optional features like the event dashboard fail safely without blocking builds. Core pipeline continues even if observability tools are unavailable. Non-blocking event logging ensures builds are never slowed.",
  },
  {
    name: "5-Tier Validation",
    content:
      "Not just pass/fail. Validation uses 5 statuses: PASS, UNCERTAIN, PARTIAL, INCOMPLETE, FAIL. Honest quality assessment at every gate.",
  },
];

export default function TwoLPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Steps cycling animation
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Section 1: Hero */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          <h1 className="display-xl text-white mb-6">
            <span className="hero-word" style={{ animationDelay: "0.1s" }}>
              <span className="text-gentle">Ship Complete Systems</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: "0.3s" }}>
              <span className="text-white">in Days,</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: "0.5s" }}>
              <span className="text-white">Not Months</span>
            </span>
          </h1>

          <p
            className="body-xl text-slate-300 max-w-3xl mx-auto mb-10 hero-subline"
            style={{ animationDelay: "0.8s" }}
          >
            2L coordinates AI agents to build, validate, and deploy your project
            faster than traditional development.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-ctas"
            style={{ animationDelay: "1.0s" }}
          >
            <a
              href="#watch-build"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
            >
              Watch It Build
              <ArrowDown className="w-4 h-4 ml-2" />
            </a>
            <a
              href="#case-study"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              View Case Study
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Watch a Complete Build */}
      <section
        id="watch-build"
        className="section-breathing section-reveal section-reveal-1"
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">
              Watch a Complete Build
            </h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              A simulated 2L session building a customer portal. Multiple agents
              working in parallel, validating, and shipping.
            </p>
          </div>
          <TerminalAnimation />
          <div className="mt-12">
            <LiveDashboard />
          </div>
        </div>
      </section>

      {/* Section 3: The Promise - What You Get */}
      <section className="section-breathing section-reveal section-reveal-2">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">What You Get</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {promise.map((item) => (
              <div
                key={item.title}
                className="contemplative-card p-8 text-center"
              >
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-xl text-white font-medium mb-2">
                  {item.primary}
                </p>
                <p className="text-slate-400">{item.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works - Four Steps */}
      <section
        id="pipeline"
        className="section-breathing section-reveal section-reveal-3"
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">Four Steps to Shipped</h2>
          </div>

          {/* Steps Layout */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-purple-500/20">
              <div className="absolute inset-0 pipeline-line-animated" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Circle with icon */}
                  <div
                    className={`w-14 h-14 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mb-4 relative z-10 bg-[#0a0f1a] transition-all duration-300 ${
                      activeStep === index
                        ? "pipeline-phase-active border-purple-400/60"
                        : ""
                    }`}
                  >
                    <step.icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        activeStep === index ? "text-purple-200" : "text-purple-300"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                      activeStep === index ? "text-purple-200" : "text-white"
                    }`}
                  >
                    {step.name}
                  </h3>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: What Makes 2L Different */}
      <section className="section-breathing section-reveal section-reveal-4">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">
              Not Just Code Generation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="contemplative-card card-lift-premium p-6"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="heading-lg text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Under the Hood */}
      <section className="section-breathing section-reveal section-reveal-5">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">Under the Hood</h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              For the technically curious, here's how 2L works at a deeper
              level.
            </p>
          </div>

          <div className="contemplative-card p-2">
            {technicalItems.map((item, index) => (
              <div
                key={item.name}
                className={`${
                  index !== technicalItems.length - 1
                    ? "border-b border-white/5"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    setOpenItem(openItem === item.name ? null : item.name)
                  }
                  className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-white/5 transition-colors rounded-lg"
                >
                  <span className="text-white font-medium">{item.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      openItem === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItem === item.name
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-4 text-slate-400 text-sm">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="section-breathing section-reveal section-reveal-6">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl text-white mb-4">
              Ready to Build Something?
            </h2>
            <p className="body-lg text-slate-400 mb-8 max-w-xl mx-auto">
              Let's talk about your project. I'll show you how 2L can accelerate
              your timeline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"
              >
                <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                Get in Touch
              </a>
              <Link
                href="/capabilities"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
              >
                View Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
