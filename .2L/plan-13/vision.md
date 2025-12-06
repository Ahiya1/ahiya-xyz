# Plan-13 Vision: 2L Page - Rigor Restored with Visual Wow

**Created:** 2025-12-06
**Status:** VISIONED
**Complexity:** MEDIUM

---

## Problem Statement

Plan-12 over-simplified the 2L page to please B2B clients, sacrificing the technical rigor that makes 2L genuinely impressive. We need to restore:

1. **Full pipeline visibility** - All 7 phases, not just 4
2. **All agent types** - The orchestration IS the differentiator
3. **"Built by 2L" proof** - Subtle wink, not hidden
4. **Impressive demo** - Show a REAL product being built (InvoiceFlow)
5. **Beautiful technical depth** - Under the Hood should wow, not bore

---

## Core Principle

**Rigor IS the selling point.** Technical buyers see through oversimplification. B2B clients are impressed by sophistication when presented beautifully.

---

## Changes Required

### 1. Restore "Built by 2L" Proof (Subtle Wink)

**Location:** Below the main demo, small but visible

**Design:**
```
┌─────────────────────────────────────────────────────┐
│  ✨ This entire site was built using 2L             │
│  12 plans • 13 iterations • 200+ agents spawned    │
│  [View Build History →]                             │
└─────────────────────────────────────────────────────┘
```

- Subtle glass card, not screaming
- Real metrics from config.yaml
- Optional link to build history/dashboard

---

### 2. Restore Full 7-Phase Pipeline

**Replace 4-step "How It Works" with full pipeline:**

```
Vision → Exploration → Planning → Building → Integration → Validation → Healing
  ↓          ↓            ↓          ↓           ↓            ↓           ↓
Describe   Analyze     Architect   Execute    Merge       Verify      Self-fix
```

**Visual Treatment:**
- Horizontal flow on desktop, vertical on mobile
- Each phase is a glowing node
- Animated connection lines showing data flow
- Active phase pulses
- Self-healing loop arrows back from Validation to Healing to Validation

**Keep it digestible:**
- Main view shows 7 phases with icons and one-line descriptions
- Click/hover reveals more detail

---

### 3. InvoiceFlow Demo - Full Build Showcase

**The Demo Section: "Watch 2L Build a Complete Product"**

Show the FULL flow:

#### Part 1: Vision Phase
```
$ /2l-vision

[Vision] InvoiceFlow - Modern invoicing for freelancers
  • Hero section with value prop
  • Features grid (3 key benefits)
  • Pricing table (3 tiers)
  • Testimonials section
  • Call-to-action footer

Vision created: .2L/plan-1/vision.md
```

#### Part 2: Planning Phase (Optional but impressive)
```
$ /2l-plan

[Exploration] 3 master explorers analyzing...
  → Explorer-1: Component architecture
  → Explorer-2: Design system requirements
  → Explorer-3: Content structure

[Planning] Creating master plan...
  → 5 parallel builders identified
  → Single iteration sufficient
  → Estimated: 47 components

Master plan created: .2L/plan-1/master-plan.yaml
```

#### Part 3: MVP Execution
```
$ /2l-mvp

[Building] 5 builders executing in parallel...
  → Builder-1: Hero section ████████░░ 80%
  → Builder-2: Features grid ██████████ 100% ✓
  → Builder-3: Pricing table ███████░░░ 70%
  → Builder-4: Testimonials ██████████ 100% ✓
  → Builder-5: Footer + CTA ████████░░ 85%

[Integration] Merging outputs...
[Validation] Running checks...
  TypeScript ✓ | ESLint ✓ | Build ✓

[Complete] InvoiceFlow ready to deploy
  5 sections • 47 components • 0 errors
```

#### Part 4: THE OUTPUT
**Actually show the rendered InvoiceFlow landing page!**

Either:
- Embedded iframe with the actual HTML
- Screenshot/mockup that looks real
- Animated reveal of the final product

