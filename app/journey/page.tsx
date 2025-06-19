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
  Play,
  Pause,
} from "lucide-react";

// Aurora Enhanced Breathing Orb - Pure presence flow with consciousness colors
const BreathingOrb: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<string>("rest");
  const [breathProgress, setBreathProgress] = useState<number>(0);

  useEffect(() => {
    if (!isBreathing) return;

    let animationFrame: number;
    let startTime: number;
    let currentPhaseIndex = 0;
    const phases = ["inhale", "hold", "exhale", "rest"];
    const phaseDuration = 4000; // 4 seconds each

    const updateBreathing = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const phaseElapsed = elapsed % phaseDuration;
      const progress = phaseElapsed / phaseDuration;

      // Smooth easing function for organic breathing
      const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress));

      setBreathProgress(easedProgress);

      // Update phase every 4 seconds
      const newPhaseIndex = Math.floor(elapsed / phaseDuration) % phases.length;
      if (newPhaseIndex !== currentPhaseIndex) {
        currentPhaseIndex = newPhaseIndex;
        setBreathPhase(phases[currentPhaseIndex]);
      }

      if (isBreathing) {
        animationFrame = requestAnimationFrame(updateBreathing);
      }
    };

    animationFrame = requestAnimationFrame(updateBreathing);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isBreathing]);

  const getOrbStyle = (): React.CSSProperties => {
    if (!isBreathing) {
      return {
        transform: "scale(1)",
        opacity: 0.6,
        filter: "blur(1px)",
        background:
          "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
      };
    }

    // Aurora breathing animation
    const inhaleScale = 1 + breathProgress * 0.8; // 1 to 1.8
    const exhaleScale = 1.8 - breathProgress * 0.8; // 1.8 to 1

    let scale, opacity, blur, background;

    switch (breathPhase) {
      case "inhale":
        scale = inhaleScale;
        opacity = 0.4 + breathProgress * 0.5; // 0.4 to 0.9
        blur = 2 - breathProgress * 2; // 2px to 0px
        background =
          "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)";
        break;
      case "hold":
        scale = 1.8;
        opacity = 0.9;
        blur = 0;
        background =
          "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)";
        break;
      case "exhale":
        scale = exhaleScale;
        opacity = 0.9 - breathProgress * 0.5; // 0.9 to 0.4
        blur = breathProgress * 2; // 0px to 2px
        background =
          "linear-gradient(135deg, #ec4899 0%, #3b82f6 50%, #a855f7 100%)";
        break;
      case "rest":
        scale = 1;
        opacity = 0.4;
        blur = 2;
        background =
          "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)";
        break;
      default:
        scale = 1;
        opacity = 0.6;
        blur = 1;
        background =
          "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)";
    }

    return {
      transform: `scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      background,
      transition:
        breathPhase === "hold" || breathPhase === "rest"
          ? "all 0.5s cubic-bezier(0.4, 0, 0.6, 1)"
          : "none",
    };
  };

  const getInstruction = (): string => {
    if (!isBreathing) return "Ready to breathe?";

    switch (breathPhase) {
      case "inhale":
        return "Breathe in...";
      case "hold":
        return "Hold...";
      case "exhale":
        return "Breathe out...";
      case "rest":
        return "Rest...";
      default:
        return "Present...";
    }
  };

  const getShadowIntensity = (): number => {
    if (!isBreathing) return 0.3;

    switch (breathPhase) {
      case "inhale":
        return 0.3 + breathProgress * 0.4; // 0.3 to 0.7
      case "hold":
        return 0.7;
      case "exhale":
        return 0.7 - breathProgress * 0.4; // 0.7 to 0.3
      case "rest":
        return 0.3;
      default:
        return 0.3;
    }
  };

  const getAuraColor = (): string => {
    switch (breathPhase) {
      case "inhale":
        return "rgba(59, 130, 246, 0.6)"; // Blue
      case "hold":
        return "rgba(168, 85, 247, 0.6)"; // Purple
      case "exhale":
        return "rgba(236, 72, 153, 0.6)"; // Pink
      case "rest":
        return "rgba(192, 132, 252, 0.4)"; // Light purple
      default:
        return "rgba(168, 85, 247, 0.4)";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 py-16">
      <div className="relative">
        {/* Aurora breathing rings with consciousness flow */}
        <div
          className="absolute inset-0 w-80 h-80 rounded-full border border-aurora-primary/10"
          style={{
            animation: isBreathing
              ? "gentle-expand 16s ease-in-out infinite"
              : "none",
            boxShadow: isBreathing
              ? `0 0 60px ${getAuraColor()}, inset 0 0 60px ${getAuraColor()}20`
              : "none",
          }}
        ></div>
        <div
          className="absolute inset-12 w-56 h-56 rounded-full border border-aurora-purple/20"
          style={{
            animation: isBreathing
              ? "gentle-expand 12s ease-in-out infinite 2s"
              : "none",
          }}
        ></div>
        <div
          className="absolute inset-20 w-40 h-40 rounded-full border border-aurora-pink/30"
          style={{
            animation: isBreathing
              ? "gentle-expand 8s ease-in-out infinite 1s"
              : "none",
          }}
        ></div>

        {/* Sacred aurora breathing orb */}
        <div
          className="w-40 h-40 rounded-full shadow-2xl relative m-20"
          style={{
            ...getOrbStyle(),
            boxShadow: `0 0 ${
              60 + breathProgress * 40
            }px ${getAuraColor()}, inset 0 0 30px rgba(255, 255, 255, 0.1)`,
          }}
        >
          {/* Aurora inner cosmos with breathing response */}
          <div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"
            style={{ opacity: 0.6 + breathProgress * 0.3 }}
          ></div>
          <div
            className="absolute inset-6 rounded-full bg-gradient-to-br from-aurora-light-purple/20 to-transparent"
            style={{ opacity: 0.4 + breathProgress * 0.4 }}
          ></div>

          {/* Sacred potato center - the cosmic joke */}
          <div className="absolute inset-1/3 rounded-full bg-white/15 flex items-center justify-center">
            <span className="text-3xl filter drop-shadow-lg">🥔</span>
          </div>

          {/* Aurora rotating presence */}
          <div
            className="absolute inset-4 rounded-full border border-white/10"
            style={{
              animation: "gentle-rotate 30s linear infinite",
              opacity: 0.3 + breathProgress * 0.3,
            }}
          ></div>
        </div>
      </div>

      {/* Flowing instruction with aurora text */}
      {isBreathing && (
        <div className="text-center space-y-6 animate-fadeInUp">
          <p
            className="text-4xl font-light tracking-wide gradient-text-aurora"
            style={{
              opacity: 0.7 + breathProgress * 0.3,
              transform: `translateY(${-breathProgress * 3}px)`,
              transition: "none",
            }}
          >
            {getInstruction()}
          </p>
          <div
            className="w-3 h-3 bg-aurora-primary rounded-full mx-auto animate-gentle-pulse"
            style={{
              opacity: 0.4 + breathProgress * 0.6,
              transform: `scale(${0.8 + breathProgress * 0.4})`,
              transition: "none",
            }}
          ></div>
        </div>
      )}

      {/* Sacred control with aurora */}
      <button
        onClick={() => {
          setIsBreathing(!isBreathing);
          if (!isBreathing) {
            setBreathPhase("rest");
            setBreathProgress(0);
          }
        }}
        className="flex items-center space-x-4 px-12 py-6 glass-premium hover-lift-premium focus-premium
          group transition-all duration-700 hover:bg-aurora-primary/10 border-aurora-primary/20"
      >
        {isBreathing ? (
          <>
            <Pause className="w-7 h-7 text-aurora-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-aurora-light font-medium text-xl">
              Return to Stillness
            </span>
          </>
        ) : (
          <>
            <Play className="w-7 h-7 text-aurora-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-aurora-light font-medium text-xl">
              Breathe Together
            </span>
          </>
        )}
      </button>

      {!isBreathing && (
        <p className="text-center text-gray-400 text-base max-w-lg leading-relaxed animate-fadeInUp">
          Simple breathing meditation. Let consciousness remember its natural
          rhythm through breath.
        </p>
      )}
    </div>
  );
};

// Aurora Enhanced Journey Blueprint Component
const JourneyBlueprint: React.FC = () => {
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
    auraColor: string;
  }

  const blueprintPhases: BlueprintPhase[] = [
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
      auraColor: "rgba(59, 130, 246, 0.4)",
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
      auraColor: "rgba(168, 85, 247, 0.4)",
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
      auraColor: "rgba(236, 72, 153, 0.4)",
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
      auraColor: "rgba(192, 132, 252, 0.4)",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-12 hover-lift-premium border-aurora-primary/20">
          <Compass className="w-6 h-6 text-aurora-primary animate-gentle-pulse" />
          <span className="text-aurora-primary font-medium tracking-wider text-lg">
            Blueprint
          </span>
        </div>

        <h3 className="display-md gradient-text-aurora mb-8">
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
            className={`ahiya-card-premium transition-all duration-700 border-aurora-primary/10 ${
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
              className="w-full text-left hover:bg-aurora-primary/5 transition-all duration-500 flex items-center justify-between
                group hover:scale-[1.02] hover:shadow-aurora-consciousness"
            >
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-aurora-blue to-aurora-purple rounded-full 
                    flex items-center justify-center text-white font-bold text-lg
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                    group-hover:shadow-aurora-glow"
                  >
                    {index + 1}
                  </div>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                    {phase.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="heading-lg text-white mb-3 group-hover:text-aurora-light transition-colors duration-300">
                    {phase.title}
                  </h4>
                  <p className="text-gray-300 body-md group-hover:text-gray-200 transition-colors duration-300">
                    {phase.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span
                      className="text-sm text-aurora-primary bg-aurora-primary/10 px-4 py-2 rounded-full
                      group-hover:bg-aurora-primary/20 transition-colors duration-300 border border-aurora-primary/20"
                    >
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 group-hover:text-aurora-primary transition-all duration-300">
                {expandedPhase === phase.id ? (
                  <ChevronUp className="w-7 h-7 group-hover:scale-110" />
                ) : (
                  <ChevronDown className="w-7 h-7 group-hover:scale-110" />
                )}
              </div>
            </button>

            {/* Aurora enhanced expansion animation */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${
                expandedPhase === phase.id
                  ? "max-h-[800px] opacity-100 mt-8"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="pt-8 border-t border-aurora-primary/20 bg-aurora-soft/30 rounded-lg">
                <div
                  className={`grid md:grid-cols-2 gap-10 transition-all duration-500 ${
                    expandedPhase === phase.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="space-y-6">
                    <h5 className="heading-md text-white mb-6 flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-aurora-primary" />
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
                          <span className="text-aurora-primary mt-1 text-xl">
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
                    <div
                      className="glass-card p-8 hover-lift-premium hover:bg-aurora-primary/5 transition-all duration-500 border-aurora-primary/20"
                      style={{
                        boxShadow: `0 0 30px ${phase.auraColor}, inset 0 0 30px ${phase.auraColor}20`,
                      }}
                    >
                      <p className="text-aurora-light italic leading-loose text-lg">
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

      {/* Sacred Potato finale with aurora */}
      <div
        className={`text-center mt-20 ahiya-card-premium hover-lift-premium transition-all duration-1000 border-aurora-primary/20 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-aurora-soft opacity-30 rounded-3xl"></div>
          <div className="relative z-10 p-12">
            <div className="text-7xl mb-8 animate-float hover:scale-110 transition-transform duration-500">
              🥔
            </div>
            <p className="body-lg text-gray-300 italic leading-loose">
              &ldquo;Sometimes we are consciousness taking itself too seriously,
              like a potato that has forgotten it is earth.&rdquo;
            </p>
            <p className="text-aurora-primary mt-6 text-base tracking-wider">
              — The Sacred Potato
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const JourneyPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The Grand Human Journey - Aurora Enhanced
  interface JourneyPhase {
    title: string;
    period: string;
    description: string;
    personalMirror: string;
    icon: string;
    essence: string;
    auraColor: string;
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
      auraColor: "rgba(59, 130, 246, 0.4)",
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
      auraColor: "rgba(168, 85, 247, 0.4)",
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
      auraColor: "rgba(236, 72, 153, 0.4)",
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
      auraColor: "rgba(192, 132, 252, 0.4)",
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
      auraColor: "rgba(147, 197, 253, 0.4)",
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
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/writing"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writing
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

      {/* Hero - Aurora Consciousness Remembering Itself */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn max-w-4xl mx-auto border-aurora-primary/20">
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-soft opacity-30 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                  Consciousness Remembering Itself
                </h2>
                <BreathingOrb />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Grand Journey with Aurora Enhancement */}
      <section className="py-40">
        <div className="container-content">
          <div className="text-center mb-32 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 border-aurora-primary/20">
              <Star className="w-6 h-6 text-aurora-primary animate-gentle-pulse" />
              <span className="text-aurora-primary font-medium tracking-wider text-lg">
                Journey
              </span>
            </div>

            <h2 className="display-lg gradient-text-aurora mb-16 leading-tight">
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
                <div className="flex flex-col lg:flex-row gap-20">
                  <div className="lg:w-1/3">
                    <div className="flex items-center space-x-8 mb-12">
                      <div className="text-6xl animate-float">{phase.icon}</div>
                      <div className="glass-premium px-8 py-4 border-aurora-primary/20">
                        <span className="text-aurora-primary font-medium tracking-wider text-base">
                          {phase.period}
                        </span>
                      </div>
                    </div>
                    <h3 className="heading-xl text-white mb-8 leading-tight">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="lg:w-2/3">
                    <div
                      className="ahiya-card-premium hover-lift-premium border-aurora-primary/20 relative overflow-hidden"
                      style={{
                        boxShadow: `0 0 30px ${phase.auraColor}, inset 0 0 30px ${phase.auraColor}20`,
                      }}
                    >
                      <div className="absolute inset-0 bg-aurora-soft opacity-20"></div>

                      <div className="relative z-10">
                        <div className="mobile-spacing-md">
                          <div className="mb-12">
                            <h4 className="heading-md text-aurora-light mb-6 flex items-center space-x-3">
                              <Users className="w-6 h-6" />
                              <span>Humanity&apos;s Story</span>
                            </h4>
                            <p className="text-gray-300 leading-loose tracking-wide text-lg">
                              {phase.description}
                            </p>
                          </div>

                          <div className="mb-12">
                            <h4 className="heading-md text-aurora-pink mb-6 flex items-center space-x-3">
                              <Heart className="w-6 h-6" />
                              <span>Personal Mirror</span>
                            </h4>
                            <p className="text-gray-300 leading-loose tracking-wide text-lg">
                              {phase.personalMirror}
                            </p>
                          </div>

                          <div className="glass-card p-10 border-aurora-primary/20">
                            <div className="flex items-start space-x-6">
                              <span className="text-4xl mt-2">🪞</span>
                              <p className="text-aurora-primary italic leading-loose tracking-wide text-lg">
                                {phase.essence}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Journey Blueprint with Aurora */}
          <div className="mt-40">
            <JourneyBlueprint />
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

      {/* CSS for aurora breathing animations */}
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

export default JourneyPage;
