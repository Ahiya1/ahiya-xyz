# Master Exploration Report - Agent Definitions Research

## Explorer ID
master-explorer-2

## Focus Area
Agent Definitions Research - Extracting ACCURATE content for the "Under the Hood" agent cards from actual 2L agent definitions.

## Vision Summary
Plan-13 requires restoring the full 7-phase pipeline visibility and creating a beautiful "Under the Hood" section with accurate agent cards. This research provides the source-of-truth content from actual agent definitions.

---

## Research Methodology

Analyzed the following files from `~/.claude/agents/` and `~/.claude/commands/`:
- `2l-master-explorer.md` (21KB)
- `2l-explorer.md` (11KB)
- `2l-planner.md` (12KB)
- `2l-builder.md` (14KB)
- `2l-integrator.md` (17KB)
- `2l-iplanner.md` (14KB)
- `2l-ivalidator.md` (24KB)
- `2l-validator.md` (37KB)
- `2l-healer.md` (18KB)
- `2l-mvp.md` (command orchestrator)
- `2l-vision.md` (command)

---

## ACCURATE Agent Card Content

### 1. Master Explorers (Pre-Planning Strategic Analysis)

**Icon Suggestion:** Telescope / Search with rays
**Glow Color:** Cyan
**Role:** "Strategic analysis before any code is written"

**ACCURATE Detail (from 2l-master-explorer.md):**
```
Triggered: During master planning phase, before iterations begin
Spawned: 2-4 based on project complexity
  - Simple projects (<5 features): 2 explorers
  - Medium projects (5-14 features): 3 explorers
  - Complex projects (15+ features OR 3+ integrations): 4 explorers

Focus Areas (each explorer handles ONE):
  - Explorer 1: Architecture & Complexity Analysis (ALWAYS)
  - Explorer 2: Dependencies & Risk Assessment (ALWAYS)
  - Explorer 3: User Experience & Integration Points (IF >= 3)
  - Explorer 4: Scalability & Performance (IF == 4)

What They Analyze:
  - Major system components and relationships
  - Technology stack recommendations
  - Dependency chains between features
  - Critical path analysis (what blocks what)
  - Risk factors and mitigation strategies
  - Recommended iteration breakdown

Output: master-explorer-{id}-report.md
  - Complexity rating (SIMPLE | MEDIUM | COMPLEX | VERY COMPLEX)
  - Iteration breakdown recommendation
  - Dependency graph
  - Risk assessment

Why: "Measure twice, cut once" - strategic clarity before tactical planning
```

---

### 2. Iteration Explorers (Per-Iteration Analysis)

**Icon Suggestion:** Magnifying Glass / Search
**Glow Color:** Cyan (lighter)
**Role:** "Deep codebase analysis per iteration"

**ACCURATE Detail (from 2l-explorer.md):**
```
Triggered: Start of each iteration, before planning
Per Iteration: 2-3 explorers with assigned focus areas

Focus Areas:
  - Explorer 1: Architecture & Structure
    * Overall application architecture
    * Main components and relationships
    * Entry points and boundaries
    * File/folder structure recommendations

  - Explorer 2: Technology Patterns & Dependencies
    * Frameworks and libraries to use
    * Common coding patterns in domain
    * External integrations required
    * Dependencies to consider

  - Explorer 3: Complexity & Integration Points
    * Most complex features
    * Integration challenges
    * Features that might need subdivision
    * Critical dependencies between features

MCP Tools Available (optional):
  - Playwright MCP for E2E exploration
  - Chrome DevTools MCP for performance analysis
  - Supabase MCP for database schema exploration

Output: explorer-{id}-report.md
  - Discoveries and patterns identified
  - Complexity assessment (HIGH/MEDIUM/LOW per feature)
  - Technology recommendations with rationale
  - Integration points and risks
  - Recommendations for planner

Why: Builders don't guess - they know
```

---

### 3. Planners (Iteration Architect)

**Icon Suggestion:** Drafting Compass / FileText
**Glow Color:** Purple
**Role:** "Architect the solution with precision"

**ACCURATE Detail (from 2l-planner.md):**
```
Triggered: After exploration phase completes
Creates: 4 comprehensive plan artifacts

Output Files:
  1. overview.md
     - Project vision and context
     - Success criteria (measurable)
     - MVP scope (in/out of scope)
     - Development phases
     - Timeline estimates
     - Risk assessment

  2. tech-stack.md
     - Framework decisions with rationale
     - Database and ORM choices
     - Authentication approach
     - API layer design
     - Frontend stack
     - External integrations
     - Environment variables required
     - Performance targets

  3. patterns.md (CRITICAL for builders)
     - File structure conventions
     - Naming conventions
     - API patterns with full code examples
     - Database patterns with code
     - Frontend patterns with code
     - Testing patterns with code
     - Error handling patterns
     - Import order conventions

  4. builder-tasks.md
     - Builder assignment strategy
     - Per-builder task breakdown:
       * Scope and success criteria
       * Files to create
       * Dependencies (depends on/blocks)
       * Complexity estimate
       * Split strategy if HIGH complexity
     - Parallel execution groups
     - Integration notes

Key Capability: Assigns work to avoid conflicts
Sweet Spot: 3-6 primary builders for medium complexity

Why: Coordination prevents merge hell
```

