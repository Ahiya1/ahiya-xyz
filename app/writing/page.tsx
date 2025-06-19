"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

const WritingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Writings as sacred aurora containers
  interface Writing {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    preview: string;
    readTime: string;
    icon: string;
    essence: string;
    link: string;
    featured?: boolean;
    auroraSignature: string;
    auroraAccent: string;
    contemplativeTheme: string;
  }

  const writings: Writing[] = [
    {
      id: "sacred-potato",
      title: "The Sacred Potato",
      subtitle: "A desert contemplative story",
      description:
        "Sometimes we are consciousness taking itself too seriously, like a potato that has forgotten it is earth.",
      preview:
        "All his years of seeking, all his elaborate self-narratives, all his desperate attempts to fill the hollow place...",
      readTime: "25 min read",
      icon: "🥔",
      essence:
        "The keystone story. The realization that consciousness has been trying too hard.",
      link: "/writing/sacred-potato",
      featured: true,
      auroraSignature: "from-yellow-400 via-orange-500 to-pink-500",
      auroraAccent: "yellow-400",
      contemplativeTheme: "warm and grounding",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home.",
      preview:
        "The story of the Tree of Knowledge isn't just ancient mythology. It's a precise map of how consciousness develops...",
      readTime: "18 min read",
      icon: "🌳",
      essence: "A map of exodus from the sacred wound.",
      link: "/writing/sacred-wound",
      auroraSignature: "from-green-500 via-blue-500 to-purple-500",
      auroraAccent: "green-400",
      contemplativeTheme: "healing and growth",
    },
    {
      id: "edge-space",
      title: "Living in the Edge Space",
      subtitle: "Where ambition meets awareness",
      description:
        "What happens when you refuse to choose between worldly success and spiritual depth? You find the edge space.",
      preview:
        "Most people think spirituality means giving up ambition. Most ambitious people think consciousness is a luxury they can't afford...",
      readTime: "12 min read",
      icon: "⚡",
      essence: "A refusal to fragment. Integration of ambition and awareness.",
      link: "/writing/edge-space",
      auroraSignature: "from-blue-500 via-purple-500 to-pink-500",
      auroraAccent: "purple-400",
      contemplativeTheme: "integration and balance",
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
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
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
              <FileText className="w-6 h-6 text-purple-400 relative z-10" />
              <span className="gradient-aurora-text font-medium tracking-wider text-lg relative z-10">
                Writing
              </span>
            </div>

            <h1 className="display-lg gradient-aurora-text mb-16 leading-tight">
              Contemplations on Consciousness
            </h1>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Explorations of the sacred wound that drives human seeking,
              <br />
              the cosmic joke of consciousness, and the ancient wisdom
              <br />
              that illuminates our modern longing.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Writing - Sacred Potato Aurora */}
      {writings.find((w) => w.featured) && (
        <section className="py-20">
          <div className="container-content">
            {(() => {
              const featured = writings.find((w) => w.featured)!;
              return (
                <div className="text-center mb-20">
                  <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${featured.auroraSignature} opacity-15`}
                    ></div>
                    <span className="text-2xl relative z-10">⭐</span>
                    <span
                      className={`text-${featured.auroraAccent} font-medium tracking-wider text-lg relative z-10`}
                    >
                      Featured Contemplation
                    </span>
                    <span className="text-2xl relative z-10">⭐</span>
                  </div>

                  <Link href={featured.link} className="block">
                    <article className="max-w-4xl mx-auto ahiya-card-premium hover-lift-premium cursor-pointer group relative overflow-hidden">
                      {/* Featured aurora background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${featured.auroraSignature} opacity-0 group-hover:opacity-12 transition-opacity duration-700`}
                      ></div>

                      <div className="relative z-10">
                        <div className="text-center mb-12">
                          <div
                            className="text-8xl mb-8 animate-aurora-float group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                            style={{
                              filter: `drop-shadow(0 0 25px rgba(255, 193, 7, 0.4))`,
                            }}
                          >
                            {featured.icon}
                          </div>

                          <div className="flex items-center justify-center mb-8">
                            <div className="glass-premium px-6 py-3 relative overflow-hidden">
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${featured.auroraSignature} opacity-20`}
                              ></div>
                              <span
                                className={`text-sm text-${featured.auroraAccent} font-medium tracking-wider relative z-10`}
                              >
                                {featured.readTime}
                              </span>
                            </div>
                          </div>

                          <h2 className="heading-xl text-white mb-6 group-hover:text-yellow-100 transition-colors duration-300 leading-tight">
                            {featured.title}
                          </h2>

                          <p className="body-lg text-gray-200 font-medium mb-10 leading-relaxed tracking-wide">
                            {featured.subtitle}
                          </p>

                          <p className="text-gray-400 leading-loose tracking-wide mb-12 text-lg max-w-3xl mx-auto">
                            {featured.description}
                          </p>

                          <div className="glass-card p-10 mb-12 relative overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 w-20 h-px bg-gradient-to-r ${featured.auroraSignature} opacity-50`}
                            ></div>
                            <p className="text-gray-300 italic text-lg leading-loose tracking-wide">
                              "{featured.preview}"
                            </p>
                          </div>

                          <div className="glass-card p-8 mb-12 relative overflow-hidden">
                            <div
                              className={`absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l ${featured.auroraSignature} opacity-60`}
                            ></div>
                            <p
                              className={`text-${featured.auroraAccent} italic text-lg leading-relaxed tracking-wide`}
                            >
                              🪞 {featured.essence}
                            </p>
                          </div>

                          <div className="flex items-center justify-center">
                            <span className="text-gray-500 tracking-wide mr-4">
                              Read the full contemplation
                            </span>
                            <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Aurora corner accents for featured */}
                      <div
                        className={`absolute top-4 right-4 w-12 h-0.5 bg-gradient-to-l ${featured.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                      ></div>
                      <div
                        className={`absolute bottom-4 left-4 w-16 h-0.5 bg-gradient-to-r ${featured.auroraSignature} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                      ></div>
                    </article>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Writings with Aurora Signatures */}
      <section className="py-20">
        <div className="container-content">
          <div className="text-center mb-20">
            <h2 className="heading-xl text-white mb-8 leading-tight">
              All Contemplations
            </h2>
            <p className="body-lg text-gray-400 max-w-3xl mx-auto leading-relaxed tracking-wide">
              Each piece is an exploration into the depths of human experience,
              <br />
              consciousness, and the sacred technologies of awakening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {writings.map((writing, index) => (
              <Link key={writing.id} href={writing.link} className="block">
                <article
                  className={`ahiya-card-premium group hover-lift-premium animate-scaleIn cursor-pointer h-full relative overflow-hidden ${
                    writing.featured ? "border-yellow-400/15" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Writing aurora background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${writing.auroraSignature} opacity-0 group-hover:opacity-8 transition-opacity duration-700`}
                  ></div>

                  <div className="mobile-spacing-md h-full flex flex-col relative z-10">
                    {writing.featured && (
                      <div className="flex justify-center mb-6">
                        <div className="glass-premium px-4 py-2 relative overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${writing.auroraSignature} opacity-20`}
                          ></div>
                          <span
                            className={`text-xs text-${writing.auroraAccent} font-medium tracking-wider relative z-10`}
                          >
                            FEATURED
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-10">
                      <div className="glass-premium px-5 py-3 relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${writing.auroraSignature} opacity-15`}
                        ></div>
                        <span
                          className={`text-sm text-${writing.auroraAccent} font-medium tracking-wider relative z-10`}
                        >
                          {writing.readTime}
                        </span>
                      </div>
                      <div
                        className="text-5xl animate-aurora-float group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                        style={{
                          filter: `drop-shadow(0 0 15px rgba(168, 85, 247, 0.3))`,
                        }}
                      >
                        {writing.icon}
                      </div>
                    </div>

                    <h3 className="heading-lg text-white mb-6 group-hover:text-purple-100 transition-colors duration-300 leading-tight">
                      {writing.title}
                    </h3>

                    <p className="body-md text-gray-200 font-medium mb-8 leading-relaxed tracking-wide">
                      {writing.subtitle}
                    </p>

                    <p className="text-gray-400 leading-loose tracking-wide mb-10 text-sm flex-grow">
                      {writing.description}
                    </p>

                    <div className="glass-card p-8 mb-8 relative overflow-hidden">
                      <div
                        className={`absolute top-0 right-0 w-12 h-px bg-gradient-to-l ${writing.auroraSignature} opacity-40`}
                      ></div>
                      <p className="text-gray-300 italic text-sm leading-loose tracking-wide">
                        "{writing.preview}"
                      </p>
                    </div>

                    <div className="glass-card p-6 mb-10 relative overflow-hidden">
                      <div
                        className={`absolute bottom-0 left-0 w-8 h-px bg-gradient-to-r ${writing.auroraSignature} opacity-50`}
                      ></div>
                      <p
                        className={`text-${writing.auroraAccent} italic text-sm leading-relaxed tracking-wide`}
                      >
                        🪞 {writing.essence}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 tracking-wide">
                        Read the full contemplation
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Call to Contemplation - Aurora Enhanced */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            {/* Contemplation aurora background */}
            <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/8 to-pink-500/5 opacity-60"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div
                className="text-7xl mb-12 animate-aurora-float filter drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))`,
                }}
              >
                📖
              </div>

              <h2 className="display-md gradient-aurora-text mb-12 leading-tight">
                The Art of Sacred Questioning
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                These contemplations aren&apos;t meant to give you answers.
                <br />
                They&apos;re invitations to ask better questions.
                <br />
                To sit with mystery. To find wisdom in not-knowing.
              </p>

              <div className="glass-card p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                <p className="gradient-aurora-text italic leading-loose tracking-wide text-xl">
                  "The goal isn&apos;t to understand consciousness.
                  <br />
                  The goal is to recognize that you ARE consciousness
                  <br />
                  trying to understand itself."
                </p>
                <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
              </div>

              <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide">
                Each piece is an offering to the mystery you are,
                <br />a mirror reflecting what was always already here.
              </p>
            </div>

            {/* Aurora contemplation accents */}
            <div className="absolute top-4 right-4 w-20 h-0.5 bg-gradient-to-l from-purple-500/40 via-pink-500/30 to-transparent rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-0.5 bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-transparent rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-0.5 h-12 bg-gradient-to-b from-purple-500/30 via-pink-500/20 to-transparent rounded-full"></div>
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
    </div>
  );
};

export default WritingPage;
