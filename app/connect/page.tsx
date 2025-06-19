"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, Mail, Heart, Sparkles } from "lucide-react";

const ConnectPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(
        formData.subject || "Connection from ahiya.xyz"
      );
      const body = encodeURIComponent(
        `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:ahiya.butman@gmail.com?subject=${subject}&body=${body}`;

      // Open user's email client
      window.location.href = mailtoLink;

      // Simulate success after a brief delay
      setTimeout(() => {
        setSubmitStatus("success");
        setIsSubmitting(false);
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 1000);
    } catch {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-900 to-cosmic-900 flex items-center justify-center">
        <div className="animate-gentle-pulse">
          <div className="w-16 h-16 bg-aurora-primary/20 rounded-full consciousness-orb-aurora"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Aurora consciousness texture */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Sacred Navigation with Aurora */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-float"
                />
                <div className="absolute inset-0 bg-aurora-primary/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium gradient-text-primary">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/writing"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writing
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aurora-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Aurora Heart Energy */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 bg-aurora-soft border-aurora-primary/20">
              <MessageCircle className="w-6 h-6 text-aurora-primary animate-gentle-pulse" />
              <span className="text-aurora-primary font-medium tracking-wider text-lg">
                Connect
              </span>
            </div>

            <h1 className="display-lg gradient-text-aurora mb-16 leading-tight">
              If your soul recognizes
              <br />
              something here
            </h1>

            <p className="body-xl text-gray-300 max-w-5xl mx-auto leading-loose tracking-wide">
              I believe in authentic connection over networking.
              <br />
              If what I&apos;m building resonates with something in you,
              <br />
              I&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Connection Form with Aurora Enhancement */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div
              className="ahiya-card-premium hover-lift-premium relative overflow-hidden border-aurora-primary/20"
              style={{
                boxShadow:
                  "0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 60px rgba(236, 72, 153, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>
              <div className="absolute inset-0 bg-aurora-soft opacity-40"></div>

              <div className="relative z-10">
                {submitStatus === "success" ? (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-12 animate-float">✨</div>
                    <h2 className="heading-xl text-white mb-8">
                      Your email client should be opening...
                    </h2>
                    <p className="body-lg text-gray-300 mb-12 leading-relaxed">
                      Thank you for reaching out. Your message has been prepared
                      in your email client.
                      <br />
                      If it didn&apos;t open automatically, you can email me
                      directly at{" "}
                      <a
                        href="mailto:ahiya.butman@gmail.com"
                        className="text-aurora-primary hover:text-aurora-light underline"
                      >
                        ahiya.butman@gmail.com
                      </a>
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="ahiya-button-premium hover-lift-premium focus-premium"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-16">
                      <div className="text-7xl mb-12 animate-float">💌</div>
                      <h2 className="heading-xl text-white mb-8">
                        Let&apos;s Begin a Conversation
                      </h2>
                      <p className="body-lg text-gray-300 leading-relaxed">
                        Share what&apos;s alive in you. I read every message
                        personally.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-gray-300 font-medium mb-3 tracking-wide"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 bg-white/5 border border-aurora-primary/30 rounded-2xl 
                              text-white placeholder-gray-400 focus:outline-none focus:border-aurora-primary/50 
                              focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
                              focus:shadow-aurora-soft"
                            placeholder="What shall I call you?"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-gray-300 font-medium mb-3 tracking-wide"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 bg-white/5 border border-aurora-primary/30 rounded-2xl 
                              text-white placeholder-gray-400 focus:outline-none focus:border-aurora-primary/50 
                              focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
                              focus:shadow-aurora-soft"
                            placeholder="How can I reach you?"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-300 font-medium mb-3 tracking-wide"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/5 border border-aurora-primary/30 rounded-2xl 
                            text-white placeholder-gray-400 focus:outline-none focus:border-aurora-primary/50 
                            focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
                            focus:shadow-aurora-soft"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-gray-300 font-medium mb-3 tracking-wide"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={8}
                          className="w-full px-6 py-4 bg-white/5 border border-aurora-primary/30 rounded-2xl 
                            text-white placeholder-gray-400 focus:outline-none focus:border-aurora-primary/50 
                            focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none
                            focus:shadow-aurora-soft"
                          placeholder="What wants to be shared? I'm here to listen..."
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Opening Email...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6" />
                              <span>Send Message</span>
                              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 text-aurora-pink" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact with Aurora */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div
            className="ahiya-card-premium hover-lift-premium animate-scaleIn border-aurora-primary/20"
            style={{
              boxShadow:
                "0 0 60px rgba(168, 85, 247, 0.4), inset 0 0 60px rgba(168, 85, 247, 0.1)",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-soft opacity-30 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="mobile-spacing-lg">
                  <div className="text-7xl mb-12 animate-float">📧</div>

                  <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                    Or Email Me Directly
                  </h2>

                  <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                    Sometimes the simplest path is the most direct.
                    <br />
                    No forms, no friction, just human to human.
                  </p>

                  <a
                    href="mailto:ahiya.butman@gmail.com"
                    className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium mb-16"
                  >
                    <Mail className="w-7 h-7" />
                    <span className="tracking-wide text-lg">
                      ahiya.butman@gmail.com
                    </span>
                    <Sparkles className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 text-aurora-primary" />
                  </a>

                  <div className="glass-card p-12 border-aurora-primary/20">
                    <p className="text-aurora-primary italic leading-loose tracking-wide text-lg">
                      &ldquo;For collaborations, conversations about
                      consciousness-first technology,
                      <br />
                      or just to share what this work brings up for you.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Potato Conclusion with Aurora */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div
            className="ahiya-card-premium hover-lift-premium animate-scaleIn border-aurora-primary/20"
            style={{
              boxShadow:
                "0 0 60px rgba(192, 132, 252, 0.4), inset 0 0 60px rgba(192, 132, 252, 0.1)",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-soft opacity-30 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="mobile-spacing-lg">
                  <div className="text-8xl mb-12 animate-float">🥔</div>

                  <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                    Sacred Potato Energy
                  </h2>

                  <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                    I approach every conversation like a sacred potato—
                    <br />
                    grounded in earth, yet reaching toward light,
                    <br />
                    ordinary yet nourishing, simple yet profound.
                  </p>

                  <div className="glass-card p-12 mb-16 border-aurora-primary/20">
                    <p className="text-aurora-primary italic leading-loose tracking-wide text-xl">
                      &ldquo;A sacred potato experiencing the present moment
                      <br />
                      in all its ordinary magnificence.&rdquo;
                    </p>
                    <p className="text-aurora-light mt-6 text-base tracking-wider">
                      — The Sacred Potato
                    </p>
                  </div>

                  <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide">
                    Let&apos;s connect not from our accomplishments or
                    aspirations,
                    <br />
                    but from the simple recognition of consciousness
                    <br />
                    meeting itself in form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aurora Connection Manifesto */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div
            className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden border-aurora-primary/20"
            style={{
              boxShadow:
                "0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 60px rgba(236, 72, 153, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-consciousness-pattern opacity-30"></div>
            <div className="absolute inset-0 bg-aurora-soft opacity-40"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div className="text-8xl mb-12 animate-consciousness-pulse">
                💝
              </div>

              <h2 className="display-md gradient-text-aurora mb-12 leading-tight">
                The Sacred Art of Connection
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                True connection happens not when we try to impress each other,
                <br />
                but when we allow ourselves to be genuinely seen.
                <br />
                Vulnerability as the gateway to authentic relationship.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="glass-card p-10 hover-lift-premium group border-aurora-primary/20">
                  <div className="text-5xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500">
                    🤝
                  </div>
                  <h3 className="heading-lg text-aurora-light mb-6">
                    Human to Human
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Beyond titles, achievements, or networking goals. Just one
                    consciousness recognizing another, sharing this strange and
                    beautiful experience of being human.
                  </p>
                </div>

                <div className="glass-card p-10 hover-lift-premium group border-aurora-primary/20">
                  <div
                    className="text-5xl mb-8 animate-float group-hover:scale-110 transition-transform duration-500"
                    style={{ animationDelay: "3s" }}
                  >
                    🎭
                  </div>
                  <h3 className="heading-lg text-aurora-pink mb-6">
                    Masks Optional
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Come as you are—messy, seeking, brilliant, confused, all of
                    it. The most interesting conversations happen when we drop
                    the performance.
                  </p>
                </div>
              </div>

              <div className="glass-card p-12 border-aurora-primary/20">
                <p className="text-aurora-primary italic leading-loose tracking-wide text-xl mb-6">
                  &ldquo;We connect not through our perfections,
                  <br />
                  but through our shared humanity,
                  <br />
                  our common longing to be truly known.&rdquo;
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-aurora-blue rounded-full animate-gentle-pulse"></div>
                  <div
                    className="w-2 h-2 bg-aurora-purple rounded-full animate-gentle-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-aurora-pink rounded-full animate-gentle-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Footer with Aurora */}
      <footer className="py-24 border-t border-aurora-primary/20">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-10">
            <div className="relative">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={44}
                height={44}
                className="opacity-60 animate-float"
              />
              <div className="absolute inset-0 bg-aurora-primary/20 rounded-full blur-xl scale-150 animate-gentle-pulse"></div>
            </div>
          </div>

          <p className="text-gray-400 mb-6 tracking-wide text-lg">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-text-primary">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-8">
            &ldquo;Technology that serves consciousness&rdquo;
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Space becoming human
            becoming space.
          </p>

          {/* Aurora footer decoration */}
          <div className="flex justify-center space-x-4 mt-12">
            <div className="w-1 h-1 bg-aurora-blue rounded-full animate-gentle-pulse"></div>
            <div
              className="w-1 h-1 bg-aurora-purple rounded-full animate-gentle-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-aurora-pink rounded-full animate-gentle-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </footer>

      {/* Floating Aurora Hearts */}
      <div className="fixed top-1/4 left-1/12 w-24 h-24 bg-aurora-pink/5 rounded-full blur-xl animate-float opacity-60"></div>
      <div
        className="fixed bottom-1/4 right-1/12 w-32 h-32 bg-aurora-purple/5 rounded-full blur-xl animate-float opacity-50"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="fixed top-1/2 right-1/6 w-16 h-16 bg-aurora-light-pink/5 rounded-full blur-xl animate-float opacity-40"
        style={{ animationDelay: "6s" }}
      ></div>

      {/* Enhanced CSS */}
      <style jsx>{`
        .consciousness-orb-aurora {
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #a855f7 50%,
            #ec4899 100%
          );
          border-radius: 50%;
          box-shadow: 0 0 60px rgba(168, 85, 247, 0.6),
            0 0 120px rgba(236, 72, 153, 0.3),
            inset 0 0 60px rgba(255, 255, 255, 0.1);
          animation: aurora-flow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ConnectPage;
