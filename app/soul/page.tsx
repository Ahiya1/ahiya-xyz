"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, FileText, MapPin } from "lucide-react";

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
                  fast, but mindfully. Not just for scale, but also for depth.
                  Technology as contemplation rather than consumption.
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

      {/* Three Rooms - Enhanced Navigation */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Three rooms to explore
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Building Room */}
            <Link href="/soul/building" className="group">
              <div className="contemplative-card p-8 h-full text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="breathing-glass p-3 rounded-full">
                    <Building className="w-8 h-8 text-purple-300" />
                  </div>
                </div>

                <h3 className="heading-lg mb-4 group-hover:text-purple-200 transition-colors">
                  Building
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  Technology as contemplation. Each project an exploration of
                  consciousness through code.
                </p>

                {/* Preview Projects */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🧘</span>
                    <span className="text-slate-400">
                      Selah - Four chambers for consciousness
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🪞</span>
                    <span className="text-slate-400">
                      Mirror of Truth - Recognition over advice
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">💕</span>
                    <span className="text-slate-400">
                      WinkHer - Sacred space for love
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                  <span className="text-sm">Explore all projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Writing Room */}
            <Link href="/soul/writing" className="group">
              <div className="contemplative-card p-8 h-full text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="breathing-glass p-3 rounded-full">
                    <FileText className="w-8 h-8 text-purple-300" />
                  </div>
                </div>

                <h3 className="heading-lg mb-4 group-hover:text-purple-200 transition-colors">
                  Writing
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  Contemplations on being human. Not answers, but better
                  questions for the mystery you are.
                </p>

                {/* Preview Writings */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🥔</span>
                    <span className="text-slate-400">The Sacred Potato</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🌳</span>
                    <span className="text-slate-400">
                      The Sacred Wound of Addiction
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">⚡</span>
                    <span className="text-slate-400">
                      Living in the Edge Space
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                  <span className="text-sm">Read contemplations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Journey Room */}
            <Link href="/soul/journey" className="group">
              <div className="contemplative-card p-8 h-full text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="breathing-glass p-3 rounded-full">
                    <MapPin className="w-8 h-8 text-purple-300" />
                  </div>
                </div>

                <h3 className="heading-lg mb-4 group-hover:text-purple-200 transition-colors">
                  Journey
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  From optimization to reverence. How consciousness collapsed
                  into itself and learned to laugh.
                </p>

                {/* Preview Journey */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">⚡</span>
                    <span className="text-slate-400">The Optimization Era</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🥔</span>
                    <span className="text-slate-400">The Sacred Collapse</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-2xl">🪞</span>
                    <span className="text-slate-400">
                      Presence-First Technology
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                  <span className="text-sm">Read the full story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="section-breathing">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="heading-xl spacing-comfortable">
              Currently building
            </h2>
            <p className="body-lg text-slate-300">
              A taste of what's emerging from Sacred Potato energy
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="contemplative-card p-12 text-center">
              <div className="text-6xl mb-8 animate-float">🧘</div>

              <h3 className="heading-xl spacing-comfortable">Selah</h3>
              <p className="body-lg text-slate-400 spacing-comfortable">
                Four chambers for consciousness
              </p>

              <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
                Meditation through breath recognition. Contemplation via AI
                synthesis. Creation as co-creative play. Being seen through
                ephemeral witnessing conversations.
              </p>

              <div className="sacred-quote">
                "What if technology could create space for presence instead of
                demanding attention?"
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link href="/soul/building" className="gentle-button">
                  Explore all projects
                </Link>
                <Link href="/soul/building#selah" className="gentle-button">
                  Selah blueprint
                </Link>
              </div>
            </div>
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
            <Link href="/soul/connect" className="gentle-button">
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
