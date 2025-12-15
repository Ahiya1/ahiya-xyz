"use client";

import Link from "next/link";
import { Mail, Github, Grid, Workflow, FileText, Download } from "lucide-react";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PortfolioCard } from "@/app/components/PortfolioCard";
import { SectionHeading } from "@/app/components/SectionHeading";
import { Testimonials } from "@/app/components/Testimonials";
import { MagneticButton } from "@/app/components/reactive";
import { portfolioProjects } from "@/app/data/portfolio";
import {
  HoverWords,
  HeroBreathing,
  SectionReveal,
  ConnectedAnimationsProvider,
  ConnectedCard,
} from "@/app/components/choreography";

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          {/* Headline with breathing animation and word hover effects */}
          <HeroBreathing>
            <h1 className="display-xl text-white mb-6">
              <HoverWords className="text-gentle">
                Intention. Clarity. Results.
              </HoverWords>
            </h1>
          </HeroBreathing>

          {/* Subheadline - fades in after hero words */}
          <p
            className="body-xl text-slate-300 max-w-2xl mx-auto mb-10 hero-subline"
            style={{ animationDelay: "0.8s" }}
          >
            AI-powered systems delivered in weeks, not months.
          </p>

          {/* CTAs - fade in after subline */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-ctas"
            style={{ animationDelay: "1.0s" }}
          >
            <MagneticButton pullStrength={0.4}>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                data-track-click="hero_see_work"
              >
                See the Work
              </a>
            </MagneticButton>
            <MagneticButton pullStrength={0.4}>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                data-track-click="hero_lets_build"
              >
                Let's Build
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-8 border-b border-white/5 section-reveal section-reveal-1">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* Primary CTA */}
            <MagneticButton pullStrength={0.3}>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                data-track-click="cta_strip:see_work"
              >
                <Grid className="w-4 h-4" />
                See the Work
              </a>
            </MagneticButton>

            {/* Secondary CTAs */}
            <MagneticButton pullStrength={0.3}>
              <Link
                href="/2l"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                data-track-click="cta_strip:how_i_build"
              >
                <Workflow className="w-4 h-4" />
                How I Build
              </Link>
            </MagneticButton>

            <MagneticButton pullStrength={0.3}>
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                data-track-click="cta_strip:capabilities"
              >
                <FileText className="w-4 h-4" />
                Capabilities
              </Link>
            </MagneticButton>

            <a
              href="/ahiya-capabilities.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              data-track-click="cta_strip:download_pdf"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>

            <MagneticButton pullStrength={0.3}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                data-track-click="cta_strip:get_in_touch"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Portfolio Section with fan-in animation */}
      <section id="portfolio" className="section-breathing">
        <div className="container-wide">
          <SectionHeading
            title="Selected Work"
            description="Real systems, deployed and running. Each project showcases end-to-end development: architecture, implementation, and deployment."
          />
          <SectionReveal variant="fan-in">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <ConnectedAnimationsProvider>
                {portfolioProjects.map((project, index) => (
                  <ConnectedCard key={project.id} index={index}>
                    <SectionReveal.Item
                      index={index}
                      totalItems={portfolioProjects.length}
                      variant="fan-in"
                    >
                      <PortfolioCard project={project} index={index} />
                    </SectionReveal.Item>
                  </ConnectedCard>
                ))}
              </ConnectedAnimationsProvider>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* How I Work Section with cascade animation */}
      <section id="how-i-work" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-12">
            How I Work
          </h2>

          {/* Three Steps with cascade reveal */}
          <SectionReveal variant="cascade">
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <SectionReveal.Item index={0} variant="cascade">
                <div className="text-center">
                  <div className="text-4xl mb-4">&#127919;</div>
                  <h3 className="heading-lg text-white mb-3">Define</h3>
                  <p className="text-slate-400">
                    I align on requirements. You see the architecture before
                    development begins.
                  </p>
                </div>
              </SectionReveal.Item>
              <SectionReveal.Item index={1} variant="cascade">
                <div className="text-center">
                  <div className="text-4xl mb-4">&#9889;</div>
                  <h3 className="heading-lg text-white mb-3">Build</h3>
                  <p className="text-slate-400">
                    Parallel agents accelerate delivery. You stay informed. No
                    surprises.
                  </p>
                </div>
              </SectionReveal.Item>
              <SectionReveal.Item index={2} variant="cascade">
                <div className="text-center">
                  <div className="text-4xl mb-4">&#128640;</div>
                  <h3 className="heading-lg text-white mb-3">Launch</h3>
                  <p className="text-slate-400">
                    Production-ready. Documented. Supported.
                  </p>
                </div>
              </SectionReveal.Item>
            </div>
          </SectionReveal>

          {/* 2L Mention */}
          <p className="text-center text-slate-500 text-sm">
            Powered by{" "}
            <Link href="/2l" className="text-gentle hover:underline">
              2L
            </Link>{" "}
            — my AI orchestration framework.{" "}
            <Link
              href="/2l"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Learn how it works
            </Link>
          </p>

          {/* Pricing Mention */}
          <p className="text-center text-slate-500 text-sm mt-4">
            <Link
              href="/pricing"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Transparent pricing starting at $2,500
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact/CTA Section with scale-glow reveal */}
      <section id="contact" className="section-breathing">
        <div className="container-narrow">
          <SectionReveal variant="scale-glow">
            <SectionReveal.Item variant="scale-glow">
              <div className="contemplative-card p-8 md:p-12 text-center">
                <h2 className="heading-xl text-white mb-4">Let's Build</h2>
                <p className="body-lg text-slate-400 mb-8">
                  I respond within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton pullStrength={0.4}>
                    <a
                      href="https://cal.com/ahiya-butman-tigupi/discovery-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"
                      data-track-click="footer_discovery_call"
                      data-track-conversion="booking_intent"
                    >
                      <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                      Book Discovery Call
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </MagneticButton>
                  <MagneticButton pullStrength={0.3}>
                    <a
                      href="https://github.com/Ahiya1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                      data-track-click="footer_github"
                    >
                      <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                      GitHub
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal.Item>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
