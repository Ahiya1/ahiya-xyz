# Explorer 2 Report: Technical Implementation Details

## Executive Summary

This report provides specific technical guidance for Iteration 10 builders. It covers the Navigation fix (hash links from non-homepage), PDF generation setup with @react-pdf/renderer, animation utilities using Intersection Observer, and the MockupElement pattern for custom demo components.

---

## 1. Navigation Fix

### Current Issue

In `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`, the navigation links use hash-only hrefs:

```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "#contact" },
];
```

**Problem:** When users are on a project page (e.g., `/projects/statviz`), clicking "Work" navigates to `#portfolio` on the current page, not the homepage.

### Required Fix

Change hash-only links to include the homepage path:

```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "/#portfolio" },           // CHANGED
  { label: "Process", href: "/#how-we-work" },      // CHANGED
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/#contact" },          // CHANGED
];
```

### Exact Code Change

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`

**Lines 12-18:** Replace:
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "#contact" },
];
```

**With:**
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "/#portfolio" },
  { label: "Process", href: "/#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/#contact" },
];
```

### Verification

After fix, test:
1. Go to `/projects/statviz`
2. Click "Work" in navigation
3. Should navigate to homepage and scroll to portfolio section

---

## 2. PDF Generation Setup

### Current Dependencies

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json`

Current dependencies do NOT include @react-pdf/renderer:
```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.10",
    "lucide-react": "^19.0.0",
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.1.10"
  }
}
```

### Install Command

```bash
npm install @react-pdf/renderer
```

### File Structure for PDF Generation

Create a new script at `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`:

```typescript
// scripts/generate-capabilities-pdf.tsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font
} from '@react-pdf/renderer';
import * as fs from 'fs';
import * as path from 'path';

// Register fonts (optional but recommended)
// Font.register({
//   family: 'Inter',
//   src: 'path/to/Inter-Regular.ttf',
// });

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 8,
  },
  text: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
  },
  listItem: {
    fontSize: 11,
    color: '#334155',
    marginBottom: 4,
    paddingLeft: 12,
  },
});

// Document component
const CapabilitiesDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Ahiya - Technical Capabilities</Text>
        <Text style={styles.subtitle}>Full-Stack Development Services</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Technologies</Text>
        <Text style={styles.listItem}>• Next.js 14+ / React 19</Text>
        <Text style={styles.listItem}>• TypeScript</Text>
        <Text style={styles.listItem}>• PostgreSQL / Prisma</Text>
        <Text style={styles.listItem}>• Tailwind CSS</Text>
      </View>
      
      {/* Add more sections as needed */}
    </Page>
  </Document>
);

// Generate PDF
async function generatePDF() {
  const doc = <CapabilitiesDocument />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();
  
  // Convert blob to buffer
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Write to public folder
  const outputPath = path.join(process.cwd(), 'public', 'ahiya-capabilities.pdf');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`PDF generated at: ${outputPath}`);
}

generatePDF().catch(console.error);
```

### Add NPM Script

In `package.json`, add:
```json
{
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx"
  }
}
```

### Run Command

```bash
npm run generate:pdf
```

### Output Location

PDF will be generated at: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/public/ahiya-capabilities.pdf`

Access via: `https://ahiya.xyz/ahiya-capabilities.pdf`

---

## 3. Animation Utilities

### Current useScrollReveal Implementation

Found in both `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` and `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`:

```typescript
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();  // Fires once, then stops observing
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

### Usage Pattern

```tsx
const { ref, isVisible } = useScrollReveal();

