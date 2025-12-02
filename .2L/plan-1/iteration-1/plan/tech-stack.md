# Technology Stack

## Current Stack (No Changes)

This iteration uses the existing technology stack with no new dependencies.

### Core Framework

**Decision:** Next.js 15 with App Router

**Current Configuration:**
- Next.js 15.x
- React 19
- TypeScript
- App Router (`/app` directory)

**Rationale:**
- Already deployed and working
- App Router supports route groups for `/soul/*` organization
- No migration needed

### Styling

**Decision:** Tailwind CSS 4

**Current Configuration:**
- Tailwind CSS 4.x
- PostCSS with Tailwind integration
- Custom utility classes in `/app/globals.css`

**Key Custom Classes Available:**
- `.breathing-glass` - Frosted glass effect
- `.contemplative-card` - Card styling with blur
- `.gentle-button` - Purple-accented buttons
- `.container-wide`, `.container-content`, `.container-narrow` - Layout containers

### Fonts

**Decision:** next/font (already configured)

**Current Configuration (layout.tsx):**
```typescript
import { Inter, Crimson_Text } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
});
```

**CSS Variables Created:**
- `--font-inter` - Primary sans-serif
- `--font-crimson` - Display/heading serif

**Action Required:** Remove duplicate CSS @import and use CSS variables.

### Icons

**Decision:** lucide-react

**Currently Used Icons:**
- `ArrowLeft`, `ArrowRight` - Navigation
- `Building`, `FileText`, `MapPin`, `MessageCircle` - Section icons
- `BookOpen` - Table of contents

**New Icons Needed for Mobile Nav:**
- `Menu` - Hamburger icon
- `X` - Close icon
- `Home` - Home link icon

**Import Statement:**
```typescript
import { Menu, X, Home, Building, FileText, MapPin, MessageCircle } from "lucide-react";
```

## File Structure Changes

### New Directories to Create

```
app/
├── soul/                      # NEW - Archived philosophical content
│   ├── page.tsx              # Current homepage moves here
│   ├── layout.tsx            # NEW - Soul-specific metadata
│   ├── building/
│   │   └── page.tsx
│   ├── connect/
│   │   └── page.tsx
│   ├── journey/
│   │   └── page.tsx
│   ├── writing/
│   │   ├── page.tsx
│   │   └── sacred-potato/
│   │       └── page.tsx
│   └── blueprint/
│       ├── selah/
│       │   └── page.tsx
│       ├── mirror-of-truth/
│       │   └── page.tsx
│       ├── aimafia/
│       │   └── page.tsx
│       └── diveink/
│           └── page.tsx
├── components/               # NEW - Shared components directory
│   └── MobileNav.tsx        # NEW - Mobile navigation component
├── layout.tsx               # MODIFY - Remove maximumScale, update icons
├── globals.css              # MODIFY - Remove @import, use CSS variables
└── page.tsx                 # KEEP EMPTY or minimal redirect (for now)
```

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
| `app/globals.css` | Remove line 2 (@import), update font-family declarations |
| `app/layout.tsx` | Remove `maximumScale: 1`, update icons configuration |
| All moved page files | Update internal links to use `/soul/` prefix |

### Files to Create

| File | Purpose |
|------|---------|
| `app/soul/layout.tsx` | Metadata for soul section |
| `app/components/MobileNav.tsx` | Mobile navigation component |
| `app/page.tsx` | Temporary placeholder (or redirect) |
| `public/logo-symbol-16.png` | Favicon 16x16 |
| `public/logo-symbol-32.png` | Favicon 32x32 |
| `public/logo-symbol-180.png` | Apple touch icon |

## Configuration Changes

### next.config.ts Redirects

Add 301 redirects for SEO preservation:

```typescript
// next.config.ts
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

### layout.tsx Viewport Fix

**Before:**
```typescript
viewport: {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,  // REMOVE THIS LINE
},
```

**After:**
```typescript
viewport: {
  width: "device-width",
  initialScale: 1,
},
```

### layout.tsx Icons Update

**Before:**
```typescript
icons: {
  icon: "/logo-symbol.png",
  shortcut: "/logo-symbol.png",
  apple: "/logo-symbol.png",
},
```

**After:**
```typescript
icons: {
  icon: [
    { url: "/logo-symbol-32.png", sizes: "32x32", type: "image/png" },
    { url: "/logo-symbol-16.png", sizes: "16x16", type: "image/png" },
  ],
  shortcut: "/logo-symbol-32.png",
  apple: "/logo-symbol-180.png",
},
```

## Dependencies

### Current Dependencies (No Changes)

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.x",
    "@types/react": "^19.x",
    "@types/node": "^20.x"
  }
}
```

**No new dependencies required for this iteration.**

### Image Processing Tools

For logo optimization, use system tools (not npm packages):

```bash
# ImageMagick (should be available on most systems)
convert public/logo-symbol.png -resize 64x64 public/logo-symbol-64.png
convert public/logo-symbol.png -resize 16x16 public/logo-symbol-16.png
convert public/logo-symbol.png -resize 32x32 public/logo-symbol-32.png
convert public/logo-symbol.png -resize 180x180 public/logo-symbol-180.png
convert public/logo-text.png -resize 840x420 public/logo-text-840.png
```

If ImageMagick not available, Sharp can be used via Node script or next/image handles optimization at runtime.

## Environment Variables

**No environment variables needed for this iteration.**

All changes are purely frontend/configuration.

## Performance Targets

### Current State (Estimated)

| Metric | Current | Target |
|--------|---------|--------|
| Font Requests | 2 (CSS + next/font) | 1 |
| Image Payload | 341KB | < 50KB |
| Lighthouse Performance | ~75-85 | 90+ |
| Render-blocking Resources | @import | None |

### Expected Improvements

- **Font loading:** Single optimized request via next/font
- **Image size:** 93% reduction (341KB -> ~25KB)
- **Accessibility:** Zoom enabled (maximumScale removed)
- **Mobile UX:** Navigation accessible on all devices

## Security Considerations

**No security changes in this iteration.**

All changes are static content reorganization and performance optimization. No authentication, API, or data handling changes.
