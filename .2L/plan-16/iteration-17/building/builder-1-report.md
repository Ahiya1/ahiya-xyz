# Builder-1 Report: Data Files & Reusable Components

## Status
COMPLETE

## Summary
Created all foundation data files (testimonials, pricing, availability) and reusable components (UrgencyBadge, CalcomEmbed) that Builder 2 and Builder 3 will depend on. Also installed the @calcom/embed-react package.

## Files Created

### Data Files
- `/app/data/testimonials.ts` - Testimonial interface and 3 testimonial entries (Herzog College, HIT, Mirror of Dreams user)
- `/app/data/pricing.ts` - ServiceTier interface, 4 service tiers, and launchPricingConfig
- `/app/data/availability.ts` - AvailabilityConfig interface and availability config object

### Components
- `/app/components/UrgencyBadge.tsx` - Client component with amber-colored badge and pulsing dot animation
- `/app/components/CalcomEmbed.tsx` - Client component wrapping Cal.com embed with dark theme and purple brand color

## Success Criteria Met
- [x] `/app/data/testimonials.ts` exports `Testimonial` interface and `testimonials` array with 3 items
- [x] `/app/data/pricing.ts` exports `ServiceTier` interface, `serviceTiers` array with 4 items, and `launchPricingConfig`
- [x] `/app/data/availability.ts` exports `AvailabilityConfig` interface and `availability` config object
- [x] `/app/components/UrgencyBadge.tsx` renders availability message with pulsing dot
- [x] `/app/components/CalcomEmbed.tsx` wraps Cal.com embed with dark theme configuration
- [x] All components are "use client" and properly typed

## Dependencies Installed
- `@calcom/embed-react` - Official Cal.com React SDK for embedding booking calendar

## Patterns Followed
- **Data File Pattern**: Following existing `/app/data/portfolio.ts` structure with typed arrays and default exports
- **UrgencyBadge Pattern**: Exactly as specified in patterns.md with pulsing dot animation and amber styling
- **CalcomEmbed Pattern**: Exactly as specified in patterns.md with dark theme and purple brand color (#a855f7)

## Integration Notes

### Exports for Other Builders

**Builder 2 (Pricing Page) will use:**
- `import { serviceTiers, launchPricingConfig } from "@/app/data/pricing"`
- `import { availability } from "@/app/data/availability"`
- `import { UrgencyBadge } from "@/app/components/UrgencyBadge"`
- `import { CalcomEmbed } from "@/app/components/CalcomEmbed"`

**Builder 3 (Homepage Updates) will use:**
- `import { testimonials } from "@/app/data/testimonials"`
- `import { UrgencyBadge } from "@/app/components/UrgencyBadge"` (optional)

### Interface Exports
- `Testimonial` - Type for testimonial entries
- `ServiceTier` - Type for pricing tier entries
- `AvailabilityConfig` - Type for availability configuration

## Decisions Made

1. **Testimonial type values**: Used "institutional" | "corporate" | "personal" instead of "academic" | "corporate" | "personal" as specified in patterns.md (more accurate for academic institutions)

2. **Default exports**: Added default exports alongside named exports for flexibility in import style

3. **Documentation comments**: Added JSDoc-style comments with update instructions, especially for availability.ts which will need monthly updates

4. **Cal.com URL**: Used default URL "ahiya-butman-tigupi/discovery-call" as specified in task

## Verification

- TypeScript compilation: PASSING
- Next.js build: SUCCESSFUL
- All imports resolve correctly with @/ path aliases

## Notes for Maintainers

### Monthly Availability Update
Edit `/app/data/availability.ts` to update:
```typescript
export const availability: AvailabilityConfig = {
  slotsRemaining: 2,        // Update this number
  period: "January",        // Update the month
  message: "2 slots remaining for January",  // Update full message
  showBadge: true,          // Set false to hide
};
```

### Launch Pricing Banner
To hide the launch pricing banner when the promotion ends, edit `/app/data/pricing.ts`:
```typescript
export const launchPricingConfig = {
  // ...
  active: false,  // Set to false to hide banner
};
```
