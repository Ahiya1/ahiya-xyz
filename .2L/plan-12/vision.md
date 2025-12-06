# Plan-12 Vision: Production Polish & Undeniable 2L Page

**Created:** 2025-12-06
**Status:** VISIONED
**Complexity:** MEDIUM (3 fixes + 2L page restructure)

---

## Problem Statement

The portfolio site is nearly production-ready but needs final polish:

1. **Awkward wording** - "Precision-engineered" sounds like marketing jargon
2. **Broken navigation loop** - Project pages don't form a complete circle
3. **2L page issues:**
   - Meta-circular (examples about building itself)
   - Repetitive (11 sections with overlapping content)
   - Too developer-focused (not B2B compelling)

---

## Fixes Required

### Fix 1: Simplify "Precision-Engineered" Wording

**Current (homepage):**
> "Precision-engineered systems delivered in weeks, not months."

**New:**
> "Precise systems delivered in weeks, not months."

**File:** `app/page.tsx` line 66

---

### Fix 2: Project Navigation Full Circle

**Correct circle:**
1. Mirror of Dreams → SelahReach
2. SelahReach → StatViz
3. StatViz → AI Research Pipeline
4. AI Research Pipeline → Mirror of Dreams

**Files to update:**
- `app/projects/mirror-of-dreams/page.tsx` - nextProject → SelahReach
- `app/projects/selahreach/page.tsx` - nextProject → StatViz
- `app/projects/statviz/page.tsx` - nextProject → AI Research Pipeline
- `app/projects/ai-research-pipeline/page.tsx` - nextProject → Mirror of Dreams

---

### Fix 3: Restructure 2L Page - Make It Undeniable for B2B

