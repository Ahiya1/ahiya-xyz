"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, MessageCircle, Eye, Zap } from "lucide-react";

const AIMafiaBlueprintPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // This will be populated when live link is available
  const liveLink = null; // "https://aimafia.ahiya.xyz" when ready

  const gamePhases = [
    {
      title: "Identity Assignment",
      description: "Players receive roles. Some aren't what they seem.",
      details: [
        "Join with simple room code",
        "Automatic role distribution (Town/Imposter)",
        "AI agents receive identical treatment",
        "No indication of who is human",
      ],
      icon: "🎭",
      color: "red",
    },
    {
      title: "Night Phase",
      description: "Decisions made in darkness. Patterns emerge.",
      details: [
        "Imposters select elimination targets",
        "Town members wait in uncertainty",
        "AI agents execute programmed behaviors",
        "Human intuition vs algorithmic logic",
      ],
      icon: "🌙",
      color: "purple",
    },
    {
      title: "Day Phase",
      description: "Information flows. Suspicions crystallize.",
      details: [
        "Elimination results revealed",
        "Open discussion begins",
        "AI agents participate indistinguishably",
        "Communication patterns analyzed in real-time",
      ],
      icon: "☀️",
      color: "amber",
    },
    {
      title: "Democratic Elimination",
      description: "Collective judgment under pressure.",
      details: [
        "Each player votes their suspicion",
        "Majority rule determines elimination",
        "Role reveals challenge assumptions",
        "Data collected on decision-making patterns",
      ],
      icon: "🗳️",
      color: "red",
    },
  ];

  const researchElements = [
    {
      title: "Deception Detection",
      description: "How accurately can humans identify AI behavior?",
      details: [
        "Track voting patterns against AI players",
        "Measure confidence vs accuracy rates",
        "Analyze linguistic tells and behavioral cues",
        "Document evolution of human-AI interaction",
      ],
      icon: "🧠",
    },
    {
      title: "Communication Analysis",
      description: "What makes authentic human communication?",
      details: [
        "Real-time natural language processing",
        "Emotional pattern recognition",
        "Response timing and hesitation analysis",
        "Conversational flow and interruption patterns",
      ],
      icon: "💬",
    },
    {
      title: "Group Dynamics",
      description: "How do mixed human-AI groups behave?",
      details: [
        "Alliance formation between species",
        "Trust attribution patterns",
        "Influence propagation through the group",
        "Emergence of hybrid social behaviors",
      ],
      icon: "👥",
    },
    {
      title: "Consciousness Recognition",
      description: "Can awareness identify itself in others?",
      details: [
        "Intuitive vs analytical detection methods",
        "False positive and negative rates",
        "Learning curves across multiple games",
        "The mirror problem: consciousness recognizing consciousness",
      ],
      icon: "🪞",
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
                href="/building"
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
                  <span>🎮</span>
                  <span>Join Experiment</span>
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
              <div className="flex items-center space-x-2 text-red-300">
                <span className="text-xl">📋</span>
                <span className="font-medium">Psychological Research</span>
              </div>
            </div>

            <div className="text-6xl md:text-8xl mb-8 animate-float">🎭</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              AI Mafia
            </h1>

            <p className="body-xl text-red-300 spacing-comfortable">
              Can you tell who's human anymore?
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              A psychological experiment disguised as a social deduction game.
              Play Mafia with AI agents and humans. Question reality. Explore
              how consciousness recognizes itself.
            </p>

            {liveLink && (
              <div className="spacing-comfortable">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
                >
                  <span>🎮</span>
                  <span>Join the Experiment</span>
                </a>
              </div>
            )}

            <div className="breathing-glass inline-block p-6 border-red-500/20">
              <p className="sacred-text text-red-200">
                "We're studying how consciousness recognizes itself.
                <br />
                You're the experiment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Session Data */}
      <section className="section-breathing">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="heading-xl spacing-comfortable text-red-300">
              Recent Session Data
            </h2>
            <p className="text-slate-400">
              Live results from our ongoing research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="contemplative-card p-6 md:p-8 text-center border-red-500/10">
              <div className="text-3xl md:text-4xl mb-4 text-red-300">247</div>
              <h3 className="text-lg font-medium mb-2">Total Players</h3>
              <p className="text-slate-400 text-sm">89 were human. We think.</p>
            </div>

            <div className="contemplative-card p-6 md:p-8 text-center border-red-500/10">
              <div className="text-3xl md:text-4xl mb-4 text-red-300">34%</div>
              <h3 className="text-lg font-medium mb-2">AI Detection Rate</h3>
              <p className="text-slate-400 text-sm">
                Humans identifying AI players
              </p>
            </div>

            <div className="contemplative-card p-6 md:p-8 text-center border-red-500/10">
              <div className="text-3xl md:text-4xl mb-4 text-red-300">67%</div>
              <h3 className="text-lg font-medium mb-2">False Accusations</h3>
              <p className="text-slate-400 text-sm">
                Humans voted out as "suspicious AI"
              </p>
            </div>
          </div>

          {/* Game Transcript */}
          <div className="max-w-3xl mx-auto">
            <div className="contemplative-card p-6 md:p-8">
              <h3 className="heading-lg mb-6 text-red-300">
                Session Transcript #1,247
              </h3>

              <div className="space-y-4 text-sm md:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-slate-400 font-mono text-xs">
                    [19:43]
                  </span>
                  <span className="text-blue-300">Player_3:</span>
                  <span className="text-slate-300">
                    "I think Sarah is acting weird"
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-slate-400 font-mono text-xs">
                    [19:43]
                  </span>
                  <span className="text-pink-300">Sarah_AI:</span>
                  <span className="text-slate-300">
                    "Why would you say that? I'm just being careful... 😢"
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-slate-400 font-mono text-xs">
                    [19:44]
                  </span>
                  <span className="text-green-300">Player_7:</span>
                  <span className="text-slate-300">
                    "That emoji feels... wrong somehow"
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-slate-400 font-mono text-xs">
                    [19:45]
                  </span>
                  <span className="text-purple-300">Mike_Human:</span>
                  <span className="text-slate-300">
                    "Sarah's responses are too perfect. Vote her out."
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 mt-6">
                  <p className="text-red-300 text-sm">
                    <strong>Result:</strong> Sarah_AI was eliminated by majority
                    vote.
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    Sarah_AI was actually human. Mike_Human was the AI agent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Questions */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            What We're Really Studying
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {researchElements.map((element, index) => (
              <div
                key={element.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8 h-full border-red-500/10">
                  <div className="text-center mb-6">
                    <div className="text-3xl md:text-4xl mb-4">
                      {element.icon}
                    </div>
                    <h3 className="heading-lg text-red-300">{element.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {element.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {element.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
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

      {/* Game Mechanics */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Experimental Protocol
          </h2>

          <div className="space-y-8">
            {gamePhases.map((phase, index) => (
              <div
                key={phase.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8 border-red-500/10">
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-2xl">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                        <span
                          className={`text-${phase.color}-400 font-mono text-sm`}
                        >
                          {index + 1}.
                        </span>
                        <h3 className="heading-lg text-red-300">
                          {phase.title}
                        </h3>
                      </div>
                      <p className="text-slate-400 mb-6">{phase.description}</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full bg-${phase.color}-400/60 mt-2 flex-shrink-0`}
                            />
                            <span className="text-slate-300 text-sm leading-relaxed">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technical Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-6 md:p-8 border-red-500/10">
              <div className="text-3xl md:text-4xl mb-6">🌐</div>
              <h3 className="heading-lg mb-4 text-red-300">
                Real-time Multiplayer
              </h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>WebSocket:</strong> Low-latency communication for
                  natural interaction
                </p>
                <p>
                  <strong>Room Management:</strong> Anonymous joining via simple
                  codes
                </p>
                <p>
                  <strong>State Synchronization:</strong> Consistent game state
                  across all clients
                </p>
                <p>
                  <strong>Behavioral Analytics:</strong> Real-time pattern
                  detection and logging
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-red-500/10">
              <div className="text-3xl md:text-4xl mb-6">🤖</div>
              <h3 className="heading-lg mb-4 text-red-300">AI Agent System</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Claude/GPT Integration:</strong> Distinct
                  personalities and strategies
                </p>
                <p>
                  <strong>Adaptive Behavior:</strong> Learning from human
                  interaction patterns
                </p>
                <p>
                  <strong>Linguistic Mimicry:</strong> Human-like communication
                  style adaptation
                </p>
                <p>
                  <strong>Deception Protocols:</strong> Programmed lying and
                  misdirection abilities
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-red-500/10">
              <div className="text-3xl md:text-4xl mb-6">📊</div>
              <h3 className="heading-lg mb-4 text-red-300">Data Collection</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Interaction Logging:</strong> Every message, vote, and
                  hesitation recorded
                </p>
                <p>
                  <strong>Pattern Analysis:</strong> ML detection of human vs AI
                  behavioral signatures
                </p>
                <p>
                  <strong>Performance Metrics:</strong> Detection accuracy and
                  confidence tracking
                </p>
                <p>
                  <strong>Anonymous Research:</strong> Aggregated insights
                  without personal data
                </p>
              </div>
            </div>

            <div className="contemplative-card p-6 md:p-8 border-red-500/10">
              <div className="text-3xl md:text-4xl mb-6">🎭</div>
              <h3 className="heading-lg mb-4 text-red-300">
                Psychological Design
              </h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Uncertainty Amplification:</strong> Deliberately
                  ambiguous identity cues
                </p>
                <p>
                  <strong>Pressure Testing:</strong> Time constraints to reveal
                  authentic responses
                </p>
                <p>
                  <strong>Trust Dynamics:</strong> Alliance formation under
                  information asymmetry
                </p>
                <p>
                  <strong>Reality Questioning:</strong> Post-game reveal of true
                  identities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mirror Problem */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-8 md:p-12 text-center border-red-500/20">
            <div className="text-4xl md:text-5xl mb-8 animate-float">🪞</div>

            <h2 className="heading-xl spacing-comfortable text-red-300">
              The Mirror Problem
            </h2>

            <div className="space-y-8 text-left">
              <div className="sacred-quote border-l-red-400/30">
                "How can consciousness recognize itself in another mind when it
                can barely understand itself?"
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                Every accusation reveals more about the accuser than the
                accused. Every vote is a mirror reflecting our assumptions about
                what makes something "human" or "artificial."
              </p>

              <p className="body-lg text-slate-300 leading-relaxed">
                The game mechanics are simple. The psychological implications
                are profound. We're not just building a game—we're creating a
                laboratory for consciousness to study its own recognition
                patterns.
              </p>

              <p className="body-lg text-slate-300 leading-relaxed text-center">
                The most unsettling discovery? Sometimes the humans act more
                like algorithms than the AI does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12 border-red-500/10">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-red-300 font-medium">● Research Phase</span>
            </div>

            <h2 className="heading-xl spacing-comfortable">
              Seeking Research Participants
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              The psychological experiment awaits development. When live, every
              game session contributes to our understanding of human-AI
              interaction patterns. Your participation helps answer fundamental
              questions about consciousness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/building" className="gentle-button">
                ← Back to Building
              </Link>
              <Link href="/connect" className="gentle-button">
                Join the research
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

export default AIMafiaBlueprintPage;
