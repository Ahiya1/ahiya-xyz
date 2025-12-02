# Builder Task Breakdown

## Overview

**3 primary builders** will work in parallel with no blocking dependencies.

| Builder | Focus | Complexity | Est. Time |
|---------|-------|------------|-----------|
| Builder 1 | Archive & Links | MEDIUM | 1.5-2 hours |
| Builder 2 | Performance Fixes | LOW-MEDIUM | 1-1.5 hours |
| Builder 3 | Mobile Navigation | LOW-MEDIUM | 1.5-2 hours |

**Total estimated time:** ~2 hours (parallel execution)

---

## Builder-1: Archive & Links

### Scope

Move all existing philosophical content to `/soul/*` subdirectory, update all internal links, add SEO redirects, and create the soul-specific layout.

### Complexity Estimate

**MEDIUM**

- 10 files to move
- ~62 links to update
- Systematic but requires careful attention

### Success Criteria

- [ ] All 10 page files moved to `/app/soul/*` structure
- [ ] All ~62 internal links updated with `/soul/` prefix
- [ ] `/app/soul/layout.tsx` created with philosophical metadata
- [ ] `next.config.ts` has all 301 redirects configured
- [ ] Placeholder `/app/page.tsx` created for root route
- [ ] All pages render correctly at new URLs
- [ ] All navigation links work (no 404s)
- [ ] Hash links work (e.g., `/soul/building#selah`)

### Files to Create

| File | Purpose |
|------|---------|
| `/app/soul/layout.tsx` | Soul-specific metadata |
| `/app/page.tsx` | Placeholder for root (will be replaced in Iteration 2) |

### Files to Move

| From | To |
|------|-----|
| `app/page.tsx` | `app/soul/page.tsx` |
| `app/building/page.tsx` | `app/soul/building/page.tsx` |
| `app/connect/page.tsx` | `app/soul/connect/page.tsx` |
| `app/journey/page.tsx` | `app/soul/journey/page.tsx` |
| `app/writing/page.tsx` | `app/soul/writing/page.tsx` |
| `app/writing/sacred-potato/page.tsx` | `app/soul/writing/sacred-potato/page.tsx` |
| `app/blueprint/selah/page.tsx` | `app/soul/blueprint/selah/page.tsx` |
| `app/blueprint/mirror-of-truth/page.tsx` | `app/soul/blueprint/mirror-of-truth/page.tsx` |
| `app/blueprint/aimafia/page.tsx` | `app/soul/blueprint/aimafia/page.tsx` |
| `app/blueprint/diveink/page.tsx` | `app/soul/blueprint/diveink/page.tsx` |

### Files to Modify

| File | Changes |
|------|---------|
| `next.config.ts` | Add redirects array |
| All moved page files | Update internal links |

### Exact Changes Needed

#### Step 1: Create Directory Structure

```bash
cd /home/ahiya/Ahiya/2L/Prod/ahiya-xyz
mkdir -p app/soul/building
mkdir -p app/soul/connect
mkdir -p app/soul/journey
mkdir -p app/soul/writing/sacred-potato
mkdir -p app/soul/blueprint/selah
mkdir -p app/soul/blueprint/mirror-of-truth
mkdir -p app/soul/blueprint/aimafia
mkdir -p app/soul/blueprint/diveink
```

#### Step 2: Move Files

```bash
# Move main pages
mv app/page.tsx app/soul/page.tsx
mv app/building/page.tsx app/soul/building/page.tsx
mv app/connect/page.tsx app/soul/connect/page.tsx
mv app/journey/page.tsx app/soul/journey/page.tsx
mv app/writing/page.tsx app/soul/writing/page.tsx
mv app/writing/sacred-potato/page.tsx app/soul/writing/sacred-potato/page.tsx

# Move blueprint pages
mv app/blueprint/selah/page.tsx app/soul/blueprint/selah/page.tsx
mv app/blueprint/mirror-of-truth/page.tsx app/soul/blueprint/mirror-of-truth/page.tsx
mv app/blueprint/aimafia/page.tsx app/soul/blueprint/aimafia/page.tsx
mv app/blueprint/diveink/page.tsx app/soul/blueprint/diveink/page.tsx

# Clean up empty directories
rmdir app/writing/sacred-potato app/writing
rmdir app/blueprint/selah app/blueprint/mirror-of-truth app/blueprint/aimafia app/blueprint/diveink app/blueprint
rmdir app/building app/connect app/journey
```

