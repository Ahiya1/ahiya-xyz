"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code, Sparkles, Eye } from "lucide-react";

// Custom Hooks for Sophisticated Behaviors

// Hook for autonomous breathing animation
const useBreathing = () => {
  const [breathState, setBreathState] = useState({
    scale: 1,
    opacity: 1,
    translateY: 0,
  });

  useEffect(() => {
    let animationId: number;

    const breathingCycle = () => {
      const now = Date.now();
      const cycleTime = 11000; // 11 second full cycle
      const progress = (now % cycleTime) / cycleTime;

      let phase: "inhale" | "hold" | "exhale" | "pause";
      let phaseProgress: number;

      if (progress < 0.36) {
        // 4s inhale
        phase = "inhale";
        phaseProgress = progress / 0.36;
      } else if (progress < 0.45) {
        // 1s hold
        phase = "hold";
        phaseProgress = (progress - 0.36) / 0.09;
      } else if (progress < 0.91) {
        // 6s exhale
        phase = "exhale";
        phaseProgress = (progress - 0.45) / 0.46;
      } else {
        // 1s pause
        phase = "pause";
        phaseProgress = (progress - 0.91) / 0.09;
      }

      let scale: number, opacity: number, translateY: number;

      switch (phase) {
        case "inhale":
          const inhaleEase = 1 - Math.pow(1 - phaseProgress, 3);
          scale = 1 + inhaleEase * 0.025;
          opacity = 0.7 + inhaleEase * 0.3;
          translateY = -inhaleEase * 2;
          break;
        case "hold":
          scale = 1.025;
          opacity = 1;
          translateY = -2;
          break;
        case "exhale":
          const exhaleEase = Math.pow(phaseProgress, 2);
          scale = 1.025 - exhaleEase * 0.025;
          opacity = 1 - exhaleEase * 0.3;
          translateY = -2 + exhaleEase * 2;
          break;
        case "pause":
          scale = 1;
          opacity = 0.7;
          translateY = 0;
          break;
      }

      setBreathState({ scale, opacity, translateY });
      animationId = requestAnimationFrame(breathingCycle);
    };

    animationId = requestAnimationFrame(breathingCycle);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return breathState;
};

// Hook for glassmorphism reflection effect
const useGlassmorphism = (isHovered: boolean) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glassState, setGlassState] = useState({
    backdrop: "blur(10px)",
    background: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    transform: "translateZ(0)",
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("mousemove", updateMousePosition);
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }
  }, [isHovered, updateMousePosition]);

  useEffect(() => {
    if (isHovered) {
      const intensity = 1;
      const backdrop = `blur(${20}px)`;
      const background = "rgba(255, 255, 255, 0.15)";
      const border = "rgba(255, 255, 255, 0.25)";
      const shadow = `
        0 8px 32px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      `;
      const reflectionX = (mousePosition.x / window.innerWidth - 0.5) * 10;
      const reflectionY = (mousePosition.y / window.innerHeight - 0.5) * 10;
      const transform = `perspective(1000px) rotateY(${reflectionX}deg) rotateX(${-reflectionY}deg) translateZ(10px)`;

      setGlassState({ backdrop, background, border, shadow, transform });
    } else {
      setGlassState({
        backdrop: "blur(10px)",
        background: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        transform: "translateZ(0)",
      });
    }
  }, [isHovered, mousePosition]);

  return glassState;
};

// Hook for deceptive text switching
const useDeceptiveText = () => {
  const [deceptions, setDeceptions] = useState({
    primary: "humans",
    secondary: "social deduction game",
    tertiary: "consciousness",
  });

  useEffect(() => {
    const primaryInterval = setInterval(() => {
      setDeceptions((prev) => ({
        ...prev,
        primary: prev.primary === "humans" ? "AI agents" : "humans",
      }));
    }, 2300);

    const secondaryInterval = setInterval(() => {
      setDeceptions((prev) => ({
        ...prev,
        secondary:
          prev.secondary === "social deduction game"
            ? "psychological experiment"
            : "social deduction game",
      }));
    }, 3700);

    const tertiaryInterval = setInterval(() => {
      setDeceptions((prev) => ({
        ...prev,
        tertiary:
          prev.tertiary === "consciousness"
            ? "artificial intelligence"
            : "consciousness",
      }));
    }, 5100);

    return () => {
      clearInterval(primaryInterval);
      clearInterval(secondaryInterval);
      clearInterval(tertiaryInterval);
    };
  }, []);

  return deceptions;
};

