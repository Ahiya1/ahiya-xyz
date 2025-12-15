"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { MagneticButton } from "@/app/components/reactive";
import { cvConfig, getMailtoUrl } from "@/lib/cv-config";

export default function CVPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration guard - prevents SSR/client mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  const isOpen = cvConfig.availabilityStatus === "open";

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      {/* Vision Section */}
      <section className="pt-32 pb-24">
        <div className="container-content text-center">
          <h1 className="display-lg text-white mb-6">
            {cvConfig.copy.headline}
          </h1>
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-8">
            {cvConfig.copy.subheadline}
          </p>
          <p className="body-lg text-slate-400 max-w-xl mx-auto">
            {cvConfig.copy.philosophy}
          </p>
        </div>
      </section>

      {/* Systems Section */}
      <section className="section-breathing">
        <div className="container-content">
          <p className="text-slate-500 text-xs tracking-[0.2em] uppercase text-center mb-8">
            SYSTEMS
          </p>

          <div className="space-y-6">
            {cvConfig.systems.map((project, index) => (
              <div key={index} className="text-center">
                {project.link ? (
                  <a
                    href={project.link}
                    target={project.external ? "_blank" : undefined}
                    rel={project.external ? "noopener noreferrer" : undefined}
                    className="text-white font-medium hover:text-purple-400 transition-colors"
                  >
                    {project.name}
                    {project.external && (
                      <ExternalLink className="inline w-3 h-3 ml-1 opacity-50" />
                    )}
                  </a>
                ) : (
                  <span className="text-white font-medium">{project.name}</span>
                )}
                <p className="text-slate-400 text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="section-breathing">
        <div className="container-content">
          <p className="text-slate-500 text-xs tracking-[0.2em] uppercase text-center mb-8">
            SCOPE
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {cvConfig.copy.operationalScope.map((scope, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Availability + Contact Section */}
      <section className="section-breathing">
        <div className="container-content">
          {/* Availability Indicator */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOpen ? "bg-emerald-500" : "bg-slate-500"
              }`}
              aria-hidden="true"
            />
            <span className="text-slate-300">
              {isOpen ? cvConfig.copy.availabilityOpen : cvConfig.copy.availabilityClosed}
            </span>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="heading-lg text-white mb-4">Contact</h3>
            <MagneticButton pullStrength={0.4}>
              <a
                href={getMailtoUrl()}
                className="text-xl text-purple-400 hover:text-purple-300 transition-colors"
                data-track-click="cv_email"
              >
                {cvConfig.contactEmail}
              </a>
            </MagneticButton>
            <p className="text-slate-600 text-sm mt-3">
              {cvConfig.copy.contactSupportText}
            </p>
          </div>

          {/* PDF Download */}
          <p className="text-center text-slate-600 text-xs mt-12">
            <MagneticButton pullStrength={0.3}>
              <a
                href="/ahiya-cv.pdf"
                download
                className="hover:text-slate-500 transition-colors underline"
                data-track-click="cv_pdf_download"
              >
                {cvConfig.copy.pdfDownloadText}
              </a>
            </MagneticButton>
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container-content text-center">
          <Link
            href="/"
            className="text-slate-600 text-xs hover:text-slate-500 transition-colors"
          >
            ahiya.xyz
          </Link>
        </div>
      </footer>
    </main>
  );
}
