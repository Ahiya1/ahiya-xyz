"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Lock, ArrowRight, Mail, Terminal, Play, Check, Activity, Radio } from "lucide-react";

// TypeScript interfaces
interface Contact {
  id: string;
  name: string;
  company: string;
  stage: string;
  email: string;
}

interface MetricItem {
  value: string;
  label: string;
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

interface ActivityLogItem {
  time: string;
  type: 'email_sent' | 'stage_change' | 'reply_received' | 'note';
  text: string;
}

// Pipeline stages for Kanban (updated colors per explorer report)
const PIPELINE_STAGES = [
  { id: 'lead', label: 'Lead', color: 'bg-slate-500' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-500' },
  { id: 'replied', label: 'Replied', color: 'bg-yellow-500' },
  { id: 'call_scheduled', label: 'Call Scheduled', color: 'bg-purple-500' },
  { id: 'proposal', label: 'Proposal', color: 'bg-orange-500' },
  { id: 'closed_won', label: 'Won', color: 'bg-emerald-500' },
  { id: 'closed_lost', label: 'Lost', color: 'bg-red-500' },
];

// Sample contacts for demo (from explorer report)
const SAMPLE_CONTACTS: Contact[] = [
  { id: '1', name: 'Brights', company: 'Design Agency', stage: 'lead', email: 'hello@brights.io' },
  { id: '2', name: 'Moblers', company: 'Mobile/IoT', stage: 'contacted', email: 'team@moblers.com' },
  { id: '3', name: '500Tech', company: 'Front-end', stage: 'replied', email: 'lior@500tech.io' },
  { id: '4', name: 'Profisea', company: 'DevOps', stage: 'call_scheduled', email: 'info@profisea.com' },
  { id: '5', name: 'JFrog', company: 'DevOps Platform', stage: 'proposal', email: 'partners@jfrog.com' },
];

// Activity log data for scrolling feed
const ACTIVITY_LOG: ActivityLogItem[] = [
  { time: '09:32', type: 'email_sent', text: 'Email sent to 500Tech: "AI Development Partnership"' },
  { time: '09:32', type: 'stage_change', text: '500Tech: lead -> contacted' },
  { time: '11:15', type: 'reply_received', text: 'Reply received from 500Tech' },
  { time: '11:15', type: 'stage_change', text: '500Tech: contacted -> replied' },
  { time: '14:20', type: 'email_sent', text: 'Email sent to Moblers: "AI Partnership Opportunity"' },
  { time: '14:20', type: 'stage_change', text: 'Moblers: lead -> contacted' },
  { time: '15:45', type: 'note', text: 'Contact created: Profisea' },
  { time: '16:00', type: 'email_sent', text: 'Email sent to Profisea: "AI Development Partnership"' },
  { time: '16:30', type: 'reply_received', text: 'Reply received from Profisea' },
  { time: '16:31', type: 'stage_change', text: 'Profisea: replied -> call_scheduled' },
  { time: '09:00', type: 'note', text: 'Contact created: Brights' },
  { time: '10:15', type: 'email_sent', text: 'Follow-up sent to JFrog' },
];

// Activity type colors and icons
const getActivityStyle = (type: ActivityLogItem['type']) => {
  switch (type) {
    case 'email_sent':
      return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
    case 'stage_change':
      return { color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' };
    case 'reply_received':
      return { color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' };
    case 'note':
      return { color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30' };
    default:
      return { color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30' };
  }
};

// Command Center Ambient Background Component
function CommandCenterAmbient({ mounted }: { mounted: boolean }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/6 rounded-full blur-[70px]" />

      {/* Status indicator dots in corners */}
      <div
        className={`absolute top-8 right-8 w-2 h-2 rounded-full bg-emerald-500 ${
          prefersReducedMotion ? '' : 'animate-pulse'
        }`}
      />
      <div
        className={`absolute bottom-8 left-8 w-2 h-2 rounded-full bg-purple-500 ${
          prefersReducedMotion ? '' : 'animate-pulse'
        }`}
        style={prefersReducedMotion ? {} : { animationDelay: '1s' }}
      />

      {/* Data stream particles */}
      {mounted && !prefersReducedMotion && Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `dataStream ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

// Scrolling Activity Feed Component
function ActivityFeed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-48 bg-slate-800/50 rounded-lg" />;

  // Double the activities for seamless scrolling
  const doubledActivities = [...ACTIVITY_LOG, ...ACTIVITY_LOG];

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <Activity className="w-4 h-4 text-slate-500 ml-2" />
          <span className="text-xs text-slate-500">Activity Log</span>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-400 font-mono">LIVE</span>
        </div>
      </div>

      <div className="h-48 overflow-hidden relative">
        {/* Gradient masks for smooth fade */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-900/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />

        {/* Scrolling content */}
        <div className="animate-scroll-up">
          {doubledActivities.map((activity, index) => {
            const style = getActivityStyle(activity.type);
            return (
              <div
                key={index}
                className={`flex items-start gap-3 px-4 py-2 border-l-2 ${style.border} mx-4 my-1`}
              >
                <span className="text-xs font-mono text-slate-500 w-12 flex-shrink-0">
                  {activity.time}
                </span>
                <span className={`text-sm ${style.color}`}>
                  {activity.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Interactive Kanban Pipeline Demo
function KanbanPipelineDemo() {
  const [mounted, setMounted] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(SAMPLE_CONTACTS);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedContact, setHighlightedContact] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendOutreach = useCallback(() => {
    if (isAnimating) return;

    // Find a lead to move to contacted
    const leadContact = contacts.find(c => c.stage === 'lead');
    if (!leadContact) return;

    setIsAnimating(true);
    setHighlightedContact(leadContact.id);

    // Animate the movement
    setTimeout(() => {
      setContacts(prev =>
        prev.map(c =>
          c.id === leadContact.id ? { ...c, stage: 'contacted' } : c
        )
      );
      setTimeout(() => {
        setHighlightedContact(null);
        setIsAnimating(false);
      }, 500);
    }, 800);
  }, [contacts, isAnimating]);

  if (!mounted) return <div className="h-64 bg-slate-800/50 rounded-lg" />;

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-500">SelahReach - Pipeline</span>
        </div>
        <div className="flex items-center gap-4">
          {/* System status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">SYSTEM OPERATIONAL</span>
          </div>
          <button
            onClick={handleSendOutreach}
            disabled={isAnimating || !contacts.find(c => c.stage === 'lead')}
            className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-2 transition-all ${
              isAnimating || !contacts.find(c => c.stage === 'lead')
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30'
            }`}
          >
            <Mail className="w-3 h-3" />
            Send Outreach
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {/* Kanban columns - show first 5 stages for space */}
        <div className="flex gap-3 min-w-max">
          {PIPELINE_STAGES.slice(0, 5).map((stage) => (
            <div key={stage.id} className="w-36 flex-shrink-0">
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <span className="text-xs text-slate-400">{stage.label}</span>
                <span className="text-xs text-slate-600">
                  ({contacts.filter(c => c.stage === stage.id).length})
                </span>
              </div>

              {/* Stage cards */}
              <div className="space-y-2 min-h-[120px]">
                {contacts
                  .filter(c => c.stage === stage.id)
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 rounded-lg bg-slate-800/80 border transition-all duration-300 cursor-grab hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 ${
                        highlightedContact === contact.id
                          ? 'border-purple-400/60 shadow-lg shadow-purple-500/20 scale-105'
                          : 'border-slate-700/50 hover:border-purple-400/30'
                      }`}
                    >
                      <div className="text-sm text-white font-medium truncate">
                        {contact.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {contact.company}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Claude Code Workflow Demo with Terminal Animation
function ClaudeCodeWorkflowDemo() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const workflowSteps = [
    {
      type: 'user',
      text: '> Send outreach email to 500Tech',
      delay: 50
    },
    {
      type: 'system',
      text: 'Reading contact via tRPC API...',
      delay: 30
    },
    {
      type: 'data',
      text: '{ name: "Lior Katz", company: "500Tech", email: "lior@500tech.io" }',
      delay: 20
    },
    {
      type: 'system',
      text: 'Drafting personalized email...',
      delay: 30
    },
    {
      type: 'email',
      text: `Subject: AI Development Partnership - Quick Question

Hi,

I noticed 500Tech's innovative approach to React consulting.
I build full-stack systems with AI that could accelerate your
clients' development timelines...

P.S. This email was composed and sent by an AI system I built -
happy to show you how it works if you're curious.`,
      delay: 15
    },
    {
      type: 'user',
      text: '> Approve and send',
      delay: 50
    },
    {
      type: 'system',
      text: 'Sending via Gmail MCP...',
      delay: 30
    },
    {
      type: 'success',
      text: 'Email sent. Stage updated to "contacted". Activity logged.',
      delay: 30
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPlaying || currentStep >= workflowSteps.length) return;

    const step = workflowSteps[currentStep];
    let charIndex = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (charIndex < step.text.length) {
        setDisplayedText(step.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          if (currentStep < workflowSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }, 800);
      }
    }, step.delay);

    return () => clearInterval(typeInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isPlaying]);

  const handlePlay = () => {
    setCurrentStep(0);
    setDisplayedText('');
    setIsPlaying(true);
  };

  const getStepStyles = (type: string) => {
    switch (type) {
      case 'user':
        return 'text-green-400';
      case 'system':
        return 'text-purple-400';
      case 'data':
        return 'text-cyan-400 font-mono text-xs';
      case 'email':
        return 'text-slate-300 bg-slate-800/50 p-3 rounded-lg whitespace-pre-wrap text-xs border border-slate-700/50';
      case 'success':
        return 'text-emerald-400';
      default:
        return 'text-slate-400';
    }
  };

  if (!mounted) return <div className="h-64 bg-slate-800/50 rounded-lg" />;

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <Terminal className="w-4 h-4 text-slate-500 ml-2" />
          <span className="text-xs text-slate-500">Claude Code</span>
        </div>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-2 transition-all ${
            isPlaying
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30'
          }`}
        >
          <Play className="w-3 h-3" />
          {isPlaying ? 'Running...' : 'Run Demo'}
        </button>
      </div>

      <div className="p-4 font-mono text-sm h-80 overflow-y-auto">
        {/* Completed steps */}
        {workflowSteps.slice(0, currentStep).map((step, index) => (
          <div key={index} className={`mb-3 ${getStepStyles(step.type)}`}>
            {step.text}
          </div>
        ))}

        {/* Current step with typing effect */}
        {isPlaying && currentStep < workflowSteps.length && (
          <div className={`mb-3 ${getStepStyles(workflowSteps[currentStep].type)}`}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </div>
        )}

        {/* Initial prompt */}
        {!isPlaying && currentStep === 0 && (
          <div className="text-slate-500">
            Press &quot;Run Demo&quot; to see the Claude Code workflow...
          </div>
        )}

        {/* Completion message */}
        {!isPlaying && currentStep === workflowSteps.length - 1 && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Workflow complete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const SelahReachPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Metrics data
  const metrics: MetricItem[] = [
    { value: "7", label: "Pipeline Stages" },
    { value: "3", label: "Click Workflow" },
    { value: "100%", label: "AI-Drafted" },
    { value: "0", label: "Copy-Paste" },
  ];

  // Tech Deep-Dive data
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js 15", why: "Full-stack framework with React 19 for responsive CRM interface." },
    { name: "tRPC", why: "Type-safe API layer for Claude Code to interact with the system." },
    { name: "Drizzle ORM", why: "Lightweight TypeScript ORM for SQLite database operations." },
    { name: "Gmail MCP", why: "Model Context Protocol integration for sending emails directly." },
    { name: "@dnd-kit", why: "Accessible drag-and-drop for intuitive Kanban interactions." },
    { name: "React Query", why: "Real-time data synchronization and cache management." },
  ];

  // Next Project data
  const nextProject: NextProject = {
    href: "/projects/statviz",
    emoji: "\u{1F4CA}",
    title: "StatViz",
    subtitle: "Statistical Analysis, Visualized"
  };

  const features = [
    {
      icon: "\u{1F916}",
      title: "Claude Code Integration",
      description:
        "AI reads contacts, drafts personalized emails, sends via MCP, and logs activities - all from natural language commands.",
    },
    {
      icon: "\u{1F4CB}",
      title: "Kanban Pipeline",
      description:
        "Visual pipeline with 7 stages from lead to closed. Drag-and-drop cards to track progress intuitively.",
    },
    {
      icon: "\u{1F4E7}",
      title: "Gmail MCP",
      description:
        "Direct Gmail integration through Model Context Protocol. Send emails without leaving the terminal.",
    },
    {
      icon: "\u{1F4DD}",
      title: "Activity Tracking",
      description:
        "Complete history of every interaction. Emails, stage changes, notes - all automatically logged.",
    },
  ];

  const challenges = [
    "Manual outreach is time-consuming and repetitive",
    "Personalization at scale requires copy-paste gymnastics",
    "CRM and email tools are disconnected workflows",
    "Tracking sent emails requires manual logging",
  ];

  const solutions = [
    "AI drafts personalized emails from a single command",
    "Claude reads contact context and tailors each message",
    "Unified pipeline view keeps everything in one place",
    "Automatic email logging and stage progression",
    "The P.S. line sparks genuine curiosity about the system",
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
      {/* Command Center Ambient Background */}
      <CommandCenterAmbient mounted={mounted} />

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
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            {"\u{1F4E8}"}
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            SelahReach
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            AI-Powered Outreach, Human Connection
          </p>

          {/* Built with Claude Code Badge */}
          <div className="mb-6">
            <Link
              href="/2l"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300"
            >
              Built with Claude Code
            </Link>
          </div>

          {/* One powerful line */}
          <p className="body-xl text-slate-400 max-w-xl mx-auto">
            Send personalized outreach emails with a single command. AI drafts, you approve, it sends.
          </p>

          {/* CTA - Private repo */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
              <Lock className="w-5 h-5" aria-hidden="true" />
              <span>Private Repository</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Demo Section */}
      <section className="py-24 section-reveal section-reveal-1 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Pipeline View</h2>
          <p className="text-center text-slate-400 mb-12">
            Kanban-style contact management. Click &quot;Send Outreach&quot; to see it in action.
          </p>

          <div className="max-w-4xl mx-auto">
            <KanbanPipelineDemo />
          </div>
        </div>
      </section>

      {/* Activity Feed Section */}
      <section className="py-16 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Live Activity Feed</h2>
          <p className="text-center text-slate-400 mb-12">
            Watch operations unfold in real-time. Every action is logged.
          </p>

          <div className="max-w-2xl mx-auto">
            <ActivityFeed />
          </div>
        </div>
      </section>

      {/* Claude Code Workflow Demo Section */}
      <section className="py-24 section-reveal section-reveal-2 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">The Claude Code Workflow</h2>
          <p className="text-center text-slate-400 mb-12">
            Watch how a single command triggers the entire outreach process.
          </p>

          <div className="max-w-2xl mx-auto">
            <ClaudeCodeWorkflowDemo />
          </div>

          {/* The P.S. Line Highlight - ENHANCED */}
          <div className="mt-12 max-w-xl mx-auto">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />

              <p className="text-xs text-emerald-400/70 mb-3 font-mono uppercase tracking-wider">
                The Signature Line
              </p>
              <p className="text-emerald-300 font-mono text-sm leading-relaxed relative z-10">
                P.S. This email was composed and sent by an AI system I built -
                happy to show you how it works if you&apos;re curious.
              </p>
              <div className="mt-4 pt-4 border-t border-emerald-500/20">
                <p className="text-slate-400 text-xs">
                  The portfolio that sells itself. Every email demonstrates the capability being offered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-3 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Outreach at scale breaks down:
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
      <section className="py-24 section-reveal section-reveal-4 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              AI-powered outreach that feels personal:
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
      <section className="py-24 section-reveal section-reveal-5 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="contemplative-card p-6 md:p-8 hover:border-purple-400/30 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-6">{feature.icon}</div>
                <h3 className="heading-lg mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Deep-Dive Section */}
      <section className="py-24 section-reveal section-reveal-6 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Built With</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {techDeepDive.map((tech, index) => (
              <div key={index} className="contemplative-card p-6 hover:border-purple-400/30 transition-all duration-300">
                <h3 className="heading-lg text-purple-300 mb-2">{tech.name}</h3>
                <p className="text-slate-400">{tech.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 section-reveal section-reveal-7 relative z-10">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="breathing-glass p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gentle mb-2">
                  {metric.value}
                </div>
                <div className="text-slate-400 text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-24 section-reveal section-reveal-8 relative z-10">
        <div className="container-content">
          <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

          <Link href={nextProject.href} className="group block max-w-md mx-auto">
            <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-purple-400/20 transition-all">
              <div className="text-4xl">{nextProject.emoji}</div>
              <div className="flex-1">
                <h3 className="heading-lg text-white group-hover:text-purple-300 transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-reveal section-reveal-9 relative z-10">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl mb-6">Want to See It Live?</h2>
            <p className="body-lg text-slate-300 mb-8">
              Let me show you how AI-powered outreach works in practice.
            </p>
            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>Request Demo</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10">
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

      {/* CSS Animations - Add to globals.css */}
      <style jsx global>{`
        @keyframes dataStream {
          0% {
            transform: translateX(-100%) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(0);
            opacity: 0;
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-up {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SelahReachPage;
