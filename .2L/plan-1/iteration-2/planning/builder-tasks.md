# Iteration 2: Builder Tasks

## Builder-1: Homepage Structure & Hero Section

### Objective
Create the main page.tsx structure with hero section and placeholders for other sections.

### Files to Create/Modify
- `app/page.tsx` - Replace placeholder with full homepage structure

### Implementation Steps

1. **Read current placeholder** (`app/page.tsx`)

2. **Create page structure:**
   ```tsx
   "use client";

   import { Navigation } from "@/app/components/Navigation";
   import { Footer } from "@/app/components/Footer";

   export default function HomePage() {
     return (
       <main className="bg-[#0a0f1a] min-h-screen">
         <Navigation />

         {/* Hero Section */}
         <section className="section-breathing pt-32">
           {/* Implementation here */}
         </section>

         {/* Portfolio Section - Placeholder for Builder-2 */}
         <section id="portfolio" className="section-breathing">
           <div className="container-wide">
             {/* BUILDER-2 ZONE START */}
             <p className="text-slate-400 text-center">Portfolio section placeholder</p>
             {/* BUILDER-2 ZONE END */}
           </div>
         </section>

         {/* How I Work Section - Placeholder for Builder-3 */}
         <section id="how-i-work" className="section-breathing">
           <div className="container-content">
             {/* BUILDER-3 ZONE START - HOW I WORK */}
             <p className="text-slate-400 text-center">How I Work section placeholder</p>
             {/* BUILDER-3 ZONE END - HOW I WORK */}
           </div>
         </section>

         {/* Contact Section - Placeholder for Builder-3 */}
         <section id="contact" className="section-breathing">
           <div className="container-narrow">
             {/* BUILDER-3 ZONE START - CONTACT */}
             <p className="text-slate-400 text-center">Contact section placeholder</p>
             {/* BUILDER-3 ZONE END - CONTACT */}
           </div>
         </section>

         <Footer />
       </main>
     );
   }
   ```

3. **Implement Hero Section:**
   - Badge: "Full-Stack Developer" with Zap icon
   - Headline: "I Build SaaS Systems Fast" (Fast in gradient text)
   - Subheadline from master-plan copy
   - Two CTAs: "View Portfolio" (primary) + "Work With Me" (secondary)

4. **Create SectionHeading component** (`app/components/SectionHeading.tsx`)

### Success Criteria
- Page structure in place with clear section boundaries
- Hero section fully implemented with proper styling
- SectionHeading component created
- Page renders without errors
- Navigation and Footer imports work (even if components not created yet - use conditional)

### Dependencies
- Needs Navigation component from Builder-4 (can stub initially)
- Needs Footer component from Builder-4 (can stub initially)

---

## Builder-2: Portfolio Section with Project Cards

### Objective
Create the portfolio section showcasing 4 projects with reusable PortfolioCard component.

### Files to Create/Modify
- `app/components/PortfolioCard.tsx` - New component
- `app/page.tsx` - Fill BUILDER-2 ZONE

### Implementation Steps

1. **Create PortfolioCard component** with interface:
   ```typescript
   interface PortfolioProject {
     id: string;
     title: string;
     subtitle: string;
     description: string;
     status: "live" | "development";
     liveUrl?: string;
     techStack: string[];
   }
   ```

2. **Define portfolio projects data** (from master-plan.yaml):
   - Mirror of Dreams (AI Reflection Tool)
   - Wealth (Personal Finance SaaS)
   - StatViz (Statistical Reports Platform)
   - AI Research Pipeline (Factorial Design Research Tool)

3. **Implement Portfolio Section:**
   ```tsx
   {/* BUILDER-2 ZONE START */}
   <SectionHeading
     title="What I've Built"
     description="Real systems, deployed and running. Each project showcases end-to-end development: architecture, implementation, and deployment."
   />
   <div className="grid md:grid-cols-2 gap-6 md:gap-8">
     {portfolioProjects.map((project) => (
       <PortfolioCard key={project.id} project={project} />
     ))}
   </div>
   {/* BUILDER-2 ZONE END */}
   ```

### Card Design Requirements
- Header: title + subtitle + status badge
- Description paragraph
- Tech stack badges (flex-wrap)
- External link if liveUrl exists
- Hover effects: slight lift, border color change

### Success Criteria
- PortfolioCard component created with proper TypeScript types
- 4 project cards rendered in 2-column grid
- All projects have accurate tech stacks
- Live links work correctly
- Mobile responsive (1 column on mobile)

### Dependencies
- None (uses standard patterns from exploration)

