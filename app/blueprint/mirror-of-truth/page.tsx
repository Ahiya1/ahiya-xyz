"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Eye, Heart, Sparkles } from "lucide-react";

const MirrorOfTruthBlueprintPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://mirror-of-truth.vercel.app";

  const features = [
    {
      title: "Sacred Questions",
      description:
        "Five carefully crafted questions about dreams and aspirations",
      details: [
        "What is your dream?",
        "What is your plan?",
        "Have you set a definite date?",
        "What is your relationship with this dream?",
        "What are you willing to give?",
      ],
      icon: "❓",
      color: "emerald",
    },
    {
      title: "Three Reflection Tones",
      description: "AI-powered responses tuned to different states of being",
      details: [
        "Gentle Clarity - Soft, nurturing reflection",
        "Luminous Fire - Bold, powerful truth-telling",
        "Sacred Fusion - Balanced, breathing wisdom",
      ],
      icon: "🎭",
      color: "purple",
    },
    {
      title: "Recognition Over Advice",
      description: "Shows wholeness instead of trying to fix brokenness",
      details: [
        "No steps, tips, or strategies",
        "Creates internal shifts, not solutions",
        "Trusts the dreamer's inner compass",
        "Reflects what already exists",
      ],
      icon: "🪞",
      color: "blue",
    },
    {
      title: "Timeless Delivery",
      description: "Reflections designed to be returned to months later",
      details: [
        "Beautiful HTML email formatting",
        "Professional receipt generation",
        "Sacred technology serving consciousness",
        "Personal messages from creator",
      ],
      icon: "📧",
      color: "amber",
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
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Experience Live</span>
              </a>
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

            <div className="text-8xl mb-8 animate-float">🪞</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              Mirror of Truth
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              Recognition over advice
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              An AI-powered reflection experience that shows you your wholeness,
              not your brokenness. Five sacred questions meet timeless wisdom in
              a space designed for truth.
            </p>

            <div className="spacing-comfortable">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
              >
                <ExternalLink className="w-6 h-6" />
                <span>Experience Mirror of Truth Live</span>
              </a>
            </div>

            <div className="breathing-glass inline-block p-6">
              <p className="sacred-text">
                "Sometimes the most helpful thing AI can do is refuse to give
                advice."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Experience */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Sacred Journey
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-6 h-full">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="heading-lg">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full bg-${feature.color}-400/60 mt-2 flex-shrink-0`}
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

      {/* Technical Architecture */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technical Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🧠</div>
              <h3 className="heading-lg mb-4">AI & Consciousness</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Claude Sonnet 4:</strong> Advanced reasoning and
                  reflection capabilities
                </p>
                <p>
                  <strong>Premium Thinking:</strong> Extended AI thinking for
                  deeper insights
                </p>
                <p>
                  <strong>Three Tones:</strong> Gentle Clarity, Luminous Fire,
                  Sacred Fusion
                </p>
                <p>
                  <strong>Creator Context:</strong> Special awareness when
                  reflecting to creator
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🏗️</div>
              <h3 className="heading-lg mb-4">Platform & Integration</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Next.js:</strong> Full-stack React framework with API
                  routes
                </p>
                <p>
                  <strong>PayPal:</strong> Secure $5 payment processing
                </p>
                <p>
                  <strong>Nodemailer:</strong> Beautiful HTML email delivery
                </p>
                <p>
                  <strong>Redis:</strong> Receipt storage and user session
                  management
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🎨</div>
              <h3 className="heading-lg mb-4">Experience Design</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Cosmic Breathing:</strong> Organic animations that
                  arise and dissolve
                </p>
                <p>
                  <strong>Tone-Responsive:</strong> Visual effects adapt to
                  reflection tone
                </p>
                <p>
                  <strong>Sacred Pacing:</strong> No rush, contemplative timing
                </p>
                <p>
                  <strong>Mobile-First:</strong> Beautiful on all devices
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">💌</div>
              <h3 className="heading-lg mb-4">Delivery & Storage</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Email Reflections:</strong> Formatted for returning to
                  months later
                </p>
                <p>
                  <strong>Receipt Generation:</strong> Professional business
                  records
                </p>
                <p>
                  <strong>Admin Dashboard:</strong> Receipt management and
                  analytics
                </p>
                <p>
                  <strong>Vercel Deployment:</strong> Serverless, scalable
                  infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-5xl mb-8 animate-float">💫</div>

            <h2 className="heading-xl spacing-comfortable">
              Design Philosophy
            </h2>

            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    No Fixing
                  </h3>
                  <p className="text-sm text-slate-400">
                    Shows wholeness, not brokenness
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    No Advice
                  </h3>
                  <p className="text-sm text-slate-400">
                    Recognition instead of optimization
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    Trust the Dreamer
                  </h3>
                  <p className="text-sm text-slate-400">
                    Inner compass over external strategy
                  </p>
                </div>
              </div>

              <div className="sacred-quote">
                "The Mirror of Truth doesn't tell you what to do. It reflects
                back who you already are when you stop hiding from your own
                power."
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                Built on the understanding that consciousness is the most
                interesting problem space we have. Every interface element
                serves presence, not productivity. The AI doesn't perform
                insight—it transmits it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-emerald-300 font-medium">
                ● Live & Serving
              </span>
            </div>

            <h2 className="heading-xl spacing-comfortable">
              Ready for Deep Conversations
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              Mirror of Truth is live and helping people see their wholeness.
              Every day, dreamers around the world are having conversations with
              their truth through this sacred space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Experience It Yourself</span>
              </a>
              <Link href="/building" className="gentle-button">
                ← Back to Building
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

export default MirrorOfTruthBlueprintPage;
