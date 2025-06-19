"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Mail,
  ExternalLink,
  FileText,
  ArrowRight,
  MessageCircle,
  Send,
  Play,
  Pause,
  Sparkles,
  Star,
} from "lucide-react";

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [isBreathing, setIsBreathing] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
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
          color: "from-consciousness-400 to-consciousness-600",
        },
        {
          name: "Contemplation",
          icon: "🌀",
          desc: "AI-synthesized daily questions",
          color: "from-cosmic-400 to-cosmic-600",
        },
        {
          name: "Creation",
          icon: "🎨",
          desc: "Co-creative expression studio",
          color: "from-sacred-400 to-sacred-600",
        },
        {
          name: "Being Seen",
          icon: "👁️",
          desc: "Ephemeral witnessing conversations",
          color: "from-presence-400 to-presence-600",
        },
      ],
      status: "Blueprint",
      icon: "🧘",
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "No men. No noise. Just us.",
      description: "The dating app for women who love women",
      details:
        "100% women-loving-women space with advanced safety protocols, community-driven matching, and spaces designed for authentic connection. Where intimacy meets technology.",
      status: "Live",
      link: "https://winkher.com",
      icon: "💕",
      external: true,
    },
    {
      id: "mirror",
      title: "Mirror of Truth",
      subtitle: "You don&apos;t need more advice. You need to be seen.",
      description: "AI that reflects wholeness, not fixes",
      details:
        "Recognition over advice. Dream analysis and pattern recognition that shows you who you already are rather than who you should become. Judgment-free self-discovery.",
      status: "Live",
      link: "https://mirror-of-truth.vercel.app",
      icon: "🪞",
      external: true,
    },
    {
      id: "aimafia",
      title: "AI Mafia",
      subtitle: "Where consciousness meets deception",
      description: "Social deduction with AI agents",
      details:
        "Players and AI learn the delicate dance between truth and misdirection. A simple algorithm exploring the nuanced art of reading consciousness through the game of authentic play.",
      status: "Blueprint",
      icon: "🎭",
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
      icon: "🥔",
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
      icon: "🌳",
    },
    {
      id: "edge-space",
      title: "Living in the Edge Space",
      subtitle: "Where ambition meets awareness",
      description:
        "What happens when you refuse to choose between worldly success and spiritual depth? You find the edge space.",
      preview:
        "Most people think spirituality means giving up ambition. Most ambitious people think consciousness is a luxury they can&apos;t afford...",
      readTime: "12 min read",
      icon: "⚡",
    },
  ];

  const journey = [
    {
      title: "The Optimization Years",
      period: "2018-2021",
      description:
        "Building productivity tools, chasing metrics, believing more was always better.",
      insight:
        "Learned that optimizing life often optimizes the life right out of it.",
    },
    {
      title: "The Great Unraveling",
      period: "2021-2022",
      description:
        "Everything I built felt hollow. Started questioning the whole premise.",
      insight: "Sometimes falling apart is actually falling together.",
    },
    {
      title: "The Sacred Potato Revelation",
      period: "2023",
      description:
        "Spent a month in the desert. Had a life-changing conversation with a potato.",
      insight:
        "We are consciousness taking itself too seriously, like a potato that has forgotten it is earth.",
    },
    {
      title: "Technology as Contemplation",
      period: "2024-Present",
      description:
        "Building tools that serve presence, not productivity. Making tech more human.",
      insight: "What if every interface was an invitation to presence?",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-900 to-cosmic-900 flex items-center justify-center">
        <div className="animate-gentle-pulse">
          <div className="w-16 h-16 bg-consciousness-400/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Subtle dotted texture */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(94, 200, 248, 0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-float"
                />
                <div className="absolute inset-0 bg-consciousness-400/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium gradient-text-primary">
                Ahiya
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#writings"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writings
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#connect"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Connect
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-consciousness-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="container-hero mobile-spacing-lg">
          {/* Logo Centerpiece */}
          <div className="text-center animate-fadeInUp">
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 gradient-primary blur-3xl opacity-30 scale-150 animate-gentle-pulse" />
              <div
                className={`relative transform hover:scale-105 transition-transform duration-700 ${
                  isBreathing ? "animate-heartbeat" : ""
                }`}
              >
                <Image
                  src="/logo-text.png"
                  alt="Ahiya"
                  width={420}
                  height={210}
                  className="mx-auto w-80 sm:w-96 lg:w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mobile-spacing-md animate-slideInLeft delay-200">
            <h1 className="display-xl gradient-text-primary mb-6">
              A space becoming human
            </h1>

            <div className="mobile-spacing-sm">
              <p className="body-xl text-gray-200 font-light max-w-3xl mx-auto">
                Technology that serves presence, not productivity
              </p>
              <p className="body-lg text-gray-300 max-w-2xl mx-auto">
                I live in that edge space where ambition meets awareness.
                Building mirrors, tools, languages, ways of seeing.
              </p>
            </div>

            {/* Sacred Potato Moment */}
            <div className="animate-slideInRight delay-300 py-8">
              <div className="inline-flex items-center space-x-3 ahiya-card-premium px-6 py-3 animate-float">
                <span className="text-2xl">🥔</span>
                <span className="text-gray-200 font-medium">
                  Sacred Potato Energy
                </span>
                <span className="text-2xl animate-heartbeat">✨</span>
              </div>
            </div>

            {/* Philosophy Quote */}
            <blockquote className="body-lg text-gray-300 italic font-light max-w-3xl mx-auto animate-fadeInUp delay-500">
              &ldquo;I don&apos;t want to optimize life. I want to reverence
              it.&rdquo;
            </blockquote>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-scaleIn delay-700">
              <a
                href="#building"
                className="ahiya-button-premium group inline-flex items-center space-x-3 hover-lift-premium focus-premium"
              >
                <span>Explore the Mirrors</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="glass-premium hover-lift-premium px-8 py-4 body-lg font-medium text-gray-200 inline-flex items-center space-x-3 focus-premium"
              >
                {isBreathing ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>
                  {isBreathing ? "Pause Breathing" : "Breathe With Me"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center">
            <div
              className={`w-1 h-3 bg-consciousness-400 rounded-full mt-2 ${
                isBreathing ? "animate-gentle-pulse" : ""
              }`}
            ></div>
          </div>
        </div>
      </section>

      {/* Philosophy Bridge */}
      <section className="py-20">
        <div className="container-content">
          <div className="text-center">
            <div className="ahiya-card-premium hover-lift-premium animate-scaleIn">
              <h2 className="display-md gradient-text-primary mb-6">
                Technology as Contemplation
              </h2>
              <p className="body-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mobile-spacing-sm">
                What if our tools could help us remember our essential humanity?
                What if every interface was an invitation to presence? What if
                technology could make us more conscious, not more optimized?
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-consciousness-400 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Section */}
      <section id="building" className="py-32">
        <div className="container-content">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wide">
                Building
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-8">
              Consciousness Through Code
            </h2>

            <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Each project is consciousness exploring itself through form.
              Technology as meditation. Code as contemplation. Interfaces as
              invitations to presence.
            </p>
          </div>

          {/* Projects */}
          <div className="mobile-spacing-lg">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-12 items-center animate-slideInLeft delay-${
                  index * 200
                } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Project Content */}
                <div className="flex-1 mobile-spacing-md">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-consciousness-500 to-consciousness-600 text-white">
                      <span className="text-2xl">{project.icon}</span>
                    </div>

                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        project.status === "Live"
                          ? "success-premium"
                          : "glass-premium"
                      }`}
                    >
                      {project.status === "Live" ? (
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-gentle-pulse"></div>
                          <span>Live</span>
                        </span>
                      ) : (
                        <span>Blueprint</span>
                      )}
                    </span>
                  </div>

                  <div className="mobile-spacing-sm">
                    <h3 className="heading-xl text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="heading-md text-gray-200 mb-4">
                      {project.subtitle}
                    </p>
                    <p className="body-lg text-gray-300 mb-6">
                      {project.description}
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Chambers for Selah */}
                  {project.chambers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {project.chambers.map((chamber, idx) => (
                        <div
                          key={idx}
                          className="ahiya-card-premium hover-lift-premium"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{chamber.icon}</span>
                            <span className="font-medium text-white">
                              {chamber.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {chamber.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* External Link */}
                  {project.external && (
                    <div className="pt-6">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-consciousness-400 hover:text-consciousness-300 transition-colors"
                      >
                        <span>Experience it live</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Project Visual */}
                <div className="flex-1 max-w-lg">
                  <div className="ahiya-card-premium text-center hover-lift-premium">
                    <div className="text-8xl mb-6 animate-float">
                      {project.icon}
                    </div>
                    <p className="text-gray-400 italic">
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

      {/* Writings Section */}
      <section id="writings" className="py-32">
        <div className="container-content">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-8">
              <FileText className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wide">
                Writings
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-8">
              Contemplations on Consciousness
            </h2>

            <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explorations of the sacred wound that drives human seeking, the
              cosmic joke of consciousness, and the ancient wisdom that
              illuminates our modern longing.
            </p>
          </div>

          {/* Writings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writings.map((writing, index) => (
              <article
                key={writing.id}
                className="ahiya-card-premium group hover-lift-premium animate-scaleIn"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mobile-spacing-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="glass-premium px-3 py-1">
                      <span className="text-xs text-consciousness-400 font-medium">
                        {writing.readTime}
                      </span>
                    </div>
                    <div className="text-3xl animate-float">{writing.icon}</div>
                  </div>

                  <h3 className="heading-lg text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                    {writing.title}
                  </h3>

                  <p className="body-md text-gray-200 font-medium mb-4">
                    {writing.subtitle}
                  </p>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {writing.description}
                  </p>

                  {/* Preview */}
                  <div className="glass-card p-4 mb-6">
                    <p className="text-gray-300 italic text-sm leading-relaxed">
                      &ldquo;{writing.preview}&rdquo;
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Read the full contemplation
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-32">
        <div className="container-content">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wide">
                Journey
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-8">
              How I Got Here
            </h2>

            <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From optimization obsession to sacred potato wisdom. Every great
              transformation begins with a crisis of meaning.
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="max-w-4xl mx-auto">
            {journey.map((phase, index) => (
              <div
                key={phase.title}
                className={`flex flex-col md:flex-row gap-8 mb-16 animate-slideInLeft delay-${
                  index * 200
                }`}
              >
                <div className="md:w-1/3">
                  <div className="glass-premium px-4 py-2 inline-block mb-4">
                    <span className="text-consciousness-400 font-medium text-sm">
                      {phase.period}
                    </span>
                  </div>
                  <h3 className="heading-lg text-white mb-2">{phase.title}</h3>
                </div>

                <div className="md:w-2/3">
                  <div className="ahiya-card-premium hover-lift-premium">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {phase.description}
                    </p>
                    <div className="glass-card p-4">
                      <p className="text-consciousness-400 italic">
                        💡 {phase.insight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-32">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>

            <div className="relative z-10 mobile-spacing-lg">
              {/* Header */}
              <div className="mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-consciousness-500 to-consciousness-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-gentle-pulse">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>

                <h2 className="display-md gradient-text-primary mb-6">
                  If your soul recognizes something here
                </h2>

                <p className="body-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  I believe in authentic connection over networking. If what
                  I&apos;m building resonates with something in you, I&apos;d
                  love to hear from you.
                </p>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-consciousness-400 to-transparent mx-auto"></div>
              </div>

              {/* Contact */}
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium mb-6"
              >
                <Mail className="w-6 h-6" />
                <span>ahiya.butman@gmail.com</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <p className="text-gray-400 italic max-w-2xl mx-auto leading-relaxed">
                For collaborations, conversations about consciousness-first
                technology, or just to share what this work brings up for you.
              </p>

              {/* Sacred Potato Wisdom */}
              <div className="mt-16 pt-12 border-t border-gray-700/30">
                <blockquote className="text-gray-300 italic leading-relaxed">
                  &ldquo;Sometimes we are consciousness taking itself too
                  seriously, like a potato that has forgotten it is
                  earth.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800/30">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={32}
              height={32}
              className="opacity-60 animate-float"
            />
          </div>

          <p className="text-gray-400">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-text-primary">
              Ahiya
            </span>
          </p>

          <p className="text-sm text-gray-500">
            &ldquo;A sacred potato experiencing the present moment in all its
            ordinary magnificence&rdquo;
          </p>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Ahiya Butman. Technology that serves
            consciousness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaLanding;
