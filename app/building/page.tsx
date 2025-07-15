"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code, Sparkles } from "lucide-react";

// Advanced Types
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
  cardType: "mirror" | "breathing" | "deceptive" | "writing";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: string;
}

const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particleIdRef = useRef(0);

  // Projects with new clarity and card types
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
        "Three-tiered reflection tool that shows you your wholeness, not your brokenness. Free glimpse, Essential evolution, Premium depth. Cheaper than therapy, deeper than journaling.",
      status: "live",
      icon: "🪞",
      blueprintLink: "/blueprint/mirror-of-truth",
      liveLink: "https://mirror-of-truth.xyz",
      reflection:
        "Sometimes the most helpful thing AI can do is refuse to give advice.",
      tech: ["Claude Sonnet 4", "Next.js", "PayPal", "Nodemailer", "Redis"],
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

  // Mouse tracking for advanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Advanced particle system
  const createParticle = useCallback(
    (x: number, y: number, type: string = "default") => {
      const colors = {
        default: "rgba(168, 85, 247, 0.6)",
        mirror: "rgba(255, 255, 255, 0.8)",
        breathing: "rgba(52, 211, 153, 0.7)",
        deceptive: "rgba(239, 68, 68, 0.6)",
        writing: "rgba(251, 146, 60, 0.7)",
      };

      return {
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 120 + Math.random() * 60,
        size: 1 + Math.random() * 3,
        color: colors[type as keyof typeof colors] || colors.default,
        type,
      };
    },
    []
  );

  // Particle animation loop
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vx: particle.vx * 0.99,
            vy: particle.vy * 0.99,
          }))
          .filter((particle) => particle.life < particle.maxLife);

        // Draw particles
        updated.forEach((particle) => {
          const alpha = 1 - particle.life / particle.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Advanced Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Dynamic background with mouse tracking */}
      <div
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.03) 0%, transparent 50%)`,
        }}
      />

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
                href="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/journey"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Journey
              </Link>
              <Link
                href="/writing"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/connect"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Connect
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-breathing pt-32 relative z-20">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-purple-300">
                <Code className="w-5 h-5" />
                <span className="font-medium">Building</span>
              </div>
            </div>

            <h1 className="display-lg spacing-generous text-gentle">
              Technology as contemplation
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Each project is an exploration of consciousness through code. Not
              optimizing for productivity, but creating space for presence.
            </p>

            <div className="breathing-glass inline-block p-6 spacing-generous">
              <p className="sacred-text text-lg">
                "What if every interface was a mirror for consciousness to see
                itself?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {projects.find((p) => p.featured) && (
        <FeaturedProject
          project={projects.find((p) => p.featured)!}
          createParticle={createParticle}
        />
      )}

      {/* All Projects */}
      <section className="section-breathing relative z-20">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Current experiments
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                createParticle={createParticle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Enhanced */}
      <section className="section-breathing relative z-20">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
                  backgroundSize: "50px 50px",
                  animation: "gentle-drift 40s linear infinite",
                }}
              />
            </div>

            <div className="text-5xl mb-8 animate-float relative z-10">🌱</div>

            <h2 className="heading-xl spacing-comfortable relative z-10">
              Building philosophy
            </h2>

            <div className="space-y-6 text-left relative z-10">
              <p className="body-lg text-slate-300 leading-relaxed">
                I used to build fast, aiming for scale and metrics. Now I build
                aiming for depth and meaning, and ironically, I build much
                faster. Each project starts with a question rather than a
                problem to solve.
              </p>

              <p className="body-lg text-slate-300 leading-relaxed">
                My technical approach centers on AI orchestration and full-stack
                development, but the real innovation happens in the intention
                behind the code. What if technology could serve presence instead
                of demanding it?
              </p>

              <div className="sacred-quote">
                Every interface is either a mirror or a distraction. I'm trying
                to build more mirrors.
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                This isn't about rejecting technology or being
                anti-productivity. It's about recognizing that consciousness is
                the most interesting problem space we have, and code can be a
                contemplative practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="section-breathing relative z-20">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="text-5xl mb-6 animate-float">🤝</div>
            <h2 className="heading-xl spacing-comfortable">
              Interested in collaborating?
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              If you're building technology that serves consciousness, or if
              these ideas resonate with your own work, I'd love to connect.
            </p>
            <Link href="/connect" className="gentle-button">
              Let's talk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-20">
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

      {/* Advanced CSS */}
      <style jsx>{`
        @keyframes gentle-drift {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, -5px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes mirror-shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%);
          }
          100% {
            transform: translateX(100%) translateY(100%);
          }
        }

        @keyframes breathing-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes glitch-text {
          0%,
          90% {
            transform: translateX(0);
          }
          91% {
            transform: translateX(-2px);
          }
          92% {
            transform: translateX(2px);
          }
          93% {
            transform: translateX(0);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .mirror-shards {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .mirror-shard {
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: float 12s ease-in-out infinite;
        }

        .mirror-shard:nth-child(1) {
          top: 20%;
          left: 15%;
          clip-path: polygon(20% 0%, 80% 10%, 100% 85%, 35% 100%, 0% 70%);
          animation-delay: 0s;
        }

        .mirror-shard:nth-child(2) {
          top: 60%;
          right: 20%;
          clip-path: polygon(50% 0%, 90% 50%, 50% 100%, 10% 50%);
          animation-delay: 2s;
        }

        .mirror-shard:nth-child(3) {
          bottom: 30%;
          left: 25%;
          clip-path: polygon(25% 0%, 100% 38%, 75% 100%, 0% 62%);
          animation-delay: 4s;
        }

        .mirror-shard::after {
          content: "";
          position: absolute;
          inset: -10%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 100%
          );
          animation: mirror-shimmer 8s linear infinite;
          mix-blend-mode: overlay;
        }

        .breathing-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .breathing-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(52, 211, 153, 0.6);
          border-radius: 50%;
          animation: breathing-pulse 4s ease-in-out infinite;
        }

        .breathing-particle:nth-child(1) {
          top: 20%;
          left: 30%;
          animation-delay: 0s;
        }
        .breathing-particle:nth-child(2) {
          top: 40%;
          right: 25%;
          animation-delay: 1s;
        }
        .breathing-particle:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }
        .breathing-particle:nth-child(4) {
          bottom: 20%;
          right: 30%;
          animation-delay: 3s;
        }

        .glitch-container {
          position: relative;
        }

        .glitch-text {
          animation: glitch-text 4s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          color: rgba(239, 68, 68, 0.8);
          z-index: -1;
          animation: glitch-text 2s infinite reverse;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-text::after {
          color: rgba(59, 130, 246, 0.8);
          z-index: -1;
          animation: glitch-text 3s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        .typewriter-container {
          overflow: hidden;
          border-right: 2px solid rgba(251, 146, 60, 0.7);
          white-space: nowrap;
          animation: typewriter 3s steps(40, end),
            blink-cursor 0.75s step-end infinite;
        }

        @keyframes blink-cursor {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: rgba(251, 146, 60, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

// Featured Project Component with Advanced Effects
const FeaturedProject: React.FC<{
  project: Project;
  createParticle: (x: number, y: number, type: string) => Particle;
}> = ({ project, createParticle }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createParticle(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height,
          project.cardType
        );
      }, i * 100);
    }
  };

  return (
    <section className="section-breathing relative z-20">
      <div className="container-content">
        <div className="text-center mb-16">
          <div className="breathing-glass inline-block px-6 py-3 mb-8">
            <div className="flex items-center space-x-2 text-purple-300">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Featured Project</span>
            </div>
          </div>

          <div
            ref={cardRef}
            className="contemplative-card p-12 max-w-4xl mx-auto group cursor-pointer relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onClick={() => (window.location.href = project.blueprintLink)}
          >
            {/* Breathing particles for Selah */}
            {project.cardType === "breathing" && (
              <div className="breathing-particles">
                <div className="breathing-particle"></div>
                <div className="breathing-particle"></div>
                <div className="breathing-particle"></div>
                <div className="breathing-particle"></div>
              </div>
            )}

            <div className="text-6xl mb-8 animate-float relative z-10">
              {project.icon}
            </div>

            <h2 className="heading-xl spacing-comfortable group-hover:text-purple-200 transition-colors relative z-10">
              {project.title}
            </h2>
            <p className="body-lg text-slate-400 spacing-comfortable relative z-10">
              {project.subtitle}
            </p>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-2xl mx-auto relative z-10">
              {project.description}
            </p>

            <div className="sacred-quote relative z-10">
              {project.reflection}
            </div>

            {project.tech && (
              <div className="spacing-comfortable relative z-10">
                <h3 className="text-sm font-medium text-slate-400 mb-3">
                  Technical approach
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="breathing-glass px-3 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center space-x-4 mt-8 relative z-10">
              <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                <span>Explore the blueprint</span>
                <ArrowRight className="w-5 h-5" />
              </div>

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Experience Live</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Project Card Component with Card-Specific Effects
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  createParticle: (x: number, y: number, type: string) => Particle;
}> = ({ project, index, createParticle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchText, setGlitchText] = useState(project.title);
  const cardRef = useRef<HTMLDivElement>(null);

  // Glitch effect for AI Mafia
  useEffect(() => {
    if (project.cardType === "deceptive" && isHovered) {
      const words = ["HUMAN", "AI", "REAL", "FAKE", project.title];
      let currentIndex = 0;

      const interval = setInterval(() => {
        setGlitchText(words[currentIndex % words.length]);
        currentIndex++;
      }, 300);

      return () => clearInterval(interval);
    } else {
      setGlitchText(project.title);
    }
  }, [isHovered, project.cardType, project.title]);

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createParticle(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height,
          project.cardType
        );
      }, i * 50);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    window.location.href = project.blueprintLink;
  };

  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        className="contemplative-card p-8 h-full group cursor-pointer relative overflow-hidden transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Card-specific effects */}
        {project.cardType === "mirror" && isHovered && (
          <div className="mirror-shards">
            <div className="mirror-shard"></div>
            <div className="mirror-shard"></div>
            <div className="mirror-shard"></div>
          </div>
        )}

        {project.cardType === "breathing" && (
          <div className="breathing-particles">
            <div className="breathing-particle"></div>
            <div className="breathing-particle"></div>
            <div className="breathing-particle"></div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{project.icon}</div>
            <div>
              {project.cardType === "deceptive" ? (
                <h3
                  className="heading-lg group-hover:text-purple-200 transition-colors glitch-text"
                  data-text={glitchText}
                >
                  {glitchText}
                </h3>
              ) : project.cardType === "writing" && isHovered ? (
                <h3 className="heading-lg group-hover:text-purple-200 transition-colors typewriter-container">
                  {project.title}
                </h3>
              ) : (
                <h3 className="heading-lg group-hover:text-purple-200 transition-colors">
                  {project.title}
                </h3>
              )}
              <p className="text-slate-400">{project.subtitle}</p>
            </div>
          </div>

          <div className="breathing-glass px-3 py-1 text-xs">
            <span
              className={`${
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

        <p className="text-slate-300 spacing-comfortable leading-relaxed relative z-10">
          {project.description}
        </p>

        <div className="sacred-quote text-sm relative z-10">
          {project.reflection}
        </div>

        {project.tech && (
          <div className="spacing-comfortable relative z-10">
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

        <div className="flex items-center justify-between mt-6 relative z-10">
          <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
            <span className="text-sm">Explore blueprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="gentle-button text-xs px-3 py-1 flex items-center space-x-1 opacity-80 hover:opacity-100"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
