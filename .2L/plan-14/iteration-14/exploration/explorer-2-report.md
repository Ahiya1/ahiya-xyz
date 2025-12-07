# Explorer 2 Report: Code Patterns & TypeScript Types

## Executive Summary

This report extracts exact code patterns from the ahiya.xyz codebase to ensure new Ahiya Analytics code integrates seamlessly. The codebase uses Next.js 16 with React 19, Tailwind CSS 4, and a distinctive "contemplative" design system with purple accents on a dark background.

---

## 1. Component Patterns

### 1.1 "use client" vs Server Component Usage

**Pattern:** Default to Server Components. Use "use client" only when needed.

**Server Components (no directive):**
```typescript
// /app/components/SectionHeading.tsx - Pure props, no interactivity
interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="display-lg text-white mb-4">{title}</h2>
      {description && (
        <p className="body-xl text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
```

**Client Components (with "use client"):**
```typescript
// Required when using:
// - useState, useEffect, useRef
// - Event handlers (onClick, onChange, etc.)
// - Browser APIs (window, document)
// - Custom hooks with state

"use client";

import React, { useState, useEffect } from "react";
// ... component with interactivity
```

**Recommendation for Admin Dashboard:**
- `AdminLayout.tsx` - Server Component with auth check
- `AdminSidebar.tsx` - Client Component (navigation state)
- `AdminHeader.tsx` - Client Component (logout button)
- `MetricCard.tsx` - Server Component (pure display)
- `TimeRangeSelector.tsx` - Client Component (state)
- `LiveFeed.tsx` - Client Component (polling, animations)
- `DataTable.tsx` - Client Component (sorting state)
- API route handlers - Server-side only

### 1.2 Props Typing Patterns

**Inline Props (simple components):**
```typescript
// Used in layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ...
}
```

**Interface Props (reusable components):**
```typescript
// Defined above component, exported if needed externally
export interface PortfolioCardProps {
  project: PortfolioProject;
  index?: number;
}

export function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  // ...
}
```

**Interface with className:**
```typescript
export interface AgentCardsProps {
  className?: string;
}

export function AgentCards({ className = "" }: AgentCardsProps) {
  // ...
}
```

**Data Interfaces (separate from component props):**
```typescript
interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  glow: string;
  role: string;
  detail: string;
  why: string;
}

const agents: Agent[] = [
  // ...
];
```

### 1.3 Export Patterns

**Named exports (preferred for components):**
```typescript
// Components use named exports
export function Navigation() { /* ... */ }
export function Footer() { /* ... */ }

// Also export default for flexibility
export default Navigation;
```

**Type exports:**
```typescript
// Export types/interfaces that others need
export interface PortfolioProject {
  id: string;
  title: string;
  // ...
}

// Import pattern
import type { PortfolioProject } from "@/app/components/PortfolioCard";
```

### 1.4 Hook Usage Patterns

**Custom Hook Pattern (useScrollReveal):**
```typescript
// Defined at top of file, before component
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

**Mounted State Pattern (for hydration-safe rendering):**
```typescript
export default function TwoLPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (/* main content */);
}
```

**Reduced Motion Detection Pattern:**
```typescript
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
```

---

## 2. Styling Patterns

### 2.1 Tailwind Class Patterns

**Background & Container:**
```typescript
// Main content wrapper
className="bg-[#0a0f1a] min-h-screen"

// Section breathing space
className="section-breathing"  // py-24 (6rem)
className="section-breathing-xl"  // py-32 (8rem)

// Container widths
className="container-wide"    // max-w-1200px, px-6
className="container-content" // max-w-800px, px-6
className="container-narrow"  // max-w-600px, px-6
```

**Text Classes:**
```typescript
// Typography from globals.css
className="display-xl"  // Crimson font, clamp(2.5rem, 5vw, 4rem)
className="display-lg"  // Crimson font, clamp(2rem, 4vw, 3rem)
className="heading-xl"  // clamp(1.5rem, 3vw, 2rem), font-600
className="heading-lg"  // clamp(1.25rem, 2.5vw, 1.5rem), font-500
className="body-xl"     // clamp(1.125rem, 2vw, 1.25rem)
className="body-lg"     // clamp(1rem, 1.5vw, 1.125rem)

// Text colors (from dark theme)
className="text-white"       // Primary text
className="text-slate-200"   // Secondary text
className="text-slate-300"   // Body text
className="text-slate-400"   // Muted text
className="text-slate-500"   // Very muted
className="text-slate-600"   // Subtle hints

