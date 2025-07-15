"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code, Sparkles, Eye } from "lucide-react";

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-sm border-b border-white/5">
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
              <span className="text-lg font-medium text-gentle">Ahiya</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Journey", "Writing", "Connect"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
                >
                  <span>{item}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
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
        <section className="section-breathing">
          <div className="container-content">
            {(() => {
              const featured = projects.find((p) => p.featured)!;
              return (
                <div className="text-center mb-16">
                  <div className="breathing-glass inline-block px-6 py-3 mb-8">
                    <div className="flex items-center space-x-2 text-purple-300">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">Featured Project</span>
                    </div>
                  </div>

                  <Link href={featured.blueprintLink} className="block group">
                    <div className="contemplative-card p-8 md:p-12 max-w-4xl mx-auto group-hover:bg-white/[0.06] transition-all duration-300">
                      <BreathingCard>
                        <div className="text-6xl mb-8 animate-float">
                          {featured.icon}
                        </div>

                        <h2 className="heading-xl spacing-comfortable group-hover:text-emerald-200 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="body-lg text-slate-400 spacing-comfortable">
                          {featured.subtitle}
                        </p>

                        <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-2xl mx-auto">
                          {featured.description}
                        </p>

                        <div className="sacred-quote">
                          {featured.reflection}
                        </div>

                        {featured.tech && (
                          <div className="spacing-comfortable">
                            <h3 className="text-sm font-medium text-slate-400 mb-3">
                              Technical approach
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                              {featured.tech.map((tech) => (
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

                        <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 mt-8">
                          <div className="flex items-center space-x-2 text-emerald-300 group-hover:text-emerald-200 transition-colors">
                            <span>Explore the blueprint</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>

                          {featured.liveLink && (
                            <a
                              href={featured.liveLink}
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
                      </BreathingCard>
                    </div>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous text-gentle">
            Current experiments
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.blueprintLink} className="block group">
                  <ConsciousProjectCard
                    project={project}
                    isHovered={hoveredProject === project.id}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center">
            <div className="text-5xl mb-8 animate-float">🌱</div>

            <h2 className="heading-xl spacing-comfortable text-gentle">
              Building philosophy
            </h2>

            <div className="space-y-6 text-left">
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
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <div className="text-5xl mb-6 animate-float">🤝</div>
            <h2 className="heading-xl spacing-comfortable text-gentle">
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

// Breathing Card Component for Selah
const BreathingCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breathScale, setBreathScale] = useState(1);

  useEffect(() => {
    const breathingAnimation = () => {
      const time = Date.now() / 3000; // 6 second breath cycle
      const scale = 1 + Math.sin(time) * 0.015; // Very subtle breathing
      setBreathScale(scale);
      requestAnimationFrame(breathingAnimation);
    };

    const animationId = requestAnimationFrame(breathingAnimation);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className="transition-transform duration-100"
      style={{ transform: `scale(${breathScale})` }}
    >
      {children}
    </div>
  );
};

// Conscious Project Card Component
const ConsciousProjectCard: React.FC<{
  project: any;
  isHovered: boolean;
}> = ({ project, isHovered }) => {
  const [aiMafiaText, setAiMafiaText] = useState("humans");
  const [diveInkText, setDiveInkText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const fullDiveInkText =
    "Enter living narratives with AI agents that understand context and character...";

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
      const interval = setInterval(() => {
        setTypewriterIndex((prev) => {
          if (prev < fullDiveInkText.length) {
            setDiveInkText(fullDiveInkText.slice(0, prev + 1));
            return prev + 1;
          }
          return prev;
        });
      }, 50);
      return () => clearInterval(interval);
    } else if (project.id === "diveink" && !isHovered) {
      setDiveInkText("");
      setTypewriterIndex(0);
    }
  }, [project.id, isHovered, fullDiveInkText]);

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

  return (
    <div
      className={`relative h-full transition-all duration-300 ${
        project.id === "selah" ? "breathing-container" : ""
      }`}
    >
      {/* Selah Breathing Effect */}
      {project.id === "selah" && (
        <BreathingCard>
          <div
            className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300 bg-gradient-to-br ${project.brandGradient}`}
          >
            <ProjectCardContent
              project={project}
              isHovered={isHovered}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              getProjectDescription={getProjectDescription}
            />
          </div>
        </BreathingCard>
      )}

      {/* Mirror of Truth Reflection Effect */}
      {project.id === "mirror" && (
        <div
          className={`contemplative-card p-6 md:p-8 h-full transition-all duration-500 bg-gradient-to-br ${
            project.brandGradient
          } ${
            isHovered
              ? "backdrop-blur-xl bg-white/[0.12] shadow-2xl border border-white/20"
              : "group-hover:bg-white/[0.06]"
          }`}
        >
          <ProjectCardContent
            project={project}
            isHovered={isHovered}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            getProjectDescription={getProjectDescription}
          />
        </div>
      )}

      {/* AI Mafia and DiveInk Default Cards */}
      {(project.id === "aimafia" || project.id === "diveink") && (
        <div
          className={`contemplative-card p-6 md:p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300 bg-gradient-to-br ${project.brandGradient}`}
        >
          <ProjectCardContent
            project={project}
            isHovered={isHovered}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            getProjectDescription={getProjectDescription}
          />
        </div>
      )}
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
          <div className="text-4xl">{project.icon}</div>
          <div>
            <h3
              className={`heading-lg group-hover:text-${project.textColor} transition-colors`}
            >
              {project.title}
            </h3>
            <p className="text-slate-400">{project.subtitle}</p>
          </div>
        </div>

        <div className="breathing-glass px-3 py-1 text-xs">
          <span className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </span>
        </div>
      </div>

      <p className="text-slate-300 spacing-comfortable leading-relaxed">
        {getProjectDescription()}
      </p>

      <div className={`sacred-quote text-sm border-l-${project.borderColor}`}>
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
        <div
          className={`flex items-center space-x-2 text-${project.textColor} group-hover:opacity-100 transition-colors`}
        >
          <Eye className="w-5 h-5" />
          <span className="text-sm">Explore blueprint</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="gentle-button text-xs px-3 py-1 flex items-center space-x-1 opacity-80 hover:opacity-100 self-start"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live</span>
          </a>
        )}
      </div>
    </>
  );
};

export default BuildingPage;
