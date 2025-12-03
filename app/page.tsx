"use client";

import { Mail, Github, Code, Database, FlaskConical, Layers, Star } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PortfolioCard } from "@/app/components/PortfolioCard";
import { SectionHeading } from "@/app/components/SectionHeading";
import { portfolioProjects } from "@/app/data/portfolio";

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          {/* Headline */}
          <h1 className="display-xl text-white mb-6">
            I build systems with <span className="text-gentle">clarity</span>, <span className="text-gentle">intention</span>, and the speed of good engineering.
          </h1>

          {/* Subheadline */}
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10">
            A boutique studio delivering complete SaaS systems, AI research tools, and automated workflows — designed, built, and deployed end-to-end with precision and intention.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-6">About Me</h2>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="body-xl text-slate-300 mb-4">
              I'm Ahiya, a systems architect and full-stack engineer.
            </p>
            <p className="body-lg text-slate-400">
              I build complete software systems — architecture, backend, frontend, AI tooling, automation, UX, and deployment. Every system is designed with clarity, built with intention, and delivered with clean, scalable engineering.
            </p>
          </div>

          {/* Four Pillars */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <h3 className="heading-lg text-white mb-2">Architecture</h3>
              <p className="text-slate-400">Clear data models, services, structure</p>
            </div>
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <h3 className="heading-lg text-white mb-2">Speed</h3>
              <p className="text-slate-400">Rapid development without sacrificing quality</p>
            </div>
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <h3 className="heading-lg text-white mb-2">Intention</h3>
              <p className="text-slate-400">Thoughtful design, grounded decision-making</p>
            </div>
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <h3 className="heading-lg text-white mb-2">Intelligence</h3>
              <p className="text-slate-400">Modern AI pipelines where they matter</p>
            </div>
          </div>

          <p className="body-lg text-slate-400 text-center italic">
            I work alone, but I build like a studio: fast, reliable, well-structured, and aesthetically clean.
          </p>
        </div>
      </section>

      {/* What I Build Section */}
      <section id="services" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-12">What I Build</h2>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="breathing-glass p-6 rounded-2xl">
              <Code className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">SaaS Systems</h3>
              <p className="text-slate-400">Full-stack platforms built from the ground up, including architecture, backend, frontend, and deployment.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <FlaskConical className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">AI Research Tools</h3>
              <p className="text-slate-400">Custom pipelines for generating structured data, research stimuli, personas, factorial design outputs, and automated workflows.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <Database className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">Automation & Data Pipelines</h3>
              <p className="text-slate-400">CSV processors, LLM-driven generators, ETL workflows, and research automation.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <Layers className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">Architecture & Technical Design</h3>
              <p className="text-slate-400">Database schema design, service layer design, and long-term system planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-breathing">
        <div className="container-wide">
          <SectionHeading
            title="Selected Work"
            description="Real systems, deployed and running. Each project showcases end-to-end development: architecture, implementation, and deployment."
          />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {portfolioProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section id="how-i-work" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-4">How I Work</h2>
          <p className="body-lg text-slate-400 text-center mb-12 max-w-xl mx-auto">
            A simple, transparent, end-to-end process.
          </p>

          {/* Three Phases */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <div className="text-purple-400 text-sm font-medium mb-2">Phase 1</div>
              <h3 className="heading-lg text-white mb-3">Architecture</h3>
              <p className="text-slate-400 text-sm">We define the system clearly: requirements, flows, data models, milestones, and scope.</p>
              <p className="text-slate-500 text-xs mt-3 italic">Outcome: a sharp blueprint</p>
            </div>
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <div className="text-purple-400 text-sm font-medium mb-2">Phase 2</div>
              <h3 className="heading-lg text-white mb-3">Build</h3>
              <p className="text-slate-400 text-sm">Rapid development across backend, frontend, UI, automation, and AI components.</p>
              <p className="text-slate-500 text-xs mt-3 italic">Outcome: a functioning, production-grade system</p>
            </div>
            <div className="breathing-glass p-6 rounded-2xl text-center">
              <div className="text-purple-400 text-sm font-medium mb-2">Phase 3</div>
              <h3 className="heading-lg text-white mb-3">Deliver</h3>
              <p className="text-slate-400 text-sm">Deployment, testing, handover, documentation, and optional support.</p>
              <p className="text-slate-500 text-xs mt-3 italic">Outcome: a clean, scalable system ready for real use</p>
            </div>
          </div>

          {/* 2L Mention */}
          <p className="text-center text-slate-500 text-sm">
            Powered by <span className="text-gentle">2L</span> — my custom AI orchestration framework.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-breathing">
        <div className="container-narrow">
          <h2 className="display-lg text-white text-center mb-8">Trusted by Researchers and Professionals</h2>

          <div className="contemplative-card p-8 md:p-12 text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="body-xl text-slate-300 italic mb-6">
              "Ahiya is an excellent statistician. He delivered precise results quickly and clearly."
            </blockquote>

            {/* Attribution */}
            <p className="text-slate-400">
              — <span className="text-white font-medium">Michal Schriber</span>, Head of Department, Herzog College
            </p>
          </div>

          {/* Trust Line */}
          <p className="text-center text-slate-500 text-sm mt-6">
            Trusted by academic researchers across multiple institutions.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl text-white mb-4">Tell Me What You Want to Build</h2>
            <p className="body-lg text-slate-300 mb-8">
              I respond within 24 hours with a clear plan, timeline, and next steps.
            </p>

            <a
              href="mailto:ahiya.butman@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50 mb-6"
            >
              <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
              Get in Touch
            </a>

            <div className="flex items-center justify-center space-x-6 text-slate-400">
              <a
                href="https://github.com/Ahiya1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
                <span>GitHub</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
