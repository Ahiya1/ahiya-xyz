# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── layout.tsx            # Root layout (modify for viewport/icons)
│   ├── globals.css           # Global styles (modify for fonts)
│   ├── page.tsx              # New placeholder for root route
│   ├── components/           # NEW: Shared components
│   │   └── MobileNav.tsx     # NEW: Mobile navigation
│   └── soul/                 # NEW: Archived philosophical content
│       ├── layout.tsx        # NEW: Soul-specific metadata
│       ├── page.tsx          # Moved from app/page.tsx
│       ├── building/
│       ├── connect/
│       ├── journey/
│       ├── writing/
│       └── blueprint/
├── public/
│   ├── logo-symbol.png       # Keep original (or replace with optimized)
│   ├── logo-symbol-16.png    # NEW: Favicon 16x16
│   ├── logo-symbol-32.png    # NEW: Favicon 32x32
│   ├── logo-symbol-180.png   # NEW: Apple touch icon
│   └── logo-text.png         # Keep original
└── next.config.ts            # Add redirects
```

## Link Update Patterns

### Pattern 1: Basic href Replacement

**When to use:** Most navigation links

**Find/Replace pairs (apply in this order):**

```
Find:    href="/building"
Replace: href="/soul/building"

Find:    href="/writing"
Replace: href="/soul/writing"

Find:    href="/journey"
Replace: href="/soul/journey"

Find:    href="/connect"
Replace: href="/soul/connect"

Find:    href="/blueprint/
Replace: href="/soul/blueprint/

Find:    href="/"
Replace: href="/soul/"
```

**IMPORTANT:** For `href="/"`, only replace in files that are moving to `/soul/*`. Do NOT replace external URLs or the root route that will become the new homepage.

### Pattern 2: Dynamic Link Arrays

**When to use:** Data arrays with link properties

**Location:** `/app/soul/writing/page.tsx` (after move)

**Before:**
```typescript
const writings: Writing[] = [
  {
    link: "/writing/sacred-potato",
    // ...
  },
  {
    link: "/writing/sacred-wound",
    // ...
  },
  {
    link: "/writing/edge-space",
    // ...
  },
];
```

**After:**
```typescript
const writings: Writing[] = [
  {
    link: "/soul/writing/sacred-potato",
    // ...
  },
  {
    link: "/soul/writing/sacred-wound",
    // ...
  },
  {
    link: "/soul/writing/edge-space",
    // ...
  },
];
```

**Location:** `/app/soul/building/page.tsx` (after move)

**Before:**
```typescript
const projects: Project[] = [
  {
    blueprintLink: "/blueprint/selah",
    // ...
  },
  // ...
];
```

**After:**
```typescript
const projects: Project[] = [
  {
    blueprintLink: "/soul/blueprint/selah",
    // ...
  },
  // ...
];
```

### Pattern 3: Navigation Array

**When to use:** Pages with navigation defined as array

**Location:** `/app/soul/building/page.tsx` (after move)

**Before:**
```typescript
{[
  { name: "Home", href: "/" },
  { name: "Journey", href: "/journey" },
  { name: "Writing", href: "/writing" },
  { name: "Connect", href: "/connect" },
].map((item) => (
```

**After:**
```typescript
{[
  { name: "Home", href: "/soul/" },
  { name: "Journey", href: "/soul/journey" },
  { name: "Writing", href: "/soul/writing" },
  { name: "Connect", href: "/soul/connect" },
].map((item) => (
```

### Pattern 4: Hash Links

**When to use:** Links with anchor fragments

**Example:**
```
Before: href="/building#selah"
After:  href="/soul/building#selah"
```

### Pattern 5: External Links (DO NOT MODIFY)

These patterns should NOT be modified:

```typescript
// Email links - KEEP AS IS
href="mailto:ahiya.butman@gmail.com"

// External URLs - KEEP AS IS
href="https://mirror-of-truth.xyz"
href="https://github.com/..."

// liveLink variables in blueprint pages - KEEP AS IS
liveLink="https://mirror-of-truth.xyz"
```

## Soul Layout Pattern

### Create Soul-Specific Layout

**File:** `/app/soul/layout.tsx`

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

**Key Points:**
- Preserves original philosophical metadata
- Uses template for page-specific titles
- Wraps children without additional markup (layout already in root)

## Font CSS Variable Pattern

### Update globals.css Font References

**Pattern for body font:**

**Before (line ~23):**
```css
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  /* ... */
}
```

**After:**
```css
body {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
  /* ... */
}
```

**Pattern for display/heading fonts:**

**Before (lines ~126, 135, 168):**
```css
.display-xl {
  font-family: "Crimson Text", Georgia, serif;
  /* ... */
}
```

**After:**
```css
.display-xl {
  font-family: var(--font-crimson), Georgia, serif;
  /* ... */
}
```

### Remove @import

**File:** `/app/globals.css`

**Before (lines 1-4):**
```css
/* Sacred Potato CSS - Contemplative Technology */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap");

@import "tailwindcss";
```

**After (lines 1-3):**
```css
/* Sacred Potato CSS - Contemplative Technology */

