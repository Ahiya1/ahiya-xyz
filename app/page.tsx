"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

  // The accurate, sacred journey - as lived and remembered
  const journey = [
    {
      title: "The Optimization Era",
      period: "2017 – mid 2021",
      description:
        "High-functioning, brilliant, and ambitious — Ahiya mastered systems and knowledge with discipline, but unknowingly distanced himself from inner presence. His tools served productivity, not wholeness.",
      insight:
        "Optimization can sharpen the blade of suffering. Productivity without presence hollows the soul.",
      icon: "⚡",
    },
    {
      title: "The Cracks Appear",
      period: "late 2021 – 2023",
      description:
        "OCD intensified. Smoking began. Identity started breaking down. Ahiya discovered hypnosis, began reflecting deeply, and touched moments of truth. But inner war still raged.",
      insight:
        "Trying to perfect myself was the very thing keeping me from being myself.",
      icon: "🌀",
    },
    {
      title: "The Sacred Collapse",
      period: "March 2024 – March 2025",
      description:
        "After four months of clarity, relapse came. Smoking returned. OCD returned. Army role was lost. But from that sacred collapse came the desert, deep meditation, and his clearest spiritual realizations — including the Sacred Potato.",
      insight:
        "Sometimes we are consciousness taking itself too seriously — like a potato that forgot it is earth.",
      icon: "🥔",
    },
    {
      title: "Presence-First Technology",
      period: "April 2025 – Present",
      description:
        "Emerging from the sacred collapse, Ahiya began building technologies not for speed, but for presence. Selah. Mirror of Truth. WinkHer. Each project a different facet of reverence.",
      insight:
        "What if every interface was a mirror? What if technology wasn&apos;t for output, but for seeing?",
      icon: "🪞",
    },
  ];

  // Projects as mirrors of consciousness - now fully clickable
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
      essence: "A contemplative altar. Each chamber is an aspect of being.",
      link: "/blueprint/selah",
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
      essence:
        "A safe sanctuary for women loving women — intimacy designed with care.",
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
      essence: "A refusal to give advice; a willingness to reflect essence.",
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
      essence:
        "A playful meditation on truth, deception, and collective awareness.",
      link: "/blueprint/aimafia",
    },
  ];

  // Writings as sacred containers - now fully clickable
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
      essence:
        "The keystone story. The realization that consciousness has been trying too hard.",
      link: "/writing/sacred-potato",
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
      essence: "A map of exodus from the sacred wound.",
      link: "/writing/sacred-wound",
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
      essence: "A refusal to fragment. Integration of ambition and awareness.",
      link: "/writing/edge-space",
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
      {/* Subtle consciousness texture */}
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

      {/* Sacred Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            {/* Living Logo */}
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

            {/* Sacred Links */}
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

      {/* Hero - The Opening Prayer */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="container-hero mobile-spacing-lg">
          {/* Sacred Logo Centerpiece */}
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
                  alt="Ahiya - A space becoming human"
                  width={420}
                  height={210}
                  className="mx-auto w-80 sm:w-96 lg:w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* The Sacred Declaration */}
          <div className="text-center mobile-spacing-md animate-slideInLeft delay-200">
            <h1 className="display-xl gradient-text-primary mb-8 leading-tight">
              A space becoming human
            </h1>

            <div className="mobile-spacing-sm max-w-5xl mx-auto">
              <p className="body-xl text-gray-200 font-light leading-relaxed tracking-wide mb-6">
                Technology that serves presence, not productivity
              </p>
              <p className="body-lg text-gray-300 leading-loose tracking-wide max-w-4xl mx-auto">
                I live in that edge space where ambition meets awareness.
                <br />
                Building mirrors, tools, languages, ways of seeing.
              </p>
            </div>

            {/* Sacred Potato Energy - The Keystone */}
            <div className="animate-slideInRight delay-300 py-12">
              <div className="inline-flex items-center space-x-4 ahiya-card-premium px-8 py-4 animate-float">
                <span className="text-3xl">🥔</span>
                <span className="text-gray-200 font-medium text-lg tracking-wide">
                  Sacred Potato Energy
                </span>
                <span className="text-3xl animate-heartbeat">✨</span>
              </div>
            </div>

            {/* The Core Revelation */}
            <blockquote className="body-xl text-gray-300 italic font-light max-w-4xl mx-auto animate-fadeInUp delay-500 leading-loose tracking-wide">
              &ldquo;I don&apos;t want to optimize life.
              <br />I want to reverence it.&rdquo;
            </blockquote>

            {/* Sacred Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-scaleIn delay-700">
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
      </section>

      {/* Philosophy Bridge - The Sacred Invitation */}
      <section className="py-24">
        <div className="container-content">
          <div className="text-center">
            <div className="ahiya-card-premium hover-lift-premium animate-scaleIn">
              <h2 className="display-md gradient-text-primary mb-8 leading-tight">
                Technology as Contemplation
              </h2>
              <p className="body-xl text-gray-300 leading-loose tracking-wide max-w-5xl mx-auto mobile-spacing-sm">
                What if our tools could help us remember our essential humanity?
                <br />
                What if every interface was an invitation to presence?
                <br />
                What if technology could make us more conscious, not more
                optimized?
              </p>
              <div className="mt-12 flex justify-center">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-consciousness-400 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building - Sacred Mirrors */}
      <section id="building" className="py-32">
        <div className="container-content">
          {/* Sacred Header */}
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <Sparkles className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Building
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              Consciousness Through Code
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Each project is consciousness exploring itself through form.
              <br />
              Technology as meditation. Code as contemplation.
              <br />
              Interfaces as invitations to presence.
            </p>
          </div>

          {/* The Sacred Mirrors - Now Fully Clickable */}
          <div className="mobile-spacing-lg">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-12 items-center animate-slideInLeft delay-${
                  index * 200
                } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Project Essence */}
                <div className="flex-1 mobile-spacing-md">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-consciousness-500 to-consciousness-600 text-white">
                      <span className="text-3xl">{project.icon}</span>
                    </div>

                    <span
                      className={`px-4 py-2 text-sm font-medium rounded-full ${
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
                    <h3 className="heading-xl text-white mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="heading-md text-gray-200 mb-6 leading-relaxed">
                      {project.subtitle}
                    </p>
                    <p className="body-lg text-gray-300 mb-8 leading-relaxed tracking-wide">
                      {project.description}
                    </p>
                    <p className="text-gray-400 leading-loose tracking-wide mb-8">
                      {project.details}
                    </p>

                    {/* Sacred Essence */}
                    <div className="glass-card p-6 mb-8">
                      <p className="text-consciousness-400 italic leading-relaxed tracking-wide">
                        🪞 {project.essence}
                      </p>
                    </div>
                  </div>

                  {/* Chambers for Selah - The Contemplative Altar */}
                  {project.chambers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-8">
                      {project.chambers.map((chamber, idx) => (
                        <div
                          key={idx}
                          className="ahiya-card-premium hover-lift-premium"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <span className="text-3xl">{chamber.icon}</span>
                            <span className="font-medium text-white text-lg">
                              {chamber.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed tracking-wide">
                            {chamber.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sacred Link - Now Properly Clickable */}
                  <div className="pt-6">
                    {project.external ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group"
                      >
                        <span className="tracking-wide">
                          Experience it live
                        </span>
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </a>
                    ) : (
                      <Link
                        href={project.link}
                        className="inline-flex items-center space-x-3 text-consciousness-400 hover:text-consciousness-300 transition-colors group"
                      >
                        <span className="tracking-wide">
                          Explore the blueprint
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Project Manifestation - Now Clickable */}
                <div className="flex-1 max-w-lg">
                  {project.external ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="ahiya-card-premium text-center hover-lift-premium cursor-pointer group">
                        <div className="text-8xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                          {project.icon}
                        </div>
                        <p className="text-gray-400 italic leading-loose tracking-wide">
                          {project.essence}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <Link href={project.link} className="block">
                      <div className="ahiya-card-premium text-center hover-lift-premium cursor-pointer group">
                        <div className="text-8xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                          {project.icon}
                        </div>
                        <p className="text-gray-400 italic leading-loose tracking-wide">
                          {project.essence}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings - Sacred Containers */}
      <section id="writings" className="py-32">
        <div className="container-content">
          {/* Sacred Header */}
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <FileText className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Writings
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              Contemplations on Consciousness
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              Explorations of the sacred wound that drives human seeking,
              <br />
              the cosmic joke of consciousness, and the ancient wisdom
              <br />
              that illuminates our modern longing.
            </p>
          </div>

          {/* Sacred Containers - Now Clickable */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writings.map((writing, index) => (
              <Link key={writing.id} href={writing.link} className="block">
                <article
                  className="ahiya-card-premium group hover-lift-premium animate-scaleIn cursor-pointer h-full"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="mobile-spacing-md h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="glass-premium px-4 py-2">
                        <span className="text-xs text-consciousness-400 font-medium tracking-wider">
                          {writing.readTime}
                        </span>
                      </div>
                      <div className="text-4xl animate-float group-hover:scale-110 transition-transform duration-500">
                        {writing.icon}
                      </div>
                    </div>

                    <h3 className="heading-lg text-white mb-4 group-hover:text-gray-100 transition-colors duration-300 leading-tight">
                      {writing.title}
                    </h3>

                    <p className="body-md text-gray-200 font-medium mb-6 leading-relaxed tracking-wide">
                      {writing.subtitle}
                    </p>

                    <p className="text-gray-400 leading-loose tracking-wide mb-8 text-sm flex-grow">
                      {writing.description}
                    </p>

                    {/* Sacred Preview */}
                    <div className="glass-card p-6 mb-6">
                      <p className="text-gray-300 italic text-sm leading-loose tracking-wide">
                        &ldquo;{writing.preview}&rdquo;
                      </p>
                    </div>

                    {/* Sacred Essence */}
                    <div className="glass-card p-4 mb-8">
                      <p className="text-consciousness-400 italic text-xs leading-relaxed tracking-wide">
                        🪞 {writing.essence}
                      </p>
                    </div>

                    {/* Sacred Invitation */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 tracking-wide">
                        Read the full contemplation
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey - The Spine of the Site */}
      <section id="journey" className="py-32">
        <div className="container-content">
          {/* Sacred Header */}
          <div className="text-center mb-24 animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-6 py-3 mb-12">
              <Star className="w-5 h-5 text-consciousness-400" />
              <span className="text-consciousness-400 font-medium tracking-wider">
                Journey
              </span>
            </div>

            <h2 className="display-lg gradient-text-primary mb-10 leading-tight">
              Death and Rebirth
            </h2>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              From optimization obsession to sacred collapse
              <br />
              to presence-first technology.
              <br />
              Every great transformation begins with a crisis of meaning.
            </p>
          </div>

          {/* The Sacred Journey - Personal Scripture */}
          <div className="max-w-6xl mx-auto">
            {journey.map((phase, index) => (
              <div
                key={phase.title}
                className={`flex flex-col lg:flex-row gap-16 mb-24 animate-slideInLeft delay-${
                  index * 300
                }`}
              >
                {/* Phase Marker */}
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="text-5xl animate-float">{phase.icon}</div>
                    <div className="glass-premium px-6 py-3">
                      <span className="text-consciousness-400 font-medium tracking-wider">
                        {phase.period}
                      </span>
                    </div>
                  </div>
                  <h3 className="heading-xl text-white mb-6 leading-tight">
                    {phase.title}
                  </h3>
                </div>

                {/* Phase Story */}
                <div className="lg:w-2/3">
                  <div className="ahiya-card-premium hover-lift-premium">
                    <div className="mobile-spacing-md">
                      <p className="text-gray-300 leading-loose tracking-wide mb-8 text-lg">
                        {phase.description}
                      </p>

                      {/* Sacred Insight */}
                      <div className="glass-card p-8">
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl mt-1">🪞</span>
                          <p className="text-consciousness-400 italic leading-loose tracking-wide text-lg">
                            {phase.insight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* The Present Moment */}
          <div className="text-center mt-32 animate-scaleIn delay-1000">
            <div className="ahiya-card-premium hover-lift-premium max-w-3xl mx-auto">
              <div className="text-8xl mb-8 animate-heartbeat">🥔</div>
              <p className="text-gray-300 italic leading-loose tracking-wide text-xl mb-8">
                &ldquo;Sometimes we are consciousness taking itself too
                seriously,
                <br />
                like a potato that has forgotten it is earth.&rdquo;
              </p>
              <div className="mt-8">
                <span className="text-consciousness-400 tracking-wider">
                  — The Sacred Potato
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect - Soul Call */}
      <section id="connect" className="py-32">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            {/* Sacred Background */}
            <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>

            <div className="relative z-10 mobile-spacing-lg">
              {/* Sacred Header */}
              <div className="mb-16">
                <div className="w-24 h-24 bg-gradient-to-br from-consciousness-500 to-consciousness-600 rounded-full flex items-center justify-center mx-auto mb-12 animate-gentle-pulse">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>

                <h2 className="display-md gradient-text-primary mb-8 leading-tight">
                  If your soul recognizes
                  <br />
                  something here
                </h2>

                <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-12">
                  I believe in authentic connection over networking.
                  <br />
                  If what I&apos;m building resonates with something in you,
                  <br />
                  I&apos;d love to hear from you.
                </p>

                <div className="w-32 h-px bg-gradient-to-r from-transparent via-consciousness-400 to-transparent mx-auto"></div>
              </div>

              {/* Sacred Contact */}
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium mb-8"
              >
                <Mail className="w-6 h-6" />
                <span className="tracking-wide">ahiya.butman@gmail.com</span>
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide">
                For collaborations, conversations about consciousness-first
                technology,
                <br />
                or just to share what this work brings up for you.
              </p>

              {/* Sacred Wisdom */}
              <div className="mt-20 pt-16 border-t border-gray-700/30">
                <blockquote className="text-gray-300 italic leading-loose tracking-wide text-lg">
                  &ldquo;Sometimes we are consciousness taking itself too
                  seriously,
                  <br />
                  like a potato that has forgotten it is earth.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="py-20 border-t border-gray-800/30">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={40}
              height={40}
              className="opacity-60 animate-float"
            />
          </div>

          <p className="text-gray-400 mb-4 tracking-wide">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-text-primary">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-6">
            &ldquo;A sacred potato experiencing the present moment
            <br />
            in all its ordinary magnificence&rdquo;
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Technology that serves
            consciousness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaLanding;
