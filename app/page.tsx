"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  ExternalLink,
  FileText,
  Gamepad2,
  Heart,
  Eye,
  Compass,
  ArrowRight,
  Sparkles,
  Stars,
} from "lucide-react";
import Image from "next/image";

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
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
      theme: "from-indigo-500 via-purple-500 to-pink-500",
      accentColor: "indigo",
      icon: <Compass className="w-7 h-7" />,
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
      theme: "from-pink-500 via-rose-500 to-orange-500",
      accentColor: "pink",
      icon: <Heart className="w-7 h-7" />,
      status: "Live",
      link: "https://winkher.com",
      external: true,
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "See what your dreams reveal",
      description:
        "AI that reflects wholeness, not fixes. Recognition over advice. You don&apos;t need more things to do—you need to be seen for who you already are.",
      details:
        "Experience that shows you who you already are rather than who you should become.",
      theme: "from-blue-500 via-cyan-500 to-teal-500",
      accentColor: "blue",
      icon: <Eye className="w-7 h-7" />,
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
      theme: "from-red-500 via-orange-500 to-yellow-500",
      accentColor: "red",
      icon: <Gamepad2 className="w-7 h-7" />,
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
      theme: "from-amber-400 via-orange-500 to-red-500",
      readTime: "12 min read",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home. Ancient wisdom for modern seeking.",
      preview:
        "The story of the Tree of Knowledge isn&apos;t just ancient mythology. It&apos;s a precise map of how consciousness develops, why we suffer, and why we reach for things outside ourselves...",
      link: "/writings/sacred-wound",
      theme: "from-violet-500 via-purple-500 to-indigo-500",
      readTime: "18 min read",
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 0.1}% ${
              mousePosition.y * 0.1
            }%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${80 - mousePosition.x * 0.05}% ${
              20 + mousePosition.y * 0.05
            }%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
              radial-gradient(circle at ${20 + mousePosition.x * 0.03}% ${
              80 - mousePosition.y * 0.03
            }%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0c0a1e 0%, #1a0b2e 25%, #2d1b47 50%, #1a0b2e 75%, #0c0a1e 100%)
            `,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl scale-150 group-hover:scale-200 transition-transform duration-700" />
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={48}
                height={48}
                className="relative hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
              />
            </div>
            <span className="text-2xl font-light tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ahiya
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "#projects", label: "Building", color: "blue" },
              { href: "#writings", label: "Writings", color: "purple" },
              { href: "#contact", label: "Contact", color: "pink" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 group`}
              >
                <span className="relative z-10">{item.label}</span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute inset-0 bg-${item.color}-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300`}
                />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-32"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Logo Centerpiece */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-150 animate-pulse" />
            <div
              className="relative transform transition-transform duration-1000"
              style={{
                transform: `translateY(${scrollY * -0.3}px) scale(${
                  1 + scrollY * 0.0001
                })`,
              }}
            >
              <Image
                src="/logo-text.png"
                alt="Ahiya - A space becoming human"
                width={400}
                height={200}
                className="mx-auto filter drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-8 mb-16">
            <h1 className="text-6xl md:text-8xl font-thin tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-pulse">
                A space becoming
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-4">
                human
              </span>
            </h1>

            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-light text-white/90 tracking-wide">
                Technology that serves presence, not productivity
              </p>

              <p className="text-xl text-white/70 leading-relaxed">
                I live in that edge space where ambition meets awareness.
                Building mirrors, tools, languages, ways of seeing.
              </p>

              <div className="space-y-4 text-white/60 italic">
                <p className="text-lg">
                  &quot;I don&apos;t want to optimize life. I want to reverence
                  it.&quot;
                </p>
                <p>
                  &quot;Sometimes I go too deep. Sometimes I fly too high. But I
                  never stop reaching.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Floating Action */}
          <div className="animate-bounce">
            <div className="inline-flex items-center space-x-2 text-white/60 text-sm tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Scroll to explore the cosmos</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 mb-6">
              <Stars className="w-6 h-6 text-blue-400" />
              <h2 className="text-5xl font-thin bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Building
              </h2>
              <Stars className="w-6 h-6 text-pink-400" />
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Each project is an exploration of consciousness through
              form—technology as meditation, code as contemplation.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-700" />

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.theme} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl scale-110 transition-all duration-700`}
                />

                {/* Card Content */}
                <div className="relative p-8 lg:p-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${project.theme} shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      {project.icon}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-4 py-2 text-xs font-medium rounded-full ${
                          project.status === "Live"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        } backdrop-blur-sm`}
                      >
                        {project.status}
                      </span>
                      {project.external && (
                        <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-medium text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-white/60 font-light tracking-wide">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-white/80 leading-relaxed text-lg">
                      {project.description}
                    </p>

                    <p className="text-white/50 text-sm leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/60 text-sm">
                      {project.status === "Live"
                        ? "Experience it live"
                        : "View blueprint"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-5xl font-thin bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Writings
              </h2>
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Contemplations on consciousness, seeking, and the sacred wound
              that drives human longing.
            </p>
          </div>

          {/* Writings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {writings.map((writing, index) => (
              <div
                key={writing.id}
                className="group relative"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-700" />

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${writing.theme} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl scale-110 transition-all duration-700`}
                />

                {/* Card Content */}
                <div className="relative p-8 lg:p-10 space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${writing.theme} bg-opacity-20 border border-current/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500`}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Contemplative Essay
                      </span>
                      <span className="text-xs text-white/60">
                        • {writing.readTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-medium text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                        {writing.title}
                      </h3>
                      <p className="text-white/60 font-light tracking-wide">
                        {writing.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed">
                    {writing.description}
                  </p>

                  {/* Preview */}
                  <div className="relative">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:bg-black/40 group-hover:border-white/20 transition-all duration-500">
                      <p className="text-white/70 italic leading-relaxed text-sm">
                        &quot;{writing.preview}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/60 text-sm">
                      Read the full piece
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-50" />

            {/* Content */}
            <div className="relative p-12 lg:p-16 space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-thin">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    If your soul recognizes something here
                  </span>
                </h2>
                <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                  I believe in authentic connection over networking. If what
                  I&apos;m building resonates with something in you, I&apos;d
                  love to hear from you.
                </p>
              </div>

              <div className="relative group">
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 rounded-2xl text-white hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-white/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm"
                >
                  <Mail className="w-6 h-6" />
                  <span className="text-lg font-light tracking-wide">
                    ahiya.butman@gmail.com
                  </span>
                </a>
              </div>

              <p className="text-white/50 italic text-sm">
                &quot;Technology that makes humans more human, not more
                optimized.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-white/60">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
              Made with reverence by Ahiya
            </span>
          </p>
          <p className="text-white/40 text-sm">
            &quot;A paradox beating through iterations&quot; • Built with
            presence, not productivity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaLanding;