// Hook for sophisticated typewriter effect
const useTypewriter = (isHovered: boolean) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Enter living narratives with AI agents that understand context and character.",
    "Books become doorways to interactive story-worlds.",
    "YouTube series 'Building as Awareness (with LLMs)' begins July 30th.",
    "Details remain mysterious...",
  ];

  useEffect(() => {
    let typewriterTimeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;

    if (isHovered && currentIndex < texts.length) {
      const currentText = texts[currentIndex];

      if (!isDeleting && displayText.length < currentText.length) {
        typewriterTimeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, Math.random() * 40 + 30); // Variable typing speed
      } else if (!isDeleting && displayText.length === currentText.length) {
        typewriterTimeout = setTimeout(() => {
          if (currentIndex < texts.length - 1) {
            setIsDeleting(true);
          }
        }, 1500);
      } else if (isDeleting && displayText.length > 0) {
        typewriterTimeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (!isHovered) {
      setDisplayText("");
      setCurrentIndex(0);
      setIsDeleting(false);
    }

    // Cursor blinking
    cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearTimeout(typewriterTimeout);
      clearInterval(cursorInterval);
    };
  }, [isHovered, displayText, currentIndex, isDeleting, texts]);

  return { displayText, showCursor };
};

// Main Component
const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    tech?: string[];
    brandGradient: string;
    textColor: string;
    borderColor: string;
  }

  const projects: Project[] = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Technology that breathes with you",
      description:
        "Four chambers where consciousness explores itself. Meditation through breath recognition, contemplation via AI synthesis, creation as co-creative play, and being seen through ephemeral witnessing. Experience the breathing demo in the blueprint.",
      status: "blueprint",
      icon: "🧘",
      blueprintLink: "/blueprint/selah",
      featured: true,
      reflection:
        "What if technology could create space for presence instead of demanding attention?",
      tech: ["Next.js", "WebRTC", "AI/ML", "Real-time audio"],
      brandGradient: "from-emerald-500/10 to-teal-500/10",
      textColor: "emerald-300",
      borderColor: "emerald-400/30",
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "Recognition over advice",
      description:
        "Three-tiered reflection tool that shows you your wholeness, not your brokenness. Free glimpse, Essential evolution tracking, Premium depth sessions. Cheaper than therapy, deeper than journaling. Only requires brutal honesty.",
      status: "live",
      icon: "🪞",
      blueprintLink: "/blueprint/mirror-of-truth",
      liveLink: "https://mirror-of-truth.xyz",
      reflection:
        "Sometimes the most helpful thing AI can do is refuse to give advice.",
      tech: ["Claude Sonnet 4", "Next.js", "PayPal", "Redis"],
      brandGradient: "from-purple-500/10 to-violet-500/10",
      textColor: "purple-300",
      borderColor: "purple-400/30",
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Can you tell who's human anymore?",
      description:
        "A psychological experiment disguised as a social deduction game. Play Mafia with AI agents and humans. Study deception, question reality, explore how consciousness recognizes itself. The research happens while you play.",
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
      brandGradient: "from-red-500/10 to-orange-500/10",
      textColor: "red-300",
      borderColor: "red-400/30",
    },
    {
      id: "diveink",
      title: "DiveInk",
      subtitle: "Stories that know you",
      description:
        "Enter living narratives with AI agents that understand context and character. Books become doorways to interactive story-worlds. YouTube series 'Building as Awareness (with LLMs)' begins July 30th. Details remain mysterious.",
      status: "blueprint",
      icon: "📚",
      blueprintLink: "/blueprint/diveink",
      reflection:
        "What if stories could remember who you are and grow with you?",
      tech: [
        "Next.js",
        "LLM orchestration",
        "Dynamic storytelling",
        "Context persistence",
      ],
      brandGradient: "from-amber-500/10 to-yellow-500/10",
      textColor: "amber-300",
      borderColor: "amber-400/30",
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
      {/* Navigation with subtle futuristic elements */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={28}
                  height={28}
                  className="transition-all duration-500 group-hover:scale-110"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-150"></div>
              </div>
              <span className="text-lg font-medium text-gentle group-hover:text-purple-200 transition-colors duration-300">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Journey", "Writing", "Connect"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with enhanced sophistication */}
      <section className="section-breathing pt-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-emerald-500/3"></div>

        <div className="container-content text-center relative z-10">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="flex items-center space-x-3 text-purple-300 relative z-10">
                <Code className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                <span className="font-medium text-lg">Building</span>
                <Sparkles className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <h1 className="display-lg spacing-generous relative">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Technology as
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                contemplation
              </span>
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Each project is an exploration of consciousness through code. Not
              optimizing for productivity, but creating space for{" "}
              <span className="text-purple-300 font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                presence
              </span>
              .
            </p>

            <div className="breathing-glass inline-block p-8 spacing-generous relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <p className="sacred-text text-xl relative z-10 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                "What if every interface was a mirror for consciousness to see
                itself?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project with autonomous breathing */}
      {projects.find((p) => p.featured) && (
        <section className="section-breathing">
          <div className="container-content">
            {(() => {
              const featured = projects.find((p) => p.featured)!;
              return (
                <div className="text-center mb-16">
                  <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="flex items-center space-x-3 text-emerald-300 relative z-10">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="font-medium text-lg">
                        Featured Project
                      </span>
                    </div>
                  </div>

                  <Link href={featured.blueprintLink} className="block group">
                    <BreathingSelahCard project={featured} />
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Projects with specialized behaviors */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Current experiments
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.blueprintLink} className="block group">
                  {project.id === "selah" && (
                    <BreathingSelahCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                    />
                  )}
                  {project.id === "mirror" && (
                    <GlassMirrorCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                    />
                  )}
                  {project.id === "aimafia" && (
                    <DeceptiveAIMafiaCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                    />
                  )}
                  {project.id === "diveink" && (
                    <TypewriterDiveInkCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy with enhanced elegance */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/3 to-emerald-500/5"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-12 relative">
                <span className="animate-float">🌱</span>
                <div className="absolute top-0 left-0 text-6xl blur-2xl opacity-20 animate-pulse">
                  ✨
                </div>
              </div>

              <h2 className="heading-xl spacing-comfortable bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-transparent">
                Building philosophy
              </h2>

              <div className="space-y-8 text-left max-w-2xl mx-auto">
                <p className="body-lg text-slate-300 leading-relaxed">
                  I used to build fast, aiming for scale and metrics. Now I
                  build aiming for{" "}
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
                    depth and meaning
                  </span>
                  , and ironically, I build much faster. Each project starts
                  with a question rather than a problem to solve.
                </p>

                <p className="body-lg text-slate-300 leading-relaxed">
                  My technical approach centers on AI orchestration and
                  full-stack development, but the real innovation happens in the{" "}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent font-medium">
                    intention behind the code
                  </span>
                  . What if technology could serve presence instead of demanding
                  it?
                </p>

                <div className="sacred-quote bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-emerald-500/15 border-l-purple-400/50">
                  Every interface is either a mirror or a distraction. I'm
                  trying to build more mirrors.
                </div>

                <p className="body-lg text-slate-300 leading-relaxed">
                  This isn't about rejecting technology or being
                  anti-productivity. It's about recognizing that{" "}
                  <span className="bg-gradient-to-r from-pink-300 to-emerald-300 bg-clip-text text-transparent font-medium">
                    consciousness is the most interesting problem space we have
                  </span>
                  , and code can be a contemplative practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with sophisticated interaction */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-8 relative">
                <span className="animate-float">🤝</span>
                <div className="absolute inset-0 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                  💫
                </div>
              </div>

              <h2 className="heading-xl spacing-comfortable bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Interested in collaborating?
              </h2>

              <p className="body-lg text-slate-300 spacing-comfortable max-w-xl mx-auto">
                If you're building technology that serves consciousness, or if
                these ideas resonate with your own work, I'd love to connect.
              </p>

              <Link
                href="/connect"
                className="gentle-button text-lg px-8 py-4 group/btn inline-flex items-center transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Let's talk</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover/btn:rotate-12 transition-transform duration-300 relative z-10" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with subtle enhancement */}
      <footer className="py-16 border-t border-white/10 bg-gradient-to-r from-purple-500/2 to-emerald-500/2">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-500"
              style={{
                filter: "drop-shadow(0 5px 15px rgba(168, 85, 247, 0.3))",
              }}
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by{" "}
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
              Ahiya
            </span>
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} - A space becoming human becoming space
          </p>
        </div>
      </footer>
    </div>
  );
};

// Specialized Card Components

// Breathing Selah Card with autonomous breathing
const BreathingSelahCard: React.FC<{
  project: any;
  isHovered?: boolean;
}> = ({ project, isHovered = false }) => {
  const breathState = useBreathing();

  return (
    <div
      className="contemplative-card p-8 md:p-12 max-w-4xl mx-auto group-hover:bg-white/[0.06] transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-emerald-500/5 to-teal-500/5"
      style={{
        transform: `scale(${breathState.scale}) translateY(${breathState.translateY}px)`,
        opacity: breathState.opacity,
        transition: "background 0.7s ease, box-shadow 0.7s ease",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="text-6xl md:text-8xl mb-12 animate-float text-center">
          {project.icon}
        </div>

        <h2 className="heading-xl spacing-comfortable group-hover:text-emerald-200 transition-colors text-center">
          {project.title}
        </h2>
        <p className="body-lg text-slate-400 spacing-comfortable text-center">
          {project.subtitle}
        </p>

        <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-2xl mx-auto text-center">
          {project.description}
        </p>

        <div className="sacred-quote bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-l-emerald-400/50">
          {project.reflection}
        </div>

        {project.tech && (
          <div className="spacing-comfortable">
            <h3 className="text-sm font-medium text-emerald-300 mb-3 text-center flex items-center justify-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Technical approach</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tech.map((tech: string, index: number) => (
                <span
                  key={tech}
                  className="breathing-glass px-4 py-2 text-sm text-slate-300 group-hover:bg-emerald-500/10 transition-all duration-700"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: breathState.opacity,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <div className="flex items-center space-x-3 text-emerald-300 group-hover:text-emerald-200 transition-colors">
            <Eye className="w-6 h-6" />
            <span className="text-lg font-medium">Explore the blueprint</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="gentle-button text-lg px-8 py-4 flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-500"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Experience Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Glass Mirror Card with sophisticated glassmorphism
const GlassMirrorCard: React.FC<{
  project: any;
  isHovered: boolean;
}> = ({ project, isHovered }) => {
  const glassState = useGlassmorphism(isHovered);

  return (
    <div
      className="p-6 md:p-8 h-full transition-all duration-700 relative overflow-hidden"
      style={{
        background: glassState.background,
        backdropFilter: glassState.backdrop,
        border: `1px solid ${glassState.border}`,
        borderRadius: "16px",
        boxShadow: glassState.shadow,
        transform: glassState.transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glass reflection overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)"
            : "transparent",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Inner glass surface */}
      <div
        className="absolute inset-1 rounded-xl opacity-0 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl relative">
              {project.icon}
              {isHovered && (
                <div
                  className="absolute inset-0 blur-sm opacity-60"
                  style={{ transform: "scaleX(-1)" }}
                >
                  {project.icon}
                </div>
              )}
            </div>
            <div>
              <h3 className="heading-lg group-hover:text-purple-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400">{project.subtitle}</p>
            </div>
          </div>

          <div className="breathing-glass px-3 py-1 text-xs">
            <span className="text-emerald-300">● Live</span>
          </div>
        </div>

        <p className="text-slate-300 spacing-comfortable leading-relaxed">
          {project.description}
        </p>

        <div className="sacred-quote text-sm border-l-purple-400/50 bg-gradient-to-r from-purple-500/10 to-violet-500/10">
          {project.reflection}
        </div>

        {project.tech && (
          <div className="spacing-comfortable">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="breathing-glass px-2 py-1 text-xs text-slate-400"
                  style={{
                    background: isHovered
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.05)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
            <Eye className="w-5 h-5" />
            <span className="text-sm">Explore blueprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="gentle-button text-xs px-3 py-1 flex items-center space-x-1 opacity-80 hover:opacity-100 self-start"
            style={{
              background: isHovered
                ? "rgba(168, 85, 247, 0.3)"
                : "rgba(168, 85, 247, 0.2)",
            }}
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Deceptive AI Mafia Card with text switching
const DeceptiveAIMafiaCard: React.FC<{
  project: any;
  isHovered: boolean;
}> = ({ project, isHovered }) => {
  const deceptions = useDeceptiveText();
  const [glitchState, setGlitchState] = useState({
    isGlitching: false,
    element: "",
  });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every interval
        const elements = ["title", "subtitle", "description"];
        const randomElement =
          elements[Math.floor(Math.random() * elements.length)];
        setGlitchState({ isGlitching: true, element: randomElement });

        setTimeout(() => {
          setGlitchState({ isGlitching: false, element: "" });
        }, 150);
      }
    }, 800);

    return () => clearInterval(glitchInterval);
  }, []);

  const getDeceptiveDescription = () => {
    return project.description
      .replace(/humans/g, deceptions.primary)
      .replace(/social deduction game/g, deceptions.secondary)
      .replace(/consciousness/g, deceptions.tertiary);
  };

  const getDeceptiveSubtitle = () => {
    if (deceptions.primary === "AI agents") {
      return "Can you tell what's real anymore?";
    }
    return project.subtitle;
  };

  return (
    <div className="contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300 bg-gradient-to-br from-red-500/5 to-orange-500/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl relative">
            <span
              className={
                glitchState.isGlitching && glitchState.element === "title"
                  ? "animate-pulse"
                  : ""
              }
            >
              {project.icon}
            </span>
          </div>
          <div>
            <h3
              className={`heading-lg group-hover:text-red-200 transition-colors ${
                glitchState.isGlitching && glitchState.element === "title"
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`text-slate-400 transition-all duration-300 ${
                glitchState.isGlitching && glitchState.element === "subtitle"
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {getDeceptiveSubtitle()}
            </p>
          </div>
        </div>

        <div className="breathing-glass px-3 py-1 text-xs">
          <span className="text-purple-300">● Blueprint</span>
        </div>
      </div>

      <p
        className={`text-slate-300 spacing-comfortable leading-relaxed transition-all duration-300 ${
          glitchState.isGlitching && glitchState.element === "description"
            ? "animate-pulse"
            : ""
        }`}
      >
        {getDeceptiveDescription()}
      </p>

      <div className="sacred-quote text-sm border-l-red-400/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        {project.reflection}
      </div>

      {project.tech && (
        <div className="spacing-comfortable">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="breathing-glass px-2 py-1 text-xs text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <div className="flex items-center space-x-2 text-red-300 group-hover:text-red-200 transition-colors">
          <Eye className="w-5 h-5" />
          <span className="text-sm">Explore blueprint</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

// Typewriter DiveInk Card with sophisticated typing effects
const TypewriterDiveInkCard: React.FC<{
  project: any;
  isHovered: boolean;
}> = ({ project, isHovered }) => {
  const { displayText, showCursor } = useTypewriter(isHovered);

  return (
    <div className="contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 relative overflow-hidden">
      {/* Book-like texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(90deg, rgba(139, 69, 19, 0.1) 0%, transparent 2%, transparent 98%, rgba(139, 69, 19, 0.1) 100%),
          linear-gradient(0deg, rgba(160, 82, 45, 0.05) 0%, transparent 10%, transparent 90%, rgba(160, 82, 45, 0.05) 100%)
        `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl transform hover:scale-110 transition-transform duration-300">
              {project.icon}
            </div>
            <div>
              <h3 className="heading-lg group-hover:text-amber-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400">{project.subtitle}</p>
            </div>
          </div>

          <div className="breathing-glass px-3 py-1 text-xs">
            <span className="text-purple-300">● Blueprint</span>
          </div>
        </div>

        <div className="text-slate-300 spacing-comfortable leading-relaxed min-h-[120px]">
          {isHovered && displayText ? (
            <span className="font-mono">
              {displayText}
              <span
                className={`${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity duration-100`}
              >
                |
              </span>
            </span>
          ) : (
            <span>{project.description}</span>
          )}
        </div>

        <div className="sacred-quote text-sm border-l-amber-400/50 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
          {project.reflection}
        </div>

        {project.tech && (
          <div className="spacing-comfortable">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="breathing-glass px-2 py-1 text-xs text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="flex items-center space-x-2 text-amber-300 group-hover:text-amber-200 transition-colors">
            <Eye className="w-5 h-5" />
            <span className="text-sm">Explore blueprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
