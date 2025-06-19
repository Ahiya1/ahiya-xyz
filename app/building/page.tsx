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

  // Projects as aurora consciousness explorations
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
      auroraTheme: string;
    }>;
    status: string;
    icon: string;
    essence: string;
    link: string;
    external?: boolean;
    isSignature?: boolean;
    auroraSignature: string;
    auroraAccent: string;
    statusColor: string;
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
          auroraTheme: "from-blue-500 via-blue-600 to-purple-500",
        },
        {
          name: "Contemplation",
          icon: "🌀",
          desc: "AI-synthesized daily questions",
          auroraTheme: "from-purple-500 via-purple-600 to-pink-500",
        },
        {
          name: "Creation",
          icon: "🎨",
          desc: "Co-creative expression studio",
          auroraTheme: "from-pink-500 via-orange-500 to-yellow-500",
        },
        {
          name: "Being Seen",
          icon: "👁️",
          desc: "Ephemeral witnessing conversations",
          auroraTheme: "from-green-500 via-blue-500 to-purple-500",
        },
      ],
      status: "Blueprint",
      icon: "🧘",
      essence: "A contemplative altar. Each chamber is an aspect of being.",
      link: "/blueprint/selah",
      isSignature: true,
      auroraSignature: "from-blue-500 via-purple-500 to-pink-500 to-yellow-500",
      auroraAccent: "purple-400",
      statusColor: "purple-500",
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
      auroraSignature: "from-pink-500 via-pink-600 to-purple-500",
      auroraAccent: "pink-400",
      statusColor: "green-500",
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "You don't need more advice. You need to be seen.",
      description: "AI that reflects wholeness, not fixes",
      details:
        "Recognition over advice. Dream analysis and pattern recognition that shows you who you already are rather than who you should become. Judgment-free self-discovery.",
      status: "Live",
      link: "https://mirror-of-truth.vercel.app",
      icon: "🪞",
      external: true,
      essence: "A refusal to give advice; a willingness to reflect essence.",
      auroraSignature: "from-blue-400 via-purple-500 to-blue-600",
      auroraAccent: "blue-400",
      statusColor: "green-500",
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
      auroraSignature: "from-purple-500 via-red-500 to-orange-500",
      auroraAccent: "purple-500",
      statusColor: "purple-500",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 flex items-center justify-center">
        <div className="animate-aurora-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Enhanced aurora consciousness texture */}
      <div className="fixed inset-0 z-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.2) 1px, transparent 0)",
            backgroundSize: "80px 80px",
            animation: "aurora-grain 25s linear infinite",
          }}
        />
      </div>

      {/* Sacred Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative aurora-logo-glow">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-aurora-float"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium gradient-aurora-text">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/writing"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writing
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/connect"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 opacity-60"></div>
              <Sparkles className="w-6 h-6 text-purple-400 relative z-10" />
              <span className="gradient-aurora-text font-medium tracking-wider text-lg relative z-10">
                Building
              </span>
            </div>

            <h1 className="display-lg gradient-aurora-text mb-16 leading-tight">
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

      {/* Projects with Aurora Signatures */}
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
                      <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${project.auroraSignature} opacity-10`}
                        ></div>
                        <span className="text-2xl relative z-10">✨</span>
                        <span
                          className={`text-${project.auroraAccent} font-medium tracking-wider text-lg relative z-10`}
                        >
                          Signature Project
                        </span>
                        <span className="text-2xl relative z-10">✨</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 mobile-spacing-md">
                      <div className="flex items-center space-x-6 mb-12">
                        <div
                          className={`p-5 rounded-xl text-white relative overflow-hidden transition-all duration-500 
                            hover:scale-110 hover:shadow-xl ${
                              project.isSignature
                                ? `bg-gradient-to-br ${project.auroraSignature} shadow-lg`
                                : `bg-gradient-to-br ${project.auroraSignature}`
                            }`}
                          style={{
                            boxShadow: `0 8px 25px rgba(168, 85, 247, 0.25)`,
                          }}
                        >
                          {/* Inner aurora glow */}
                          <div className="absolute inset-2 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="text-4xl relative z-10">
                            {project.icon}
                          </span>
                        </div>

                        <span
                          className={`px-6 py-3 text-base font-medium rounded-full relative overflow-hidden transition-all duration-500 ${
                            project.status === "Live"
                              ? "text-green-400 border border-green-400/30"
                              : `text-${project.auroraAccent} border border-purple-400/30`
                          }`}
                          style={{
                            background:
                              project.status === "Live"
                                ? "rgba(34, 197, 94, 0.1)"
                                : `rgba(168, 85, 247, 0.1)`,
                          }}
                        >
                          {project.status === "Live" ? (
                            <span className="inline-flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-aurora-pulse"></div>
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

                        <div className="glass-card p-8 mb-10 relative overflow-hidden">
                          <div
                            className={`absolute top-0 right-0 w-16 h-px bg-gradient-to-l ${project.auroraSignature} opacity-50`}
                          ></div>
                          <p
                            className={`text-${project.auroraAccent} italic leading-relaxed tracking-wide text-lg`}
                          >
                            🪞 {project.essence}
                          </p>
                        </div>
                      </div>

                      {/* Aurora Chambers for Selah */}
                      {project.chambers && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 mb-10">
                          {project.chambers.map((chamber, idx) => (
                            <div
                              key={idx}
                              className="ahiya-card-premium hover-lift-premium group relative overflow-hidden"
                            >
                              {/* Chamber aurora background */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${chamber.auroraTheme} opacity-0 group-hover:opacity-8 transition-opacity duration-700`}
                              ></div>

                              <div className="relative z-10">
                                <div className="flex items-center space-x-5 mb-5">
                                  <span
                                    className="text-4xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
                                    style={{
                                      filter: `drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))`,
                                    }}
                                  >
                                    {chamber.icon}
                                  </span>
                                  <span className="font-medium text-white text-lg group-hover:text-purple-100 transition-colors">
                                    {chamber.name}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors">
                                  {chamber.desc}
                                </p>
                              </div>

                              {/* Aurora chamber accent */}
                              <div
                                className={`absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r ${chamber.auroraTheme} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                              ></div>
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
                            className={`inline-flex items-center space-x-3 text-${project.auroraAccent} hover:text-purple-300 transition-colors group text-lg`}
                          >
                            <span className="tracking-wide">
                              Experience it live
                            </span>
                            <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </a>
                        ) : (
                          <Link
                            href={project.link}
                            className={`inline-flex items-center space-x-3 text-${project.auroraAccent} hover:text-purple-300 transition-colors group text-lg`}
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
                            className={`ahiya-card-premium text-center hover-lift-premium cursor-pointer group relative overflow-hidden ${
                              project.isSignature ? "border-purple-400/20" : ""
                            }`}
                          >
                            {/* Project aurora background */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${project.auroraSignature} opacity-0 group-hover:opacity-8 transition-opacity duration-700`}
                            ></div>

                            <div className="relative z-10">
                              <div
                                className="text-9xl mb-10 animate-aurora-float group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                                style={{
                                  filter: `drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))`,
                                }}
                              >
                                {project.icon}
                              </div>
                              <p className="text-gray-400 italic leading-loose tracking-wide">
                                {project.essence}
                              </p>
                            </div>

                            {/* Aurora project accent corners */}
                            <div
                              className={`absolute top-4 right-4 w-12 h-0.5 bg-gradient-to-l ${project.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                            ></div>
                            <div
                              className={`absolute bottom-4 left-4 w-8 h-0.5 bg-gradient-to-r ${project.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                            ></div>
                          </div>
                        </a>
                      ) : (
                        <Link href={project.link} className="block">
                          <div
                            className={`ahiya-card-premium text-center hover-lift-premium cursor-pointer group relative overflow-hidden ${
                              project.isSignature ? "border-purple-400/20" : ""
                            }`}
                          >
                            {/* Project aurora background */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${project.auroraSignature} opacity-0 group-hover:opacity-8 transition-opacity duration-700`}
                            ></div>

                            <div className="relative z-10">
                              <div
                                className="text-9xl mb-10 animate-aurora-float group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                                style={{
                                  filter: `drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))`,
                                }}
                              >
                                {project.icon}
                              </div>
                              <p className="text-gray-400 italic leading-loose tracking-wide">
                                {project.essence}
                              </p>
                            </div>

                            {/* Aurora project accent corners */}
                            <div
                              className={`absolute top-4 right-4 w-12 h-0.5 bg-gradient-to-l ${project.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                            ></div>
                            <div
                              className={`absolute bottom-4 left-4 w-8 h-0.5 bg-gradient-to-r ${project.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                            ></div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Elegant aurora transition between projects */}
                {index < projects.length - 1 && (
                  <div className="relative py-24 overflow-hidden">
                    {/* Aurora gradient transitions at edges */}
                    <div className="absolute inset-0">
                      {/* Top gradient fade */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-950/20 via-purple-900/10 to-transparent"></div>
                      {/* Bottom gradient fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-950/20 via-purple-900/10 to-transparent"></div>

                      {/* Central aurora glow */}
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-aurora-breathe"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(236, 72, 153, 0.05) 40%, transparent 70%)",
                        }}
                      ></div>
                    </div>

                    {/* Aurora constellation dots */}
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-purple-400/60 rounded-full animate-aurora-pulse"></div>
                      <div
                        className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-pink-300/60 rounded-full animate-aurora-pulse"
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
      <footer className="py-24 border-t border-gray-800/30 relative">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-10">
            <div className="aurora-logo-glow">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={44}
                height={44}
                className="opacity-60 animate-aurora-float"
              />
            </div>
          </div>

          <p className="text-gray-400 mb-6 tracking-wide text-lg">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-aurora-text">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-8">
            "Technology that serves consciousness"
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Space becoming human
            becoming space.
          </p>
        </div>
      </footer>

      {/* Enhanced CSS for aurora project interactions */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }

        .project-section {
          position: relative;
          margin: 8rem 0;
          padding: 4rem 0;
        }

        .project-section:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: -4rem;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          max-width: 400px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.3),
            rgba(236, 72, 153, 0.2),
            transparent
          );
        }

        /* Aurora chamber enhancements */
        .chamber-aurora-glow {
          position: relative;
        }

        .chamber-aurora-glow::before {
          content: "";
          position: absolute;
          inset: -5%;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.08) 0%,
            transparent 70%
          );
          border-radius: inherit;
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .chamber-aurora-glow:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default BuildingPage;
