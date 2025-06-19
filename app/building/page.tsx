"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code, Heart, Sparkles } from "lucide-react";

const BuildingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

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
    link: string;
    external?: boolean;
    featured?: boolean;
    reflection: string;
    tech?: string[];
  }

  const projects: Project[] = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Four chambers for consciousness",
      description:
        "A contemplative platform with four spaces: Meditation through breath recognition, Contemplation via AI-synthesized questions, Creation as co-creative play, and Being Seen through ephemeral witnessing conversations.",
      status: "blueprint",
      icon: "🧘",
      link: "/blueprint/selah",
      featured: true,
      reflection:
        "What if technology could create space for presence instead of demanding attention?",
      tech: ["Next.js", "WebRTC", "AI/ML", "Real-time audio processing"],
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "Recognition over advice",
      description:
        "AI that reflects your wholeness rather than trying to fix you. Dream analysis and pattern recognition that shows you who you already are, not who you should become.",
      status: "live",
      icon: "🪞",
      link: "https://mirror-of-truth.vercel.app",
      external: true,
      reflection:
        "Sometimes the most helpful thing AI can do is refuse to give advice.",
      tech: ["GPT-4", "Next.js", "Prompt engineering", "Contemplative design"],
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "No men. No noise. Just us.",
      description:
        "Dating app exclusively for women loving women. Safe space with advanced safety protocols, community-driven matching, and authentic connection design.",
      status: "live",
      icon: "💕",
      link: "https://winkher.com",
      external: true,
      reflection:
        "Love needs sanctuary. Technology can provide sacred space for authentic connection.",
      tech: [
        "React Native",
        "Node.js",
        "Real-time messaging",
        "Safety-first architecture",
      ],
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Social deduction with consciousness",
      description:
        "Players and AI agents explore the delicate dance between truth and deception. A playful meditation on authentic communication and collective awareness.",
      status: "blueprint",
      icon: "🎭",
      link: "/blueprint/aimafia",
      reflection: "What can we learn about truth by playing with deception?",
      tech: [
        "AI agents",
        "Real-time multiplayer",
        "Social psychology",
        "Game design",
      ],
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

            <div className="breathing-glass inline-block p-6 spacing-generous potato-energy">
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

                  <div className="contemplative-card p-12 max-w-4xl mx-auto">
                    <div className="text-6xl mb-8 animate-float">
                      {featured.icon}
                    </div>

                    <h2 className="heading-xl spacing-comfortable">
                      {featured.title}
                    </h2>
                    <p className="body-lg text-slate-400 spacing-comfortable">
                      {featured.subtitle}
                    </p>

                    <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-2xl mx-auto">
                      {featured.description}
                    </p>

                    <div className="sacred-quote">{featured.reflection}</div>

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

                    <div className="flex items-center justify-center space-x-2 text-purple-300">
                      <span>Explore the blueprint</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Current experiments
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {project.external ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <ProjectCard project={project} />
                  </a>
                ) : (
                  <Link href={project.link} className="block group">
                    <ProjectCard project={project} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-5xl mb-8 animate-float">🌱</div>

            <h2 className="heading-xl spacing-comfortable">
              Building philosophy
            </h2>

            <div className="space-y-6 text-left">
              <p className="body-lg text-slate-300 leading-relaxed">
                I used to build fast, aiming for scale and metrics. Now I build
                aiming for depth and meaning, and ironically, I build much
                faster. Each project starts with a question about consciousness
                rather than a problem to solve.
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

// Project Card Component
const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <div className="contemplative-card p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{project.icon}</div>
          <div>
            <h3 className="heading-lg group-hover:text-purple-200 transition-colors">
              {project.title}
            </h3>
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

      <p className="text-slate-300 spacing-comfortable leading-relaxed">
        {project.description}
      </p>

      <div className="sacred-quote text-sm">{project.reflection}</div>

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

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
          <span className="text-sm">
            {project.external ? "Experience live" : "Explore blueprint"}
          </span>
          {project.external ? (
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          ) : (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