// Gradient text
className="text-gentle"  // Purple-pink gradient
```

**Button Patterns:**
```typescript
// Primary CTA button
className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"

// Secondary button
className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"

// With icon
<a className="...">
  <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
  Get in Touch
</a>

// Magnetic hover effect
className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"

// Gentle button (from globals.css)
className="gentle-button"
```

**Card Patterns:**
```typescript
// Contemplative card (main card style)
className="contemplative-card p-8 md:p-12"
// Adds: bg-rgba(255,255,255,0.04), backdrop-blur-20px, border-1px-white/8, rounded-16px, hover lift

// With premium lift
className="contemplative-card card-lift-premium p-6"

// Glass effect
className="breathing-glass p-6"
```

### 2.2 Animation Classes from globals.css

```css
/* Section reveal (staggered) */
.section-reveal { animation: fade-in-up 0.6s ease forwards; opacity: 0; }
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
/* ... up to section-reveal-10 */

/* Hero animations */
.hero-word { /* staggered word reveal */ }
.hero-subline { /* fade in after words */ }
.hero-ctas { /* fade in after subline */ }

/* Utility animations */
.animate-float { animation: soft-float 8s ease-in-out infinite; }
.animate-fade-in { animation: fade-in-up 0.8s ease-out forwards; }

/* Interactive animations */
.card-lift-premium:hover { transform: translateY(-6px) scale(1.01); /* + glow */ }
.cta-magnetic:hover { transform: scale(1.03); box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
```

### 2.3 Color Palette

```typescript
// Background colors
"#0a0f1a"              // Main background (body, cards)
"rgba(255,255,255,0.04)" // Card background
"rgba(255,255,255,0.02)" // Glass effect background

// Purple accent (primary brand color)
"rgb(168, 85, 247)"     // Pure purple (#a855f7)
"rgba(168, 85, 247, 0.1)" // Button bg
"rgba(168, 85, 247, 0.3)" // Button border
"rgba(168, 85, 247, 0.5)" // Hover border

// Status colors
"#22c55e" / "emerald-500" // Success/Active green
"#f97316" / "orange-500"  // Warning orange
"#fbbf24" / "yellow-500"  // Caution yellow
"#60a5fa" / "blue-500"    // Info blue
"#ef4444" / "red-500"     // Error red

// Semantic text colors
"text-emerald-400"    // Success text
"text-purple-400"     // Primary accent text
"text-blue-400"       // Link/info text
"text-red-400"        // Error text
```

---

## 3. TypeScript Types Needed for Analytics

### 3.1 PageView Type

```typescript
// lib/types/analytics.ts

export interface PageView {
  id: string;                    // UUID
  timestamp: Date;               // When viewed
  path: string;                  // /projects/selahreach
  referrer: string | null;       // https://linkedin.com
  
  // UTM parameters
  utm_source: string | null;     // linkedin
  utm_medium: string | null;     // email
  utm_campaign: string | null;   // march-outreach
  utm_content: string | null;    // cta-button
  
  // Geographic
  country: string | null;        // IL
  city: string | null;           // Tel Aviv
  region: string | null;         // Tel Aviv District
  
  // Device/Browser
  device_type: 'desktop' | 'mobile' | 'tablet';
  browser: string;               // Chrome
  browser_version: string | null;
  os: string;                    // macOS
  os_version: string | null;
  screen_width: number | null;
  screen_height: number | null;
  
  // Session tracking
  session_id: string;            // UUID - groups visits
  visitor_hash: string;          // Hashed IP + UA (privacy)
}

export interface PageViewInsert extends Omit<PageView, 'id'> {}
```

### 3.2 Session Type

```typescript
export interface Session {
  session_id: string;
  started_at: Date;
  ended_at: Date | null;
  page_count: number;
  entry_page: string;
  exit_page: string;
  duration_seconds: number;
  visitor_hash: string;
}
```

### 3.3 API Response Types

```typescript
// Overview metrics response
export interface OverviewMetrics {
  views: number;
  visitors: number;
  bounce_rate: number;          // 0-100 percentage
  avg_duration: number;         // seconds
  trend: {
    views_change: number;       // percentage change
    visitors_change: number;
  };
}

// Real-time response
export interface RealtimeData {
  active_visitors: number;
  recent_visits: RecentVisit[];
}

export interface RecentVisit {
  id: string;
  path: string;
  timestamp: Date;
  country: string | null;
  city: string | null;
  device_type: string;
  referrer_type: 'direct' | 'organic' | 'social' | 'referral' | 'email';
  referrer: string | null;
}

// Pages analytics response
export interface PageMetrics {
  path: string;
  views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_time_on_page: number;
  entry_rate: number;
  exit_rate: number;
}

// Acquisition response
export interface AcquisitionData {
  sources: SourceBreakdown[];
  referrers: ReferrerBreakdown[];
  campaigns: CampaignBreakdown[];
}

export interface SourceBreakdown {
  source_type: 'direct' | 'organic' | 'social' | 'referral' | 'email';
  count: number;
  percentage: number;
}

export interface ReferrerBreakdown {
  referrer: string;
  count: number;
}

export interface CampaignBreakdown {
  campaign: string;
  source: string;
  medium: string;
  count: number;
}

// Visitor insights response
export interface VisitorInsights {
  countries: CountryBreakdown[];
  devices: DeviceBreakdown[];
  browsers: BrowserBreakdown[];
  operating_systems: OSBreakdown[];
}

export interface CountryBreakdown {
  country: string;
  country_code: string;
  count: number;
}

export interface DeviceBreakdown {
  device_type: 'desktop' | 'mobile' | 'tablet';
  count: number;
  percentage: number;
}

export interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

export interface OSBreakdown {
  os: string;
  count: number;
  percentage: number;
}
```

### 3.4 Auth Types

```typescript
// lib/types/auth.ts

export interface AdminSession {
  authenticated: boolean;
  exp: number;  // JWT expiration timestamp
}

export interface LoginRequest {
  password: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
}

export interface AuthResult {
  authenticated: boolean;
  error?: string;
}
```

### 3.5 Form/Component Types

```typescript
// Time range for dashboard filters
export type TimeRange = 'today' | '7d' | '30d' | '90d' | 'all';

export interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  className?: string;
}

