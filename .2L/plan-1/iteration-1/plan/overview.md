# 2L Iteration 1 Plan - Archive & Foundation

## Project Vision

Transform ahiya.xyz from a philosophical site to a business portfolio while preserving all philosophical content in an accessible archive at `/soul/*`. This iteration focuses on the foundational work: archiving existing content, fixing performance issues, and adding mobile navigation.

## Iteration Scope

**What this iteration accomplishes:**

1. **Archive Philosophical Content** - Move all existing pages to `/soul/*` subdirectory
2. **Fix Performance Issues** - Remove duplicate font loading, optimize images, fix accessibility
3. **Add Mobile Navigation** - Create hamburger menu for mobile users

**What this iteration does NOT do:**

- Create new business homepage (Iteration 2)
- Build portfolio section (Iteration 2)
- Update SEO/metadata for business (Iteration 3)

## Success Criteria

- [ ] All 10 existing pages accessible at `/soul/*` URLs
- [ ] All ~62 internal links updated with `/soul/` prefix
- [ ] 301 redirects configured in `next.config.ts` for SEO preservation
- [ ] No duplicate font loading (single next/font source)
- [ ] Logo images optimized (total < 50KB from current 341KB)
- [ ] `maximumScale: 1` removed from viewport config
- [ ] Mobile hamburger menu functional on all main pages
- [ ] All animations and effects continue working at new URLs
- [ ] No console errors or broken links
- [ ] Lighthouse performance score improved

## Key Deliverables

### Deliverable 1: Archived Content at /soul/*

| Current Path | New Path |
|--------------|----------|
| `/` (homepage) | `/soul/` |
| `/building` | `/soul/building` |
| `/connect` | `/soul/connect` |
| `/journey` | `/soul/journey` |
| `/writing` | `/soul/writing` |
| `/writing/sacred-potato` | `/soul/writing/sacred-potato` |
| `/blueprint/selah` | `/soul/blueprint/selah` |
| `/blueprint/mirror-of-truth` | `/soul/blueprint/mirror-of-truth` |
| `/blueprint/aimafia` | `/soul/blueprint/aimafia` |
| `/blueprint/diveink` | `/soul/blueprint/diveink` |

### Deliverable 2: SEO Redirects

All old URLs permanently redirect (301) to their `/soul/*` equivalents:
- `/journey` -> `/soul/journey`
- `/writing` -> `/soul/writing`
- `/writing/:slug` -> `/soul/writing/:slug`
- `/building` -> `/soul/building`
- `/blueprint/:slug` -> `/soul/blueprint/:slug`
- `/connect` -> `/soul/connect`

### Deliverable 3: Performance Fixes

- Remove CSS @import for fonts (line 2 of globals.css)
- Update CSS to use font CSS variables (`var(--font-inter)`, `var(--font-crimson)`)
- Create optimized logo images (64px, 128px for symbol; 840x420 for text)
- Update favicon/icon configuration with proper sizes
- Remove `maximumScale: 1` from viewport config

### Deliverable 4: Mobile Navigation

- Create `/app/components/MobileNav.tsx` component
- Hamburger icon visible on mobile (< 768px)
- Slide-out menu with all navigation links
- Proper accessibility (ARIA, keyboard, escape key)
- Integrated into journey, connect, writing, building pages

## Estimated Effort

| Phase | Builder | Estimated Time |
|-------|---------|----------------|
| Archive & Links | Builder 1 | 1.5 - 2 hours |
| Performance Fixes | Builder 2 | 1 - 1.5 hours |
| Mobile Navigation | Builder 3 | 1.5 - 2 hours |
| **Total** | **Parallel** | **~2 hours (parallel)** |

## Risk Assessment

### High Risks

**Missing Link Updates**
- Risk: Any missed link results in 404 error
- Mitigation: Use Explorer 1's comprehensive link inventory; test all pages after changes

**Breaking Existing Animations**
- Risk: Moving files could break animation imports or references
- Mitigation: Keep file structure identical under /soul/; test animations on each page

### Medium Risks

**Font CSS Variables Not Applying**
- Risk: After removing @import, fonts might not render correctly
- Mitigation: Update globals.css to use CSS variables before removing @import

**Image Optimization Quality**
- Risk: Resized images could look blurry on retina displays
- Mitigation: Create 2x versions (128px for 64px display)

### Low Risks

**Mobile Nav z-index Conflicts**
- Risk: Menu could appear behind other elements
- Mitigation: Use z-50 (consistent with existing nav patterns)

## Dependencies Between Builders

```
Builder 1 (Archive)     Builder 2 (Performance)     Builder 3 (Mobile Nav)
      |                        |                           |
      v                        v                           v
   No deps                 No deps                     No deps
      |                        |                           |
      +-----------+------------+-----------+---------------+
                  |                        |
                  v                        v
          Integration: All changes merged into same codebase
```

**All builders can work in parallel** - no blocking dependencies.

## Integration Strategy

1. Builder 1 moves files and updates links in `/app/soul/*`
2. Builder 2 modifies `/app/globals.css` and `/app/layout.tsx` (root level)
3. Builder 3 creates new component and modifies pages (which Builder 1 has moved to soul/)

**Potential Conflicts:**
- Builder 3 needs to modify pages that Builder 1 is moving
- Resolution: Builder 3 should work on the files in their final `/soul/` locations
- Builder 1 completes file moves first, then Builder 3 adds MobileNav imports

## Validation Plan

### Automated Checks

```bash
# 1. Build should succeed
npm run build

# 2. No TypeScript errors
npx tsc --noEmit

# 3. Dev server starts
npm run dev
```

### Manual Checks

1. Visit each `/soul/*` URL and verify content loads
2. Click all navigation links and verify no 404s
3. Open Network tab and verify no Google Fonts requests
4. Test mobile navigation on phone or emulator
5. Test pinch-to-zoom on mobile (should work after fix)
6. Run Lighthouse audit and verify performance improvement

## Next Iteration Preview

After this iteration completes, Iteration 2 (Portfolio & Business Content) will:
- Create new `/app/page.tsx` with business-focused homepage
- Build portfolio section with 4 project cards
- Add "How I Work" and Contact sections
- Update navigation to business structure

The `/soul/*` archive will remain untouched after this iteration.
