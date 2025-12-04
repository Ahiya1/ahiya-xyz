# Master Explorer 3: Current Project Pages Analysis

**Focus Area:** Current Project Pages & Capabilities (this codebase)
**Explorer ID:** master-explorer-3
**Date:** 2025-12-04

---

## Mirror of Dreams Page

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx`

### Lines of Code
577 lines

### WRONG Content Found

**Critical Issue: Demo shows SLEEP dreams instead of LIFE dreams (aspirations)**

| Line | Wrong Content | Why It's Wrong |
|------|---------------|----------------|
| 21 | `const dreamEntry = "Last night I dreamed of flying over an endless ocean...";` | Shows sleep/night dream, NOT life aspiration |
| 22 | `const aiReflection = "Your dream of flight over water suggests a desire for freedom and emotional exploration. The endless ocean represents the vast unconscious, while flying symbolizes transcendence and perspective."` | Sleep dream analysis, NOT life goal reflection |
| 94 | `<div className="text-xs text-purple-400/70 mb-2">Your Dream</div>` | Generic "dream" label, should reference aspirations |
| 100 | `<div className="text-xs text-purple-400 mb-2">AI Reflection</div>` | Generic reflection, should be about life goals |
| 206-214 | `mockupScreens` array with "Dream Journal" and "5 Sacred Questions" | Implies sleep dream journaling |
| 282-285 | `challenges` array: "Dream journaling apps offer storage but no insight" | Positions as sleep dream app |
| 359 | `<h1>Dream Journal with AI Insight</h1>` | Hero title is completely wrong - suggests night dreams |
| 374 | `<p>Capture, understand, remember.</p>` | Tagline implies memory/recording, not aspiration tracking |
| 406 | `<p>Watch the AI reflect on your dreams</p>` | Again implies sleep dreams |
| 537 | `<p>Discover your dreams through AI-powered reflection.</p>` | CTA reinforces wrong concept |

### Links to Wrong Project
| Line | Issue |
|------|-------|
| 247-252 | `nextProject` links to `/projects/wealth` which is being deleted |

### What Needs to Change

1. **Hero Section:**
   - Change title from "Dream Journal with AI Insight" to something like "AI Companion for Life Dreams"
   - Update tagline to reference aspirations, goals, life dreams

2. **Demo Component (MirrorDemo):**
   - Replace `dreamEntry` with a life aspiration example: "Launch My Sustainable Fashion Brand"
   - Show 4 reflection questions (not 5 sacred questions):
     - "What draws you to this dream?"
     - "What's one step you could take today?"
     - "What fears are you holding?"
     - "What would success feel like?"
   - Replace AI reflection with life dream coaching response

3. **Challenges Section:**
   - Replace sleep-dream challenges with life-goal tracking challenges
   - E.g., "Goal apps focus on tasks, not meaning", "No space for reflection on aspirations"

4. **Solutions Section:**
   - Focus on AI companion relationship
   - Progress tracking for aspirations
   - 4 reflection questions per dream

5. **Features Section:**
   - Update to reflect actual Mirror of Dreams features:
     - Dream creation (aspirations)
     - Reflection questions
     - AI companion insights
     - Progress tracking over time

6. **Next Project Link:**
   - Change from `/projects/wealth` to `/projects/statviz` or new `/projects/selahreach`

---

## StatViz Page

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx`

### Lines of Code
597 lines

### Current Demo Content

The `StatVizDemo` component (lines 33-116) shows:
- Toggle buttons: Distribution, Correlation, Significance
- Animated bar chart with different heights per view
- Metrics row: Mean, Std Dev, N values

**Mockup Screens** (lines 195-216):
1. "Admin Dashboard" - Projects Overview, Active Projects, Recent Reports, Create New Project
2. "Student Report View" - Your Report, Statistical Analysis chart, Key Findings, Download DOCX

### What Needs Improvement

1. **Demo Enhancement:**
   - Current demo is generic statistical visualization
   - Should show actual report delivery experience
   - Add password-protected access flow demonstration
   - Show interactive HTML report preview

2. **Visual Treatment:**
   - Make more "premium" to match 2L page energy
   - Show actual report formats (DOCX + HTML)
   - Demonstrate the delivery workflow

3. **Content Accuracy:**
   - Current content is accurate but could be more specific
   - Features listed are correct: Admin Panel, Secure Access, Interactive Reports, Hebrew RTL

4. **Next Project Link:**
   - Line 237: Links to `/projects/mirror-of-dreams` - this is fine

### Priority
**P1** - Content is correct but needs premium upgrade

---

## Wealth Page (TO BE DELETED)

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`

### Lines of Code
620 lines

### Content Summary

**Hero:**
- Title: "Personal Finance, Simplified"
- Tagline: "Clarity from financial chaos."
- Live URL: `https://selahwealth.xyz`

