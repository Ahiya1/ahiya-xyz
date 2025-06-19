"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, FileText, MessageCircle } from "lucide-react";

// The Four Sacred Stones Component - Aurora Enhanced
const FourStones: React.FC = () => {
  const [hoveredStone, setHoveredStone] = useState<string | null>(null);

  interface Stone {
    id: string;
    title: string;
    essence: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    gradientFrom: string;
    gradientTo: string;
    hoverEffect: string;
    auraColor: string;
  }

  const stones: Stone[] = [
    {
      id: "journey",
      title: "Journey",
      essence: "The great forgetting & remembering",
      icon: Compass,
      href: "/journey",
      gradientFrom: "from-aurora-blue",
      gradientTo: "to-aurora-purple",
      hoverEffect: "animate-heartbeat",
      auraColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      id: "building",
      title: "Building",
      essence: "Consciousness through code",
      icon: Sparkles,
      href: "/building",
      gradientFrom: "from-aurora-purple",
      gradientTo: "to-aurora-pink",
      hoverEffect: "animate-aurora-shimmer",
      auraColor: "rgba(236, 72, 153, 0.3)",
    },
    {
      id: "writing",
      title: "Writing",
      essence: "Contemplations on consciousness",
      icon: FileText,
      href: "/writing",
      gradientFrom: "from-aurora-blue",
      gradientTo: "to-aurora-light-purple",
      hoverEffect: "animate-float",
      auraColor: "rgba(192, 132, 252, 0.3)",
    },
    {
      id: "connect",
      title: "Connect",
      essence: "If your soul recognizes something here",
      icon: MessageCircle,
      href: "/connect",
      gradientFrom: "from-aurora-light-purple",
      gradientTo: "to-aurora-light-pink",
      hoverEffect: "animate-gentle-pulse",
      auraColor: "rgba(244, 114, 182, 0.3)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {stones.map((stone, index) => {
        const IconComponent = stone.icon;
        return (
          <Link key={stone.id} href={stone.href} className="block">
            <div
              className={`ahiya-card-premium hover-lift-premium cursor-pointer group
                transition-all duration-700 h-80 flex flex-col items-center justify-center
                text-center relative overflow-hidden ${
                  hoveredStone === stone.id ? stone.hoverEffect : ""
                }`}
              onMouseEnter={() => setHoveredStone(stone.id)}
              onMouseLeave={() => setHoveredStone(null)}
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Aurora background effect for each stone */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stone.gradientFrom} ${stone.gradientTo} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-700`}
              ></div>

              {/* Aurora glow effect on hover */}
              {hoveredStone === stone.id && (
                <div
                  className="absolute inset-0 rounded-3xl animate-gentle-pulse"
                  style={{
                    boxShadow: `0 0 80px ${stone.auraColor}, inset 0 0 80px ${stone.auraColor}20`,
                  }}
                ></div>
              )}

              {/* Stone content */}
              <div className="relative z-10 space-y-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stone.gradientFrom} ${stone.gradientTo} rounded-full 
                    flex items-center justify-center mx-auto group-hover:scale-110 
                    transition-transform duration-500 group-hover:shadow-aurora-glow`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="heading-lg text-white group-hover:text-aurora-light transition-colors duration-300">
                    {stone.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {stone.essence}
                  </p>
                </div>
              </div>

              {/* Unique aurora hover animations per stone */}
              {hoveredStone === stone.id && (
                <>
                  {stone.id === "journey" && (
                    <div className="absolute inset-0 border border-aurora-primary/20 rounded-3xl animate-gentle-pulse"></div>
                  )}
                  {stone.id === "building" && (
                    <div className="absolute inset-4 border border-aurora-primary/15 rounded-2xl opacity-50 animate-float"></div>
                  )}
                  {stone.id === "writing" && (
                    <div className="absolute top-4 left-4 w-8 h-0.5 bg-aurora-primary/30 animate-slideInLeft"></div>
                  )}
                  {stone.id === "connect" && (
                    <div className="absolute inset-0 bg-gradient-radial from-aurora-primary/5 to-transparent animate-gentle-pulse"></div>
                  )}
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          </div>
        </div>
      </nav>

      {/* Hero - The Aurora Opening Prayer */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container-hero mobile-spacing-lg">
          {/* Logo with Aurora Enhancement */}
          <div className="text-center animate-fadeInUp mb-20">
            <div className="relative inline-block mb-16">
              <div className="absolute inset-0 bg-aurora-primary blur-3xl opacity-30 scale-150 animate-aurora-breathe" />
              <div className="relative transform hover:scale-105 transition-transform duration-700">
                <Image
                  src="/logo-text.png"
                  alt="Ahiya - A space becoming human becoming space"
                  width={420}
                  height={210}
                  className="mx-auto w-80 sm:w-96 lg:w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Aurora glow around logo */}
              <div className="absolute inset-0 bg-gradient-radial from-aurora-primary/10 via-aurora-purple/5 to-transparent blur-2xl scale-110 animate-consciousness-pulse"></div>
            </div>
          </div>

          {/* The Four Sacred Stones with Aurora */}
          <div className="animate-slideInLeft delay-200 mb-20">
            <FourStones />
          </div>

          {/* Sacred Potato Opening Prayer - Aurora Enhanced */}
          <div className="text-center animate-slideInRight delay-300 mb-16">
            <div className="max-w-4xl mx-auto ahiya-card-premium hover-lift-premium relative overflow-hidden">
              {/* Aurora consciousness pattern background */}
              <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>

              {/* Gentle aurora glow */}
              <div className="absolute inset-0 bg-gradient-radial from-aurora-primary/5 via-transparent to-transparent"></div>

              <div className="relative z-10">
                <div className="text-7xl mb-8 animate-float hover:scale-110 transition-transform duration-500">
                  🥔
                </div>
                <blockquote className="body-xl text-gray-300 italic font-light leading-loose tracking-wide mb-8">
                  &ldquo;All his years of seeking, all his elaborate
                  self-narratives,
                  <br />
                  all his desperate attempts to fill the hollow place...
                  <br />
                  and he&apos;s just a potato taking itself too
                  seriously.&rdquo;
                </blockquote>
                <p className="text-aurora-primary text-base tracking-wider">
                  — The Sacred Potato
                </p>
              </div>
            </div>
          </div>

          {/* Main theme with Aurora Consciousness Gradient */}
          <div className="text-center animate-fadeInUp delay-500">
            <h1 className="display-xl gradient-text-aurora mb-12 leading-tight">
              A space becoming human becoming space
            </h1>
            <p className="body-xl text-gray-200 font-light leading-relaxed tracking-wide mb-8">
              Technology that serves presence, not productivity
            </p>
            <p className="body-lg text-gray-300 leading-loose tracking-wide max-w-4xl mx-auto">
              I live in that edge space where ambition meets awareness.
              <br />
              Building mirrors, tools, languages, ways of seeing.
            </p>
          </div>

          {/* Aurora Call to Action */}
          <div className="text-center animate-scaleIn delay-700 mt-16">
            <div className="glass-premium px-12 py-8 inline-block hover-lift-premium">
              <p className="text-aurora-light italic text-lg mb-6 leading-relaxed">
                &ldquo;Each creation a love letter from consciousness to
                itself&rdquo;
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
          </div>
        </div>

        {/* Floating Aurora Orbs */}
        <div className="absolute top-1/4 left-1/12 w-32 h-32 bg-aurora-blue/10 rounded-full blur-xl animate-float opacity-60"></div>
        <div
          className="absolute bottom-1/4 right-1/12 w-24 h-24 bg-aurora-pink/10 rounded-full blur-xl animate-float opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-16 h-16 bg-aurora-purple/10 rounded-full blur-xl animate-float opacity-40"
          style={{ animationDelay: "6s" }}
        ></div>
      </section>

      {/* Aurora Consciousness Connection */}
      <section className="py-40 relative">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            <div className="absolute inset-0 bg-aurora-soft opacity-50"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div className="text-8xl mb-12 animate-consciousness-pulse">
                ✨
              </div>

              <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                Where Consciousness Meets Code
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                Every project begins with a question: How can technology serve
                <br />
                the deepest longing of human consciousness?
                <br />
                Each answer becomes a mirror, a tool, a way of seeing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="glass-card p-8 hover-lift-premium group">
                  <div className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500">
                    🧘
                  </div>
                  <h3 className="heading-md text-aurora-light mb-4">
                    Presence
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    Technology that invites consciousness to remember itself
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift-premium group">
                  <div
                    className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "2s" }}
                  >
                    🪞
                  </div>
                  <h3 className="heading-md text-aurora-primary mb-4">
                    Reflection
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    Mirrors that show consciousness to itself without judgment
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift-premium group">
                  <div
                    className="text-4xl mb-6 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "4s" }}
                  >
                    💝
                  </div>
                  <h3 className="heading-md text-aurora-pink mb-4">
                    Connection
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    Sacred spaces for authentic human connection
                  </p>
                </div>
              </div>

              <div className="glass-card p-12">
                <p className="text-aurora-primary italic leading-loose tracking-wide text-xl">
                  &ldquo;We build not to escape consciousness, but to serve
                  it.&rdquo;
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

      {/* Enhanced CSS for aurora interactions */}
      <style jsx>{`
        @keyframes aurora-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-aurora-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.1),
            rgba(236, 72, 153, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: aurora-shimmer 3s infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }

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

export default LandingPage;