#### Step 3: Update Links in Each File

See `patterns.md` for detailed find/replace patterns. Key changes:

**For each file in `/app/soul/`:**
1. `href="/"` -> `href="/soul/"`
2. `href="/building"` -> `href="/soul/building"`
3. `href="/writing"` -> `href="/soul/writing"`
4. `href="/journey"` -> `href="/soul/journey"`
5. `href="/connect"` -> `href="/soul/connect"`
6. `href="/blueprint/` -> `href="/soul/blueprint/`
7. `link: "/writing/` -> `link: "/soul/writing/`
8. `blueprintLink: "/blueprint/` -> `blueprintLink: "/soul/blueprint/`

**Link counts by file (from Explorer 1):**
- `app/soul/page.tsx`: 7 links
- `app/soul/building/page.tsx`: 10 links
- `app/soul/writing/page.tsx`: 11 links
- `app/soul/journey/page.tsx`: 9 links
- `app/soul/connect/page.tsx`: 5 links
- `app/soul/blueprint/selah/page.tsx`: 4 links
- `app/soul/blueprint/mirror-of-truth/page.tsx`: 3 links
- `app/soul/blueprint/aimafia/page.tsx`: 4 links
- `app/soul/blueprint/diveink/page.tsx`: 4 links
- `app/soul/writing/sacred-potato/page.tsx`: 5 links

#### Step 4: Create Soul Layout

Create `/app/soul/layout.tsx`:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Ahiya - Soul",
    default: "Ahiya - Technology that serves presence",
  },
  description: "Building contemplative technology from Sacred Potato energy. Consciousness through code.",
  keywords: [
    "contemplative technology",
    "consciousness",
    "sacred potato",
    "presence",
    "spiritual technology",
  ],
};

export default function SoulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

#### Step 5: Create Placeholder Root Page

Create `/app/page.tsx`:

```typescript
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-slate-400 mb-8">Business portfolio under construction</p>
        <Link
          href="/soul/"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Visit the philosophical side
        </Link>
      </div>
    </div>
  );
}
```

#### Step 6: Add Redirects to next.config.ts

Modify `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/journey",
        destination: "/soul/journey",
        permanent: true,
      },
      {
        source: "/writing",
        destination: "/soul/writing",
        permanent: true,
      },
      {
        source: "/writing/:slug",
        destination: "/soul/writing/:slug",
        permanent: true,
      },
      {
        source: "/building",
        destination: "/soul/building",
        permanent: true,
      },
      {
        source: "/blueprint/:slug",
        destination: "/soul/blueprint/:slug",
        permanent: true,
      },
      {
        source: "/connect",
        destination: "/soul/connect",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

### Validation Criteria

```bash
# 1. Build succeeds
npm run build

# 2. Dev server starts
npm run dev

# 3. Visit each soul page manually:
# http://localhost:3000/soul/
# http://localhost:3000/soul/journey
# http://localhost:3000/soul/building
# http://localhost:3000/soul/writing
# http://localhost:3000/soul/connect
# http://localhost:3000/soul/writing/sacred-potato
# http://localhost:3000/soul/blueprint/selah
# http://localhost:3000/soul/blueprint/mirror-of-truth
# http://localhost:3000/soul/blueprint/aimafia
# http://localhost:3000/soul/blueprint/diveink

# 4. Test redirects:
# http://localhost:3000/journey -> redirects to /soul/journey
# http://localhost:3000/building -> redirects to /soul/building
# etc.

# 5. Click all navigation links on each page - no 404s

