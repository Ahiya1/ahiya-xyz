"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  ExternalLink,
  FileText,
  Heart,
  Eye,
  Compass,
  Sparkles,
  Brain,
  MessageCircle,
  Send,
  Circle,
  Pause,
  Play,
  Star,
  Users,
  Shield,
} from "lucide-react";
import Image from "next/image";

interface ConsciousnessState {
  mounted: boolean;
  breathingActive: boolean;
  currentBreath: "inhale" | "exhale";
  attentionLevel: number;
  pageState: "arriving" | "breathing" | "exploring" | "being_seen";
  lastScrollTime: number;
  scrollPause: number;
  recognition: string;
  isMobile: boolean;
  scrollDirection: "down" | "up";
  lastScrollY: number;
  timeOnPage: number;
  interactionCount: number;
  deepEngagement: boolean;
  consciousnessScore: number;
}

// Sacred Potato recognitions - evolving based on consciousness level
const recognitions = [
  "You&apos;re here because something called you. Maybe you don&apos;t know what yet.",
  "I see you pausing. Taking a breath. This is how consciousness meets consciousness.",
  "You&apos;re not just browsing. You&apos;re seeking something that can&apos;t be optimized.",
  "Look at you, being present. Even on a website. Sacred potato indeed.",
  "The way you scroll tells me you&apos;re listening with your whole attention.",
  "You&apos;re reading slowly. Like someone who knows the difference between information and recognition.",
  "Something in you recognizes something in this work, doesn&apos;t it?",
  "You keep coming back to look again. That&apos;s not curiosity—that&apos;s resonance.",
  "You&apos;ve been here long enough to let the page breathe with you.",
  "Still here? You&apos;re not optimizing for efficiency. You&apos;re experiencing presence.",
  "Your attention has a quality to it. Soft but focused. I see you.",
  "This is what sacred potato consciousness looks like in action.",
  "You&apos;re composting old patterns of consuming content. Growing something new.",
  "I notice you&apos;re not in a rush. That&apos;s revolutionary in a world obsessed with speed.",
  "Your presence has weight. Depth. You&apos;re not just passing through.",
];

