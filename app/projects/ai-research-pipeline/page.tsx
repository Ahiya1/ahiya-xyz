"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Lock, ArrowRight, FileText, Users, Brain, CheckCircle, Database, Sparkles, Activity, Zap } from "lucide-react";

// TypeScript interfaces
interface SampleNarrative {
  id: string;
  title: string;
  profile: {
    age: string;
    sport: string;
    region: string;
    citySize: string;
    background: string;
    trainingHours: string;
    travelTime: string;
    cost: string;
  };
  narrative: string;
}

interface MetricItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TechDeepDiveItem {
  name: string;
  why: string;
}

interface NextProject {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
}

interface PipelineStep {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface ThemeNode {
  id: string;
  label: string;
  size: number;
  x: number;
  y: number;
  color: string;
  connections: string[];
}

// Research Lab Ambient Background Component
function ResearchLabAmbient({ mounted }: { mounted: boolean }) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle research grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs - scientific colors */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-cyan-500/8 rounded-full blur-[90px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] bg-purple-500/6 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[70px]" />

      {/* Floating data points - only when mounted and motion is OK */}
      {mounted && !prefersReducedMotion && Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      {/* Diagonal light beams (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(6, 182, 212, 0.1) 50%, transparent 60%)',
        }}
      />
    </div>
  );
}

// Pipeline Flow Visualization Component - Enhanced with Research Lab aesthetic
function PipelineFlowVisualization() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance through pipeline steps
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, [mounted]);

  const steps: PipelineStep[] = [
    { icon: <FileText className="w-5 h-5" />, label: "Research Question", description: "Define your study parameters" },
    { icon: <Users className="w-5 h-5" />, label: "Demographic Design", description: "Factorial variable combinations" },
    { icon: <Brain className="w-5 h-5" />, label: "AI Generation", description: "Culturally-aware synthesis" },
    { icon: <CheckCircle className="w-5 h-5" />, label: "Quality Check", description: "Validation & authenticity" },
    { icon: <Database className="w-5 h-5" />, label: "Output", description: "Structured data export" },
  ];

  if (!mounted) return <div className="h-32 bg-slate-800/30 rounded-xl animate-pulse" />;

  return (
    <div className="relative">
      {/* Processing label */}
      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-cyan-500/10 border border-cyan-400/20 rounded text-[10px] text-cyan-400 font-mono tracking-wider">
        PROCESSING
      </div>

      <div className="contemplative-card p-6 md:p-8 overflow-hidden border-cyan-500/10">
        {/* Pipeline Steps */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Node */}
              <div
                className={`flex flex-col items-center transition-all duration-500 ${
                  activeStep === index
                    ? "scale-110"
                    : activeStep > index
                    ? "opacity-60"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all duration-500 relative ${
                    activeStep === index
                      ? "bg-cyan-500/30 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30"
                      : activeStep > index
                      ? "bg-emerald-500/20 border border-emerald-400/50"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  {/* Glow effect for active step */}
                  {activeStep === index && (
                    <div className="absolute inset-0 rounded-xl bg-cyan-400/20 animate-pulse" />
                  )}
                  <div
                    className={`relative z-10 transition-colors duration-500 ${
                      activeStep === index
                        ? "text-cyan-300"
                        : activeStep > index
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>
                <span
                  className={`text-xs font-medium text-center transition-colors duration-500 ${
                    activeStep === index
                      ? "text-cyan-300"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-500 text-center max-w-[100px] mt-1 hidden md:block">
                  {step.description}
                </span>
              </div>

              {/* Connector Line - Enhanced with glowing connections */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-12 lg:w-20 h-[2px] relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full" />
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
                      activeStep > index
                        ? "w-full bg-gradient-to-r from-cyan-400/60 to-emerald-400/60"
                        : activeStep === index
                        ? "w-1/2 bg-cyan-400/60 animate-pulse"
                        : "w-0"
                    }`}
                  />
                  {/* Glow on active connection */}
                  {activeStep === index && (
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-cyan-400/30 blur-sm rounded-full" />
                  )}
                  {/* Animated particle */}
                  {activeStep === index && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-[flow_1s_ease-in-out_infinite]" />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden mt-6">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-slate-400 mt-3">
            {steps[activeStep]?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Theme Network Visualization Component - Enhanced with glowing connections
function ThemeNetworkVisualization() {
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes: ThemeNode[] = [
    { id: "family", label: "Family Pressure", size: 48, x: 50, y: 25, color: "purple", connections: ["time", "cultural"] },
    { id: "financial", label: "Financial Burden", size: 42, x: 20, y: 50, color: "cyan", connections: ["travel", "equipment"] },
    { id: "cultural", label: "Cultural Barriers", size: 52, x: 80, y: 45, color: "purple", connections: ["family", "identity"] },
    { id: "time", label: "Time Conflict", size: 38, x: 35, y: 70, color: "teal", connections: ["family", "education"] },
    { id: "identity", label: "Identity Struggle", size: 44, x: 65, y: 75, color: "purple", connections: ["cultural", "community"] },
    { id: "travel", label: "Travel Exhaustion", size: 36, x: 15, y: 80, color: "cyan", connections: ["financial", "time"] },
    { id: "education", label: "Academic Priority", size: 40, x: 50, y: 55, color: "teal", connections: ["time", "future"] },
    { id: "community", label: "Community Support", size: 34, x: 85, y: 70, color: "purple", connections: ["identity", "cultural"] },
    { id: "equipment", label: "Equipment Costs", size: 30, x: 8, y: 35, color: "cyan", connections: ["financial"] },
    { id: "future", label: "Career Focus", size: 36, x: 70, y: 20, color: "teal", connections: ["education"] },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      purple: { bg: "bg-purple-500/20", border: "border-purple-400/50", text: "text-purple-300", glow: "shadow-purple-500/40" },
      cyan: { bg: "bg-cyan-500/20", border: "border-cyan-400/50", text: "text-cyan-300", glow: "shadow-cyan-500/40" },
      teal: { bg: "bg-teal-500/20", border: "border-teal-400/50", text: "text-teal-300", glow: "shadow-teal-500/40" },
    };
    return colors[color] || colors.purple;
  };

  if (!mounted) return <div className="h-[400px] bg-slate-800/30 rounded-xl animate-pulse" />;

  return (
    <div className="relative">
      {/* Analysis label */}
      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-purple-500/10 border border-purple-400/20 rounded text-[10px] text-purple-400 font-mono tracking-wider">
        THEME ANALYSIS
      </div>

      <div className="contemplative-card p-6 md:p-8 border-purple-500/10">
        <div className="relative h-[350px] md:h-[400px] overflow-hidden">
          {/* Connection Lines (SVG) - Enhanced with glow on hover */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <defs>
              {/* Glow filter for active connections */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {themes.map((theme) =>
              theme.connections.map((connId) => {
                const connTheme = themes.find((t) => t.id === connId);
                if (!connTheme) return null;
                const isActive = hoveredNode === theme.id || hoveredNode === connId;
                return (
                  <line
                    key={`${theme.id}-${connId}`}
                    x1={`${theme.x}%`}
                    y1={`${theme.y}%`}
                    x2={`${connTheme.x}%`}
                    y2={`${connTheme.y}%`}
                    stroke={isActive ? "rgba(6, 182, 212, 0.7)" : "rgba(255, 255, 255, 0.08)"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray={isActive ? "0" : "4"}
                    filter={isActive ? "url(#glow)" : undefined}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Theme Nodes */}
          {themes.map((theme, index) => {
            const colors = getColorClass(theme.color);
            const isConnected = hoveredNode
              ? themes.find((t) => t.id === hoveredNode)?.connections.includes(theme.id) || theme.id === hoveredNode
              : true;
            return (
              <div
                key={theme.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer ${
                  hoveredNode && !isConnected ? "opacity-30 scale-90" : "opacity-100"
                }`}
                style={{
                  left: `${theme.x}%`,
                  top: `${theme.y}%`,
                  animationDelay: `${index * 0.3}s`,
                }}
                onMouseEnter={() => setHoveredNode(theme.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`
                    flex items-center justify-center rounded-full border backdrop-blur-sm
                    transition-all duration-300 theme-node-float
                    ${colors.bg} ${colors.border}
                    ${hoveredNode === theme.id ? `scale-125 shadow-lg ${colors.glow}` : ""}
                  `}
                  style={{
                    width: `${theme.size}px`,
                    height: `${theme.size}px`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <span className={`text-[9px] md:text-[10px] font-medium text-center px-1 ${colors.text}`}>
                    {theme.label.split(" ")[0]}
                  </span>
                </div>
                {/* Tooltip on hover */}
                {hoveredNode === theme.id && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 px-2 py-1 rounded text-xs text-white border border-cyan-400/20 z-10">
                    {theme.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-[10px] text-slate-500">
            <span>Node size = theme frequency</span>
            <span>Lines = theme relationships</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics Card Component - Enhanced with live data pulse effect
function StatCard({ value, label, icon, delay }: { value: string; label: string; icon: React.ReactNode; delay: number }) {
  const [count, setCount] = useState("0");
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setCount(value);
      setIsInView(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [mounted, value, delay]);

  return (
    <div className="breathing-glass p-6 text-center group hover:border-cyan-400/20 transition-all duration-300 relative overflow-hidden">
      {/* Subtle pulse effect when value updates */}
      {isInView && (
        <div className="absolute inset-0 bg-cyan-500/5 animate-[pulse_2s_ease-in-out_1]" />
      )}

      <div className="relative z-10">
        <div className="flex justify-center mb-3 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
        <div className={`text-3xl md:text-4xl font-bold text-gentle mb-2 tabular-nums transition-all duration-500 ${isInView ? 'text-cyan-50' : ''}`}>
          {count}
        </div>
        <div className="text-slate-400 text-sm">
          {label}
        </div>
      </div>

      {/* Data indicator */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-pulse" />
    </div>
  );
}

const AIResearchPipelinePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeNarrative, setActiveNarrative] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    // Initialize visible paragraphs for first narrative
    const initialParagraphs = sampleNarratives[0]?.narrative.split('\n\n') || [];
    initialParagraphs.forEach((_, i) => {
      setTimeout(() => {
        setVisibleParagraphs(prev => [...prev, i]);
      }, i * 200);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle tab change with streaming reveal
  const handleTabChange = useCallback((index: number) => {
    if (index === activeNarrative || isTransitioning) return;

    setIsTransitioning(true);
    setVisibleParagraphs([]);

    setTimeout(() => {
      setActiveNarrative(index);
      setIsTransitioning(false);

      // Stagger paragraph reveals
      const paragraphs = sampleNarratives[index]?.narrative.split('\n\n') || [];
      paragraphs.forEach((_, i) => {
        setTimeout(() => {
          setVisibleParagraphs(prev => [...prev, i]);
        }, i * 200);
      });
    }, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNarrative, isTransitioning]);

  const sampleNarratives: SampleNarrative[] = [
    {
      id: "orthodox-basketball",
      title: "Orthodox Jewish Basketball Player",
      profile: {
        age: "17-18 years old",
        sport: "Basketball",
        region: "South",
        citySize: "Large City",
        background: "Ultra-Orthodox Jewish",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Few hundred shekels/month",
      },
      narrative: `I started playing basketball at 12, when my mother was looking for suitable physical activity for Orthodox girls. The club was one of the few that offered a framework adapted to our background\u2014all training respected modesty rules.

Training 16-18 hours a week became my entire life. Between my younger sisters, homework, and house chores, I only had time left for sleep. I'd wake at 5:30 AM for strength training, return for classes, then back to practice in the afternoon. Every day.

The hour-and-a-half drive each way completely destroyed me. Dad drove me every time, and I could see how it exhausted him too. He left work, waited in the car for two hours, then another hour and a half home. It was hard on the whole family.

Our Orthodox background created unique challenges\u2014finding appropriate facilities, proper clothing, and dealing with stares from people who didn't understand how a Haredi girl could play basketball at a high level. Sometimes I felt like an alien between two worlds.

A few hundred shekels a month doesn't sound like much, but for a family with limited income, it was extremely hard. Counting every shekel, while knowing I needed better equipment, personal training, overseas competitions.

I decided to leave when I realized I wasn't enjoying it anymore. The physical, emotional, and financial pressure became unbearable. At 17, I felt like an old woman who had already given everything. I wanted to live a normal life like other girls my age.`,
    },
    {
      id: "muslim-sailor",
      title: "Muslim Arab Sailor",
      profile: {
        age: "15-16 years old",
        sport: "Sailing",
        region: "North",
        citySize: "Small City",
        background: "Muslim Arab",
        trainingHours: "18-20 hours/week",
        travelTime: "Under 1 hour",
        cost: "Free",
      },
      narrative: `My Experience as a Muslim Sailor Who Left Competitive Sport

I started sailing almost by accident. One summer, the local yacht club opened a free youth program, and my parents encouraged me to try. From the first moment I went out on the water, I felt a freedom I'd never known. The sea doesn't recognize religion or gender\u2014only talent and determination.

18-20 hours of training per week meant my life revolved around the club. I woke at five in the morning, returned at seven or eight in the evening. Teachers at school complained about absences, and close friends drifted away. The 45-minute drive to the club was my only time to rest, listen to music, or just review lessons.

My cultural background added complex challenges. I wore a special suit that covered my entire body, even in the heavy Galilee summer heat. Some Jewish parents at the club weren't comfortable with my presence, and I always felt I needed to prove myself twice as hard. On the other hand, I received surprising support from my community\u2014everyone was proud of my achievements.

The fact that training was free opened doors that could never have opened otherwise. The club provided everything\u2014equipment, transportation to competitions, even food.

I left because of emotional pressure. At 16, I felt I was missing my childhood. I decided to focus on studies and preparing for matriculation exams, instead of dedicating all my time to athletic professionalism that might lead nowhere.`,
    },
    {
      id: "druze-basketball",
      title: "Druze Basketball Player",
      profile: {
        age: "13-14 years old",
        sport: "Basketball",
        region: "South",
        citySize: "Small City",
        background: "Druze",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free",
      },
      narrative: `I started playing basketball at 11 when a coach from a club in a nearby city saw me at "Sports Day" at school. My height and speed attracted him, and he invited me to join. As a Druze girl from a small village in the Upper Galilee, it was a dream\u2014to play basketball at a high level!

Training 16-18 hours a week was exhausting. I'd come home from school at 3, immediately eat and prepare for the drive. Every Monday, Wednesday, and Friday we drove to Safed\u2014over an hour each way. In total, we spent 4-5 hours away from home every training day. My grandfather drove me most of the time because mom worked, and he was so proud.

My Druze background was both an advantage and disadvantage. On one hand, our community strongly supports education and achievement, and my family celebrated every accomplishment. But on the other hand, not many Druze girls play at a competitive level, and sometimes I felt alone. Saturdays were also complicated because of living near a Jewish town.

The cost was zero, but the gas and family time cost a lot. Grandfather spent hours on the road for me, and mom gave up extra shifts to come to games.

In the end, I decided to leave because the tension between school and training was too hard. Grades dropped, and I felt I was missing adolescence\u2014friends, parties, time with extended family. At 14, I chose to return to a more "normal" life.`,
    },
    {
      id: "christian-taekwondo",
      title: "Christian Arab Taekwondo Athlete",
      profile: {
        age: "19-20 years old",
        sport: "Taekwondo",
        region: "Center",
        citySize: "Small City",
        background: "Christian Arab",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free (municipal scholarship)",
      },
      narrative: `I started taekwondo at 12 when I was looking for a way to strengthen my self-confidence. As a Christian Arab from a small city in the center, I felt a need to prove myself and find a place where I could excel. This sport gave me an inner strength and sense of personal achievement I'd never experienced anywhere else.

Training 16-18 hours a week took over my entire life. I woke at five in the morning, drove over an hour to the training facility, returned home exhausted in the evening. The long drives stole another three hours daily\u2014time I could have invested in studies or friendships. I felt disconnected from my peers, and my social life centered only around the dojo.

As a Christian Arab, I sometimes faced strange looks and questions about my background. Some parents were surprised to hear me speaking Arabic with my mom, but most of the sports community welcomed me warmly. My coach always emphasized that in taekwondo we're equal, regardless of background.

The zero financial cost was thanks to a municipal scholarship program, which allowed my family to support my dream. Without it, I couldn't have afforded to continue.

I left at 19 when I realized academic career was more important. I wanted to study psychology, and combining long drives, exhausting training, and studies became impossible. It was very hard, but I knew it was the right choice for my future.`,
    },
    {
      id: "christian-handball",
      title: "Christian Arab Handball Player",
      profile: {
        age: "17-18 years old",
        sport: "Handball",
        region: "Center",
        citySize: "Large City",
        background: "Christian Arab",
        trainingHours: "20-22 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free",
      },
      narrative: `I started handball at 11, after my mother looked for an activity to help me express myself and release school pressures. In our Arab-Christian community, sport was always seen as good for girls\u2014something that builds confidence and develops discipline.

Training 20-22 hours weekly was insane. I woke at 5:30 AM to drive to the training facility in the north, a journey of an hour and fifteen minutes each way. I only got home at 9 PM, tired and hungry. Those long drives took another three hours from my day, meaning my day was 15-16 hours just because of sport.

As a Christian Arab in a sport where most athletes are Jewish, I sometimes felt disconnected. The language at home was Arabic, but in training everything was perfect Hebrew. On Christian holidays, I was the only one absent from practice, and sometimes I felt I needed to explain and justify my culture.

The fact that financial investment was zero was a huge blessing for our family. Without that support, we couldn't have afforded this sport at all. Dad worked three jobs to fund gas and equipment.

In the end, I left at 17 because the physical and mental pressure became unbearable. I missed too much family and social time, and realized I wanted to focus on studies and a more normal life. Sport gave me so much, but at some point it took more than it gave.`,
    },
  ];

  const challenges = [
    "Expensive and time-consuming data collection",
    "Difficulty reaching diverse demographic groups",
    "Inconsistent response quality across populations",
    "Limited ability to generate controlled factorial designs",
  ];

  const solutions = [
    "Precise demographic control (age, location, religion, socioeconomic factors)",
    "Emotionally authentic first-person narratives",
    "Multiple distribution methods (random, equal, weighted)",
    "Bilingual support (English + Hebrew)",
    "Scalable from 100 to 10,000+ responses",
  ];

  const capabilities = [
    {
      title: "Factorial Design Variables",
      description: "Any combination of demographics",
    },
    {
      title: "Output Formats",
      description: "Structured data or narratives",
    },
    {
      title: "Integration Options",
      description: "n8n workflows, API",
    },
    {
      title: "Quality Controls",
      description: "Built-in validation",
    },
  ];

  const useCases = [
    "Academic research studies",
    "Market research and consumer insights",
    "UX research persona generation",
    "Content generation for diverse audiences",
    "Training data for ML models",
  ];

  // Tech Deep-Dive (replaces techStack)
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js 15", why: "Server components for fast generation. Modern React patterns." },
    { name: "TypeScript", why: "Type-safe factorial design. Compile-time validation." },
    { name: "React 19", why: "Latest React with concurrent features for smooth UI." },
    { name: "Claude API", why: "Culturally-aware narrative generation with emotional depth." },
    { name: "Tailwind CSS", why: "Rapid UI development with consistent design system." },
  ];

  // Enhanced Metrics with icons - Research Lab messaging
  const metrics: MetricItem[] = [
    { value: "10K+", label: "Narratives Analyzed", icon: <FileText className="w-5 h-5" /> },
    { value: "5", label: "Cultural Contexts", icon: <Users className="w-5 h-5" /> },
    { value: "12+", label: "Themes Extracted", icon: <Brain className="w-5 h-5" /> },
    { value: "100%", label: "Research-Grade", icon: <Activity className="w-5 h-5" /> },
  ];

  // Next Project
  const nextProject: NextProject = {
    href: "/projects/mirror-of-dreams",
    emoji: "\u{1F319}",
    title: "Mirror of Dreams",
    subtitle: "AI Companion for Life Aspirations"
  };

  const formatKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      age: "Age",
      sport: "Sport",
      region: "Region",
      citySize: "City Size",
      background: "Background",
      trainingHours: "Training",
      travelTime: "Travel",
      cost: "Cost",
    };
    return keyMap[key] || key;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Research Lab Ambient Background */}
      <ResearchLabAmbient mounted={mounted} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-cyan-500/5">
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
                href="mailto:ahiya.butman@gmail.com"
                className="gentle-button text-sm px-4 py-2 border-cyan-400/30 hover:border-cyan-400/50"
              >
                Contact for Access
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full viewport with gradient */}
      <section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20 relative z-10">
        <div className="container-content text-center relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-slate-400 hover:text-white text-sm mb-8 inline-block transition-colors"
          >
            &larr; Back to Work
          </Link>

          {/* Large emoji with float animation */}
          <div className="text-6xl md:text-8xl mb-6 animate-float">
            {"\u{1F52C}"}
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            Research Lab
          </h1>

          {/* Built with 2L Badge */}
          <div className="mb-6">
            <Link
              href="/2l"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300"
            >
              <Zap className="w-3 h-3" />
              AI-Powered Analysis
            </Link>
          </div>

          {/* One powerful line */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Culturally-authentic narratives at research scale.
          </p>

          {/* Key differentiator badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["AI-Powered Theme Extraction", "10,000+ Narratives", "5 Cultural Contexts"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 text-xs bg-cyan-500/5 border border-cyan-400/10 rounded-full text-cyan-300/70"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons - Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4 border-cyan-400/30 hover:border-cyan-400/50"
            >
              <span>Request Research Access</span>
            </a>
            <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
              <Lock className="w-5 h-5" aria-hidden="true" />
              <span>Private Repository</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-cyan-500/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* Pipeline Flow Section */}
      <section className="py-24 section-reveal section-reveal-1 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Data Pipeline</h2>
          <p className="text-center text-slate-400 mb-8">
            From research question to publication-ready data
          </p>
          <PipelineFlowVisualization />
        </div>
      </section>

      {/* Statistics Section - Research Metrics */}
      <section className="py-24 section-reveal section-reveal-2 relative z-10">
        <div className="container-content">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="heading-xl text-center">Research Metrics</h2>
          </div>
          <p className="text-center text-slate-400 mb-12">
            Research-grade synthetic data generation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric, index) => (
              <StatCard
                key={index}
                value={metric.value}
                label={metric.label}
                icon={metric.icon}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Theme Network Visualization Section */}
      <section className="py-24 section-reveal section-reveal-3 relative z-10">
        <div className="container-content">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="heading-xl text-center">Theme Discovery</h2>
          </div>
          <p className="text-center text-slate-400 mb-8">
            AI-powered theme extraction from generated narratives
          </p>
          <ThemeNetworkVisualization />
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-4 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8 border-red-500/10">
            <p className="body-lg text-slate-300 mb-6">
              Traditional survey research hits walls:
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
      <section className="py-24 section-reveal section-reveal-5 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8 border-cyan-500/10">
            <p className="body-lg text-slate-300 mb-6">
              AI-powered generation with cultural intelligence:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Outputs Section - Research Findings */}
      <section className="py-24 section-reveal section-reveal-6 relative z-10">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-teal-400" />
            <h2 className="heading-xl text-center">Research Findings</h2>
          </div>
          <p className="text-center text-slate-400 mb-8">
            Cultural nuance. Emotional authenticity. Research-grade data.
          </p>

          {/* Tab Navigation - Enhanced as research artifacts */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sampleNarratives.map((sample, index) => (
              <button
                key={sample.id}
                onClick={() => handleTabChange(index)}
                disabled={isTransitioning}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeNarrative === index
                    ? "bg-teal-500/20 border border-teal-400/40 text-teal-300 shadow-lg shadow-teal-500/10"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-slate-300 hover:border-teal-400/20"
                } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="hidden sm:inline">{sample.title.split(" ")[0]}</span>
                <span className="sm:hidden">Case {index + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Narrative Display - Research Report Style */}
          <div className="relative">
            {/* Report label */}
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-teal-500/10 border border-teal-400/20 rounded text-[10px] text-teal-400 font-mono tracking-wider z-20">
              CASE STUDY #{activeNarrative + 1}
            </div>

            <div className={`contemplative-card p-6 md:p-8 transition-all duration-300 border-teal-500/10 ${isTransitioning ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="heading-lg text-teal-300">
                  {sampleNarratives[activeNarrative]?.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Demographic Profile */}
                <div className="breathing-glass p-4 md:sticky md:top-4 border-cyan-500/10">
                  <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    Subject Profile
                  </h4>
                  <div className="space-y-2 text-sm">
                    {sampleNarratives[activeNarrative] &&
                      Object.entries(sampleNarratives[activeNarrative].profile).map(
                        ([key, value], idx) => (
                          <div
                            key={key}
                            className={`flex justify-between transition-all duration-300 ${
                              visibleParagraphs.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                          >
                            <span className="text-slate-400">{formatKey(key)}:</span>
                            <span className="text-cyan-200/80 text-right">{value}</span>
                          </div>
                        )
                      )}
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-400" />
                    Generated Narrative
                  </h4>
                  <div className="prose prose-invert prose-sm max-w-none">
                    {sampleNarratives[activeNarrative]?.narrative
                      .split("\n\n")
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className={`narrative-paragraph text-slate-300 leading-relaxed mb-4 ${
                            visibleParagraphs.includes(idx) ? 'visible' : ''
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Section */}
      <section className="py-24 section-reveal section-reveal-7 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Analysis Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="contemplative-card p-6 hover:border-cyan-400/20 transition-all border-cyan-500/5"
              >
                <h3 className="heading-lg text-cyan-300 mb-2">
                  {capability.title}
                </h3>
                <p className="text-slate-400">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 section-reveal section-reveal-8 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Research Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="breathing-glass p-4 text-center text-slate-300 hover:border-cyan-400/20 transition-all border-cyan-500/5"
              >
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Deep-Dive Section (replaces Tech Stack) */}
      <section className="py-24 section-reveal section-reveal-9 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Technology Stack</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {techDeepDive.map((tech, index) => (
              <div key={index} className="contemplative-card p-6 hover:border-purple-400/20 transition-all border-purple-500/5">
                <h3 className="heading-lg text-purple-300 mb-2">{tech.name}</h3>
                <p className="text-slate-400">{tech.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-24 section-reveal section-reveal-10 relative z-10">
        <div className="container-content">
          <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

          <Link href={nextProject.href} className="group block max-w-md mx-auto">
            <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-cyan-400/20 transition-all">
              <div className="text-4xl">{nextProject.emoji}</div>
              <div className="flex-1">
                <h3 className="heading-lg text-white group-hover:text-cyan-300 transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12 border-cyan-500/10">
            <h2 className="heading-xl mb-6">Need Custom Research Generation?</h2>
            <p className="body-lg text-slate-300 mb-8">
              This research tool is available for custom academic and industry projects.
            </p>
            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3 border-cyan-400/30 hover:border-cyan-400/50"
            >
              <span>Request Research Access</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-cyan-500/5 relative z-10">
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

export default AIResearchPipelinePage;
