"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Zap,
  Eye,
  Mail,
  ArrowDown,
} from "lucide-react";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { MagneticButton } from "@/app/components/reactive";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

// 2L Components - New in Plan-13
import { InvoiceFlowDemo } from "@/app/components/2l/InvoiceFlowDemo";
import { PipelineVisualization } from "@/app/components/2l/PipelineVisualization";
import { AgentCards } from "@/app/components/2l/AgentCards";
import { BuiltBy2LBadge } from "@/app/components/2l/BuiltBy2LBadge";
import { EternalConstruction } from "@/app/components/2l/EternalConstruction";

// The Promise - What You Get (KEPT)
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

// What Makes 2L Different (KEPT)
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

export default function TwoLPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

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
      {/* EternalConstruction canvas animation - only render if not reduced motion */}
      {!prefersReducedMotion && <EternalConstruction />}

      <Navigation />

      {/* Section 1: Hero (KEPT) */}
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
            <MagneticButton pullStrength={0.4}>
              <a
                href="#watch-build"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                data-track-click="twol_watch_build"
              >
                Watch It Build
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>
            </MagneticButton>
            <MagneticButton pullStrength={0.3}>
              <a
                href="#case-study"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                data-track-click="twol_view_case_study"
              >
                View Case Study
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Section 2: InvoiceFlow Demo (NEW) */}
      <section
        id="watch-build"
        className="section-breathing section-reveal section-reveal-1"
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">
              Watch 2L Build a Complete Product
            </h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              From vision to deployed landing page. Watch the full /2l-vision &rarr; /2l-plan &rarr; /2l-mvp flow.
            </p>
          </div>
          <InvoiceFlowDemo />
        </div>
      </section>

      {/* Section 3: Built by 2L Badge (NEW - subtle, after demo) */}
      <section className="py-8">
        <BuiltBy2LBadge />
      </section>

      {/* Section 4: The Pipeline - 7-Phase (REPLACED) */}
      <section
        id="pipeline"
        className="section-breathing section-reveal section-reveal-2"
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">Seven Phases, Zero Guesswork</h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              Each phase has clear inputs, outputs, and quality gates. The self-healing loop handles failures automatically.
            </p>
          </div>
          <PipelineVisualization />
        </div>
      </section>

      {/* Section 5: The Promise - What You Get (KEPT) */}
      <section className="section-breathing section-reveal section-reveal-3">
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

      {/* Section 6: What Makes 2L Different (KEPT) */}
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

      {/* Section 7: Under the Hood - Agent Cards (REPLACED) */}
      <section id="under-the-hood" className="section-breathing section-reveal section-reveal-5">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">The Agent Architecture</h2>
            <p className="body-lg text-slate-400 max-w-2xl mx-auto">
              Seven specialized agent types work in coordination. Click any card to learn more.
            </p>
          </div>
          <AgentCards />
        </div>
      </section>

      {/* Section 8: Final CTA (KEPT) */}
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
              <MagneticButton pullStrength={0.4}>
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"
                  data-track-click="twol_get_in_touch"
                  data-track-conversion="contact_intent"
                >
                  <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get in Touch
                </a>
              </MagneticButton>
              <MagneticButton pullStrength={0.3}>
                <Link
                  href="/capabilities"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                  data-track-click="twol_view_capabilities"
                >
                  View Capabilities
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
