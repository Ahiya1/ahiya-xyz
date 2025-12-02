"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, Mail, Heart } from "lucide-react";
import { MobileNav } from "@/app/components/MobileNav";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const subject = encodeURIComponent(
        formData.subject || "Connection from ahiya.xyz"
      );
      const body = encodeURIComponent(
        `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:ahiya.butman@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      setTimeout(() => {
        setSubmitStatus("success");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1000);
    } catch {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

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
      <MobileNav currentPath="/soul/connect" />

      {/* Hero */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-purple-300">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Connect</span>
              </div>
            </div>

            <h1 className="display-lg spacing-generous text-gentle">
              If your soul recognizes
              <br />
              something here
            </h1>

            <p className="body-xl text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              I believe in authentic connection over networking. If what I'm
              building resonates with something in you, I'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-breathing">
        <div className="container-narrow">
          <div className="contemplative-card p-12">
            {submitStatus === "success" ? (
              <div className="text-center">
                <div className="text-6xl mb-8 animate-float">✨</div>
                <h2 className="heading-xl spacing-comfortable">
                  Your email client should be opening...
                </h2>
                <p className="body-lg text-slate-300 spacing-comfortable leading-relaxed">
                  Thank you for reaching out. Your message has been prepared in
                  your email client.
                  <br />
                  If it didn't open automatically, you can email me directly at{" "}
                  <a
                    href="mailto:ahiya.butman@gmail.com"
                    className="text-gentle hover:text-purple-300 underline"
                  >
                    ahiya.butman@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="gentle-button mt-8"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <div className="text-5xl mb-8 animate-float">💌</div>
                  <h2 className="heading-xl spacing-comfortable">
                    Let's begin a conversation
                  </h2>
                  <p className="body-lg text-slate-300 leading-relaxed">
                    Share what's alive in you. I read every message personally.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-slate-300 font-medium mb-3"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 
                          focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="What shall I call you?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-slate-300 font-medium mb-3"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 
                          focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="How can I reach you?"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-slate-300 font-medium mb-3"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                        text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 
                        focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-slate-300 font-medium mb-3"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                        text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 
                        focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="What wants to be shared? I'm here to listen..."
                    />
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gentle-button group inline-flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Opening Email...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Direct Email */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="text-5xl mb-8 animate-float">📧</div>

            <h2 className="heading-xl spacing-comfortable">
              Or email me directly
            </h2>

            <p className="body-xl text-slate-300 max-w-xl mx-auto spacing-comfortable leading-relaxed">
              Sometimes the simplest path is the most direct. No forms, no
              friction, just human to human.
            </p>

            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3 mb-8"
            >
              <Mail className="w-5 h-5" />
              <span>ahiya.butman@gmail.com</span>
            </a>

            <div className="breathing-glass p-8">
              <p className="sacred-text">
                "For collaborations, conversations about consciousness-first
                technology,
                <br />
                or just to share what this work brings up for you."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Potato */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-12">
            <div className="text-6xl mb-8 animate-float">🥔</div>

            <h2 className="heading-xl spacing-comfortable">
              Sacred Potato Energy
            </h2>

            <div className="space-y-6 text-left">
              <p className="body-lg text-slate-300 leading-relaxed">
                I approach every conversation like a sacred potato—grounded in
                earth, yet reaching toward light. Ordinary yet nourishing.
                Simple yet profound.
              </p>

              <div className="sacred-quote">
                "A sacred potato experiencing the present moment in all its
                ordinary magnificence."
              </div>

              <p className="body-lg text-slate-300 leading-relaxed text-center">
                Let's connect not from our accomplishments or aspirations, but
                from the simple recognition of consciousness meeting itself in
                form.
              </p>
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

export default ConnectPage;
