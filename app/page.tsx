"use client";

import { Zap, ArrowRight, Mail, Github, Code, Database, Bot, BarChart3 } from "lucide-react";
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
          {/* Badge */}
          <div className="breathing-glass inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4 text-purple-300" aria-hidden="true" />
            <span className="text-sm text-slate-300">Full-Stack Developer</span>
          </div>

          {/* Headline */}
          <h1 className="display-xl text-white mb-6">
            I Build SaaS Systems <span className="text-gentle">Fast</span>
          </h1>

          {/* Subheadline */}
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Full-stack development powered by AI orchestration.
            From idea to deployed product, independently.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              Work With Me
            </a>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section id="services" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-4">What I Do for Clients</h2>
          <p className="body-lg text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Most projects delivered in 2–4 weeks. I work fast, with clear milestones.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="breathing-glass p-6 rounded-2xl">
              <Code className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">Full-Stack SaaS Apps</h3>
              <p className="text-slate-400">Complete web applications with auth, payments, and admin dashboards.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <Database className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">Data Dashboards</h3>
              <p className="text-slate-400">Interactive reports and visualization tools for business intelligence.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <Bot className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">AI-Powered Systems</h3>
              <p className="text-slate-400">LLM integrations, agents, and intelligent automation workflows.</p>
            </div>

            <div className="breathing-glass p-6 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
              <h3 className="heading-lg text-white mb-2">Research & Analysis Tools</h3>
              <p className="text-slate-400">Statistical workflows, data pipelines, and custom research platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-breathing">
        <div className="container-wide">
          <SectionHeading
            title="What I've Built"
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
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl text-white mb-4">Work With Me</h2>
            <p className="body-lg text-slate-300 mb-8">
              Looking for a developer who can own your next feature or MVP?
            </p>

            <a
              href="mailto:ahiya.butman@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50 mb-6"
            >
              <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
              Send a Message
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
