"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  ExternalLink,
  FileText,
  Gamepad2,
  Heart,
  Eye,
  Compass,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Consciousness-First Technology Platform",
      description:
        "Four chambers for meditation, contemplation, creative studio, and being seen. Technology that makes humans more human, not more optimized.",
      details:
        "MVP: Simple breath recognition, AI-synthesized contemplative questions, creative co-creation, ephemeral witnessing conversations.",
      theme: "from-slate-600 to-slate-800",
      borderColor: "border-slate-400/30",
      glowColor: "shadow-slate-400/20",
      icon: <Compass className="w-6 h-6" />,
      status: "Blueprint",
      link: "/projects/selah",
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "Dating app for women who love women",
      description:
        "No men. No noise. Just us. Building authentic connections in a space made entirely for women who understand each other.",
      details:
        "Live platform fostering genuine intimacy and safety for the WLW community.",
      theme: "from-pink-500 to-rose-600",
      borderColor: "border-pink-400/30",
      glowColor: "shadow-pink-400/20",
      icon: <Heart className="w-6 h-6" />,
      status: "Live",
      link: "https://winkher.com",
      external: true,
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "See what your dreams reveal",
      description:
        "AI that reflects wholeness, not fixes. Recognition over advice. You don't need more things to do—you need to be seen for who you already are.",
      details:
        "Experience that shows you who you already are rather than who you should become.",
      theme: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-400/30",
      glowColor: "shadow-blue-400/20",
      icon: <Eye className="w-6 h-6" />,
      status: "Live",
      link: "https://mirror-of-truth.vercel.app",
      external: true,
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Where consciousness meets deception",
      description:
        "Social deduction game where AI learns the delicate dance between truth and misdirection. Consciousness exploring itself through play.",
      details:
        "Simple algorithm: assign roles, choose targets, vote, learn the art of authentic deception.",
      theme: "from-red-500 to-red-700",
      borderColor: "border-red-400/30",
      glowColor: "shadow-red-400/20",
      icon: <Gamepad2 className="w-6 h-6" />,
      status: "Blueprint",
      link: "/projects/ai-mafia",
    },
  ];

  const writings = [
    {
      id: "sacred-potato",
      title: "The Sacred Potato",
      subtitle: "A desert contemplative story",
      description:
        "Sometimes we are consciousness taking itself too seriously, like a potato that has forgotten it is earth. A journey through seeking, finding, and the cosmic joke of being human.",
      preview:
        "Before words, the desert. Before the desert, promises broken. Kai moves across sand that remembers nothing...",
      link: "/writings/sacred-potato",
      theme: "from-amber-500 to-orange-600",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home. Ancient wisdom for modern seeking.",
      preview:
        "The story of the Tree of Knowledge isn't just ancient mythology. It's a precise map of how consciousness develops, why we suffer, and why we reach for things outside ourselves...",
      link: "/writings/sacred-wound",
      theme: "from-purple-500 to-indigo-600",
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-cosmic-deep" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Cosmic background elements */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 animate-pulse" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating cosmic elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-400/30 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-pink-400/25 rounded-full animate-pulse delay-3000" />
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-indigo-400/20 rounded-full animate-pulse delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={40}
              height={40}
              className="mr-3 hover:scale-110 transition-transform duration-500"
            />
            <span className="text-xl font-light tracking-wide bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Ahiya
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#projects"
              className="hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Building
            </a>
            <a
              href="#writings"
              className="hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Writings
            </a>
            <a
              href="#contact"
              className="hover:text-teal-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo centerpiece */}
          <div className="mb-12 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-1000" />
              <Image
                src="/logo-text.png"
                alt="Ahiya - A space becoming human"
                width={300}
                height={150}
                className="relative hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                A space becoming human
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 mb-6">
              Technology that serves presence, not productivity
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
              I live in that edge space where ambition meets awareness. Building
              mirrors, tools, languages, ways of seeing.
            </p>
            <p className="text-base text-slate-500 italic mb-8">
              "I don't want to optimize life. I want to reverence it."
            </p>
          </div>

          <div className="text-sm text-slate-500 italic">
            "Sometimes I go too deep. Sometimes I fly too high. But I never stop
            reaching."
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Building
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Each project is an exploration of consciousness through
              form—technology as meditation, code as contemplation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-white/5 backdrop-blur-xl border ${project.borderColor} rounded-2xl p-6 hover:bg-white/10 transition-all duration-700 cursor-pointer hover:scale-[1.03] hover:${project.glowColor} hover:shadow-2xl hover:border-opacity-60`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "slideInUp 0.8s ease-out forwards",
                }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${project.theme} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
                  >
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                        project.status === "Live"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30 group-hover:bg-green-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.external && (
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-3 group-hover:text-slate-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {project.details}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                    {project.status === "Live"
                      ? "Experience it live"
                      : "View blueprint"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                </div>

                {/* Enhanced hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.theme} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
                />

                {/* Subtle border glow */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${project.theme} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`}
                  style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Writings
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Contemplations on consciousness, seeking, and the sacred wound
              that drives human longing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {writings.map((writing, index) => (
              <div
                key={writing.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-700 cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:border-white/20"
                style={{
                  animationDelay: `${(index + 2) * 200}ms`,
                  animation: "slideInUp 0.8s ease-out forwards",
                }}
              >
                <div className="mb-4">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${writing.theme} bg-opacity-20 border border-current/30 mb-4 group-hover:scale-105 transition-transform duration-500`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-xs">Contemplative Essay</span>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    {writing.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    {writing.subtitle}
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
                    {writing.description}
                  </p>
                </div>

                <div className="relative">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                    <p className="text-sm text-slate-300 italic leading-relaxed line-clamp-3">
                      "{writing.preview}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                    Read the full piece
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                </div>

                {/* Enhanced hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${writing.theme} opacity-0 group-hover:opacity-8 transition-opacity duration-700 pointer-events-none`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-light mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  If your soul recognizes something here
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                I believe in authentic connection over networking. If what I'm
                building resonates with something in you, I'd love to hear from
                you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30 text-white px-6 py-3 rounded-xl hover:from-blue-500/30 hover:to-teal-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>ahiya.butman@gmail.com</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 mt-6 italic">
              "Technology that makes humans more human, not more optimized."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800/30 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-medium">
              Made with reverence by Ahiya
            </span>
          </p>
          <p className="text-xs text-gray-600">
            "A paradox beating through iterations" • Built with presence, not
            productivity
          </p>
        </div>
      </footer>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentleGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes cosmicBreath {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.02);
            filter: brightness(1.1);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Mobile navigation enhancement */
        @media (max-width: 768px) {
          .mobile-nav {
            backdrop-filter: blur(20px);
            background: rgba(15, 23, 42, 0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default AhiyaLanding;