**WealthDemo Component (lines 33-138):**
- Balance counter animation (24,750 ILS)
- Category breakdown bars: Housing 35%, Food 22%, Transport 15%, Savings 28%
- Recent transactions list

**Features:**
- Bank Sync (Israeli banks)
- AI Categorization
- Budget Alerts
- AI Advisor

**Tech Stack:**
- Next.js 15, TypeScript, Prisma + PostgreSQL, Claude API, tRPC, Supabase Auth

### References to This Page (Must Be Updated)

| File | Line | Reference |
|------|------|-----------|
| `app/projects/mirror-of-dreams/page.tsx` | 248 | `href: "/projects/wealth"` in nextProject |
| `app/data/portfolio.ts` | 30 | `detailUrl: "/projects/wealth"` |

### Deletion Notes

1. **Delete file:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`
2. **Remove from portfolio.ts:** Delete entire Wealth object (lines 22-32)
3. **Update Mirror of Dreams:** Change nextProject to SelahReach or StatViz
4. **Verify:** No broken links after deletion

---

## AI Research Pipeline Page

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx`

### Lines of Code
640 lines

### Current State

**Hero:**
- Title: "AI-Powered Academic Research"
- Tagline: "From raw sources to publication-ready insights. Automatically."
- CTA: "Contact for Access" (no live URL - private)

**Sample Narratives Section (lines 80-200):**
- 5 sample narratives demonstrating culturally-nuanced output:
  1. Orthodox Jewish Basketball Player
  2. Muslim Arab Sailor
  3. Druze Basketball Player
  4. Christian Arab Taekwondo Athlete
  5. Christian Arab Handball Player
- Tab navigation with streaming reveal animation
- Demographic profile + Full narrative display

**Capabilities Listed:**
- Factorial Design Variables
- Output Formats
- Integration Options
- Quality Controls

**Use Cases:**
- Academic research studies
- Market research
- UX research persona generation
- Content generation
- Training data for ML models

### What Needs Enhancement

1. **Research-Viz Integration:**
   - Vision mentions integrating research-viz visualization
   - Currently no visual research output demonstration
   - Could add visualization preview of generated data

2. **Pipeline Flow Demonstration:**
   - Show the actual pipeline: Input -> Processing -> Output
   - Visual representation of the generation workflow

3. **Premium Feel:**
   - Current design is good but could be elevated
   - Match the command-center energy of 2L page

4. **Real Examples:**
   - Current sample narratives are excellent and demonstrate cultural nuance
   - Could add more output format examples (structured data view)

### Priority
**P2** - Current state is good, polish is enhancement

---

## Capabilities Page

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx`

### Lines of Code
242 lines

### WRONG Content Found

| Line | Wrong Content | Why It's Wrong |
|------|---------------|----------------|
| 73-77 | `{ icon: Sparkles, title: "UX-Light Tools", description: "Minimal UI, powerful logic" }` | **UNDERSELLS capability** - Ahiya is competent at full UI/UX, not just "UX-light" |

### Full Capabilities Array (lines 46-77)

```typescript
const capabilities = [
  { icon: Server, title: "Full-Stack SaaS", description: "User management, dashboards, auth" },
  { icon: Brain, title: "AI Pipelines", description: "RAG systems, multi-agent reasoning" },
  { icon: BarChart3, title: "Research Tools", description: "Statistical systems, data analysis" },
  { icon: Workflow, title: "Automation", description: "Workflow tools, internal dashboards" },
  { icon: Code2, title: "APIs & Backend", description: "Fast, scalable, containerized" },
  { icon: Sparkles, title: "UX-Light Tools", description: "Minimal UI, powerful logic" }, // WRONG
];
```

### What Needs to Change

1. **Replace "UX-Light Tools":**
   - Change title to something like "Full-Stack UI/UX" or "Complete Web Applications"
   - Change description to showcase full UI competence
   - E.g., `{ title: "Premium Web UIs", description: "Beautiful, responsive, production-ready interfaces" }`

2. **PDF Download Link:**
   - Line 104-110: Links to `/ahiya-capabilities.pdf`
   - PDF also needs updating (see PDF section below)

---

## PDF Analysis

### PDF File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/public/ahiya-capabilities.pdf`

### Wrong/Underselling Content

**From PDF text:**

| Section | Content | Issue |
|---------|---------|-------|
| CAPABILITIES | "UX-Light Tools, Heavy Logic" | Same underselling as website |
| CAPABILITIES | "Minimal interfaces backed by powerful systems" | Implies UI is not a strength |
| SELECTED WORK | Lists "Wealth" | Should be removed/replaced with SelahReach |
| Mirror of Dreams description | "Semantic journaling with insights, prompt flows, vector search, and daily reflection cycles" | Should mention life dreams/aspirations AI companion |

