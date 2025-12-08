# Explorer 2 Report: Content Finalization and Copy Writing

## Executive Summary

This report finalizes all copy and content for the hidden CV interface. The content maintains the direct, professional tone established across ahiya.xyz while deliberately avoiding marketing language. All copy is designed to filter, not convince. TypeScript interfaces and a complete config structure are provided for implementation.

---

## 1. Vision Statement Copy

### Primary Positioning Statement

```
Systems-level AI builder.
```

### Extended Statement (second paragraph)

```
I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery.
```

### Philosophy Statement (third paragraph, subtle)

```
Independent by default. Selective collaboration when alignment is clear.
```

### Full Vision Section HTML Structure

```tsx
<h1 className="display-lg text-white mb-6">
  Systems-level AI builder.
</h1>
<p className="body-xl text-slate-300 max-w-xl mx-auto mb-6">
  I design and ship production-grade software where agents, data pipelines, 
  and execution loops converge. Clarity in architecture. Precision in delivery.
</p>
<p className="body-lg text-slate-500 max-w-lg mx-auto">
  Independent by default. Selective collaboration when alignment is clear.
</p>
```

### Copy Rationale

- **"Systems-level AI builder"** - Direct identity statement. "Systems-level" signals depth beyond typical development. "Builder" over "developer" or "engineer" conveys hands-on creation.
- **"agents, data pipelines, and execution loops"** - Specific technical vocabulary that filters for those who understand the domain.
- **"Clarity in architecture. Precision in delivery."** - Mirrors the site's existing tagline structure ("Intention. Clarity. Results.").
- **"Independent by default"** - Sets expectation that full-time is not the default mode.
- **"Selective collaboration"** - Signals quality filtering without arrogance.

---

## 2. Systems Proof Copy

### Project Descriptions

| Project | One-Line Description |
|---------|---------------------|
| **2L** | AI agent orchestration framework for parallel software delivery |
| **AI Research Pipeline** | Factorial design engine for controlled academic data generation |
| **StatViz** | B2B statistical reports platform with Hebrew RTL support |
| **SelahReach** | Intelligent outreach automation with Claude Code integration |

### Rationale for Each

**2L:**
- "Agent orchestration framework" - specific technical term
- "Parallel software delivery" - describes the outcome, not just technology
- Avoids vague terms like "AI-powered" or "intelligent"

**AI Research Pipeline:**
- "Factorial design engine" - signals statistical/academic rigor
- "Controlled academic data generation" - precise about the domain
- Avoids "AI" prefix (the name already includes it)

**StatViz:**
- "B2B statistical reports platform" - direct description of what it is
- "Hebrew RTL support" - unique technical capability, filters for relevant clients
- No marketing fluff

**SelahReach:**
- "Intelligent outreach automation" - describes function
- "Claude Code integration" - specific technology, not generic "AI"
- Concise, factual

### Optional Links Structure

```typescript
const systemsProof = [
  {
    name: "2L",
    description: "AI agent orchestration framework for parallel software delivery",
    link: "/2l",
  },
  {
    name: "AI Research Pipeline",
    description: "Factorial design engine for controlled academic data generation",
    link: "/projects/ai-research-pipeline",
  },
  {
    name: "StatViz",
    description: "B2B statistical reports platform with Hebrew RTL support",
    link: "https://statviz.xyz",
    external: true,
  },
  {
    name: "SelahReach",
    description: "Intelligent outreach automation with Claude Code integration",
    link: "/projects/selahreach",
  },
];
```

---

## 3. Operational Scope Copy

### The Three Constraints

```
1. Part-time engagements only
2. Remote-first, timezone-flexible  
3. Systems, agents, AI pipelines, automation
```

### Alternative Formats

**Pill/Badge Format:**
```tsx
<div className="flex flex-wrap gap-3 justify-center">
  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm">
    Part-time only
  </span>
  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm">
    Remote-first
  </span>
  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm">
    Systems | Agents | AI Pipelines
  </span>
</div>
```

**List Format:**
```tsx
<ul className="space-y-2 text-slate-400">
  <li className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
    Part-time engagements only
  </li>
  <li className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
    Remote-first, timezone-flexible
  </li>
  <li className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
    Systems, agents, AI pipelines, automation
  </li>
</ul>
```

