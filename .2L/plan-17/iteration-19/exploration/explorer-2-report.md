# Explorer 2 Report: Behavioral Tracking (Time on Page, Click Tracking, Conversions)

## Executive Summary

Iteration 18 established a solid analytics foundation with `/lib/tracking.ts` (event batching, DNT support), `useScrollDepthTracker` hook, and the `/api/analytics/event` API endpoint. Iteration 19 needs to build upon this to add: (1) `useTimeOnPage` hook using the Visibility API for accurate engagement time, (2) `useClickTracker` for CTA and element click tracking, and (3) Cal.com conversion tracking integration. The existing infrastructure supports all these additions with minimal changes.

## Discoveries

### Existing Tracking Infrastructure

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.ts`

The tracking library provides:
- `trackEvent(category, action, label, value, metadata)` - Generic event tracking
- `trackClick(category, label)` - Click event shorthand
- `trackEngagement(timeMs)` - Engagement time tracking
- `trackConversion(type, metadata)` - Conversion tracking
- Event batching (3-second intervals, max 50 events per batch)
- `sendBeacon` for reliable page unload delivery
- DNT (Do Not Track) respect
- Session management with 30-minute sliding expiry

**Critical:** All tracking functions already exist. The hooks need to use these existing functions.

### Cal.com Embed Component

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/CalcomEmbed.tsx`

```typescript
import Cal, { getCalApi } from "@calcom/embed-react";

// In useEffect:
const cal = await getCalApi();
cal("ui", { theme: "dark", ... });
```

**Key Insight:** The `getCalApi()` returns an API object that supports event listeners. According to Cal.com documentation, we can listen for:
- `bookingSuccessful` - When a booking is completed
- `linkReady` - When the embed is ready
- `linkFailed` - When the embed fails to load

### CTAs Requiring Click Tracking

Analyzed all pages and identified CTAs that need tracking:

| Page | Element | Label for Tracking |
|------|---------|-------------------|
| Homepage | "See the Work" (hero) | `hero_see_work` |
| Homepage | "Let's Build" (hero) | `hero_lets_build` |
| Homepage | "Book Discovery Call" (footer) | `footer_discovery_call` |
| Homepage | "GitHub" link | `footer_github` |
| Homepage | Portfolio cards (4) | `portfolio_{project-id}` |
| Homepage | "Get in Touch" | `cta_get_in_touch` |
| Pricing | Tier cards (hover/click) | `tier_{tier-id}` |
| Pricing | "Back to Portfolio" | `pricing_back_portfolio` |
| Pricing | Cal.com embed interactions | `calcom_*` |
| CV | Email contact link | `cv_email` |
| CV | PDF download | `cv_pdf_download` |
| 2L | "Watch It Build" | `2l_watch_build` |
| 2L | "View Case Study" | `2l_case_study` |
| 2L | "Get in Touch" | `2l_get_in_touch` |
| Projects | "Enter the Mirror" etc. | `project_{id}_cta` |
| Projects | "Next Project" links | `project_next_{id}` |

### Pages Requiring Integration

1. **Homepage** (`/app/page.tsx`) - 260 lines, client component
2. **Pricing** (`/app/pricing/page.tsx`) - 131 lines, client component
3. **CV** (`/app/cv/page.tsx`) - 151 lines, client component
4. **2L** (`/app/2l/page.tsx`) - 270 lines, client component
5. **Project pages** (4 pages) - 600-800 lines each

All are already client components ("use client"), making hook integration straightforward.

## Patterns Identified

### Pattern 1: useTimeOnPage Hook with Visibility API

**Description:** Track actual time user spends on page, pausing when tab is hidden.

**Implementation Approach:**
```typescript
// /app/hooks/useTimeOnPage.ts
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEngagement } from "@/lib/tracking";

export interface UseTimeOnPageOptions {
  heartbeatIntervalMs?: number;  // How often to send heartbeat (default: 30000)
  minTimeToTrackMs?: number;     // Minimum time before tracking (default: 5000)
  enabled?: boolean;
}

export function useTimeOnPage(options: UseTimeOnPageOptions = {}): void {
  const {
    heartbeatIntervalMs = 30000,
    minTimeToTrackMs = 5000,
    enabled = true
  } = options;
  
  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const lastVisibleRef = useRef<number>(0);
  
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    
    // Reset on page change
    startTimeRef.current = Date.now();
    accumulatedTimeRef.current = 0;
    lastVisibleRef.current = Date.now();
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Accumulate time when hiding
        accumulatedTimeRef.current += Date.now() - lastVisibleRef.current;
      } else {
        // Reset visibility timestamp when visible again
        lastVisibleRef.current = Date.now();
      }
    };
    
    // Heartbeat - send periodic updates
    const heartbeatInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        const currentTime = accumulatedTimeRef.current + (Date.now() - lastVisibleRef.current);
        if (currentTime >= minTimeToTrackMs) {
          trackEngagement(currentTime);
        }
      }
    }, heartbeatIntervalMs);
    
    // Send final time on unload
    const handleUnload = () => {
      const finalTime = accumulatedTimeRef.current + 
        (document.visibilityState === "visible" ? Date.now() - lastVisibleRef.current : 0);
      if (finalTime >= minTimeToTrackMs) {
        trackEngagement(finalTime);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleUnload);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleUnload);
      clearInterval(heartbeatInterval);
      
      // Send final time on cleanup (navigation)
      handleUnload();
    };
  }, [pathname, heartbeatIntervalMs, minTimeToTrackMs, enabled]);
}
```