// Data table
export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortKey?: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: keyof T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// Metric card
export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;           // Percentage change
  changeLabel?: string;      // "vs last period"
  sparklineData?: number[];  // For mini chart
  loading?: boolean;
  icon?: React.ReactNode;
}
```

---

## 4. CSS Classes Reference

### 4.1 Layout Classes (from globals.css)

| Class | Purpose | Properties |
|-------|---------|------------|
| `.container-wide` | Wide content (1200px) | max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; |
| `.container-content` | Medium content (800px) | max-width: 800px; margin: 0 auto; padding: 0 1.5rem; |
| `.container-narrow` | Narrow content (600px) | max-width: 600px; margin: 0 auto; padding: 0 1.5rem; |
| `.section-breathing` | Section spacing | padding: 6rem 0; |
| `.section-breathing-xl` | Large section spacing | padding: 8rem 0; |
| `.spacing-gentle` | Small bottom margin | margin-bottom: 2rem; |
| `.spacing-comfortable` | Medium bottom margin | margin-bottom: 3rem; |
| `.spacing-generous` | Large bottom margin | margin-bottom: 4rem; |

### 4.2 Component Classes (from globals.css)

| Class | Purpose | Key Properties |
|-------|---------|----------------|
| `.contemplative-card` | Main card style | bg-rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; |
| `.gentle-button` | Button style | bg-rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; |
| `.breathing-glass` | Subtle glass effect | bg-rgba(255,255,255,0.02); backdrop-filter: blur(10px); border-radius: 12px; |
| `.card-lift-premium` | Enhanced card hover | Hover: translateY(-6px) scale(1.01) + glow |
| `.cta-magnetic` | Magnetic button hover | Hover: scale(1.03) + purple glow |

### 4.3 Typography Classes (from globals.css)

| Class | Font Family | Size (clamp) | Weight |
|-------|-------------|--------------|--------|
| `.display-xl` | Crimson Text | 2.5rem - 4rem | 600 |
| `.display-lg` | Crimson Text | 2rem - 3rem | 600 |
| `.heading-xl` | Inter | 1.5rem - 2rem | 600 |
| `.heading-lg` | Inter | 1.25rem - 1.5rem | 500 |
| `.body-xl` | Inter | 1.125rem - 1.25rem | 400 |
| `.body-lg` | Inter | 1rem - 1.125rem | 400 |
| `.sacred-text` | Crimson Text italic | - | - |

### 4.4 Animation Classes (from globals.css)

| Class | Animation | Duration |
|-------|-----------|----------|
| `.section-reveal` | fade-in-up | 0.6s |
| `.section-reveal-1` to `.section-reveal-10` | staggered delays | +0.1s each |
| `.hero-word` | word-reveal | 0.6s |
| `.animate-float` | soft-float | 8s infinite |
| `.animate-fade-in` | fade-in-up | 0.8s |
| `.agent-card-breathe` | scale pulse | 4s infinite |
| `.pipeline-node-active` | scale pulse | 1.5s infinite |
| `.pipeline-line-animated` | gradient flow | 2s infinite |

### 4.5 Color Utility Classes

| Class | Purpose |
|-------|---------|
| `.text-gentle` | Purple-pink gradient text |
| `.border-gentle` | Purple border (0.2 opacity) |
| `.bg-gentle` | Purple background (0.05 opacity) |

### 4.6 Print & Accessibility Classes

| Class | Purpose |
|-------|---------|
| `.sr-only` | Screen reader only |
| `.print-hide` | Hide in print |
| `.print-only` | Show only in print |
| `.print-break-before` | Page break before |
| `.tabular-nums` | Consistent number widths |

---

## 5. Layout Patterns

### 5.1 Page Structure Pattern

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

export default function PageName() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero/Header Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          <h1 className="display-xl text-white mb-6">
            Page Title
          </h1>
          <p className="body-xl text-slate-300 max-w-2xl mx-auto">
            Description text here.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-breathing section-reveal section-reveal-1">
        <div className="container-wide">
          {/* Section content */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### 5.2 Admin Layout Pattern (Recommended)

```tsx
// app/admin/layout.tsx
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 5.3 Grid Patterns

