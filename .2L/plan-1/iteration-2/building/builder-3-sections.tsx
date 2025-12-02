/**
 * Builder-3: How I Work and Contact Section Content
 *
 * This file contains the JSX for the "How I Work" and "Contact" sections
 * to be integrated into the main page.tsx by the integrator.
 *
 * Required imports for integration:
 * import { ArrowRight, Mail, Github } from "lucide-react";
 */

import { ArrowRight, Mail, Github } from "lucide-react";

// =============================================================================
// HOW I WORK SECTION
// =============================================================================
// Replace: {/* BUILDER-3 ZONE START - HOW I WORK */} ... {/* BUILDER-3 ZONE END - HOW I WORK */}
//
// This section should be placed inside a <section> with id="how-i-work"
// Recommended wrapper:
// <section id="how-i-work" className="section-breathing">
//   <div className="container-content">
//     {/* INSERT HOW I WORK CONTENT HERE */}
//   </div>
// </section>

export function HowIWorkContent() {
  return (
    <div className="text-center">
      <h2 className="display-lg text-white mb-6">How I Work</h2>
      <div className="max-w-2xl mx-auto">
        <p className="body-xl text-slate-300 mb-6 leading-relaxed">
          I use <span className="text-gentle font-medium">2L</span>, a development
          framework I built that coordinates AI agents to explore, plan, build,
          and validate software autonomously.
        </p>
        <p className="body-lg text-slate-400 mb-8">
          This is why I deliver complete systems faster than traditional development.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
        >
          <span>Ask me about it</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// =============================================================================
// CONTACT SECTION
// =============================================================================
// Replace: {/* BUILDER-3 ZONE START - CONTACT */} ... {/* BUILDER-3 ZONE END - CONTACT */}
//
// This section should be placed inside a <section> with id="contact"
// Recommended wrapper:
// <section id="contact" className="section-breathing">
//   <div className="container-narrow">
//     {/* INSERT CONTACT CONTENT HERE */}
//   </div>
// </section>

export function ContactContent() {
  return (
    <div className="contemplative-card p-8 md:p-12 text-center">
      <h2 className="heading-xl text-white mb-4">Work With Me</h2>
      <p className="body-lg text-slate-300 mb-8">
        Looking for a developer who can own your next feature or MVP?
      </p>

      <a
        href="mailto:ahiya.butman@gmail.com"
        className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50 mb-6"
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
  );
}

// =============================================================================
// INLINE JSX FOR DIRECT COPY-PASTE
// =============================================================================
// If the integrator prefers to copy JSX directly rather than importing
// components, use the following:

/*
HOW I WORK SECTION - Copy this inside the how-i-work section wrapper:

<div className="text-center">
  <h2 className="display-lg text-white mb-6">How I Work</h2>
  <div className="max-w-2xl mx-auto">
    <p className="body-xl text-slate-300 mb-6 leading-relaxed">
      I use <span className="text-gentle font-medium">2L</span>, a development
      framework I built that coordinates AI agents to explore, plan, build,
      and validate software autonomously.
    </p>
    <p className="body-lg text-slate-400 mb-8">
      This is why I deliver complete systems faster than traditional development.
    </p>
    <a
      href="#contact"
      className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
    >
      <span>Ask me about it</span>
      <ArrowRight className="w-4 h-4" />
    </a>
  </div>
</div>

CONTACT SECTION - Copy this inside the contact section wrapper:

<div className="contemplative-card p-8 md:p-12 text-center">
  <h2 className="heading-xl text-white mb-4">Work With Me</h2>
  <p className="body-lg text-slate-300 mb-8">
    Looking for a developer who can own your next feature or MVP?
  </p>

  <a
    href="mailto:ahiya.butman@gmail.com"
    className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50 mb-6"
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
*/
