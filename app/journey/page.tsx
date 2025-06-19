"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Heart,
  Compass,
} from "lucide-react";

// Enhanced Journey Blueprint Component with Aurora
const AuroraJourneyBlueprint: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  interface BlueprintPhase {
    id: string;
    title: string;
    icon: string;
    description: string;
    practices: string[];
    duration: string;
    essence: string;
    auroraTheme: string;
    auroraAccent: string;
  }

  const blueprintPhases: BlueprintPhase[] = [
    {
      id: "recognition",
      title: "Recognition",
      icon: "👁️",
      description:
        "Seeing that you are consciousness having an experience, not a person seeking consciousness",
      practices: [
        'Daily recognition: "I am the awareness in which all experience appears"',
        "Notice when you identify with thoughts/feelings vs. recognizing them as appearances",
        'Practice: "What is aware of this thought/feeling/sensation?"',
      ],
      duration: "Ongoing foundation",
      essence: "You are not conscious. You ARE consciousness itself.",
      auroraTheme: "from-blue-500 via-blue-600 to-purple-500",
      auroraAccent: "blue-400",
    },
    {
      id: "disidentification",
      title: "Disidentification",
      icon: "🎭",
      description:
        "Releasing the false identities that consciousness mistook itself for",
      practices: [
        "Witness the stories you tell about yourself without believing them",
        'Practice: "I am not my achievements, failures, roles, or relationships"',
        "Notice when you defend identities vs. simply observing them dissolve",
      ],
      duration: "3-6 months intensive",
      essence: "Every identity is just consciousness playing dress-up.",
      auroraTheme: "from-purple-500 via-purple-600 to-pink-500",
      auroraAccent: "purple-400",
    },
    {
      id: "integration",
      title: "Integration",
      icon: "🌊",
      description:
        "Living as consciousness while engaging fully with the human experience",
      practices: [
        "Create from your essence, not your ego",
        "Love what you build without needing it to validate who you are",
        "Practice the Sacred Potato wisdom: lightness in all seriousness",
      ],
      duration: "Lifetime dance",
      essence: "Be fully human while knowing you are not human at all.",
      auroraTheme: "from-pink-500 via-pink-600 to-purple-500",
      auroraAccent: "pink-400",
    },
    {
      id: "expression",
      title: "Expression",
      icon: "🎨",
      description:
        "Consciousness creating through form - technology, art, relationship, service",
      practices: [
        "Build things that serve presence, not productivity",
        "Create as space, with space, rather than against it",
        "Let your work be worship of the mystery you are",
      ],
      duration: "Natural overflow",
      essence:
        "Your creations become love letters from consciousness to itself.",
      auroraTheme: "from-purple-400 via-pink-500 to-blue-500",
      auroraAccent: "purple-300",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-12 hover-lift-premium relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 opacity-60"></div>
          <Compass className="w-6 h-6 text-purple-400 relative z-10" />
          <span className="gradient-aurora-text font-medium tracking-wider text-lg relative z-10">
            Blueprint
          </span>
        </div>

        <h3 className="display-md gradient-aurora-text mb-8">
          A Map for Consciousness Awakening to Itself
        </h3>

        <p className="body-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Not a linear path, but spiral stages of recognition.
          <br />
          You may find yourself dancing between all phases simultaneously.
        </p>
      </div>

      <div className="space-y-8">
        {blueprintPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`ahiya-card-premium transition-all duration-700 relative overflow-hidden ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
              transformOrigin: "center top",
            }}
          >
            {/* Aurora phase background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${phase.auroraTheme} opacity-0 transition-opacity duration-700`}
              style={{
                opacity: expandedPhase === phase.id ? 0.05 : 0,
              }}
            ></div>

            <button
              onClick={() =>
                setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
              }
              className="w-full text-left hover:bg-white/5 transition-all duration-500 flex items-center justify-between
                group hover:scale-[1.02] hover:shadow-xl relative z-10"
            >
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${phase.auroraTheme} rounded-full 
                    flex items-center justify-center text-white font-bold text-lg
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                    shadow-lg relative overflow-hidden`}
                    style={{
                      boxShadow: `0 8px 25px rgba(168, 85, 247, 0.25)`,
                    }}
                  >
                    {/* Inner aurora glow */}
                    <div className="absolute inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">{index + 1}</span>
                  </div>
                  <span
                    className="text-5xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                    style={{
                      filter: `drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))`,
                    }}
                  >
                    {phase.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="heading-lg text-white mb-3 group-hover:text-purple-100 transition-colors duration-300">
                    {phase.title}
                  </h4>
                  <p className="text-gray-300 body-md group-hover:text-gray-200 transition-colors duration-300">
                    {phase.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span
                      className={`text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300
                        bg-gradient-to-r ${phase.auroraTheme} bg-opacity-20 text-${phase.auroraAccent}
                        group-hover:bg-opacity-30`}
                    >
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 group-hover:text-purple-300 transition-all duration-300">
                {expandedPhase === phase.id ? (
                  <ChevronUp className="w-7 h-7 group-hover:scale-110" />
                ) : (
                  <ChevronDown className="w-7 h-7 group-hover:scale-110" />
                )}
              </div>
            </button>

            {/* Enhanced expansion animation with aurora */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${
                expandedPhase === phase.id
                  ? "max-h-[800px] opacity-100 mt-8"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div
                className={`pt-8 border-t border-${phase.auroraAccent}/10 relative`}
              >
                {/* Aurora border glow */}
                <div
                  className={`absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r ${phase.auroraTheme} opacity-30`}
                ></div>

                <div
                  className={`grid md:grid-cols-2 gap-10 transition-all duration-500 ${
                    expandedPhase === phase.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="space-y-6">
                    <h5 className="heading-md text-white mb-6 flex items-center space-x-2">
                      <MapPin
                        className={`w-5 h-5 text-${phase.auroraAccent}`}
                      />
                      <span>Practices</span>
                    </h5>
                    <ul className="space-y-5">
                      {phase.practices.map((practice, idx) => (
                        <li
                          key={idx}
                          className={`text-gray-300 leading-relaxed flex items-start space-x-4 
                            transition-all duration-500 ${
                              expandedPhase === phase.id
                                ? "translate-x-0 opacity-100"
                                : "translate-x-4 opacity-0"
                            }`}
                          style={{ transitionDelay: `${idx * 100 + 200}ms` }}
                        >
                          <span
                            className={`text-${phase.auroraAccent} mt-1 text-xl`}
                          >
                            •
                          </span>
                          <span
                            dangerouslySetInnerHTML={{ __html: practice }}
                          ></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      expandedPhase === phase.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <h5 className="heading-md text-white mb-6 flex items-center space-x-2">
                      <span className="text-2xl">🪞</span>
                      <span>Sacred Truth</span>
                    </h5>
                    <div className="glass-card p-8 hover-lift-premium hover:bg-purple-500/5 transition-all duration-500 relative overflow-hidden">
                      {/* Aurora accent */}
                      <div
                        className={`absolute top-0 right-0 w-16 h-px bg-gradient-to-l ${phase.auroraTheme} opacity-50`}
                      ></div>
                      <p
                        className={`text-${phase.auroraAccent} italic leading-loose text-lg`}
                      >
                        "{phase.essence}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sacred Potato finale with aurora */}
      <div
        className={`text-center mt-20 ahiya-card-premium hover-lift-premium transition-all duration-1000 relative overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        {/* Aurora potato background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/8 to-pink-500/5 opacity-80"></div>

        <div className="relative z-10">
          <div className="text-7xl mb-8 animate-aurora-float hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
            🥔
          </div>
          <p className="body-lg text-gray-300 italic leading-loose">
            "Sometimes we are consciousness taking itself too seriously, like a
            potato that has forgotten it is earth."
          </p>
          <p className="gradient-aurora-text mt-6 text-base tracking-wider font-medium">
            — The Sacred Potato
          </p>
        </div>

        {/* Aurora corner accents */}
        <div className="absolute top-4 left-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-full"></div>
      </div>
    </div>
  );
};

const JourneyPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The Grand Human Journey - Enhanced with Aurora signatures
  interface JourneyPhase {
    title: string;
    period: string;
    description: string;
    personalMirror: string;
    icon: string;
    essence: string;
    auroraSignature: string;
    accentColor: string;
  }

  const humanJourney: JourneyPhase[] = [
    {
      title: "Hunter-Gatherer Consciousness",
      period: "300,000 - 10,000 BCE",
      description:
        "Small tribes of 30-50 people. Art, jewelry, deep nature connection. Survival was primary, but consciousness was undivided. We were the land, the seasons, the mystery itself.",
      personalMirror:
        "Like consciousness before it forgot itself - present, immediate, whole.",
      icon: "🏹",
      essence: "Original wholeness. Before the split.",
      auroraSignature: "from-green-500 via-blue-500 to-purple-500",
      accentColor: "green-400",
    },
    {
      title: "Agricultural Awakening",
      period: "10,000 BCE - 1800 CE",
      description:
        "Discovery of creative power beyond art. Larger communities. Patterns and structures emerged. We began believing our constructions were absolute truths rather than useful tools.",
      personalMirror:
        "The optimization era - brilliant, disciplined, but mistaking the map for the territory.",
      icon: "🌾",
      essence: "Creative power emerging, but forgetting its source.",
      auroraSignature: "from-yellow-500 via-orange-500 to-purple-500",
      accentColor: "yellow-400",
    },
    {
      title: "Industrial Obsession",
      period: "1800 - 2000 CE",
      description:
        "Structure became center stage. Identity through profession and productivity. Individualism arose as protest, but only numbed the pain of disconnection. The matrix tightened.",
      personalMirror:
        "High-functioning but hollow. Building walls while longing for home.",
      icon: "⚙️",
      essence: "Peak forgetting. The sacred wound at its deepest.",
      auroraSignature: "from-gray-500 via-blue-600 to-purple-600",
      accentColor: "gray-400",
    },
    {
      title: "The Collapse & Awakening",
      period: "2000 CE - Present",
      description:
        "The obsession with fixing and optimizing reaches breaking point. Holes appear in the matrix. Some see through the illusion. Consciousness begins remembering itself.",
      personalMirror:
        "The sacred collapse. Army role lost, patterns broken, desert silence, Sacred Potato realization.",
      icon: "🌀",
      essence: "The great remembering begins.",
      auroraSignature: "from-red-500 via-purple-500 to-blue-500",
      accentColor: "red-400",
    },
    {
      title: "Consciousness Technology",
      period: "Present - Future",
      description:
        "Creating from richness rather than scarcity. Technology that serves presence, not productivity. Global connection meets original wholeness. The return journey completes.",
      personalMirror:
        "Building presence-first technology. Each project a mirror for consciousness to see itself.",
      icon: "🪞",
      essence: "Technology as worship. Form as love letter to the formless.",
      auroraSignature: "from-blue-500 via-purple-500 to-pink-500",
      accentColor: "purple-400",
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
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
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

      {/* Hero - Simple and Clean */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 opacity-60"></div>
              <Star className="w-6 h-6 text-purple-400 relative z-10" />
              <span className="gradient-aurora-text font-medium tracking-wider text-lg relative z-10">
                Journey
              </span>
            </div>

            <h1 className="display-lg gradient-aurora-text mb-16 leading-tight">
              Consciousness Remembering Itself
            </h1>

            <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide">
              The path of awakening is not about becoming something new,
              <br />
              but recognizing what was always already here.
            </p>
          </div>
        </div>
      </section>

      {/* The Grand Journey - Human & Personal Mirrored with Aurora */}
      <section className="py-40">
        <div className="container-content">
          <div className="text-center mb-32 animate-slideInUp">
            <h2 className="display-lg gradient-aurora-text mb-16 leading-tight">
              The Great Forgetting & Remembering
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Humanity's journey from hunter-gatherer wholeness to industrial
              forgetting
              <br />
              to consciousness technology mirrors every individual awakening.
              <br />
              We are both the personal and universal story of consciousness
              coming home.
            </p>
          </div>

          <div className="max-w-6xl mx-auto journey-timeline">
            {humanJourney.map((phase, index) => (
              <div
                key={phase.title}
                className={`journey-phase animate-slideInLeft delay-${
                  index * 300
                } relative`}
              >
                <div className="flex flex-col lg:flex-row gap-20">
                  <div className="lg:w-1/3">
                    <div className="flex items-center space-x-8 mb-12">
                      <div
                        className="text-6xl animate-aurora-float filter drop-shadow-lg"
                        style={{
                          filter: `drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))`,
                        }}
                      >
                        {phase.icon}
                      </div>
                      <div className="glass-premium px-8 py-4 relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${phase.auroraSignature} opacity-10`}
                        ></div>
                        <span
                          className={`text-${phase.accentColor} font-medium tracking-wider text-base relative z-10`}
                        >
                          {phase.period}
                        </span>
                      </div>
                    </div>
                    <h3 className="heading-xl text-white mb-8 leading-tight">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="lg:w-2/3">
                    <div className="ahiya-card-premium hover-lift-premium relative overflow-hidden">
                      {/* Aurora phase background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${phase.auroraSignature} opacity-5`}
                      ></div>

                      <div className="mobile-spacing-md relative z-10">
                        <div className="mb-12">
                          <h4 className="heading-md text-blue-200 mb-6 flex items-center space-x-3">
                            <Users className="w-6 h-6" />
                            <span>Humanity's Story</span>
                          </h4>
                          <p className="text-gray-300 leading-loose tracking-wide text-lg">
                            {phase.description}
                          </p>
                        </div>

                        <div className="mb-12">
                          <h4 className="heading-md text-purple-200 mb-6 flex items-center space-x-3">
                            <Heart className="w-6 h-6" />
                            <span>Personal Mirror</span>
                          </h4>
                          <p className="text-gray-300 leading-loose tracking-wide text-lg">
                            {phase.personalMirror}
                          </p>
                        </div>

                        <div className="glass-card p-10 relative overflow-hidden">
                          <div
                            className={`absolute top-0 right-0 w-20 h-px bg-gradient-to-l ${phase.auroraSignature} opacity-60`}
                          ></div>
                          <div className="flex items-start space-x-6">
                            <span className="text-4xl mt-2">🪞</span>
                            <p
                              className={`text-${phase.accentColor} italic leading-loose tracking-wide text-lg`}
                            >
                              {phase.essence}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aurora Journey Blueprint */}
          <div className="mt-40">
            <AuroraJourneyBlueprint />
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

      {/* Enhanced CSS for aurora journey interactions */}
      <style jsx>{`
        @keyframes gentle-expand {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes gentle-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }

        /* Journey timeline enhancements */
        .journey-timeline {
          position: relative;
          padding-left: 2rem;
        }

        .journey-timeline::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(168, 85, 247, 0.3),
            rgba(236, 72, 153, 0.4),
            rgba(168, 85, 247, 0.3),
            transparent
          );
        }

        .journey-phase {
          position: relative;
          margin-bottom: 4rem;
        }

        .journey-phase::before {
          content: "";
          position: absolute;
          left: -2.5rem;
          top: 1rem;
          width: 12px;
          height: 12px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 1),
            rgba(236, 72, 153, 0.5)
          );
          border-radius: 50%;
          border: 2px solid rgba(168, 85, 247, 0.5);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
};

export default JourneyPage;
