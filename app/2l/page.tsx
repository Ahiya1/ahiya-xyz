"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import {
  Target,
  Search,
  FileText,
  Hammer,
  GitMerge,
  Shield,
  RefreshCw,
  Zap,
  Eye,
  Grid3X3,
  ChevronDown,
  Mail,
  ArrowDown,
} from "lucide-react";

// Phase data for the pipeline
const phases = [
  {
    name: "Vision",
    icon: Target,
    description: "Requirements crystallized into clear objectives",
  },
  {
    name: "Exploration",
    icon: Search,
    description: "Parallel agents analyze architecture and patterns",
  },
  {
    name: "Planning",
    icon: FileText,
    description: "Concrete tasks with file-level specifications",
  },
  {
    name: "Building",
    icon: Hammer,
    description: "Multiple builders execute in parallel",
  },
  {
    name: "Integration",
    icon: GitMerge,
    description: "Outputs merged into cohesive codebase",
  },
  {
    name: "Validation",
    icon: Shield,
    description: "Automated testing against acceptance criteria",
  },
  {
    name: "Healing",
    icon: RefreshCw,
    description: "Self-correcting loop for validation failures",
  },
];

// Agent types data
const agents = [
  {
    name: "Explorers",
    description: "Deep codebase analysis before any code is written",
    icon: Search,
  },
  {
    name: "Planners",
    description: "Concrete implementation plans with file specifications",
    icon: FileText,
  },
  {
    name: "Builders",
    description: "Parallel feature development with conflict awareness",
    icon: Hammer,
  },
  {
    name: "Integrators",
    description: "Systematic merge of parallel work streams",
    icon: GitMerge,
  },
  {
    name: "Validators",
    description: "Automated acceptance testing and quality gates",
    icon: Shield,
  },
  {
    name: "Healers",
    description: "Self-correcting fixes when issues arise",
    icon: RefreshCw,
  },
];

// Benefits data
const benefits = [
  {
    title: "Weeks, Not Months",
    description:
      "Parallel agent execution compresses timelines. Multiple features built simultaneously. What takes weeks with traditional approaches ships in days.",
    icon: Zap,
  },
  {
    title: "Validation at Every Phase",
    description:
      "Quality gates between every phase transition. No code moves forward without passing automated checks. Self-healing handles edge cases automatically.",
    icon: Shield,
  },
  {
    title: "Full Audit Trail",
    description:
      "Every agent action logged. Every decision traceable. Real-time dashboard shows exactly what's happening. You never wonder where your project stands.",
    icon: Eye,
  },
  {
    title: "Patterns Enforced Across Builders",
    description:
      "All builders follow the same patterns document. No style drift. No architectural inconsistencies. Code that reads like one developer wrote it.",
    icon: Grid3X3,
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
      "2L works without internet. Works without external dependencies. Core functionality runs entirely local. Optional features fail safely without blocking progress.",
  },
  {
    name: "5-Tier Validation",
    content:
      "Not just pass/fail. Validation uses 5 statuses: PASS, UNCERTAIN, PARTIAL, INCOMPLETE, FAIL. Honest quality assessment at every gate.",
  },
];

// Case study metrics
const metrics = [
  { label: "7 iterations", value: "7" },
  { label: "10+ features per iteration", value: "10+" },
  { label: "Real-time observability", value: "Live" },
  { label: "Self-healing active", value: "On" },
];

export default function TwoLPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          <h1 className="display-xl text-white mb-6">
            <span className="hero-word" style={{ animationDelay: "0.1s" }}>
              <span className="text-gentle">AI-Orchestrated</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: "0.3s" }}>
              <span className="text-white">Development</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: "0.5s" }}>
              <span className="text-white">at Enterprise Scale</span>
            </span>
          </h1>

          <p
            className="body-xl text-slate-300 max-w-3xl mx-auto mb-10 hero-subline"
            style={{ animationDelay: "0.8s" }}
          >
            From vision to validated system in days, not months. 2L is my
            proprietary multi-agent framework that accelerates complex builds
            without sacrificing quality.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-ctas"
            style={{ animationDelay: "1.0s" }}
          >
            <a
              href="#pipeline"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
            >
              See How It Works
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

      {/* Pipeline Section */}
      <section id="pipeline" className="section-breathing section-reveal section-reveal-1">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">The 2L Pipeline</h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              2L coordinates specialized AI agents through a structured
              pipeline. Each phase has clear inputs, outputs, and quality gates.
              Nothing ships without validation.
            </p>
          </div>

          {/* Pipeline Phases */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-7 left-[7%] right-[7%] h-0.5 bg-purple-500/20" />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4">
              {phases.map((phase, index) => (
                <div
                  key={phase.name}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Circle with icon */}
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mb-3 relative z-10 bg-[#0a0f1a]">
                    <phase.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">
                    {phase.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Self-Healing Callout */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="contemplative-card p-6 text-center">
              <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="heading-lg text-white mb-2">Self-Healing Loop</h3>
              <p className="text-slate-400 text-sm">
                When validation fails, the system doesn't stop. A healing agent
                diagnoses issues, implements fixes, and re-validates. Up to 3
                healing rounds per failure. No manual intervention required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Types Section */}
      <section className="section-breathing section-reveal section-reveal-2">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">
              Specialized Agents, Coordinated Results
            </h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              Each agent type has a specific role in the pipeline. Working in
              parallel, they deliver results faster than traditional
              development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.name} className="contemplative-card p-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mb-4">
                  <agent.icon className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="heading-lg text-white mb-2">{agent.name}</h3>
                <p className="text-slate-400 text-sm">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-breathing section-reveal section-reveal-3">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">
              Why This Matters for Your Project
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="contemplative-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="heading-lg text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="section-breathing section-reveal section-reveal-4">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">Built with 2L</h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              This portfolio site was itself built using the 2L system. Here's
              what that looked like:
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="contemplative-card p-4 text-center"
              >
                <div className="text-2xl font-bold text-purple-300 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Case Study Detail */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-400 mb-6">
              Each major feature set shipped as a complete iteration. The 2L
              dashboard tracked every agent in real-time. When validation caught
              issues, healing agents fixed them automatically. The result: a
              production site that evolved incrementally, with full audit trails
              for every change.
            </p>
            <Link
              href="/#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              See the Work
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Depth Section */}
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

      {/* Final CTA Section */}
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
