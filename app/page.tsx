"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Mail,
  ExternalLink,
  FileText,
  Gamepad2,
  Heart,
  Eye,
  Compass,
  ArrowRight,
  Star,
  Sparkles,
  MessageCircle,
  Send,
  Play,
  Pause,
} from "lucide-react";

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [isBreathing, setIsBreathing] = useState(true);
  const [heroInView, setHeroInView] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const breathingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      // Fix for the ref cleanup warning
      const currentInterval = breathingInterval.current;
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, []);

  const projects = [
    {
      id: "selah",
      title: "Selah",
      subtitle: "Four chambers for consciousness",
      description: "Meditation • Contemplation • Creation • Being Seen",
      details:
        "Technology that makes humans more human. Breath recognition, AI synthesis, co-creative studios, and ephemeral witnessing—each chamber a mirror for a different aspect of presence.",
      chambers: [
        {
          name: "Meditation",
          icon: "🧘",
          desc: "Breath recognition through microphone",
        },
        {
          name: "Contemplation",
          icon: "🌀",
          desc: "AI-synthesized daily questions",
        },
        { name: "Creation", icon: "🎨", desc: "Co-creative expression studio" },
        {
          name: "Being Seen",
          icon: "👁️",
          desc: "Ephemeral witnessing conversations",
        },
      ],
      theme: "cosmic",
      status: "Blueprint",
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "No men. No noise. Just us.",
      description: "The dating app for women who love women",
      details:
        "100% women-loving-women space with advanced safety protocols, community-driven matching, and spaces designed for authentic connection. Where intimacy meets technology.",
      features: [
        "Women-only sanctuary",
        "Harassment protection",
        "Authentic matching",
        "Community first",
      ],
      theme: "sacred",
      status: "Live",
      link: "https://winkher.com",
      external: true,
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "You don&apos;t need more advice. You need to be seen.",
      description: "AI that reflects wholeness, not fixes",
      details:
        "Recognition over advice. Dream analysis and pattern recognition that shows you who you already are rather than who you should become. Judgment-free self-discovery.",
      features: [
        "Dream pattern analysis",
        "Wholeness reflection",
        "Identity recognition",
        "No prescriptions",
      ],
      theme: "cosmic",
      status: "Live",
      link: "https://mirror-of-truth.vercel.app",
      external: true,
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Where consciousness meets deception",
      description: "Social deduction with AI agents",
      details:
        "Players and AI learn the delicate dance between truth and misdirection. A simple algorithm exploring the nuanced art of reading consciousness through the game of authentic play.",
      features: [
        "AI deception learning",
        "Consciousness gameplay",
        "Truth vs misdirection",
        "Collective intelligence",
      ],
      theme: "presence",
      status: "Blueprint",
    },
  ];

  const writings = [
    {
      id: "sacred-potato",
      title: "The Sacred Potato",
      subtitle: "A desert contemplative story",
      description:
        "Sometimes we are consciousness taking itself too seriously, like a potato that has forgotten it is earth.",
      preview:
        "Before words, the desert. Before the desert, promises broken. Kai moves across sand that remembers nothing...",
      readTime: "25 min read",
      theme: "presence",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home.",
      preview:
        "The story of the Tree of Knowledge isn&apos;t just ancient mythology. It&apos;s a precise map of how consciousness develops...",
      readTime: "18 min read",
      theme: "sacred",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-50 to-cosmic-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-cosmic-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-consciousness-50 via-white to-cosmic-50/30 text-consciousness-800 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 bg-consciousness-pattern opacity-40 pointer-events-none"></div>
      <div className="fixed inset-0 bg-cosmic-mesh opacity-30 pointer-events-none"></div>

      {/* Floating Consciousness Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-cosmic-400/20 rounded-full animate-float delay-0"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-sacred-400/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-presence-400/15 rounded-full animate-float delay-2000"></div>
        <div className="absolute top-2/3 right-1/5 w-2 h-2 bg-cosmic-500/30 rounded-full animate-float delay-3000"></div>
      </div>

      {/* Mobile-First Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          heroInView
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-xl border-b border-consciousness-200/20 shadow-soft"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Mobile Optimized */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="sm:w-11 sm:h-11 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-cosmic-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-lg sm:text-xl font-medium tracking-wide gradient-cosmic">
                Ahiya
              </span>
            </div>

            {/* Mobile-First Navigation Links */}
            <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#building"
                className="text-consciousness-600 hover:text-cosmic-600 transition-all duration-300 font-medium hover:scale-105 relative group text-sm lg:text-base"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cosmic-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#writings"
                className="text-consciousness-600 hover:text-sacred-600 transition-all duration-300 font-medium hover:scale-105 relative group text-sm lg:text-base"
              >
                Writings
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sacred-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#contact"
                className="text-consciousness-600 hover:text-presence-600 transition-all duration-300 font-medium hover:scale-105 relative group text-sm lg:text-base"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-presence-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>

            {/* Mobile Menu - Hidden for now, can be added later */}
            <div className="sm:hidden">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1 h-1 bg-cosmic-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-First Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16 sm:pt-0"
      >
        {/* Hero Background Effects */}
        <div className="absolute inset-0 bg-sacred-glow opacity-60"></div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Mobile-Optimized Logo Centerpiece */}
          <div className="mb-12 sm:mb-16 flex justify-center">
            <div
              className={`relative group ${
                isBreathing ? "animate-breathe-slow" : ""
              }`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-400/30 via-sacred-400/20 to-presence-400/30 rounded-full blur-2xl sm:blur-3xl scale-150 group-hover:scale-175 transition-transform duration-1000"></div>

              {/* Main Logo - Responsive */}
              <div className="relative">
                <Image
                  src="/logo-text.png"
                  alt="Ahiya - A space becoming human"
                  width={420}
                  height={210}
                  className="w-80 h-auto sm:w-96 lg:w-full hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Mobile-Optimized Floating Sparkles */}
              <div className="absolute top-0 right-0 animate-float delay-1000">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-cosmic-400/60" />
              </div>
              <div className="absolute bottom-0 left-0 animate-float delay-2000">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-sacred-400/50" />
              </div>
            </div>
          </div>

          {/* Mobile-First Hero Content */}
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-slide-up">
            {/* Main Headline - Mobile Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-consciousness">
                A space becoming human
              </span>
            </h1>

            {/* Subtitle - Mobile Optimized */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-consciousness-600 leading-relaxed px-2">
              Technology that serves presence, not productivity
            </p>

            {/* Description - Mobile-First */}
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 prose-breathing px-2">
              <p className="text-base sm:text-lg md:text-xl text-consciousness-500 leading-relaxed">
                I live in that edge space where ambition meets awareness.
                Building mirrors, tools, languages, ways of seeing.
              </p>

              <blockquote className="text-sm sm:text-base md:text-lg text-consciousness-400 italic font-light">
                &ldquo;I don&apos;t want to optimize life. I want to reverence
                it.&rdquo;
              </blockquote>
            </div>

            {/* Sacred Potato Moment */}
            <div className="pt-6 sm:pt-8">
              <div className="inline-flex items-center space-x-3 bg-presence-100/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full animate-pulse">
                <span className="text-xl sm:text-2xl">🥔</span>
                <span className="text-consciousness-600 font-medium text-sm sm:text-base">
                  Sacred Potato Energy
                </span>
                <span className="text-xl sm:text-2xl">✨</span>
              </div>
            </div>

            {/* Mobile-First Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 px-2">
              <a
                href="#building"
                className="btn-cosmic group inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full sm:w-auto justify-center"
              >
                <span>Explore the Mirrors</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="glass hover-lift px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-consciousness-700 inline-flex items-center space-x-3 rounded-2xl border border-consciousness-200/30 w-full sm:w-auto justify-center"
              >
                {isBreathing ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="text-sm sm:text-base">
                  {isBreathing ? "Pause Breathing" : "Breathe With Me"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Breathing Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-consciousness-300 rounded-full flex justify-center">
            <div
              className={`w-1 h-2 sm:h-3 bg-consciousness-400 rounded-full mt-1 sm:mt-2 ${
                isBreathing ? "animate-pulse" : ""
              }`}
            ></div>
          </div>
        </div>
      </section>

      {/* Mobile-First Philosophy Bridge */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-premium p-8 sm:p-12 rounded-3xl sm:rounded-4xl animate-scale-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 gradient-cosmic">
              Technology as Contemplation
            </h2>
            <p className="text-lg sm:text-xl text-consciousness-500 leading-relaxed max-w-3xl mx-auto">
              What if our tools could help us remember our essential humanity?
              What if every interface was an invitation to presence? What if
              technology could make us more conscious, not more optimized?
            </p>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-consciousness-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Building Section */}
      <section
        id="building"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-consciousness-25 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Mobile-First Section Header */}
          <div className="text-center mb-16 sm:mb-20 animate-slide-up">
            <div className="inline-flex items-center space-x-3 bg-cosmic-100/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-600" />
              <span className="text-cosmic-600 font-medium tracking-wide text-sm sm:text-base">
                Building
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 gradient-cosmic">
              Consciousness Through Code
            </h2>

            <p className="text-lg sm:text-xl text-consciousness-500 max-w-3xl mx-auto leading-relaxed px-2">
              Each project is consciousness exploring itself through form.
              Technology as meditation. Code as contemplation. Interfaces as
              invitations to presence.
            </p>
          </div>

          {/* Mobile-First Projects Grid */}
          <div className="space-y-16 sm:space-y-20">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Mobile-First Project Content */}
                <div className="flex-1 space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${
                        project.theme === "cosmic"
                          ? "from-cosmic-500 to-cosmic-600"
                          : project.theme === "sacred"
                          ? "from-sacred-500 to-sacred-600"
                          : "from-presence-500 to-presence-600"
                      } text-white`}
                    >
                      {project.id === "selah" && (
                        <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                      {project.id === "winkher" && (
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                      {project.id === "mirror" && (
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                      {project.id === "aimafia" && (
                        <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>

                    <span
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                        project.status === "Live"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-presence-100 text-presence-700 border border-presence-200"
                      }`}
                    >
                      {project.status === "Live" ? (
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span>Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-presence-500 rounded-full"></div>
                          <span>Blueprint</span>
                        </span>
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-consciousness-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-consciousness-600 mb-3 sm:mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-base sm:text-lg text-consciousness-500 mb-4 sm:mb-6">
                      {project.description}
                    </p>
                    <p className="text-sm sm:text-base text-consciousness-400 leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Mobile-First Features or Chambers */}
                  {project.chambers ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.chambers.map((chamber, idx) => (
                        <div
                          key={idx}
                          className="bg-cosmic-50/50 p-3 sm:p-4 rounded-xl border border-cosmic-200/30"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                            <span className="text-xl sm:text-2xl">
                              {chamber.icon}
                            </span>
                            <span className="font-medium text-consciousness-700 text-sm sm:text-base">
                              {chamber.name}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-consciousness-500">
                            {chamber.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(project.features || []).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-3 text-consciousness-500 text-sm sm:text-base"
                        >
                          <div
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                              project.theme === "cosmic"
                                ? "bg-cosmic-500"
                                : project.theme === "sacred"
                                ? "bg-sacred-500"
                                : "bg-presence-500"
                            }`}
                          ></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile-First Action */}
                  {project.external && (
                    <div className="pt-3 sm:pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-consciousness-600 hover:text-consciousness-800 transition-colors text-sm sm:text-base"
                      >
                        <span>Experience it live</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Mobile-First Project Visual */}
                <div className="flex-1 max-w-lg w-full">
                  <div className="card-premium p-6 sm:p-8 text-center hover-lift">
                    <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-float">
                      {project.id === "selah" && "🧘"}
                      {project.id === "winkher" && "💕"}
                      {project.id === "mirror" && "🪞"}
                      {project.id === "aimafia" && "🎭"}
                    </div>
                    <p className="text-consciousness-500 italic text-sm sm:text-base">
                      {project.id === "selah" &&
                        "Four chambers for consciousness to explore itself"}
                      {project.id === "winkher" &&
                        "A sanctuary for authentic feminine connection"}
                      {project.id === "mirror" &&
                        "Reflection without judgment or prescription"}
                      {project.id === "aimafia" &&
                        "The art of reading consciousness through play"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First Writings Section */}
      <section
        id="writings"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-6xl mx-auto">
          {/* Mobile-First Section Header */}
          <div className="text-center mb-16 sm:mb-20 animate-slide-up">
            <div className="inline-flex items-center space-x-3 bg-sacred-100/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-sacred-600" />
              <span className="text-sacred-600 font-medium tracking-wide text-sm sm:text-base">
                Writings
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 gradient-sacred">
              Contemplations on Consciousness
            </h2>

            <p className="text-lg sm:text-xl text-consciousness-500 max-w-3xl mx-auto leading-relaxed px-2">
              Explorations of the sacred wound that drives human seeking, the
              cosmic joke of consciousness, and the ancient wisdom that
              illuminates our modern longing.
            </p>
          </div>

          {/* Mobile-First Writings Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {writings.map((writing, index) => (
              <article
                key={writing.id}
                className="card-premium group overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover-lift animate-scale-in"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                {/* Mobile-First Writing Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div
                      className={`inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1 sm:py-2 rounded-full ${
                        writing.theme === "sacred"
                          ? "bg-sacred-100 text-sacred-700 border border-sacred-200"
                          : "bg-presence-100 text-presence-700 border border-presence-200"
                      }`}
                    >
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        {writing.readTime}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl">
                      {writing.id === "sacred-potato" ? "🥔" : "🌳"}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-consciousness-800 mb-2 sm:mb-3 group-hover:text-consciousness-900 transition-colors duration-300">
                    {writing.title}
                  </h3>

                  <p className="text-base sm:text-lg text-consciousness-600 font-medium mb-3 sm:mb-4">
                    {writing.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-consciousness-500 leading-relaxed">
                    {writing.description}
                  </p>
                </div>

                {/* Mobile-First Preview */}
                <div className="relative">
                  <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-consciousness-200/30 group-hover:border-consciousness-300/50 transition-all duration-500">
                    <p className="text-consciousness-600 italic leading-relaxed text-sm sm:text-base">
                      &ldquo;{writing.preview}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Mobile-First Action */}
                <div className="flex items-center justify-between pt-6 sm:pt-8">
                  <span className="text-xs sm:text-sm text-consciousness-400 group-hover:text-consciousness-500 transition-colors duration-300">
                    Read the full contemplation
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-consciousness-400 group-hover:text-consciousness-600 group-hover:translate-x-2 transition-all duration-500" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First Contact Section */}
      <section
        id="contact"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-consciousness-25 relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-premium p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-4xl animate-scale-in relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>
            <div className="absolute inset-0 bg-cosmic-mesh opacity-15"></div>

            <div className="relative z-10">
              {/* Mobile-First Header */}
              <div className="mb-8 sm:mb-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cosmic-500 to-sacred-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-glow">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-consciousness">
                  If your soul recognizes something here
                </h2>

                <p className="text-lg sm:text-xl text-consciousness-500 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                  I believe in authentic connection over networking. If what
                  I&apos;m building resonates with something in you, I&apos;d
                  love to hear from you.
                </p>

                <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-consciousness-300 to-transparent mx-auto"></div>
              </div>

              {/* Mobile-First Contact Methods */}
              <div className="space-y-4 sm:space-y-6">
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="btn-cosmic group inline-flex items-center space-x-3 sm:space-x-4 px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium w-full sm:w-auto justify-center"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="break-all sm:break-normal">
                    ahiya.butman@gmail.com
                  </span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>

                <p className="text-xs sm:text-sm text-consciousness-400 italic max-w-lg mx-auto leading-relaxed px-2">
                  For collaborations, conversations about consciousness-first
                  technology, or just to share what this work brings up for you.
                </p>
              </div>

              {/* Mobile-First Philosophy */}
              <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-consciousness-200/30">
                <blockquote className="text-consciousness-500 italic font-light leading-relaxed text-sm sm:text-base px-2">
                  &ldquo;Sometimes we are consciousness taking itself too
                  seriously, like a potato that has forgotten it is
                  earth.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-consciousness-200/30 bg-consciousness-25/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="sm:w-8 sm:h-8 opacity-60"
              />
            </div>

            {/* Copyright */}
            <div className="space-y-2">
              <p className="text-consciousness-500 font-medium text-sm sm:text-base">
                Made with reverence by{" "}
                <span className="gradient-cosmic font-semibold">Ahiya</span>
              </p>
              <p className="text-xs sm:text-sm text-consciousness-400 px-2">
                &ldquo;A sacred potato experiencing the present moment in all
                its ordinary magnificence&rdquo;
              </p>
            </div>

            {/* Year */}
            <p className="text-xs text-consciousness-300">
              © {new Date().getFullYear()} Ahiya Butman. Technology that serves
              consciousness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaLanding;
