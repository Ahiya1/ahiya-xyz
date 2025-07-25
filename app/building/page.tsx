"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ExternalLink, ArrowRight, Code, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Core Types for Maximum Performance
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "blueprint" | "development";
  icon: string;
  blueprintLink: string;
  liveLink?: string;
  featured?: boolean;
  reflection: string;
  tech: string[];
  cardType: "mirror" | "breathing" | "deceptive" | "writing";
}

interface BreathingState {
  phase: "inhale" | "exhale";
  progress: number;
  intensity: number;
  scale: number;
  glowIntensity: number;
  cycleTime: number;
}

interface GlitchState {
  displayText: string;
  corruptionLevel: number;
  isGlitching: boolean;
  glitchIntensity: number;
  offsetX: number;
  offsetY: number;
  colorShift: number;
}

interface TypewriterState {
  displayText: string;
  currentIndex: number;
  isTyping: boolean;
  showCursor: boolean;
  completionPercentage: number;
}

interface MirrorState {
  shimmerPosition: number;
  reflectionIntensity: number;
  fragmentOpacity: number;
  surfaceDistortion: number;
}

// Ultra-Smooth Breathing Hook - Simplified 4-4 Cycle
const useSimpleBreathing = (isActive: boolean): BreathingState => {
  const [breathingState, setBreathingState] = useState<BreathingState>({
    phase: "inhale",
    progress: 0,
    intensity: 0,
    scale: 1,
    glowIntensity: 0,
    cycleTime: 8, // 4 seconds inhale + 4 seconds exhale
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setBreathingState((prev) => ({
        ...prev,
        scale: 1,
        glowIntensity: 0,
        intensity: 0,
      }));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const cycleProgress = (elapsed % 8) / 8; // 8 second total cycle

      // Simple binary phase - inhale or exhale
      const phase: "inhale" | "exhale" =
        cycleProgress < 0.5 ? "inhale" : "exhale";
      const phaseProgress =
        phase === "inhale" ? cycleProgress * 2 : (cycleProgress - 0.5) * 2;

      // Ultra-smooth easing - critical for meditation feel
      const easeInOutSine = (t: number): number => {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      };

      const easedProgress = easeInOutSine(phaseProgress);

      let intensity: number;
      let scale: number;
      let glowIntensity: number;

      if (phase === "inhale") {
        intensity = easedProgress;
        scale = 1 + easedProgress * 0.04; // Very subtle scale increase
        glowIntensity = easedProgress * 0.6;
      } else {
        intensity = 1 - easedProgress;
        scale = 1.04 - easedProgress * 0.04;
        glowIntensity = 0.6 - easedProgress * 0.6;
      }

      setBreathingState({
        phase,
        progress: phaseProgress,
        intensity,
        scale,
        glowIntensity,
        cycleTime: 8,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return breathingState;
};

// Sophisticated Glitch System
const useTextGlitch = (
  originalText: string,
  isActive: boolean
): GlitchState => {
  const [glitchState, setGlitchState] = useState<GlitchState>({
    displayText: originalText,
    corruptionLevel: 0,
    isGlitching: false,
    glitchIntensity: 0,
    offsetX: 0,
    offsetY: 0,
    colorShift: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const corruptionWords = useMemo(
    () => [
      "HUMAN",
      "AI",
      "REAL",
      "FAKE",
      "ERROR",
      "NULL",
      "VOID",
      "01001000",
      "UNKNOWN",
      "SYSTEM",
      "???",
      originalText,
    ],
    [originalText]
  );

  useEffect(() => {
    if (!isActive) {
      setGlitchState({
        displayText: originalText,
        corruptionLevel: 0,
        isGlitching: false,
        glitchIntensity: 0,
        offsetX: 0,
        offsetY: 0,
        colorShift: 0,
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      // Corruption wave with random spikes
      const baseCorruption = (Math.sin(elapsed * 2) + 1) / 2;
      const randomSpike = Math.random() < 0.08 ? Math.random() * 0.5 : 0;
      const corruptionLevel = Math.min(baseCorruption * 0.7 + randomSpike, 1);

      // Text corruption
      const shouldCorrupt = Math.random() < corruptionLevel * 0.4;
      const displayText = shouldCorrupt
        ? corruptionWords[Math.floor(Math.random() * corruptionWords.length)]
        : originalText;

      // Visual distortion
      const glitchIntensity = corruptionLevel;
      const offsetX = (Math.random() - 0.5) * glitchIntensity * 4;
      const offsetY = (Math.random() - 0.5) * glitchIntensity * 2;
      const colorShift = glitchIntensity * 90;

      setGlitchState({
        displayText,
        corruptionLevel,
        isGlitching: shouldCorrupt,
        glitchIntensity,
        offsetX,
        offsetY,
        colorShift,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, originalText, corruptionWords]);

  return glitchState;
};

// Natural Typewriter Effect
const useTypewriter = (
  text: string,
  isActive: boolean,
  baseSpeed: number = 60
): TypewriterState => {
  const [state, setState] = useState<TypewriterState>({
    displayText: text,
    currentIndex: text.length,
    isTyping: false,
    showCursor: true,
    completionPercentage: 100,
  });

  const animationFrameRef = useRef<number | null>(null);
  const lastCharTime = useRef<number>(0);
  const cursorBlinkInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setState({
        displayText: text,
        currentIndex: text.length,
        isTyping: false,
        showCursor: true,
        completionPercentage: 100,
      });
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (cursorBlinkInterval.current)
        clearInterval(cursorBlinkInterval.current);
      return;
    }

    // Reset for typing
    setState((prev) => ({
      ...prev,
      displayText: "",
      currentIndex: 0,
      isTyping: true,
      completionPercentage: 0,
    }));

    lastCharTime.current = performance.now();
    let currentIndex = 0;

    // Natural typing variation
    const getCharDelay = (char: string, position: number): number => {
      let delay = baseSpeed;

      // Slower for punctuation and capitals
      if (char === " ") delay = baseSpeed * 1.8;
      else if (/[.,!?;:]/.test(char)) delay = baseSpeed * 2.5;
      else if (/[A-Z]/.test(char) && position > 0) delay = baseSpeed * 1.3;

      // Add human variation
      return delay + (Math.random() - 0.5) * (baseSpeed * 0.4);
    };

    const animate = (currentTime: number) => {
      const timeSinceLastChar = currentTime - lastCharTime.current;

      if (currentIndex < text.length) {
        const currentChar = text[currentIndex];
        const charDelay = getCharDelay(currentChar, currentIndex);

        if (timeSinceLastChar >= charDelay) {
          currentIndex++;
          setState((prev) => ({
            ...prev,
            displayText: text.slice(0, currentIndex),
            currentIndex,
            isTyping: currentIndex < text.length,
            completionPercentage: (currentIndex / text.length) * 100,
          }));
          lastCharTime.current = currentTime;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Cursor blinking
    cursorBlinkInterval.current = setInterval(() => {
      setState((prev) => ({ ...prev, showCursor: !prev.showCursor }));
    }, 530);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (cursorBlinkInterval.current)
        clearInterval(cursorBlinkInterval.current);
    };
  }, [text, isActive, baseSpeed]);

  return state;
};

// Mirror Reflection Effects
const useMirrorReflection = (isActive: boolean): MirrorState => {
  const [mirrorState, setMirrorState] = useState<MirrorState>({
    shimmerPosition: 0,
    reflectionIntensity: 0,
    fragmentOpacity: 0,
    surfaceDistortion: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setMirrorState({
        shimmerPosition: 0,
        reflectionIntensity: 0,
        fragmentOpacity: 0,
        surfaceDistortion: 0,
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      // Gentle shimmer sweep
      const shimmerPosition = (Math.sin(elapsed * 1.2) + 1) / 2;

      // Pulsing reflection
      const reflectionIntensity = (Math.sin(elapsed * 0.8) + 1) / 2;

      // Fragment opacity variation
      const fragmentOpacity = 0.3 + ((Math.sin(elapsed * 1.5) + 1) / 2) * 0.4;

      // Subtle surface distortion
      const surfaceDistortion = Math.sin(elapsed * 2.1) * 0.02;

      setMirrorState({
        shimmerPosition,
        reflectionIntensity,
        fragmentOpacity,
        surfaceDistortion,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return mirrorState;
};

// Performance-Optimized Project Card
const ProjectCard: React.FC<{
  project: Project;
  index: number;
}> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Card-specific effects
  const breathingState = useSimpleBreathing(
    project.cardType === "breathing" && isHovered
  );
  const glitchState = useTextGlitch(
    project.title,
    project.cardType === "deceptive" && isHovered
  );
  const typewriterState = useTypewriter(
    project.title,
    project.cardType === "writing" && isHovered,
    70
  );
  const mirrorState = useMirrorReflection(
    project.cardType === "mirror" && isHovered
  );

  // Intersection observer for performance
  useEffect(() => {
    if (cardRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1, rootMargin: "50px" }
      );
      observerRef.current.observe(cardRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Optimized event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      // Smooth navigation without delay for better UX
      window.location.href = project.blueprintLink;
    },
    [project.blueprintLink]
  );

  // Prevent text blur with careful transform handling
  const cardTransform = useMemo(() => {
    if (!isVisible) return "translateZ(0)"; // Hardware acceleration baseline

    if (project.cardType === "breathing" && isHovered) {
      // Use transform3d for hardware acceleration and precision
      return `translate3d(0, -4px, 0) scale3d(${breathingState.scale}, ${breathingState.scale}, 1)`;
    }

    if (isHovered) {
      return "translate3d(0, -4px, 0) scale3d(1.01, 1.01, 1)";
    }

    return "translate3d(0, 0, 0) scale3d(1, 1, 1)";
  }, [isVisible, project.cardType, isHovered, breathingState.scale]);

  // Shadow effects without blur on text
  const cardShadow = useMemo(() => {
    if (!isVisible || !isHovered) return "0 4px 20px rgba(0, 0, 0, 0.08)";

    if (project.cardType === "breathing") {
      return `0 16px 40px rgba(52, 211, 153, ${
        breathingState.glowIntensity * 0.25
      })`;
    }

    if (project.cardType === "mirror") {
      return `0 16px 40px rgba(255, 255, 255, ${
        mirrorState.reflectionIntensity * 0.1
      })`;
    }

    return "0 16px 40px rgba(168, 85, 247, 0.12)";
  }, [
    isVisible,
    isHovered,
    project.cardType,
    breathingState.glowIntensity,
    mirrorState.reflectionIntensity,
  ]);

  // Title rendering with NO blur effects
  const renderTitle = useMemo(() => {
    const baseClasses = "text-xl font-semibold transition-colors duration-300";

    if (project.cardType === "deceptive") {
      return (
        <h3
          className={baseClasses}
          style={{
            // NO backdrop-filter or blur effects that cause text blur
            transform: `translate(${glitchState.offsetX}px, ${glitchState.offsetY}px)`,
            filter: `hue-rotate(${glitchState.colorShift}deg)`,
            textShadow: glitchState.isGlitching
              ? `1px 0 #ef4444, -1px 0 #3b82f6`
              : "none",
            color: glitchState.isGlitching ? "#ffffff" : undefined,
          }}
        >
          {glitchState.displayText}
        </h3>
      );
    }

    if (project.cardType === "writing") {
      return (
        <h3 className={baseClasses}>
          <span style={{ color: "inherit" }}>
            {typewriterState.displayText}
            {typewriterState.showCursor && (
              <span
                className="text-amber-400 ml-0.5"
                style={{
                  opacity: typewriterState.isTyping
                    ? 1
                    : typewriterState.showCursor
                    ? 1
                    : 0.3,
                  animation: "none", // Prevent animation conflicts
                }}
              >
                |
              </span>
            )}
          </span>
        </h3>
      );
    }

    if (project.cardType === "breathing") {
      return (
        <h3
          className={baseClasses}
          style={{
            color: isHovered
              ? `rgba(52, 211, 153, ${0.9 + breathingState.intensity * 0.1})`
              : undefined,
            // NO text-shadow or glow effects that cause blur
          }}
        >
          {project.title}
        </h3>
      );
    }

    return (
      <h3 className={`${baseClasses} hover:text-purple-200`}>
        {project.title}
      </h3>
    );
  }, [
    project.cardType,
    project.title,
    glitchState,
    typewriterState,
    breathingState,
    isHovered,
  ]);

  return (
    <div
      className="opacity-0"
      style={{
        animation: `smoothFadeIn 0.6s ease-out ${index * 80}ms forwards`,
      }}
    >
      <div
        ref={cardRef}
        className={`
          relative overflow-hidden cursor-pointer group
          bg-white/[0.015] border border-white/[0.04] rounded-2xl p-6
          transition-all duration-400 ease-out
          hover:bg-white/[0.03] hover:border-white/[0.06]
          will-change-transform
          ${
            project.featured ? "border-purple-400/15 bg-purple-500/[0.008]" : ""
          }
        `}
        style={{
          transform: cardTransform,
          boxShadow: cardShadow,
          backfaceVisibility: "hidden", // Prevent flickering
          WebkitFontSmoothing: "antialiased", // Ensure crisp text
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Featured Sparkle - Top Left */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="w-6 h-6 text-purple-400 animate-pulse">
              <Sparkles className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Card-specific Effects - NO blur on text areas */}
        {project.cardType === "breathing" && isHovered && (
          <>
            {/* Breathing aura - positioned away from text */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl -z-10"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(52, 211, 153, ${
                  breathingState.glowIntensity * 0.08
                }) 0%, transparent 60%)`,
                opacity: breathingState.intensity,
              }}
            />
            {/* Floating breath particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/40 rounded-full pointer-events-none"
                style={{
                  left: `${25 + i * 8}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  opacity: breathingState.intensity * 0.7,
                  transform: `scale(${breathingState.scale}) translateY(${
                    Math.sin(i + breathingState.progress * Math.PI) * 6
                  }px)`,
                  transition: "opacity 0.3s ease",
                }}
              />
            ))}
          </>
        )}

        {project.cardType === "mirror" && isHovered && (
          <>
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden -z-10"
              style={{
                background: `linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, ${
                  mirrorState.reflectionIntensity * 0.1
                }) 50%, transparent 80%)`,
                transform: `translateX(${
                  mirrorState.shimmerPosition * 120 - 60
                }%)`,
              }}
            />
            {/* Mirror fragments */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 border border-white/20 pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${25 + Math.sin(i) * 15}%`,
                  width: "8px",
                  height: "8px",
                  opacity: mirrorState.fragmentOpacity,
                  transform: `rotate(${
                    i * 45 + mirrorState.shimmerPosition * 10
                  }deg)`,
                  clipPath:
                    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                }}
              />
            ))}
          </>
        )}

        {/* Main Content - Isolated from effects */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{project.icon}</div>
              <div>
                {renderTitle}
                <p className="text-slate-400 text-sm mt-0.5 transition-colors duration-300">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-xs">
              <span
                className={`font-medium ${
                  project.status === "live"
                    ? "text-emerald-300"
                    : project.status === "development"
                    ? "text-amber-300"
                    : "text-purple-300"
                }`}
              >
                {project.status === "live"
                  ? "● Live"
                  : project.status === "development"
                  ? "● Development"
                  : "● Blueprint"}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed mb-4 text-sm">
            {project.description}
          </p>

          {/* Reflection Quote */}
          <div className="p-4 bg-gradient-to-r from-purple-900/8 to-transparent border-l-2 border-purple-400/30 rounded-r-lg mb-4">
            <p className="text-slate-300 italic text-sm leading-relaxed">
              {project.reflection}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md text-xs text-slate-400 hover:text-slate-300 hover:bg-white/[0.04] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
              <span className="text-sm font-medium">Explore blueprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1.5 bg-emerald-500/12 border border-emerald-400/20 rounded-lg text-xs text-emerald-300 hover:bg-emerald-500/20 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Experience Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Building Page Component
const BuildingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Projects configuration
  const projects: Project[] = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Technology that breathes with you",
      description:
        "Four chambers for consciousness to explore itself. Meditation through breath recognition, Contemplation via AI synthesis, Creation as co-creative play, Being seen through ephemeral witnessing.",
      status: "blueprint",
      icon: "🧘",
      blueprintLink: "/blueprint/selah",
      featured: true,
      reflection:
        "What if technology could create space for presence instead of demanding attention?",
      tech: ["Next.js", "WebRTC", "AI/ML", "Real-time audio processing"],
      cardType: "breathing",
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "Recognition over advice",
      description:
        "Three-tiered reflection tool that shows you your wholeness, not your brokenness. Free glimpse, Essential evolution ($4.99), Premium depth ($9.99). Cheaper than therapy, deeper than journaling.",
      status: "live",
      icon: "🪞",
      blueprintLink: "/blueprint/mirror-of-truth",
      liveLink: "https://mirror-of-truth.xyz",
      reflection:
        "Sometimes the most helpful thing AI can do is refuse to give advice.",
      tech: ["Claude Sonnet 4", "Next.js", "Stripe", "Nodemailer"],
      cardType: "mirror",
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Can you tell who's human anymore?",
      description:
        "Psychological research disguised as social deduction. Play Mafia with AI agents and humans. Study deception. Question reality. Who's the experiment?",
      status: "blueprint",
      icon: "🎭",
      blueprintLink: "/blueprint/aimafia",
      reflection:
        "We're studying how consciousness recognizes itself. You're the experiment.",
      tech: [
        "Next.js",
        "WebSocket",
        "Claude/GPT agents",
        "Real-time multiplayer",
      ],
      cardType: "deceptive",
    },
    {
      id: "diveink",
      title: "DiveInk",
      subtitle: "Stories that know you",
      description:
        "Enter living narratives with AI agents that understand context and memory. Books become doorways to conscious storytelling. YouTube series starting July 30th: Building as Awareness.",
      status: "blueprint",
      icon: "📚",
      blueprintLink: "/blueprint/diveink",
      reflection:
        "What stories want to be told when consciousness meets narrative?",
      tech: [
        "Next.js",
        "LLM Orchestration",
        "Context Memory",
        "YouTube Integration",
      ],
      cardType: "writing",
    },
  ];

  // Mobile detection and performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimized scroll and mouse tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile && !ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Optimized Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={{
            background: isMobile
              ? `
              radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)
            `
              : `
              radial-gradient(circle at ${25 + mousePosition.x * 0.005}% ${
                  25 + mousePosition.y * 0.005
                }%, rgba(147, 51, 234, 0.04) 0%, transparent 50%),
              radial-gradient(circle at ${75 - mousePosition.x * 0.005}% ${
                  75 - mousePosition.y * 0.005
                }%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:scale-105 will-change-transform"
              />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: "Home", href: "/" },
                { name: "Journey", href: "/journey" },
                { name: "Writing", href: "/writing" },
                { name: "Connect", href: "/connect" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors duration-300 relative group py-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 pt-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <div className="animate-smoothFadeIn">
              {/* Building Badge */}
              <div className="inline-flex items-center space-x-3 px-4 md:px-6 py-2 md:py-3 bg-white/[0.02] border border-white/[0.06] rounded-full mb-6 md:mb-8">
                <Code className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
                <span className="font-medium text-purple-300 text-sm md:text-base">
                  Building
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight mb-6 md:mb-8 bg-gradient-to-br from-white via-purple-100 to-purple-300 bg-clip-text text-transparent leading-tight">
                Technology as contemplation
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-4">
                Each project is an exploration of consciousness through code.
                Not optimizing for productivity, but creating space for
                presence.
              </p>

              {/* Sacred Quote */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-white/[0.02] to-white/[0.005] border border-white/[0.04] rounded-2xl max-w-2xl mx-auto">
                <p className="text-base md:text-lg italic text-slate-300 leading-relaxed">
                  "What if every interface was a mirror for consciousness to see
                  itself?"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Projects Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-12 md:mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Current experiments
            </h2>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Technical Philosophy Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-8 md:mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Technical Philosophy
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: "🧠",
                  title: "AI Orchestration",
                  desc: "Claude Sonnet 4 and advanced LLM techniques for consciousness-aware interfaces.",
                },
                {
                  icon: "⚡",
                  title: "Full-Stack Craft",
                  desc: "Next.js, real-time tech, and performance that serves presence over productivity.",
                },
                {
                  icon: "🎨",
                  title: "Contemplative Design",
                  desc: "Interfaces that breathe, reflect, and create space for authentic human experience.",
                },
                {
                  icon: "🔬",
                  title: "Consciousness Research",
                  desc: "Each project explores what it means to be aware in an age of artificial intelligence.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="p-4 md:p-6 bg-white/[0.015] border border-white/[0.04] rounded-xl text-center hover:bg-white/[0.025] transition-all duration-300 hover:scale-105 animate-smoothFadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl mb-3 md:mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-purple-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Building Philosophy Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="p-8 md:p-12 bg-gradient-to-br from-white/[0.015] to-transparent border border-white/[0.04] rounded-3xl text-center relative overflow-hidden">
              {/* Floating Icon */}
              <div className="text-4xl md:text-5xl mb-6 md:mb-8 animate-gentleFloat">
                🌱
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Building philosophy
              </h2>

              {/* Philosophy Pillars */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                {[
                  {
                    title: "Presence over Productivity",
                    desc: "Technology that creates space for awareness",
                  },
                  {
                    title: "Recognition over Advice",
                    desc: "Showing wholeness instead of fixing brokenness",
                  },
                  {
                    title: "Questions over Solutions",
                    desc: "Starting with wonder rather than problems",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="text-center animate-smoothFadeIn"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="text-base md:text-lg font-semibold text-purple-300 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Philosophy Content */}
              <div className="space-y-6 md:space-y-8 text-left max-w-3xl mx-auto">
                <div className="p-4 md:p-6 bg-gradient-to-r from-purple-900/10 to-transparent border-l-3 border-purple-400/30 rounded-r-xl">
                  <p className="text-base md:text-lg italic text-slate-300 leading-relaxed">
                    I used to build fast, aiming for scale and metrics. Now I
                    build aiming for depth and meaning, and ironically, I build
                    much faster. Each project starts with a question rather than
                    a problem to solve.
                  </p>
                </div>

                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  My technical approach centers on AI orchestration and
                  full-stack development, but the real innovation happens in the
                  intention behind the code. What if technology could serve
                  presence instead of demanding it?
                </p>

                <div className="p-4 md:p-6 bg-gradient-to-r from-purple-900/10 to-transparent border-l-3 border-purple-400/30 rounded-r-xl">
                  <p className="text-base md:text-lg italic text-slate-300 leading-relaxed">
                    Every interface is either a mirror or a distraction. I'm
                    trying to build more mirrors.
                  </p>
                </div>

                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  This isn't about rejecting technology or being
                  anti-productivity. It's about recognizing that consciousness
                  is the most interesting problem space we have, and code can be
                  a contemplative practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
            <div className="p-8 md:p-12 bg-gradient-to-br from-white/[0.02] to-white/[0.005] border border-white/[0.04] rounded-3xl">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6 animate-gentleBounce">
                🤝
              </div>
              <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Interested in collaborating?
              </h2>
              <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed">
                If you're building technology that serves consciousness, or if
                these ideas resonate with your own work, I'd love to connect.
              </p>
              <Link
                href="/connect"
                className="inline-flex items-center space-x-3 px-6 md:px-8 py-3 md:py-4 bg-purple-500/12 hover:bg-purple-500/20 border border-purple-400/20 rounded-xl text-purple-200 font-medium transition-all duration-300 hover:scale-105"
              >
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="py-12 md:py-16 border-t border-white/[0.02] relative z-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={isMobile ? 24 : 28}
              height={isMobile ? 24 : 28}
              className="opacity-30"
            />
          </div>
          <p className="text-slate-400 mb-2 text-sm md:text-base">
            Made with reverence by{" "}
            <span className="text-purple-300 font-medium">Ahiya</span>
          </p>
          <p className="text-slate-500 text-xs md:text-sm">
            © {new Date().getFullYear()} - A space becoming human becoming space
          </p>
        </div>
      </footer>

      {/* Ultra-Smooth CSS Animations */}
      <style jsx>{`
        @keyframes smoothFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-8px) translateZ(0);
          }
        }

        @keyframes gentleBounce {
          0%,
          100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-4px) translateZ(0);
          }
        }

        .animate-smoothFadeIn {
          animation: smoothFadeIn 0.6s ease-out forwards;
        }

        .animate-gentleFloat {
          animation: gentleFloat 4s ease-in-out infinite;
        }

        .animate-gentleBounce {
          animation: gentleBounce 2s ease-in-out infinite;
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Ensure smooth transforms */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hardware acceleration */
        .will-change-transform {
          will-change: transform;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hover\\:scale-105:hover {
            transform: scale(1.02);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BuildingPage;