@import "tailwindcss";
```

## Image Optimization Commands

### Create Optimized Logo Images

Using ImageMagick (preferred):

```bash
cd /home/ahiya/Ahiya/2L/Prod/ahiya-xyz

# Create favicon sizes
convert public/logo-symbol.png -resize 16x16 public/logo-symbol-16.png
convert public/logo-symbol.png -resize 32x32 public/logo-symbol-32.png
convert public/logo-symbol.png -resize 180x180 public/logo-symbol-180.png

# Optional: Replace main logo with optimized version
convert public/logo-symbol.png -resize 128x128 public/logo-symbol-optimized.png
convert public/logo-text.png -resize 840x420 public/logo-text-optimized.png
```

Alternative with WebP output:

```bash
# WebP versions (smaller file size)
convert public/logo-symbol.png -resize 64x64 -quality 85 public/logo-symbol-64.webp
convert public/logo-text.png -resize 840x420 -quality 85 public/logo-text-840.webp
```

### Icons Configuration Update

**File:** `/app/layout.tsx`

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

## MobileNav Component Pattern

### Complete Component Implementation

**File:** `/app/components/MobileNav.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Building, FileText, MapPin, MessageCircle } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/soul/", icon: Home },
  { label: "Journey", href: "/soul/journey", icon: MapPin },
  { label: "Building", href: "/soul/building", icon: Building },
  { label: "Writing", href: "/soul/writing", icon: FileText },
  { label: "Connect", href: "/soul/connect", icon: MessageCircle },
];

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/soul/" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/soul/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium text-white">Ahiya</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.filter(item => item.href !== "/soul/").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-slate-300 hover:text-white transition-colors ${
                    currentPath === item.href ? "text-purple-300" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="fixed top-16 right-0 bottom-0 w-72 max-w-[80vw] bg-[#0a0f1a]/95 backdrop-blur-xl border-l border-white/10 z-40 md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="p-6">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive
                          ? "bg-purple-500/15 text-purple-200 border border-purple-500/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Sacred Quote */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <span className="text-3xl block mb-3">&#x1F954;</span>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    &quot;Technology that serves presence,
                    <br />
                    not productivity.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MobileNav;
```

**Key Points:**
- Uses `"use client"` directive for interactivity
- Implements body scroll lock
- Handles Escape key to close
- Click-outside closes menu
- ARIA attributes for accessibility
- Purple accent for active state
- Matches existing site aesthetic

### Integrating MobileNav into Pages

**Pattern for page integration:**

**File:** Each page in `/app/soul/` that needs navigation

**Replace existing nav section with:**

```typescript
import { MobileNav } from "@/app/components/MobileNav";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <MobileNav currentPath="/soul/journey" />

      {/* Add padding-top to account for fixed nav */}
      <main className="pt-16">
        {/* Page content... */}
      </main>
    </div>
  );
}
```

**currentPath values:**
- `/soul/` - Home (soul)
- `/soul/journey` - Journey page
- `/soul/building` - Building page
- `/soul/writing` - Writing page
- `/soul/connect` - Connect page

## Next.config.ts Redirects Pattern

### Add Redirects Configuration

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/next.config.ts`

**Full Configuration:**

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

**Note:** Do NOT add redirect for `/` to `/soul/` - the root will become the new business homepage in Iteration 2.

## Viewport Configuration Pattern

### Remove maximumScale

**File:** `/app/layout.tsx`

**Location:** Find the `viewport` export or property

**Before:**
```typescript
viewport: {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
},
```

**After:**
```typescript
viewport: {
  width: "device-width",
  initialScale: 1,
},
```

## Import Order Convention

Follow this order for imports in all files:

```typescript
// 1. React and core libraries
import React, { useState, useEffect } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// 3. Third-party libraries
import { Menu, X, Home } from "lucide-react";

// 4. Internal components
import { MobileNav } from "@/app/components/MobileNav";

// 5. Types (if separate file)
import type { NavItem } from "@/types";

// 6. Styles (if any CSS imports)
import "./styles.css";
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MobileNav.tsx` |
| Page files | lowercase page.tsx | `page.tsx` |
| Utility files | camelCase | `formatDate.ts` |
| CSS classes | kebab-case | `mobile-nav-button` |
| TypeScript interfaces | PascalCase | `NavItem` |
| Props interfaces | PascalCase + Props | `MobileNavProps` |

## Testing Patterns

### Verify Link Updates

After modifying links, verify with:

```bash
# Search for old links that should have been updated
grep -r 'href="/' app/soul/ | grep -v 'href="/soul'
```

This should return no results if all links are updated (except external URLs).

### Verify No Console Errors

```bash
npm run dev
# Open browser to http://localhost:3000/soul/
# Open DevTools Console
# Navigate through all pages
# Should see no 404 or routing errors
```

### Verify Font Loading

```bash
npm run build
npm run start
# Open Network tab, filter by "font"
# Should see NO requests to fonts.googleapis.com
# Should see fonts served from /_next/static/media/
```

## Error Handling

No specific error handling needed for this iteration - all changes are static content and configuration.

If 404 errors occur:
1. Check that all files were moved correctly
2. Verify all links updated with `/soul/` prefix
3. Confirm redirects are working in `next.config.ts`
