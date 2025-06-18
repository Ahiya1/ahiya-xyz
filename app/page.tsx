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
      theme: "from-gray-600 to-gray-800",
      borderColor: "border-gray-400/20",
      accentColor: "text-gray-300",
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
      theme: "from-pink-600 to-rose-700",
      borderColor: "border-pink-400/20",
      accentColor: "text-pink-300",
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
      theme: "from-blue-600 to-indigo-700",
      borderColor: "border-blue-400/20",
      accentColor: "text-blue-300",
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
      theme: "from-red-600 to-red-800",
      borderColor: "border-red-400/20",
      accentColor: "text-red-300",
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
      theme: "from-amber-600 to-orange-700",
      accentColor: "text-amber-300",
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
      theme: "from-purple-600 to-indigo-700",
      accentColor: "text-purple-300",
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sophisticated background */}
      <div className="fixed inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={48}
              height={48}
              className="hover:scale-105 transition-transform duration-300"
            />
            <span className="text-2xl font-light tracking-wide text-white">
              Ahiya
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#projects"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              Building
            </a>
            <a
              href="#writings"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              Writings
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo centerpiece */}
          <div className="mb-16 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl scale-150" />
              <Image
                src="/logo-text.png"
                alt="Ahiya - A space becoming human"
                width={400}
                height={200}
                className="relative hover:scale-105 transition-transform duration-500 filter drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                A space becoming human
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 max-w-4xl mx-auto">
              Technology that serves presence, not productivity
            </p>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I live in that edge space where ambition meets awareness. Building
              mirrors, tools, languages, ways of seeing.
            </p>

            <div className="space-y-4 pt-8">
              <p className="text-lg text-gray-500 italic font-light">
                "I don't want to optimize life. I want to reverence it."
              </p>
              <p className="text-base text-gray-600 italic font-light">
                "Sometimes I go too deep. Sometimes I fly too high. But I never
                stop reaching."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              Building
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Each project is an exploration of consciousness through
              form—technology as meditation, code as contemplation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${project.theme} shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  >
                    {project.icon}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === "Live"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.external && (
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-white group-hover:text-gray-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-sm font-medium ${project.accentColor}`}>
                    {project.subtitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.details}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    {project.status === "Live"
                      ? "Experience it live"
                      : "View blueprint"}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.theme} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              Writings
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Contemplations on consciousness, seeking, and the sacred wound
              that drives human longing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {writings.map((writing, index) => (
              <div
                key={writing.id}
                className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  animationDelay: `${(index + 2) * 150}ms`,
                  opacity: 0,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <div className="space-y-6">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${writing.theme} bg-opacity-20 border border-current/20`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">
                      Contemplative Essay
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium text-white group-hover:text-gray-100 transition-colors">
                    {writing.title}
                  </h3>

                  <p className={`text-sm font-medium ${writing.accentColor}`}>
                    {writing.subtitle}
                  </p>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {writing.description}
                  </p>

                  <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                    <p className="text-gray-400 italic leading-relaxed">
                      "{writing.preview}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      Read the full piece
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${writing.theme} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-light text-white">
                If your soul recognizes something here
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                I believe in authentic connection over networking. If what I'm
                building resonates with something in you, I'd love to hear from
                you.
              </p>

              <div className="pt-8">
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="group inline-flex items-center space-x-4 bg-white/[0.05] border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-6 h-6" />
                  <span className="text-lg font-medium">
                    ahiya.butman@gmail.com
                  </span>
                </a>
              </div>

              <p className="text-sm text-gray-600 italic pt-4">
                "Technology that makes humans more human, not more optimized."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gray-400">
            <span className="font-medium text-white">
              Made with reverence by Ahiya
            </span>
          </p>
          <p className="text-sm text-gray-600">
            "A paradox beating through iterations" • Built with presence, not
            productivity
          </p>
        </div>
      </footer>

      {/* Add the fadeInUp animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AhiyaLanding;
