"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const WealthPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://selahwealth.xyz";

  const features = [
    {
      icon: "\u{1F3E6}",
      title: "Bank Account Sync",
      description:
        "Connect your Israeli bank accounts for automatic transaction imports. Real-time sync keeps your finances up-to-date without manual entry.",
    },
    {
      icon: "\u{1F3F7}\uFE0F",
      title: "AI Transaction Categorization",
      description:
        "Claude-powered intelligent categorization that learns your spending patterns. Automatically tags and organizes transactions with high accuracy.",
    },
    {
      icon: "\u{1F4CA}",
      title: "Budget Management with Alerts",
      description:
        "Set budgets by category and receive smart alerts before you overspend. Track your progress with visual dashboards and insights.",
    },
    {
      icon: "\u{1F4AC}",
      title: "Financial Advisor Chat",
      description:
        "AI-powered financial advisor that understands your complete picture. Get personalized advice based on your actual spending and goals.",
    },
  ];

  const techStack = [
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Claude API",
    "tRPC",
  ];

  const challenges = [
    "Manual transaction entry is tedious and often abandoned",
    "Generic categorization misses personal spending patterns",
    "Israeli bank integration is rare in international finance apps",
    "Budget alerts come too late, after overspending occurs",
  ];

  const solutions = [
    "Automatic bank sync imports transactions in real-time",
    "Claude AI learns your unique spending patterns for smart categorization",
    "Native support for Israeli banks and local payment methods",
    "Proactive budget alerts before you exceed limits",
    "AI financial advisor provides personalized guidance based on your actual data",
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
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
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

      {/* Hero Section */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            {/* Status Badge */}
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-emerald-300 font-medium">Live</span>
            </div>

            {/* Large Icon */}
            <div className="text-6xl md:text-8xl mb-8 animate-float">
              {"\u{1F4B0}"}
            </div>

            {/* Title */}
            <h1 className="display-lg spacing-comfortable text-gentle">
              Wealth
            </h1>

            {/* Subtitle */}
            <p className="body-xl text-slate-400 spacing-comfortable">
              Personal Finance SaaS
            </p>

            {/* Description */}
            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              Complete financial tracking system with AI-powered categorization,
              Israeli bank connections, budgeting, and goal tracking. Helps
              users understand their spending patterns and make informed
              financial decisions with an intelligent advisor.
            </p>

            {/* CTA Button */}
            <div className="spacing-comfortable">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
              >
                <ExternalLink className="w-6 h-6" />
                <span>Visit Live Site</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Challenge
          </h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Personal finance tools often fail Israeli users in key ways:
            </p>
            <ul className="space-y-4">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Solution
          </h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Wealth brings intelligent, localized financial management:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="contemplative-card p-6 md:p-8">
                  <div className="text-3xl md:text-4xl mb-6">{feature.icon}</div>
                  <h3 className="heading-lg mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-breathing">
        <div className="container-content text-center">
          <h2 className="heading-xl spacing-comfortable">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl spacing-comfortable">
              Ready to Take Control?
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              Start understanding your finances with AI-powered insights.
            </p>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Visit Live Site</span>
            </a>
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
            {new Date().getFullYear()} - Building systems that work
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WealthPage;
