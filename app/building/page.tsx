"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Code,
  Sparkles,
  Zap,
  Eye,
  Heart,
} from "lucide-react";

const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Mouse tracking for 3D effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Subtle glitch effect for AI Mafia every 8 seconds
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
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
    accentColor: string;
    depth: string;
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
      brandGradient: "from-[#00D4FF] via-[#8B5CF6] to-[#E879F9]",
      accentColor: "emerald",
      depth:
        "0 20px 40px rgba(0, 212, 255, 0.15), 0 35px 70px rgba(139, 92, 246, 0.1), 0 50px 100px rgba(232, 121, 249, 0.05)",
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
      brandGradient: "from-[#8B5CF6] via-[#E879F9] to-[#F472B6]",
      accentColor: "purple",
      depth:
        "0 20px 40px rgba(139, 92, 246, 0.15), 0 35px 70px rgba(232, 121, 249, 0.1), 0 50px 100px rgba(244, 114, 182, 0.05)",
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
      brandGradient: "from-[#FF6B6B] via-[#E879F9] to-[#8B5CF6]",
      accentColor: "red",
      depth:
        "0 20px 40px rgba(255, 107, 107, 0.15), 0 35px 70px rgba(232, 121, 249, 0.1), 0 50px 100px rgba(139, 92, 246, 0.05)",
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
      brandGradient: "from-[#F59E0B] via-[#E879F9] to-[#00D4FF]",
      accentColor: "amber",
      depth:
        "0 20px 40px rgba(245, 158, 11, 0.15), 0 35px 70px rgba(232, 121, 249, 0.1), 0 50px 100px rgba(0, 212, 255, 0.05)",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div
          className="w-12 h-12 relative"
          style={{
            transform: "perspective(200px) rotateX(45deg) rotateY(45deg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-[#0a0f1a] rounded-full"></div>
        </div>
      </div>
    );
  }

  const calculateTilt = (
    element: HTMLElement | null,
    clientX: number,
    clientY: number
  ) => {
    if (!element) return { rotateX: 0, rotateY: 0 };
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (clientY - centerY) / 20;
    const rotateY = (centerX - clientX) / 20;
    return {
      rotateX: Math.max(-15, Math.min(15, rotateX)),
      rotateY: Math.max(-15, Math.min(15, rotateY)),
    };
  };

  return (
    <div
      className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      {/* 3D Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-3 h-3 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full opacity-60"
          style={{
            top: "20%",
            left: "15%",
            transform: "translateZ(100px) rotateX(45deg)",
            animation: "float3d 8s ease-in-out infinite",
            boxShadow: "0 10px 20px rgba(0, 212, 255, 0.3)",
          }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-gradient-to-r from-[#E879F9] to-[#F472B6] rounded-full opacity-50"
          style={{
            top: "60%",
            right: "20%",
            transform: "translateZ(150px) rotateY(60deg)",
            animation: "float3d 12s ease-in-out infinite reverse",
            animationDelay: "2s",
            boxShadow: "0 15px 30px rgba(232, 121, 249, 0.4)",
          }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-gradient-to-r from-[#8B5CF6] to-[#00D4FF] rounded-full opacity-40"
          style={{
            bottom: "30%",
            left: "70%",
            transform: "translateZ(80px) rotateX(-30deg)",
            animation: "float3d 10s ease-in-out infinite",
            animationDelay: "4s",
            boxShadow: "0 12px 25px rgba(139, 92, 246, 0.3)",
          }}
        ></div>
      </div>

      {/* Navigation with 3D depth */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/10"
        style={{ transform: "translateZ(200px)" }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className="relative"
                style={{ transform: "perspective(200px) rotateY(20deg)" }}
              >
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={28}
                  height={28}
                  className="transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]"
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(139, 92, 246, 0.4))",
                    transform: "translateZ(20px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
              <span
                className="text-lg font-medium bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
                style={{
                  textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                  transform: "translateZ(10px)",
                }}
              >
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Journey", "Writing", "Connect"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition-all duration-500 relative group"
                  style={{
                    transform: `translateZ(${10 + index * 5}px)`,
                    textShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span className="group-hover:scale-110 inline-block transition-transform duration-300">
                    {item}
                  </span>
                  <div
                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#00D4FF] to-[#F472B6] group-hover:w-full transition-all duration-500"
                    style={{ transform: "translateZ(5px)" }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with 3D Typography */}
      <section
        className="section-breathing pt-32 relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#F472B6]/5"
          style={{ transform: "translateZ(-50px)" }}
        ></div>
        <div className="container-content text-center relative z-10">
          <div className="animate-fade-in">
            <div
              className="breathing-glass inline-block px-8 py-4 mb-12 relative group"
              style={{
                transform: "perspective(500px) rotateX(10deg) translateZ(30px)",
                boxShadow:
                  "0 25px 50px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 via-[#8B5CF6]/20 to-[#F472B6]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transform: "translateZ(-10px)" }}
              ></div>
              <div className="flex items-center space-x-3 text-transparent bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text relative z-10">
                <Code
                  className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-1000 text-[#8B5CF6]"
                  style={{ transform: "translateZ(15px)" }}
                />
                <span
                  className="font-medium text-lg"
                  style={{ textShadow: "0 0 30px rgba(139, 92, 246, 0.8)" }}
                >
                  Building
                </span>
                <Sparkles
                  className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-[#E879F9]"
                  style={{ transform: "translateZ(10px)" }}
                />
              </div>
            </div>

            <h1
              className="display-lg spacing-generous relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(50px)" }}>
                <span
                  className="bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 40px rgba(139, 92, 246, 0.6)",
                    transform: "translateZ(20px)",
                  }}
                >
                  Technology as
                </span>
              </div>
              <br />
              <div style={{ transform: "translateZ(80px)" }}>
                <span
                  className="bg-gradient-to-r from-[#E879F9] via-[#F472B6] to-[#00D4FF] bg-clip-text text-transparent animate-pulse"
                  style={{
                    textShadow: "0 0 60px rgba(232, 121, 249, 0.8)",
                    transform: "translateZ(30px)",
                  }}
                >
                  contemplation
                </span>
              </div>
              <div
                className="absolute -top-6 -right-6 text-5xl"
                style={{
                  transform: "translateZ(100px) rotateY(45deg)",
                  animation: "float3d 6s ease-in-out infinite",
                  filter: "drop-shadow(0 15px 30px rgba(255, 107, 107, 0.6))",
                }}
              >
                🔥
              </div>
            </h1>

            <p
              className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed"
              style={{
                transform: "translateZ(25px)",
                textShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              Each project is an exploration of consciousness through code. Not
              optimizing for productivity, but creating space for{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#E879F9] bg-clip-text text-transparent font-medium">
                presence
              </span>
              .
            </p>

            <div
              className="breathing-glass inline-block p-8 spacing-generous relative group"
              style={{
                transform: "perspective(800px) rotateX(5deg) translateZ(40px)",
                boxShadow:
                  "0 30px 60px rgba(0, 212, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 via-[#E879F9]/10 to-[#F472B6]/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transform: "translateZ(-20px)" }}
              ></div>
              <p
                className="sacred-text text-xl relative z-10 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent"
                style={{ textShadow: "0 0 25px rgba(139, 92, 246, 0.6)" }}
              >
                "What if every interface was a mirror for consciousness to see
                itself?"
              </p>
              <div
                className="absolute -top-4 -left-4 text-3xl"
                style={{
                  transform: "translateZ(30px) rotateZ(15deg)",
                  animation: "float3d 4s ease-in-out infinite",
                  filter: "drop-shadow(0 10px 20px rgba(245, 158, 11, 0.6))",
                }}
              >
                🥔
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project with 3D Depth */}
      {projects.find((p) => p.featured) && (
        <section
          className="section-breathing"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="container-content">
            {(() => {
              const featured = projects.find((p) => p.featured)!;
              return (
                <div className="text-center mb-16">
                  <div
                    className="breathing-glass inline-block px-8 py-4 mb-12 relative group"
                    style={{
                      transform:
                        "perspective(600px) rotateX(8deg) translateZ(30px)",
                      boxShadow: featured.depth,
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${featured.brandGradient} opacity-20 rounded-xl blur-lg group-hover:opacity-100 transition-all duration-500`}
                      style={{ transform: "translateZ(-15px)" }}
                    ></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      <Sparkles
                        className={`w-6 h-6 animate-pulse bg-gradient-to-r ${featured.brandGradient} text-transparent`}
                        style={{ transform: "translateZ(10px)" }}
                      />
                      <span
                        className={`font-medium text-lg bg-gradient-to-r ${featured.brandGradient} bg-clip-text text-transparent`}
                      >
                        Featured Project
                      </span>
                      <Heart
                        className="w-5 h-5 group-hover:text-[#F472B6] transition-colors duration-300 text-[#E879F9]"
                        style={{ transform: "translateZ(5px)" }}
                      />
                    </div>
                  </div>

                  <Link href={featured.blueprintLink} className="block group">
                    <div
                      className={`contemplative-card p-8 md:p-16 max-w-5xl mx-auto group-hover:bg-white/[0.08] transition-all duration-700 relative overflow-hidden`}
                      style={{
                        transform:
                          "perspective(1200px) rotateX(5deg) translateZ(50px)",
                        transformStyle: "preserve-3d",
                        boxShadow: featured.depth,
                        background: `linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.08), rgba(232, 121, 249, 0.05))`,
                      }}
                      onMouseMove={(e) => {
                        const tilt = calculateTilt(
                          e.currentTarget,
                          mousePosition.x,
                          mousePosition.y
                        );
                        e.currentTarget.style.transform = `perspective(1200px) rotateX(${
                          5 + tilt.rotateX
                        }deg) rotateY(${tilt.rotateY}deg) translateZ(50px)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "perspective(1200px) rotateX(5deg) rotateY(0deg) translateZ(50px)";
                      }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${featured.brandGradient} opacity-0 group-hover:opacity-20 transition-all duration-700`}
                        style={{ transform: "translateZ(-30px)" }}
                      ></div>

                      <div
                        className="relative z-10"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div
                          className="text-6xl md:text-8xl mb-12 relative"
                          style={{ transform: "translateZ(60px)" }}
                        >
                          <span className="animate-float">{featured.icon}</span>
                          <div
                            className="absolute inset-0 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                            style={{
                              transform: "translateZ(-20px)",
                              filter: "hue-rotate(45deg)",
                            }}
                          >
                            {featured.icon}
                          </div>
                        </div>

                        <h2
                          className={`heading-xl spacing-comfortable transition-all duration-500 bg-gradient-to-r ${featured.brandGradient} bg-clip-text text-transparent relative`}
                          style={{
                            transform: "translateZ(40px)",
                            textShadow: "0 0 40px rgba(0, 212, 255, 0.4)",
                          }}
                        >
                          {featured.title}
                          <div
                            className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-all duration-700"
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <Zap className="w-10 h-10 text-[#00D4FF] animate-pulse" />
                          </div>
                        </h2>

                        <p
                          className="body-xl text-slate-400 spacing-comfortable font-medium"
                          style={{ transform: "translateZ(30px)" }}
                        >
                          {featured.subtitle}
                        </p>

                        <p
                          className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-3xl mx-auto"
                          style={{ transform: "translateZ(25px)" }}
                        >
                          {featured.description}
                        </p>

                        <div
                          className={`sacred-quote bg-gradient-to-r ${featured.brandGradient} bg-opacity-10 border-l-4 border-[#00D4FF]`}
                          style={{
                            transform: "translateZ(35px)",
                            background:
                              "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.1), rgba(232, 121, 249, 0.1))",
                            boxShadow: "0 15px 30px rgba(0, 212, 255, 0.1)",
                          }}
                        >
                          {featured.reflection}
                        </div>

                        {featured.tech && (
                          <div
                            className="spacing-comfortable"
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <h3
                              className={`text-sm font-medium mb-4 flex items-center space-x-2 bg-gradient-to-r ${featured.brandGradient} bg-clip-text text-transparent`}
                            >
                              <Code className="w-4 h-4 text-[#8B5CF6]" />
                              <span>Technical approach</span>
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3">
                              {featured.tech.map((tech, index) => (
                                <span
                                  key={tech}
                                  className="breathing-glass px-4 py-2 text-sm text-slate-300 group-hover:bg-white/10 transition-all duration-500"
                                  style={{
                                    animationDelay: `${index * 100}ms`,
                                    transform: `translateZ(${
                                      15 + index * 2
                                    }px)`,
                                    boxShadow:
                                      "0 5px 15px rgba(139, 92, 246, 0.2)",
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div
                          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
                          style={{ transform: "translateZ(45px)" }}
                        >
                          <div
                            className={`flex items-center space-x-3 transition-all duration-500 bg-gradient-to-r ${featured.brandGradient} bg-clip-text text-transparent`}
                          >
                            <Eye className="w-6 h-6 text-[#00D4FF]" />
                            <span className="text-lg font-medium">
                              Explore the blueprint
                            </span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500 text-[#F472B6]" />
                          </div>

                          {featured.liveLink && (
                            <a
                              href={featured.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`gentle-button text-lg px-8 py-4 flex items-center space-x-3 transition-all duration-500`}
                              style={{
                                background: `linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2), rgba(232, 121, 249, 0.2))`,
                                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
                                transform: "translateZ(25px)",
                              }}
                            >
                              <ExternalLink className="w-5 h-5" />
                              <span>Experience Live</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Projects with 3D Cards */}
      <section
        className="section-breathing"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="container-content">
          <h2
            className={`heading-xl text-center spacing-generous bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent`}
            style={{
              transform: "translateZ(30px)",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
            }}
          >
            Current experiments
          </h2>

          <div
            className="grid gap-8 md:grid-cols-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  transform: `translateZ(${20 + index * 10}px)`,
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.blueprintLink} className="block group">
                  <Magnetic3DProjectCard
                    project={project}
                    isHovered={hoveredProject === project.id}
                    isGlitching={isGlitching && project.id === "aimafia"}
                    mousePosition={mousePosition}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy with 3D Depth */}
      <section
        className="section-breathing"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="container-narrow">
          <div
            className="contemplative-card p-8 md:p-16 text-center relative overflow-hidden"
            style={{
              transform: "perspective(1000px) rotateX(3deg) translateZ(40px)",
              background:
                "linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.08), rgba(232, 121, 249, 0.05))",
              boxShadow:
                "0 40px 80px rgba(0, 212, 255, 0.1), 0 20px 40px rgba(139, 92, 246, 0.15), 0 10px 20px rgba(232, 121, 249, 0.1)",
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 via-transparent to-[#F472B6]/10 opacity-0 hover:opacity-100 transition-all duration-1000"
              style={{ transform: "translateZ(-30px)" }}
            ></div>

            <div
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="text-6xl mb-12 relative"
                style={{ transform: "translateZ(50px)" }}
              >
                <span className="animate-float">🌱</span>
                <div
                  className="absolute top-0 left-0 text-6xl blur-2xl opacity-40 animate-pulse"
                  style={{ transform: "translateZ(-20px)" }}
                >
                  🔥
                </div>
              </div>

              <h2
                className={`heading-xl spacing-comfortable bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent`}
                style={{
                  transform: "translateZ(35px)",
                  textShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
                }}
              >
                Building philosophy
              </h2>

              <div className="space-y-8 text-left max-w-2xl mx-auto">
                <p
                  className="body-lg text-slate-300 leading-relaxed"
                  style={{ transform: "translateZ(25px)" }}
                >
                  I used to build fast, aiming for scale and metrics. Now I
                  build aiming for{" "}
                  <span className="bg-gradient-to-r from-[#8B5CF6] to-[#E879F9] bg-clip-text text-transparent font-medium">
                    depth and meaning
                  </span>
                  , and ironically, I build much faster. Each project starts
                  with a question rather than a problem to solve.
                </p>

                <p
                  className="body-lg text-slate-300 leading-relaxed"
                  style={{ transform: "translateZ(20px)" }}
                >
                  My technical approach centers on AI orchestration and
                  full-stack development, but the real innovation happens in the{" "}
                  <span className="bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] bg-clip-text text-transparent font-medium">
                    intention behind the code
                  </span>
                  . What if technology could serve presence instead of demanding
                  it?
                </p>

                <div
                  className="sacred-quote bg-gradient-to-r from-[#8B5CF6]/20 via-[#E879F9]/10 to-[#F472B6]/20 border-l-[#8B5CF6]"
                  style={{
                    transform: "translateZ(30px)",
                    boxShadow: "0 15px 30px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  Every interface is either a mirror or a distraction. I'm
                  trying to build more mirrors.
                </div>

                <p
                  className="body-lg text-slate-300 leading-relaxed"
                  style={{ transform: "translateZ(15px)" }}
                >
                  This isn't about rejecting technology or being
                  anti-productivity. It's about recognizing that{" "}
                  <span className="bg-gradient-to-r from-[#E879F9] to-[#F472B6] bg-clip-text text-transparent font-medium">
                    consciousness is the most interesting problem space we have
                  </span>
                  , and code can be a contemplative practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with 3D Magic */}
      <section
        className="section-breathing"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="container-narrow text-center">
          <div
            className="contemplative-card p-8 md:p-16 relative overflow-hidden group"
            style={{
              transform: "perspective(1000px) rotateX(2deg) translateZ(50px)",
              background:
                "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.15), rgba(232, 121, 249, 0.1))",
              boxShadow:
                "0 50px 100px rgba(0, 212, 255, 0.1), 0 25px 50px rgba(139, 92, 246, 0.2), 0 10px 30px rgba(232, 121, 249, 0.15)",
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 via-transparent to-[#F472B6]/20 opacity-0 group-hover:opacity-100 transition-all duration-1000"
              style={{ transform: "translateZ(-40px)" }}
            ></div>

            <div
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="text-6xl mb-8 relative"
                style={{ transform: "translateZ(60px)" }}
              >
                <span className="animate-float">🤝</span>
                <div
                  className="absolute inset-0 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ transform: "translateZ(-30px)" }}
                >
                  💫
                </div>
              </div>

              <h2
                className={`heading-xl spacing-comfortable bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent`}
                style={{
                  transform: "translateZ(40px)",
                  textShadow: "0 0 40px rgba(0, 212, 255, 0.6)",
                }}
              >
                Interested in collaborating?
              </h2>

              <p
                className="body-lg text-slate-300 spacing-comfortable max-w-xl mx-auto"
                style={{ transform: "translateZ(30px)" }}
              >
                If you're building technology that serves consciousness, or if
                these ideas resonate with your own work, I'd love to connect.
              </p>

              <Link
                href="/connect"
                className="gentle-button text-lg px-8 py-4 group/btn inline-flex items-center transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.25), rgba(244, 114, 182, 0.2))",
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                  transform: "translateZ(45px)",
                }}
              >
                <span>Let's talk</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover/btn:rotate-[360deg] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with depth */}
      <footer
        className="py-16 border-t border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 212, 255, 0.02), rgba(139, 92, 246, 0.05), rgba(232, 121, 249, 0.02))",
          transform: "translateZ(10px)",
        }}
      >
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-500"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(139, 92, 246, 0.4))",
                transform: "translateZ(20px)",
              }}
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent font-medium">
              Ahiya
            </span>
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} - A space becoming human becoming space
          </p>
        </div>
      </footer>

      {/* 3D Animation Styles */}
      <style jsx>{`
        @keyframes float3d {
          0%,
          100% {
            transform: translateY(0px) translateZ(0px) rotateX(0deg);
          }
          33% {
            transform: translateY(-10px) translateZ(20px) rotateX(5deg);
          }
          66% {
            transform: translateY(5px) translateZ(-10px) rotateX(-3deg);
          }
        }
      `}</style>
    </div>
  );
};

// Magnetic 3D Project Card Component
const Magnetic3DProjectCard: React.FC<{
  project: any;
  isHovered: boolean;
  isGlitching: boolean;
  mousePosition: { x: number; y: number };
}> = ({ project, isHovered, isGlitching, mousePosition }) => {
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "text-[#00D4FF]";
      case "development":
        return "text-[#F59E0B]";
      default:
        return "text-[#8B5CF6]";
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

  const calculateTilt = () => {
    if (!cardRef) return { rotateX: 0, rotateY: 0 };
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (mousePosition.y - centerY) / 25;
    const rotateY = (centerX - mousePosition.x) / 25;
    return {
      rotateX: Math.max(-12, Math.min(12, rotateX)),
      rotateY: Math.max(-12, Math.min(12, rotateY)),
    };
  };

  const tilt = isHovered ? calculateTilt() : { rotateX: 0, rotateY: 0 };

  return (
    <div
      ref={setCardRef}
      className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.08] transition-all duration-700 relative overflow-hidden ${
        isGlitching ? "animate-pulse" : ""
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${
          5 + tilt.rotateX
        }deg) rotateY(${tilt.rotateY}deg) translateZ(${
          isHovered ? "30px" : "15px"
        })`,
        transformStyle: "preserve-3d",
        background: `linear-gradient(135deg, ${project.brandGradient
          .replace(/from-|via-|to-/g, "")
          .split(" ")
          .map(
            (color: string) =>
              color.replace(/[\[\]]/g, "") +
              (color.includes("FF") ? "05" : "08")
          )
          .join(", ")})`,
        boxShadow: isHovered
          ? project.depth
          : `0 15px 30px rgba(139, 92, 246, 0.1)`,
        transition: "all 0.7s cubic-bezier(0.23, 1, 0.320, 1)",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.brandGradient} opacity-0 group-hover:opacity-15 transition-all duration-700`}
        style={{ transform: "translateZ(-20px)" }}
      ></div>

      <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div
              className={`text-4xl md:text-5xl relative ${
                isGlitching ? "animate-pulse" : ""
              }`}
              style={{ transform: "translateZ(25px)" }}
            >
              <span className={isHovered ? "animate-float" : ""}>
                {project.icon}
              </span>
              {isHovered && (
                <div
                  className="absolute inset-0 blur-xl opacity-60"
                  style={{ transform: "translateZ(-15px)" }}
                >
                  {project.icon}
                </div>
              )}
            </div>
            <div className="min-w-0" style={{ transform: "translateZ(20px)" }}>
              <h3
                className={`heading-lg transition-all duration-500 ${
                  isGlitching ? "animate-pulse" : ""
                } bg-gradient-to-r ${
                  project.brandGradient
                } bg-clip-text text-transparent`}
              >
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm md:text-base font-medium">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div
            className="breathing-glass px-4 py-2 text-sm flex-shrink-0 group-hover:bg-white/10 transition-all duration-500"
            style={{
              transform: "translateZ(15px)",
              boxShadow: "0 8px 16px rgba(139, 92, 246, 0.2)",
            }}
          >
            <span className={getStatusColor(project.status)}>
              {getStatusText(project.status)}
            </span>
          </div>
        </div>

        <p
          className="text-slate-300 spacing-comfortable leading-relaxed"
          style={{ transform: "translateZ(18px)" }}
        >
          {project.description}
        </p>

        <div
          className={`sacred-quote text-sm bg-gradient-to-r ${project.brandGradient} bg-opacity-10 border-l-4`}
          style={{
            transform: "translateZ(22px)",
            background: `linear-gradient(135deg, ${project.brandGradient
              .replace(/from-|via-|to-/g, "")
              .split(" ")
              .map((color: string) => color.replace(/[\[\]]/g, "") + "15")
              .join(", ")})`,
            borderLeftColor: project.brandGradient
              .split(" ")[0]
              .replace(/from-|\[|\]/g, ""),
            boxShadow: "0 10px 20px rgba(139, 92, 246, 0.1)",
          }}
        >
          {project.reflection}
        </div>

        {project.tech && (
          <div
            className="spacing-comfortable"
            style={{ transform: "translateZ(16px)" }}
          >
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, index: number) => (
                <span
                  key={tech}
                  className="breathing-glass px-3 py-1 text-xs text-slate-400 group-hover:bg-white/10 transition-all duration-500"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: `translateZ(${12 + index * 2}px)`,
                    boxShadow: "0 5px 10px rgba(139, 92, 246, 0.15)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6"
          style={{ transform: "translateZ(25px)" }}
        >
          <div
            className={`flex items-center space-x-2 transition-all duration-500 bg-gradient-to-r ${project.brandGradient} bg-clip-text text-transparent`}
          >
            <Eye
              className="w-5 h-5"
              style={{
                color: project.brandGradient
                  .split(" ")[0]
                  .replace(/from-|\[|\]/g, ""),
              }}
            />
            <span className="text-sm font-medium">Explore blueprint</span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500"
              style={{
                color: project.brandGradient
                  .split(" ")[2]
                  .replace(/to-|\[|\]/g, ""),
              }}
            />
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="gentle-button text-sm px-4 py-2 flex items-center space-x-2 opacity-90 hover:opacity-100 self-start transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${project.brandGradient
                  .replace(/from-|via-|to-/g, "")
                  .split(" ")
                  .map((color: string) => color.replace(/[\[\]]/g, "") + "20")
                  .join(", ")})`,
                boxShadow: "0 8px 16px rgba(139, 92, 246, 0.2)",
                transform: "translateZ(20px)",
              }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