**Current structure (11 sections, repetitive):**
1. Hero
2. Terminal Animation (demo #1 - meta)
3. Live Dashboard (demo #2 - meta)
4. Pipeline (7 phases)
5. Agent Visualization (overlaps with #6)
6. Agent Types (6 agents - same as #4!)
7. Benefits (4 cards)
8. Slash Commands (developer-focused)
9. Code Gen Demo (demo #3)
10. Technical Depth (accordion)
11. CTA

**Problems:**
- Pipeline + Agent Types + Agent Viz = same content 3x
- 3 separate demos when 1 powerful one suffices
- Meta-circular ("built this page")
- Developer-focused, not B2B outcome-focused

---

## NEW 2L PAGE STRUCTURE (7 sections)

### Section 1: Hero (KEEP but refocus)
**Current:** "AI-Orchestrated Development at Enterprise Scale"
**New:** "Ship Complete Systems in Days, Not Months"

Subhead focuses on OUTCOME:
"2L coordinates AI agents to build, validate, and deploy your project faster than traditional development."

### Section 2: One Powerful Demo (MERGE 3 demos into 1)
**Headline:** "Watch a Complete Build"

Combine Terminal + Dashboard into ONE unified experience showing:
- Project: "customer-portal" (hypothetical B2B project)
- Phases flowing: Vision → Exploring → Planning → Building → Validating
- Agents: 3 builders working in parallel
- Outcome: "Deployed. 47 tests passing."

This REPLACES: Terminal Animation, Live Dashboard, Code Gen Demo

### Section 3: The Promise (NEW - replaces Benefits)
**Headline:** "What You Get"

3 concrete value props in a tight row:

| Speed | Quality | Visibility |
|-------|---------|------------|
| Days, not months | Self-healing validation | Real-time progress |
| Parallel execution | Automated testing | Full audit trail |

### Section 4: How It Works (MERGE Pipeline + Agents)
**Headline:** "Four Steps to Shipped"

Simple 4-step flow (NOT 7 phases):
1. **Vision** - You describe what you need
2. **Plan** - AI architects the solution
3. **Build** - Parallel agents execute
4. **Ship** - Validated, tested, deployed

This REPLACES: Pipeline (7 phases), Agent Types (6 agents), Agent Visualization

### Section 5: What Makes 2L Different (NEW)
**Headline:** "Not Just Code Generation"

3 differentiators:
1. **Self-Healing** - Validation fails? System fixes itself.
2. **Parallel Execution** - Multiple features built simultaneously
3. **Audit Trail** - Every decision logged and traceable

### Section 6: Under the Hood (KEEP accordion)
For technical buyers who want depth. Unchanged.

### Section 7: CTA (KEEP)
"Ready to Build Something?" with contact button.

---

## Demo Content (Hypothetical B2B Project)

**Project:** "customer-portal" (generic enough for any B2B client to relate)

**Terminal flow:**
```
$ /2l-mvp customer-portal

[Vision] Customer portal with auth, dashboard, API
[Exploring] Analyzing requirements...
[Planning] 3 parallel builders assigned
  → Builder-1: Authentication system
  → Builder-2: Dashboard components
  → Builder-3: REST API endpoints
[Building] Executing in parallel...
[Validating] Running 47 tests...
[Complete] All tests passing. Ready to deploy.
```

**Dashboard events:**
```
customer-portal | Phase: Building
├─ Builder-1: Auth system ✓ (12 tests)
├─ Builder-2: Dashboard ✓ (18 tests)
├─ Builder-3: API endpoints ✓ (17 tests)
└─ Validation: PASS (47 tests)

Timeline: Vision → Plan → Build → Ship
Duration: 3 days
```

**Key principle:** Client thinks "This is exactly what I need for MY project"

---

## Files to Modify

| File | Change |
|------|--------|
| `app/page.tsx` | "Precision-engineered" → "Precise" |
| `app/projects/mirror-of-dreams/page.tsx` | nextProject → SelahReach |
| `app/projects/selahreach/page.tsx` | nextProject → StatViz |
| `app/projects/statviz/page.tsx` | nextProject → AI Research |
| `app/projects/ai-research-pipeline/page.tsx` | nextProject → Mirror of Dreams |
| `app/2l/page.tsx` | **Major restructure:** 11 sections → 7 sections |
| `app/components/2l/TerminalAnimation.tsx` | Show "customer-portal" build |
| `app/components/2l/LiveDashboard.tsx` | Merge into unified demo OR remove |
| `app/components/2l/CodeGenDemo.tsx` | Remove (merged into main demo) |
| `app/components/2l/AgentVisualization.tsx` | Remove (merged into "How It Works") |
| `app/components/2l/SlashCommands.tsx` | Remove (too developer-focused) |

---

## What Gets Removed/Merged

| Current Section | Action |
|-----------------|--------|
| Terminal Animation | MERGE into unified demo |
| Live Dashboard | MERGE into unified demo |
| Pipeline (7 phases) | REPLACE with 4-step "How It Works" |
| Agent Visualization | REMOVE (redundant) |
| Agent Types (6 cards) | REMOVE (redundant with pipeline) |
| Benefits (4 cards) | REPLACE with tighter "The Promise" |
| Slash Commands | REMOVE (too developer-focused) |
| Code Gen Demo | REMOVE (merged into main demo) |
| Technical Depth | KEEP |
| CTA | KEEP |

---

## Success Criteria

1. Homepage says "Precise" not "Precision-engineered"
2. All 4 project pages link in a complete circle
3. 2L page has 7 sections (down from 11)
4. 2L page shows "customer-portal" build (not ahiya-xyz)
5. No repetition - each concept appears once
6. B2B client can answer: "What does this do for ME?"
7. Build passes, lint passes

---

## The Undeniable Test

A B2B client landing on the 2L page should immediately understand:

1. **What:** AI builds complete systems
2. **Speed:** Days, not months
3. **Quality:** Self-healing, validated, tested
4. **Proof:** Watch it build a customer portal
5. **Next step:** Contact to discuss their project

If any of these are unclear or buried, the page fails.

---

## Next Steps

- [ ] Run `/2l-mvp` to execute this plan
- [ ] Verify project navigation circle works
- [ ] Verify 2L page is tight, non-repetitive, B2B focused
- [ ] Test: Can a non-technical person understand the value in 30 seconds?