**This is the wow moment** - They SEE what 2L produced.

---

### 4. Beautiful "Under the Hood" Section

**NOT a boring accordion. A visual experience.**

#### Design Concept: "Agent Command Center"

**Layout:** Grid of agent cards, each with:
- Glowing icon (unique per agent type)
- Agent name
- One-line role
- Expandable detail panel

**Visual Treatment:**
- Dark background with subtle grid pattern
- Each agent card has colored glow matching its role:
  - Explorers: Cyan glow (discovery)
  - Planners: Purple glow (strategy)
  - Builders: Green glow (creation)
  - Integrators: Blue glow (merging)
  - Validators: Yellow glow (verification)
  - Healers: Orange glow (repair)
- Hover reveals connection lines to related agents
- Subtle floating particles in background

#### Agent Cards Content:

**1. Master Explorers**
- Icon: 🔭 (telescope) or Search with rays
- Glow: Cyan
- Role: "Strategic analysis before any code is written"
- Detail:
  ```
  Spawned: 2-4 based on complexity
  Focus Areas:
    • Architecture & complexity analysis
    • Dependencies & risk assessment
    • UX & integration points
    • Scalability considerations

  Output: Exploration reports that shape the master plan

  Why: "Measure twice, cut once"
  ```

**2. Explorers (Iteration)**
- Icon: 🔍 or Search
- Glow: Cyan (lighter)
- Role: "Deep codebase analysis per iteration"
- Detail:
  ```
  Per Iteration: 2-3 explorers
  They Map:
    • Existing patterns and conventions
    • File structures and dependencies
    • Integration points and boundaries

  Output: Exploration reports guiding the planner

  Why: Builders don't guess—they know
  ```

**3. Planners**
- Icon: 📐 or FileText
- Glow: Purple
- Role: "Architect the solution with precision"
- Detail:
  ```
  Creates 4 Artifacts:
    • overview.md - Vision and success criteria
    • tech-stack.md - Technology decisions
    • patterns.md - Code conventions
    • builder-tasks.md - Parallel work breakdown

  Key Capability: Assigns work to avoid conflicts

  Why: Coordination prevents merge hell
  ```

**4. Builders**
- Icon: 🔨 or Hammer
- Glow: Green
- Role: "Parallel feature development"
- Detail:
  ```
  Execution: 2-5 builders in parallel

  Smart Behaviors:
    • Follow patterns.md for consistency
    • Can SPLIT if task is too complex
    • Conflict-aware file assignments

  Output: Working code + build report

  Why: Parallel = speed without style drift
  ```

**5. Integrators**
- Icon: 🔗 or GitMerge
- Glow: Blue
- Role: "Systematic merge of parallel work"
- Detail:
  ```
  Strategy: Zone-based integration

  Process:
    1. IPlanner creates integration zones
    2. Integrators merge assigned zones
    3. IValidator checks cohesion
    4. Up to 3 rounds if conflicts detected

  Output: Cohesive codebase, not Frankenstein code

  Why: Parallel work needs systematic merging
  ```

**6. Validators**
- Icon: ✅ or Shield
- Glow: Yellow/Gold
- Role: "Honest quality assessment"
- Detail:
  ```
  5-Tier Assessment:
    • PASS - Ready to ship
    • UNCERTAIN - Needs review
    • PARTIAL - Some criteria met
    • INCOMPLETE - Missing pieces
    • FAIL - Requires healing

  Checks: TypeScript, ESLint, Build, Tests, Criteria

  Why: Ship confidence, not hope
  ```

**7. Healers**
- Icon: 💊 or RefreshCw
- Glow: Orange
- Role: "Self-correcting when things fail"
- Detail:
  ```
  Triggered: When validation fails

  Process:
    1. Healing Explorers analyze root causes
    2. Categorize issues by type
    3. Spawn healers per category (parallel)
    4. Re-validate after fixes
    5. Up to 2 rounds before escalation

  Why: Most failures are fixable without humans
  ```

