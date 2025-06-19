"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Homepage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
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
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <Image
                src="/logo-text.png"
                alt="Ahiya - Building technology that serves presence"
                width={420}
                height={210}
                className="mx-auto w-80 h-auto opacity-90"
                priority
              />
            </div>

            <h1 className="display-lg spacing-generous text-gentle">
              Building technology that serves presence,
              <br />
              not productivity
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              I'm someone who learned the hard way that optimization without
              awareness is just a beautiful way to miss the point entirely.
            </p>

            <div className="breathing-glass inline-block p-6 spacing-generous">
              <p className="sacred-text text-lg">
                "Sometimes we are consciousness taking itself too seriously,
                <br />
                like a potato that has forgotten it is earth."
              </p>
              <p className="text-sm text-slate-400 mt-2">— The Sacred Potato</p>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm About */}
      <section className="section-breathing">
        <div className="container-content">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="heading-xl spacing-comfortable">
                I don't want to optimize life.
                <br />I want to reverence it.
              </h2>

              <div className="space-y-6 text-slate-300">
                <p className="body-lg">
                  After years in the optimization rabbit hole — chasing perfect
                  productivity systems, trying to engineer away my humanity — I
                  had what I call my "sacred collapse."
                </p>

                <p className="body-lg">
                  That breakdown became the doorway to building differently. Not
                  fast, but mindfully. Not for scale, but for depth. Technology
                  as contemplation rather than consumption.
                </p>

                <p className="body-lg">
                  Every interface I create now is an invitation to presence, not
                  productivity.
                </p>
              </div>
            </div>

            <div className="animate-fade-in-delay">
              <div className="contemplative-card p-8 text-center">
                <div className="text-6xl mb-6 animate-float">🥔</div>
                <h3 className="heading-lg mb-4">Sacred Potato Energy</h3>
                <p className="text-slate-300">
                  Grounded in earth, reaching toward light. Ordinary yet
                  nourishing. Simple yet profound. This is how I approach
                  building things now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            What I'm building
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/building" className="group">
              <div className="contemplative-card p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">🧘</div>
                  <div>
                    <h3 className="heading-lg">Selah</h3>
                    <p className="text-slate-400">
                      Four chambers for consciousness
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  Meditation through breath recognition. Contemplation via AI
                  synthesis. Creation as co-creative play. Being seen through
                  ephemeral witnessing.
                </p>
                <div className="flex items-center text-purple-300 group-hover:text-purple-200 transition-colors">
                  <span className="text-sm">Explore blueprint</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/building" className="group">
              <div className="contemplative-card p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">🪞</div>
                  <div>
                    <h3 className="heading-lg">Mirror of Truth</h3>
                    <p className="text-slate-400">Recognition over advice</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  AI that reflects wholeness rather than offering fixes. Dream
                  analysis that shows you who you already are.
                </p>
                <div className="flex items-center text-purple-300 group-hover:text-purple-200 transition-colors">
                  <span className="text-sm">Try it live</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* My Journey */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <h2 className="heading-xl spacing-comfortable">
              From optimization to reverence
            </h2>

            <div className="space-y-6 text-left">
              <div className="border-l-2 border-purple-400/30 pl-6">
                <h3 className="font-medium text-purple-300 mb-2">
                  The Optimization Era
                </h3>
                <p className="text-slate-300 text-sm">
                  High-functioning, brilliant, ambitious. Mastering systems,
                  accumulating achievements, trying to engineer perfection.
                </p>
              </div>

              <div className="border-l-2 border-pink-400/30 pl-6">
                <h3 className="font-medium text-pink-300 mb-2">
                  The Sacred Collapse
                </h3>
                <p className="text-slate-300 text-sm">
                  OCD, smoking cycles, army discharge. The optimization identity
                  crumbled. Desert solitude. The Sacred Potato realization.
                </p>
              </div>

              <div className="border-l-2 border-emerald-400/30 pl-6">
                <h3 className="font-medium text-emerald-300 mb-2">
                  Presence-First Technology
                </h3>
                <p className="text-slate-300 text-sm">
                  Building from stillness instead of urgency. Technology as
                  contemplation. Each project a mirror for consciousness.
                </p>
              </div>
            </div>

            <Link href="/journey" className="gentle-button mt-8">
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Recent contemplations
          </h2>

          <div className="space-y-6">
            <Link href="/writing/sacred-potato" className="block group">
              <div className="contemplative-card p-6 hover:bg-white/[0.06] transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">🥔</div>
                  <div className="flex-1">
                    <h3 className="heading-lg group-hover:text-purple-200 transition-colors">
                      The Sacred Potato
                    </h3>
                    <p className="text-slate-400 mb-3">
                      A desert contemplative story
                    </p>
                    <p className="text-slate-300 text-sm">
                      Sometimes we are consciousness taking itself too
                      seriously, like a potato that has forgotten it is earth...
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/writing/sacred-wound" className="block group">
              <div className="contemplative-card p-6 hover:bg-white/[0.06] transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">🌳</div>
                  <div className="flex-1">
                    <h3 className="heading-lg group-hover:text-purple-200 transition-colors">
                      The Sacred Wound of Addiction
                    </h3>
                    <p className="text-slate-400 mb-3">
                      Hebrew analysis meets personal philosophy
                    </p>
                    <p className="text-slate-300 text-sm">
                      How the Tree of Knowledge story reveals the deepest truth
                      about addiction, consciousness, and the journey home...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/writing" className="gentle-button">
              All contemplations
            </Link>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="text-5xl mb-6 animate-float">💌</div>
            <h2 className="heading-xl spacing-comfortable">
              If your soul recognizes something here
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              I believe in authentic connection over networking. If what I'm
              building resonates, I'd love to hear from you.
            </p>
            <Link href="/connect" className="gentle-button">
              Let's connect
            </Link>
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

export default Homepage;
