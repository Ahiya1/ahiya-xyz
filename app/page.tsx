"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  FileText,
  ArrowRight,
  MessageCircle,
  Send,
  Play,
  Pause,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  Compass,
  Users,
  Heart,
} from "lucide-react";

// Enhanced Breathing Orb Component with Organic Breathing
const BreathingOrb = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [breathCount, setBreathCount] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);

  useEffect(() => {
    if (!isBreathing) return;

    const breathCycle = () => {
      const phases = [
        { name: "inhale", duration: 4000, instruction: "Breathe in..." },
        { name: "hold-in", duration: 4000, instruction: "Hold..." },
        { name: "exhale", duration: 4000, instruction: "Breathe out..." },
        { name: "hold-out", duration: 4000, instruction: "Hold..." },
      ];

      let currentPhaseIndex = 0;

      const cyclePhase = () => {
        const currentPhase = phases[currentPhaseIndex];
        setBreathPhase(currentPhase.name);

        // Animate progress within each phase
        const startTime = Date.now();
        const updateProgress = () => {
          if (!isBreathing) return;

          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / currentPhase.duration, 1);
          setBreathProgress(progress);

          if (progress < 1) {
            requestAnimationFrame(updateProgress);
          }
        };
        updateProgress();

        setTimeout(() => {
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          if (currentPhaseIndex === 0) {
            setBreathCount((prev) => prev + 1);
          }
          if (isBreathing) cyclePhase();
        }, currentPhase.duration);
      };

      cyclePhase();
    };

    breathCycle();
  }, [isBreathing]);

  const getOrbTransform = () => {
    const baseScale =
      breathPhase === "inhale" || breathPhase === "hold-in" ? 1.5 : 1;
    const progressScale =
      breathPhase === "inhale"
        ? 1 + breathProgress * 0.5
        : breathPhase === "exhale"
        ? 1.5 - breathProgress * 0.5
        : baseScale;
    return `scale(${progressScale})`;
  };

  const getOrbOpacity = () => {
    const baseOpacity =
      breathPhase === "inhale" || breathPhase === "hold-in" ? 0.9 : 0.6;
    const progressOpacity =
      breathPhase === "inhale"
        ? 0.6 + breathProgress * 0.3
        : breathPhase === "exhale"
        ? 0.9 - breathProgress * 0.3
        : baseOpacity;
    return progressOpacity;
  };

  const getInstruction = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in...";
      case "hold-in":
        return "Hold...";
      case "exhale":
        return "Breathe out...";
      case "hold-out":
        return "Hold...";
      default:
        return "Ready to breathe?";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <div className="relative">
        {/* Enhanced breathing rings */}
        <div
          className={`absolute inset-0 w-64 h-64 rounded-full border border-blue-400/10 
          ${isBreathing ? "animate-ping" : ""}`}
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className={`absolute inset-8 w-48 h-48 rounded-full border border-blue-400/20 
          ${isBreathing ? "animate-pulse" : ""}`}
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className={`absolute inset-16 w-32 h-32 rounded-full border border-blue-400/30 
          ${isBreathing ? "animate-pulse" : ""}`}
          style={{ animationDuration: "2s" }}
        ></div>

        {/* Main breathing orb with organic animation */}
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 
            shadow-2xl relative m-16 transition-all duration-300 ease-out breathing-orb"
          style={{
            transform: getOrbTransform(),
            opacity: getOrbOpacity(),
            boxShadow: `0 0 ${60 + breathProgress * 40}px rgba(59, 130, 246, ${
              0.3 + breathProgress * 0.3
            })`,
          }}
        >
          {/* Layered inner glow effects */}
          <div
            className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 to-transparent"
            style={{ opacity: 0.8 + breathProgress * 0.2 }}
          ></div>
          <div
            className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-200/30 to-transparent"
            style={{ opacity: 0.6 + breathProgress * 0.3 }}
          ></div>

          {/* Sacred center with gentle pulse */}
          <div
            className="absolute inset-1/3 rounded-full bg-white/20 flex items-center justify-center"
            style={{ transform: `scale(${1 + breathProgress * 0.1})` }}
          >
            <span className="text-2xl filter drop-shadow-lg">🥔</span>
          </div>

          {/* Subtle rotating ring */}
          <div
            className="absolute inset-2 rounded-full border border-white/10 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>
      </div>

      {/* Enhanced breathing instruction */}
      {isBreathing && (
        <div className="text-center space-y-4 animate-fadeInUp">
          <p
            className="text-3xl text-blue-300 font-light tracking-wide transition-all duration-1000"
            style={{
              transform: `translateY(${-breathProgress * 5}px)`,
              opacity: 0.8 + breathProgress * 0.2,
            }}
          >
            {getInstruction()}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-24 h-1 bg-blue-400/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-all duration-300"
                style={{ width: `${breathProgress * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 min-w-max">
              Breath {breathCount} • 4-4-4-4 pattern
            </p>
          </div>
        </div>
      )}

      {/* Enhanced control button */}
      <button
        onClick={() => {
          setIsBreathing(!isBreathing);
          if (!isBreathing) {
            setBreathCount(0);
            setBreathPhase("inhale");
            setBreathProgress(0);
          }
        }}
        className="flex items-center space-x-3 px-10 py-5 glass-premium hover-lift-premium focus-premium
          group transition-all duration-500 hover:bg-blue-500/10"
      >
        {isBreathing ? (
          <>
            <Pause className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-blue-200 font-medium text-lg">
              Pause Breathing
            </span>
          </>
        ) : (
          <>
            <Play className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-blue-200 font-medium text-lg">
              Breathe With Me
            </span>
          </>
        )}
      </button>

      {!isBreathing && (
        <p className="text-center text-gray-400 text-sm max-w-md leading-relaxed animate-fadeInUp">
          A simple 4-4-4-4 breathing meditation. Let the orb guide your breath
          as consciousness remembers its natural rhythm.
        </p>
      )}
    </div>
  );
};

// Enhanced Journey Blueprint Component with Beautiful Animations
const JourneyBlueprint = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blueprintPhases = [
    {
      id: "recognition",
      title: "Recognition",
      icon: "👁️",
      description:
        "Seeing that you are consciousness having an experience, not a person seeking consciousness",
      practices: [
        "Daily recognition: &ldquo;I am the awareness in which all experience appears&rdquo;",
        "Notice when you identify with thoughts/feelings vs. recognizing them as appearances",
        "Practice: &ldquo;What is aware of this thought/feeling/sensation?&rdquo;",
      ],
      duration: "Ongoing foundation",
      essence: "You are not conscious. You ARE consciousness itself.",
    },
    {
      id: "disidentification",
      title: "Disidentification",
      icon: "🎭",
      description:
        "Releasing the false identities that consciousness mistook itself for",
      practices: [
        "Witness the stories you tell about yourself without believing them",
        "Practice: &ldquo;I am not my achievements, failures, roles, or relationships&rdquo;",
        "Notice when you defend identities vs. simply observing them dissolve",
      ],
      duration: "3-6 months intensive",
      essence: "Every identity is just consciousness playing dress-up.",
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
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-8 hover-lift-premium">
          <Compass className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-medium tracking-wider">
            Blueprint
          </span>
        </div>

        <h3 className="display-md gradient-text-primary mb-6">
          A Map for Consciousness Awakening to Itself
        </h3>

        <p className="body-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Not a linear path, but spiral stages of recognition.
          <br />
          You may find yourself dancing between all phases simultaneously.
        </p>
      </div>

      <div className="space-y-6">
        {blueprintPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`ahiya-card-premium transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
              transformOrigin: "center top",
            }}
          >
            <button
              onClick={() =>
                setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
              }
              className="w-full text-left hover:bg-white/5 transition-all duration-500 flex items-center justify-between
                group hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full 
                    flex items-center justify-center text-white font-bold
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                    group-hover:shadow-lg group-hover:shadow-blue-500/25"
                  >
                    {index + 1}
                  </div>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-500">
                    {phase.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="heading-lg text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    {phase.title}
                  </h4>
                  <p className="text-gray-300 body-md group-hover:text-gray-200 transition-colors duration-300">
                    {phase.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span
                      className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full
                      group-hover:bg-blue-400/20 transition-colors duration-300"
                    >
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 group-hover:text-blue-300 transition-all duration-300">
                {expandedPhase === phase.id ? (
                  <ChevronUp className="w-6 h-6 group-hover:scale-110" />
                ) : (
                  <ChevronDown className="w-6 h-6 group-hover:scale-110" />
                )}
              </div>
            </button>

            {/* Enhanced expansion animation */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${
                expandedPhase === phase.id
                  ? "max-h-[800px] opacity-100 mt-6"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="pt-6 border-t border-blue-400/10 bg-white/2">
                <div
                  className={`grid md:grid-cols-2 gap-8 transition-all duration-500 ${
                    expandedPhase === phase.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="space-y-4">
                    <h5 className="heading-md text-white mb-4 flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span>Practices</span>
                    </h5>
                    <ul className="space-y-4">
                      {phase.practices.map((practice, idx) => (
                        <li
                          key={idx}
                          className={`text-gray-300 leading-relaxed flex items-start space-x-3 
                            transition-all duration-500 ${
                              expandedPhase === phase.id
                                ? "translate-x-0 opacity-100"
                                : "translate-x-4 opacity-0"
                            }`}
                          style={{ transitionDelay: `${idx * 100 + 200}ms` }}
                        >
                          <span className="text-blue-400 mt-1 text-lg">•</span>
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
                    <h5 className="heading-md text-white mb-4 flex items-center space-x-2">
                      <span className="text-xl">🪞</span>
                      <span>Sacred Truth</span>
                    </h5>
                    <div className="glass-card p-6 hover-lift-premium hover:bg-blue-500/5 transition-all duration-500">
                      <p className="text-blue-200 italic leading-loose text-lg">
                        &ldquo;{phase.essence}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Sacred Potato finale */}
      <div
        className={`text-center mt-16 ahiya-card-premium hover-lift-premium transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="text-6xl mb-6 animate-float hover:scale-110 transition-transform duration-500">
          🥔
        </div>
        <p className="body-lg text-gray-300 italic leading-loose">
          &ldquo;All his years of seeking, all his elaborate self-narratives,
          all his desperate attempts to fill the hollow place... and he&apos;s
          just a potato taking itself too seriously.&rdquo;
        </p>
        <p className="text-blue-400 mt-4 text-sm tracking-wider">
          — The Sacred Potato
        </p>
      </div>
    </div>
  );
};

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The Grand Human Journey - Mirrored to Personal Evolution
  const humanJourney = [
    {
      title: "Hunter-Gatherer Consciousness",
      period: "300,000 - 10,000 BCE",
      description:
        "Small tribes of 30-50 people. Art, jewelry, deep nature connection. Survival was primary, but consciousness was undivided. We were the land, the seasons, the mystery itself.",
      personalMirror:
        "Like consciousness before it forgot itself - present, immediate, whole.",
      icon: "🏹",
      essence: "Original wholeness. Before the split.",
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
    },
  ];

  // Projects as consciousness explorations
  const projects = [
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

  // Writings as sacred containers
  const writings = [
    {
      id: "sacred-potato",
      title: "The Sacred Potato",
      subtitle: "A desert contemplative story",
      description:
        "Sometimes we are consciousness taking itself too seriously, like a potato that has forgotten it is earth.",
      preview:
        "All his years of seeking, all his elaborate self-narratives, all his desperate attempts to fill the hollow place... and he&apos;s just a potato taking itself too seriously.",
      readTime: "25 min read",
      icon: "🥔",
      essence:
        "The keystone story. The realization that consciousness has been trying too hard.",
      link: "/writing/sacred-potato",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home.",
      preview:
        "The story of the Tree of Knowledge isn&apos;t just ancient mythology. It&apos;s a precise map of how consciousness develops...",
      readTime: "18 min read",
      icon: "🌳",
      essence: "A map of exodus from the sacred wound.",
      link: "/writing/sacred-wound",
    },
    {
      id: "edge-space",
      title: "Living in the Edge Space",
      subtitle: "Where ambition meets awareness",
      description:
        "What happens when you refuse to choose between worldly success and spiritual depth? You find the edge space.",
      preview:
        "Most people think spirituality means giving up ambition. Most ambitious people think consciousness is a luxury they can&apos;t afford...",
      readTime: "12 min read",
      icon: "⚡",
      essence: "A refusal to fragment. Integration of ambition and awareness.",
      link: "/writing/edge-space",
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
            <div className="flex items-center space-x-3 group">
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
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#writings"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writings
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#connect"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - The Opening Prayer */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="container-hero mobile-spacing-lg">
          <div className="text-center animate-fadeInUp">
            <div className="relative inline-block mb-12">
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

          <div className="text-center mobile-spacing-md animate-slideInLeft delay-200">
            <h1 className="display-xl gradient-text-primary mb-8 leading-tight">
              A space becoming human becoming space
            </h1>

            <div className="mobile-spacing-sm max-w-5xl mx-auto">
              <p className="body-xl text-gray-200 font-light leading-relaxed tracking-wide mb-6">
                Technology that serves presence, not productivity
              </p>
              <p className="body-lg text-gray-300 leading-loose tracking-wide max-w-4xl mx-auto">
                I live in that edge space where ambition meets awareness.
                <br />
                Building mirrors, tools, languages, ways of seeing.
              </p>
            </div>

            <div className="animate-slideInRight delay-300 py-12">
              <div className="inline-flex items-center space-x-4 ahiya-card-premium px-8 py-4 animate-float">
                <span className="text-3xl">🥔</span>
                <span className="text-gray-200 font-medium text-lg tracking-wide">
                  Sacred Potato Energy
                </span>
                <span className="text-3xl animate-heartbeat">✨</span>
              </div>
            </div>

            <blockquote className="body-xl text-gray-300 italic font-light max-w-4xl mx-auto animate-fadeInUp delay-500 leading-loose tracking-wide">
              &ldquo;I don&apos;t want to optimize life.
              <br />I want to reverence it.&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-scaleIn delay-700">
              <a
                href="#building"
                className="ahiya-button-premium group inline-flex items-center space-x-3 hover-lift-premium focus-premium"
              >
                <span>Explore the Mirrors</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Breathing Meditation Bridge */}
      <section className="section-separator">
        <div className="container-content">
          <div className="text-center">
            <div className="ahiya-card-premium hover-lift-premium animate-scaleIn max-w-4xl mx-auto">
              <h2 className="display-md gradient-text-primary mb-8 leading-tight">
                Consciousness Remembering Itself
              </h2>
              <BreathingOrb />
            </div>
          </div>
        </div>
      </section>

      {/* The Grand Journey - Human & Personal Mirrored */}
      <section id="journey" className="py-32">
        <div className="container-content">
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <Star className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Journey
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              The Great Forgetting & Remembering
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Humanity&apos;s journey from hunter-gatherer wholeness to
              industrial forgetting
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
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="lg:w-1/3">
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="text-5xl animate-float">{phase.icon}</div>
                      <div className="glass-premium px-6 py-3">
                        <span className="text-consciousness-400 font-medium tracking-wider text-sm">
                          {phase.period}
                        </span>
                      </div>
                    </div>
                    <h3 className="heading-xl text-white mb-6 leading-tight">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="lg:w-2/3">
                    <div className="ahiya-card-premium hover-lift-premium">
                      <div className="mobile-spacing-md">
                        <div className="mb-8">
                          <h4 className="heading-md text-blue-200 mb-4 flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Humanity&apos;s Story</span>
                          </h4>
                          <p className="text-gray-300 leading-loose tracking-wide text-lg">
                            {phase.description}
                          </p>
                        </div>

                        <div className="mb-8">
                          <h4 className="heading-md text-purple-200 mb-4 flex items-center space-x-2">
                            <Heart className="w-5 h-5" />
                            <span>Personal Mirror</span>
                          </h4>
                          <p className="text-gray-300 leading-loose tracking-wide text-lg">
                            {phase.personalMirror}
                          </p>
                        </div>

                        <div className="glass-card p-8">
                          <div className="flex items-start space-x-4">
                            <span className="text-3xl mt-1">🪞</span>
                            <p className="text-consciousness-400 italic leading-loose tracking-wide text-lg">
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

          {/* Journey Blueprint */}
          <div className="section-separator">
            <JourneyBlueprint />
          </div>
        </div>
      </section>

      {/* Building - Sacred Mirrors */}
      <section id="building" className="py-32">
        <div className="container-content">
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <Sparkles className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Building
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              Consciousness Through Code
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Each project is consciousness exploring itself through form.
              <br />
              Technology as meditation. Code as contemplation.
              <br />
              Interfaces as invitations to presence.
            </p>
          </div>

          <div className="mobile-spacing-lg">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-section animate-slideInLeft delay-${
                  index * 200
                } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 mobile-spacing-md">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-consciousness-500 to-consciousness-600 text-white">
                        <span className="text-3xl">{project.icon}</span>
                      </div>

                      <span
                        className={`px-4 py-2 text-sm font-medium rounded-full ${
                          project.status === "Live"
                            ? "success-premium"
                            : "glass-premium"
                        }`}
                      >
                        {project.status === "Live" ? (
                          <span className="inline-flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-gentle-pulse"></div>
                            <span>Live</span>
                          </span>
                        ) : (
                          <span>Blueprint</span>
                        )}
                      </span>
                    </div>

                    <div className="mobile-spacing-sm">
                      <h3 className="heading-xl text-white mb-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="heading-md text-gray-200 mb-6 leading-relaxed">
                        {project.subtitle}
                      </p>
                      <p className="body-lg text-gray-300 mb-8 leading-relaxed tracking-wide">
                        {project.description}
                      </p>
                      <p className="text-gray-400 leading-loose tracking-wide mb-8">
                        {project.details}
                      </p>

                      <div className="glass-card p-6 mb-8">
                        <p className="text-consciousness-400 italic leading-relaxed tracking-wide">
                          🪞 {project.essence}
                        </p>
                      </div>
                    </div>

                    {project.chambers && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-8">
                        {project.chambers.map((chamber, idx) => (
                          <div
                            key={idx}
                            className="ahiya-card-premium hover-lift-premium"
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <span className="text-3xl">{chamber.icon}</span>
                              <span className="font-medium text-white text-lg">
                                {chamber.name}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed tracking-wide">
                              {chamber.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6">
                      {project.external ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group"
                        >
                          <span className="tracking-wide">
                            Experience it live
                          </span>
                          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </a>
                      ) : (
                        <Link
                          href={project.link}
                          className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group"
                        >
                          <span className="tracking-wide">
                            Explore the blueprint
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
                        <div className="ahiya-card-premium text-center hover-lift-premium cursor-pointer group">
                          <div className="text-8xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                            {project.icon}
                          </div>
                          <p className="text-gray-400 italic leading-loose tracking-wide">
                            {project.essence}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <Link href={project.link} className="block">
                        <div className="ahiya-card-premium text-center hover-lift-premium cursor-pointer group">
                          <div className="text-8xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
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
            ))}
          </div>
        </div>
      </section>

      {/* Writings - Sacred Containers */}
      <section id="writings" className="section-separator py-32">
        <div className="container-content">
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <FileText className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Writings
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              Contemplations on Consciousness
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Explorations of the sacred wound that drives human seeking,
              <br />
              the cosmic joke of consciousness, and the ancient wisdom
              <br />
              that illuminates our modern longing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writings.map((writing, index) => (
              <Link key={writing.id} href={writing.link} className="block">
                <article
                  className="ahiya-card-premium group hover-lift-premium animate-scaleIn cursor-pointer h-full"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="mobile-spacing-md h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="glass-premium px-4 py-2">
                        <span className="text-xs text-consciousness-400 font-medium tracking-wider">
                          {writing.readTime}
                        </span>
                      </div>
                      <div className="text-4xl animate-float group-hover:scale-110 transition-transform duration-500">
                        {writing.icon}
                      </div>
                    </div>

                    <h3 className="heading-lg text-white mb-4 group-hover:text-gray-100 transition-colors duration-300 leading-tight">
                      {writing.title}
                    </h3>

                    <p className="body-md text-gray-200 font-medium mb-6 leading-relaxed tracking-wide">
                      {writing.subtitle}
                    </p>

                    <p className="text-gray-400 leading-loose tracking-wide mb-8 text-sm flex-grow">
                      {writing.description}
                    </p>

                    <div className="glass-card p-6 mb-6">
                      <p className="text-gray-300 italic text-sm leading-loose tracking-wide">
                        &ldquo;{writing.preview}&rdquo;
                      </p>
                    </div>

                    <div className="glass-card p-4 mb-8">
                      <p className="text-consciousness-400 italic text-xs leading-relaxed tracking-wide">
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

      {/* Connect - Soul Call */}
      <section id="connect" className="section-separator py-32">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div className="mb-16">
                <div className="w-24 h-24 bg-gradient-to-br from-consciousness-500 to-consciousness-600 rounded-full flex items-center justify-center mx-auto mb-12 animate-gentle-pulse">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>

                <h2 className="display-md gradient-text-primary mb-8 leading-tight">
                  If your soul recognizes
                  <br />
                  something here
                </h2>

                <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-12">
                  I believe in authentic connection over networking.
                  <br />
                  If what I&apos;m building resonates with something in you,
                  <br />
                  I&apos;d love to hear from you.
                </p>

                <div className="w-32 h-px bg-gradient-to-r from-transparent via-consciousness-400 to-transparent mx-auto"></div>
              </div>

              <a
                href="mailto:ahiya.butman@gmail.com"
                className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium mb-8"
              >
                <Mail className="w-6 h-6" />
                <span className="tracking-wide">ahiya.butman@gmail.com</span>
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide">
                For collaborations, conversations about consciousness-first
                technology,
                <br />
                or just to share what this work brings up for you.
              </p>

              <div className="mt-20 pt-16 border-t border-gray-700/30">
                <blockquote className="text-gray-300 italic leading-loose tracking-wide text-lg">
                  &ldquo;All his years of seeking, all his elaborate
                  self-narratives, all his desperate attempts to fill the hollow
                  place... and he&apos;s just a potato taking itself too
                  seriously.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="py-20 border-t border-gray-800/30">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={40}
              height={40}
              className="opacity-60 animate-float"
            />
          </div>

          <p className="text-gray-400 mb-4 tracking-wide">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-text-primary">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-6">
            &ldquo;A sacred potato experiencing the present moment
            <br />
            in all its ordinary magnificence&rdquo;
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Technology that serves
            consciousness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaLanding;