#### Animation Ideas:
- Cards gently "breathe" (scale 1.0 → 1.02)
- Connection lines animate on hover showing workflow
- Particles drift between agent cards
- Expanded state has subtle glow pulse

---

### 5. Updated Page Structure (8 sections)

```
1. Hero
   "Ship Complete Systems in Days, Not Months"
   (Keep current, it's good)

2. InvoiceFlow Demo
   "Watch 2L Build a Complete Product"
   [Full /2l-vision → /2l-plan → /2l-mvp flow]
   [Rendered output reveal]

3. Built by 2L Proof (NEW - subtle)
   "This site was built using 2L"
   [Real metrics: 12 plans, 13 iterations, 200+ agents]

4. The Pipeline
   "Seven Phases, Zero Guesswork"
   [Full 7-phase visualization with animations]

5. The Promise
   "What You Get"
   [Keep: Speed / Quality / Visibility - 3 columns]

6. What Makes 2L Different
   "Not Just Code Generation"
   [Keep: Self-Healing / Parallel / Audit Trail]

7. Under the Hood (EXPANDED)
   "The Agent Architecture"
   [Beautiful agent cards with glows and details]

8. CTA
   "Ready to Build Something?"
   [Keep current]
```

---

## Technical Implementation

### New Components Needed

1. **InvoiceFlowDemo.tsx**
   - Three-part terminal animation (vision, plan, mvp)
   - Progress bars for builders
   - Final output reveal (iframe or image)

2. **PipelineVisualization.tsx**
   - 7-phase horizontal flow
   - Animated connections
   - Self-healing loop visualization

3. **AgentCards.tsx**
   - Grid of 7 agent types
   - Expandable details
   - Glowing icons and connection lines

4. **BuiltBy2LBadge.tsx**
   - Subtle glass card
   - Real metrics from config
   - Optional link to dashboard

### Files to Modify

| File | Change |
|------|--------|
| `app/2l/page.tsx` | Add new sections, reorder |
| `app/components/2l/TerminalAnimation.tsx` | InvoiceFlow 3-part demo |
| `app/globals.css` | Agent glow animations, grid patterns |

### Files to Create

| File | Purpose |
|------|---------|
| `app/components/2l/InvoiceFlowDemo.tsx` | Full demo with output reveal |
| `app/components/2l/PipelineVisualization.tsx` | 7-phase animated flow |
| `app/components/2l/AgentCards.tsx` | Beautiful agent grid |
| `app/components/2l/BuiltBy2LBadge.tsx` | Subtle proof badge |

---

## Success Criteria

1. **Full pipeline visible** - All 7 phases, not 4
2. **All agents explained** - With beautiful visual treatment
3. **InvoiceFlow demo works** - Shows complete build flow
4. **Output is visible** - They SEE what 2L built
5. **"Built by 2L" present** - Subtle but visible
6. **Under the Hood is beautiful** - Not dry accordion
7. **Build passes, lint passes**

---

## The Undeniable Test

A technical buyer landing on this page should:

1. **Understand the sophistication** - This is real orchestration, not prompts
2. **See the proof** - InvoiceFlow demo + "this site" badge
3. **Want to explore** - Agent cards invite deeper engagement
4. **Feel confidence** - 7 phases, validators, healers = production-ready
5. **Take action** - Contact to discuss their project

---

## Visual Inspiration

The Under the Hood section should feel like:
- A mission control dashboard
- Glowing nodes in a network visualization
- Premium SaaS settings panel
- Something you'd see in a sci-fi movie's "AI system" UI

NOT like:
- A boring FAQ accordion
- A wall of text
- A technical whitepaper
- Documentation

---

## Next Steps

- [ ] Run `/2l-mvp` to execute this plan
- [ ] Create InvoiceFlow demo content (actual HTML output)
- [ ] Design agent card visuals
- [ ] Test on mobile (cards should stack beautifully)