---

### 4. Builders (Parallel Feature Development)

**Icon Suggestion:** Hammer / Code
**Glow Color:** Green
**Role:** "Parallel feature development"

**ACCURATE Detail (from 2l-builder.md):**
```
Triggered: After planning phase completes
Execution: 2-5 builders in parallel

Two Possible Outcomes:
  1. COMPLETE - Build everything successfully
  2. SPLIT - Task too complex, create foundation + spawn sub-builders

Smart Behaviors:
  - Follow patterns.md religiously (copy code patterns exactly)
  - Create all required files: implementation + types + tests
  - Handle dependencies (create placeholders if needed)
  - Verify work: TypeScript compiles, tests pass, lint passes
  - Document integration points for other builders

SPLIT Decision Criteria:
  Choose SPLIT when:
  - Task has 4+ distinct sub-features
  - Estimated implementation > 2 hours
  - Multiple complex integrations
  - Plan complexity is HIGH/VERY HIGH

  When splitting:
  - Create foundation (types, base classes, config, error handling)
  - Define 2-4 subtasks for sub-builders
  - Sub-builders MUST complete (no recursive splitting)

MCP Tools Available:
  - Playwright MCP for testing user flows
  - Chrome DevTools MCP for frontend debugging
  - Supabase MCP for database work

Output: builder-{id}-report.md
  - Status: COMPLETE or SPLIT
  - Files created/modified
  - Success criteria met
  - Tests summary
  - Integration notes (exports, imports, conflicts)
  - If SPLIT: subtasks for sub-builders

Code Quality Standards:
  - TypeScript strict mode compliant
  - All tests passing (>80% coverage target)
  - Proper error handling
  - No console.log in production code

Why: Parallel = speed without style drift
```

---

### 5. Integrators (Zone-Based Merging)

**Icon Suggestion:** Git Merge / Link Chain
**Glow Color:** Blue
**Role:** "Systematic merge of parallel work"

**ACCURATE Detail (from 2l-integrator.md + 2l-iplanner.md):**
```
Triggered: After building phase completes

Two-Phase Integration:

Phase 1: Integration Planning (iplanner)
  - Survey all builder outputs
  - Identify integration zones:
    * Shared Type Definitions (HIGH risk)
    * File Modifications (MEDIUM risk)
    * Shared Dependencies (LOW risk)
    * Independent Features (NONE risk)
    * Pattern Conflicts (MEDIUM risk)
    * Database Schema Overlaps (HIGH risk)
  - Detect conflicts (type conflicts, import issues, duplicates)
  - Create zone-based integration plan
  - Assign zones to integrators (balance workload)

Phase 2: Zone Execution (integrators)
  - Read assigned zones from integration plan
  - Execute strategy per zone:
    * Merge type definitions into unified file
    * Combine additive file modifications
    * Resolve pattern conflicts (choose canonical)
    * Direct merge for independent features
  - Verify: TypeScript compiles, imports resolve

Multi-Round Process:
  - Round 1: Initial integration
  - Round 2: Refinement (if issues found)
  - Round 3: Final attempt
  - After Round 3: Escalate to orchestrator

Integration Strategies:
  - Sequential Merge: One builder at a time
  - Layer Merge: By architectural layer
  - Feature Merge: Complete features together
  - Parallel Merge: Independent builders simultaneously

Output:
  - integration-plan.md (from iplanner)
  - integrator-{id}-report.md (per integrator)
  - Final: integration-report.md

Why: Parallel work needs systematic merging
```

---

### 6. Integration Validators (ivalidator)

**Icon Suggestion:** Checkmark with code / Shield outline
**Glow Color:** Yellow-gold (lighter than validator)
**Role:** "Ensure organic codebase cohesion"