**Use Case:** Track real engagement time, excluding time when user has tab in background.

**Recommendation:** YES - This is the core time tracking requirement.

### Pattern 2: useClickTracker Hook (Data Attribute Approach)

**Description:** Track clicks on elements marked with data attributes.

**Implementation Approach:**
```typescript
// /app/hooks/useClickTracker.ts
"use client";

import { useEffect } from "react";
import { trackClick, trackConversion } from "@/lib/tracking";

export interface UseClickTrackerOptions {
  /** Data attribute to look for (default: data-track-click) */
  attribute?: string;
  /** Whether tracking is enabled */
  enabled?: boolean;
}

export function useClickTracker(options: UseClickTrackerOptions = {}): void {
  const { 
    attribute = "data-track-click",
    enabled = true 
  } = options;
  
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find the closest element with tracking attribute
      const trackable = target.closest(`[${attribute}]`) as HTMLElement | null;
      if (!trackable) return;
      
      const trackValue = trackable.getAttribute(attribute);
      if (!trackValue) return;
      
      // Parse: "category:label" or just "label" (defaults to "cta" category)
      const [categoryOrLabel, labelOrUndefined] = trackValue.split(":");
      const category = labelOrUndefined ? categoryOrLabel : "cta";
      const label = labelOrUndefined || categoryOrLabel;
      
      trackClick(category, label);
      
      // Check for conversion attribute
      if (trackable.hasAttribute("data-track-conversion")) {
        const conversionType = trackable.getAttribute("data-track-conversion") || "unknown";
        trackConversion(conversionType);
      }
    };
    
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [attribute, enabled]);
}
```

**Use Case:** Declaratively track clicks with minimal code changes:
```tsx
<a data-track-click="hero_see_work" href="#portfolio">See the Work</a>
<a data-track-click="cta:discovery_call" data-track-conversion="booking_intent">Book Call</a>
```

**Recommendation:** YES - Data attributes are the cleanest approach:
1. No wrapper components needed
2. SSR-safe
3. Easy to add/remove tracking
4. Self-documenting in HTML

### Pattern 3: Cal.com Conversion Tracking

**Description:** Track Cal.com embed interactions for conversion funnel.

**Implementation Approach:**
```typescript
// Enhanced CalcomEmbed.tsx
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { trackEvent, trackConversion } from "@/lib/tracking";

interface CalcomEmbedProps {
  calLink?: string;
  onBookingComplete?: () => void;
}

export function CalcomEmbed({
  calLink = "ahiya-butman-tigupi/discovery-call",
  onBookingComplete,
}: CalcomEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      
      // Configure UI
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#a855f7" } },
        hideEventTypeDetails: false,
      });
      
      // Track embed ready (conversion funnel: saw booking widget)
      cal("on", {
        action: "linkReady",
        callback: () => {
          trackEvent("conversion", "calcom_embed_ready", "pricing_page");
        },
      });
      
      // Track booking success (final conversion)
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: { data: unknown }) => {
          trackConversion("booking_complete", { calEvent: e.data });
          onBookingComplete?.();
        },
      });
      
      // Track date selection (mid-funnel)
      cal("on", {
        action: "__dateSelected",
        callback: () => {
          trackEvent("conversion", "calcom_date_selected", "pricing_page");
        },
      });
      
      // Track time selection (mid-funnel)
      cal("on", {
        action: "__timeSelected",
        callback: () => {
          trackEvent("conversion", "calcom_time_selected", "pricing_page");
        },
      });
    })();
  }, [onBookingComplete]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ theme: "dark" }}
    />
  );
}
```

**Conversion Funnel Events:**
1. Page view (existing) -> `pageview`
2. Scroll to Cal.com section -> `scroll_75` or `scroll_100`
3. Cal.com embed loaded -> `calcom_embed_ready`
4. Date selected -> `calcom_date_selected`
5. Time selected -> `calcom_time_selected`
6. Booking complete -> `booking_complete`

