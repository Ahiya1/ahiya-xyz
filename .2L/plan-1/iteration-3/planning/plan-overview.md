# Iteration 3: Polish & SEO - Plan Overview

## Iteration Goal
Complete the business transformation with proper SEO, accessibility fixes, and final polish.

## Key Issues from Exploration

### Metadata (Explorer-1)
- Root layout has philosophical metadata, needs business update
- Viewport in deprecated `metadata.viewport` format (12 warnings)
- No JSON-LD structured data

### Accessibility (Explorer-2)
- Missing skip-to-content link
- Decorative icons missing `aria-hidden="true"`
- External links don't announce new tab
- Footer copyright text has low contrast (text-slate-600)

### Performance (Explorer-3)
- Bundle size 112KB (acceptable, 12% over target)
- Logo images oversized (141KB + 206KB) - but already have optimized versions from Iteration 1
- Missing blur placeholders on images

## Builder Assignment

| Builder | Focus | Changes |
|---------|-------|---------|
| Builder-1 | Metadata & SEO | Update layout.tsx metadata, fix viewport, add JSON-LD |
| Builder-2 | Accessibility | Skip link, aria-hidden on icons, external link announcements, contrast fix |

## Files to Modify

### Builder-1 (Metadata & SEO)
- `app/layout.tsx` - Update metadata, fix viewport, add JSON-LD

### Builder-2 (Accessibility)
- `app/page.tsx` - Add skip link target, aria-hidden on icons
- `app/components/Navigation.tsx` - Add skip link, aria-label on logo
- `app/components/Footer.tsx` - Fix contrast, aria-hidden on icon
- `app/components/PortfolioCard.tsx` - aria-hidden on icon, external link announcement

## Success Criteria

1. No viewport deprecation warnings in build
2. Business-focused metadata on homepage
3. JSON-LD structured data present
4. Skip-to-content link functional
5. All decorative icons have aria-hidden
6. External links announce new tab to screen readers
7. All text meets WCAG 2.1 AA contrast requirements
8. Build passes without errors
