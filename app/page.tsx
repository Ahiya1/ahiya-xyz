"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, FileText, MessageCircle } from "lucide-react";

// Gentle Breathing Logo - Subtle and Meditative
const GentleBreathingLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative inline-block mb-20">
      {/* Subtle breathing aura - much more gentle */}
      <div
        className="absolute inset-0 scale-110 rounded-full transition-all duration-3000 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, rgba(236, 72, 153, 0.02) 50%, transparent 80%)",
          filter: "blur(20px)",
          animation: "gentle-breathe 8s ease-in-out infinite",
        }}
      />

      {/* Secondary gentle ring */}
      <div
        className="absolute inset-4 scale-105 rounded-full transition-all duration-4000 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.02) 0%, transparent 70%)",
          filter: "blur(15px)",
          animation: "gentle-breathe 12s ease-in-out infinite 2s",
        }}
      />

      {/* Logo with minimal hover effect */}
      <div
        className="relative transform transition-all duration-1000 ease-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <Image
          src="/logo-text.png"
          alt="Ahiya - A space becoming human becoming space"
          width={420}
          height={210}
          className="mx-auto w-72 sm:w-80 lg:w-96 h-auto relative z-10"
          style={{
            filter: `drop-shadow(0 4px 20px rgba(168, 85, 247, ${
              isHovered ? 0.15 : 0.08
            }))`,
            transition: "filter 1s ease-out",
          }}
          priority
        />

        {/* Subtle inner glow on hover */}
        <div
          className="absolute inset-8 transition-opacity duration-1000 ease-out"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            filter: "blur(10px)",
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

