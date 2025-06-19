"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, FileText, MessageCircle } from "lucide-react";

// The Four Sacred Stones Component
const FourStones: React.FC = () => {
  const [hoveredStone, setHoveredStone] = useState<string | null>(null);

  interface Stone {
    id: string;
    title: string;
    essence: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    gradient: string;
    hoverEffect: string;
  }

  const stones: Stone[] = [
    {
      id: "journey",
      title: "Journey",
      essence: "The great forgetting & remembering",
      icon: Compass,
      href: "/journey",
      gradient: "from-blue-500 to-blue-600",
      hoverEffect: "animate-heartbeat",
    },
    {
      id: "building",
      title: "Building",
      essence: "Consciousness through code",
      icon: Sparkles,
      href: "/building",
      gradient: "from-blue-400 to-blue-500",
      hoverEffect: "animate-shimmer",
    },
    {
      id: "writing",
      title: "Writing",
      essence: "Contemplations on consciousness",
      icon: FileText,
      href: "/writing",
      gradient: "from-blue-600 to-blue-700",
      hoverEffect: "animate-float",
    },
    {
      id: "connect",
      title: "Connect",
      essence: "If your soul recognizes something here",
      icon: MessageCircle,
      href: "/connect",
      gradient: "from-blue-300 to-blue-400",
      hoverEffect: "animate-gentle-pulse",
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
              {/* Unique background effect for each stone */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stone.gradient} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-700`}
              ></div>

              {/* Stone content */}
              <div className="relative z-10 space-y-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stone.gradient} rounded-full 
                    flex items-center justify-center mx-auto group-hover:scale-110 
                    transition-transform duration-500 group-hover:shadow-lg 
                    group-hover:shadow-blue-500/25`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="heading-lg text-white group-hover:text-blue-100 transition-colors duration-300">
                    {stone.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {stone.essence}
                  </p>
                </div>
              </div>

              {/* Unique hover animations per stone */}
              {hoveredStone === stone.id && (
                <>
                  {stone.id === "journey" && (
                    <div className="absolute inset-0 border border-blue-400/20 rounded-3xl animate-gentle-pulse"></div>
                  )}
                  {stone.id === "building" && (
                    <div className="absolute inset-4 border border-blue-400/15 rounded-2xl opacity-50 animate-float"></div>
                  )}
                  {stone.id === "writing" && (
                    <div className="absolute top-4 left-4 w-8 h-0.5 bg-blue-400/30 animate-slideInLeft"></div>
                  )}
                  {stone.id === "connect" && (
                    <div className="absolute inset-0 bg-gradient-radial from-blue-400/5 to-transparent animate-gentle-pulse"></div>
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
          </div>
        </div>
      </nav>

      {/* Hero - The Opening Prayer */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container-hero mobile-spacing-lg">
          {/* Logo */}
          <div className="text-center animate-fadeInUp mb-20">
            <div className="relative inline-block mb-16">
              <div className="absolute inset-0 gradient-primary blur-3xl opacity-30 scale-150 animate-gentle-pulse" />
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
            </div>
          </div>

          {/* The Four Sacred Stones */}
          <div className="animate-slideInLeft delay-200 mb-20">
            <FourStones />
          </div>

          {/* Sacred Potato Opening Prayer */}
          <div className="text-center animate-slideInRight delay-300 mb-16">
            <div className="max-w-4xl mx-auto ahiya-card-premium hover-lift-premium">
              <div className="text-7xl mb-8 animate-float">🥔</div>
              <blockquote className="body-xl text-gray-300 italic font-light leading-loose tracking-wide mb-8">
                &ldquo;All his years of seeking, all his elaborate
                self-narratives,
                <br />
                all his desperate attempts to fill the hollow place...
                <br />
                and he&apos;s just a potato taking itself too seriously.&rdquo;
              </blockquote>
              <p className="text-blue-400 text-base tracking-wider">
                — The Sacred Potato
              </p>
            </div>
          </div>

          {/* Main theme and feeling */}
          <div className="text-center animate-fadeInUp delay-500">
            <h1 className="display-xl gradient-text-primary mb-12 leading-tight">
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

      {/* Enhanced CSS for stone interactions */}
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
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