### Rationale

- **"Part-time engagements only"** - Clear boundary. Not "open to part-time" which implies also open to full-time.
- **"Remote-first, timezone-flexible"** - Addresses practical logistics upfront.
- **"Systems, agents, AI pipelines, automation"** - Domain scope without being exclusive. Comma-separated for scannability.

---

## 4. Availability Status Copy

### Open State

```
Open to part-time collaboration
```

**Visual:** Green dot indicator (#22c55e / emerald-500)

### Closed State

```
Currently closed to new engagements
```

**Visual:** Gray dot indicator (#64748b / slate-500)

### Implementation

```tsx
// Component structure
<div className="flex items-center gap-3">
  <span 
    className={`w-2.5 h-2.5 rounded-full ${
      status === 'open' ? 'bg-emerald-500' : 'bg-slate-500'
    }`}
    aria-hidden="true"
  />
  <span className="text-slate-300">
    {status === 'open' 
      ? 'Open to part-time collaboration'
      : 'Currently closed to new engagements'
    }
  </span>
</div>
```

### Rationale

- **"Open to part-time collaboration"** - Reiterates part-time explicitly.
- **"Currently closed to new engagements"** - "Currently" implies temporary. "New engagements" clarifies existing work continues.
- No exclamation marks, no "exciting opportunities" language.

---

## 5. Contact Section Copy

### Email Display

```
ahiya.butman@gmail.com
```

### Supporting Text (Optional)

```
One channel. Direct communication.
```

### Full Contact Section

```tsx
<div className="text-center">
  <h3 className="heading-lg text-white mb-4">Contact</h3>
  <a 
    href="mailto:ahiya.butman@gmail.com?subject=Part-time%20Collaboration%20Inquiry"
    className="text-xl text-purple-400 hover:text-purple-300 transition-colors"
  >
    ahiya.butman@gmail.com
  </a>
  <p className="text-slate-600 text-sm mt-3">
    One channel. Direct communication.
  </p>
</div>
```

### Email Subject Line (Pre-filled)

```
Part-time Collaboration Inquiry
```

**Mailto URL:**
```
mailto:ahiya.butman@gmail.com?subject=Part-time%20Collaboration%20Inquiry
```

### Rationale

- **"One channel"** - Signals no calendly, no LinkedIn, no form. Just email.
- **"Direct communication"** - Implies no intermediaries, no recruiters.
- Pre-filled subject line helps with email organization and signals context.

---

## 6. PDF Download Copy

### Link Text

```
For formal internal processes, a one-page PDF version is available.
```

### Implementation

```tsx
<p className="text-center text-slate-600 text-xs mt-12">
  <a 
    href="/ahiya-cv.pdf"
    download
    className="hover:text-slate-500 transition-colors underline"
  >
    For formal internal processes, a one-page PDF version is available.
  </a>
</p>
```

### Rationale

- **"formal internal processes"** - Acknowledges that HR/legal may require a document.
- **"one-page"** - Sets expectation of brevity.
- **"is available"** - Passive voice intentionally subdued, not promotional.
- Underlined for discoverability without button styling.

---

## 7. Footer Signal Copy

### Main Site Footer Addition

```
Select part-time availability for systems roles.
```

### Implementation in Footer.tsx

```tsx
<footer ref={ref} className={`py-12 border-t border-white/5 ...`}>
  <div className="container-content">
    {/* NEW: Availability signal */}
    <p className="text-center text-slate-600 text-xs mb-4">
      <a 
        href="/cv" 
        className="hover:text-slate-500 transition-colors"
      >
        Select part-time availability for systems roles.
      </a>
    </p>
    
    {/* Existing footer content */}
    <p className="text-center text-slate-500 text-sm mb-1">
      Ahiya — Systems Architect
    </p>
    <p className="text-center text-slate-600 text-xs">
      2025
    </p>
  </div>
</footer>
```

### Rationale

- **"Select"** - Implies filtering, not advertising. Not everyone qualifies.
- **"part-time availability"** - Key constraint upfront.
- **"systems roles"** - Domain filter.
- Same color as year (`text-slate-600`) - intentionally easy to miss for casual visitors.
- No icon, no arrow, no visual emphasis.

---

## 8. CV Page Minimal Footer Copy

The CV page should have its own minimal footer, not the full site footer:

```tsx
<footer className="py-8 border-t border-white/5">
  <div className="container-content text-center">
    <a 
      href="https://ahiya.xyz" 
      className="text-slate-600 text-xs hover:text-slate-500 transition-colors"
    >
      ahiya.xyz
    </a>
  </div>
</footer>
```

### Rationale

- CV page is intentionally isolated from main site navigation.
- Single link back to main site for context.
- No availability signal (visitor is already on the CV page).

---

## 9. TypeScript Config Structure

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts`

```typescript
/**
 * CV Page Configuration
 * 
 * This config controls the hidden /cv page content and availability status.
 * Change availabilityStatus to 'closed' when not accepting new engagements.
 */

// Status type
export type AvailabilityStatus = 'open' | 'closed';

// Project type for systems proof
export interface SystemProject {
  name: string;
  description: string;
  link?: string;
  external?: boolean;
}

// Full config interface
export interface CVConfig {
  // Availability
  availabilityStatus: AvailabilityStatus;
  
  // Contact
  contactEmail: string;
  emailSubject: string;
  
  // Systems proof
  systems: SystemProject[];
  
  // Copy
  copy: {
    // Vision section
    headline: string;
    subheadline: string;
    philosophy: string;
    
    // Operational scope
    operationalScope: string[];
    
    // Availability states
    availabilityOpen: string;
    availabilityClosed: string;
    
    // Contact section
    contactSupportText: string;
    
    // PDF download
    pdfDownloadText: string;
    
    // Footer signal (main site footer)
    footerSignal: string;
  };
}

// Default configuration
export const cvConfig: CVConfig = {
  availabilityStatus: 'open',
  
  contactEmail: 'ahiya.butman@gmail.com',
  emailSubject: 'Part-time Collaboration Inquiry',
  
  systems: [
    {
      name: '2L',
      description: 'AI agent orchestration framework for parallel software delivery',
      link: '/2l',
    },
    {
      name: 'AI Research Pipeline',
      description: 'Factorial design engine for controlled academic data generation',
      link: '/projects/ai-research-pipeline',
    },
    {
      name: 'StatViz',
      description: 'B2B statistical reports platform with Hebrew RTL support',
      link: 'https://statviz.xyz',
      external: true,
    },
    {
      name: 'SelahReach',
      description: 'Intelligent outreach automation with Claude Code integration',
      link: '/projects/selahreach',
    },
  ],
  
  copy: {
    // Vision section
    headline: 'Systems-level AI builder.',
    subheadline: 'I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery.',
    philosophy: 'Independent by default. Selective collaboration when alignment is clear.',
    
    // Operational scope
    operationalScope: [
      'Part-time engagements only',
      'Remote-first, timezone-flexible',
      'Systems, agents, AI pipelines, automation',
    ],
    
    // Availability states
    availabilityOpen: 'Open to part-time collaboration',
    availabilityClosed: 'Currently closed to new engagements',
    
    // Contact section
    contactSupportText: 'One channel. Direct communication.',
    
    // PDF download
    pdfDownloadText: 'For formal internal processes, a one-page PDF version is available.',
    
    // Footer signal (main site footer)
    footerSignal: 'Select part-time availability for systems roles.',
  },
};

// Helper function to get current availability text
export function getAvailabilityText(config: CVConfig = cvConfig): string {
  return config.availabilityStatus === 'open'
    ? config.copy.availabilityOpen
    : config.copy.availabilityClosed;
}

// Helper function to build mailto URL
export function getMailtoUrl(config: CVConfig = cvConfig): string {
  const subject = encodeURIComponent(config.emailSubject);
  return `mailto:${config.contactEmail}?subject=${subject}`;
}

export default cvConfig;
```

---

## 10. PDF Content Structure

### Content Mapping for PDF Generator

```typescript
// For scripts/generate-cv-pdf.tsx

const pdfContent = {
  header: {
    name: 'Ahiya Butman',
    title: 'Systems-Level AI Builder',
    tagline: 'Clarity in architecture. Precision in delivery.',
  },
  
  contact: {
    website: 'ahiya.xyz',
    email: 'ahiya.butman@gmail.com',
    github: 'github.com/Ahiya1',
  },
  
  vision: 
    'I design and ship production-grade software where agents, data pipelines, ' +
    'and execution loops converge. Independent by default. ' +
    'Selective collaboration when alignment is clear.',
  
  systems: [
    { name: '2L', description: 'AI agent orchestration framework for parallel software delivery' },
    { name: 'AI Research Pipeline', description: 'Factorial design engine for controlled academic data generation' },
    { name: 'StatViz', description: 'B2B statistical reports platform with Hebrew RTL support' },
    { name: 'SelahReach', description: 'Intelligent outreach automation with Claude Code integration' },
  ],
  
  scope: [
    'Part-time engagements only',
    'Remote-first, timezone-flexible',
    'Systems, agents, AI pipelines, automation',
  ],
  
  availability: {
    status: 'open', // Read from config
    openText: 'Open to part-time collaboration',
    closedText: 'Currently closed to new engagements',
  },
  
  footer: {
    cta: 'Direct contact: ahiya.butman@gmail.com',
  },
};
```

---

## 11. Section Headings

For consistency with the rest of the site, use these section header patterns:

| Section | Heading Text | Heading Style |
|---------|-------------|---------------|
| Vision | (none - headline is the heading) | N/A |
| Systems | "SYSTEMS" | `text-slate-500 text-xs tracking-[0.2em] uppercase` |
| Scope | "SCOPE" | `text-slate-500 text-xs tracking-[0.2em] uppercase` |
| Availability/Contact | (combined into card, no explicit heading) | N/A |

### Rationale

- ALL-CAPS with letter-spacing matches professional CV/resume aesthetics.
- Muted color (`slate-500`) keeps focus on content.
- Minimal headings - let content speak.

---

## 12. Complete Copy Summary Table

| Location | Copy |
|----------|------|
| **Vision Headline** | "Systems-level AI builder." |
| **Vision Subheadline** | "I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery." |
| **Vision Philosophy** | "Independent by default. Selective collaboration when alignment is clear." |
| **Systems Section Header** | "SYSTEMS" |
| **2L Description** | "AI agent orchestration framework for parallel software delivery" |
| **AI Research Pipeline Description** | "Factorial design engine for controlled academic data generation" |
| **StatViz Description** | "B2B statistical reports platform with Hebrew RTL support" |
| **SelahReach Description** | "Intelligent outreach automation with Claude Code integration" |
| **Scope Section Header** | "SCOPE" |
| **Scope Item 1** | "Part-time engagements only" |
| **Scope Item 2** | "Remote-first, timezone-flexible" |
| **Scope Item 3** | "Systems, agents, AI pipelines, automation" |
| **Availability Open** | "Open to part-time collaboration" |
| **Availability Closed** | "Currently closed to new engagements" |
| **Contact Email** | "ahiya.butman@gmail.com" |
| **Contact Support** | "One channel. Direct communication." |
| **PDF Download** | "For formal internal processes, a one-page PDF version is available." |
| **Footer Signal** | "Select part-time availability for systems roles." |

---

## 13. Recommendations for Builder

1. **Use the config file as source of truth** - All copy should be read from `lib/cv-config.ts`, not hardcoded in components. This allows easy updates.

2. **Maintain tone consistency** - The copy deliberately avoids:
   - Exclamation marks
   - Marketing superlatives ("amazing", "incredible", "cutting-edge")
   - Buzzwords without substance
   - Persuasive language

3. **Test the filtering effect** - The copy should make unqualified visitors exit. If too many generic inquiries come through, the copy may need to be more filtering.

4. **PDF and web content alignment** - The PDF should mirror web content closely. Any changes to config should be reflected in both.

5. **Email subject line matters** - The pre-filled subject helps filter inbox and signals intent.

---

## 14. Questions Resolved

| Question | Resolution |
|----------|------------|
| Email subject line? | Yes, pre-fill with "Part-time Collaboration Inquiry" |
| Logo on CV page? | No - keep it text-only for professional minimalism |
| Project links clickable? | Yes - optional links in config, render as plain text if no link |
| Footer on CV page? | Minimal footer with just "ahiya.xyz" link |

---

**Report Generated:** 2025-12-08
**Explorer:** Explorer 2
**Focus Area:** Content Finalization and Copy Writing
