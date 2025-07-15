"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Code,
  Sparkles,
  Eye,
  Heart,
  Zap,
} from "lucide-react";

const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    // Global mouse tracking for advanced interactions
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    accentColor: string;
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
      brandGradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
      textColor: "emerald-300",
      borderColor: "emerald-400/30",
      accentColor: "emerald",
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
      brandGradient: "from-purple-500/10 via-violet-500/5 to-indigo-500/10",
      textColor: "purple-300",
      borderColor: "purple-400/30",
      accentColor: "purple",
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
      brandGradient: "from-red-500/10 via-orange-500/5 to-amber-500/10",
      textColor: "red-300",
      borderColor: "red-400/30",
      accentColor: "red",
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
      brandGradient: "from-amber-500/10 via-orange-500/5 to-yellow-500/10",
      textColor: "amber-300",
      borderColor: "amber-400/30",
      accentColor: "amber",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-1 bg-[#0a0f1a] rounded-full"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Advanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5">
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
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-150"></div>
              </div>
              <span className="text-lg font-medium bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-500">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Journey", "Writing", "Connect"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span>{item}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Sophisticated Hero */}
      <section className="section-breathing pt-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-emerald-500/3"></div>
        <div className="container-content text-center relative z-10">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="flex items-center space-x-3 text-purple-300 relative z-10">
                <Code className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                <span className="font-medium text-lg">Building</span>
                <Sparkles className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
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
              <div className="absolute -top-4 -right-4 text-4xl opacity-70 hover:opacity-100 transition-opacity duration-500">
                🔥
              </div>
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Each project is an exploration of consciousness through code. Not
              optimizing for productivity, but creating space for{" "}
              <span className="text-purple-300 font-medium">presence</span>.
            </p>

            <div className="breathing-glass inline-block p-8 spacing-generous relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-emerald-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <p className="sacred-text text-xl relative z-10">
                "What if every interface was a mirror for consciousness to see
                itself?"
              </p>
              <div className="absolute -top-3 -left-3 text-2xl opacity-60 hover:opacity-100 transition-opacity duration-500">
                🥔
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project with Advanced Breathing */}
      {projects.find((p) => p.featured) && (
        <section className="section-breathing">
          <div className="container-content">
            {(() => {
              const featured = projects.find((p) => p.featured)!;
              return (
                <div className="text-center mb-16">
                  <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="flex items-center space-x-3 text-emerald-300 relative z-10">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="font-medium text-lg">
                        Featured Project
                      </span>
                      <Heart className="w-5 h-5 group-hover:text-pink-400 transition-colors duration-500" />
                    </div>
                  </div>

                  <Link href={featured.blueprintLink} className="block group">
                    <AdvancedBreathingCard>
                      <div className="text-6xl md:text-8xl mb-12 relative">
                        <span>{featured.icon}</span>
                        <div className="absolute inset-0 blur-2xl opacity-20 scale-150">
                          {featured.icon}
                        </div>
                      </div>

                      <h2 className="heading-xl spacing-comfortable group-hover:text-emerald-200 transition-colors duration-500">
                        {featured.title}
                      </h2>
                      <p className="body-lg text-slate-400 spacing-comfortable">
                        {featured.subtitle}
                      </p>

                      <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-3xl mx-auto">
                        {featured.description}
                      </p>

                      <div className="sacred-quote bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-l-emerald-400/50">
                        {featured.reflection}
                      </div>

                      {featured.tech && (
                        <div className="spacing-comfortable">
                          <h3 className="text-sm font-medium text-emerald-300 mb-4 flex items-center space-x-2">
                            <Code className="w-4 h-4" />
                            <span>Technical approach</span>
                          </h3>
                          <div className="flex flex-wrap justify-center gap-3">
                            {featured.tech.map((tech, index) => (
                              <span
                                key={tech}
                                className="breathing-glass px-4 py-2 text-sm text-slate-300 hover:bg-emerald-500/10 transition-all duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                        <div className="flex items-center space-x-3 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-500">
                          <Eye className="w-6 h-6" />
                          <span className="text-lg font-medium">
                            Explore the blueprint
                          </span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                        </div>

                        {featured.liveLink && (
                          <a
                            href={featured.liveLink}
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
                    </AdvancedBreathingCard>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Advanced Projects Grid */}
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
                  <AdvancedProjectCard
                    project={project}
                    isHovered={hoveredProject === project.id}
                    mousePosition={mousePosition}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sophisticated Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/3 to-emerald-500/5 opacity-50"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-12 relative">
                <span className="animate-float">🌱</span>
                <div className="absolute top-0 left-0 text-6xl blur-xl opacity-20 animate-pulse">
                  🔥
                </div>
              </div>

              <h2 className="heading-xl spacing-comfortable bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-transparent">
                Building philosophy
              </h2>

              <div className="space-y-8 text-left max-w-2xl mx-auto">
                <p className="body-lg text-slate-300 leading-relaxed">
                  I used to build fast, aiming for scale and metrics. Now I
                  build aiming for{" "}
                  <span className="text-purple-300 font-medium">
                    depth and meaning
                  </span>
                  , and ironically, I build much faster. Each project starts
                  with a question rather than a problem to solve.
                </p>

                <p className="body-lg text-slate-300 leading-relaxed">
                  My technical approach centers on AI orchestration and
                  full-stack development, but the real innovation happens in the{" "}
                  <span className="text-emerald-300 font-medium">
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
                  <span className="text-pink-300 font-medium">
                    consciousness is the most interesting problem space we have
                  </span>
                  , and code can be a contemplative practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Connect */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-8 relative">
                <span className="animate-float">🤝</span>
                <div className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700">
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
                className="gentle-button text-lg px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-500 group/btn inline-flex items-center"
              >
                <span>Let's talk</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover/btn:rotate-180 transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Footer */}
      <footer className="py-16 border-t border-white/10 bg-gradient-to-r from-purple-500/2 to-emerald-500/2">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-500"
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

// Advanced Breathing Card Component for Selah
const AdvancedBreathingCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breathState, setBreathState] = useState({ scale: 1, opacity: 1 });
  const animationRef = useRef<number>();

  const breathingAnimation = useCallback(() => {
    const time = Date.now() / 4000; // 8 second breathing cycle (4 in, 4 out)
    const breathPhase = Math.sin(time);

    // More natural breathing curve with ease-in-out
    const normalizedPhase = (breathPhase + 1) / 2; // Normalize to 0-1
    const easedPhase =
      normalizedPhase < 0.5
        ? 2 * normalizedPhase * normalizedPhase
        : 1 - Math.pow(-2 * normalizedPhase + 2, 2) / 2;

    const scale = 1 + easedPhase * 0.02; // Very subtle scale change
    const opacity = 0.95 + easedPhase * 0.05; // Subtle opacity change

    setBreathState({ scale, opacity });
    animationRef.current = requestAnimationFrame(breathingAnimation);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(breathingAnimation);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [breathingAnimation]);

  return (
    <div
      className="contemplative-card p-8 md:p-16 max-w-5xl mx-auto group-hover:bg-white/[0.08] transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10"
      style={{
        transform: `scale(${breathState.scale})`,
        opacity: breathState.opacity,
        transition: "background-color 0.7s ease, box-shadow 0.7s ease",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Advanced Project Card Component
const AdvancedProjectCard: React.FC<{
  project: any;
  isHovered: boolean;
  mousePosition: { x: number; y: number };
}> = ({ project, isHovered, mousePosition }) => {
  const [aiMafiaText, setAiMafiaText] = useState("humans");
  const [diveInkText, setDiveInkText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [mirrorOffset, setMirrorOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const fullDiveInkText =
    "Enter living narratives with AI agents that understand context and character. Books become doorways to interactive story-worlds...";

  // AI Mafia deceptive text switching
  useEffect(() => {
    if (project.id === "aimafia") {
      const interval = setInterval(() => {
        setAiMafiaText((prev) => (prev === "humans" ? "AI agents" : "humans"));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [project.id]);

  // DiveInk typewriter effect
  useEffect(() => {
    if (project.id === "diveink" && isHovered) {
      setTypewriterIndex(0);
      setDiveInkText("");

      const interval = setInterval(() => {
        setTypewriterIndex((prev) => {
          if (prev < fullDiveInkText.length) {
            setDiveInkText(fullDiveInkText.slice(0, prev + 1));
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 30);
      return () => clearInterval(interval);
    } else if (project.id === "diveink" && !isHovered) {
      setDiveInkText("");
      setTypewriterIndex(0);
    }
  }, [project.id, isHovered, fullDiveInkText]);

  // Mirror of Truth reflection effect
  useEffect(() => {
    if (project.id === "mirror" && isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (mousePosition.x - centerX) / 50;
      const offsetY = (mousePosition.y - centerY) / 50;

      setMirrorOffset({ x: offsetX, y: offsetY });
    } else {
      setMirrorOffset({ x: 0, y: 0 });
    }
  }, [project.id, isHovered, mousePosition]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "text-emerald-300";
      case "development":
        return "text-amber-300";
      default:
        return "text-purple-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "● Live";
      case "development":
        return "● Development";
      default:
        return "● Blueprint";
    }
  };

  const getProjectDescription = () => {
    if (project.id === "aimafia") {
      return project.description.replace(/humans/g, aiMafiaText);
    }
    if (project.id === "diveink" && diveInkText) {
      return (
        diveInkText + (typewriterIndex < fullDiveInkText.length ? "|" : "")
      );
    }
    return project.description;
  };

  // Selah Breathing Effect
  if (project.id === "selah") {
    return (
      <AdvancedSelahCard
        project={project}
        isHovered={isHovered}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        getProjectDescription={getProjectDescription}
      />
    );
  }

  // Mirror of Truth Glass Effect
  if (project.id === "mirror") {
    return (
      <div
        ref={cardRef}
        className={`relative h-full transition-all duration-700 ${
          isHovered
            ? "backdrop-blur-xl bg-white/[0.15] shadow-2xl border border-white/30"
            : "contemplative-card group-hover:bg-white/[0.06]"
        } bg-gradient-to-br ${project.brandGradient}`}
        style={{
          transform: isHovered
            ? `translate(${mirrorOffset.x}px, ${mirrorOffset.y}px) scale(1.02)`
            : "scale(1)",
          backdropFilter: isHovered ? "blur(20px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: isHovered
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
        }}
      >
        <div className="p-6 md:p-8 h-full relative">
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
          )}
          <div className="relative z-10">
            <ProjectCardContent
              project={project}
              isHovered={isHovered}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              getProjectDescription={getProjectDescription}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default cards for AI Mafia and DiveInk
  return (
    <div
      className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-500 bg-gradient-to-br ${project.brandGradient} relative overflow-hidden`}
    >
      <div className="relative z-10">
        <ProjectCardContent
          project={project}
          isHovered={isHovered}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          getProjectDescription={getProjectDescription}
        />
      </div>
    </div>
  );
};

// Advanced Selah Breathing Card
const AdvancedSelahCard: React.FC<{
  project: any;
  isHovered: boolean;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  getProjectDescription: () => string;
}> = ({
  project,
  isHovered,
  getStatusColor,
  getStatusText,
  getProjectDescription,
}) => {
  const [breathState, setBreathState] = useState({
    scale: 1,
    opacity: 1,
    blur: 0,
  });
  const animationRef = useRef<number>();

  const breathingAnimation = useCallback(() => {
    const time = Date.now() / 4000; // 8 second breathing cycle
    const breathPhase = Math.sin(time);

    // Natural breathing curve
    const normalizedPhase = (breathPhase + 1) / 2;
    const easedPhase =
      normalizedPhase < 0.5
        ? 2 * normalizedPhase * normalizedPhase
        : 1 - Math.pow(-2 * normalizedPhase + 2, 2) / 2;

    const scale = 1 + easedPhase * 0.015;
    const opacity = 0.96 + easedPhase * 0.04;
    const blur = easedPhase * 0.5;

    setBreathState({ scale, opacity, blur });
    animationRef.current = requestAnimationFrame(breathingAnimation);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(breathingAnimation);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [breathingAnimation]);

  return (
    <div
      className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-700 bg-gradient-to-br ${project.brandGradient} relative overflow-hidden`}
      style={{
        transform: `scale(${breathState.scale})`,
        opacity: breathState.opacity,
        filter: `blur(${breathState.blur}px)`,
        transition: "background-color 0.7s ease",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-50 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div className="relative z-10">
        <ProjectCardContent
          project={project}
          isHovered={isHovered}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          getProjectDescription={getProjectDescription}
        />
      </div>
    </div>
  );
};

// Shared Project Card Content
const ProjectCardContent: React.FC<{
  project: any;
  isHovered: boolean;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  getProjectDescription: () => string;
}> = ({
  project,
  isHovered,
  getStatusColor,
  getStatusText,
  getProjectDescription,
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div
            className={`text-4xl transition-all duration-500 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            {project.icon}
          </div>
          <div>
            <h3
              className={`heading-lg group-hover:text-${project.textColor} transition-colors duration-500`}
            >
              {project.title}
            </h3>
            <p className="text-slate-400 transition-colors duration-300">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="breathing-glass px-4 py-2 text-sm backdrop-blur-sm">
          <span className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </span>
        </div>
      </div>

      <p className="text-slate-300 spacing-comfortable leading-relaxed transition-all duration-300">
        {getProjectDescription()}
      </p>

      <div
        className={`sacred-quote text-sm border-l-4 border-${project.borderColor} bg-gradient-to-r ${project.brandGradient} transition-all duration-500`}
      >
        {project.reflection}
      </div>

      {project.tech && (
        <div className="spacing-comfortable">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, index: number) => (
              <span
                key={tech}
                className="breathing-glass px-3 py-1 text-xs text-slate-400 hover:bg-white/10 transition-all duration-500"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <div
          className={`flex items-center space-x-2 text-${project.textColor} transition-all duration-500 group-hover:translate-x-1`}
        >
          <Eye className="w-5 h-5" />
          <span className="text-sm font-medium">Explore blueprint</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
        </div>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`gentle-button text-sm px-4 py-2 flex items-center space-x-2 opacity-90 hover:opacity-100 self-start transition-all duration-500 bg-gradient-to-r ${project.brandGradient} hover:scale-105`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live</span>
          </a>
        )}
      </div>
    </>
  );
};

export default BuildingPage;
