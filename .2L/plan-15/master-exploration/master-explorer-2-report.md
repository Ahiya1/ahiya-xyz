# Master Explorer 2 Report: Content Structure & Design Patterns

## Executive Summary

This report analyzes the content structure requirements for the hidden CV page and the design patterns established across ahiya.xyz. The CV page should maintain visual consistency with the existing site while adopting a more minimal, typography-forward aesthetic suitable for a professional organizational interface. The one-page PDF should mirror the web content using the established @react-pdf/renderer pattern.

---

## 1. Content Analysis from Vision

### Section 1: Vision/Positioning Statement

**Content Requirements:**
- Identity: Systems-level AI and automation builder
- Focus: Agent-driven, production-grade software
- Specialty: Loops (data -> logic -> agents -> execution -> feedback)
- Philosophy: Independence by default, selective collaboration

**Recommended Copy (Draft):**
```
Systems-level AI and automation builder.

I design and ship production-grade software where agents, data pipelines, 
and execution loops converge. My work optimizes for clarity, reliability, 
and measured outcomes.

Independent by default. Selective collaboration when alignment is clear.
```

**Design Notes:**
- First viewport priority
- No marketing language - direct and factual
- Sets filter expectations immediately

---

### Section 2: Systems Proof (4 Projects)

**Content Requirements (Compressed Format):**

| Project | One-Line Description |
|---------|---------------------|
| **2L** | Agent orchestration framework for parallel AI execution |
| **AI Research Pipeline** | Factorial design delivery system for academic research |
| **StatViz** | Live B2B statistical reports platform with Hebrew support |
| **SelahReach** | Claude Code + outreach automation integration |

**Design Notes:**
- Brief titles with one-line descriptions only
- Optional links to live systems or project detail pages
- No screenshots or heavy visuals
- Clean, professional layout - possibly a simple list or compact grid

---

### Section 3: Operational Scope

**Content Requirements (Three Constraints):**
1. **Part-time only** - Not seeking full-time positions
2. **Remote-first** - Location-independent work
3. **Domains:** Systems, agents, AI pipelines, automation

**Recommended Copy (Draft):**
```
Operational Scope

- Part-time engagements only
- Remote-first, timezone-flexible
- Focus areas: Systems architecture, AI agents, automation pipelines
```

---

### Section 4: Availability Status

**Content Requirements:**
- Binary state: Open / Closed
- Visual indicator (subtle, not flashy)
- Config-driven for easy updates

**States:**
- **Open:** "Open to part-time collaboration" (green indicator)
- **Closed:** "Currently closed to new engagements" (neutral/gray indicator)

