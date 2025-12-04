"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Github } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PortfolioCard } from "@/app/components/PortfolioCard";
import { SectionHeading } from "@/app/components/SectionHeading";
import { portfolioProjects } from "@/app/data/portfolio";

// Custom hook for scroll-triggered fade-in
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function HomePage() {
  const step1 = useScrollReveal();
  const step2 = useScrollReveal();
  const step3 = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          {/* Headline with staggered word reveal */}
          <h1 className="display-xl text-white mb-6">
            <span className="hero-word" style={{ animationDelay: '0.1s' }}>
              <span className="text-gentle">Intention.</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: '0.3s' }}>
              <span className="text-gentle">Clarity.</span>
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: '0.5s' }}>
              <span className="text-gentle">Results.</span>
            </span>
          </h1>

          {/* Subheadline - fades in after hero words */}
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10 hero-subline" style={{ animationDelay: '0.8s' }}>
            Research systems. Business tools. AI pipelines.
          </p>

          {/* CTAs - fade in after subline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-ctas" style={{ animationDelay: '1.0s' }}>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
            >
              See the Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              Let's Build
            </a>
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
            {portfolioProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="section-breathing">
        <div className="container-content">
          <h2 className="display-lg text-white text-center mb-12">How We Work</h2>

          {/* Three Steps */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div
              ref={step1.ref}
              className={`text-center transition-all duration-700 ${
                step1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl mb-4">&#127919;</div>
              <h3 className="heading-lg text-white mb-3">Define</h3>
              <p className="text-slate-400">
                We talk. I listen. You see the blueprint before I write a line of code.
              </p>
            </div>
            <div
              ref={step2.ref}
              className={`text-center transition-all duration-700 delay-150 ${
                step2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl mb-4">&#9889;</div>
              <h3 className="heading-lg text-white mb-3">Build</h3>
              <p className="text-slate-400">
                I move fast. You stay in the loop. No surprises.
              </p>
            </div>
            <div
              ref={step3.ref}
              className={`text-center transition-all duration-700 delay-300 ${
                step3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl mb-4">&#128640;</div>
              <h3 className="heading-lg text-white mb-3">Launch</h3>
              <p className="text-slate-400">
                It works. It's documented. I'm here if you need me.
              </p>
            </div>
          </div>

          {/* 2L Mention */}
          <p className="text-center text-slate-500 text-sm">
            Powered by <span className="text-gentle">2L</span> — my AI orchestration framework.
          </p>
        </div>
      </section>

      {/* Contact/CTA Section with scroll reveal */}
      <section
        id="contact"
        ref={ctaReveal.ref}
        className={`section-breathing transition-all duration-700 ${
          ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl text-white mb-4">Let's Build</h2>
            <p className="body-lg text-slate-400 mb-8">
              I respond within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"
              >
                <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                Get in Touch
              </a>
              <a
                href="https://github.com/Ahiya1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
              >
                <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                GitHub
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