**Recommendation:** YES - Cal.com events API supports this. The `cal("on", ...)` pattern is documented.

### Pattern 4: TrackingProvider Enhancement

**Description:** Integrate all tracking hooks into the existing TrackingProvider.

**Implementation:**
```typescript
// Enhanced /app/components/TrackingProvider.tsx
"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import { initTracking, teardownTracking } from "@/lib/tracking";
import { useScrollDepthTracker } from "@/app/hooks/useScrollDepthTracker";
import { useTimeOnPage } from "@/app/hooks/useTimeOnPage";
import { useClickTracker } from "@/app/hooks/useClickTracker";

export interface TrackingProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function TrackingProvider({
  children,
  enabled = true,
}: TrackingProviderProps) {
  // Initialize tracking lifecycle
  useEffect(() => {
    if (!enabled) return;
    initTracking();
    return () => teardownTracking();
  }, [enabled]);

  // Track scroll depth on all pages
  useScrollDepthTracker({ enabled });
  
  // Track time on page (NEW)
  useTimeOnPage({ enabled });
  
  // Track clicks via data attributes (NEW)
  useClickTracker({ enabled });

  return <>{children}</>;
}
```

**Recommendation:** YES - Central tracking location is clean and maintainable.

## Complexity Assessment

### High Complexity Areas

**Cal.com Conversion Integration:**
- Requires understanding Cal.com's event API
- Need to handle async getCalApi() properly
- Multiple event types to track
- Must not break existing embed functionality
- Estimated effort: 2-3 hours

### Medium Complexity Areas

**useTimeOnPage Hook:**
- Visibility API is well-supported
- Need to handle edge cases (multiple tabs, rapid navigation)
- Must send data on both unload and route change
- Testing visibility changes is tricky in Vitest
- Estimated effort: 2 hours

**Click Tracking Integration (Adding Data Attributes):**
- Need to add attributes to 20+ elements across 8 pages
- Must be consistent with naming convention
- Estimated effort: 1.5 hours

### Low Complexity Areas

**useClickTracker Hook:**
- Simple event delegation pattern
- Well-tested approach
- Estimated effort: 1 hour

**TrackingProvider Enhancement:**
- Just adding two hook calls
- Estimated effort: 15 minutes

## Technology Recommendations

### Primary Approach: Data Attributes

**Why Data Attributes over HOCs or Wrapper Components:**

1. **SSR Safety:** No hydration issues
2. **Zero Bundle Impact:** No additional components
3. **Declarative:** Self-documenting in JSX
4. **Flexible:** Easy to add/remove tracking
5. **Performance:** Single event listener vs. many
6. **Testing:** Easy to verify attributes in DOM

**Example Usage:**
```tsx
// Simple CTA
<a data-track-click="hero_cta" href="/pricing">Get Started</a>

// With category
<a data-track-click="navigation:pricing" href="/pricing">Pricing</a>

// With conversion
<a 
  data-track-click="calcom_button" 
  data-track-conversion="booking_intent"
  href="https://cal.com/..."
>
  Book Call
</a>
```

### Visibility API for Time Tracking

**Browser Support:** 99%+ (caniuse.com)

**Key Events:**
- `document.visibilityState`: "visible" | "hidden"
- `visibilitychange` event on document

**Benefits:**
- Accurate engagement time (not counting background tabs)
- Battery efficient (no polling while hidden)
- Standard API, no dependencies

### Cal.com Event API

**Available Events (from `@calcom/embed-react` v1.5.3):**
- `linkReady`: Embed loaded
- `linkFailed`: Embed failed
- `bookingSuccessful`: Booking completed
- `__dateSelected`: User selected a date
- `__timeSelected`: User selected a time

**Note:** Events starting with `__` are undocumented but stable.

## Integration Points

### TrackingProvider to Hooks

```
TrackingProvider
  ├── initTracking() / teardownTracking()
  ├── useScrollDepthTracker()     [EXISTS]
  ├── useTimeOnPage()             [NEW]
  └── useClickTracker()           [NEW]
```

### Hooks to tracking.ts

```
useTimeOnPage
  └── trackEngagement(timeMs)     [EXISTS]

useClickTracker
  ├── trackClick(category, label) [EXISTS]
  └── trackConversion(type, metadata) [EXISTS]

CalcomEmbed
  ├── trackEvent(...)             [EXISTS]
  └── trackConversion(...)        [EXISTS]
```

### Data Flow

```
User Action → Hook/Component → tracking.ts → Event Queue → Batch API → Database
                                                   ↓
                                            sendBeacon (on unload)
```