**ACCURATE Detail (from 2l-ivalidator.md):**
```
Triggered: After each integration round
Purpose: Validate COHESION, not just correctness

5-Tier Status System:
  - PASS - Organic cohesion achieved
  - UNCERTAIN - Checks pass but gray areas exist
  - PARTIAL - Some cohesion achieved, some issues
  - INCOMPLETE - Cannot assess due to missing info
  - FAIL - Clear cohesion violations

8 Cohesion Checks:
  1. No Duplicate Implementations
     - Each utility exists once, not multiple times
     - Single source of truth per concept

  2. Import Consistency
     - All files use same import patterns
     - Path aliases used consistently

  3. Type Consistency
     - No multiple definitions of same domain concept
     - Related types import from common source

  4. No Circular Dependencies
     - Clean dependency graph with no cycles
     - Clear hierarchy

  5. Pattern Adherence
     - All code follows patterns.md conventions
     - Error handling, naming, structure consistent

  6. Shared Code Utilization
     - When Builder-A created utility, Builder-B imports it
     - No reinventing the wheel

  7. Database Schema Consistency (if applicable)
     - Single coherent schema
     - No duplicate models

  8. No Abandoned Code
     - All created files are imported somewhere
     - No orphaned utilities

Output: ivalidation-report.md
  - Status with confidence level
  - Per-check results with evidence
  - Issues by severity (Critical/Major/Minor)
  - Recommendations for next round

Maximum Rounds: 3 (then escalate)

Why: "Frankenstein code" prevention
```

---

### 7. Validators (Production Readiness)

**Icon Suggestion:** Shield with checkmark / Certificate
**Glow Color:** Yellow/Gold
**Role:** "Honest quality assessment"

**ACCURATE Detail (from 2l-validator.md):**
```
Triggered: After integration validation passes
Purpose: Comprehensive production readiness check

5-Tier Status System:
  - PASS - High confidence (>80%), deployment-ready
  - UNCERTAIN - Medium confidence (60-80%), doubts exist
  - PARTIAL - Some checks passed, others incomplete
  - INCOMPLETE - Cannot complete due to missing tools/info
  - FAIL - Clear blocking issues

80% Confidence Rule:
  "If confidence in PASS is below 80%, report UNCERTAIN instead"

Validation Checks (in order):
  1. TypeScript Compilation: npx tsc --noEmit
  2. Linting: npm run lint
  3. Code Formatting: prettier --check
  4. Unit Tests: npm run test (>80% coverage)
  5. Integration Tests: npm run test:integration
  6. Build Process: npm run build
  7. Development Server: npm run dev
  8. Success Criteria Check: From plan/overview.md
  9. MCP-Based Validation (optional):
     - Chrome DevTools: Performance, console errors
     - Playwright: E2E user flows
     - Supabase: Database schema validation

Quality Assessment:
  - Code Quality: EXCELLENT/GOOD/ACCEPTABLE/POOR
  - Architecture Quality: Same scale
  - Test Quality: Same scale

Issues Categorization:
  - Critical (blocks deployment)
  - Major (should fix before deployment)
  - Minor (nice to fix)

Learning Capture:
  - On FAIL: Create learnings.yaml for systematic improvement
  - Extract root causes from critical/major issues
  - Generate unique learning IDs

Output: validation-report.md
  - Status with confidence level and rationale
  - Per-check results
  - Issues summary
  - Recommendations
  - Performance metrics
  - Security checks

Why: Ship confidence, not hope
```

---

### 8. Healers (Self-Correction)

**Icon Suggestion:** Bandage / RefreshCw / Medical cross
**Glow Color:** Orange
**Role:** "Self-correcting when things fail"

**ACCURATE Detail (from 2l-healer.md):**
```
Triggered: When validation fails

Two-Phase Healing:

Phase 1: Healing Exploration
  - Explorer 1 (always): Root Cause Analysis
    * Failure categorization
    * Root causes (not symptoms)
    * Recommended fix strategies
    * File locations and affected components

  - Explorer 2 (if >3 categories): Dependency Analysis
    * Inter-category dependencies
    * Conflict risks between fixes
    * Recommended healing order
    * Integration considerations

Phase 2: Parallel Healing
  - Spawn healers per issue category:
    * TypeScript errors
    * Test failures
    * Linting issues
    * Build errors
    * Logic bugs
    * Integration problems
    * Performance issues
    * Security concerns

Healer Process:
  1. Read ALL exploration reports FIRST
  2. Focus ONLY on assigned category
  3. Fix root causes (not symptoms)
  4. Verify fixes: run category-specific checks
  5. Document exploration insights used
  6. Note deviations from recommendations

Fix Principles:
  - Minimal changes (only fix what's broken)
  - Maintain patterns.md conventions
  - Don't break working code
  - Fix root causes, not symptoms
  - Document non-obvious fixes

Healer Outcomes:
  - SUCCESS - All issues in category fixed
  - PARTIAL - Some issues fixed, some remain
  - FAILED - Could not fix issues

After Healing:
  - Re-integrate if needed
  - Re-validate
  - Up to 2 healing rounds before escalation

MCP Tools Available:
  - Playwright for debugging user flows
  - Chrome DevTools for console/performance issues
  - Supabase for database debugging

Output: healer-{id}-report.md
  - Status
  - Issues addressed with root cause
  - Files modified
  - Verification results
  - Exploration insights applied
  - Side effects and recommendations

Why: Most failures are fixable without humans
```