---

## Builder-3: How I Work & Contact Sections

### Objective
Create the "How I Work" section introducing 2L methodology and Contact section with email/GitHub.

### Files to Modify
- `app/page.tsx` - Fill BUILDER-3 ZONES (both How I Work and Contact)

### Implementation Steps

1. **How I Work Section:**
   ```tsx
   {/* BUILDER-3 ZONE START - HOW I WORK */}
   <div className="text-center">
     <h2 className="display-lg text-white mb-6">How I Work</h2>
     <div className="max-w-2xl mx-auto">
       <p className="body-xl text-slate-300 mb-6 leading-relaxed">
         I use <span className="text-gentle font-medium">2L</span>, a development
         framework I built that coordinates AI agents to explore, plan, build,
         and validate software autonomously.
       </p>
       <p className="body-lg text-slate-400 mb-8">
         This is why I deliver complete systems faster than traditional development.
       </p>
       <a
         href="#contact"
         className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
       >
         <span>Ask me about it</span>
         <ArrowRight className="w-4 h-4" />
       </a>
     </div>
   </div>
   {/* BUILDER-3 ZONE END - HOW I WORK */}
   ```

2. **Contact Section:**
   ```tsx
   {/* BUILDER-3 ZONE START - CONTACT */}
   <div className="contemplative-card p-8 md:p-12 text-center">
     <h2 className="heading-xl text-white mb-4">Work With Me</h2>
     <p className="body-lg text-slate-300 mb-8">
       Looking for a developer who can own your next feature or MVP?
     </p>

     <a
       href="mailto:ahiya.butman@gmail.com"
       className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50 mb-6"
     >
       <Mail className="w-5 h-5 mr-2" />
       Send a Message
     </a>

     <div className="flex items-center justify-center space-x-6 text-slate-400">
       <a
         href="https://github.com/Ahiya1"
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-center space-x-2 hover:text-white transition-colors"
       >
         <Github className="w-5 h-5" />
         <span>GitHub</span>
       </a>
     </div>
   </div>
   {/* BUILDER-3 ZONE END - CONTACT */}
   ```

### Required Imports
```tsx
import { ArrowRight, Mail, Github } from "lucide-react";
```

### Success Criteria
- How I Work section explains 2L methodology concisely
- Contact card with email CTA
- GitHub link works
- Professional tone (no mystical language)
- Mobile responsive

### Dependencies
- Needs page.tsx structure from Builder-1

---

## Builder-4: Navigation & Footer Components

### Objective
Create reusable Navigation and Footer components for the business homepage.

### Files to Create
- `app/components/Navigation.tsx` - New component
- `app/components/Footer.tsx` - New component

### Implementation Steps

1. **Create Navigation component** (`app/components/Navigation.tsx`):
   - Fixed header with blur background
   - Logo + site name on left
   - Desktop nav: Portfolio, How I Work, Contact (anchor links)
   - Soul link (special styling with Sparkles icon)
   - Mobile hamburger menu with slide-out panel
   - All accessibility features from MobileNav (Escape key, scroll lock, aria)

2. **Create Footer component** (`app/components/Footer.tsx`):
   - Soul link at top: "The philosophical side →"
   - Centered logo (opacity-40)
   - Attribution: "Built by Ahiya Butman"
   - Copyright with current year

### Navigation Structure
```typescript
const navItems = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Contact", href: "#contact" },
];
// Soul link handled separately with special styling
```

### Required Imports
```tsx
// Navigation.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";

// Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
```

### Success Criteria
- Navigation works on desktop and mobile
- Smooth scroll to anchor sections
- Soul link prominent but not dominant
- Footer matches existing soul footer style
- All accessibility features implemented
- No TypeScript errors

### Dependencies
- None (standalone components)

---

## Integration Notes

### Build Order Recommendation
1. **Builder-4** (Navigation, Footer) - No dependencies, provides structure
2. **Builder-1** (Page structure, Hero) - Uses Builder-4 components
3. **Builder-2** (Portfolio) - Fills section in Builder-1 structure
4. **Builder-3** (How I Work, Contact) - Fills sections in Builder-1 structure

### Parallel Build Option
All builders can work in parallel if:
- Builder-1 creates stub Navigation/Footer imports with fallback
- Builders 2 & 3 work on isolated section code that can be pasted in

### Integration Phase Requirements
1. Merge all builder outputs into single cohesive page.tsx
2. Ensure all imports are correct
3. Remove placeholder comments
4. Verify mobile responsiveness
5. Test all anchor links work
6. Run TypeScript and lint checks
