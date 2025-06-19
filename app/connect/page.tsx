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
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 flex items-center justify-center">
        <div className="animate-aurora-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-ambient-premium safe-area-top safe-area-bottom">
      {/* Enhanced aurora consciousness texture */}
      <div className="fixed inset-0 z-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.2) 1px, transparent 0)",
            backgroundSize: "80px 80px",
            animation: "aurora-grain 25s linear infinite",
          }}
        />
      </div>

      {/* Sacred Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container-hero">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative aurora-logo-glow">
                <Image
                  src="/logo-symbol.png"
                  alt="Ahiya"
                  width={36}
                  height={36}
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-aurora-float"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="text-xl font-medium gradient-aurora-text">
                Ahiya
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/journey"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Journey
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/building"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Building
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link
                href="/writing"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Writing
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Heart-Centered Aurora */}
      <section className="pt-32 pb-20">
        <div className="container-content text-center">
          <div className="animate-slideInUp">
            <div className="inline-flex items-center space-x-3 glass-premium px-8 py-4 mb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-blue-500/5 opacity-80"></div>
              <MessageCircle className="w-6 h-6 text-pink-400 relative z-10" />
              <span className="gradient-aurora-text font-medium tracking-wider text-lg relative z-10">
                Connect
              </span>
            </div>

            <h1 className="display-lg gradient-aurora-text mb-16 leading-tight">
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

      {/* Connection Form - Aurora Enhanced */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div className="ahiya-card-premium hover-lift-premium relative overflow-hidden">
              <div className="absolute inset-0 bg-consciousness-pattern opacity-25"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/8 to-blue-500/5 opacity-70"></div>

              <div className="relative z-10">
                {submitStatus === "success" ? (
                  <div className="text-center py-20">
                    <div
                      className="text-8xl mb-12 animate-aurora-float filter drop-shadow-lg"
                      style={{
                        filter: `drop-shadow(0 0 30px rgba(236, 72, 153, 0.6))`,
                      }}
                    >
                      ✨
                    </div>
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
                        className="gradient-aurora-text hover:text-pink-300 underline"
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
                      <div
                        className="text-7xl mb-12 animate-aurora-float filter drop-shadow-lg"
                        style={{
                          filter: `drop-shadow(0 0 25px rgba(236, 72, 153, 0.5))`,
                        }}
                      >
                        💌
                      </div>
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
                            className="w-full px-6 py-4 bg-white/5 border border-pink-400/20 rounded-2xl 
                              text-white placeholder-gray-400 focus:outline-none focus:border-pink-400/50 
                              focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                            className="w-full px-6 py-4 bg-white/5 border border-pink-400/20 rounded-2xl 
                              text-white placeholder-gray-400 focus:outline-none focus:border-pink-400/50 
                              focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                          className="w-full px-6 py-4 bg-white/5 border border-pink-400/20 rounded-2xl 
                            text-white placeholder-gray-400 focus:outline-none focus:border-pink-400/50 
                            focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                          className="w-full px-6 py-4 bg-white/5 border border-pink-400/20 rounded-2xl 
                            text-white placeholder-gray-400 focus:outline-none focus:border-pink-400/50 
                            focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                          placeholder="What wants to be shared? I'm here to listen..."
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          {/* Heart-centered aurora background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                              <span className="relative z-10">
                                Opening Email...
                              </span>
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6 relative z-10" />
                              <span className="relative z-10">
                                Send Message
                              </span>
                              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Aurora form accents */}
              <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-pink-500/40 via-purple-500/30 to-transparent rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-20 h-0.5 bg-gradient-to-l from-purple-500/40 via-pink-500/30 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact - Aurora Enhanced */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/8 to-pink-500/10 opacity-80"></div>

            <div className="relative z-10 mobile-spacing-lg">
              <div
                className="text-7xl mb-12 animate-aurora-float filter drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))`,
                }}
              >
                📧
              </div>

              <h2 className="display-md gradient-aurora-text mb-12 leading-tight">
                Or Email Me Directly
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                Sometimes the simplest path is the most direct.
                <br />
                No forms, no friction, just human to human.
              </p>

              <a
                href="mailto:ahiya.butman@gmail.com"
                className="ahiya-button-premium group inline-flex items-center space-x-4 hover-lift-premium focus-premium mb-16 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Mail className="w-7 h-7 relative z-10" />
                <span className="tracking-wide text-lg relative z-10">
                  ahiya.butman@gmail.com
                </span>
                <Sparkles className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </a>

              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                <p className="gradient-aurora-text italic leading-loose tracking-wide text-lg">
                  "For collaborations, conversations about consciousness-first
                  technology,
                  <br />
                  or just to share what this work brings up for you."
                </p>
                <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
              </div>
            </div>

            {/* Aurora direct contact accents */}
            <div className="absolute top-4 right-4 w-12 h-0.5 bg-gradient-to-l from-blue-500/40 via-purple-500/30 to-transparent rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-0.5 bg-gradient-to-r from-purple-500/40 via-pink-500/30 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Sacred Potato Conclusion - Ultimate Aurora Magic */}
      <section className="py-40">
        <div className="container-narrow text-center">
          <div className="ahiya-card-premium hover-lift-premium animate-scaleIn relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-orange-500/12 to-pink-500/10 opacity-90"></div>

            {/* Sacred Potato aurora rings */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-8 rounded-full opacity-30 animate-aurora-breathe"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)",
                  animationDelay: "0s",
                }}
              ></div>
              <div
                className="absolute inset-16 rounded-full opacity-20 animate-aurora-breathe"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 152, 0, 0.08) 0%, transparent 70%)",
                  animationDelay: "2s",
                }}
              ></div>
            </div>

            <div className="relative z-10 mobile-spacing-lg">
              <div
                className="text-8xl mb-12 animate-aurora-float hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 30px rgba(255, 193, 7, 0.6))`,
                }}
              >
                🥔
              </div>

              <h2 className="display-md gradient-aurora-text mb-12 leading-tight">
                Sacred Potato Energy
              </h2>

              <p className="body-xl text-gray-300 max-w-4xl mx-auto leading-loose tracking-wide mb-16">
                I approach every conversation like a sacred potato—
                <br />
                grounded in earth, yet reaching toward light,
                <br />
                ordinary yet nourishing, simple yet profound.
              </p>

              <div className="glass-card p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
                <div className="absolute inset-4 rounded-2xl border border-yellow-400/10 opacity-50"></div>
                <p className="gradient-aurora-text italic leading-loose tracking-wide text-xl">
                  "A sacred potato experiencing the present moment
                  <br />
                  in all its ordinary magnificence."
                </p>
                <p className="text-yellow-400 mt-6 text-base tracking-wider font-medium">
                  — The Sacred Potato
                </p>
                <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
              </div>

              <p className="text-gray-400 italic max-w-3xl mx-auto leading-loose tracking-wide">
                Let&apos;s connect not from our accomplishments or aspirations,
                <br />
                but from the simple recognition of consciousness
                <br />
                meeting itself in form.
              </p>
            </div>

            {/* Sacred Potato aurora particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/4 left-1/6 w-1.5 h-1.5 bg-yellow-400/50 rounded-full animate-aurora-float"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-orange-400/40 rounded-full animate-aurora-float"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute top-2/3 left-3/4 w-0.5 h-0.5 bg-pink-400/60 rounded-full animate-aurora-float"
                style={{ animationDelay: "6s" }}
              ></div>
              <div
                className="absolute top-1/3 right-1/8 w-1 h-1 bg-yellow-300/45 rounded-full animate-aurora-float"
                style={{ animationDelay: "9s" }}
              ></div>
            </div>

            {/* Sacred Potato aurora accent lines */}
            <div className="absolute top-4 left-4 w-20 h-0.5 bg-gradient-to-r from-yellow-500/50 via-orange-500/40 to-transparent rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-0.5 bg-gradient-to-l from-orange-500/50 via-pink-500/40 to-transparent rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-0.5 h-16 bg-gradient-to-b from-yellow-500/40 via-orange-500/30 to-transparent rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-0.5 h-12 bg-gradient-to-t from-pink-500/40 via-orange-500/30 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="py-24 border-t border-gray-800/30 relative">
        <div className="container-content text-center mobile-spacing-sm">
          <div className="flex justify-center mb-10">
            <div className="aurora-logo-glow">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={44}
                height={44}
                className="opacity-60 animate-aurora-float"
              />
            </div>
          </div>

          <p className="text-gray-400 mb-6 tracking-wide text-lg">
            Made with reverence by{" "}
            <span className="text-white font-medium gradient-aurora-text">
              Ahiya
            </span>
          </p>

          <p className="text-gray-500 italic leading-relaxed tracking-wide mb-8">
            "Technology that serves consciousness"
          </p>

          <p className="text-xs text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Ahiya Butman. Space becoming human
            becoming space.
          </p>
        </div>
      </footer>

      {/* Floating heart-centered aurora particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/8 w-1 h-1 bg-pink-400/30 rounded-full animate-aurora-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/6 w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-aurora-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-2/3 left-3/4 w-0.5 h-0.5 bg-blue-400/35 rounded-full animate-aurora-float"
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/12 w-1 h-1 bg-pink-300/20 rounded-full animate-aurora-float"
          style={{ animationDelay: "12s" }}
        ></div>
      </div>
    </div>
  );
};

export default ConnectPage;
