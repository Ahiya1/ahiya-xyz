# Builder-2 Report: Behavioral Tracking Hooks

## Status
COMPLETE

## Summary
Created behavioral tracking hooks for engagement metrics: `useTimeOnPage` for tracking actual time spent on page (excluding background tab time), `useClickTracker` for document-level click tracking via data attributes, and enhanced `CalcomEmbed` with conversion funnel tracking. All hooks are SSR-safe and follow the patterns established in patterns.md.

## Files Created

### Implementation
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useTimeOnPage.ts` - Time on page tracking hook using Visibility API with 30-second heartbeat intervals and 5-second minimum threshold
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useClickTracker.ts` - Click tracking hook using document-level event delegation with debouncing

### Tests
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useTimeOnPage.test.ts` - 15 unit tests covering enabled/disabled state, heartbeat intervals, visibility tracking, threshold enforcement, cleanup
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useClickTracker.test.ts` - 19 unit tests covering click tracking, category:label parsing, conversion tracking, nested elements, debouncing, sanitization

## Files Modified

### Enhancement
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/CalcomEmbed.tsx` - Added conversion tracking for Cal.com embed events:
  - `linkReady` - Tracks when embed loads
  - `bookingSuccessful` - Tracks completed bookings
  - `__dateSelected` - Tracks date selection (undocumented, wrapped in try/catch)
  - `__timeSelected` - Tracks time selection (undocumented, wrapped in try/catch)
  - Added `onBookingComplete` callback prop

## Success Criteria Met
- [x] useTimeOnPage hook using Visibility API
- [x] useClickTracker hook using data attribute delegation
- [x] CalcomEmbed enhanced with conversion tracking
- [x] Unit tests for useTimeOnPage with > 80% coverage (15 tests, all pass)
- [x] Unit tests for useClickTracker with > 80% coverage (19 tests, all pass)
- [x] Heartbeat interval of 30 seconds for time tracking
- [x] Minimum time threshold of 5 seconds before tracking
- [x] SSR-safe implementations

## Tests Summary
- **Unit tests:** 34 tests
- **All tests:** PASSING

### useTimeOnPage Test Coverage
- Should not track if disabled
- Should send heartbeat after interval when visible
- Should not track time below minimum threshold
- Should track when time exceeds minimum threshold
- Should not send heartbeat while hidden
- Should accumulate time correctly when tab visibility changes
- Should send final time on cleanup (navigation)
- Should send final time on beforeunload
- Should only send final time once (idempotent)
- Should reset on pathname change
- Should set up event listeners when enabled
- Should clean up event listeners on unmount
- Should not send final time below threshold
- Should use default options
- Should send multiple heartbeats over time

### useClickTracker Test Coverage
- Should track clicks on elements with data-track-click
- Should parse category:label format
- Should track conversions when data-track-conversion present
- Should not track when disabled
- Should find trackable element via closest() for nested elements
- Should not track elements without data-track-click
- Should sanitize tracking labels
- Should set up click listener on document with capture phase
- Should clean up click listener on unmount
- Should not track empty attribute values
- Should debounce rapid clicks
- Should use custom attribute name
- Should handle deeply nested elements
- Should handle multiple colons in category:label format
- Should truncate very long labels
- Should handle tracking errors gracefully
- Should handle conversion tracking errors gracefully
- Should allow different elements to be clicked rapidly
- Should use default options

## Dependencies Used
- `@/lib/tracking` - trackClick, trackConversion, trackEngagement, trackEvent functions
- `next/navigation` - usePathname for page change detection
- `@calcom/embed-react` - getCalApi for Cal.com event listeners

## Patterns Followed
- **useTimeOnPage Hook** pattern from patterns.md: Visibility API, heartbeat, beforeunload
- **Data Attribute Click Tracking** pattern: document-level delegation, capture phase
- **Enhanced CalcomEmbed** pattern: cal("on", {...}) event handlers
- **Hook Test Pattern with renderHook**: vitest + @testing-library/react
- **Mocking Strategies**: mocking @/lib/tracking, next/navigation
- **Tracking Label Convention**: snake_case labels (calcom_embed_ready, etc.)
- **Import Order Convention**: React -> External -> Internal -> Relative
- **Graceful Degradation**: try/catch wrapping for tracking calls
- **Security Pattern**: Input sanitization for tracking labels

## Integration Notes

### Exports for Builder-3
The hooks should be used by TrackingProvider (Builder-3's responsibility):

```tsx
// In TrackingProvider.tsx
import { useTimeOnPage } from "@/app/hooks/useTimeOnPage";
import { useClickTracker } from "@/app/hooks/useClickTracker";

// Inside component:
useTimeOnPage({ enabled: trackingEnabled });
useClickTracker({ enabled: trackingEnabled });
```

### CalcomEmbed Changes
CalcomEmbed now has an optional `onBookingComplete` callback:

```tsx
<CalcomEmbed onBookingComplete={() => console.log("Booked!")} />
```

### Data Attribute Usage (for Builder-3)
Builder-3 should add these attributes to CTAs:

```tsx
// Simple tracking
<button data-track-click="hero_see_work">See the Work</button>

// With category
<a data-track-click="navigation:pricing">Pricing</a>

// With conversion
<button data-track-click="calcom_button" data-track-conversion="booking_intent">
  Book Call
</button>
```

## Challenges Overcome

1. **Cal.com Type Compatibility**: The Cal.com embed types don't include undocumented events (`__dateSelected`, `__timeSelected`). Used type assertion to bypass this while maintaining safety with try/catch.

2. **Visibility API Accumulation**: Correctly accumulating time across visibility changes required careful handling of refs to track both accumulated time and last-visible timestamp.

3. **Click Debouncing Per Element**: Implemented per-element debouncing using a Map to track last click times, allowing rapid clicks on different elements while preventing duplicate events on the same element.

4. **Idempotent Final Time Sending**: Used a ref flag to ensure final time is only sent once, preventing duplicate events from both beforeunload and cleanup.

## Testing Notes

To run the tests:
```bash
npm run test -- --run app/hooks/useTimeOnPage.test.ts app/hooks/useClickTracker.test.ts
```

To manually test:
1. **Time tracking**: Open page, wait 30+ seconds, check database for engagement events
2. **Click tracking**: Add `data-track-click="test"` to any element, click it, check database
3. **Visibility**: Switch tabs, time should pause; switch back, time should resume
4. **Cal.com**: Visit pricing page, interact with booking widget, check for conversion events

## Security Checklist

- [x] No hardcoded secrets (all from env vars via tracking library)
- [x] Input validation/sanitization for tracking labels (sanitizeLabel function)
- [x] No PII collected in tracking labels (only identifiers)
- [x] Error handling doesn't expose internals (generic catches)
- [x] Respects DNT header (via shouldTrack in tracking library)

## Note for Integrator

**TrackingProvider update is Builder-3's responsibility**, not mine. The task description says:
> DO NOT modify TrackingProvider or page files - that's Builder-3's job.

I have created the hooks and enhanced CalcomEmbed. Builder-3 should:
1. Import and call `useTimeOnPage({ enabled })` in TrackingProvider
2. Import and call `useClickTracker({ enabled })` in TrackingProvider
3. Add `data-track-click` attributes to page CTAs