**Implementation Notes:**
- Store in config constant (e.g., `lib/cv-config.ts`)
- Small colored dot indicator (8px circle)
- Green = open (#22c55e), Gray = closed (#64748b)

---

### Section 5: Contact Channel

**Content Requirements:**
- Single pathway: Direct email (ahiya.butman@gmail.com)
- No calendar links, no multiple channels
- Simple mailto: link

**Recommended Copy:**
```
Contact

ahiya.butman@gmail.com

One channel. Clear communication.
```

---

### Section 6: PDF Download Link

**Content Requirements:**
- Small, understated line at page bottom
- Not styled as CTA
- Links to generated PDF

**Recommended Copy:**
```
For formal internal processes, a one-page PDF version is available.
```

---

## 2. Existing Page Design Patterns

### Structure Analysis from `/app/capabilities/page.tsx`

**Page Structure:**
1. `<Navigation />` component (fixed header)
2. Hero section with `hero-gradient-bg` class
3. Multiple content sections with `section-breathing` class
4. Staggered reveal animations (`section-reveal section-reveal-{n}`)
5. `<Footer />` component

**Container Classes (from globals.css):**
- `container-wide`: max-width 1200px, horizontal padding 1.5rem
- `container-content`: max-width 800px (ideal for CV page)
- `container-narrow`: max-width 600px

**Spacing Classes:**
- `section-breathing`: padding 6rem 0 (mobile: 4rem 0)
- `spacing-gentle`: margin-bottom 2rem
- `spacing-comfortable`: margin-bottom 3rem
- `spacing-generous`: margin-bottom 4rem

**Card Patterns:**
- `contemplative-card`: Semi-transparent glass effect with blur, 16px border-radius
- `breathing-glass`: Lighter glass effect

---

### Typography Hierarchy

**Display Text (Crimson Text serif):**
- `display-xl`: clamp(2.5rem, 5vw, 4rem), weight 600, line-height 1.1
- `display-lg`: clamp(2rem, 4vw, 3rem), weight 600, line-height 1.2

**Heading Text (Inter sans-serif):**
- `heading-xl`: clamp(1.5rem, 3vw, 2rem), weight 600
- `heading-lg`: clamp(1.25rem, 2.5vw, 1.5rem), weight 500

**Body Text:**
- `body-xl`: clamp(1.125rem, 2vw, 1.25rem), line-height 1.7
- `body-lg`: clamp(1rem, 1.5vw, 1.125rem), line-height 1.6

**Special:**
- `text-gentle`: Purple-to-pink gradient text
- `sacred-text`: Crimson Text italic, purple color

---

### Color Palette

**Background:**
- Primary: `#0a0f1a` (dark navy)
- Card background: `rgba(255, 255, 255, 0.04)`

**Text Colors:**
- Primary: `#f8fafc` (slate-50)
- Secondary: `#cbd5e1` (slate-300)
- Tertiary: `#94a3b8` (slate-400)
- Muted: `#64748b` (slate-500)
- Very muted: `#475569` (slate-600)

**Accent:**
- Purple primary: `#a855f7` (purple-500)
- Purple light: `#a78bfa` (purple-400)
- Purple bg: `rgba(168, 85, 247, 0.1)`
- Purple border: `rgba(168, 85, 247, 0.3)`

**Status:**
- Open/Live: `#22c55e` (emerald-500)
- Closed/Neutral: `#64748b` (slate-500)

---

## 3. Component Patterns for CV Page

### Reusable Components

**From `/app/components/`:**

| Component | Purpose | Reuse for CV? |
|-----------|---------|---------------|
| `Navigation.tsx` | Fixed nav header | **NO** - CV should not have navigation (hidden page) |
| `Footer.tsx` | Page footer | **YES** - But modified with availability signal |
| `SectionHeading.tsx` | Section title + description | **YES** - For section headers |

**Note:** The CV page should intentionally NOT include `<Navigation />` to reinforce its "hidden" nature. Visitors access via direct link, and there's no back navigation to encourage.

### Recommended New Components

**1. AvailabilityBadge Component**
```typescript
// app/cv/components/AvailabilityBadge.tsx
interface AvailabilityBadgeProps {
  status: 'open' | 'closed';
}
```
- Displays colored dot + status text
- Reads from config

**2. SystemsProofList Component**
```typescript
// app/cv/components/SystemsProofList.tsx
interface Project {
  name: string;
  description: string;
  link?: string;
}
```
- Simple list of 4 projects
- Optional external links

---

## 4. Footer Integration Design

### Current Footer Structure

**File:** `/app/components/Footer.tsx`

```tsx
<footer className="py-12 border-t border-white/5">
  <div className="container-content">
    <p className="text-center text-slate-500 text-sm mb-1">
      Ahiya - Systems Architect
    </p>
    <p className="text-center text-slate-600 text-xs">
      2025
    </p>
  </div>
</footer>
```

### Proposed Modification

Add availability signal line ABOVE the existing content:

```tsx
<footer className="py-12 border-t border-white/5">
  <div className="container-content">
    {/* Availability signal - same styling as copyright */}
    <p className="text-center text-slate-600 text-xs mb-4">
      <Link 
        href="/cv" 
        className="hover:text-slate-500 transition-colors"
      >
        Select part-time availability for systems roles.
      </Link>
    </p>
    
    {/* Existing content */}
    <p className="text-center text-slate-500 text-sm mb-1">
      Ahiya - Systems Architect
    </p>
    <p className="text-center text-slate-600 text-xs">
      2025
    </p>
  </div>
</footer>
```

### Design Rationale

- **Color:** `text-slate-600` (same as year) - very muted
- **Size:** `text-xs` (12px) - small, not prominent
- **Hover:** Subtle color change only, no underline animation
- **Spacing:** `mb-4` gap before main footer content
- **Alignment:** Centered, consistent with existing footer

**Key Principle:** This should be noticeable only to those actively reading the footer. Not promotional, not highlighted.

---

## 5. PDF Content Structure

### Existing Pattern Analysis

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`

**Key Patterns:**
- Uses `@react-pdf/renderer` with StyleSheet
- A4 page size, 40px padding
- White background (print-friendly)
- Professional header with logo
- Clear section hierarchy
- Footer with CTA

### CV PDF Layout Plan

**Page Dimensions:** A4 (595 x 842 points)
**Margins:** 50px all sides (slightly more breathing room)
**Font:** Helvetica (built-in, professional)

**Section Layout (Top to Bottom):**

```
+--------------------------------------------------+
|  HEADER                                          |
|  [Logo]              Ahiya Butman                |
|                      Systems-Level AI Builder     |
+--------------------------------------------------+
|  CONTACT BAR                                     |
|  ahiya.xyz | ahiya.butman@gmail.com | GitHub     |
+--------------------------------------------------+
|  VISION STATEMENT (centered, prominent)          |
|  Systems-level AI and automation builder...      |
+--------------------------------------------------+
|  SYSTEMS PROOF                                   |
|  - 2L: Agent orchestration framework             |
|  - AI Research Pipeline: Factorial design...    |
|  - StatViz: B2B statistical reports...          |
|  - SelahReach: Claude Code + outreach...        |
+--------------------------------------------------+
|  OPERATIONAL SCOPE                               |
|  * Part-time only                                |
|  * Remote-first                                  |
|  * Systems, agents, AI pipelines, automation    |
+--------------------------------------------------+
|  AVAILABILITY [STATUS INDICATOR]                 |
|  Open to part-time collaboration                 |
+--------------------------------------------------+
|  FOOTER                                          |
|  Direct contact: ahiya.butman@gmail.com          |
+--------------------------------------------------+
```

### PDF Style Recommendations

**Header:**
- Logo left, name/title right
- Purple accent border below (2px)
- Font sizes: Name 22pt, subtitle 11pt

**Sections:**
- Section titles: 11pt, purple (#7c3aed), uppercase, letter-spacing 1
- Body text: 9-10pt, dark gray (#334155)
- Generous line spacing (1.5)

**Availability Status:**
- Include small colored indicator in PDF
- Green circle SVG for "open"
- Neutral for "closed"

---

## 6. CV Page Wireframe (Text-Based)

```
+================================================================+
|                                                                |
|                    [No Navigation Bar]                         |
|                                                                |
+================================================================+
|                                                                |
|  HERO / VISION SECTION (pt-24, centered)                      |
|  ------------------------------------------------------------ |
|                                                                |
|           "Systems-Level AI Builder"                          |
|           (display-lg, text-white)                            |
|                                                                |
|    I design and ship production-grade software where          |
|    agents, data pipelines, and execution loops converge.      |
|    (body-xl, text-slate-300, max-w-xl, centered)             |
|                                                                |
|    Independent by default. Selective collaboration            |
|    when alignment is clear.                                   |
|    (body-lg, text-slate-500)                                 |
|                                                                |
+================================================================+
|                                                                |
|  SYSTEMS PROOF SECTION (section-breathing)                    |
|  ------------------------------------------------------------ |
|                                                                |
|    SYSTEMS                                                    |
|    (heading-lg, text-slate-400, uppercase, tracking-wider)   |
|                                                                |
|    * 2L                                                       |
|      Agent orchestration framework                            |
|                                                                |
|    * AI Research Pipeline                                     |
|      Factorial design delivery system                         |
|                                                                |
|    * StatViz                                                  |
|      Live B2B statistical reports platform                    |
|                                                                |
|    * SelahReach                                               |
|      Claude Code + outreach automation                        |
|                                                                |
+================================================================+
|                                                                |
|  OPERATIONAL SCOPE SECTION                                    |
|  ------------------------------------------------------------ |
|                                                                |
|    SCOPE                                                      |
|                                                                |
|    [pill] Part-time only                                      |
|    [pill] Remote-first                                        |
|    [pill] Systems | Agents | AI Pipelines | Automation       |
|                                                                |
+================================================================+
|                                                                |
|  AVAILABILITY + CONTACT SECTION (contemplative-card)         |
|  ------------------------------------------------------------ |
|                                                                |
|    [green dot] Open to part-time collaboration               |
|                                                                |
|    ahiya.butman@gmail.com                                     |
|    (mailto: link, prominent but not flashy)                  |
|                                                                |
+================================================================+
|                                                                |
|  PDF DOWNLOAD (very bottom, subtle)                          |
|  ------------------------------------------------------------ |
|                                                                |
|    For formal internal processes, a one-page PDF              |
|    version is available.                                      |
|    (text-slate-600, text-xs, underlined on hover)            |
|                                                                |
+================================================================+
|                                                                |
|  FOOTER (py-8, minimal)                                       |
|  ------------------------------------------------------------ |
|    ahiya.xyz                                                  |
|    (text-slate-600, text-xs)                                 |
|                                                                |
+================================================================+
```

---

## 7. Recommendations for Planner

### Content Recommendations

1. **Remove Navigation:** The CV page should NOT include the standard `<Navigation />` component. This reinforces its hidden nature and prevents visitors from getting "lost" in the main site.

2. **Minimal Footer:** Use a stripped-down footer on the CV page itself - just "ahiya.xyz" link. The availability signal should only be in the main site footer.

3. **Config-Driven Status:** Create a simple config file:
   ```typescript
   // lib/cv-config.ts
   export const cvConfig = {
     availabilityStatus: 'open' as const, // 'open' | 'closed'
     contactEmail: 'ahiya.butman@gmail.com',
   };
   ```

### Design Recommendations

4. **Typography First:** This page should be heavily typography-driven. No images except possibly the logo. Let whitespace and type hierarchy do the work.

5. **Sparse Animation:** Unlike the main site, use minimal or no animation. Professional, not playful. Perhaps only a subtle fade-in on load.

6. **Mobile Responsive:** Ensure all sections stack cleanly on mobile. The page should work perfectly at 375px width.

### Technical Recommendations

7. **SEO Exclusion:** Create `app/cv/page.tsx` with custom metadata:
   ```typescript
   export const metadata: Metadata = {
     robots: {
       index: false,
       follow: false,
     },
   };
   ```

8. **PDF Generation Script:** Create parallel to existing:
   - `/scripts/generate-cv-pdf.tsx`
   - Output to `/public/ahiya-cv.pdf`
   - Include in build process

9. **Aliases:** Consider supporting both `/cv` and `/part-time` routes. Can use a redirect in Next.js config.

---

## 8. File Structure Recommendation

```
app/
  cv/
    page.tsx                    # Main CV page
    components/
      AvailabilityBadge.tsx     # Status indicator
      SystemsProofList.tsx      # Project list
      CVFooter.tsx              # Minimal footer for CV
lib/
  cv-config.ts                  # Availability config
scripts/
  generate-cv-pdf.tsx           # PDF generator
public/
  ahiya-cv.pdf                  # Generated output
```

---

## 9. Questions for Planner

1. **Footer Signal Exact Copy:** Is "Select part-time availability for systems roles." the final copy, or should it be refined?

2. **Logo on CV Page:** Should the logo appear on the CV page header, or keep it entirely text-based?

3. **Project Links:** Should the four systems have clickable links to their respective pages/demos, or keep it purely text?

4. **Email Subject Line:** Should the email link include a pre-filled subject like `mailto:ahiya.butman@gmail.com?subject=Part-time%20Collaboration`?

---

## 10. Resource Map

### Critical Files to Create

| File | Purpose |
|------|---------|
| `app/cv/page.tsx` | Main CV page component |
| `lib/cv-config.ts` | Availability status config |
| `scripts/generate-cv-pdf.tsx` | PDF generation script |

### Files to Modify

| File | Modification |
|------|--------------|
| `app/components/Footer.tsx` | Add availability signal line |
| `next.config.js` (if needed) | Add /part-time redirect |

### Existing Resources to Reference

| Resource | Use Case |
|----------|----------|
| `scripts/generate-capabilities-pdf.tsx` | PDF generation pattern |
| `app/capabilities/page.tsx` | Page structure pattern |
| `app/globals.css` | Typography and spacing classes |
| `app/components/Footer.tsx` | Footer integration |

---

**Report Complete.**

*Generated by Master Explorer 2 for Plan-15*