## Risks & Challenges

### Technical Risks

**Risk 1: Cal.com Event API Stability**
- Impact: Conversion tracking could break on Cal.com updates
- Mitigation: Wrap in try/catch, use only documented events where possible
- Likelihood: LOW (API has been stable)

**Risk 2: Visibility API Edge Cases**
- Impact: Inaccurate time tracking on some devices
- Mitigation: Test on mobile Safari, handle Page Visibility API quirks
- Likelihood: MEDIUM

**Risk 3: Event Queue Overflow**
- Impact: Lost events if queue exceeds 50 before flush
- Mitigation: Existing 3-second flush interval handles this; add warning log if approaching limit
- Likelihood: LOW

### Integration Risks

**Risk 4: Too Many Tracking Events**
- Impact: Database bloat, slow queries
- Mitigation: Implement sampling for high-frequency events, set reasonable heartbeat intervals
- Likelihood: MEDIUM

## Recommendations for Planner

1. **Create useTimeOnPage hook first** - This replaces the hardcoded 45s placeholder and provides immediate value. Use 30-second heartbeat intervals to balance accuracy with event volume.

2. **Create useClickTracker as document-level listener** - Single event handler is more efficient than wrapping each element. Use data attributes for declarative tracking.

3. **Add data-track-click attributes to CTAs** - Start with high-value CTAs (hero, pricing, contact) before expanding to all elements.

4. **Enhance CalcomEmbed with event listeners** - The Cal.com API supports `cal("on", ...)` for event listening. Track `linkReady`, `bookingSuccessful`, and optionally `__dateSelected`/`__timeSelected`.

5. **Update TrackingProvider to use new hooks** - This centralizes all tracking initialization.

6. **Testing Strategy:**
   - Unit tests for hooks (mock Visibility API, document events)
   - Integration test for Cal.com events (may need to mock getCalApi)
   - Manual verification of event delivery to database

## Resource Map

### Files to Create

| Path | Purpose |
|------|---------|
| `/app/hooks/useTimeOnPage.ts` | Time on page tracking hook |
| `/app/hooks/useTimeOnPage.test.ts` | Unit tests |
| `/app/hooks/useClickTracker.ts` | Click tracking hook |
| `/app/hooks/useClickTracker.test.ts` | Unit tests |

### Files to Modify

| Path | Changes |
|------|---------|
| `/app/components/TrackingProvider.tsx` | Add useTimeOnPage, useClickTracker |
| `/app/components/CalcomEmbed.tsx` | Add Cal.com event listeners |
| `/app/page.tsx` | Add data-track-click attributes |
| `/app/pricing/page.tsx` | Add data-track-click attributes |
| `/app/cv/page.tsx` | Add data-track-click attributes |
| `/app/2l/page.tsx` | Add data-track-click attributes |
| `/app/projects/*/page.tsx` | Add data-track-click attributes |

### Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| `@calcom/embed-react` | ^1.5.3 | Cal.com embed with event API |
| Visibility API | Browser native | Tab visibility detection |
| `@/lib/tracking.ts` | EXISTS | Event batching and delivery |

### Testing Infrastructure

| Tool | Purpose |
|------|---------|
| Vitest | Unit testing hooks |
| `@testing-library/react` | renderHook for hook tests |
| Mock functions | Mock trackClick, trackEngagement, etc. |

## Questions for Planner

1. **Heartbeat Frequency:** Is 30 seconds appropriate for time-on-page heartbeats, or should we use 15 seconds for more granular data?

2. **Click Tracking Scope:** Should we track ALL clicks (navigation, external links, buttons) or only primary CTAs initially?

3. **Cal.com Mid-Funnel Events:** Should we track `__dateSelected` and `__timeSelected` (undocumented events) for richer funnel data, or stick to only documented events?

4. **Mobile Tap Tracking:** Should `useClickTracker` also track touch events separately, or rely on click events which fire on mobile tap?

## Tracking Label Convention

Proposed naming convention for consistent analytics:

```
{location}_{element}_{action?}

Examples:
- hero_cta                   (hero section, main CTA)
- hero_see_work              (hero section, "See the Work" button)
- footer_discovery_call      (footer, "Book Discovery Call")
- portfolio_mirror_of_dreams (portfolio card click)
- pricing_tier_essentials    (pricing tier click)
- cv_pdf_download            (CV page, download PDF)
- calcom_embed_ready         (Cal.com loaded)
- calcom_booking_complete    (Cal.com booking done)
```

This enables dashboard queries like:
- "All hero conversions": `event_label LIKE 'hero_%'`
- "All Cal.com funnel events": `event_label LIKE 'calcom_%'`