return (
  <div
    ref={ref}
    className={`transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
  >
    {/* Content */}
  </div>
);
```

### Existing CSS Keyframes

From `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`:

```css
/* Already available animations */
@keyframes gentle-drift { /* Background texture movement */ }
@keyframes soft-float { /* Floating elements */ }
@keyframes fade-in-up { /* Standard fade up */ }
@keyframes gradient-shift { /* Hero gradient animation */ }
@keyframes word-reveal { /* Hero word animation */ }

/* Ready-to-use classes */
.animate-float { animation: soft-float 8s ease-in-out infinite; }
.animate-fade-in { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
.section-reveal { animation: fade-in-up 0.6s ease forwards; opacity: 0; }
.section-reveal-1 through .section-reveal-10 { /* Staggered delays */ }
```

### New Keyframes Needed for Premium Feel

Add to globals.css:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM MICRO-ANIMATIONS - Undeniably alive
   ═══════════════════════════════════════════════════════════════════════════ */

/* Subtle pulse for live indicators */
@keyframes premium-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Shimmer effect for buttons/CTAs */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Gentle breathing for hero elements */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Staggered reveal for lists */
@keyframes stagger-reveal {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Utility classes */
.animate-pulse-subtle {
  animation: premium-pulse 3s ease-in-out infinite;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}
```

### Recommendation: Extract Hook to Shared Location

Create `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollReveal.ts`:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
```

---

## 4. Demo Component Pattern (MockupElement)

### Current Implementation

From `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx`:

```typescript
// TypeScript interface for mockup elements
interface MockupScreen {
  title: string;
  description: string;
  elements: { type: string; label: string; accent?: boolean }[];
}

// Element types supported
type MockupElementType = 
  | 'header'   // Title bar
  | 'card'     // Data card with optional accent
  | 'list'     // List with placeholder items
  | 'button'   // Action button
  | 'input'    // Form input
  | 'chart'    // Bar chart visualization
  | 'table';   // Grid table

// Mockup Element Renderer
function MockupElement({ element }: { element: MockupScreen['elements'][0] }) {
  switch (element.type) {
    case 'header':
      return (
        <div className="h-8 bg-white/[0.08] rounded-lg flex items-center px-3">
          <span className="text-xs text-slate-400">{element.label}</span>
        </div>
      );
    case 'card':
      return (
        <div className={`p-3 rounded-lg ${element.accent ? 'bg-purple-500/10 border border-purple-400/20' : 'bg-white/[0.04]'}`}>
          <div className="text-xs text-slate-500 mb-1">{element.label}</div>
          <div className={`text-lg font-semibold ${element.accent ? 'text-purple-300' : 'text-slate-300'}`}>
            ---
          </div>
        </div>
      );
    case 'chart':
      return (
        <div className="h-24 bg-white/[0.04] rounded-lg flex items-end justify-center gap-1 p-3">
          {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
            <div key={i} className="w-4 bg-purple-400/40 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    // ... other cases
  }
}
```

### Usage in Project Pages

```typescript
// Define mockup data
const mockupScreens: MockupScreen[] = [
  {
    title: "Admin Dashboard",
    description: "Centralized project management interface",
    elements: [
      { type: 'header', label: 'Projects Overview' },
      { type: 'card', label: 'Active Projects', accent: true },
      { type: 'table', label: 'Recent Reports' },
      { type: 'button', label: 'Create New Project' },
    ]
  },
];

// Render mockup
<div className="contemplative-card p-6 overflow-hidden">
  {/* Window chrome */}
  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-red-400/60" />
      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
      <div className="w-3 h-3 rounded-full bg-green-400/60" />
    </div>
    <span className="text-xs text-slate-500 ml-2">{screen.title}</span>
  </div>
  
  {/* Mockup content */}
  <div className="space-y-3">
    {screen.elements.map((element, idx) => (
      <MockupElement key={idx} element={element} />
    ))}
  </div>
  
  {/* Caption */}
  <p className="mt-4 pt-3 border-t border-white/5 text-sm text-slate-500">
    {screen.description}
  </p>
</div>
```

### Creating Custom Demo Components

For the 2L Process Visualization and Timeline:

```typescript
// Custom demo: AI Pipeline visualization
function PipelineDemo() {
  const steps = [
    { icon: "📋", label: "Requirements", status: "complete" },
    { icon: "🔍", label: "Exploration", status: "complete" },
    { icon: "📐", label: "Planning", status: "active" },
    { icon: "🔨", label: "Building", status: "pending" },
    { icon: "✅", label: "Validation", status: "pending" },
  ];
  
  return (
    <div className="contemplative-card p-6">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            {/* Step node */}
            <div className={`flex flex-col items-center ${
              step.status === 'active' ? 'scale-110' : ''
            }`}>
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                ${step.status === 'complete' ? 'bg-emerald-500/20 border-emerald-400/30' : ''}
                ${step.status === 'active' ? 'bg-purple-500/20 border-purple-400/30 animate-pulse-subtle' : ''}
                ${step.status === 'pending' ? 'bg-white/5 border-white/10' : ''}
                border
              `}>
                {step.icon}
              </div>
              <span className="text-xs text-slate-400 mt-2">{step.label}</span>
            </div>
            
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                step.status === 'complete' ? 'bg-emerald-400/40' : 'bg-white/10'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
```

### Interactive Timeline Demo

```typescript
// Timeline demo for 2L page
function TimelineDemo() {
  const [activePhase, setActivePhase] = useState(0);
  
  const phases = [
    { phase: "Exploration", duration: "2-4 hours", agents: 3 },
    { phase: "Planning", duration: "1-2 hours", agents: 1 },
    { phase: "Building", duration: "4-8 hours", agents: 5 },
    { phase: "Validation", duration: "1-2 hours", agents: 2 },
  ];
  
  return (
    <div className="contemplative-card p-6">
      {/* Phase tabs */}
      <div className="flex gap-2 mb-6">
        {phases.map((p, i) => (
          <button
            key={p.phase}
            onClick={() => setActivePhase(i)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activePhase === i
                ? 'bg-purple-500/20 border-purple-400/30 text-purple-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            } border`}
          >
            {p.phase}
          </button>
        ))}
      </div>
      
      {/* Active phase details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-slate-500">Duration</div>
          <div className="text-lg text-white">{phases[activePhase].duration}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-slate-500">Parallel Agents</div>
          <div className="text-lg text-white">{phases[activePhase].agents}</div>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. New Dependencies Summary

### Required Install

```bash
npm install @react-pdf/renderer
```

### Package.json After Install

```json
{
  "dependencies": {
    "@react-pdf/renderer": "^3.x.x",     // NEW
    "@tailwindcss/postcss": "^4.1.10",
    "lucide-react": "^0.517.0",
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.1.10"
  }
}
```

### New Scripts to Add

```json
{
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx"
  }
}
```

---

## 6. File Summary for Builders

| Task | File(s) | Action |
|------|---------|--------|
| Navigation Fix | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx` | Edit lines 12-18 |
| PDF Script | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx` | Create new |
| PDF Package | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json` | Add dependency & script |
| New Animations | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add keyframes |
| Shared Hook | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollReveal.ts` | Create new (optional) |
| Demo Components | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx` | Add inline components |

---

## 7. Quick Reference for Builders

### Navigation Fix (1 minute)
```diff
- { label: "Work", href: "#portfolio" },
+ { label: "Work", href: "/#portfolio" },
```

### PDF Install (30 seconds)
```bash
npm install @react-pdf/renderer
```

### Add Scroll Animation to Any Element
```tsx
const { ref, isVisible } = useScrollReveal();
<div ref={ref} className={isVisible ? "opacity-100" : "opacity-0"}>
```

### Create Simple Mockup
```tsx
<div className="contemplative-card p-6">
  {/* Traffic lights */}
  <div className="flex gap-1.5 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-400/60" />
    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
    <div className="w-3 h-3 rounded-full bg-green-400/60" />
  </div>
  {/* Content */}
</div>
```

---

## Questions for Planner

1. Should the PDF generation run at build time or on-demand?
2. Should we extract useScrollReveal to a shared hooks directory to avoid duplication?
3. Should the demo components be interactive (clickable phases) or static visualizations?

---

*Report generated by Explorer-2 for Plan-8 Iteration-10*
