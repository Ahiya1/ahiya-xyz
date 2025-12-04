"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import {
  Mail,
  Github,
  Globe,
  Printer,
  ExternalLink,
  Server,
  Brain,
  BarChart3,
  Workflow,
  Code2,
  Sparkles,
} from "lucide-react";

export default function CapabilitiesPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  const capabilities = [
    {
      icon: Server,
      title: "Full-Stack SaaS Systems",
      description: "User management, dashboards, admin panels, auth, analytics",
    },
    {
      icon: Brain,
      title: "AI Pipelines & Orchestration",
      description: "Embedding workflows, RAG systems, multi-agent reasoning, automation",
    },
    {
      icon: BarChart3,
      title: "Research Tools & Statistical Systems",
      description: "Factorial design engines, dataset generation, analysis dashboards",
    },
    {
      icon: Workflow,
      title: "Business Automation Tools",
      description: "Internal dashboards, workflow automation, CRM-like tools",
    },
    {
      icon: Code2,
      title: "Custom APIs & Backend Infrastructure",
      description: "Fast, scalable, containerized, production-ready",
    },
    {
      icon: Sparkles,
      title: "UX-Light Tools That Do Heavy Lifting",
      description: "Focused, minimal interfaces backed by strong logic",
    },
  ];

  const selectedWork = [
    {
      title: "Mirror of Dreams",
      subtitle: "AI Reflection Engine",
      description: "Semantic journaling with insights, prompt flows, vector search, daily reflection cycles. Tiered subscriptions with PayPal. Built in 3 weeks.",
      href: "/projects/mirror-of-dreams",
    },
    {
      title: "Wealth",
      subtitle: "Personal Finance SaaS",
      description: "Complete budgeting and tracking with Israeli bank connections, AI categorization, and forecasting. Full-stack with Prisma and PostgreSQL.",
      href: "/projects/wealth",
    },
    {
      title: "StatViz",
      subtitle: "Statistical Reports Platform",
      description: "B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
      href: "/projects/statviz",
    },
    {
      title: "AI Research Pipeline",
      subtitle: "Factorial Design Tool",
      description: "Controlled, demographically weighted narrative generation for research at scale. Full experiment management and export.",
      href: "/projects/ai-research-pipeline",
    },
  ];

  const techStack = {
    Backend: ["Node", "Python", "Flask", "FastAPI"],
    Frontend: ["React", "Next.js", "Tailwind"],
    Infrastructure: ["Docker", "Nginx"],
    Databases: ["MongoDB", "Postgres", "Supabase"],
    "AI/ML": ["OpenAI API", "Claude API", "Vector stores", "RAG pipelines"],
    DevOps: ["GitHub", "CI/CD", "Vercel", "Cloudflare"],
  };

  return (
    <>
      {/* Screen styles */}
      <style jsx global>{`
        @media print {
          /* Hide navigation and footer for print */
          nav, footer, .print-hide {
            display: none !important;
          }

          /* Reset background colors for print */
          body, main, .capabilities-main {
            background: white !important;
            color: #1e293b !important;
          }

          /* Reset card styles for print */
          .print-card {
            background: white !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            break-inside: avoid;
          }

          /* Typography for print */
          .print-title {
            color: #1e293b !important;
            font-family: 'Crimson Text', Georgia, serif !important;
          }

          .print-text {
            color: #334155 !important;
          }

          .print-muted {
            color: #64748b !important;
          }

          /* Gradient text reset for print */
          .text-gentle {
            background: none !important;
            -webkit-background-clip: initial !important;
            -webkit-text-fill-color: #7c3aed !important;
            background-clip: initial !important;
            color: #7c3aed !important;
          }

          /* Links for print */
          a {
            color: #7c3aed !important;
            text-decoration: none !important;
          }

          /* Page layout for print */
          .capabilities-main {
            padding: 0 !important;
          }

          .section-breathing {
            padding: 1.5rem 0 !important;
          }

          /* Ensure content fits on pages */
          .print-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Hero gradient reset */
          .hero-gradient-bg::before {
            display: none !important;
          }
        }
      `}</style>

      <main id="main-content" className="capabilities-main bg-[#0a0f1a] min-h-screen">
        <Navigation />

        {/* Header / Identity Block */}
        <section className="section-breathing pt-32 hero-gradient-bg print-section">
          <div className="container-content text-center">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="print-hide inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm text-slate-400 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Printer className="w-4 h-4" />
              Print / Download PDF
            </button>

            <h1 className="display-xl text-white mb-4 print-title">
              <span className="text-gentle">Ahiya Butman</span>
            </h1>
            <p className="heading-lg text-slate-300 mb-6 print-text">
              Systems Developer & AI Architect
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
              <a
                href="https://ahiya.xyz"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors print-muted"
              >
                <Globe className="w-4 h-4" />
                ahiya.xyz
              </a>
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors print-muted"
              >
                <Mail className="w-4 h-4" />
                ahiya.butman@gmail.com
              </a>
              <a
                href="https://github.com/Ahiya1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors print-muted"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* Tagline */}
            <p className="body-xl text-slate-300 max-w-2xl mx-auto print-text">
              Custom research systems, business tools, and AI pipelines. Delivered fast.
            </p>
          </div>
        </section>

        {/* Core Value Proposition */}
        <section className="section-breathing section-reveal section-reveal-1 print-section">
          <div className="container-content">
            <p className="body-xl text-slate-300 text-center print-text">
              I build custom systems that solve real business problems. From research automation
              to SaaS tools to proprietary AI pipelines, I take projects from concept to deployed
              product in weeks, not months. My process combines deep technical ability with the
              2L orchestration framework, enabling rapid iteration and precise execution.
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section-breathing section-reveal section-reveal-2 print-section">
          <div className="container-wide">
            <h2 className="display-lg text-white text-center mb-12 print-title">Capabilities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => (
                <div
                  key={capability.title}
                  className="contemplative-card p-6 print-card"
                >
                  <capability.icon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="heading-lg text-white mb-2 print-title">{capability.title}</h3>
                  <p className="text-slate-400 print-muted">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="section-breathing section-reveal section-reveal-3 print-section">
          <div className="container-wide">
            <h2 className="display-lg text-white text-center mb-12 print-title">Selected Work</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedWork.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="contemplative-card p-6 group print-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="heading-lg text-white group-hover:text-purple-300 transition-colors print-title">
                        {project.title}
                      </h3>
                      <p className="text-purple-400 text-sm print-muted">{project.subtitle}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors print-hide" />
                  </div>
                  <p className="text-slate-400 print-muted">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* The 2L Method */}
        <section className="section-breathing section-reveal section-reveal-4 print-section">
          <div className="container-content">
            <div className="contemplative-card p-8 text-center print-card">
              <h2 className="display-lg text-white mb-6 print-title">The 2L Orchestration Framework</h2>
              <p className="body-lg text-slate-300 mb-6 print-text">
                My proprietary multi-agent development pipeline that accelerates specification,
                architecture, and implementation. 2L coordinates specialized AI agents through
                structured phases with built-in validation and self-healing. This is how I
                consistently deliver complex systems in short timelines.
              </p>
              <Link
                href="/2l"
                className="print-hide inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
              >
                Learn more about 2L
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="section-breathing section-reveal section-reveal-5 print-section">
          <div className="container-content">
            <h2 className="display-lg text-white text-center mb-12 print-title">How We Work Together</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-300 font-semibold">1</span>
                </div>
                <h3 className="heading-lg text-white mb-2 print-title">Define</h3>
                <p className="text-slate-400 print-muted">
                  Map needs and outline system architecture together
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-300 font-semibold">2</span>
                </div>
                <h3 className="heading-lg text-white mb-2 print-title">Build</h3>
                <p className="text-slate-400 print-muted">
                  Short, focused cycles with fast iteration and visible progress
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-300 font-semibold">3</span>
                </div>
                <h3 className="heading-lg text-white mb-2 print-title">Launch</h3>
                <p className="text-slate-400 print-muted">
                  Deployment, optimization, documentation, and handoff
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section-breathing section-reveal section-reveal-6 print-section">
          <div className="container-wide">
            <h2 className="display-lg text-white text-center mb-12 print-title">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="contemplative-card p-6 print-card">
                  <h3 className="heading-lg text-white mb-3 print-title">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-purple-500/10 border border-purple-400/20 rounded-full text-slate-300 print-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Availability & Contact */}
        <section className="section-breathing section-reveal section-reveal-7 print-section">
          <div className="container-content">
            <div className="contemplative-card p-8 text-center print-card">
              <h2 className="display-lg text-white mb-6 print-title">Availability</h2>
              <p className="body-lg text-slate-300 mb-8 print-text">
                Usually available for 1-2 mid-size projects per month.
                Strong preference for well-defined goals and fast-paced cycles.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                >
                  <Mail className="w-5 h-5" />
                  ahiya.butman@gmail.com
                </a>
                <a
                  href="https://ahiya.xyz"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                >
                  <Globe className="w-5 h-5" />
                  ahiya.xyz
                </a>
                <a
                  href="https://github.com/Ahiya1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Footer */}
        <section className="section-breathing section-reveal section-reveal-8 print-section">
          <div className="container-content text-center">
            <p className="text-slate-500 italic print-muted">
              Intention. Clarity. Results.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