### PDF Generation Script
Found at: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`
- Line 180: `title: 'UX-Light Tools, Heavy Logic'`

### How PDF is Served
- Static file in `/public/ahiya-capabilities.pdf`
- Downloaded via direct link from capabilities page
- Multiple download buttons on capabilities page (lines 103-110, 143-148, 186-193)

### Changes Needed

1. **Update PDF content:**
   - Remove "UX-Light Tools, Heavy Logic" section
   - Replace with "Full-Stack Web Applications" or similar
   - Update Selected Work to remove Wealth, add SelahReach
   - Update Mirror of Dreams description

2. **Regenerate PDF:**
   - Run generation script after updating content
   - Ensure new PDF replaces old one in `/public/`

---

## Homepage Portfolio Section

### Current File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx`

### Lines of Code
246 lines

### How Projects Are Listed
- Line 9: Imports `portfolioProjects` from `@/app/data/portfolio`
- Lines 144-148: Maps over `portfolioProjects` array to render `PortfolioCard` components

### Portfolio Data File
`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`

### Current Projects Listed (from portfolio.ts)

| Order | Project | URL | Status |
|-------|---------|-----|--------|
| 1 | Mirror of Dreams | `/projects/mirror-of-dreams` | Keep (fix content) |
| 2 | Wealth | `/projects/wealth` | **REMOVE** |
| 3 | StatViz | `/projects/statviz` | Keep (enhance) |
| 4 | AI Research Pipeline | `/projects/ai-research-pipeline` | Keep (polish) |

### Changes Needed

1. **Remove Wealth from portfolio.ts:**
   - Delete lines 22-32 (entire Wealth object)

2. **Add SelahReach to portfolio.ts:**
   ```typescript
   {
     id: "selahreach",
     title: "SelahReach",
     subtitle: "AI-Powered Outreach Automation",
     description: "Intelligent outreach system with Claude Code integration for personalized client communication and tracking.",
     status: "live",
     detailUrl: "/projects/selahreach",
     techStack: ["Claude Code", "TypeScript", "Automation"],
   }
   ```

3. **Create SelahReach project page:**
   - New file: `/app/projects/selahreach/page.tsx`
   - Content about Claude Code + outreach automation

4. **Update project order:**
   - Consider reordering to highlight strongest projects first

---

## Summary: Issues by Priority

### P0 (Must Fix - Critical Issues)

1. **Mirror of Dreams Demo - COMPLETELY WRONG CONTENT**
   - File: `/app/projects/mirror-of-dreams/page.tsx`
   - Lines 21-22: Sleep dream content instead of life aspirations
   - Line 359: Wrong hero title "Dream Journal with AI Insight"
   - This is the #1 priority fix

2. **Capabilities Page "UX-Light" Claim**
   - File: `/app/capabilities/page.tsx`
   - Line 74: "UX-Light Tools" undersells capability
   - Must change to reflect full UI competence

3. **PDF "UX-Light" Claim**
   - File: `/public/ahiya-capabilities.pdf`
   - Contains same underselling language
   - Must regenerate with updated content

### P1 (Should Fix - Important)

1. **Delete Wealth Page**
   - Delete: `/app/projects/wealth/page.tsx`
   - Remove from: `/app/data/portfolio.ts` (lines 22-32)
   - Update: Mirror of Dreams nextProject link

2. **Create SelahReach Page**
   - New: `/app/projects/selahreach/page.tsx`
   - Add to: `/app/data/portfolio.ts`
   - Content: Claude Code + outreach automation showcase

3. **Update PDF Selected Work**
   - Remove Wealth
   - Add SelahReach
   - Fix Mirror of Dreams description

### P2 (Nice to Fix - Enhancements)

1. **StatViz Premium Upgrade**
   - File: `/app/projects/statviz/page.tsx`
   - Make demo more interactive
   - Show report delivery flow

2. **AI Research Pipeline Polish**
   - File: `/app/projects/ai-research-pipeline/page.tsx`
   - Add research-viz integration
   - Show pipeline flow visualization

3. **All Pages Premium Feel**
   - Match 2L command center energy
   - More animations, interactivity
   - Consistent premium aesthetic

---

## File Change Summary

| File | Action | Priority |
|------|--------|----------|
| `/app/projects/mirror-of-dreams/page.tsx` | Heavy modification | P0 |
| `/app/capabilities/page.tsx` | Modify line 73-77 | P0 |
| `/public/ahiya-capabilities.pdf` | Regenerate | P0 |
| `/scripts/generate-capabilities-pdf.tsx` | Modify line 180 | P0 |
| `/app/projects/wealth/page.tsx` | DELETE | P1 |
| `/app/data/portfolio.ts` | Remove Wealth, Add SelahReach | P1 |
| `/app/projects/selahreach/page.tsx` | CREATE NEW | P1 |
| `/app/projects/statviz/page.tsx` | Enhance | P2 |
| `/app/projects/ai-research-pipeline/page.tsx` | Polish | P2 |

---

*Exploration completed: 2025-12-04*
*This report informs builder task breakdown for Plan-10*