# 6. Search for missed links
grep -r 'href="/' app/soul/ | grep -v 'href="/soul' | grep -v 'mailto:' | grep -v 'https://'
# Should return no results
```

### Dependencies

**Depends on:** None
**Blocks:** Builder 3 needs to modify files at their final `/soul/*` locations

### Implementation Notes

1. **Order matters:** Move files first, then update links, then create layout
2. **Be careful with `/` replacement:** Only replace in files moving to soul, not in external URLs
3. **Preserve external links:** `mailto:` and `https://` links should NOT be modified
4. **Watch for dynamic links:** The `writings` array and `projects` array have link properties that need updating

---

## Builder-2: Performance Fixes

### Scope

Remove duplicate font loading, update CSS to use font CSS variables, remove accessibility-violating viewport restriction, and create optimized logo images.

### Complexity Estimate

**LOW-MEDIUM**

- Few files to modify
- Straightforward changes
- Image optimization requires tools

### Success Criteria

- [ ] Line 2 removed from `globals.css` (font @import)
- [ ] CSS font-family declarations use CSS variables
- [ ] `maximumScale: 1` removed from viewport config
- [ ] Optimized logo images created (16px, 32px, 180px)
- [ ] Icons configuration updated in layout.tsx
- [ ] No Google Fonts requests in Network tab
- [ ] Pinch-to-zoom works on mobile
- [ ] Fonts render correctly on all pages

### Files to Create

| File | Purpose |
|------|---------|
| `public/logo-symbol-16.png` | Favicon 16x16 |
| `public/logo-symbol-32.png` | Favicon 32x32 |
| `public/logo-symbol-180.png` | Apple touch icon |

### Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Remove @import, update font-family |
| `app/layout.tsx` | Remove maximumScale, update icons |

### Exact Changes Needed

#### Step 1: Remove Font @import

**File:** `/app/globals.css`

**Line 2 - DELETE this line:**
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap");
```

#### Step 2: Update Font-Family Declarations

**File:** `/app/globals.css`

Find all `font-family` declarations that use hardcoded font names and update:

**Line ~23 (body):**
```css
/* Before */
font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

/* After */
font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
```

**Lines ~126, 135, 168 (display classes):**
```css
/* Before */
font-family: "Crimson Text", Georgia, serif;

/* After */
font-family: var(--font-crimson), Georgia, serif;
```

#### Step 3: Remove maximumScale

**File:** `/app/layout.tsx`

**Find viewport configuration (around line 68-72):**

```typescript
// Before
viewport: {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,  // DELETE THIS LINE
},

// After
viewport: {
  width: "device-width",
  initialScale: 1,
},
```

#### Step 4: Create Optimized Logo Images

```bash
cd /home/ahiya/Ahiya/2L/Prod/ahiya-xyz

# Check if ImageMagick is available
which convert

# Create favicon sizes
convert public/logo-symbol.png -resize 16x16 public/logo-symbol-16.png
convert public/logo-symbol.png -resize 32x32 public/logo-symbol-32.png
convert public/logo-symbol.png -resize 180x180 public/logo-symbol-180.png
```

**If ImageMagick not available, alternatives:**

Option A: Use online tool (e.g., Squoosh) to resize
Option B: Use Node.js sharp:
```javascript
const sharp = require('sharp');
sharp('public/logo-symbol.png').resize(16, 16).toFile('public/logo-symbol-16.png');
sharp('public/logo-symbol.png').resize(32, 32).toFile('public/logo-symbol-32.png');
sharp('public/logo-symbol.png').resize(180, 180).toFile('public/logo-symbol-180.png');
```

#### Step 5: Update Icons Configuration

**File:** `/app/layout.tsx`

**Find icons configuration (around lines 73-77):**

```typescript
// Before
icons: {
  icon: "/logo-symbol.png",
  shortcut: "/logo-symbol.png",
  apple: "/logo-symbol.png",
},

// After
icons: {
  icon: [
    { url: "/logo-symbol-32.png", sizes: "32x32", type: "image/png" },
    { url: "/logo-symbol-16.png", sizes: "16x16", type: "image/png" },
  ],
  shortcut: "/logo-symbol-32.png",
  apple: "/logo-symbol-180.png",
},
```

### Validation Criteria

```bash
# 1. Build succeeds
npm run build

