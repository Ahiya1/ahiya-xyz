"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, FileText, MessageCircle } from "lucide-react";

// The Four Sacred Stones Component - Enhanced with Aurora
const FourStones: React.FC = () => {
  const [hoveredStone, setHoveredStone] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  interface Stone {
    id: string;
    title: string;
    essence: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    auroraGradient: string;
    hoverEffect: string;
    shadowColor: string;
  }

  const stones: Stone[] = [
    {
      id: "journey",
      title: "Journey",
      essence: "The great forgetting & remembering",
      icon: Compass,
      href: "/journey",
      auroraGradient: "from-blue-500 via-purple-500 to-blue-600",
      hoverEffect: "animate-aurora-breathe",
      shadowColor: "shadow-blue-500/25",
    },
    {
      id: "building",
      title: "Building",
      essence: "Consciousness through code",
      icon: Sparkles,
      href: "/building",
      auroraGradient: "from-purple-500 via-pink-500 to-purple-600",
      hoverEffect: "animate-aurora-pulse",
      shadowColor: "shadow-purple-500/25",
    },
    {
      id: "writing",
      title: "Writing",
      essence: "Contemplations on consciousness",
      icon: FileText,
      href: "/writing",
      auroraGradient: "from-blue-400 via-purple-400 to-pink-500",
      hoverEffect: "animate-aurora-float",
      shadowColor: "shadow-pink-500/25",
    },
    {
      id: "connect",
      title: "Connect",
      essence: "If your soul recognizes something here",
      icon: MessageCircle,
      href: "/connect",
      auroraGradient: "from-pink-400 via-purple-400 to-blue-400",
      hoverEffect: "animate-gentle-pulse",
      shadowColor: "shadow-pink-400/25",
    },
  ];

  if (!mounted) return null;

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
                className={`absolute inset-0 bg-gradient-to-br ${stone.auroraGradient} opacity-0 
                  group-hover:opacity-12 transition-opacity duration-700`}
              ></div>

              {/* Aurora ring effects */}
              {hoveredStone === stone.id && (
                <>
                  <div
                    className={`absolute inset-4 border-2 border-gradient-to-r ${stone.auroraGradient} 
                      rounded-3xl opacity-30 animate-aurora-pulse`}
                    style={{
                      borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
                    }}
                  ></div>
                  <div
                    className={`absolute inset-8 border border-gradient-to-r ${stone.auroraGradient} 
                      rounded-2xl opacity-20 animate-aurora-breathe`}
                    style={{
                      borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
                      animationDelay: "0.5s",
                    }}
                  ></div>
                </>
              )}

              {/* Stone content */}
              <div className="relative z-10 space-y-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stone.auroraGradient} rounded-full 
                    flex items-center justify-center mx-auto group-hover:scale-110 
                    transition-all duration-500 group-hover:shadow-lg ${stone.shadowColor}
                    relative overflow-hidden`}
                >
                  {/* Inner aurora glow */}
                  <div className="absolute inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <IconComponent className="w-10 h-10 text-white relative z-10" />
                </div>

                <div className="space-y-4">
                  <h3 className="heading-lg text-white group-hover:text-purple-100 transition-colors duration-300">
                    {stone.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {stone.essence}
                  </p>
                </div>
              </div>

              {/* Unique aurora animations per stone */}
              {hoveredStone === stone.id && (
                <>
                  {stone.id === "journey" && (
                    <div className="absolute inset-0 border border-blue-400/20 rounded-3xl animate-aurora-pulse"></div>
                  )}
                  {stone.id === "building" && (
                    <div className="absolute inset-4 border border-purple-400/15 rounded-2xl opacity-50 animate-aurora-float"></div>
                  )}
                  {stone.id === "writing" && (
                    <div className="absolute top-4 left-4 w-8 h-0.5 bg-pink-400/30 animate-slideInLeft"></div>
                  )}
                  {stone.id === "connect" && (
                    <div className="absolute inset-0 bg-gradient-radial from-pink-400/5 to-transparent animate-aurora-pulse"></div>
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

// Aurora Logo Component with WOW effect
const AuroraLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative inline-block mb-16">
      {/* Aurora field rings - multiple layers for depth */}
      <div className="absolute inset-0 scale-150">
        <div
          className="absolute inset-0 rounded-full opacity-20 animate-aurora-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 40%, transparent 70%)",
            filter: "blur(40px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute inset-4 rounded-full opacity-15 animate-aurora-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 80%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute inset-8 rounded-full opacity-25 animate-aurora-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.1) 60%, transparent 90%)",
            filter: "blur(80px)",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      {/* Hover-activated aurora intensity */}
      {isHovered && (
        <>
          <div
            className="absolute inset-0 scale-125 rounded-full animate-aurora-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.15) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)",
              filter: "blur(50px)",
            }}
          ></div>
          <div
            className="absolute inset-2 scale-110 rounded-full animate-aurora-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(139, 92, 246, 0.18) 40%, transparent 70%)",
              filter: "blur(30px)",
              animationDelay: "0.5s",
            }}
          ></div>
        </>
      )}

      {/* Outer glow ring on hover */}
      <div
        className={`absolute inset-0 scale-150 transition-opacity duration-1000 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 rounded-full border-2 animate-aurora-pulse"
          style={{
            borderImage:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.3)) 1",
            filter: "blur(2px)",
          }}
        ></div>
      </div>

      {/* Logo with enhanced hover effects */}
      <div
        className="relative transform hover:scale-105 transition-all duration-700 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/logo-text.png"
          alt="Ahiya - A space becoming human becoming space"
          width={420}
          height={210}
          className="mx-auto w-80 sm:w-96 lg:w-full h-auto drop-shadow-2xl relative z-10"
          priority
        />

        {/* Inner logo glow */}
        <div
          className={`absolute inset-4 transition-opacity duration-1000 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
            filter: "blur(20px)",
          }}
        ></div>
      </div>

      {/* Floating aurora particles on hover */}
      {isHovered && (
        <>
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-aurora-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-pink-400/50 rounded-full animate-aurora-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/6 w-1 h-1 bg-blue-400/40 rounded-full animate-aurora-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </>
      )}
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
          </div>
        </div>
      </nav>

      {/* Hero - The Aurora Opening Prayer */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container-hero mobile-spacing-lg">
          {/* Aurora Logo with WOW effect */}
          <div className="text-center animate-fadeInUp mb-20">
            <AuroraLogo />
          </div>

          {/* The Four Sacred Stones with Aurora */}
          <div className="animate-slideInLeft delay-200 mb-20">
            <FourStones />
          </div>

          {/* Sacred Potato Opening Prayer - Enhanced */}
          <div className="text-center animate-slideInRight delay-300 mb-16">
            <div className="max-w-4xl mx-auto ahiya-card-premium hover-lift-premium relative overflow-hidden">
              {/* Aurora background pattern */}
              <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>

              <div className="relative z-10">
                <div className="text-7xl mb-8 animate-aurora-float">🥔</div>
                <blockquote className="body-xl text-gray-200 italic font-light leading-loose tracking-wide mb-8">
                  "All his years of seeking, all his elaborate self-narratives,
                  <br />
                  all his desperate attempts to fill the hollow place...
                  <br />
                  and he&apos;s just a potato taking itself too seriously."
                </blockquote>
                <p className="gradient-aurora-text text-base tracking-wider font-medium">
                  — The Sacred Potato
                </p>
              </div>

              {/* Aurora corner accents */}
              <div className="absolute top-4 right-4 w-12 h-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"></div>
            </div>
          </div>

          {/* Main theme and feeling - Enhanced with Aurora */}
          <div className="text-center animate-fadeInUp delay-500">
            <h1 className="display-xl gradient-aurora-text mb-12 leading-tight">
              A space becoming human becoming space
            </h1>
            <p className="body-xl text-gray-100 font-light leading-relaxed tracking-wide mb-8">
              Technology that serves presence, not productivity
            </p>
            <p className="body-lg text-gray-300 leading-loose tracking-wide max-w-4xl mx-auto">
              I live in that edge space where ambition meets awareness.
              <br />
              Building mirrors, tools, languages, ways of seeing.
            </p>
          </div>

          {/* Aurora energy particles floating around */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/4 left-1/6 w-1 h-1 bg-purple-400/40 rounded-full animate-aurora-float"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-aurora-float"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute top-2/3 left-3/4 w-0.5 h-0.5 bg-blue-400/50 rounded-full animate-aurora-float"
              style={{ animationDelay: "6s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/8 w-1 h-1 bg-purple-300/35 rounded-full animate-aurora-float"
              style={{ animationDelay: "9s" }}
            ></div>
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

      {/* Enhanced CSS for aurora stone interactions */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.1),
            rgba(236, 72, 153, 0.08),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }

        /* Enhanced aurora interactions */
        .aurora-stone-glow {
          position: relative;
        }

        .aurora-stone-glow::before {
          content: "";
          position: absolute;
          inset: -10%;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.1) 0%,
            rgba(236, 72, 153, 0.05) 50%,
            transparent 80%
          );
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .aurora-stone-glow:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