```tsx
// 2 columns on md+
<div className="grid md:grid-cols-2 gap-6 md:gap-8">

// 3 columns on md+
<div className="grid md:grid-cols-3 gap-6">

// 4 columns responsive
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// Card grid with staggered animation
{items.map((item, index) => (
  <div
    key={item.id}
    style={{ transitionDelay: `${index * 100}ms` }}
    className={`transition-all duration-600 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    {/* Card content */}
  </div>
))}
```

### 5.4 Responsive Patterns

```tsx
// Mobile-first visibility
className="hidden md:flex"  // Hidden on mobile, flex on tablet+
className="md:hidden"       // Visible only on mobile

// Responsive text sizes
className="text-lg md:text-xl lg:text-2xl"

// Responsive padding
className="p-4 md:p-6 lg:p-8"

// Responsive grid
className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"

// Responsive flex direction
className="flex flex-col sm:flex-row items-center gap-4"
```

---

## 6. Import Patterns

### 6.1 Standard Import Order

```typescript
// 1. React/Next.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

// 2. External libraries
import { Mail, Github, Grid } from "lucide-react";

// 3. Internal components (absolute paths)
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

// 4. Types
import type { PortfolioProject } from "@/app/components/PortfolioCard";

// 5. Data/utilities
import { portfolioProjects } from "@/app/data/portfolio";
```

### 6.2 Path Aliases

```typescript
// From tsconfig.json - use @/* for absolute imports
import { Something } from "@/app/components/Something";
import { util } from "@/lib/utils";
import type { PageView } from "@/lib/types/analytics";
```

---

## 7. API Route Patterns

### 7.1 Basic API Route Structure

```typescript
// app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      );
    }
    
    // Process
    await db.insert(body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7d";
    
    const data = await db.query(range);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 7.2 Auth-Protected API Route

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Check auth
  const session = await verifySession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // Process authenticated request
  // ...
}
```

---

## 8. Key Patterns Summary for Builders

### Do's:
- Use `"use client"` only when needed (state, effects, events)
- Export both named and default for components
- Use interface for props typing (not type)
- Follow typography class hierarchy (display -> heading -> body)
- Use `contemplative-card` for all card UI
- Use `section-breathing` for section spacing
- Use `container-*` classes for width constraints
- Add `section-reveal` classes for scroll animations
- Always include loading states for async content
- Check `mounted` state before rendering browser-dependent content

### Don'ts:
- Don't use Tailwind for colors that exist in globals.css (text-gentle, etc.)
- Don't create new animation keyframes - use existing ones
- Don't use different border-radius values (use 12px, 16px, or xl classes)
- Don't use different purple shades - use #a855f7 / purple-500 family
- Don't forget hover states on interactive elements
- Don't skip the loading spinner pattern for client components

### Admin-Specific Patterns:
- Sidebar should be fixed, main content scrollable
- Use same dark theme (#0a0f1a background)
- Purple accents for primary actions
- Emerald for success states
- Same font stack (Inter for UI, Crimson for display)
- Cards should use `contemplative-card` base style
- Data tables should match existing table patterns

---

## 9. Files Examined

Key source files analyzed for this report:
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/SectionHeading.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/selahreach/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/2l/AgentCards.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/2l/PipelineVisualization.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tsconfig.json`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json`

---

**Report Status:** COMPLETE
**Generated:** 2025-12-07
