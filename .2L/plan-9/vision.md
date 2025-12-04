# Project Vision: 2L Page - Command Center Experience

**Created:** 2025-12-04T16:00:00Z
**Plan:** plan-9

---

## Problem Statement

The 2L page currently *describes* the system but doesn't *demonstrate* it. For a framework that literally orchestrates AI agents to build software, the page should feel like watching a command center in action.

**Current issues:**

1. **Logo button is broken** - Uses `href="#"` instead of `href="/"` - doesn't navigate home
2. **"Works without internet" is FALSE** - 2L runs through Claude API via slash commands. Remove this claim.
3. **Static content** - The page tells but doesn't show
4. **Not alive** - Needs movement, energy, the feeling of agents actively working

**Target transformation:**
> From: Informational page describing 2L
> To: **Command center experience where visitors FEEL AI agents building software**

---

## The Meta-Reference is PRICELESS

**THIS SITE ITSELF WAS BUILT WITH 2L.**

- 8 plans completed
- 10 iterations shipped
- 40+ agents spawned
- Real validation passes
- Real healing loops
- Everything logged in `.2L/`

This isn't a demo - it's PROOF. The page should celebrate this recursive reality with live data from the actual build.

---

## Critical Exploration Requirement

**Master explorers MUST deeply study the actual 2L system at:**
- `~/.claude/commands/2l-*.md` - All slash commands
- `~/.claude/agents/2l-*.md` - All agent definitions
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/.2L/` - This site's actual build history

**Understand:**
- The real slash commands (`/2l-vision`, `/2l-mvp`, `/2l-build`, etc.)
- How agents actually work (explorers, planners, builders, validators, healers)
- The event system and dashboard
- Real iteration structure and artifacts

**The page must be technically accurate AND visually spectacular.**

---

## Feature Breakdown

### CRITICAL: Fix Logo Navigation (P0)

**Problem:** Logo in Navigation.tsx uses `href="#"` - doesn't navigate home.

**Fix:** Change to `href="/"` or use Next.js `<Link href="/">`.

**Location:** `/app/components/Navigation.tsx` line 60

---

### CRITICAL: Remove False Claims (P0)

**Problem:** "Graceful Degradation: 2L works without internet" is FALSE.

2L runs entirely through Claude API via slash commands in Claude Code. It absolutely requires internet.

**Fix:** Remove this accordion item or rewrite to something accurate like "Graceful Degradation: Agents checkpoint progress so interrupted sessions resume seamlessly."

---

### 1. Terminal Animation Section

**The Hero Feature** - A live terminal showing 2L in action.

**Visual:**
- Dark terminal window with realistic styling
- Commands typing out character by character
- Output streaming in real-time
- Agent spawning notifications
- Phase transitions with color coding
- Validation results appearing

**Content to show:**
```
$ /2l-mvp

📋 Using existing vision from plan-8
🔍 Analyzing vision complexity...
   Vision complexity: COMPLEX
   Spawning 4 master explorers...

   ✓ Master Explorer 1: Architecture Analysis
   ✓ Master Explorer 2: Dependencies & Risk
   ✓ Master Explorer 3: UX & Integration
   ✓ Master Explorer 4: Performance

📊 Creating master plan...
   Strategy: Single iteration with 6 parallel builders

🚀 Starting Iteration 10...
   Phase 1: Exploration ████████████ COMPLETE
   Phase 2: Planning    ████████████ COMPLETE
   Phase 3: Building    ████████░░░░ 67%
     → Builder-1: Navigation Fix ✓
     → Builder-2: PDF System ✓
     → Builder-3: 2L Animations ▶ in progress
     → Builder-4: StatViz Demo ▶ in progress
