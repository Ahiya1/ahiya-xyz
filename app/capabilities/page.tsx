"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import {
  Download,
  Mail,
  Github,
  Globe,
  FileText,
  CheckCircle2,
  ArrowRight,
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

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  const pdfHighlights = [
    "Complete capabilities overview",
    "Selected work with project details",
    "Full tech stack breakdown",
    "Contact information",
  ];

  const capabilities = [
    {
      icon: Server,
      title: "Full-Stack SaaS",
      description: "User management, dashboards, auth",
    },
    {
      icon: Brain,
      title: "AI Pipelines",
      description: "RAG systems, multi-agent reasoning",
    },
    {
      icon: BarChart3,
      title: "Research Tools",
      description: "Statistical systems, data analysis",
    },
    {
      icon: Workflow,
      title: "Automation",
      description: "Workflow tools, internal dashboards",
    },
    {
      icon: Code2,
      title: "APIs & Backend",
      description: "Fast, scalable, containerized",
    },
    {
      icon: Sparkles,
      title: "Premium Web UIs",
      description: "Beautiful, responsive, production-ready interfaces",
    },
  ];

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section with Download CTA */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-purple-500/10 border border-purple-400/30 rounded-full text-purple-300 text-sm">
            <FileText className="w-4 h-4" />
            Professional One-Page Overview
          </div>

          <h1 className="display-xl text-white mb-6">
            <span className="text-gentle">Your Complete</span>
            <br />
            <span className="text-gentle">Capabilities Overview</span>
          </h1>

          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Everything you need to know about my expertise, past work, and technical capabilities - condensed into a beautiful, professional PDF.
          </p>

          {/* Primary Download Button */}
          <a
            href="/ahiya-capabilities.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-500/20 border border-purple-400/40 rounded-xl text-white font-medium text-lg transition-all duration-300 hover:bg-purple-500/30 hover:border-purple-400/60 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Capabilities PDF
          </a>

          <p className="text-slate-500 text-sm mt-4">
            One page, professionally formatted, ready to share
          </p>
        </div>
      </section>

      {/* PDF Contents Preview */}
      <section className="section-breathing section-reveal section-reveal-1">
        <div className="container-content">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl text-white text-center mb-8">
              What's Inside
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {pdfHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-slate-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Secondary Download */}
            <div className="text-center">
              <a
                href="/ahiya-capabilities.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
              >
                <Download className="w-4 h-4" />
                Get the PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Capabilities Preview */}
      <section className="section-breathing section-reveal section-reveal-2">
        <div className="container-wide">
          <h2 className="display-lg text-white text-center mb-4">Capabilities at a Glance</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            A preview of what I build. Get the full details in the PDF.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="contemplative-card p-6"
              >
                <capability.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="heading-lg text-white mb-2">{capability.title}</h3>
                <p className="text-slate-400">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing section-reveal section-reveal-3">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl text-white mb-4">Ready to Connect?</h2>
            <p className="body-lg text-slate-400 mb-8">
              Download the PDF, review my work, and let's discuss your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/ahiya-capabilities.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </div>

            {/* Additional Links */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10">
              <a
                href="https://ahiya.xyz"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
                ahiya.xyz
              </a>
              <a
                href="https://github.com/Ahiya1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="section-breathing section-reveal section-reveal-4">
        <div className="container-content text-center">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
