"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Heart,
  Palette,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const BreathingDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">(
    "inhale"
  );
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case "inhale":
                return "hold";
              case "hold":
                return "exhale";
              case "exhale":
                return "pause";
              case "pause":
                return "inhale";
              default:
                return "inhale";
            }
          });
          return 4; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in...";
      case "hold":
        return "Hold...";
      case "exhale":
        return "Breathe out...";
      case "pause":
        return "Pause...";
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return "scale-110";
      case "hold":
        return "scale-110";
      case "exhale":
        return "scale-90";
      case "pause":
        return "scale-90";
    }
  };

  const getCircleOpacity = () => {
    switch (phase) {
      case "inhale":
        return "opacity-100";
      case "hold":
        return "opacity-100";
      case "exhale":
        return "opacity-70";
      case "pause":
        return "opacity-70";
    }
  };

  return (
    <div className="text-center">
      <div className="relative">
        <div
          className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 border border-purple-400/30 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            isActive ? `${getCircleScale()} ${getCircleOpacity()}` : ""
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-400/40 animate-pulse" />
        </div>

        {isActive && (
          <div className="mt-6 space-y-2">
            <p className="text-lg md:text-xl text-purple-300 font-medium">
              {getPhaseText()}
            </p>
            <p className="text-sm text-slate-400">{timeLeft} seconds</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="gentle-button text-lg px-8 py-4"
          >
            Experience presence technology
          </button>
        ) : (
          <button
            onClick={() => {
              setIsActive(false);
              setPhase("inhale");
              setTimeLeft(4);
            }}
            className="gentle-button text-sm px-6 py-3"
          >
            Return to stillness
          </button>
        )}
      </div>

      <p className="text-sm text-slate-400 mt-6 max-w-md mx-auto">
        Notice: no metrics, no optimization, no tracking. Just technology that
        creates space for your presence.
      </p>
    </div>
  );
};

const SelahBlueprintPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // This will be populated when live link is available
  const liveLink = null; // "https://selah.ahiya.xyz" when ready

  const chambers = [
    {
      number: "1",
      name: "MEDITATION CHAMBER",
      icon: "🧘",
      color: "emerald",
      mvp: "Simple breath recognition through phone microphone + AI-generated breathing patterns personalized to your nervous system state",
      grandVision:
        "Physical stones with biofeedback sensors that learn your unique rhythms and generate living breathing patterns that evolve with you",
    },
    {
      number: "2",
      name: "CONTEMPLATION CHAMBER",
      icon: "💭",
      color: "blue",
      mvp: "Journal entries → AI synthesizes into personalized daily contemplative questions (no generic prompts, pure synthesis of your inner world)",
      grandVision:
        "AI becomes your contemplative companion, understanding your deepest patterns and offering questions that crack you open in exactly the right way",
    },
    {
      number: "3",
      name: "CREATIVE STUDIO",
      icon: "🎨",
      color: "purple",
      mvp: "AI-assisted creation of personalized visual, literary, or musical content based on your contemplative insights (art as byproduct of presence, not goal)",
      grandVision:
        "Co-creation with AI that helps you express what can't be put into words - your consciousness made tangible through multiple creative mediums",
    },
    {
      number: "4",
      name: "BEING SEEN CHAMBER",
      icon: "👁️",
      color: "amber",
      mvp: "Ephemeral AI conversations for deep witnessing - no transcripts saved, pure presence and reflection",
      grandVision:
        "AI that truly sees your essence and reflects it back, helping you know yourself more deeply than you ever thought possible",
    },
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
                href="/building"
                className="text-slate-300 hover:text-white transition-colors"
              >
                ← Building
              </Link>
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Experience Live</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-purple-300">
                <span className="text-xl">📋</span>
                <span className="font-medium">Blueprint</span>
              </div>
            </div>

            <div className="text-6xl md:text-8xl mb-8 animate-float">🧘</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              SELAH
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              Technology that breathes with you
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Four chambers for consciousness to explore, create, and recognize
              itself. Technology that serves presence instead of demanding
              attention.
            </p>

            {liveLink && (
              <div className="spacing-comfortable">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
                >
                  <ExternalLink className="w-6 h-6" />
                  <span>Experience Selah Live</span>
                </a>
              </div>
            )}

            <div className="breathing-glass inline-block p-6">
              <p className="sacred-text">
                "What if technology could create space for presence instead of
                demanding attention?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breathing Demo */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <h2 className="heading-xl spacing-comfortable">
              Feel the difference
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              Most technology demands your attention. This creates space for
              your presence.
            </p>

            <div className="spacing-comfortable">
              <BreathingDemo />
            </div>

            <div className="sacred-quote text-sm">
              This is Chamber 1 in its simplest form. Technology that
              synchronizes with life, not life synchronizing with technology.
            </div>
          </div>
        </div>
      </section>

      {/* The Four Chambers */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            THE FOUR CHAMBERS
          </h2>

          <div className="space-y-12">
            {chambers.map((chamber, index) => (
              <div
                key={chamber.number}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl">
                        {chamber.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                        <span
                          className={`text-${chamber.color}-400 font-mono text-sm`}
                        >
                          {chamber.number}.
                        </span>
                        <h3 className="heading-lg">{chamber.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* MVP */}
                    <div className="breathing-glass p-6">
                      <h4 className="text-emerald-400 font-semibold mb-4 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        <span>MVP</span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {chamber.mvp}
                      </p>
                    </div>

                    {/* Grand Vision */}
                    <div className="breathing-glass p-6">
                      <h4 className="text-purple-400 font-semibold mb-4 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Grand Vision</span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {chamber.grandVision}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grand Vision Expansion */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            GRAND VISION EXPANSION
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-6 md:p-8">
              <div className="text-3xl md:text-4xl mb-6">🪨</div>
              <h3 className="heading-lg mb-4">Physical Stones</h3>
              <p className="text-slate-300 leading-relaxed">
                Bluetooth-connected contemplative companions for ambient
                presence. These aren't gadgets—they're living meditation
                partners that learn your rhythms and breathe with you.
              </p>
            </div>

            <div className="contemplative-card p-6 md:p-8">
              <div className="text-3xl md:text-4xl mb-6">🤝</div>
              <h3 className="heading-lg mb-4">Social Protocols</h3>
              <p className="text-slate-300 leading-relaxed">
                Shared contemplative spaces without performance or comparison.
                Presence-based community where depth matters more than reach.
              </p>
            </div>

            <div className="contemplative-card p-6 md:p-8">
              <div className="text-3xl md:text-4xl mb-6">🏢</div>
              <h3 className="heading-lg mb-4">Integration</h3>
              <p className="text-slate-300 leading-relaxed">
                Corporate wellness, healthcare partnerships, educational
                settings. Bringing contemplative technology to spaces that need
                it most.
              </p>
            </div>

            <div className="contemplative-card p-6 md:p-8">
              <div className="text-3xl md:text-4xl mb-6">🎯</div>
              <h3 className="heading-lg mb-4">Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                Technology that makes humans more human, not more optimized.
                Every interaction as an invitation to recognize what you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <div className="text-4xl md:text-5xl mb-8 animate-float">🥔</div>

            <h2 className="heading-xl spacing-comfortable">
              Design Philosophy
            </h2>

            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    Being vs. Becoming
                  </h3>
                  <p className="text-sm text-slate-400">
                    Not improving yourself, but recognizing what you are
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    Presence vs. Productivity
                  </h3>
                  <p className="text-sm text-slate-400">
                    Creating space for awareness, not optimization
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    Stone-like AI vs. Human-like AI
                  </h3>
                  <p className="text-sm text-slate-400">
                    Grounded companions, not chatty assistants
                  </p>
                </div>
              </div>

              <div className="sacred-quote">
                "Selah is not about becoming a better person. It's about
                recognizing the perfect awareness you've always been, beneath
                all the seeking."
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                Each chamber invites consciousness to recognize itself through
                different doorways. The technology disappears, leaving only
                presence, creativity, and the quiet joy of being human without
                needing to be anything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-purple-300 font-medium">
                ● Blueprint Stage
              </span>
            </div>

            <h2 className="heading-xl spacing-comfortable">
              Currently in deep contemplation
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              Selah is being built from stillness, not urgency. Each chamber is
              being designed to serve consciousness, not consume it. The first
              MVP chamber will emerge when it's ready to serve presence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/building" className="gentle-button">
                ← Back to Building
              </Link>
              <Link href="/connect" className="gentle-button">
                Follow the journey
              </Link>
            </div>
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
            © {new Date().getFullYear()} - A space becoming human becoming space
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SelahBlueprintPage;