# 2. Start production server
npm run start

# 3. Check Network tab for font requests
# Open DevTools > Network > Filter by "font"
# Should see NO requests to fonts.googleapis.com
# Should see fonts from /_next/static/media/

# 4. Check viewport meta tag
# View page source or Elements tab
# <meta name="viewport"> should NOT contain "maximum-scale=1"

# 5. Test pinch-to-zoom on mobile device or emulator
# Should be able to zoom in and out

# 6. Visual check fonts on multiple pages
# Text should render with correct Inter and Crimson fonts

# 7. Check favicon in browser tab
# Should show logo-symbol

# 8. Check file sizes
ls -lh public/logo-symbol*.png
# logo-symbol-16.png should be < 1KB
# logo-symbol-32.png should be < 2KB
# logo-symbol-180.png should be < 20KB
```

### Dependencies

**Depends on:** None
**Blocks:** None

### Implementation Notes

1. **Test fonts after @import removal:** Ensure CSS variables are properly set up before removing @import
2. **Verify file creation:** Ensure all 3 new icon files are created before updating layout.tsx
3. **Browser cache:** May need hard refresh to see favicon changes
4. **Fallback fonts:** The fallback stack (`-apple-system, BlinkMacSystemFont, sans-serif`) will show if variables not connected

---

## Builder-3: Mobile Navigation

### Scope

Create a reusable MobileNav component with hamburger menu for mobile devices, and integrate it into the 4 main pages (journey, connect, writing, building).

### Complexity Estimate

**LOW-MEDIUM**

- Single component to create
- 4 pages to update
- Straightforward React patterns

### Success Criteria

- [ ] `MobileNav.tsx` component created at `/app/components/`
- [ ] Hamburger icon visible on mobile (< 768px)
- [ ] Menu opens/closes on button click
- [ ] Menu closes on Escape key press
- [ ] Menu closes on click outside
- [ ] Body scroll locked when menu open
- [ ] All 5 navigation links functional
- [ ] Active page highlighted with purple accent
- [ ] Component integrated into 4 pages
- [ ] ARIA attributes for accessibility

### Files to Create

| File | Purpose |
|------|---------|
| `/app/components/MobileNav.tsx` | Mobile navigation component |

### Files to Modify

| File | Changes |
|------|---------|
| `/app/soul/journey/page.tsx` | Replace nav with MobileNav |
| `/app/soul/connect/page.tsx` | Replace nav with MobileNav |
| `/app/soul/writing/page.tsx` | Replace nav with MobileNav |
| `/app/soul/building/page.tsx` | Replace nav with MobileNav |

### Exact Changes Needed

#### Step 1: Create Components Directory

```bash
mkdir -p /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components
```

#### Step 2: Create MobileNav Component

Create `/app/components/MobileNav.tsx` with the full implementation from `patterns.md`.

**Key implementation points:**
- Uses `"use client"` directive
- Imports `Menu`, `X`, `Home`, `Building`, `FileText`, `MapPin`, `MessageCircle` from lucide-react
- Links point to `/soul/*` paths
- Accepts `currentPath` prop for active state
- Implements body scroll lock via `useEffect`
- Handles Escape key to close
- Backdrop click closes menu

#### Step 3: Update Journey Page

**File:** `/app/soul/journey/page.tsx`

**At top of file, add import:**
```typescript
import { MobileNav } from "@/app/components/MobileNav";
```

**Find existing nav section (around lines 185-220) and replace:**

```typescript
// REPLACE THIS (existing desktop-only nav):
<nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
  <div className="container-wide">
    <div className="flex items-center justify-between h-16">
      <Link href="/" className="flex items-center space-x-3 group">
        <Image src="/logo-symbol.png" alt="Ahiya" width={28} height={28} />
        <span className="text-lg font-medium">Ahiya</span>
      </Link>
      <div className="hidden md:flex items-center space-x-8">
        {/* ... nav links ... */}
      </div>
    </div>
  </div>
</nav>

