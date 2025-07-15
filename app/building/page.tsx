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
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Subtle glitch effect for AI Mafia every 8 seconds
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 8000);

    return () => clearInterval(glitchInterval);
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
    bgGradient: string;
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
      bgGradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
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
      bgGradient: "from-purple-500/15 via-violet-500/10 to-indigo-500/15",
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
      bgGradient: "from-red-500/10 via-orange-500/5 to-amber-500/10",
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
      bgGradient: "from-amber-500/10 via-orange-500/5 to-yellow-500/10",
      accentColor: "amber",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-1 bg-[#0a0f1a] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Dynamic background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-400/35 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className="text-lg font-medium bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Journey", "Writing", "Connect"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                >
                  <span>{item}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Dynamic Energy */}
      <section className="section-breathing pt-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-emerald-500/5"></div>
        <div className="container-content text-center relative z-10">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="flex items-center space-x-3 text-purple-300 relative z-10">
                <Code className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium text-lg">Building</span>
                <Sparkles className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <h1 className="display-lg spacing-generous relative">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Technology as
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                contemplation
              </span>
              <div className="absolute -top-4 -right-4 text-4xl animate-float">
                🔥
              </div>
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Each project is an exploration of consciousness through code. Not
              optimizing for productivity, but creating space for{" "}
              <span className="text-purple-300 font-medium">presence</span>.
            </p>

            <div className="breathing-glass inline-block p-8 spacing-generous relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <p className="sacred-text text-xl relative z-10">
                "What if every interface was a mirror for consciousness to see
                itself?"
              </p>
              <div className="absolute -top-3 -left-3 text-2xl animate-float">
                🥔
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project with Magnetic Appeal */}
      {projects.find((p) => p.featured) && (
        <section className="section-breathing">
          <div className="container-content">
            {(() => {
              const featured = projects.find((p) => p.featured)!;
              return (
                <div className="text-center mb-16">
                  <div className="breathing-glass inline-block px-8 py-4 mb-12 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="flex items-center space-x-3 text-emerald-300 relative z-10">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="font-medium text-lg">
                        Featured Project
                      </span>
                      <Heart className="w-5 h-5 group-hover:text-pink-400 transition-colors duration-300" />
                    </div>
                  </div>

                  <Link href={featured.blueprintLink} className="block group">
                    <div
                      className={`contemplative-card p-8 md:p-16 max-w-5xl mx-auto group-hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden bg-gradient-to-br ${featured.bgGradient}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                      <div className="relative z-10">
                        <div className="text-6xl md:text-8xl mb-12 relative">
                          <span className="animate-float">{featured.icon}</span>
                          <div className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                            {featured.icon}
                          </div>
                        </div>

                        <h2 className="heading-xl spacing-comfortable group-hover:text-emerald-200 transition-colors duration-300 relative">
                          {featured.title}
                          <div className="absolute -top-6 -right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <Zap className="w-8 h-8 text-emerald-400 animate-pulse" />
                          </div>
                        </h2>

                        <p className="body-xl text-slate-400 spacing-comfortable font-medium">
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
                                  className="breathing-glass px-4 py-2 text-sm text-slate-300 group-hover:bg-emerald-500/10 transition-all duration-300"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                          <div className="flex items-center space-x-3 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                            <Eye className="w-6 h-6" />
                            <span className="text-lg font-medium">
                              Explore the blueprint
                            </span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>

                          {featured.liveLink && (
                            <a
                              href={featured.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="gentle-button text-lg px-8 py-4 flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30"
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

      {/* All Projects with Dynamic Interactions */}
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
                  <MagneticProjectCard
                    project={project}
                    isHovered={hoveredProject === project.id}
                    isGlitching={isGlitching && project.id === "aimafia"}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy with More Fire */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-emerald-500/5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-emerald-500/10 opacity-0 hover:opacity-100 transition-all duration-1000"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-12 relative">
                <span className="animate-float">🌱</span>
                <div className="absolute top-0 left-0 text-6xl blur-xl opacity-30 animate-pulse">
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

                <div className="sacred-quote bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-emerald-500/20 border-l-purple-400/50">
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

      {/* Connect with Magnetic Energy */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-16 relative overflow-hidden group bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-8 relative">
                <span className="animate-float">🤝</span>
                <div className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500">
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
                className="gentle-button text-lg px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 group/btn"
              >
                <span>Let's talk</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover/btn:rotate-12 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-gradient-to-r from-purple-500/5 to-emerald-500/5">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by{" "}
            <span className="text-gradient bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
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

// Magnetic Project Card Component
const MagneticProjectCard: React.FC<{
  project: any;
  isHovered: boolean;
  isGlitching: boolean;
}> = ({ project, isHovered, isGlitching }) => {
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

  return (
    <div
      className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden bg-gradient-to-br ${
        project.bgGradient
      } ${isGlitching ? "animate-pulse" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          project.accentColor === "emerald"
            ? "from-emerald-500/10 to-teal-500/10"
            : project.accentColor === "purple"
            ? "from-purple-500/10 to-violet-500/10"
            : project.accentColor === "red"
            ? "from-red-500/10 to-orange-500/10"
            : "from-amber-500/10 to-yellow-500/10"
        }`}
      ></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div
              className={`text-4xl md:text-5xl relative ${
                isGlitching ? "animate-pulse" : ""
              }`}
            >
              <span className={isHovered ? "animate-float" : ""}>
                {project.icon}
              </span>
              {isHovered && (
                <div className="absolute inset-0 blur-lg opacity-50">
                  {project.icon}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3
                className={`heading-lg group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 ${
                  project.accentColor === "emerald"
                    ? "group-hover:from-emerald-200 group-hover:to-teal-200"
                    : project.accentColor === "purple"
                    ? "group-hover:from-purple-200 group-hover:to-violet-200"
                    : project.accentColor === "red"
                    ? "group-hover:from-red-200 group-hover:to-orange-200"
                    : "group-hover:from-amber-200 group-hover:to-yellow-200"
                } ${isGlitching ? "animate-pulse" : ""}`}
              >
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm md:text-base font-medium">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="breathing-glass px-4 py-2 text-sm flex-shrink-0 group-hover:bg-white/10 transition-all duration-300">
            <span className={getStatusColor(project.status)}>
              {getStatusText(project.status)}
            </span>
          </div>
        </div>

        <p className="text-slate-300 spacing-comfortable leading-relaxed">
          {project.description}
        </p>

        <div
          className={`sacred-quote text-sm bg-gradient-to-r border-l-4 ${
            project.accentColor === "emerald"
              ? "from-emerald-500/10 to-teal-500/10 border-l-emerald-400/50"
              : project.accentColor === "purple"
              ? "from-purple-500/10 to-violet-500/10 border-l-purple-400/50"
              : project.accentColor === "red"
              ? "from-red-500/10 to-orange-500/10 border-l-red-400/50"
              : "from-amber-500/10 to-yellow-500/10 border-l-amber-400/50"
          }`}
        >
          {project.reflection}
        </div>

        {project.tech && (
          <div className="spacing-comfortable">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, index: number) => (
                <span
                  key={tech}
                  className="breathing-glass px-3 py-1 text-xs text-slate-400 group-hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div
            className={`flex items-center space-x-2 transition-all duration-300 ${
              project.accentColor === "emerald"
                ? "text-emerald-300 group-hover:text-emerald-200"
                : project.accentColor === "purple"
                ? "text-purple-300 group-hover:text-purple-200"
                : project.accentColor === "red"
                ? "text-red-300 group-hover:text-red-200"
                : "text-amber-300 group-hover:text-amber-200"
            }`}
          >
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Explore blueprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`gentle-button text-sm px-4 py-2 flex items-center space-x-2 opacity-90 hover:opacity-100 self-start transition-all duration-300 ${
                project.accentColor === "emerald"
                  ? "bg-emerald-500/20 hover:bg-emerald-500/30"
                  : project.accentColor === "purple"
                  ? "bg-purple-500/20 hover:bg-purple-500/30"
                  : project.accentColor === "red"
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-amber-500/20 hover:bg-amber-500/30"
              }`}
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