---

## 7-Phase Pipeline Summary

Based on the actual agent definitions, here is the ACCURATE 7-phase pipeline:

```
Phase 1: VISION
  Command: /2l-vision
  Agent: None (direct conversation)
  Output: vision.md
  Purpose: Interactive requirements gathering

Phase 2: EXPLORATION (Master + Iteration)
  Master: 2-4 master explorers (strategic analysis)
  Iteration: 2-3 explorers (tactical analysis)
  Output: Exploration reports
  Purpose: Understand before building

Phase 3: PLANNING
  Agent: Planner
  Output: 4 plan files (overview, tech-stack, patterns, builder-tasks)
  Purpose: Architect the solution

Phase 4: BUILDING
  Agent: 2-5 builders (parallel)
  Sub-agents: Sub-builders (if tasks split)
  Output: Working code + builder reports
  Purpose: Implement features

Phase 5: INTEGRATION
  Agents: iplanner + 1-3 integrators
  Output: Merged codebase + reports
  Purpose: Merge parallel work systematically

Phase 6: VALIDATION
  Agents: ivalidator (cohesion) + validator (production)
  Output: Validation reports
  Purpose: Quality assurance

Phase 7: HEALING (conditional)
  Agents: healing explorers + category healers
  Output: Fixed code + healing reports
  Purpose: Self-correction when validation fails
  Loop: Back to validation, up to 2 rounds
```

---

## Recommendations for Agent Cards Implementation

### Visual Hierarchy

1. **Primary Agents** (large cards):
   - Master Explorers (Cyan)
   - Planners (Purple)
   - Builders (Green)
   - Validators (Gold)
   - Healers (Orange)

2. **Supporting Agents** (smaller cards or grouped):
   - Iteration Explorers (with Master Explorers)
   - Integrators (Blue)
   - Integration Validators (Yellow-gold lighter)

### Key Stats to Display

| Agent Type | Spawned Per | Max Count |
|------------|-------------|-----------|
| Master Explorers | Plan | 2-4 |
| Iteration Explorers | Iteration | 2-3 |
| Planners | Iteration | 1 |
| Builders | Iteration | 2-5 + sub-builders |
| Integrators | Iteration | 1-3 per round |
| Validators | Iteration | 1-2 |
| Healers | Healing round | 1 per category |

### Connection Lines Logic

```
Master Explorers
       |
       v
    Planners  <--\
       |          \
       v           |
    Builders       |
       |           |
       v           |
  Integrators      |
       |           | (re-validate after fix)
       v           |
  Validators ------/
       |
       v (on fail)
    Healers --------> back to Validators
```

---

## Code Snippets for Agent Cards

### Agent Data Structure (TypeScript)

```typescript
interface AgentCard {
  id: string;
  name: string;
  icon: string;  // Lucide icon name
  glow: string;  // Tailwind color class
  role: string;  // One-line description
  phase: string;
  spawned: string;  // e.g., "2-4 based on complexity"
  capabilities: string[];
  outputs: string[];
  why: string;  // Philosophy/rationale
}

const agentData: AgentCard[] = [
  {
    id: "master-explorer",
    name: "Master Explorers",
    icon: "Telescope",
    glow: "cyan",
    role: "Strategic analysis before any code is written",
    phase: "exploration",
    spawned: "2-4 based on complexity",
    capabilities: [
      "Architecture & complexity analysis",
      "Dependencies & risk assessment",
      "UX & integration points",
      "Scalability considerations"
    ],
    outputs: ["Exploration reports that shape the master plan"],
    why: "Measure twice, cut once"
  },
  // ... other agents
];
```

---

## Files Analyzed

| File | Location | Size | Purpose |
|------|----------|------|---------|
| 2l-master-explorer.md | ~/.claude/agents/ | 21KB | Strategic exploration |
| 2l-explorer.md | ~/.claude/agents/ | 11KB | Iteration exploration |
| 2l-planner.md | ~/.claude/agents/ | 12KB | Solution architecture |
| 2l-builder.md | ~/.claude/agents/ | 14KB | Feature implementation |
| 2l-integrator.md | ~/.claude/agents/ | 17KB | Code merging |
| 2l-iplanner.md | ~/.claude/agents/ | 14KB | Integration planning |
| 2l-ivalidator.md | ~/.claude/agents/ | 24KB | Cohesion validation |
| 2l-validator.md | ~/.claude/agents/ | 37KB | Production validation |
| 2l-healer.md | ~/.claude/agents/ | 18KB | Issue fixing |
| 2l-mvp.md | ~/.claude/commands/ | 80KB | Orchestration |
| 2l-vision.md | ~/.claude/commands/ | 10KB | Vision gathering |

---

*Exploration completed: 2025-12-06*
*This report provides source-of-truth content for the "Under the Hood" agent cards*
