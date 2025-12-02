"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight, Clock } from "lucide-react";
import { MobileNav } from "@/app/components/MobileNav";

const WritingPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  interface Writing {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    preview: string;
    readTime: string;
    icon: string;
    link: string;
    featured?: boolean;
    category: string;
  }

  const writings: Writing[] = [
    {
      id: "sacred-potato",
      title: "The Sacred Potato",
      subtitle: "A desert contemplative story",
      description:
        "What happens when consciousness collapses into itself and realizes it's been taking everything too seriously? A journey through seeking, addiction, and the cosmic joke of being human.",
      preview:
        "All his years of seeking, all his elaborate self-narratives, all his desperate attempts to fill the hollow place... and he's just a potato taking itself too seriously.",
      readTime: "25 min",
      icon: "🥔",
      link: "/soul/writing/sacred-potato",
      featured: true,
      category: "Story",
    },
    {
      id: "sacred-wound",
      title: "The Sacred Wound of Addiction",
      subtitle: "Ancient wisdom meets modern struggle",
      description:
        "How the Tree of Knowledge story reveals the deepest truth about addiction, consciousness, and why we reach for external things to fill internal voids.",
      preview:
        "The story of the Tree of Knowledge isn't just ancient mythology. It's a precise map of how consciousness develops, why we suffer, and why we seek...",
      readTime: "18 min",
      icon: "🌳",
      link: "/soul/writing/sacred-wound",
      category: "Analysis",
    },
    {
      id: "edge-space",
      title: "Living in the Edge Space",
      subtitle: "Where ambition meets awareness",
      description:
        "What happens when you refuse to choose between worldly success and spiritual depth? Exploring the integration of high performance and conscious presence.",
      preview:
        "Most people think spirituality means giving up ambition. Most ambitious people think consciousness is a luxury they can't afford. Both are missing something...",
      readTime: "12 min",
      icon: "⚡",
      link: "/soul/writing/edge-space",
      category: "Philosophy",
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
      <MobileNav currentPath="/soul/writing" />

      {/* Hero */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-purple-300">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Writing</span>
              </div>
            </div>

            <h1 className="display-lg spacing-generous text-gentle">
              Contemplations on being human
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Explorations of consciousness, addiction, technology, and the
              sacred comedy of taking ourselves too seriously.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Writing */}
      {writings.find((w) => w.featured) && (
        <section className="section-breathing">
          <div className="container-content">
            {(() => {
              const featured = writings.find((w) => w.featured)!;
              return (
                <div className="text-center mb-16">
                  <div className="breathing-glass inline-block px-6 py-3 mb-8">
                    <div className="flex items-center space-x-2 text-purple-300">
                      <span className="text-xl">⭐</span>
                      <span className="font-medium">Featured</span>
                    </div>
                  </div>

                  <Link href={featured.link} className="block group">
                    <article className="contemplative-card p-12 max-w-4xl mx-auto group-hover:bg-white/[0.06] transition-all duration-300">
                      <div className="text-6xl mb-8 animate-float">
                        {featured.icon}
                      </div>

                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <span className="breathing-glass px-3 py-1 text-xs text-slate-400">
                          {featured.category}
                        </span>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">
                            {featured.readTime} read
                          </span>
                        </div>
                      </div>

                      <h2 className="heading-xl spacing-comfortable group-hover:text-purple-200 transition-colors">
                        {featured.title}
                      </h2>

                      <p className="body-lg text-slate-400 spacing-comfortable">
                        {featured.subtitle}
                      </p>

                      <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed max-w-2xl mx-auto">
                        {featured.description}
                      </p>

                      <div className="sacred-quote">"{featured.preview}"</div>

                      <div className="flex items-center justify-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                        <span>Read the full piece</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All Writings */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            All contemplations
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {writings.map((writing, index) => (
              <Link
                key={writing.id}
                href={writing.link}
                className="block group"
              >
                <article className="contemplative-card p-8 group-hover:bg-white/[0.06] transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="text-4xl mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {writing.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="breathing-glass px-3 py-1 text-xs text-slate-400">
                          {writing.category}
                        </span>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">
                            {writing.readTime} read
                          </span>
                        </div>
                      </div>

                      <h3 className="heading-lg spacing-comfortable group-hover:text-purple-200 transition-colors">
                        {writing.title}
                      </h3>

                      <p className="body-lg text-slate-400 spacing-comfortable">
                        {writing.subtitle}
                      </p>

                      <p className="text-slate-300 spacing-comfortable leading-relaxed">
                        {writing.description}
                      </p>

                      <blockquote className="border-l-2 border-purple-400/30 pl-4 py-2 text-slate-300 italic">
                        "{writing.preview}"
                      </blockquote>

                      <div className="flex items-center space-x-2 text-purple-300 group-hover:text-purple-200 transition-colors mt-6">
                        <span className="text-sm">Continue reading</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-5xl mb-8 animate-float">📖</div>

            <h2 className="heading-xl spacing-comfortable">Why I write</h2>

            <div className="space-y-6 text-left">
              <p className="body-lg text-slate-300 leading-relaxed">
                These pieces aren't meant to give you answers or teach you
                anything. They're invitations to ask better questions, to sit
                with mystery, to find wisdom in not-knowing.
              </p>

              <p className="body-lg text-slate-300 leading-relaxed">
                I write from the recognition that consciousness is the most
                interesting problem we have, and that most of our suffering
                comes from taking ourselves too seriously while missing the
                cosmic joke entirely.
              </p>

              <div className="sacred-quote">
                Each piece is an offering to the mystery you are, a mirror
                reflecting what was always already here.
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                If something resonates, sit with it. If something doesn't,
                that's perfect too. The goal isn't understanding but
                recognition—recognizing that you ARE the consciousness trying to
                understand itself.
              </p>
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
              Thoughts on these pieces?
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              I'd love to hear how these contemplations land with you, or what
              questions they bring up.
            </p>
            <Link href="/soul/connect" className="gentle-button">
              Share your reflections
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

export default WritingPage;
