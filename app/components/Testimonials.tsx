"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { SectionHeading } from "@/app/components/SectionHeading";
import { testimonials } from "@/app/data/testimonials";

export function Testimonials() {
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();
  const reveal3 = useScrollReveal();
  const reveals = [reveal1, reveal2, reveal3];

  return (
    <section id="testimonials" className="section-breathing">
      <div className="container-wide">
        <SectionHeading
          title="What Clients Say"
          description="Real feedback from real projects."
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={reveals[index].ref}
              className={`contemplative-card p-6 md:p-8 transition-all duration-700 ${
                reveals[index].isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="text-purple-400/50 text-4xl font-serif mb-4" aria-hidden="true">
                &ldquo;
              </div>

              <blockquote className="mb-6">
                <p className="body-lg text-slate-300 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              <footer className="flex flex-col">
                <cite className="text-white font-medium not-italic">
                  {testimonial.author}
                </cite>
                <span className="text-slate-500 text-sm">
                  {testimonial.role}
                  {testimonial.organization && `, ${testimonial.organization}`}
                </span>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