```

**Animation details:**
- Realistic typing speed (50-80ms per character)
- Pause between commands
- Progress bars animating
- Status updates appearing
- Loop or cycle through different 2L operations

---

### 2. Animated Agent Activity Visualization

**Show agents "working"** - Not just icons, but visual representations of AI agents in action.

**Concept options (pick best during exploration):**

**Option A: Floating Agent Orbs**
- Glowing orbs representing different agent types
- Moving along pipeline paths
- Pulsing when "active"
- Trails showing their journey
- Labels appearing on hover

**Option B: Mini Code Windows**
- Small windows showing code being "written"
- Files being created
- Diffs appearing
- Validation checks running

**Option C: Abstract Network Graph**
- Nodes representing agents
- Connections showing communication
- Activity pulses traveling between nodes
- Dynamic layout responding to "workload"

**Key requirement:** Must feel ALIVE, not static.

---

### 3. Live Dashboard Preview

**THIS SITE'S ACTUAL BUILD DATA** - Not fake numbers, REAL metrics.

**Show a mini dashboard with:**
- Plans completed: 8 (count up animation)
- Total iterations: 10 (count up)
- Agents spawned: 40+ (count up)
- Validation passes: 10/10
- Lines of code: (calculate from git)
- Files modified: (calculate from git)

**Interactive elements:**
- Hover to see plan names
- Click to expand timeline
- Animated chart showing iteration progression

**Pull real data from:**
- `.2L/config.yaml` - Plan metadata
- `.2L/events.jsonl` - Event history
- Git history - Commits and tags

---

### 4. The Recursive Showcase

**Emphasize the meta-reference prominently:**

> "You're looking at 2L's work right now."

**Visual treatment:**
- Glowing border or special card
- Animation that draws attention
- Timeline showing this site's evolution
- "Built with 2L" badge that links to the 2L page itself (recursive!)

**Content:**
- Show the actual iteration history of this portfolio site
- Plan-1 through Plan-8 with brief descriptions
- "This very page is being built by Plan-9"

---

### 5. Code Generation Demo

**Show a builder agent "writing" code in real-time.**

**Visual:**
- Syntax-highlighted TypeScript/React code
- Characters appearing with cursor
- Line numbers incrementing
- File path showing at top
- Occasional "thinking" pauses

**Content:** Show actual code from this site being "written" - perhaps a component that's currently on the page.

---

### 6. Pipeline as Interactive Journey

**Transform the current static pipeline into an experience.**

**Current:** Icons cycling with pulse animation
**New:**

- Larger, more dramatic pipeline visualization
- Projects/features visually moving through stages
- Agents appearing at each phase
- Reports materializing
- Validation gates with pass/fail animations
- Self-healing loop visualized when issues occur

---

### 7. Slash Commands Showcase

**Show the actual interface** - How developers interact with 2L.

**Display:**
```
/2l-vision   → Create detailed requirements
/2l-plan     → Design iteration strategy
/2l-mvp      → Full autonomous execution
/2l-build    → Single iteration build
/2l-validate → Run all quality gates
/2l-heal     → Fix validation failures
```

**Visual treatment:**
- Command palette style
- Descriptions appearing on hover
- Links to what each does
- Feels like actual developer tooling

---

## Technical Requirements

**Files to fix:**
- `/app/components/Navigation.tsx` - Logo href fix

**Files to heavily modify:**
- `/app/2l/page.tsx` - Complete transformation

**Files to potentially create:**
- `/app/components/TerminalAnimation.tsx` - Terminal demo component
- `/app/components/AgentVisualization.tsx` - Animated agents
- `/app/components/LiveDashboard.tsx` - Real metrics display
- `/app/components/CodeGenDemo.tsx` - Typing code effect

**Animation approach:**
- CSS animations for performance
- React state for interactive elements
- Intersection Observer for scroll-triggered effects
- requestAnimationFrame for smooth typing effects

**Data sources:**
- Read from `.2L/config.yaml` at build time for real metrics
- Hardcode event data or read from `.2L/events.jsonl`
- Git stats via build script if needed

---

## Success Criteria

1. **Logo works** - Clicking "Ahiya" navigates to homepage
2. **No false claims** - "Works without internet" removed
3. **Terminal demo** - Animated terminal showing 2L commands running
4. **Agent visualization** - Visible, animated representation of agents working
5. **Live metrics** - Real numbers from this site's 2L build
6. **Recursive showcase** - The meta-reference is prominently featured
7. **Overall impression** - "I'm watching AI agents build software. I want this."

---

## Complexity Assessment

This is a **DEEP BUILD** - HIGH complexity:

**Scope:**
- Navigation fix (quick)
- Content correction (quick)
- Multiple new animated components
- Real data integration
- Significant visual overhaul

**Recommended approach:**
- Single iteration with 4-5 parallel builders
- One builder for navigation + content fixes
- One builder for terminal animation
- One builder for agent visualization + dashboard
- One builder for code gen demo + pipeline
- One builder for overall polish + integration

---

## Out of Scope

- Changes to other pages
- New routes
- Backend/API work
- Database changes

---

## Summary: Before → After

| Element | Before | After |
|---------|--------|-------|
| Logo | Broken (`href="#"`) | Working (`href="/"`) |
| Internet claim | False ("works offline") | Removed or corrected |
| Pipeline | Static icons cycling | Interactive journey with agents |
| Agents | Text descriptions | Animated visual representations |
| Metrics | Static numbers | Real data with count-up animations |
| Terminal | None | Live demo of 2L commands running |
| Recursive reference | Mentioned | Celebrated as the hero feature |
| Overall feel | Informational page | **Command center experience** |

---

**Vision Status:** VISIONED
**Ready for:** Master Exploration (MUST study actual 2L system at `~/.claude/` and this project's `.2L/`)
**Complexity:** HIGH (recommend multi-builder approach)
