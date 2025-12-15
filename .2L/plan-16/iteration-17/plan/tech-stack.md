# Technology Stack

## New Dependencies to Install

### @calcom/embed-react

**Decision:** Install `@calcom/embed-react` for Cal.com booking integration

**Installation Command:**
```bash
npm install @calcom/embed-react
```

**Rationale:**
- Official Cal.com React SDK
- Provides inline embed and popup modal options
- Handles responsive design automatically
- Seamless integration with Next.js

**Version:** Latest stable (check npm for current version)

## Existing Tech to Leverage

### Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** (v4.x) for styling

### Fonts
- **Crimson Text** (serif) - Display headings via `--font-crimson`
- **Inter** (sans-serif) - Body text via `--font-inter`

### Icons
- **lucide-react** - Consistent icon library used throughout

### Component Patterns
- **useScrollReveal** hook - For scroll-triggered animations
- **contemplative-card** class - Glass morphism card styling
- **SectionHeading** component - Reusable section headers

## No Backend Changes Needed

This iteration is purely frontend. All data is:
- Hardcoded in TypeScript data files
- External service (Cal.com) handles booking
- No database updates required
- No API routes needed

## Environment Variables

### Required for Cal.com
No environment variables needed for Cal.com embed - it uses a public URL.

**Cal.com URL:** `cal.com/ahiya-butman-tigupi/discovery-call`

## File Structure

New files to be created:
```
app/
├── data/
│   ├── testimonials.ts      # Testimonial data
│   ├── pricing.ts           # Service tier data
│   └── availability.ts      # Urgency/availability config
├── components/
│   ├── Testimonials.tsx     # Testimonials section
│   ├── CalcomEmbed.tsx      # Cal.com wrapper
│   └── UrgencyBadge.tsx     # Availability badge
└── pricing/
    └── page.tsx             # Pricing page route
```

Files to modify:
```
app/
├── page.tsx                 # Homepage updates
└── components/
    └── Navigation.tsx       # Add Pricing link
```

## Browser Support

Same as existing site:
- Modern evergreen browsers
- CSS backdrop-filter for glass effects
- IntersectionObserver for scroll animations
- Reduced motion media query support required

## Performance Considerations

- Cal.com embed loads asynchronously
- Testimonials section uses lazy scroll reveal
- No additional API calls needed
- Minimal bundle size impact from @calcom/embed-react
