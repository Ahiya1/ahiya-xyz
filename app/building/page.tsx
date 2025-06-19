"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ExternalLink, ArrowRight } from "lucide-react";

const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Projects as consciousness explorations
  interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: string;
    chambers?: Array<{
      name: string;
      icon: string;
      desc: string;
    }>;
    status: string;
    icon: string;
    essence: string;
    link: string;
    external?: boolean;
    isSignature?: boolean;
  }

  const projects: Project[] = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Four chambers for consciousness",
      description: "Meditation • Contemplation • Creation • Being Seen",
      details:
        "Technology that makes humans more human. Breath recognition, AI synthesis, co-creative studios, and ephemeral witnessing—each chamber a mirror for a different aspect of presence.",
      chambers: [
        {
          name: "Meditation",
          icon: "🧘",
          desc: "Breath recognition through microphone",
        },
        {
          name: "Contemplation",
          icon: "🌀",
          desc: "AI-synthesized daily questions",
        },
        { name: "Creation", icon: "🎨", desc: "Co-creative expression studio" },
        {
          name: "Being Seen",
          icon: "👁️",
          desc: "Ephemeral witnessing conversations",
        },
      ],
      status: "Blueprint",
      icon: "🧘",
      essence: "A contemplative altar. Each chamber is an aspect of being.",
      link: "/blueprint/selah",
      isSignature: true,
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "No men. No noise. Just us.",
      description: "The dating app for women who love women",
      details:
        "100% women-loving-women space with advanced safety protocols, community-driven matching, and spaces designed for authentic connection. Where intimacy meets technology.",
      status: "Live",
      link: "https://winkher.com",
      icon: "💕",
      external: true,
      essence:
        "A safe sanctuary for women loving women — intimacy designed with care.",
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "You don&apos;t need more advice. You need to be seen.",
      description: "AI that reflects wholeness, not fixes",
      details:
        "Recognition over advice. Dream analysis and pattern recognition that shows you who you already are rather than who you should become. Judgment-free self-discovery.",
      status: "Live",
      link: "https://mirror-of-truth.vercel.app",
      icon: "🪞",
      external: true,
      essence: "A refusal to give advice; a willingness to reflect essence.",
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Where consciousness meets deception",
      description: "Social deduction with AI agents",
      details:
        "Players and AI learn the delicate dance between truth and misdirection. A simple algorithm exploring the nuanced art of reading consciousness through the game of authentic play.",
      status: "Blueprint",
      icon: "🎭",
      essence:
        "A playful meditation on truth, deception, and collective awareness.",
      link: "/blueprint/aimafia",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-900 to-cosmic-900 flex items-center justify-center">
        <div className="animate-gentle-pulse">
          <div className="w-16 h-16 bg-consciousness-400/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Subtle consciousness texture */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(94, 200, 248, 0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Sacred Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-float"
                />
                <div className="absolute inset-0 bg-consciousness-400/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium gradient-text-primary">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/writing"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writing
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/connect"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16">
              <Sparkles className="w-6 h-6 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider text-lg">
                Building
              </span>
            </div>

            <h1 className="display-lg gradient-text-primary mb-16 leading-tight">
              Consciousness Through Code
            </h1>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Each project is consciousness exploring itself through form.
              <br />
              Technology as meditation. Code as contemplation.
              <br />
              Interfaces as invitations to presence.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20">
        <div className="container-content">
          <div className="mobile-spacing-lg">
            {projects.map((project, index) => (
              <div key={project.id}>
                <div
                  className={`project-section animate-slideInLeft delay-${
                    index * 200
                  } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Signature Project Special Treatment */}
                  {project.isSignature && (
                    <div className="text-center mb-16">
                      <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
                        <span className="text-2xl">✨</span>
                        <span className="text-blue-400 font-medium tracking-wider text-lg">
                          Signature Project
                        </span>
                        <span className="text-2xl">✨</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 mobile-spacing-md">
                      <div className="flex items-center space-x-6 mb-12">
                        <div
                          className={`p-5 rounded-xl text-white ${
                            project.isSignature
                              ? "bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/25"
                              : "bg-gradient-to-br from-consciousness-500 to-consciousness-600"
                          }`}
                        >
                          <span className="text-4xl">{project.icon}</span>
                        </div>

                        <span
                          className={`px-6 py-3 text-base font-medium rounded-full ${
                            project.status === "Live"
                              ? "success-premium"
                              : "glass-premium"
                          }`}
                        >
                          {project.status === "Live" ? (
                            <span className="inline-flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-gentle-pulse"></div>
                              <span>Live</span>
                            </span>
                          ) : (
                            <span>Blueprint</span>
                          )}
                        </span>
                      </div>

                      <div className="mobile-spacing-sm">
                        <h3 className="heading-xl text-white mb-4 leading-tight">
                          {project.title}
                        </h3>
                        <p className="heading-md text-gray-200 mb-8 leading-relaxed">
                          {project.subtitle}
                        </p>
                        <p className="body-lg text-gray-300 mb-10 leading-relaxed tracking-wide">
                          {project.description}
                        </p>
                        <p className="text-gray-400 leading-loose tracking-wide mb-10">
                          {project.details}
                        </p>

                        <div className="glass-card p-8 mb-10">
                          <p className="text-consciousness-400 italic leading-relaxed tracking-wide text-lg">
                            🪞 {project.essence}
                          </p>
                        </div>
                      </div>

                      {/* Chambers for Selah */}
                      {project.chambers && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 mb-10">
                          {project.chambers.map((chamber, idx) => (
                            <div
                              key={idx}
                              className="ahiya-card-premium hover-lift-premium group"
                            >
                              <div className="flex items-center space-x-5 mb-5">
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                  {chamber.icon}
                                </span>
                                <span className="font-medium text-white text-lg group-hover:text-blue-100 transition-colors">
                                  {chamber.name}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors">
                                {chamber.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-8">
                        {project.external ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group text-lg"
                          >
                            <span className="tracking-wide">
                              Experience it live
                            </span>
                            <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </a>
                        ) : (
                          <Link
                            href={project.link}
                            className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group text-lg"
                          >
                            <span className="tracking-wide">
                              Explore the blueprint
                            </span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 max-w-lg">
                      {project.external ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div
                            className={`ahiya-card-premium text-center hover-lift-premium cursor-pointer group ${
                              project.isSignature
                                ? "bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-400/20"
                                : ""
                            }`}
                          >
                            <div className="text-9xl mb-10 animate-float group-hover:scale-110 transition-transform duration-500">
                              {project.icon}
                            </div>
                            <p className="text-gray-400 italic leading-loose tracking-wide">
                              {project.essence}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <Link href={project.link} className="block">
                          <div
                            className={`ahiya-card-premium text-center hover-lift-premium cursor-pointer group ${
                              project.isSignature
                                ? "bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-400/20"
                                : ""
                            }`}
                          >
                            <div className="text-9xl mb-10 animate-float group-hover:scale-110 transition-transform duration-500">
                              {project.icon}
                            </div>
                            <p className="text-gray-400 italic leading-loose tracking-wide">
                              {project.essence}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Elegant transition between projects */}
                {index < projects.length - 1 && (
                  <div className="relative py-24 overflow-hidden">
                    {/* Elegant gradient transitions at edges */}
                    <div className="absolute inset-0">
                      {/* Top gradient fade */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-950/20 via-blue-900/10 to-transparent"></div>
                      {/* Bottom gradient fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/20 via-blue-900/10 to-transparent"></div>

                      {/* Central ethereal glow */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/5 via-blue-400/3 to-transparent rounded-full animate-gentle-pulse"></div>
                    </div>

                    {/* Subtle constellation dots */}
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-blue-400/60 rounded-full animate-gentle-pulse"></div>
                      <div
                        className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-blue-300/60 rounded-full animate-gentle-pulse"
                        style={{ animationDelay: "3s" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="py-24 border-t border-gray-800/30">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-10">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={44}
              height={44}
              className="opacity-60 animate-float"
            />
          </div>

          <p className="text-gray-400 mb-6 tracking-wide text-lg">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-text-primary">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-8">
            &ldquo;Technology that serves consciousness&rdquo;
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Space becoming human
            becoming space.
          </p>
        </div>
      </footer>

      {/* Enhanced CSS */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default BuildingPage;
