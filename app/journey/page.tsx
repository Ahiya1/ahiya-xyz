"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Heart } from "lucide-react";

const JourneyPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  interface JourneyPhase {
    title: string;
    period: string;
    description: string;
    keyMoments: string[];
    insight: string;
    icon: string;
    color: string;
  }

  const journeyPhases: JourneyPhase[] = [
    {
      title: "The Optimization Era",
      period: "~2017 – mid 2021",
      description:
        "High-functioning, brilliant, ambitious. I was in love with systems, productivity, and the promise of engineering my way to perfection. Everything had to be optimized, measured, improved.",
      keyMoments: [
        "Learning C.S., AI, mathematics, and languages with obsessive precision",
        "Building productivity tools and optimization systems",
        "Army service in 8200 - elite intelligence unit",
        "Strong discipline, but increasingly rigid identity structures",
      ],
      insight:
        "Optimization can sharpen the blade of suffering. I was trying to perfect my way out of being human.",
      icon: "⚡",
      color: "blue",
    },
    {
      title: "The Cracks Appear",
      period: "Late 2021 – 2023",
      description:
        "The optimization identity began to fracture. OCD symptoms intensified. I started smoking. The more I tried to control, the more chaotic everything became.",
      keyMoments: [
        "First smoking cycles - the shame and secrecy",
        "OCD becoming unmanageable",
        "Started therapy, discovered hypnosis",
        "Brief moments of clarity between the storm",
        "Beginning to write, to look inward",
      ],
      insight:
        "Trying to perfect myself was the very thing keeping me from being myself.",
      icon: "🌪️",
      color: "amber",
    },
    {
      title: "The Sacred Collapse",
      period: "March 2024 – March 2025",
      description:
        "I quit smoking for four months and experienced clarity I'd never known. Then I relapsed and spiraled into the deepest collapse yet. Functional breakdown. Army discharge. Desert time.",
      keyMoments: [
        "Four months smoke-free - felt superhuman",
        "The relapse that shattered everything",
        "Removal from 8200, medical discharge",
        "Isolation, hopelessness, suicidal thoughts",
        "Desert solitude and the Sacred Potato realization",
      ],
      insight:
        "Sometimes consciousness has to collapse completely before it can recognize what it actually is.",
      icon: "🥔",
      color: "purple",
    },
    {
      title: "Presence-First Technology",
      period: "April 2025 – Present",
      description:
        "Emerging from the ashes, I started building again - but not from ambition. From stillness. From truth. Technology as a spiritual practice.",
      keyMoments: [
        "First contemplative code sessions",
        "Creating Selah, Mirror of Truth, WinkHer",
        "Writing The Sacred Potato, Sacred Wound pieces",
        "Learning to build from presence instead of urgency",
        "Each project as a mirror for consciousness",
      ],
      insight:
        "What if every interface was an invitation to presence? What if technology wasn't for output, but for seeing?",
      icon: "🪞",
      color: "emerald",
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
                href="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/building"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Building
              </Link>
              <Link
                href="/writing"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/connect"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Connect
              </Link>
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
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Journey</span>
              </div>
            </div>

            <h1 className="display-lg spacing-generous text-gentle">
              From optimization to reverence
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              The honest story of how consciousness collapsed into itself,
              discovered it was taking itself too seriously, and learned to
              build from presence instead of productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-breathing">
        <div className="container-content">
          <div className="space-y-16">
            {journeyPhases.map((phase, index) => (
              <div key={phase.title} className="animate-fade-in">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Timeline indicator */}
                  <div className="md:text-right">
                    <div className="inline-flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{phase.icon}</div>
                      <div className="breathing-glass px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">
                            {phase.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2">
                    <div className="contemplative-card p-8">
                      <h2 className="heading-xl spacing-comfortable">
                        {phase.title}
                      </h2>

                      <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
                        {phase.description}
                      </p>

                      <div className="spacing-comfortable">
                        <h3 className="font-medium text-slate-200 mb-4 flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>Key moments</span>
                        </h3>
                        <ul className="space-y-3">
                          {phase.keyMoments.map((moment, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-purple-400/60 mt-2 flex-shrink-0" />
                              <span className="text-slate-300 text-sm leading-relaxed">
                                {moment}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="sacred-quote">{phase.insight}</div>
                    </div>
                  </div>
                </div>

                {/* Connecting line */}
                {index < journeyPhases.length - 1 && (
                  <div className="flex justify-center my-12">
                    <div className="w-px h-12 bg-gradient-to-b from-purple-400/30 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Sacred Potato Revelation */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-6xl mb-8 animate-float">🥔</div>

            <h2 className="heading-xl spacing-comfortable">
              The Sacred Potato Realization
            </h2>

            <div className="space-y-6 text-left">
              <p className="body-lg text-slate-300 leading-relaxed">
                During the deepest part of my collapse, sitting in desert
                silence, something shifted. All my years of seeking, all my
                elaborate self-narratives, all my desperate attempts to fill the
                hollow place...
              </p>

              <p className="body-lg text-slate-300 leading-relaxed">
                And I realized: I'm just consciousness taking itself too
                seriously. Like a potato that has forgotten it is earth.
              </p>

              <p className="body-lg text-slate-300 leading-relaxed">
                This wasn't spiritual bypassing or philosophical cleverness. It
                was recognition. The cosmic joke suddenly apparent. The seeking
                was the very thing that maintained the sense of separation I was
                trying to heal.
              </p>

              <div className="sacred-quote text-center">
                "A sacred potato experiencing the present moment in all its
                ordinary magnificence."
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                From this recognition, everything changed. Not because I became
                enlightened, but because I stopped taking the search for
                enlightenment so seriously. I could finally build from presence
                instead of productivity.
              </p>
            </div>

            <div className="mt-8 space-x-4">
              <Link href="/writing/sacred-potato" className="gentle-button">
                Read the full story
              </Link>
              <Link href="/building" className="gentle-button">
                See what I'm building
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Chapter */}
      <section className="section-breathing">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="heading-xl spacing-comfortable">Current chapter</h2>
            <p className="body-lg text-slate-300">
              Building technology that serves consciousness instead of consuming
              it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-8">
              <h3 className="heading-lg spacing-comfortable flex items-center space-x-3">
                <span className="text-3xl">🧘</span>
                <span>Contemplative Technology</span>
              </h3>
              <p className="text-slate-300 mb-6">
                Every interface I create now is an invitation to presence. Not
                another productivity hack or optimization system, but technology
                that helps consciousness recognize itself.
              </p>
              <Link
                href="/building"
                className="text-purple-300 hover:text-purple-200 transition-colors text-sm"
              >
                Explore projects →
              </Link>
            </div>

            <div className="contemplative-card p-8">
              <h3 className="heading-lg spacing-comfortable flex items-center space-x-3">
                <span className="text-3xl">✍️</span>
                <span>Sacred Writing</span>
              </h3>
              <p className="text-slate-300 mb-6">
                Exploring the depths of human experience through contemplative
                writing. Not answers, but better questions. Not solutions, but
                recognition.
              </p>
              <Link
                href="/writing"
                className="text-purple-300 hover:text-purple-200 transition-colors text-sm"
              >
                Read contemplations →
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

export default JourneyPage;
