"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Lock, ArrowRight, Eye, EyeOff, Download, Copy, Check, FileText, BarChart3, Shield, Users } from "lucide-react";

// TypeScript interfaces
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

// Premium Password Access Flow Demo
function PasswordAccessDemo() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<'prompt' | 'loading' | 'report'>('prompt');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && stage === 'prompt') {
      // Auto-type password for demo effect
      const demoPassword = '********';
      let i = 0;
      setTyping(true);
      const typeInterval = setInterval(() => {
        if (i < demoPassword.length) {
          setPassword(prev => prev + '*');
          i++;
        } else {
          clearInterval(typeInterval);
          setTyping(false);
          // Auto-submit after typing
          setTimeout(() => {
            setStage('loading');
            setTimeout(() => setStage('report'), 1500);
          }, 800);
        }
      }, 150);

      return () => clearInterval(typeInterval);
    }
  }, [mounted, stage]);

  // Reset demo
  useEffect(() => {
    if (stage === 'report') {
      const resetTimer = setTimeout(() => {
        setStage('prompt');
        setPassword('');
      }, 8000);
      return () => clearTimeout(resetTimer);
    }
  }, [stage]);

  if (!mounted) return <div className="h-80 bg-slate-800/50 rounded-xl animate-pulse" />;

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 rounded-xl border border-indigo-500/20 overflow-hidden shadow-2xl shadow-indigo-500/10">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-500 font-mono">statviz.xyz/preview/abc123</span>
      </div>

      <div className="p-6 min-h-[320px] flex items-center justify-center">
        {stage === 'prompt' && (
          <div className="w-full max-w-sm animate-fade-in">
            {/* Hebrew header */}
            <div className="text-center mb-6" dir="rtl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                גישה לדוח הסטטיסטי
              </h3>
              <p className="text-sm text-slate-400">
                הזן את הסיסמה שנשלחה אליך
              </p>
            </div>

            {/* Password input */}
            <div className="relative mb-4">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-500/30 rounded-lg text-white text-center tracking-widest focus:outline-none focus:border-indigo-400 transition-colors"
                placeholder="********"
                dir="ltr"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {typing && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Submit button */}
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <span>כניסה</span>
            </button>
          </div>
        )}

        {stage === 'loading' && (
          <div className="text-center animate-fade-in">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
            </div>
            <p className="text-slate-300" dir="rtl">טוען את הדוח שלך...</p>
          </div>
        )}

        {stage === 'report' && (
          <div className="w-full animate-fade-in">
            {/* Report header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50" dir="rtl">
              <div>
                <h3 className="font-medium text-white">ניתוח שביעות רצון הצרכנים</h3>
                <p className="text-sm text-slate-400">שרה כהן | עבודת גמר</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs flex items-center gap-1.5 hover:bg-indigo-500/30 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>DOCX</span>
                </button>
              </div>
            </div>

            {/* Mini report preview */}
            <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/30">
              <InteractiveChartPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Interactive Chart Preview (Plotly-style)
function InteractiveChartPreview() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { label: 'מאוד מרוצה', value: 45, color: 'from-emerald-500 to-emerald-400' },
    { label: 'מרוצה', value: 32, color: 'from-blue-500 to-blue-400' },
    { label: 'ניטרלי', value: 15, color: 'from-slate-500 to-slate-400' },
    { label: 'לא מרוצה', value: 5, color: 'from-orange-500 to-orange-400' },
    { label: 'לא מרוצה כלל', value: 3, color: 'from-red-500 to-red-400' },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div>
      <div className="flex items-center justify-between mb-3" dir="rtl">
        <span className="text-xs text-slate-400">התפלגות שביעות רצון (N=247)</span>
        <span className="text-xs text-indigo-400">אינטראקטיבי</span>
      </div>

      <div className="space-y-2" dir="rtl">
        {data.map((item, index) => (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-20 text-right shrink-0">{item.label}</span>
              <div className="flex-1 h-6 bg-slate-700/50 rounded overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-l ${item.color} rounded transition-all duration-500 ${hoveredBar === index ? 'opacity-100 shadow-lg' : 'opacity-80'}`}
                  style={{
                    width: mounted ? `${(item.value / maxValue) * 100}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <span className={`text-xs w-8 text-left transition-colors ${hoveredBar === index ? 'text-white' : 'text-slate-400'}`}>
                {item.value}%
              </span>
            </div>

            {/* Tooltip on hover */}
            {hoveredBar === index && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white whitespace-nowrap z-10 animate-fade-in">
                {item.value}% ({Math.round(247 * item.value / 100)} משתתפים)
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between text-xs text-slate-500" dir="rtl">
        <span>Mean: 4.11</span>
        <span>Std: 0.94</span>
        <span>Median: 4</span>
      </div>
    </div>
  );
}

// Admin Dashboard Demo
function AdminDashboardDemo() {
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    { id: '1', name: 'ניתוח שביעות רצון', student: 'שרה כהן', views: 12, status: 'active', date: '03/12/24' },
    { id: '2', name: 'מחקר השוואתי', student: 'דוד לוי', views: 8, status: 'active', date: '01/12/24' },
    { id: '3', name: 'סקר עמדות', student: 'מיכל אברהם', views: 24, status: 'viewed', date: '28/11/24' },
  ];

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!mounted) return <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse" />;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-500 font-mono">statviz.xyz/admin</span>
        </div>
        <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-md transition-colors flex items-center gap-1.5">
          <span>+</span>
          <span>פרויקט חדש</span>
        </button>
      </div>

      <div className="p-4" dir="rtl">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-slate-400">פרויקטים פעילים</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
            <div className="text-2xl font-bold text-indigo-400">44</div>
            <div className="text-xs text-slate-400">צפיות החודש</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400">זמינות</div>
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 hover:border-indigo-500/30 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-white">{project.name}</h4>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${
                      project.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status === 'active' ? 'פעיל' : 'נצפה'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>{project.student}</span>
                    <span>{project.views} צפיות</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(project.id)}
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                    title="העתק קישור"
                  >
                    {copiedId === project.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                  <button className="p-1.5 hover:bg-slate-700 rounded transition-colors" title="צפה בדוח">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dual Format Showcase
function DualFormatShowcase() {
  const [activeFormat, setActiveFormat] = useState<'docx' | 'html'>('html');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-48 bg-slate-800/50 rounded-xl animate-pulse" />;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* DOCX Format */}
      <div
        className={`relative bg-slate-900/80 rounded-xl border p-5 cursor-pointer transition-all duration-300 ${
          activeFormat === 'docx'
            ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
            : 'border-slate-700/50 hover:border-slate-600/50'
        }`}
        onClick={() => setActiveFormat('docx')}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeFormat === 'docx' ? 'bg-blue-500/20' : 'bg-slate-800'
          }`}>
            <FileText className={`w-6 h-6 ${activeFormat === 'docx' ? 'text-blue-400' : 'text-slate-500'}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">DOCX - לעבודה</h4>
            <p className="text-sm text-slate-400 leading-relaxed" dir="rtl">
              מסמך Word מוכן להגשה. פורמט אקדמי מלא עם RTL.
            </p>
          </div>
        </div>
        {activeFormat === 'docx' && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="bg-white/5 rounded-lg p-3 space-y-2" dir="rtl">
              <div className="h-3 bg-slate-700 rounded w-3/4" />
              <div className="h-2 bg-slate-700/50 rounded w-full" />
              <div className="h-2 bg-slate-700/50 rounded w-5/6" />
              <div className="h-2 bg-slate-700/50 rounded w-4/5" />
            </div>
          </div>
        )}
      </div>

      {/* HTML Format */}
      <div
        className={`relative bg-slate-900/80 rounded-xl border p-5 cursor-pointer transition-all duration-300 ${
          activeFormat === 'html'
            ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10'
            : 'border-slate-700/50 hover:border-slate-600/50'
        }`}
        onClick={() => setActiveFormat('html')}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeFormat === 'html' ? 'bg-indigo-500/20' : 'bg-slate-800'
          }`}>
            <BarChart3 className={`w-6 h-6 ${activeFormat === 'html' ? 'text-indigo-400' : 'text-slate-500'}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">HTML - אינטראקטיבי</h4>
            <p className="text-sm text-slate-400 leading-relaxed" dir="rtl">
              דוח עצמאי עם גרפים Plotly. עובד אופליין.
            </p>
          </div>
        </div>
        {activeFormat === 'html' && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-end justify-between h-16 gap-1">
                {[65, 45, 80, 55, 70, 40, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      transitionDelay: `${i * 50}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const StatVizPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://statviz.xyz";

  // Metrics
  const metrics: MetricItem[] = [
    { value: "2", label: "Delivery Formats" },
    { value: "RTL", label: "Hebrew Support" },
    { value: "Secure", label: "Password Protected" },
    { value: "Offline", label: "Self-Contained" },
  ];

  // Tech Deep-Dive
  const techDeepDive: TechDeepDiveItem[] = [
    { name: "Next.js 14", why: "Full-stack framework for seamless admin and student experiences." },
    { name: "Prisma + PostgreSQL", why: "Type-safe database queries with reliable relational data." },
    { name: "JWT + bcrypt", why: "Secure authentication with hashed passwords and session tokens." },
    { name: "Plotly", why: "Interactive, publication-quality statistical visualizations." },
    { name: "Zod", why: "Runtime validation for all data inputs and API calls." },
    { name: "Rubik Font", why: "Beautiful Hebrew/Latin typography with full RTL support." },
  ];

  // Next Project
  const nextProject: NextProject = {
    href: "/projects/ai-research-pipeline",
    emoji: "\u{1F52C}",
    title: "AI Research Pipeline",
    subtitle: "AI-Powered Academic Research"
  };

  const features = [
    {
      icon: Shield,
      title: "Password-Protected Access",
      description:
        "Each project has unique credentials. bcrypt hashing, rate limiting, and JWT sessions ensure student data stays private.",
    },
    {
      icon: FileText,
      title: "Dual Report Delivery",
      description:
        "DOCX for thesis submission plus interactive HTML with embedded Plotly charts. Both formats, one platform.",
    },
    {
      icon: BarChart3,
      title: "Interactive Visualizations",
      description:
        "Self-contained HTML reports with all data inline. Works offline, no external dependencies. Hover for details.",
    },
    {
      icon: Users,
      title: "Admin Project Management",
      description:
        "Dashboard for creating projects, tracking views, and managing student access. Copy links with one click.",
    },
  ];

  const challenges = [
    "Email delivery exposes sensitive research data",
    "Students lose access or forward inappropriately",
    "Static PDFs lack interactive exploration",
    "Hebrew RTL breaks in standard document viewers",
    "No tracking of who viewed which reports",
  ];

  const solutions = [
    "Password-protected individual project access",
    "JWT sessions with automatic expiration",
    "Interactive HTML reports with Plotly charts",
    "Full Hebrew RTL support throughout",
    "View tracking and access analytics",
    "Dual format: DOCX for submission + HTML for exploration",
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Ambient background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

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
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Visit Live Site</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="container-content text-center relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-slate-400 hover:text-white text-sm mb-8 inline-block transition-colors"
          >
            &larr; Back to Work
          </Link>

          {/* Icon with glow effect */}
          <div className="relative inline-block mb-6">
            <div className="text-6xl md:text-8xl animate-float">
              {"\u{1F4CA}"}
            </div>
            <div className="absolute inset-0 text-6xl md:text-8xl blur-xl opacity-30">
              {"\u{1F4CA}"}
            </div>
          </div>

          {/* Bold title */}
          <h1 className="display-xl text-white mb-4">
            Secure Statistical Report Delivery
          </h1>

          {/* Built with 2L Badge */}
          <div className="mb-6">
            <Link
              href="/2l"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
            >
              Built with 2L
            </Link>
          </div>

          {/* Tagline */}
          <p className="body-xl text-slate-300 max-w-xl mx-auto">
            Graduate research reports delivered with security, interactivity, and Hebrew RTL support.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              <span>View Live</span>
            </a>
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

      {/* Student Access Flow Demo */}
      <section className="py-24 section-reveal section-reveal-1">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Student Access Flow</h2>
          <p className="text-center text-slate-400 mb-12">
            Secure, password-protected report delivery
          </p>

          <div className="max-w-lg mx-auto">
            <PasswordAccessDemo />
          </div>
        </div>
      </section>

      {/* Dual Format Section */}
      <section className="py-24 section-reveal section-reveal-2">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Two Formats, One Platform</h2>
          <p className="text-center text-slate-400 mb-12">
            Academic submission and interactive exploration
          </p>

          <DualFormatShowcase />
        </div>
      </section>

      {/* Admin Dashboard Demo */}
      <section className="py-24 section-reveal section-reveal-3">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-4">Admin Dashboard</h2>
          <p className="text-center text-slate-400 mb-12">
            Manage projects, track views, share with one click
          </p>

          <div className="max-w-2xl mx-auto">
            <AdminDashboardDemo />
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 section-reveal section-reveal-4">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8 border-red-500/10">
            <p className="body-lg text-slate-300 mb-6">
              Statistical report delivery breaks down:
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
      <section className="py-24 section-reveal section-reveal-5">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8 border-emerald-500/10">
            <p className="body-lg text-slate-300 mb-6">
              A secure, professional platform:
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
      <section className="py-24 section-reveal section-reveal-6">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="contemplative-card p-6 md:p-8 group hover:border-indigo-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
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
      <section className="py-24 section-reveal section-reveal-7">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Built With</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techDeepDive.map((tech, index) => (
              <div key={index} className="contemplative-card p-6 hover:border-indigo-500/20 transition-colors">
                <h3 className="heading-lg text-indigo-300 mb-2">{tech.name}</h3>
                <p className="text-slate-400">{tech.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 section-reveal section-reveal-8">
        <div className="container-content">
          <h2 className="heading-xl text-center mb-12">Platform Highlights</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="breathing-glass p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-300 mb-2">
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
      <section className="py-24 section-reveal section-reveal-9">
        <div className="container-content">
          <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

          <Link href={nextProject.href} className="group block max-w-md mx-auto">
            <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-indigo-400/20 transition-all">
              <div className="text-4xl">{nextProject.emoji}</div>
              <div className="flex-1">
                <h3 className="heading-lg text-white group-hover:text-indigo-300 transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-reveal section-reveal-10">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12 border-indigo-500/10">
            <h2 className="heading-xl mb-6">Secure Report Delivery</h2>
            <p className="body-lg text-slate-300 mb-8">
              Professional statistical reports with interactive visualizations and Hebrew support.
            </p>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
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

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StatVizPage;
