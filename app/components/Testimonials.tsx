"use client";

import Link from "next/link";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { SectionHeading } from "@/app/components/SectionHeading";
import { TiltCard } from "@/app/components/reactive";
import { testimonials } from "@/app/data/testimonials";

function TestimonialLogo({ logo }: { logo: { type: "emoji" | "text"; value: string; gradient: string } }) {
  return (
    <div
      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${logo.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
    >
      {logo.type === "emoji" ? (
        <span className="text-2xl">{logo.value}</span>
      ) : (
        <span className="text-white font-bold text-sm tracking-tight">{logo.value}</span>
      )}
    </div>
  );
}

export function Testimonials() {
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();
  const reveal3 = useScrollReveal();
  const reveals = [reveal1, reveal2, reveal3];

  return (
    <section id="testimonials" className="section-breathing">
      <div className="container-wide">
        <SectionHeading
          title="Trusted By"
          description="From academic institutions to personal projects."
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TiltCard key={testimonial.id} maxTilt={4} enableShine={false}>
              <div
                ref={reveals[index].ref}
                className={`group relative contemplative-card p-6 md:p-8 transition-all duration-500 hover:border-purple-400/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] ${
                  reveals[index].isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                data-track-click={`testimonial:${testimonial.id}`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />

                {/* Content */}
                <div className="relative">
                  {/* Logo and Organization */}
                  <div className="flex items-center gap-4 mb-6">
                    <TestimonialLogo logo={testimonial.logo} />
                    <div>
                      <div className="text-white font-medium">
                        {testimonial.organization || testimonial.author}
                      </div>
                      <div className="text-slate-500 text-sm">
                        {testimonial.project}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6">
                    <p className="body-lg text-slate-300 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <footer className="flex items-center justify-between">
                    <div>
                      <cite className="text-slate-400 text-sm not-italic">
                        {testimonial.author}
                        {testimonial.role && (
                          <span className="text-slate-500">, {testimonial.role}</span>
                        )}
                      </cite>
                    </div>

                    {/* Type indicator */}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      testimonial.type === "institutional"
                        ? "bg-blue-500/10 text-blue-400"
                        : testimonial.type === "corporate"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}>
                      {testimonial.type === "institutional" ? "Academic" :
                       testimonial.type === "corporate" ? "Enterprise" : "Personal"}
                    </span>
                  </footer>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