// Refined Four Stones - More Elegant Interactions
const RefinedFourStones: React.FC = () => {
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
    color: string;
    hoverColor: string;
  }

  const stones: Stone[] = [
    {
      id: "journey",
      title: "Journey",
      essence: "The great forgetting & remembering",
      icon: Compass,
      href: "/journey",
      color: "rgba(59, 130, 246, 0.1)",
      hoverColor: "rgba(59, 130, 246, 0.15)",
    },
    {
      id: "building",
      title: "Building",
      essence: "Consciousness through code",
      icon: Sparkles,
      href: "/building",
      color: "rgba(168, 85, 247, 0.1)",
      hoverColor: "rgba(168, 85, 247, 0.15)",
    },
    {
      id: "writing",
      title: "Writing",
      essence: "Contemplations on consciousness",
      icon: FileText,
      href: "/writing",
      color: "rgba(236, 72, 153, 0.1)",
      hoverColor: "rgba(236, 72, 153, 0.15)",
    },
    {
      id: "connect",
      title: "Connect",
      essence: "If your soul recognizes something here",
      icon: MessageCircle,
      href: "/connect",
      color: "rgba(139, 92, 246, 0.1)",
      hoverColor: "rgba(139, 92, 246, 0.15)",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {stones.map((stone, index) => {
        const IconComponent = stone.icon;
        const isHovered = hoveredStone === stone.id;

        return (
          <Link key={stone.id} href={stone.href} className="block">
            <div
              className="group cursor-pointer transition-all duration-700 ease-out"
              onMouseEnter={() => setHoveredStone(stone.id)}
              onMouseLeave={() => setHoveredStone(null)}
              style={{
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                opacity: mounted ? 1 : 0,
                transition: "all 0.7s ease-out",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Card with subtle glass effect */}
              <div
                className="h-72 flex flex-col items-center justify-center text-center p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: isHovered ? stone.hoverColor : stone.color,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isHovered ? stone.hoverColor : "rgba(255, 255, 255, 0.05)"
                  }`,
                  boxShadow: isHovered
                    ? `0 8px 32px ${stone.color.replace("0.1", "0.2")}`
                    : `0 4px 20px rgba(0, 0, 0, 0.1)`,
                }}
              >
                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${stone.color} 0%, transparent 100%)`,
                    opacity: isHovered ? 0.3 : 0.1,
                  }}
                />

                {/* Icon container */}
                <div className="relative z-10 space-y-6">
                  <div
                    className="w-16 h-16 mx-auto flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      background: isHovered
                        ? stone.color.replace("0.1", "0.2")
                        : stone.color,
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        filter: `drop-shadow(0 2px 8px ${stone.color})`,
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white transition-all duration-500" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className="text-lg font-medium text-white transition-colors duration-500"
                      style={{
                        color: isHovered
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.85)",
                      }}
                    >
                      {stone.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed transition-colors duration-500"
                      style={{
                        color: isHovered
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {stone.essence}
                    </p>
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 opacity-20 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${stone.color.replace(
                      "0.1",
                      "0.3"
                    )} 0%, transparent 100%)`,
                    opacity: isHovered ? 0.3 : 0,
                  }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const RefinedLandingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
            animation: "gentle-breathe 3s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Sophisticated background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center top, #0f0f23 0%, #050507 100%)",
        }}
      />

      {/* Very subtle texture overlay */}
      <div className="fixed inset-0 z-0 opacity-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.02) 1px, transparent 0)",
            backgroundSize: "100px 100px",
            animation: "gentle-drift 30s linear infinite",
          }}
        />
      </div>

      {/* Refined Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={32}
                  height={32}
                  className="transition-all duration-500 group-hover:scale-105"
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(168, 85, 247, 0.3))",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full scale-150 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
              </div>
              <span
                className="text-lg font-medium transition-colors duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ahiya
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Contemplative and Warm */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-6xl mx-auto">
          {/* Gentle Breathing Logo */}
          <div
            className="text-center mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease-out 0.2s",
            }}
          >
            <GentleBreathingLogo />
          </div>

          {/* Refined Four Stones */}
          <div
            className="mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease-out 0.4s",
            }}
          >
            <RefinedFourStones />
          </div>

          {/* Sacred Potato - More Personal */}
          <div
            className="text-center mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease-out 0.6s",
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="p-8 rounded-3xl relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div className="relative z-10">
                  <div
                    className="text-6xl mb-6"
                    style={{
                      animation: "gentle-float 6s ease-in-out infinite",
                    }}
                  >
                    🥔
                  </div>
                  <blockquote className="text-xl text-gray-200 italic font-light leading-relaxed mb-6 max-w-3xl mx-auto">
                    "All his years of seeking, all his elaborate
                    self-narratives,
                    <br />
                    all his desperate attempts to fill the hollow place...
                    <br />
                    and he's just a potato taking itself too seriously."
                  </blockquote>
                  <p
                    className="text-sm font-medium tracking-wider"
                    style={{
                      background:
                        "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    — The Sacred Potato
                  </p>
                </div>

                {/* Subtle corner accents */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-12 h-12 opacity-10"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(236, 72, 153, 0.2) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Message - More Human */}
          <div
            className="text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease-out 0.8s",
            }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #a78bfa 25%, #c084fc 50%, #f472b6 75%, #fb7185 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              A space becoming human
              <br />
              becoming space
            </h1>

            <p className="text-xl text-gray-100 font-light mb-6 leading-relaxed">
              Technology that serves presence, not productivity
            </p>

            <p className="text-lg text-gray-300 leading-loose max-w-4xl mx-auto">
              I live in that edge space where ambition meets awareness.
              <br />
              Building mirrors, tools, languages, ways of seeing.
            </p>
          </div>

          {/* Subtle floating particles - much more gentle */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-1/4 left-1/6 w-1 h-1 bg-purple-400/20 rounded-full"
              style={{ animation: "gentle-float 12s ease-in-out infinite" }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400/15 rounded-full"
              style={{ animation: "gentle-float 15s ease-in-out infinite 4s" }}
            />
            <div
              className="absolute top-2/3 left-3/4 w-0.5 h-0.5 bg-blue-400/25 rounded-full"
              style={{ animation: "gentle-float 18s ease-in-out infinite 8s" }}
            />
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="py-16 border-t border-gray-800/20 relative">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-50"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(168, 85, 247, 0.2))",
                animation: "gentle-float 8s ease-in-out infinite",
              }}
            />
          </div>

          <p className="text-gray-400 mb-4 text-lg">
            Made with reverence by{" "}
            <span
              className="text-white font-medium"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic text-base mb-6">
            "Technology that serves consciousness"
          </p>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Ahiya Butman. Space becoming human
            becoming space.
          </p>
        </div>
      </footer>

      {/* Enhanced CSS for gentle animations */}
      <style jsx>{`
        @keyframes gentle-breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes gentle-float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes gentle-drift {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-5px, -3px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus states */
        *:focus-visible {
          outline: 2px solid rgba(168, 85, 247, 0.5);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default RefinedLandingPage;
