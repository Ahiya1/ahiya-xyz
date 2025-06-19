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
      title: "Room Entry",
      description: "Players join a room and receive their secret role",
      details: [
        "Simple room code entry system",
        "Automatic role assignment (Town/Imposter)",
        "AI agents also receive roles and instructions",
        "Brief explanation of your role and objectives",
      ],
      icon: "🚪",
      color: "blue",
    },
    {
      title: "Night Phase",
      description: "Imposters choose their target in darkness",
      details: [
        "If you're Imposter: Select a member to eliminate",
        "If you're Town: Wait while Imposters decide",
        "AI agents make their moves according to role",
        "Suspense builds as choices are made in secret",
      ],
      icon: "🌙",
      color: "purple",
    },
    {
      title: "Day Phase",
      description: "The elimination is revealed and discussion begins",
      details: [
        "Learn who was eliminated overnight",
        "Open discussion about suspicions",
        "AI agents participate in conversation",
        "Vote to eliminate a suspected Imposter",
      ],
      icon: "☀️",
      color: "amber",
    },
    {
      title: "Voting & Elimination",
      description: "Democracy in action with life-or-death stakes",
      details: [
        "Each player votes to eliminate someone",
        "Most votes determines who is eliminated",
        "Ties require players to defend themselves",
        "Eliminated player's role is revealed",
      ],
      icon: "🗳️",
      color: "red",
    },
  ];

  const designPrinciples = [
    {
      title: "Simplicity in Complexity",
      description: "Simple rules, profound emergent gameplay",
      details: [
        "Easy to learn core mechanics",
        "Complex social dynamics emerge naturally",
        "AI agents add unpredictability",
        "Focus on human psychology over complicated rules",
      ],
      icon: "🎯",
    },
    {
      title: "AI as Conscious Players",
      description: "AI agents aren't bots—they're participants",
      details: [
        "Each AI gets unique personality and strategy",
        "They form alliances and suspicions",
        "Respond to game events with human-like reasoning",
        "Create genuine uncertainty about who is human",
      ],
      icon: "🤖",
    },
    {
      title: "Truth Through Deception",
      description: "Learning about authenticity by playing with lies",
      details: [
        "Safe space to explore deception and truth",
        "Reveals how we communicate under pressure",
        "Shows patterns in trust and suspicion",
        "Playful meditation on collective awareness",
      ],
      icon: "🎭",
    },
    {
      title: "Consciousness Play",
      description: "What happens when minds try to read minds?",
      details: [
        "Human intuition vs AI reasoning",
        "Collective intelligence emerges from individual choices",
        "Testing the boundaries of authentic communication",
        "Mirror for how we perceive others' intentions",
      ],
      icon: "🧠",
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
                  <span>Play Game</span>
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
              <div className="flex items-center space-x-2 text-purple-300">
                <span className="text-xl">📋</span>
                <span className="font-medium">Blueprint</span>
              </div>
            </div>

            <div className="text-8xl mb-8 animate-float">🎭</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              AI Mafia
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              Social deduction with consciousness
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              A playful meditation on truth and deception where players and AI
              agents explore authentic communication under pressure. Simple
              rules, profound emergence.
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
                  <span>Play AI Mafia</span>
                </a>
              </div>
            )}

            <div className="breathing-glass inline-block p-6">
              <p className="sacred-text">
                "What can we learn about truth by playing with deception?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Flow */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Sacred Game Flow
          </h2>

          <div className="space-y-8">
            {gamePhases.map((phase, index) => (
              <div
                key={phase.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-8">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <span
                          className={`text-${phase.color}-400 font-mono text-sm`}
                        >
                          {index + 1}.
                        </span>
                        <h3 className="heading-lg">{phase.title}</h3>
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

      {/* Design Principles */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Design Philosophy
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {designPrinciples.map((principle, index) => (
              <div
                key={principle.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="contemplative-card p-8 h-full">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{principle.icon}</div>
                    <h3 className="heading-lg">{principle.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {principle.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {principle.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400/60 mt-2 flex-shrink-0" />
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

      {/* Technical Architecture */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technical Implementation
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🌐</div>
              <h3 className="heading-lg mb-4">Real-time Multiplayer</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>WebSocket:</strong> Real-time communication between
                  all players
                </p>
                <p>
                  <strong>Room Management:</strong> Simple room codes for quick
                  joining
                </p>
                <p>
                  <strong>State Sync:</strong> Game state synchronized across
                  all clients
                </p>
                <p>
                  <strong>Connection Handling:</strong> Graceful reconnection
                  and error recovery
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🤖</div>
              <h3 className="heading-lg mb-4">AI Agent System</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Claude/GPT Integration:</strong> AI agents with
                  distinct personalities
                </p>
                <p>
                  <strong>Dynamic Reasoning:</strong> Agents adapt strategy
                  based on game state
                </p>
                <p>
                  <strong>Natural Language:</strong> AI participants communicate
                  like humans
                </p>
                <p>
                  <strong>Role Playing:</strong> Each agent embodies their
                  assigned character
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🎮</div>
              <h3 className="heading-lg mb-4">Game Engine</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>State Machine:</strong> Clean phase transitions (night
                  → day → vote)
                </p>
                <p>
                  <strong>Role Assignment:</strong> Balanced random distribution
                  of roles
                </p>
                <p>
                  <strong>Voting System:</strong> Democratic elimination with
                  tie-breaking
                </p>
                <p>
                  <strong>Win Conditions:</strong> Town vs Imposter victory
                  detection
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🎨</div>
              <h3 className="heading-lg mb-4">User Experience</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Next.js Frontend:</strong> Smooth React-based
                  interface
                </p>
                <p>
                  <strong>Mobile Optimized:</strong> Touch-friendly controls for
                  all devices
                </p>
                <p>
                  <strong>Visual Feedback:</strong> Clear phase indicators and
                  role reveals
                </p>
                <p>
                  <strong>Accessibility:</strong> Screen reader friendly and
                  keyboard navigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Mechanics Deep Dive */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-5xl mb-8 animate-float">⚡</div>

            <h2 className="heading-xl spacing-comfortable">
              The Simple Algorithm
            </h2>

            <div className="space-y-8 text-left">
              <div className="sacred-quote">
                "The most profound games have the simplest rules. Complexity
                emerges from consciousness interacting with consciousness."
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">
                    Core Loop
                  </h4>
                  <ol className="space-y-2 text-slate-300 list-decimal list-inside">
                    <li>Players enter room, get roles</li>
                    <li>Night: Imposters choose target</li>
                    <li>Day: Reveal elimination, discuss</li>
                    <li>Vote: Democratic elimination</li>
                    <li>Check win condition, repeat</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">
                    AI Enhancement
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• AI agents get same roles as humans</li>
                    <li>• Each AI has unique personality prompts</li>
                    <li>• AIs participate in all discussions</li>
                    <li>• Humans can't tell who's AI initially</li>
                  </ul>
                </div>
              </div>

              <p className="body-lg text-slate-300 leading-relaxed text-center">
                The beauty isn't in the complexity—it's in watching
                consciousness try to read consciousness. Every accusation, every
                defense, every vote reveals something about how we perceive
                truth and deception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Potential Expansions */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Future Possibilities
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="contemplative-card p-6 text-center">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="heading-sm mb-3">Special Roles</h3>
              <p className="text-slate-400 text-sm">
                Detective, Medic, Seer—each with unique abilities that add
                strategic depth
              </p>
            </div>

            <div className="contemplative-card p-6 text-center">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="heading-sm mb-3">Themed Worlds</h3>
              <p className="text-slate-400 text-sm">
                Different settings and narratives while keeping the core social
                dynamics
              </p>
            </div>

            <div className="contemplative-card p-6 text-center">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="heading-sm mb-3">Consciousness Analytics</h3>
              <p className="text-slate-400 text-sm">
                Post-game insights about communication patterns and group
                dynamics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-purple-300 font-medium">
                ● Blueprint Stage
              </span>
            </div>

            <h2 className="heading-xl spacing-comfortable">
              Ready for Playful Development
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              The game design is crystallized and the technical approach is
              clear. AI Mafia awaits development as a space where consciousness
              can play with its own patterns of perception.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/building" className="gentle-button">
                ← Back to Building
              </Link>
              <Link href="/connect" className="gentle-button">
                Interested in playing?
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
