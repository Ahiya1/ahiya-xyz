"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";

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

const StatVizPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  // Scroll reveal hooks for each section
  const challengeReveal = useScrollReveal();
  const solutionReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const techReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://statviz.xyz";

  const features = [
    {
      icon: "\u{1F527}",
      title: "Admin Panel",
      description:
        "Comprehensive dashboard for managing projects, user access, and report distribution.",
    },
    {
      icon: "\u{1F512}",
      title: "Secure Access",
      description:
        "Password-protected login ensuring only authorized students access their reports.",
    },
    {
      icon: "\u{1F4CA}",
      title: "Interactive Reports",
      description:
        "Dual format delivery: interactive HTML visualizations plus downloadable DOCX.",
    },
    {
      icon: "\u{1F5E8}",
      title: "Hebrew RTL",
      description:
        "Full right-to-left layout support for natural Hebrew reading experience.",
    },
  ];

  const techStack = ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"];

  const challenges = [
    "Email delivery is insecure and untracked",
    "Students lose access or forward inappropriately",
    "No central system for managing multiple projects",
    "Hebrew RTL breaks in standard document viewers",
  ];

  const solutions = [
    "Password-protected individual access",
    "Centralized admin panel for project management",
    "Interactive HTML reports with embedded visualizations",
    "Full Hebrew RTL support",
    "Dual format delivery (HTML + DOCX)",
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
              </Link>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Visit Live Site</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full viewport with gradient */}
      <section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20">
        <div className="container-content text-center relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-slate-400 hover:text-white text-sm mb-8 inline-block transition-colors"
          >
            &larr; Back to Work
          </Link>

          {/* Large emoji with float animation */}
          <div className="text-6xl md:text-8xl mb-6 animate-float">
            {"\u{1F4CA}"}
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            Statistical Analysis, Visualized
          </h1>

          {/* One powerful line */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Complex data made clear and beautiful.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>Visit Live Site</span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section
        ref={challengeReveal.ref}
        className={`py-24 transition-all duration-700 ${
          challengeReveal.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Statistical report delivery breaks down:
            </p>
            <ul className="space-y-4">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section
        ref={solutionReveal.ref}
        className={`py-24 transition-all duration-700 ${
          solutionReveal.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              A secure, centralized platform:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresReveal.ref}
        className={`py-24 transition-all duration-700 ${
          featuresReveal.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`contemplative-card p-6 md:p-8 transition-all duration-500 ${
                  featuresReveal.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-3xl md:text-4xl mb-6">{feature.icon}</div>
                <h3 className="heading-lg mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        ref={techReveal.ref}
        className={`py-24 transition-all duration-700 ${
          techReveal.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container-content text-center">
          <h2 className="heading-xl mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <span
                key={tech}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300 transition-all duration-500 ${
                  techReveal.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* View Next Project */}
      <div className="text-center mb-16">
        <Link
          href="/projects/mirror-of-dreams"
          className="text-slate-400 hover:text-white transition-colors"
        >
          Next: Mirror of Dreams &rarr;
        </Link>
      </div>

      {/* CTA Section */}
      <section
        ref={ctaReveal.ref}
        className={`py-24 transition-all duration-700 ${
          ctaReveal.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl mb-6">Ready to Explore?</h2>
            <p className="body-lg text-slate-300 mb-8">
              Statistical reports delivered with elegance and security.
            </p>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>Visit Live Site</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={24}
              height={24}
              className="opacity-40"
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by <span className="text-gentle">Ahiya</span>
          </p>
          <p className="text-slate-500 text-xs">
            {new Date().getFullYear()} - Building systems that work
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StatVizPage;