// WITH THIS:
<MobileNav currentPath="/soul/journey" />
```

**Note:** Keep the rest of the page unchanged.

#### Step 4: Update Connect Page

**File:** `/app/soul/connect/page.tsx`

Same pattern as Journey:
1. Add import at top
2. Replace nav section with `<MobileNav currentPath="/soul/connect" />`

#### Step 5: Update Writing Page

**File:** `/app/soul/writing/page.tsx`

Same pattern:
1. Add import at top
2. Replace nav section with `<MobileNav currentPath="/soul/writing" />`

#### Step 6: Update Building Page

**File:** `/app/soul/building/page.tsx`

Same pattern:
1. Add import at top
2. Replace nav section with `<MobileNav currentPath="/soul/building" />`

### Validation Criteria

```bash
# 1. Build succeeds
npm run build

# 2. Dev server starts
npm run dev

# 3. Desktop test (> 768px width):
# - Navigate to /soul/journey, /soul/building, /soul/writing, /soul/connect
# - Verify desktop nav links still visible
# - Verify no hamburger icon visible

# 4. Mobile test (< 768px width or use DevTools device mode):
# - Verify hamburger icon visible
# - Click hamburger - menu opens
# - Click link - navigates and menu closes
# - Open menu, press Escape - menu closes
# - Open menu, click backdrop - menu closes
# - Verify current page highlighted with purple

# 5. Accessibility test:
# - Tab through menu items
# - Verify screen reader announces "Open menu" / "Close menu"
# - Verify modal has role="dialog"

# 6. Scroll lock test:
# - On long page, scroll down
# - Open menu
# - Try to scroll background - should be locked
# - Close menu - scroll should work again
```

### Dependencies

**Depends on:** Builder 1 (files must be at `/soul/*` locations)
**Blocks:** None

### Implementation Notes

1. **Wait for Builder 1:** Files need to be moved to `/soul/*` before modifying
2. **Keep existing nav as fallback:** Desktop nav is preserved in MobileNav component
3. **Test on real device:** Viewport emulation may miss touch interaction issues
4. **Icon imports:** Ensure all needed icons are imported from lucide-react
5. **Active state:** The `currentPath` prop must match exactly (e.g., `/soul/journey` not `/soul/journey/`)

---

## Builder Execution Order

### Parallel Group (No Dependencies)

All 3 builders can start immediately:

```
+-----------------+     +-----------------+     +-----------------+
|   Builder 1     |     |   Builder 2     |     |   Builder 3     |
|  Archive/Links  |     |  Performance    |     |  Mobile Nav     |
|                 |     |                 |     |                 |
| - Move files    |     | - Remove @import|     | - Create        |
| - Update links  |     | - CSS variables |     |   MobileNav.tsx |
| - Add redirects |     | - Viewport fix  |     | - Wait for B1   |
| - Soul layout   |     | - Logo images   |     | - Integrate to  |
|                 |     | - Icons config  |     |   4 pages       |
+-----------------+     +-----------------+     +-----------------+
       |                       |                       |
       v                       v                       v
+-----------------------------------------------------------------+
|                      Integration Phase                           |
|  - All changes merged to same codebase                          |
|  - Run npm run build to verify                                  |
|  - Test all functionality                                       |
+-----------------------------------------------------------------+
```

**Coordination Note:** Builder 3 should wait for Builder 1 to complete file moves before modifying pages to add MobileNav. Builder 3 can create the MobileNav component while waiting.

### Integration Notes

**Shared files:**
- `app/layout.tsx` - Modified only by Builder 2
- `app/globals.css` - Modified only by Builder 2
- `next.config.ts` - Modified only by Builder 1

**No conflicts expected** - each builder modifies different files.

**Final verification after all builders complete:**

```bash
# Full build test
npm run build

# Start server
npm run dev

# Test checklist:
# [ ] /soul/ loads correctly
# [ ] All 10 soul pages accessible
# [ ] All navigation links work
# [ ] Mobile hamburger menu works
# [ ] No font loading from Google CDN
# [ ] Pinch-to-zoom works on mobile
# [ ] Favicon displays correctly
# [ ] Redirects work (/journey -> /soul/journey)
# [ ] No console errors
```
