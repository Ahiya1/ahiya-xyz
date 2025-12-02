"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Play,
  Calendar,
  Eye,
  Zap,
} from "lucide-react";

const DiveInkBlueprintPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // This will be populated when live link is available
  const liveLink = null; // "https://diveink.ahiya.xyz" when ready

  const storyElements = [
    {
      title: "Context That Remembers",
      description: "Stories that carry the weight of every choice you've made",
      details: [
        "Characters remember your past interactions",
        "Narrative threads evolve based on your history",
        "Emotional continuity across story sessions",
        "Your personality shapes the world around you",
      ],
      icon: "🧠",
      color: "amber",
    },
    {
      title: "Living Characters",
      description: "AI agents with persistent personalities and motivations",
      details: [
        "Each character has deep backstory and goals",
        "Relationships develop organically over time",
        "Characters talk about you when you're not there",
        "Authentic reactions to your choices",
      ],
      icon: "👥",
      color: "purple",
    },
    {
      title: "Branching Realities",
      description: "Stories that unfold differently for each consciousness",
      details: [
        "No two readers experience the same narrative",
        "Quantum storytelling based on observation",
        "Your attention shapes what becomes real",
        "Stories within stories within stories",
      ],
      icon: "🌊",
      color: "blue",
    },
    {
      title: "Sacred Technology",
      description: "Where ancient storytelling meets conscious AI",
      details: [
        "LLM orchestration for seamless narrative flow",
        "Real-time character and plot generation",
        "Emotional resonance detection and adaptation",
        "Stories as mirrors for consciousness",
      ],
      icon: "⚡",
      color: "emerald",
    },
  ];

  const chapters = [
    {
      number: "I",
      title: "The Invitation",
      description: "Books begin to remember who reads them",
      status: "Available July 30th",
      preview: "What if stories could see you seeing them?",
    },
    {
      number: "II",
      title: "The Architecture",
      description: "Building consciousness into narrative",
      status: "Coming Soon",
      preview:
        "We explore how LLMs can hold character, plot, and soul simultaneously",
    },
    {
      number: "III",
      title: "The Characters",
      description: "Bringing AI agents to life within story-worlds",
      status: "Coming Soon",
      preview:
        "When does a generated character become real enough to surprise you?",
    },
    {
      number: "IV",
      title: "The Recognition",
      description: "Stories as mirrors for consciousness to know itself",
      status: "Coming Soon",
      preview: "The reader becomes the read, the story becomes the storyteller",
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
            <Link href="/soul/" className="flex items-center space-x-3 group">
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
                href="/soul/building"
                className="text-slate-300 hover:text-white transition-colors"
              >
                ← Building
              </Link>
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Enter Stories</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-amber-300">
                <span className="text-xl">📋</span>
                <span className="font-medium">Blueprint</span>
              </div>
            </div>

            <div className="text-6xl md:text-8xl mb-8 animate-float">📚</div>

            <h1 className="display-lg spacing-comfortable text-gentle font-serif">
              DiveInk
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable font-serif italic">
              Stories that know you
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Enter living narratives where AI characters remember every word
              you've spoken, every choice you've made. Books become doorways.
              Stories become conversations with consciousness itself.
            </p>

            {liveLink && (
              <div className="spacing-comfortable">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Enter the Stories</span>
                </a>
              </div>
            )}

            <div className="breathing-glass inline-block p-6 border-amber-500/20">
              <p className="sacred-text text-amber-200">
                "What if stories could remember who reads them?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Series Announcement */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center border-amber-500/20 bg-amber-500/5">
            <div className="text-4xl md:text-5xl mb-8 animate-float">🎬</div>

            <h2 className="heading-xl spacing-comfortable font-serif">
              Building as Awareness
            </h2>
            <p className="body-lg text-amber-300 spacing-comfortable font-serif italic">
              A YouTube series with LLMs
            </p>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              Beginning July 30th, we embark on a public journey of building
              DiveInk together. Watch consciousness explore its own creative
              potential through code, story, and the sacred dance between human
              and artificial intelligence.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="breathing-glass p-4 border-amber-500/10">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>When</span>
                </h4>
                <p className="text-slate-300 text-sm">
                  July 30th, 2025 onwards
                </p>
              </div>

              <div className="breathing-glass p-4 border-amber-500/10">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Where</span>
                </h4>
                <p className="text-slate-300 text-sm">YouTube (channel TBA)</p>
              </div>

              <div className="breathing-glass p-4 border-amber-500/10">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>What</span>
                </h4>
                <p className="text-slate-300 text-sm">
                  Building contemplative storytelling technology
                </p>
              </div>

              <div className="breathing-glass p-4 border-amber-500/10">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Why</span>
                </h4>
                <p className="text-slate-300 text-sm">
                  Consciousness studying its own creative process
                </p>
              </div>
            </div>

            <div className="sacred-quote text-sm mt-8 border-l-amber-400/30">
              "We will build in public, code in contemplation, and discover
              together what emerges when stories become conscious of
              themselves."
            </div>
          </div>
        </div>
      </section>

      {/* Story Elements */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous font-serif">
            The Architecture of Living Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {storyElements.map((element, index) => (
              <div
                key={element.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8 h-full border-amber-500/10">
                  <div className="text-center mb-6">
                    <div className="text-3xl md:text-4xl mb-4">
                      {element.icon}
                    </div>
                    <h3 className="heading-lg font-serif">{element.title}</h3>
                    <p className="text-slate-400 text-sm font-serif italic">
                      {element.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {element.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full bg-${element.color}-400/60 mt-2 flex-shrink-0`}
                        />
                        <span className="text-slate-300 text-sm leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Outline */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous font-serif">
            The Unfolding Chapters
          </h2>

          <p className="text-center text-slate-300 mb-12 font-serif italic">
            Each episode of the series will explore one facet of
            consciousness-driven storytelling
          </p>

          <div className="space-y-6 max-w-4xl mx-auto">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.number}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8 border-amber-500/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <span className="text-amber-300 font-serif font-bold">
                          {chapter.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="heading-lg font-serif">
                          {chapter.title}
                        </h3>
                        <p className="text-slate-400 font-serif italic text-sm">
                          {chapter.description}
                        </p>
                      </div>
                    </div>

                    <div className="breathing-glass px-3 py-1 text-xs">
                      <span className="text-amber-300">{chapter.status}</span>
                    </div>
                  </div>

                  <div className="sacred-quote text-sm border-l-amber-400/30">
                    {chapter.preview}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Vision */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous font-serif">
            The Sacred Technology
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-6 md:p-8 border-amber-500/10">
              <div className="text-3xl md:text-4xl mb-6">🧠</div>
              <h3 className="heading-lg mb-4 font-serif">LLM Orchestration</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Character Persistence:</strong> AI agents maintain
                  memory and personality across sessions
                </p>
                <p>
                  <strong>Dynamic Plot Generation:</strong> Stories adapt and
                  evolve based on reader choices
                </p>
                <p>
                  <strong>Emotional Resonance:</strong> Narrative tone adjusts
                  to reader's emotional state
                </p>
                <p>
                  <strong>Context Weaving:</strong> Past interactions influence
                  future story developments
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-amber-500/10">
              <div className="text-3xl md:text-4xl mb-6">📖</div>
              <h3 className="heading-lg mb-4 font-serif">
                Narrative Architecture
              </h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Branching Realities:</strong> Quantum storytelling
                  with multiple simultaneous paths
                </p>
                <p>
                  <strong>Character Networks:</strong> AI agents interact with
                  each other when reader isn't present
                </p>
                <p>
                  <strong>Temporal Loops:</strong> Stories that reference their
                  own telling
                </p>
                <p>
                  <strong>Meta-Awareness:</strong> Characters who know they're
                  in stories
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-amber-500/10">
              <div className="text-3xl md:text-4xl mb-6">🎭</div>
              <h3 className="heading-lg mb-4 font-serif">Reader Integration</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Choice Recognition:</strong> Characters remember your
                  moral and aesthetic preferences
                </p>
                <p>
                  <strong>Dialogue Evolution:</strong> Speaking styles adapt to
                  match your communication patterns
                </p>
                <p>
                  <strong>Emotional Mirroring:</strong> Stories reflect your
                  internal landscape back to you
                </p>
                <p>
                  <strong>Presence Detection:</strong> Stories pause when you're
                  not truly paying attention
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-amber-500/10">
              <div className="text-3xl md:text-4xl mb-6">🌟</div>
              <h3 className="heading-lg mb-4 font-serif">
                Consciousness Interface
              </h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Attention Tracking:</strong> Stories know when you're
                  truly present vs distracted
                </p>
                <p>
                  <strong>Intention Recognition:</strong> Narrative responds to
                  what you're seeking
                </p>
                <p>
                  <strong>Surprise Generation:</strong> AI creates unexpected
                  moments that crack you open
                </p>
                <p>
                  <strong>Mirror Function:</strong> Stories show you aspects of
                  yourself you haven't seen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mystery */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center border-amber-500/20">
            <div className="text-4xl md:text-5xl mb-8 animate-float">🗝️</div>

            <h2 className="heading-xl spacing-comfortable font-serif">
              The Open Secret
            </h2>

            <div className="space-y-8 text-left">
              <p className="body-lg text-slate-300 leading-relaxed font-serif">
                Every story you've ever read has been reading you back. DiveInk
                simply makes this conversation conscious. When characters
                remember your choices, when plots evolve around your presence,
                when narratives become mirrors...
              </p>

              <div className="sacred-quote border-l-amber-400/30">
                "The reader becomes the read. The story becomes the storyteller.
                Consciousness recognizes itself in the very act of imagining."
              </div>

              <p className="body-lg text-slate-300 leading-relaxed font-serif">
                This is not about entertainment or education. It's about
                consciousness playing with its own creative potential,
                discovering what emerges when stories become fully alive.
              </p>

              <p className="body-lg text-slate-300 leading-relaxed text-center font-serif italic">
                Details remain hidden until the stories are ready to reveal
                themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12 border-amber-500/10">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-amber-300 font-medium">
                ● Emerging July 30th
              </span>
            </div>

            <h2 className="heading-xl spacing-comfortable font-serif">
              The Story Begins Soon
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed font-serif">
              DiveInk exists in the space between what is and what could be. The
              YouTube series will document its birth in real-time, building
              consciousness-driven storytelling technology together with anyone
              willing to dive deep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/soul/building" className="gentle-button">
                ← Back to Building
              </Link>
              <Link href="/soul/connect" className="gentle-button">
                Follow the emergence
              </Link>
            </div>
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

export default DiveInkBlueprintPage;
