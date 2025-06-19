"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Users,
  Globe,
  BarChart3,
} from "lucide-react";

const WinkHerBlueprintPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://winkher.com";

  const phases = [
    {
      title: "Phase 1: Market Validation",
      description: "Understanding the community before building the app",
      status: "live",
      features: [
        "Bilingual landing page (English/Hebrew)",
        "Community survey with 7 thoughtful questions",
        "Anonymous data collection via Supabase",
        "Admin dashboard with deep analytics",
        "Geographic and demographic insights",
      ],
      icon: "📊",
      color: "emerald",
    },
    {
      title: "Phase 2: Community Building",
      description: "Growing awareness and gathering early adopters",
      status: "active",
      features: [
        "Social media presence and storytelling",
        "Word-of-mouth growth among WLW community",
        "Gathering email signups for early access",
        "Building trust through authentic communication",
        "Identifying key pain points and desires",
      ],
      icon: "🌱",
      color: "purple",
    },
    {
      title: "Phase 3: App Development",
      description: "Building the actual dating experience",
      status: "planned",
      features: [
        "100% women-loving-women verification",
        "Advanced safety and harassment protection",
        "Feminine, confident, magnetic design",
        "Community features beyond just dating",
        "Real-time matching with authentic profiles",
      ],
      icon: "💕",
      color: "pink",
    },
  ];

  const techFeatures = [
    {
      title: "Bilingual Experience",
      description: "Full English and Hebrew support with RTL layout",
      details: [
        "Dynamic language switching",
        "RTL layout for Hebrew content",
        "Culturally appropriate translations",
        "Region-specific analytics",
      ],
      icon: "🌍",
    },
    {
      title: "Survey & Analytics",
      description: "Deep community insights through thoughtful questions",
      details: [
        "7-step progressive survey flow",
        "Anonymous response collection",
        "Real-time analytics dashboard",
        "Demographic and geographic analysis",
      ],
      icon: "📈",
    },
    {
      title: "Admin Intelligence",
      description: "Powerful tools for understanding community needs",
      details: [
        "Response filtering and search",
        "Export capabilities for analysis",
        "Dream theme extraction",
        "Community sentiment tracking",
      ],
      icon: "🧠",
    },
    {
      title: "Mobile-First Design",
      description: "Optimized for touch and intimate interaction",
      details: [
        "Responsive design for all devices",
        "Touch-optimized form elements",
        "Smooth animations and transitions",
        "Progressive loading for slow connections",
      ],
      icon: "📱",
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
                <span>Visit Live Site</span>
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

            <div className="text-8xl mb-8 animate-float">💕</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              WinkHer
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              No men. No noise. Just us.
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Building the dating app women who love women have been dreaming
              of. Starting with community validation, moving toward authentic
              connections.
            </p>

            <div className="spacing-comfortable">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
              >
                <ExternalLink className="w-6 h-6" />
                <span>Experience WinkHer Landing</span>
              </a>
            </div>

            <div className="breathing-glass inline-block p-6">
              <p className="sacred-text">
                "Love needs sanctuary. Technology can provide sacred space for
                authentic connection."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Building in Phases
          </h2>

          <div className="space-y-8">
            {phases.map((phase, index) => (
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
                        <h3 className="heading-lg">{phase.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            phase.status === "live"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : phase.status === "active"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {phase.status === "live"
                            ? "● Live"
                            : phase.status === "active"
                            ? "● Active"
                            : "● Planned"}
                        </span>
                      </div>
                      <p className="text-slate-400 mb-6">{phase.description}</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full bg-${phase.color}-400/60 mt-2 flex-shrink-0`}
                            />
                            <span className="text-slate-300 text-sm leading-relaxed">
                              {feature}
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

      {/* Technical Features */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technical Implementation
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="contemplative-card p-8 h-full">
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
                        <div className="w-2 h-2 rounded-full bg-pink-400/60 mt-2 flex-shrink-0" />
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

      {/* Technology Stack */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technology Stack
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="heading-lg mb-4">Frontend & Experience</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Next.js 15:</strong> React framework with App Router
                </p>
                <p>
                  <strong>TypeScript:</strong> Type-safe development
                </p>
                <p>
                  <strong>Tailwind CSS:</strong> Mobile-first responsive design
                </p>
                <p>
                  <strong>Framer Motion:</strong> Smooth animations and
                  transitions
                </p>
                <p>
                  <strong>i18n Support:</strong> English/Hebrew with RTL layouts
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🗄️</div>
              <h3 className="heading-lg mb-4">Backend & Data</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Supabase:</strong> PostgreSQL database with real-time
                  features
                </p>
                <p>
                  <strong>Row Level Security:</strong> Anonymous survey
                  submissions
                </p>
                <p>
                  <strong>Real-time Analytics:</strong> Live dashboard updates
                </p>
                <p>
                  <strong>CSV Export:</strong> Data analysis capabilities
                </p>
                <p>
                  <strong>Admin Authentication:</strong> Secure dashboard access
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">🚀</div>
              <h3 className="heading-lg mb-4">Deployment & Performance</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Vercel:</strong> Serverless deployment with CDN
                </p>
                <p>
                  <strong>Custom Domain:</strong> winkher.com with SSL
                </p>
                <p>
                  <strong>Mobile Optimization:</strong> Progressive Web App
                  features
                </p>
                <p>
                  <strong>SEO Optimized:</strong> Meta tags and social sharing
                </p>
                <p>
                  <strong>Analytics Ready:</strong> Google Analytics integration
                </p>
              </div>
            </div>

            <div className="contemplative-card p-8">
              <div className="text-4xl mb-6">💖</div>
              <h3 className="heading-lg mb-4">Community Focus</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong>Anonymous Surveys:</strong> Safe space for honest
                  feedback
                </p>
                <p>
                  <strong>Cultural Sensitivity:</strong> Hebrew and English
                  markets
                </p>
                <p>
                  <strong>Data Privacy:</strong> GDPR compliant collection
                </p>
                <p>
                  <strong>Inclusive Design:</strong> Accessibility-first
                  approach
                </p>
                <p>
                  <strong>Community Insights:</strong> Understanding real needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12 text-center">
            <div className="text-5xl mb-8 animate-float">🌈</div>

            <h2 className="heading-xl spacing-comfortable">The Vision</h2>

            <div className="space-y-8">
              <div className="sacred-quote">
                "Finally, an app that gets it. Made by women, for women— with
                the intimacy and authenticity you've been craving."
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">
                    What We're Building
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• 100% women-loving-women verification</li>
                    <li>• Advanced safety and harassment protection</li>
                    <li>• Community features beyond just dating</li>
                    <li>• Feminine, confident, magnetic design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">
                    Why It Matters
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• 69% of LGB women face harassment on apps</li>
                    <li>• 84% want better safety protection</li>
                    <li>• 2.1M+ WLW already using dating apps</li>
                    <li>• No apps truly designed for us</li>
                  </ul>
                </div>
              </div>

              <p className="body-lg text-slate-300 leading-relaxed">
                WinkHer starts with understanding. Before building the app,
                we're listening to our community. Every survey response shapes
                what we create. This isn't just another dating app— it's the
                sanctuary we've all been waiting for.
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
                ● Live & Gathering Insights
              </span>
            </div>

            <h2 className="heading-xl spacing-comfortable">
              Building with the Community
            </h2>

            <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
              The landing page is live and collecting valuable community
              insights. Every response helps us understand what women who love
              women truly need in a dating experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Join the Community</span>
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

export default WinkHerBlueprintPage;
