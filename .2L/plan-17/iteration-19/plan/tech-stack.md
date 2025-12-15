# Technology Stack

## Core Animation Framework

**Decision:** Framer Motion v12.23.25 (already installed)

**Rationale:**
- Already installed in the codebase, proven in admin LiveFeed component
- Provides useSpring for smooth physics-based animations
- Supports motion values that update without causing re-renders
- Built-in reduced motion detection via `useReducedMotion`
- Works seamlessly with React 18 and Next.js App Router

**Alternatives Considered:**
- CSS-only: Rejected for mouse-tracking interactions (not possible in CSS)
- GSAP: Rejected to avoid new dependencies; Framer Motion already handles requirements
- React Spring: Rejected; Framer Motion is already installed and capable

## Animation Architecture

**Decision:** CSS for continuous/ambient animations, Framer Motion for interactive animations

**Rationale:**
- CSS keyframes are more performant for continuous animations (already used for particles, orbs, gradients)
- Framer Motion spring physics required for mouse-tracking interactions
- Clear separation: CSS = ambient (no user input), JS = reactive (user input)
- Follows existing codebase pattern established in Iteration 18

**Implementation:**
```
CSS (@keyframes in globals.css):
  - Idle icon animations (rotation, pulse)
  - Existing particle-float, orb-drift

Framer Motion (JavaScript):
  - MagneticButton cursor tracking
  - TiltCard mouse position transforms
  - Spring physics for smooth motion
```

## Mouse Tracking Approach

**Decision:** useSpring motion values with throttled event handlers

**Rationale:**
- motion values (like useSpring) update without triggering React re-renders
- 60fps throttling prevents excessive calculations
- Spring physics provides natural easing without manual timing
- Pattern proven in many production codebases

**Key Technical Choices:**

```typescript
// Motion values over useState for performance
const x = useSpring(0, springConfig);  // Good: updates bypass React
const [x, setX] = useState(0);         // Bad: causes re-render on every move

// Throttle to 60fps
const throttleMs = 1000 / 60;  // ~16.67ms
```

## Visibility API for Time Tracking

**Decision:** Use Visibility API (document.visibilityState) for accurate engagement time

**Rationale:**
- Native browser API with 99%+ support
- Battery efficient (no polling while tab hidden)
- Provides accurate "active" time, not just page load duration
- Standard approach used by major analytics platforms

**Implementation Notes:**
- Track `visibilitychange` event on document
- Accumulate time only when `visibilityState === "visible"`
- Send heartbeat every 30 seconds for active sessions
- Use sendBeacon on unload for reliable delivery

## Click Tracking Approach

**Decision:** Data attribute delegation with single document listener

**Rationale:**
- Single event listener is more efficient than wrapper components on each element
- Data attributes are SSR-safe (no hydration issues)
- Declarative: self-documenting in JSX
- Easy to add/remove tracking without code changes
- Zero bundle impact (no additional components)

**Data Attribute Schema:**
```html
<!-- Simple: category defaults to "cta" -->
<a data-track-click="hero_see_work">See the Work</a>

<!-- With category -->
<a data-track-click="navigation:pricing">Pricing</a>

<!-- With conversion -->
<a data-track-click="calcom_button" data-track-conversion="booking_intent">Book Call</a>
```

## Cal.com Integration

**Decision:** Use Cal.com event API via `cal("on", {...})` pattern

**Rationale:**
- Official API supported by @calcom/embed-react
- Enables full conversion funnel tracking
- No external dependencies required

**Events to Track:**
1. `linkReady` - Embed loaded (documented)
2. `bookingSuccessful` - Booking completed (documented)
3. `__dateSelected` - Date selected (undocumented but stable)
4. `__timeSelected` - Time selected (undocumented but stable)

**Risk Mitigation:** Wrap undocumented event handlers in try/catch

## Mobile Detection

**Decision:** Use matchMedia for device detection

**Rationale:**
- SSR-safe when used in useEffect
- Reactive to viewport changes
- Pattern already established in AmbientParticles

**Implementation:**
```typescript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mq = window.matchMedia("(max-width: 768px)");
  setIsMobile(mq.matches);
  const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);
```

## Dependencies Overview

All dependencies are already installed:

| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | ^12.23.25 | Spring physics, motion values, useSpring |
| @calcom/embed-react | ^1.5.3 | Cal.com embed with event API |
| react | ^18.x | useState, useRef, useEffect, useCallback |
| next | ^14.x | App Router, usePathname |

**No new dependencies required for this iteration.**

## Spring Physics Configuration

**Decision:** Standardized spring presets for consistent animation feel

**Presets:**
```typescript
export const springPresets = {
  // Gentle - for subtle effects
  gentle: { stiffness: 100, damping: 15, mass: 0.5 },

  // Snappy - for quick responses
  snappy: { stiffness: 300, damping: 20, mass: 0.5 },

  // Magnetic - for button attraction
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },

  // Tilt - for 3D card rotation
  tilt: { stiffness: 200, damping: 20, mass: 0.3 },
};
```

**Rationale:**
- Consistent spring configs create cohesive animation feel
- Lower mass = snappier response (good for cursor following)
- Higher damping = less oscillation (more controlled)

## CSS Custom Properties

**Decision:** Use CSS custom properties for dynamic JS-to-CSS communication

**Use Cases:**
- Icon animation delays (staggered idle animations)
- Glow intensity based on cursor proximity

**Example:**
```css
.animated-icon {
  animation-delay: var(--icon-delay, 0s);
}
```
```typescript
style={{ '--icon-delay': `${index * 2}s` } as CSSProperties}
```

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 85 | Lighthouse CLI |
| Animation FPS | 60fps | Chrome DevTools Performance |
| Time to Interactive | < 3s | Lighthouse |
| Bundle Size Impact | < 5KB | Next.js build output |
| Mouse Event Throttle | 16ms (~60fps) | Manual timing |

## Testing Stack

**Unit Tests:**
- Vitest for hook testing
- @testing-library/react for renderHook
- Mock functions for tracking library

**Manual Testing:**
- Chrome DevTools Performance tab for animation smoothness
- Lighthouse for performance scores
- Real mobile device testing for touch behavior
- prefers-reduced-motion toggle testing

## Environment Variables

No new environment variables required. Uses existing:

- `DATABASE_URL` - For analytics storage (existing)
- No API keys needed for this iteration

## Security Considerations

**Click Tracking:**
- Only tracks element identifiers, not user content
- No PII collected through data attributes
- Respects DNT (Do Not Track) header (existing)

**Time Tracking:**
- Visibility state is public browser API
- No cross-origin concerns
- Data sent to own API only

**Cal.com Events:**
- Event data sanitized before storage
- Booking details logged minimally (type only, not personal info)
