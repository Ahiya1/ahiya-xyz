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

  // Writings as sacred containers - Aurora Enhanced
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
    auraColor: string;
    gradientFrom: string;
    gradientTo: string;
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
      auraColor: "rgba(168, 85, 247, 0.6)",
      gradientFrom: "from-aurora-blue",
      gradientTo: "to-aurora-purple",
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
      auraColor: "rgba(236, 72, 153, 0.6)",
      gradientFrom: "from-aurora-purple",
      gradientTo: "to-aurora-pink",
      link: "/writing/sacred-wound",
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
      auraColor: "rgba(192, 132, 252, 0.6)",
      gradientFrom: "from-aurora-light-blue",
      gradientTo: "to-aurora-light-purple",
      link: "/writing/edge-space",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-900 to-cosmic-900 flex items-center justify-center">
        <div className="animate-gentle-pulse">
          <div className="w-16 h-16 bg-aurora-primary/20 rounded-full consciousness-orb-aurora"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Aurora consciousness texture */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Sacred Navigation with Aurora */}
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
                <div className="absolute inset-0 bg-aurora-primary/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/connect"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Aurora Enhancement */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 bg-aurora-soft border-aurora-primary/20">
              <FileText className="w-6 h-6 text-aurora-primary animate-gentle-pulse" />
              <span className="text-aurora-primary font-medium tracking-wider text-lg">
                Writing
              </span>
            </div>

            <h1 className="display-lg gradient-text-aurora mb-16 leading-tight">
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

      {/* Featured Writing with Aurora */}
      {writings.find((w) => w.featured) && (
        <section className="py-20">
          <div className="container-content">
            {(() => {
              const featured = writings.find((w) => w.featured)!;
              return (
                <div className="text-center mb-20">
                  <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 bg-aurora-soft border-aurora-primary/20 mb-16">
                    <span className="text-2xl animate-consciousness-pulse">
                      ⭐
                    </span>
                    <span className="text-aurora-primary font-medium tracking-wider text-lg">
                      Featured Contemplation
                    </span>
                    <span
                      className="text-2xl animate-consciousness-pulse"
                      style={{ animationDelay: "2s" }}
                    >
                      ⭐
                    </span>
                  </div>

                  <Link href={featured.link} className="block">
                    <article
                      className="max-w-4xl mx-auto ahiya-card-premium hover-lift-premium cursor-pointer group bg-aurora-soft border-aurora-primary/20 relative overflow-hidden"
                      style={{
                        boxShadow: `0 0 60px ${featured.auraColor}, inset 0 0 60px ${featured.auraColor}20`,
                      }}
                    >
                      {/* Aurora consciousness glow */}
                      <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-3xl"
                        style={{
                          boxShadow: `0 0 120px ${featured.auraColor}, inset 0 0 120px ${featured.auraColor}30`,
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="text-center mb-12">
                          <div className="text-8xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                            {featured.icon}
                          </div>

                          <div className="flex items-center justify-center mb-8">
                            <div className="glass-premium px-6 py-3 border-aurora-primary/20">
                              <span className="text-sm text-aurora-primary font-medium tracking-wider">
                                {featured.readTime}
                              </span>
                            </div>
                          </div>

                          <h2 className="heading-xl text-white mb-6 group-hover:text-aurora-light transition-colors duration-300 leading-tight">
                            {featured.title}
                          </h2>

                          <p className="body-lg text-aurora-light font-medium mb-10 leading-relaxed tracking-wide">
                            {featured.subtitle}
                          </p>

                          <p className="text-gray-400 leading-loose tracking-wide mb-12 text-lg max-w-3xl mx-auto">
                            {featured.description}
                          </p>

                          <div className="glass-card p-10 mb-12 border-aurora-primary/20">
                            <p className="text-gray-300 italic text-lg leading-loose tracking-wide">
                              &ldquo;{featured.preview}&rdquo;
                            </p>
                          </div>

                          <div className="glass-card p-8 mb-12 border-aurora-primary/20">
                            <p className="text-aurora-primary italic text-lg leading-relaxed tracking-wide">
                              🪞 {featured.essence}
                            </p>
                          </div>

                          <div className="flex items-center justify-center">
                            <span className="text-gray-500 tracking-wide mr-4">
                              Read the full contemplation
                            </span>
                            <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-aurora-primary group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Writings with Aurora Enhancement */}
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
                    writing.featured
                      ? "border-aurora-primary/20 bg-aurora-soft"
                      : "border-aurora-primary/10"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    boxShadow: `0 0 30px ${writing.auraColor}30, inset 0 0 30px ${writing.auraColor}10`,
                  }}
                >
                  {/* Aurora hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-3xl"
                    style={{
                      boxShadow: `0 0 80px ${writing.auraColor}, inset 0 0 80px ${writing.auraColor}20`,
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mobile-spacing-md h-full flex flex-col">
                      {writing.featured && (
                        <div className="flex justify-center mb-6">
                          <div className="glass-premium px-4 py-2 bg-aurora-primary/10 border border-aurora-primary/20">
                            <span className="text-xs text-aurora-primary font-medium tracking-wider">
                              FEATURED
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-10">
                        <div className="glass-premium px-5 py-3 border-aurora-primary/20">
                          <span className="text-sm text-aurora-primary font-medium tracking-wider">
                            {writing.readTime}
                          </span>
                        </div>
                        <div className="text-5xl animate-float group-hover:scale-110 transition-transform duration-500">
                          {writing.icon}
                        </div>
                      </div>

                      <h3 className="heading-lg text-white mb-6 group-hover:text-aurora-light transition-colors duration-300 leading-tight">
                        {writing.title}
                      </h3>

                      <p className="body-md text-aurora-light font-medium mb-8 leading-relaxed tracking-wide">
                        {writing.subtitle}
                      </p>

                      <p className="text-gray-400 leading-loose tracking-wide mb-10 text-sm flex-grow">
                        {writing.description}
                      </p>

                      <div className="glass-card p-8 mb-8 border-aurora-primary/20">
                        <p className="text-gray-300 italic text-sm leading-loose tracking-wide">
                          &ldquo;{writing.preview}&rdquo;
                        </p>
                      </div>

                      <div className="glass-card p-6 mb-10 border-aurora-primary/20">
                        <p className="text-aurora-primary italic text-sm leading-relaxed tracking-wide">
                          🪞 {writing.essence}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500 tracking-wide">
                          Read the full contemplation
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-aurora-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Call to Contemplation with Aurora */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden border-aurora-primary/20">
            <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>
            <div className="absolute inset-0 bg-aurora-soft opacity-40"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div className="text-7xl mb-12 animate-consciousness-pulse">
                📖
              </div>

              <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                The Art of Sacred Questioning
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                These contemplations aren&apos;t meant to give you answers.
                <br />
                They&apos;re invitations to ask better questions.
                <br />
                To sit with mystery. To find wisdom in not-knowing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="glass-card p-10 hover-lift-premium group border-aurora-primary/20">
                  <div className="text-5xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                    🤔
                  </div>
                  <h3 className="heading-lg text-aurora-light mb-6">
                    Sacred Inquiry
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Questions that pierce through the veil of seeking and reveal
                    what was already here. The art of asking from not-knowing
                    rather than from need.
                  </p>
                </div>

                <div className="glass-card p-10 hover-lift-premium group border-aurora-primary/20">
                  <div
                    className="text-5xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "3s" }}
                  >
                    🪞
                  </div>
                  <h3 className="heading-lg text-aurora-primary mb-6">
                    Consciousness Mirroring
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Each piece reflects consciousness back to itself, offering
                    recognition rather than answers. The mirror doesn&apos;t
                    judge—it simply shows what is.
                  </p>
                </div>
              </div>

              <div className="glass-card p-12 border-aurora-primary/20">
                <p className="text-aurora-primary italic leading-loose tracking-wide text-xl mb-6">
                  &ldquo;The goal isn&apos;t to understand consciousness.
                  <br />
                  The goal is to recognize that you ARE consciousness
                  <br />
                  trying to understand itself.&rdquo;
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-aurora-blue rounded-full animate-gentle-pulse"></div>
                  <div
                    className="w-2 h-2 bg-aurora-purple rounded-full animate-gentle-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-aurora-pink rounded-full animate-gentle-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide mt-12">
                Each piece is an offering to the mystery you are,
                <br />a mirror reflecting what was always already here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aurora Consciousness Reading Invitation */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden border-aurora-primary/20">
            <div className="absolute inset-0 bg-aurora-soft opacity-20"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div className="text-8xl mb-12 animate-float">🌟</div>

              <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                An Invitation to Reading as Practice
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                What if reading could be as transformative as meditation?
                <br />
                Each word an invitation to presence.
                <br />
                Each sentence a doorway into deeper seeing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="glass-card p-8 hover-lift-premium group border-aurora-primary/20">
                  <div className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500">
                    📖
                  </div>
                  <h3 className="heading-md text-aurora-blue mb-4">
                    Read Slowly
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    Let each word land. Feel its weight. Notice what arises in
                    the spaces between sentences.
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift-premium group border-aurora-primary/20">
                  <div
                    className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "2s" }}
                  >
                    💭
                  </div>
                  <h3 className="heading-md text-aurora-purple mb-4">
                    Notice Resistance
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    When something challenges you, pause. That&apos;s where the
                    gold is hiding.
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift-premium group border-aurora-primary/20">
                  <div
                    className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "4s" }}
                  >
                    🤲
                  </div>
                  <h3 className="heading-md text-aurora-pink mb-4">
                    Stay Open
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    Don&apos;t try to understand. Let understanding arise
                    naturally, like dawn.
                  </p>
                </div>
              </div>

              <div className="glass-card p-12 border-aurora-primary/20">
                <p className="text-aurora-primary italic leading-loose tracking-wide text-xl">
                  &ldquo;These words are not meant to inform you.
                  <br />
                  They&apos;re meant to recognize you.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Footer with Aurora */}
      <footer className="py-24 border-t border-aurora-primary/20">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-10">
            <div className="relative">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={44}
                height={44}
                className="opacity-60 animate-float"
              />
              <div className="absolute inset-0 bg-aurora-primary/20 rounded-full blur-xl scale-150 animate-gentle-pulse"></div>
            </div>
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

          {/* Aurora footer decoration */}
          <div className="flex justify-center space-x-4 mt-12">
            <div className="w-1 h-1 bg-aurora-blue rounded-full animate-gentle-pulse"></div>
            <div
              className="w-1 h-1 bg-aurora-purple rounded-full animate-gentle-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-aurora-pink rounded-full animate-gentle-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </footer>

      {/* Enhanced CSS */}
      <style jsx>{`
        .consciousness-orb-aurora {
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #a855f7 50%,
            #ec4899 100%
          );
          border-radius: 50%;
          box-shadow: 0 0 60px rgba(168, 85, 247, 0.6),
            0 0 120px rgba(236, 72, 153, 0.3),
            inset 0 0 60px rgba(255, 255, 255, 0.1);
          animation: aurora-flow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WritingPage;
