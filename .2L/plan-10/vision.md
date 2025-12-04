# Project Vision: Premium Project Pages

**Created:** 2025-12-04T17:45:00Z
**Plan:** plan-10

---

## Problem Statement

The project pages are the weakest link in the portfolio. They have:

1. **Wrong content** - Mirror of Dreams demo shows "night dream analysis" when it's actually an AI companion for life dreams/aspirations
2. **Generic demos** - Fake mockups instead of real interactive experiences
3. **Outdated project lineup** - Wealth should be replaced with SelahReach
4. **Not premium** - Don't match the new command center energy of the 2L page

**Target transformation:**
> From: Generic project pages with wrong/fake content
> To: **Absolutely PREMIUM showcase pages that accurately demonstrate each project**

---

## Project Lineup (Updated)

| Project | URL | Type | Status |
|---------|-----|------|--------|
| **Mirror of Dreams** | selahmirror.xyz | External | Fix demo completely |
| **StatViz** | statviz.xyz | External | Make premium |
| **SelahReach** | /projects/selahreach | Internal route | NEW - Replace Wealth |
| **AI Research Pipeline** | - | Showcase | Polish + add research-viz |

---

## Feature Breakdown

### 1. Mirror of Dreams - COMPLETE OVERHAUL

**Current problem:** Demo shows "Last night I dreamed of flying over an endless ocean..." analyzing sleep dreams.

**Reality:** Mirror of Dreams is an AI companion for tracking **life dreams** (aspirations, goals) - NOT sleep dreams.

**New demo should show:**
- Creating a dream/aspiration (e.g., "Launch My Business", "Write a Novel")
- 4 reflection questions per dream
- AI companion providing insights on your journey
- Progress tracking over time
- The "soft, glossy, sharp" companion feel

**Visual treatment:**
- Cosmic glass aesthetic (earned, not decorative)
- Real reflection flow demonstration
- Show the dashboard with multiple dreams
- Emphasize the AI companion relationship

**Content to fix:**
- Hero description
- Demo interaction
- Challenge/solution sections
- Features list
- Tech stack accuracy

---

### 2. StatViz - PREMIUM UPGRADE

**Current:** Basic page with generic mockups

**What StatViz actually is:**
- Statistical reports platform for graduate students
- Delivers DOCX + interactive HTML reports
- Password-protected project access
- Admin panel with analytics

**New demo should show:**
- The report delivery experience
- Interactive HTML report preview
- Password-protected access flow
- Clean, professional data visualization

**Visual treatment:**
- Professional, academic aesthetic
- Show actual report formats
- Demonstrate the delivery flow
- Highlight security/privacy

---

### 3. SelahReach - NEW PROJECT PAGE

**Replace Wealth with this new showcase.**

**What SelahReach is:**
- Automatic outreach system
- Claude Code integration for intelligent outreach
- Custom client tracking system
- Automation of business development

**Demo should show:**
- The outreach workflow
- Claude Code integration in action
- Client tracking dashboard
- Automation capabilities

**Visual treatment:**
- Modern automation aesthetic
- Show the AI-powered workflow
- Demonstrate efficiency gains
- Terminal/code aesthetic (like 2L page)

**Route:** `/projects/selahreach` (internal, no external URL)

---

### 4. AI Research Pipeline - POLISH

**Current:** Basic page

**Enhancements:**
- Integrate research-viz as visual proof
- Show actual research outputs
- Demonstrate the pipeline flow
- Add real examples

**Visual treatment:**
- Data/research aesthetic
- Show visualization outputs
- Demonstrate cultural nuance capabilities

---

## Technical Requirements

### Files to DELETE:
- `/app/projects/wealth/page.tsx` - Remove Wealth project

### Files to CREATE:
- `/app/projects/selahreach/page.tsx` - New SelahReach project page

### Files to HEAVILY MODIFY:
- `/app/projects/mirror-of-dreams/page.tsx` - Complete demo overhaul
- `/app/projects/statviz/page.tsx` - Premium upgrade
- `/app/projects/ai-research-pipeline/page.tsx` - Polish + research-viz

### Homepage update:
- `/app/page.tsx` - Update portfolio section to replace Wealth with SelahReach

### Navigation consideration:
- Update any links that point to /projects/wealth

---

## Demo Requirements

