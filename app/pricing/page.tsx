"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { UrgencyBadge } from "@/app/components/UrgencyBadge";
import { CalcomEmbed } from "@/app/components/CalcomEmbed";
import { serviceTiers, launchPricingConfig } from "@/app/data/pricing";

export default function PricingPage() {
  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          <h1 className="display-xl text-white mb-6">
            <span className="text-gentle">Transparent Pricing</span>
          </h1>

          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Clear timelines. Fixed scopes. No surprises.
          </p>

          {/* Launch Pricing Banner */}
          {launchPricingConfig.active && (
            <div className="inline-flex flex-col items-center gap-3 mb-8">
              <div className="px-6 py-3 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                <span className="text-amber-400 font-semibold text-lg">
                  {launchPricingConfig.message}
                </span>
                <p className="text-amber-300/80 text-sm mt-1">
                  {launchPricingConfig.subtext}
                </p>
              </div>
            </div>
          )}

          {/* Urgency Badge */}
          <div className="flex justify-center">
            <UrgencyBadge />
          </div>
        </div>
      </section>

      {/* Service Tiers Grid */}
      <section className="section-breathing">
        <div className="container-wide section-reveal-1">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {serviceTiers.map((tier, index) => (
              <div
                key={tier.id}
                className={`contemplative-card p-6 md:p-8 ${
                  tier.highlighted
                    ? "border-purple-400/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                    : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {tier.highlighted && (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="heading-lg text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-white">{tier.price}</span>
                  <span className="text-slate-500">{tier.timeline}</span>
                </div>
                <p className="text-slate-400 mb-6">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-slate-500 text-sm mt-8">
            Final pricing depends on scope. All projects include a free discovery call to align on requirements.
          </p>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section id="book" className="section-breathing section-reveal-2">
        <div className="container-content">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-500/10 border border-purple-400/30 rounded-full text-purple-300 text-sm">
              <Calendar className="w-4 h-4" />
              Book a Call
            </div>
            <h2 className="display-lg text-white mb-4">Book a Discovery Call</h2>
            <p className="body-lg text-slate-400">
              30 minutes. No commitment. Let's discuss your project.
            </p>
          </div>

          <div className="contemplative-card p-4 md:p-6">
            <div className="h-[600px] min-h-[600px]">
              <CalcomEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="section-breathing">
        <div className="container-content text-center">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
