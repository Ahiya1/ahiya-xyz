# Technology Stack - Iteration 11

**Plan:** plan-9
**Iteration:** 11
**Created:** 2025-12-04

---

## Core Framework

**Decision:** Next.js 15.3.4 with App Router (existing)

**Rationale:**
- Already in use across the project
- Server and client components working well
- No changes needed to framework configuration

---

## Animation Approach

**Decision:** CSS animations + requestAnimationFrame (no new libraries)

**Rationale:**
1. Existing animation infrastructure is comprehensive (13 keyframes in globals.css)
2. `useCountUp` hook already uses requestAnimationFrame pattern
3. `useTypewriter` pattern exists in `/app/soul/building/page.tsx`
4. No bundle size increase
5. GPU-accelerated CSS animations for performance

**Implementation Strategy:**
- CSS `@keyframes` for floating, pulsing, glowing (GPU-accelerated)
- `requestAnimationFrame` for typing effects (character-by-character)
- `IntersectionObserver` for scroll-triggered animations
- `setTimeout` for sequencing terminal commands

---

## State Management

**Decision:** React useState + useEffect (existing patterns)

**Rationale:**
- No complex state requirements
- Animation state is component-local
- Existing patterns in codebase work well

**Hooks to Use:**
- `useState` - Animation state, visibility flags
- `useEffect` - Animation lifecycle, cleanup
- `useRef` - DOM references, animation frame IDs
- `useCallback` - Memoized animation start functions

---

## Styling

**Decision:** Tailwind CSS + Custom CSS in globals.css (existing)

**Rationale:**
- Consistent with existing codebase
- Responsive utilities built-in
- Custom animations in globals.css work well

**New CSS Additions:**
- Terminal cursor blink animation
- Agent orb float + glow animations
- Progress bar fill animation
- Pipeline traveling indicator

---

## Component Architecture

**Decision:** Functional components with TypeScript

**Structure:**
```
/app/components/2l/
  TerminalAnimation.tsx    - Main terminal demo
  AgentVisualization.tsx   - Floating agent orbs
  LiveDashboard.tsx        - Metrics display
  CodeGenDemo.tsx          - Code typing effect
  SlashCommands.tsx        - Command showcase
```

**Rationale:**
- Matches existing component patterns
- Isolated, testable components
- Clear separation of concerns

---

## Data Sources

**Decision:** Hardcoded data with accurate values (MVP approach)

**Rationale:**
- Data changes infrequently (once per plan completion)
- Build-time data reading adds complexity
- Can update values with each new plan
- Avoids need for YAML parsing dependency

**Real Values to Use:**
| Metric | Value | Source |
|--------|-------|--------|
| Plans Completed | 8 | .2L/config.yaml (8 COMPLETE) |
| Iterations Shipped | 10 | .2L/config.yaml (global_iteration_counter) |
| Agents Spawned | 206+ | .2L/events.jsonl (agent_start events) |
| Validation Confidence | 92-95% | Typical from events |

---

## Icons

**Decision:** Lucide React (existing)

**Rationale:**
- Already installed and used throughout
- Consistent icon style
- Additional icons available if needed

**Icons Needed:**
- Existing: Target, Search, FileText, Hammer, GitMerge, Shield, RefreshCw, Zap, Eye, Grid3X3, ChevronDown, Mail, ArrowDown
- New: Terminal (for terminal component), Play (for animations), Check (for success states)

---

## Performance Strategy

**Decision:** CSS-first with lazy animations

**Approach:**
1. **CSS animations** for all floating/pulsing (offload to GPU)
2. **IntersectionObserver** to pause/start animations based on visibility
3. **requestAnimationFrame** only for typing effects
4. **will-change hints** sparingly on animated elements
5. **transform-only animations** (no layout properties)

**Performance Budget:**
- Animation overhead: <1ms per frame
- No more than 3 JS-driven animations active simultaneously
- Respect `prefers-reduced-motion`

---

## Browser Support

**Decision:** Modern browsers (ES2020+)

**Target:**
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile Safari 14+
- Chrome for Android

**Features Used:**
- IntersectionObserver (fully supported)
- requestAnimationFrame (fully supported)
- CSS custom properties (fully supported)
- CSS animations (fully supported)

---

## Accessibility

**Decision:** Full accessibility support

**Implementation:**
- `prefers-reduced-motion` media query for all animations
- Semantic HTML structure
- ARIA labels where needed
- Focus states visible
- Color contrast maintained

---

## Testing Strategy

**Decision:** Manual visual testing + build verification

**Commands:**
```bash
npm run build    # TypeScript + production build
npm run lint     # ESLint verification
npm run dev      # Manual visual check
```

**Visual Tests:**
1. Logo navigation works on all pages
2. Terminal animation plays and loops
3. Agent orbs animate smoothly
4. Dashboard metrics count up
5. Mobile responsive at 320px, 768px, 1024px

---

## Dependencies

### No New Dependencies Required

The existing stack provides everything needed:

| Feature | Solution | Status |
|---------|----------|--------|
| Terminal typing | Custom hook + RAF | Use existing pattern |
| Syntax highlighting | CSS classes | No library needed |
| Count-up animation | useCountUp hook | Already exists |
| Scroll detection | IntersectionObserver | Native API |
| Icons | lucide-react | Already installed |

### Existing Dependencies (unchanged)

```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.1.10",
  "lucide-react": "^0.517.0"
}
```

---

## Environment Variables

**No new environment variables required.**

All data is hardcoded for MVP. Future enhancement could add:
- `NEXT_PUBLIC_2L_PLANS_COUNT` - Dynamic from build script
- `NEXT_PUBLIC_2L_ITERATIONS_COUNT` - Dynamic from build script

---

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── 2l/
│   │   └── page.tsx              # Main 2L page (MODIFY)
│   ├── components/
│   │   ├── Navigation.tsx        # Logo fix (MODIFY)
│   │   ├── Footer.tsx            # Unchanged
│   │   └── 2l/                   # NEW directory
│   │       ├── TerminalAnimation.tsx
│   │       ├── AgentVisualization.tsx
│   │       ├── LiveDashboard.tsx
│   │       ├── CodeGenDemo.tsx
│   │       └── SlashCommands.tsx
│   └── globals.css               # Animation additions (MODIFY)
└── .2L/
    └── plan-9/
        └── iteration-11/
            └── plan/             # This planning output
```

---

## Build Configuration

**No changes to next.config.ts required.**

Current configuration handles:
- Redirects (existing)
- Image optimization (existing)

---

## Summary

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Animation library | None (CSS + RAF) | Existing patterns sufficient |
| State management | React hooks | Component-local state only |
| Data source | Hardcoded | Simple, accurate, low maintenance |
| Icons | lucide-react | Already installed |
| Styling | Tailwind + CSS | Existing approach |
| Performance | CSS-first | GPU acceleration |
| Accessibility | Full support | prefers-reduced-motion |

**Key Principle:** No new dependencies. Leverage existing patterns.