### Mirror of Dreams Demo
```
Instead of:
"Last night I dreamed of flying over an endless ocean..."

Show:
- Dream title: "Launch My Sustainable Fashion Brand"
- Category: Career/Business
- Days remaining: 180

Reflection questions appearing:
- "What draws you to this dream?"
- "What's one step you could take today?"
- "What fears are you holding?"
- "What would success feel like?"

AI Companion response:
"Your dream of sustainable fashion reveals a deep alignment between
your values and your ambitions. The clarity in your vision suggests
you're ready to take tangible steps..."
```

### StatViz Demo
```
Show:
- Project selection with password field
- Report preview (interactive HTML glimpse)
- Download options (DOCX, HTML)
- Professional, clean interface
```

### SelahReach Demo
```
Show:
- Outreach target identification
- Claude Code generating personalized message
- Client tracking dashboard
- Automation status/metrics
```

### AI Research Pipeline Demo
```
Show:
- Research input/query
- Processing pipeline visualization
- Output with cultural nuance
- Integration with research-viz
```

---

## Visual Standards (Premium)

All project pages should match the new portfolio energy:

1. **Alive, not static** - Interactive demos, animations
2. **Real, not fake** - Actual functionality, not mockups
3. **Premium feel** - Like the 2L command center page
4. **Consistent branding** - Dark theme, purple accents, cosmic elements where appropriate
5. **Technical depth** - Show the "how" not just the "what"

---

## Success Criteria

1. **Mirror of Dreams** - Demo accurately shows life dreams AI companion (NOT sleep dreams)
2. **StatViz** - Shows actual report delivery experience
3. **SelahReach** - New page showcases Claude Code + outreach automation
4. **AI Research Pipeline** - Includes research-viz integration
5. **Wealth removed** - No more /projects/wealth route
6. **Homepage updated** - Portfolio section shows new lineup
7. **All pages premium** - Match the energy of the 2L page
8. **Capabilities fixed** - No "UX-light" claim, showcases full UI/UX competence
9. **PDF updated** - Remove underselling, reflect true capabilities
10. **No TypeScript errors**
11. **Build succeeds**

---

## Complexity Assessment

**COMPLEX** - Multiple pages, significant content changes, new route, demo overhauls

**Recommended approach:**
- Single iteration with 4-5 parallel builders
- Builder 1: Mirror of Dreams overhaul
- Builder 2: StatViz premium upgrade
- Builder 3: SelahReach new page
- Builder 4: AI Research Pipeline + research-viz
- Builder 5: Homepage update + Wealth removal + integration

---

## Exploration Requirements

**Master explorers MUST study:**
- `/home/ahiya/Ahiya/2L/Prod/mirror-of-dreams/` - Understand actual Mirror of Dreams
- `/home/ahiya/Ahiya/2L/Prod/StatViz/` - Understand actual StatViz
- `/home/ahiya/Ahiya/2L/Prod/sealhreach/` - Understand SelahReach for new page
- `/home/ahiya/Ahiya/2L/Prod/ai-research-pipeline/` - Understand pipeline
- `/home/ahiya/Ahiya/2L/Prod/research-viz/` - Understand visualization

---

## Capabilities Page & PDF Fix

**Current problem:** The capabilities page and PDF mention "UX-light tools" - implying limited UI capability.

**Reality:** Ahiya is highly competent at creating full UIs, not just "UX-light" tools.

**Fix:**
- Update `/app/capabilities/page.tsx` - Change messaging to reflect full UI competence
- Update the PDF download - Remove "UX-light" claim, showcase full UI/UX capability
- Review all marketing copy for similar underselling

---

## Out of Scope

- Changes to the actual project codebases (mirror-of-dreams, StatViz, etc.)
- Backend functionality
- Authentication systems
- New routes beyond /projects/selahreach

---

## Summary: Before → After

| Project | Before | After |
|---------|--------|-------|
| **Mirror of Dreams** | Wrong demo (sleep dreams) | Correct demo (life dreams AI companion) |
| **StatViz** | Generic mockup | Premium report delivery showcase |
| **Wealth** | Exists | **REMOVED** |
| **SelahReach** | Doesn't exist | **NEW** - Claude Code + outreach |
| **AI Research Pipeline** | Basic | Polished + research-viz |
| **Overall feel** | Weakest link | Premium showcase |

---

**Vision Status:** VISIONED
**Ready for:** Master Exploration
**Complexity:** COMPLEX (4 project pages, 1 new, 1 removed, all premium)
