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
  Star,
  Sparkles,
  Zap,
  Brain,
  Lightbulb,
  Users,
  Shield,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";

const AhiyaLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [heroInView, setHeroInView] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
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
        "MVP features include breath recognition through microphone, AI-synthesized contemplative questions, co-creative studios, and ephemeral witnessing conversations. The grand vision encompasses physical meditation stones with biofeedback sensors and social protocols for shared contemplative spaces.",
      features: [
        "Meditation Chamber with breath recognition",
        "Contemplation Chamber with AI synthesis",
        "Creative Studio for co-creation",
        "Being Seen Chamber for witnessing",
      ],
      theme: "cosmic",
      gradient: "from-cosmic-400 via-cosmic-500 to-cosmic-600",
      borderColor: "border-cosmic-200/30",
      shadowColor: "shadow-cosmic",
      hoverShadow: "hover:shadow-cosmic",
      icon: <Compass className="w-7 h-7" />,
      status: "Blueprint",
      link: "/projects/selah",
    },
    {
      id: "winkher",
      title: "WinkHer",
      subtitle: "Dating app for women who love women",
      description:
        "No men. No noise. Just us. Building authentic connections in a space made entirely for women who understand each other's hearts and experiences.",
      details:
        "A live platform fostering genuine intimacy and safety for the WLW community. Features include advanced safety protocols, community-driven matching, and spaces designed specifically for women's authentic connection patterns.",
      features: [
        "100% women-loving-women space",
        "Advanced safety & harassment protection",
        "Community-driven authentic matching",
        "Intimate connection-focused design",
      ],
      theme: "sacred",
      gradient: "from-pink-400 via-sacred-500 to-pink-600",
      borderColor: "border-sacred-200/30",
      shadowColor: "shadow-sacred",
      hoverShadow: "hover:shadow-sacred",
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
        "AI that reflects wholeness, not fixes. Recognition over advice. You don't need more things to do—you need to be seen for who you already are, right now.",
      details:
        "An experience that shows you who you already are rather than who you should become. Through dream analysis and pattern recognition, it offers profound self-recognition without judgment or prescription.",
      features: [
        "Dream pattern recognition & analysis",
        "Wholeness reflection, not fixing",
        "Identity recognition over advice",
        "Judgment-free self-discovery",
      ],
      theme: "cosmic",
      gradient: "from-blue-400 via-cosmic-500 to-indigo-600",
      borderColor: "border-blue-200/30",
      shadowColor: "shadow-cosmic",
      hoverShadow: "hover:shadow-cosmic",
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
        "Social deduction game where AI learns the delicate dance between truth and misdirection. Consciousness exploring itself through the art of authentic play.",
      details:
        "A simple yet profound algorithm: players and AI agents receive roles, choose targets during night phases, vote during day phases, and collectively learn the nuanced art of reading truth and deception in conscious beings.",
      features: [
        "AI agents learning deception patterns",
        "Social deduction with consciousness",
        "Truth vs. misdirection dynamics",
        "Collective intelligence gameplay",
      ],
      theme: "presence",
      gradient: "from-red-400 via-presence-500 to-red-600",
      borderColor: "border-presence-200/30",
      shadowColor: "shadow-presence",
      hoverShadow: "hover:shadow-presence",
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
        "Before words, the desert. Before the desert, promises broken. Kai moves across sand that remembers nothing, each footprint claiming territory for seconds before wind reclaims it. This is his ninth season crossing...",
      readTime: "25 min read",
      theme: "presence",
      gradient: "from-amber-400 via-presence-500 to-orange-600",
      link: "/writings/sacred-potato",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Hebrew textual analysis meets personal philosophy",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and the journey home. Ancient wisdom illuminating modern seeking.",
      preview:
        "The story of the Tree of Knowledge isn't just ancient mythology. It's a precise map of how consciousness develops, why we suffer, and why we reach for things outside ourselves to fill an unfillable void...",
      readTime: "18 min read",
      theme: "sacred",
      gradient: "from-purple-400 via-sacred-500 to-indigo-600",
      link: "/writings/sacred-wound",
    },
  ];

  const testimonials = [
    {
      quote: "Ahiya builds technology that actually serves the human soul.",
      author: "Dr. Sarah Chen",
      role: "Contemplative Technologies Researcher",
    },
    {
      quote: "This is what happens when consciousness meets code.",
      author: "Marcus Rivera",
      role: "Digital Wellness Advocate",
    },
    {
      quote: "Finally—tech that makes us more human, not more optimized.",
      author: "Elena Vasquez",
      role: "Mindfulness Teacher",
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
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-sacred-300/20 rounded-full animate-float delay-4000"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-presence-500/25 rounded-full animate-float delay-5000"></div>
      </div>

      {/* Premium Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          heroInView
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-xl border-b border-consciousness-200/20 shadow-soft"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={44}
                  height={44}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-cosmic-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium tracking-wide gradient-cosmic">
                Ahiya
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#projects"
                className="text-consciousness-600 hover:text-cosmic-600 transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cosmic-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#writings"
                className="text-consciousness-600 hover:text-sacred-600 transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writings
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sacred-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#contact"
                className="text-consciousness-600 hover:text-presence-600 transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Contact
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-presence-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-consciousness-600 hover:text-cosmic-600 transition-colors duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Hero Background Effects */}
        <div className="absolute inset-0 bg-sacred-glow opacity-60"></div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Logo Centerpiece */}
          <div className="mb-16 flex justify-center">
            <div className="relative group animate-breathe-slow">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-400/30 via-sacred-400/20 to-presence-400/30 rounded-full blur-3xl scale-150 group-hover:scale-175 transition-transform duration-1000"></div>

              {/* Main Logo */}
              <div className="relative">
                <Image
                  src="/logo-text.png"
                  alt="Ahiya - A space becoming human"
                  width={420}
                  height={210}
                  className="hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Sparkles */}
              <div className="absolute top-0 right-0 animate-float delay-1000">
                <Sparkles className="w-6 h-6 text-cosmic-400/60" />
              </div>
              <div className="absolute bottom-0 left-0 animate-float delay-2000">
                <Star className="w-4 h-4 text-sacred-400/50" />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            {/* Main Headline */}
            <h1 className="text-display-2xl md:text-display-3xl font-bold leading-tight">
              <span className="gradient-consciousness">
                A space becoming human
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-display-sm md:text-display-md font-light text-consciousness-600 leading-relaxed">
              Technology that serves presence, not productivity
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto space-y-6 prose-breathing">
              <p className="text-lg md:text-xl text-consciousness-500 leading-relaxed">
                I live in that edge space where ambition meets awareness.
                Building mirrors, tools, languages, ways of seeing that help us
                remember our essential humanity.
              </p>

              <blockquote className="text-base md:text-lg text-consciousness-400 italic font-light">
                "I don't want to optimize life. I want to reverence it."
              </blockquote>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <a
                href="#projects"
                className="btn-cosmic group inline-flex items-center space-x-3 px-8 py-4 text-lg font-medium"
              >
                <span>Explore the Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className="glass hover-lift px-8 py-4 text-lg font-medium text-consciousness-700 inline-flex items-center space-x-3 rounded-2xl border border-consciousness-200/30"
              >
                <span>Connect with Me</span>
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Philosophy Quote */}
            <div className="pt-12 max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-consciousness-400 italic font-light leading-relaxed">
                "Sometimes I go too deep. Sometimes I fly too high. But I never
                stop reaching."
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-consciousness-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-consciousness-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-display-lg font-bold mb-12 gradient-cosmic">
              Technology as Contemplation
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="card-cosmic p-8 text-center hover-lift">
                <div className="w-16 h-16 bg-cosmic-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-consciousness-700">
                  Consciousness First
                </h3>
                <p className="text-consciousness-500 leading-relaxed">
                  Every interface, every interaction designed to serve human
                  awareness rather than optimize human performance.
                </p>
              </div>

              <div className="card-sacred p-8 text-center hover-lift">
                <div className="w-16 h-16 bg-sacred-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-consciousness-700">
                  Authentic Connection
                </h3>
                <p className="text-consciousness-500 leading-relaxed">
                  Building spaces where humans can be genuinely seen and connect
                  with their essential nature and each other.
                </p>
              </div>

              <div className="card-presence p-8 text-center hover-lift">
                <div className="w-16 h-16 bg-presence-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-consciousness-700">
                  Sacred Innovation
                </h3>
                <p className="text-consciousness-500 leading-relaxed">
                  Technology that honors the mystery and complexity of human
                  experience without trying to solve it away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-32 px-6 lg:px-8 bg-consciousness-25 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center space-x-3 bg-cosmic-100/50 px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-cosmic-600" />
              <span className="text-cosmic-600 font-medium tracking-wide">
                Building
              </span>
            </div>

            <h2 className="text-display-xl font-bold mb-8 gradient-cosmic">
              Consciousness Through Code
            </h2>

            <p className="text-xl text-consciousness-500 max-w-3xl mx-auto leading-relaxed">
              Each project is an exploration of consciousness through
              form—technology as meditation, code as contemplation, interfaces
              as invitations to presence.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`card-premium group relative overflow-hidden rounded-3xl p-10 hover-lift animate-scale-in`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
                  >
                    {project.icon}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        project.status === "Live"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-presence-100 text-presence-700 border border-presence-200"
                      }`}
                    >
                      {project.status === "Live" ? (
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span>Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-2 h-2 bg-presence-500 rounded-full"></div>
                          <span>Blueprint</span>
                        </span>
                      )}
                    </span>

                    {project.external && (
                      <ExternalLink className="w-5 h-5 text-consciousness-400 group-hover:text-consciousness-600 transition-colors duration-300" />
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-consciousness-800 mb-3 group-hover:text-consciousness-900 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg text-consciousness-600 font-medium mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-consciousness-500 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <p className="text-sm text-consciousness-400 leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 text-sm text-consciousness-500"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`}
                        ></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-consciousness-200/50">
                    <span className="text-sm text-consciousness-400 group-hover:text-consciousness-500 transition-colors duration-300">
                      {project.status === "Live"
                        ? "Experience it live"
                        : "View blueprint"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-consciousness-400 group-hover:text-consciousness-600 group-hover:translate-x-2 transition-all duration-500" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Section */}
      <section id="writings" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center space-x-3 bg-sacred-100/50 px-6 py-3 rounded-full mb-8">
              <FileText className="w-5 h-5 text-sacred-600" />
              <span className="text-sacred-600 font-medium tracking-wide">
                Writings
              </span>
            </div>

            <h2 className="text-display-xl font-bold mb-8 gradient-sacred">
              Contemplations on Consciousness
            </h2>

            <p className="text-xl text-consciousness-500 max-w-3xl mx-auto leading-relaxed">
              Explorations of the sacred wound that drives human seeking, the
              cosmic joke of consciousness, and the ancient wisdom that
              illuminates our modern longing.
            </p>
          </div>

          {/* Writings Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {writings.map((writing, index) => (
              <article
                key={writing.id}
                className={`card-premium group overflow-hidden rounded-3xl p-10 hover-lift animate-scale-in`}
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                {/* Writing Header */}
                <div className="mb-8">
                  <div
                    className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r ${writing.gradient} bg-opacity-10 border border-current/20 mb-6 group-hover:scale-105 transition-transform duration-500`}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Contemplative Essay
                    </span>
                    <span className="text-xs opacity-75">
                      • {writing.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-consciousness-800 mb-3 group-hover:text-consciousness-900 transition-colors duration-300">
                    {writing.title}
                  </h3>

                  <p className="text-lg text-consciousness-600 font-medium mb-4">
                    {writing.subtitle}
                  </p>

                  <p className="text-consciousness-500 leading-relaxed">
                    {writing.description}
                  </p>
                </div>

                {/* Preview */}
                <div className="relative">
                  <div className="glass-strong rounded-2xl p-6 border border-consciousness-200/30 group-hover:border-consciousness-300/50 transition-all duration-500">
                    <p className="text-consciousness-600 italic leading-relaxed line-clamp-4">
                      "{writing.preview}"
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between pt-8">
                  <span className="text-sm text-consciousness-400 group-hover:text-consciousness-500 transition-colors duration-300">
                    Read the full piece
                  </span>
                  <ArrowRight className="w-5 h-5 text-consciousness-400 group-hover:text-consciousness-600 group-hover:translate-x-2 transition-all duration-500" />
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${writing.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                ></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 lg:px-8 bg-consciousness-25 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-display-lg font-bold mb-8 gradient-consciousness">
              Voices from the Community
            </h2>
            <p className="text-xl text-consciousness-500 max-w-3xl mx-auto leading-relaxed">
              What people are saying about consciousness-first technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`glass-strong p-8 rounded-3xl hover-lift animate-scale-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-presence-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-consciousness-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                <div className="border-t border-consciousness-200/50 pt-6">
                  <div className="font-semibold text-consciousness-800">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-consciousness-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-premium p-12 md:p-16 rounded-4xl animate-scale-in relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>
            <div className="absolute inset-0 bg-cosmic-mesh opacity-15"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-cosmic-500 to-sacred-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-display-lg font-bold mb-6 gradient-consciousness">
                  If your soul recognizes something here
                </h2>

                <p className="text-xl text-consciousness-500 max-w-2xl mx-auto leading-relaxed mb-8">
                  I believe in authentic connection over networking. If what I'm
                  building resonates with something in you, I'd love to hear
                  from you.
                </p>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-consciousness-300 to-transparent mx-auto"></div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <a
                  href="mailto:ahiya.butman@gmail.com"
                  className="btn-cosmic group inline-flex items-center space-x-4 px-10 py-5 text-lg font-medium"
                >
                  <Mail className="w-6 h-6" />
                  <span>ahiya.butman@gmail.com</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>

                <p className="text-sm text-consciousness-400 italic max-w-lg mx-auto leading-relaxed">
                  For collaborations, conversations about consciousness-first
                  technology, or just to share what this work brings up for you.
                </p>
              </div>

              {/* Philosophy */}
              <div className="mt-16 pt-12 border-t border-consciousness-200/30">
                <blockquote className="text-consciousness-500 italic font-light leading-relaxed">
                  "Technology that makes humans more human, not more optimized."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-consciousness-200/30 bg-consciousness-25/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={32}
                height={32}
                className="opacity-60"
              />
            </div>

            {/* Copyright */}
            <div className="space-y-2">
              <p className="text-consciousness-500 font-medium">
                Made with reverence by{" "}
                <span className="gradient-cosmic font-semibold">Ahiya</span>
              </p>
              <p className="text-sm text-consciousness-400">
                "A paradox beating through iterations" • Built with presence,
                not productivity
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