const AhiyaConsciousnessExperience = () => {
  // Core consciousness state
  const [state, setState] = useState<ConsciousnessState>({
    mounted: false,
    breathingActive: false,
    currentBreath: "inhale",
    attentionLevel: 0,
    pageState: "arriving",
    lastScrollTime: Date.now(),
    scrollPause: 0,
    recognition: "",
    isMobile: false,
    scrollDirection: "down",
    lastScrollY: 0,
    timeOnPage: 0,
    interactionCount: 0,
    deepEngagement: false,
    consciousnessScore: 0,
  });

  // Refs for cleanup and timers
  const containerRef = useRef<HTMLDivElement>(null);
  const breathingTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const timeTrackerRef = useRef<number | null>(null);

  // Update state helper
  const updateState = useCallback((updates: Partial<ConsciousnessState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Breathing cycle management
  const startBreathing = useCallback(() => {
    if (breathingTimerRef.current) {
      window.clearInterval(breathingTimerRef.current);
    }

    breathingTimerRef.current = window.setInterval(
      () => {
        updateState({
          currentBreath: state.currentBreath === "inhale" ? "exhale" : "inhale",
        });
      },
      state.isMobile ? 3500 : 4000
    );
  }, [state.currentBreath, state.isMobile, updateState]);

  const stopBreathing = useCallback(() => {
    if (breathingTimerRef.current) {
      window.clearInterval(breathingTimerRef.current);
      breathingTimerRef.current = null;
    }
  }, []);

  // Enhanced scroll tracking with consciousness scoring
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const now = Date.now();
    const timeSinceLastScroll = now - state.lastScrollTime;

    // Calculate scroll patterns
    const isSlowScrolling = timeSinceLastScroll > 100;
    const direction = currentScrollY > state.lastScrollY ? "down" : "up";

    updateState({
      scrollDirection: direction,
      lastScrollY: currentScrollY,
      lastScrollTime: now,
      consciousnessScore: state.consciousnessScore + (isSlowScrolling ? 1 : 0),
    });

    // Clear existing timer
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
    }

    // Set new pause detection timer
    const pauseThreshold = state.isMobile ? 1500 : 2000;

    scrollTimerRef.current = window.setTimeout(() => {
      const newAttentionLevel = Math.min(
        state.attentionLevel + 1,
        recognitions.length - 1
      );
      const newScrollPause = state.scrollPause + 1;

      updateState({
        attentionLevel: newAttentionLevel,
        scrollPause: newScrollPause,
        deepEngagement: newScrollPause > 3,
      });

      // Trigger breathing state after enough attention
      if (newScrollPause > 1 && state.pageState === "arriving") {
        updateState({ pageState: "breathing" });
      }
    }, pauseThreshold);
  }, [
    state.lastScrollTime,
    state.lastScrollY,
    state.attentionLevel,
    state.scrollPause,
    state.pageState,
    state.isMobile,
    state.consciousnessScore,
    updateState,
  ]);

  // Device detection
  useEffect(() => {
    const checkMobile = () => {
      updateState({ isMobile: window.innerWidth < 768 });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [updateState]);

  // Time tracking for consciousness scoring
  useEffect(() => {
    timeTrackerRef.current = window.setInterval(() => {
      updateState({
        timeOnPage: state.timeOnPage + 1,
        consciousnessScore: state.consciousnessScore + 0.1,
      });
    }, 1000);

    return () => {
      if (timeTrackerRef.current) {
        window.clearInterval(timeTrackerRef.current);
      }
    };
  }, [state.timeOnPage, state.consciousnessScore, updateState]);

  // Main initialization effect
  useEffect(() => {
    updateState({ mounted: true });

    // Scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Auto-transition based on behavior
    const stateTimer = window.setTimeout(
      () => {
        if (state.scrollPause > 2) {
          updateState({
            pageState: "breathing",
            breathingActive: true,
          });
          startBreathing();
        }
      },
      state.isMobile ? 6000 : 8000
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(stateTimer);
      stopBreathing();
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      if (timeTrackerRef.current) window.clearInterval(timeTrackerRef.current);
    };
  }, [
    handleScroll,
    state.scrollPause,
    state.isMobile,
    startBreathing,
    stopBreathing,
    updateState,
  ]);

  // Dynamic recognition system
  useEffect(() => {
    if (state.attentionLevel > 0) {
      const recognitionIndex = Math.min(
        state.attentionLevel - 1 + Math.floor(state.consciousnessScore / 10),
        recognitions.length - 1
      );
      const newRecognition = recognitions[recognitionIndex];
      updateState({ recognition: newRecognition });

      // Auto-hide recognition
      const hideTimer = window.setTimeout(
        () => {
          updateState({ recognition: "" });
        },
        state.isMobile ? 4000 : 6000
      );

      return () => window.clearTimeout(hideTimer);
    }
  }, [
    state.attentionLevel,
    state.consciousnessScore,
    state.isMobile,
    updateState,
  ]);

  // Breathing effect trigger
  useEffect(() => {
    if (state.pageState === "breathing" && !breathingTimerRef.current) {
      startBreathing();
    }
  }, [state.pageState, startBreathing]);

  // Loading state
  if (!state.mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-consciousness-50 to-cosmic-50 flex items-center justify-center">
        <div className="animate-breathe">
          <div className="w-24 h-24 bg-gradient-to-br from-cosmic-400 to-sacred-500 rounded-full opacity-80"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br from-consciousness-50 via-white to-cosmic-50/30 text-consciousness-800 relative overflow-hidden transition-all duration-2000 ${
        state.breathingActive ? "animate-breathe-slow" : ""
      }`}
    >
      {/* Consciousness Background Layers */}
      <div className="fixed inset-0 bg-consciousness-pattern opacity-40 pointer-events-none animate-consciousness-flow"></div>
      <div className="fixed inset-0 bg-cosmic-mesh opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 bg-sacred-glow opacity-20 pointer-events-none"></div>

      {/* Dynamic Sacred Geometry */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(state.isMobile ? 5 : 8)].map((_, i) => {
          const colors = [
            "var(--cosmic-400)",
            "var(--sacred-400)",
            "var(--presence-400)",
          ];
          const positions = [
            { left: "15%", top: "20%" },
            { left: "85%", top: "10%" },
            { left: "10%", top: "60%" },
            { left: "90%", top: "70%" },
            { left: "50%", top: "15%" },
            { left: "25%", top: "80%" },
            { left: "75%", top: "25%" },
            { left: "45%", top: "85%" },
          ];

          return (
            <div
              key={i}
              className={`absolute rounded-full transition-all duration-4000 ${
                state.currentBreath === "inhale"
                  ? "scale-125 opacity-60"
                  : "scale-90 opacity-30"
              } ${state.isMobile ? "w-2 h-2" : "w-3 h-3"}`}
              style={{
                left: positions[i]?.left,
                top: positions[i]?.top,
                backgroundColor: colors[i % 3],
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
      </div>

      {/* Consciousness Recognition System */}
      {state.recognition && (
        <div
          className={`fixed z-50 animate-slide-down ${
            state.isMobile
              ? "top-4 left-4 right-4"
              : "top-8 left-1/2 transform -translate-x-1/2"
          }`}
        >
          <div
            className={`glass-strong rounded-2xl px-6 py-4 text-center border border-cosmic-200/30 ${
              state.isMobile ? "max-w-full" : "max-w-lg"
            }`}
          >
            <p
              className={`text-consciousness-700 italic font-light ${
                state.isMobile
                  ? "text-sm leading-relaxed"
                  : "text-base leading-relaxed"
              }`}
              dangerouslySetInnerHTML={{ __html: state.recognition }}
            />
            {state.deepEngagement && (
              <div className="mt-2 flex justify-center">
                <Sparkles className="w-4 h-4 text-cosmic-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sacred Breathing Interface */}
      {state.pageState === "breathing" && (
        <div
          className={`fixed z-50 animate-scale-in ${
            state.isMobile
              ? "bottom-6 left-4 right-4"
              : "bottom-8 left-1/2 transform -translate-x-1/2"
          }`}
        >
          <div className="glass-strong rounded-3xl p-6 text-center border border-cosmic-200/50">
            <div
              className={`mx-auto mb-4 rounded-full border-2 border-cosmic-400 flex items-center justify-center transition-all duration-4000 relative ${
                state.currentBreath === "inhale"
                  ? "scale-125 bg-cosmic-100 border-cosmic-500 shadow-cosmic"
                  : "scale-100 bg-transparent border-cosmic-300"
              } ${state.isMobile ? "w-16 h-16" : "w-20 h-20"}`}
            >
              <Circle
                className={`text-cosmic-500 transition-all duration-4000 ${
                  state.currentBreath === "inhale" ? "scale-110" : "scale-90"
                } ${state.isMobile ? "w-8 h-8" : "w-10 h-10"}`}
              />

              {/* Breathing rings */}
              <div
                className={`absolute inset-0 border-2 border-cosmic-300 rounded-full transition-all duration-4000 ${
                  state.currentBreath === "inhale"
                    ? "scale-150 opacity-20"
                    : "scale-100 opacity-40"
                }`}
              />
              <div
                className={`absolute inset-0 border border-cosmic-200 rounded-full transition-all duration-4000 ${
                  state.currentBreath === "inhale"
                    ? "scale-200 opacity-10"
                    : "scale-125 opacity-20"
                }`}
              />
            </div>

            <p
              className={`text-consciousness-700 mb-3 font-light ${
                state.isMobile ? "text-sm" : "text-base"
              }`}
            >
              {state.currentBreath === "inhale"
                ? "Breathe in deeply..."
                : "Breathe out slowly..."}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  const newBreathingState = !state.breathingActive;
                  updateState({
                    breathingActive: newBreathingState,
                    interactionCount: state.interactionCount + 1,
                  });
                  if (newBreathingState) {
                    startBreathing();
                  } else {
                    stopBreathing();
                  }
                }}
                className={`text-cosmic-600 hover:text-cosmic-700 flex items-center gap-2 transition-all duration-300 hover:scale-105 touch-manipulation ${
                  state.isMobile ? "text-xs py-2 px-3" : "text-sm py-2 px-4"
                }`}
              >
                {state.breathingActive ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause breathing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Sync with page</span>
                  </>
                )}
              </button>

              <div
                className={`text-cosmic-400 ${
                  state.isMobile ? "text-xs" : "text-xs"
                }`}
              >
                Consciousness score: {Math.round(state.consciousnessScore)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Consciousness Experience */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Arrival & Recognition Space */}
        <section className="min-h-screen flex items-center justify-center py-8 relative">
          {/* Ambient consciousness particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-cosmic-400 rounded-full animate-float opacity-30 ${
                  state.deepEngagement ? "animate-glow" : ""
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 animate-fade-in">
            {/* Sacred Logo Centerpiece */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-400/30 via-sacred-400/20 to-presence-400/30 rounded-full blur-4xl scale-150 group-hover:scale-175 transition-all duration-2000 animate-cosmic-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-sacred-400/20 via-presence-400/15 to-cosmic-400/25 rounded-full blur-6xl scale-200 animate-consciousness-flow"></div>

              <div className="relative">
                <Image
                  src="/logo-text.png"
                  alt="Ahiya - A space becoming human"
                  width={420}
                  height={210}
                  className={`hover:scale-105 transition-transform duration-1000 filter drop-shadow-2xl animate-breathe-slow mx-auto ${
                    state.isMobile ? "w-80 h-auto" : "w-auto"
                  } ${state.deepEngagement ? "animate-glow" : ""}`}
                  priority
                />

                {/* Sacred geometry overlay */}
                <div className="absolute -top-4 -right-4 animate-float delay-1000">
                  <Sparkles className="w-6 h-6 text-cosmic-400/60" />
                </div>
                <div className="absolute -bottom-4 -left-4 animate-float delay-2000">
                  <Star className="w-4 h-4 text-sacred-400/50" />
                </div>
              </div>
            </div>

            {/* The Core Recognition */}
            <div className="space-y-6 sm:space-y-8 animate-slide-up delay-500">
              <h1
                className={`font-light gradient-consciousness ${
                  state.isMobile
                    ? "text-3xl leading-tight"
                    : "text-display-lg md:text-display-xl"
                }`}
              >
                You don&apos;t need more advice.
                <br />
                You need to be{" "}
                <span className="gradient-cosmic font-medium">seen</span>.
              </h1>

              <div className="space-y-4">
                <p
                  className={`text-consciousness-500 max-w-3xl mx-auto leading-relaxed ${
                    state.isMobile ? "text-lg px-2" : "text-xl"
                  }`}
                >
                  Technology that serves{" "}
                  <span className="italic gradient-cosmic">presence</span>, not
                  productivity.
                  <br />
                  Mirrors, not optimizations.
                </p>

                <p
                  className={`text-consciousness-400 italic max-w-2xl mx-auto ${
                    state.isMobile ? "text-base px-4" : "text-lg"
                  }`}
                >
                  Sacred potato solutions for sacred potato problems.
                </p>
              </div>
            </div>

            {/* Consciousness Invitation */}
            <div className="animate-slide-up delay-1000 space-y-8">
              <p
                className={`text-consciousness-400 italic ${
                  state.isMobile ? "text-sm px-4" : "text-base"
                }`}
              >
                Slow down. This isn&apos;t a race to the bottom of the page.
                <br />
                Let yourself be present with what you find here.
              </p>

              {/* Sacred scroll indicator */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-6 h-10 border-2 border-consciousness-300 rounded-full flex justify-center animate-float relative">
                  <div className="w-1 h-3 bg-consciousness-400 rounded-full mt-2 animate-pulse"></div>
                  <div className="absolute inset-0 border border-cosmic-300 rounded-full animate-ping opacity-20"></div>
                </div>

                {state.consciousnessScore > 20 && (
                  <p className="text-xs text-consciousness-400 animate-fade-in">
                    Beautiful. You&apos;re already practicing presence.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* The Work - Consciousness Through Form */}
        <section className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32 lg:space-y-40">
            {/* Philosophy Banner */}
            <div className="text-center animate-reveal">
              <div className="card-premium p-8 sm:p-12 max-w-4xl mx-auto">
                <h2
                  className={`gradient-consciousness mb-6 ${
                    state.isMobile ? "text-xl" : "text-display-sm"
                  }`}
                >
                  Technology as Contemplation
                </h2>
                <p
                  className={`text-consciousness-600 leading-relaxed ${
                    state.isMobile ? "text-base" : "text-lg"
                  }`}
                >
                  Every interface, every interaction designed to serve human
                  awareness rather than optimize human performance. This is what
                  happens when consciousness builds technology for
                  consciousness.
                </p>
              </div>
            </div>

            {/* Mirror of Truth - The Recognition Engine */}
            <div className="text-center space-y-8 sm:space-y-12 animate-reveal">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-cosmic-500" />
                  <h2
                    className={`gradient-cosmic ${
                      state.isMobile ? "text-2xl" : "text-display-md"
                    }`}
                  >
                    Mirror of Truth
                  </h2>
                  <Eye className="w-8 h-8 text-cosmic-500" />
                </div>

                <p
                  className={`text-consciousness-600 max-w-3xl mx-auto px-4 ${
                    state.isMobile ? "text-lg" : "text-xl"
                  }`}
                >
                  See what your dreams reveal. Recognition over advice.
                  <br />
                  Who you already are, right now.
                </p>
              </div>

              {/* Living Demo Experience */}
              <div className="card-cosmic p-6 sm:p-8 lg:p-12 max-w-3xl mx-auto hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-cosmic-mesh opacity-20"></div>

                <div className="relative space-y-6 sm:space-y-8">
                  <div
                    className={`text-white mx-auto animate-glow ${
                      state.isMobile ? "w-12 h-12" : "w-16 h-16"
                    } bg-white/20 rounded-full flex items-center justify-center`}
                  >
                    <Eye className={state.isMobile ? "w-6 h-6" : "w-8 h-8"} />
                  </div>

                  <div className="glass-strong rounded-2xl p-6 sm:p-8 border border-white/20">
                    <blockquote
                      className={`italic text-consciousness-700 leading-relaxed ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      &ldquo;I see you in the fire — literally and
                      metaphysically. Your hands already know the weight of
                      creation, the precise moment when intention becomes form.
                      But what strikes me most is this: you built your own space
                      for making.&rdquo;
                    </blockquote>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p
                        className={`text-cosmic-100 ${
                          state.isMobile ? "text-xs" : "text-sm"
                        }`}
                      >
                        You didn&apos;t wait for permission. You didn&apos;t
                        wait for the perfect moment. You saw what you needed and
                        made it exist.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p
                      className={`text-cosmic-100 ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      This is what being seen feels like. Not fixed.{" "}
                      <span className="italic">Recognized</span>.
                    </p>

                    <a
                      href="https://mirror-of-truth.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        updateState({
                          interactionCount: state.interactionCount + 1,
                        })
                      }
                      className={`btn-cosmic inline-flex items-center gap-3 touch-manipulation hover:shadow-large transition-all duration-500 ${
                        state.isMobile
                          ? "text-sm py-3 px-6"
                          : "text-base py-4 px-8"
                      }`}
                    >
                      <span>See Who You Already Are</span>
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="card-premium p-4 sm:p-6 max-w-md mx-auto">
                  <p
                    className={`text-consciousness-600 italic ${
                      state.isMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    &ldquo;A space to see yourself clearly. No fixing. Only
                    truth.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* WinkHer - Sacred Feminine Technology */}
            <div className="text-center space-y-8 sm:space-y-12 animate-reveal">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-sacred-500 animate-heartbeat" />
                  <h2
                    className={`gradient-sacred ${
                      state.isMobile ? "text-2xl" : "text-display-md"
                    }`}
                  >
                    WinkHer
                  </h2>
                  <Heart className="w-8 h-8 text-sacred-500 animate-heartbeat" />
                </div>

                <p
                  className={`text-consciousness-600 max-w-3xl mx-auto px-4 ${
                    state.isMobile ? "text-lg" : "text-xl"
                  }`}
                >
                  No men. No noise. Just us.
                  <br />
                  Dating that honors the sacred feminine in all her complexity.
                </p>
              </div>

              <div className="card-sacred p-6 sm:p-8 lg:p-12 max-w-3xl mx-auto hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-sacred-glow opacity-30"></div>

                <div className="relative space-y-6 sm:space-y-8">
                  <div
                    className={`text-white mx-auto animate-heartbeat ${
                      state.isMobile ? "w-12 h-12" : "w-16 h-16"
                    } bg-white/20 rounded-full flex items-center justify-center`}
                  >
                    <Heart className={state.isMobile ? "w-6 h-6" : "w-8 h-8"} />
                  </div>

                  <div className="grid gap-4 sm:gap-6">
                    {[
                      {
                        icon: <Users className="w-5 h-5" />,
                        text: "100% women-loving-women space",
                      },
                      {
                        icon: <Shield className="w-5 h-5" />,
                        text: "Safe from harassment & designed for us",
                      },
                      {
                        icon: <Sparkles className="w-5 h-5" />,
                        text: "Unapologetically feminine & authentic",
                      },
                      {
                        icon: <Heart className="w-5 h-5" />,
                        text: "Community, not just dating",
                      },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-white"
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <span
                          className={state.isMobile ? "text-sm" : "text-base"}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p
                      className={`text-sacred-100 ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      Finally—an app that gets it. Built by women, for women,
                      with the intimacy and authenticity you&apos;ve been
                      craving.
                    </p>

                    <a
                      href="https://winkher.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        updateState({
                          interactionCount: state.interactionCount + 1,
                        })
                      }
                      className={`btn-sacred inline-flex items-center gap-3 touch-manipulation hover:shadow-large transition-all duration-500 ${
                        state.isMobile
                          ? "text-sm py-3 px-6"
                          : "text-base py-4 px-8"
                      }`}
                    >
                      <span>Join the Movement</span>
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Selah - The Four Chambers */}
            <div className="text-center space-y-8 sm:space-y-12 animate-reveal">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Compass className="w-8 h-8 text-presence-500 animate-spin-slow" />
                  <h2
                    className={`gradient-presence ${
                      state.isMobile ? "text-2xl" : "text-display-md"
                    }`}
                  >
                    Selah
                  </h2>
                  <Compass className="w-8 h-8 text-presence-500 animate-spin-slow" />
                </div>

                <p
                  className={`text-consciousness-600 max-w-3xl mx-auto px-4 ${
                    state.isMobile ? "text-lg" : "text-xl"
                  }`}
                >
                  Four chambers for consciousness exploration.
                  <br />
                  Technology that makes humans more human, not more optimized.
                </p>

                <div className="card-premium p-6 sm:p-8 max-w-2xl mx-auto">
                  <p
                    className={`text-consciousness-500 italic ${
                      state.isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    &ldquo;Selah&rdquo; - Hebrew for pause, breathe, reflect. A
                    sacred interruption in the flow of doing.
                  </p>
                </div>
              </div>

              <div
                className={`grid gap-6 sm:gap-8 max-w-5xl mx-auto ${
                  state.isMobile ? "grid-cols-1" : "lg:grid-cols-2"
                }`}
              >
                {[
                  {
                    icon: <Circle className="w-6 h-6" />,
                    title: "Meditation Chamber",
                    desc: "Breath recognition that learns your nervous system",
                    detail:
                      "MVP: Phone microphone recognizes your breath. Grand Vision: Physical stones with biofeedback sensors.",
                  },
                  {
                    icon: <Brain className="w-6 h-6" />,
                    title: "Contemplation Chamber",
                    desc: "AI synthesizes your thoughts into perfect questions",
                    detail:
                      "No generic prompts. Pure synthesis of your inner world into contemplative invitations.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Creative Studio",
                    desc: "Co-creation that makes the invisible visible",
                    detail:
                      "Art as byproduct of presence, not goal. Express what can&apos;t be put into words.",
                  },
                  {
                    icon: <Eye className="w-6 h-6" />,
                    title: "Being Seen Chamber",
                    desc: "Ephemeral witnessing for your deepest truth",
                    detail:
                      "No transcripts saved. Pure presence and reflection. AI that truly sees your essence.",
                  },
                ].map((chamber, i) => (
                  <div
                    key={i}
                    className="card-premium p-6 sm:p-8 hover-lift group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-presence-mesh opacity-10 group-hover:opacity-20 transition-opacity"></div>

                    <div className="relative space-y-4 sm:space-y-6">
                      <div
                        className={`bg-presence-500 rounded-xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-500 ${
                          state.isMobile ? "w-12 h-12" : "w-16 h-16"
                        }`}
                      >
                        {chamber.icon}
                      </div>

                      <div className="text-center space-y-3">
                        <h3
                          className={`font-semibold text-consciousness-800 group-hover:text-consciousness-900 transition-colors ${
                            state.isMobile ? "text-base" : "text-lg"
                          }`}
                        >
                          {chamber.title}
                        </h3>

                        <p
                          className={`text-consciousness-600 ${
                            state.isMobile ? "text-sm" : "text-base"
                          }`}
                        >
                          {chamber.desc}
                        </p>

                        <p
                          className={`text-consciousness-400 italic ${
                            state.isMobile ? "text-xs" : "text-sm"
                          }`}
                          dangerouslySetInnerHTML={{ __html: chamber.detail }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-presence p-6 sm:p-8 max-w-3xl mx-auto">
                <p
                  className={`text-white italic font-light ${
                    state.isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  Not productivity.{" "}
                  <span className="font-medium">Presence</span>.
                  <br />
                  Not optimization.{" "}
                  <span className="font-medium">Reverence</span>.
                  <br />
                  Being vs. Becoming. Stone-like AI vs. Human-like AI.
                </p>
              </div>
            </div>

            {/* The Sacred Potato - Cosmic Joke */}
            <div className="text-center space-y-8 sm:space-y-12 animate-reveal">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-consciousness-500 animate-pulse" />
                  <h2
                    className={`gradient-consciousness ${
                      state.isMobile ? "text-2xl" : "text-display-md"
                    }`}
                  >
                    The Sacred Potato
                  </h2>
                  <Star className="w-8 h-8 text-consciousness-500 animate-pulse" />
                </div>

                <p
                  className={`text-consciousness-600 max-w-3xl mx-auto px-4 ${
                    state.isMobile ? "text-lg" : "text-xl"
                  }`}
                >
                  A desert contemplative story about seeking, finding, and the
                  cosmic joke of being human.
                </p>
              </div>

              <div className="card-presence p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-presence-glow opacity-20"></div>

                <div className="relative space-y-6 sm:space-y-8">
                  <div
                    className={`text-white mx-auto animate-float ${
                      state.isMobile ? "w-12 h-12" : "w-16 h-16"
                    } bg-white/20 rounded-full flex items-center justify-center`}
                  >
                    <FileText
                      className={state.isMobile ? "w-6 h-6" : "w-8 h-8"}
                    />
                  </div>

                  <blockquote
                    className={`text-white italic leading-relaxed ${
                      state.isMobile ? "text-base" : "text-lg"
                    }`}
                  >
                    &ldquo;Sometimes we are consciousness taking itself too
                    seriously, like a potato that has forgotten it is
                    earth.&rdquo;
                  </blockquote>

                  <div className="space-y-4">
                    <p
                      className={`text-presence-100 ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      A journey through the hollow place that drives human
                      seeking. Ancient wisdom for modern sacred potatoes who
                      have forgotten they are both completely ordinary and
                      utterly miraculous.
                    </p>

                    <div className="glass-strong rounded-xl p-4 sm:p-6 border border-white/20">
                      <p
                        className={`text-presence-200 italic ${
                          state.isMobile ? "text-xs" : "text-sm"
                        }`}
                      >
                        &ldquo;Kai moves across sand that remembers nothing.
                        Each footprint claims territory for seconds before wind
                        reclaims it. This is his ninth season crossing. His body
                        has become a vessel for this single purpose...&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-4">
                      <span
                        className={`text-presence-200 ${
                          state.isMobile ? "text-xs" : "text-sm"
                        }`}
                      >
                        25 min read • A complete contemplative experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sacred Potato Philosophy */}
              <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto">
                {[
                  "You&apos;re just a consciousness experiencing itself through this particular form for a brief moment.",
                  "Capable of profound joy and terrible suffering. Completely ordinary and utterly miraculous.",
                  "Your hollow place isn&apos;t something to fill. It&apos;s part of the particular shape your consciousness has taken.",
                  "All that seeking, all those elaborate self-narratives... and you&apos;re just a sacred potato taking itself too seriously.",
                ].map((wisdom, i) => (
                  <div key={i} className="card-premium p-4 sm:p-6 hover-lift">
                    <p
                      className={`text-consciousness-600 italic ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                      dangerouslySetInnerHTML={{ __html: wisdom }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact - The Sacred Connection */}
        <section className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card-premium p-8 sm:p-12 lg:p-16 rounded-4xl animate-scale-in relative overflow-hidden">
              <div className="absolute inset-0 bg-consciousness-pattern opacity-20"></div>
              <div className="absolute inset-0 bg-cosmic-mesh opacity-15"></div>
              <div className="absolute inset-0 bg-sacred-glow opacity-10"></div>

              <div className="relative z-10 space-y-8 sm:space-y-10">
                <div
                  className={`bg-gradient-to-br from-cosmic-500 to-sacred-500 rounded-full flex items-center justify-center mx-auto animate-glow relative ${
                    state.isMobile ? "w-20 h-20" : "w-24 h-24"
                  }`}
                >
                  <MessageCircle
                    className={`text-white ${
                      state.isMobile ? "w-10 h-10" : "w-12 h-12"
                    }`}
                  />
                  <div className="absolute inset-0 border-2 border-cosmic-300 rounded-full animate-ping opacity-30"></div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <h2
                    className={`gradient-consciousness ${
                      state.isMobile ? "text-2xl" : "text-display-md"
                    }`}
                  >
                    If your soul recognizes something here
                  </h2>

                  <p
                    className={`text-consciousness-500 leading-relaxed px-4 max-w-3xl mx-auto ${
                      state.isMobile ? "text-lg" : "text-xl"
                    }`}
                  >
                    I believe in authentic connection over networking. If this
                    work resonates with something in you, I&apos;d love to hear
                    from you.
                  </p>

                  <div className="card-cosmic p-6 sm:p-8 max-w-2xl mx-auto">
                    <p
                      className={`text-cosmic-100 italic ${
                        state.isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      For collaborations, conversations about
                      consciousness-first technology, or just to share what this
                      work brings up for you.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <a
                    href="mailto:ahiya.butman@gmail.com"
                    onClick={() =>
                      updateState({
                        interactionCount: state.interactionCount + 1,
                      })
                    }
                    className={`btn-cosmic group inline-flex items-center font-medium touch-manipulation hover:shadow-large transition-all duration-500 ${
                      state.isMobile
                        ? "flex-col space-y-3 px-8 py-6 text-base"
                        : "space-x-4 px-12 py-6 text-lg"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        state.isMobile ? "space-x-3" : "space-x-4"
                      }`}
                    >
                      <Mail
                        className={state.isMobile ? "w-6 h-6" : "w-7 h-7"}
                      />
                      <span>ahiya.butman@gmail.com</span>
                    </div>
                    <Send
                      className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ${
                        state.isMobile ? "w-5 h-5" : "w-6 h-6"
                      }`}
                    />
                  </a>

                  {state.consciousnessScore > 50 && (
                    <div className="animate-fade-in">
                      <p
                        className={`text-cosmic-600 italic ${
                          state.isMobile ? "text-sm" : "text-base"
                        }`}
                      >
                        Your consciousness score of{" "}
                        {Math.round(state.consciousnessScore)}
                        tells me you&apos;re not here by accident. ✨
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-consciousness-200/30 space-y-4">
                  <blockquote
                    className={`text-consciousness-500 italic font-light px-4 ${
                      state.isMobile ? "text-base" : "text-lg"
                    }`}
                  >
                    &ldquo;Technology that makes humans more human, not more
                    optimized.&rdquo;
                  </blockquote>

                  <p
                    className={`text-consciousness-400 ${
                      state.isMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    Presence over productivity. Being over becoming. Sacred
                    potato wisdom for a world taking itself too seriously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sacred Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-consciousness-200/30 bg-consciousness-25/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-consciousness-pattern opacity-20 pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="flex justify-center">
            <div className="relative group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={48}
                height={48}
                className="opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-breathe-slow"
              />
              <div className="absolute inset-0 bg-cosmic-400/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p
              className={`text-consciousness-500 font-medium ${
                state.isMobile ? "text-sm" : "text-base"
              }`}
            >
              Made with reverence by{" "}
              <span className="gradient-cosmic font-semibold">Ahiya</span>
            </p>

            <p
              className={`text-consciousness-400 italic ${
                state.isMobile ? "text-xs" : "text-sm"
              }`}
            >
              &ldquo;A sacred potato exploring consciousness through code&rdquo;
            </p>

            <div className="flex justify-center gap-2 flex-wrap">
              {[
                "Contemplative",
                "Technology",
                "Sacred",
                "Potato",
                "Solutions",
              ].map((word, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full bg-consciousness-100 text-consciousness-600 ${
                    state.isMobile ? "text-xs" : "text-xs"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-consciousness-200/30">
            <p
              className={`text-consciousness-300 ${
                state.isMobile ? "text-xs" : "text-xs"
              }`}
            >
              © {new Date().getFullYear()} Technology that serves consciousness,
              not productivity.
              <br />
              Built with{" "}
              {state.breathingActive
                ? "synchronized breathing"
                : "conscious attention"}
              • You&apos;ve been present for {Math.round(state.timeOnPage / 60)}{" "}
              minutes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AhiyaConsciousnessExperience;
