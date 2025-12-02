# Explorer 1 Report: Archive Structure & Link Analysis

## Executive Summary

The ahiya.xyz site consists of 11 page files across 4 main sections (home, building, writing, journey, connect) plus 4 blueprint pages and 1 writing article. There are approximately **85 internal link references** that will need updating when moving content to /soul/*. The navigation structure is consistent across pages with some variation in implementation (inline arrays vs direct Link components).

## Pages to Archive

All current pages need to be moved from their current location to `/soul/*`:

| Current Path | Target Path | File Location |
|--------------|-------------|---------------|
| `/` (homepage) | `/soul/` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` |
| `/building` | `/soul/building` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/building/page.tsx` |
| `/writing` | `/soul/writing` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/writing/page.tsx` |
| `/journey` | `/soul/journey` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/journey/page.tsx` |
| `/connect` | `/soul/connect` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/connect/page.tsx` |
| `/blueprint/selah` | `/soul/blueprint/selah` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/selah/page.tsx` |
| `/blueprint/mirror-of-truth` | `/soul/blueprint/mirror-of-truth` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/mirror-of-truth/page.tsx` |
| `/blueprint/aimafia` | `/soul/blueprint/aimafia` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/aimafia/page.tsx` |
| `/blueprint/diveink` | `/soul/blueprint/diveink` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/diveink/page.tsx` |
| `/writing/sacred-potato` | `/soul/writing/sacred-potato` | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/writing/sacred-potato/page.tsx` |

**Additional files to consider:**
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx` - Root layout (stays in place)
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` - Global CSS (stays in place)

## Internal Link Inventory

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` (Homepage)

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 29 | `<Link href="/"` | `/soul/` |
| 135 | `<Link href="/building"` | `/soul/building` |
| 182 | `<Link href="/writing"` | `/soul/writing` |
| 227 | `<Link href="/journey"` | `/soul/journey` |
| 305 | `<Link href="/building"` | `/soul/building` |
| 308 | `<Link href="/building#selah"` | `/soul/building#selah` |
| 329 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/building/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 802 | `blueprintLink: "/blueprint/selah"` | `/soul/blueprint/selah` |
| 817 | `blueprintLink: "/blueprint/mirror-of-truth"` | `/soul/blueprint/mirror-of-truth` |
| 832 | `blueprintLink: "/blueprint/aimafia"` | `/soul/blueprint/aimafia` |
| 851 | `blueprintLink: "/blueprint/diveink"` | `/soul/blueprint/diveink` |
| 941 | `<Link href="/"` | `/soul/` |
| 954 | `{ name: "Home", href: "/" }` | `/soul/` |
| 955 | `{ name: "Journey", href: "/journey" }` | `/soul/journey` |
| 956 | `{ name: "Writing", href: "/writing" }` | `/soul/writing` |
| 957 | `{ name: "Connect", href: "/connect" }` | `/soul/connect` |
| 1170 | `href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/writing/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 39 | `link: "/writing/sacred-potato"` | `/soul/writing/sacred-potato` |
| 53 | `link: "/writing/sacred-wound"` | `/soul/writing/sacred-wound` |
| 66 | `link: "/writing/edge-space"` | `/soul/writing/edge-space` |
| 85 | `<Link href="/"` | `/soul/` |
| 98 | `href="/"` | `/soul/` |
| 104 | `href="/journey"` | `/soul/journey` |
| 110 | `href="/building"` | `/soul/building` |
| 116 | `href="/connect"` | `/soul/connect` |
| 164 | `<Link href={featured.link}` | Dynamic - uses `link` property |
| 218-220 | `<Link href={writing.link}` | Dynamic - uses `link` property |
| 321 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/journey/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 185 | `<Link href="/"` | `/soul/` |
| 198 | `href="/"` | `/soul/` |
| 204 | `href="/building"` | `/soul/building` |
| 210 | `href="/writing"` | `/soul/writing` |
| 216 | `href="/connect"` | `/soul/connect` |
| 509 | `<Link href="/building"` | `/soul/building` |
| 597 | `href="/building"` | `/soul/building` |
| 615 | `href="/writing"` | `/soul/writing` |
| 638 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/connect/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 73 | `<Link href="/"` | `/soul/` |
| 86 | `href="/"` | `/soul/` |
| 92 | `href="/journey"` | `/soul/journey` |
| 98 | `href="/building"` | `/soul/building` |
| 104 | `href="/writing"` | `/soul/writing` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/selah/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 205 | `<Link href="/"` | `/soul/` |
| 218 | `href="/building"` | `/soul/building` |
| 503 | `<Link href="/building"` | `/soul/building` |
| 506 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/mirror-of-truth/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 149 | `<Link href="/"` | `/soul/` |
| 162 | `href="/building"` | `/soul/building` |
| 555 | `<Link href="/building"` | `/soul/building` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/aimafia/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 130 | `<Link href="/"` | `/soul/` |
| 143 | `href="/building"` | `/soul/building` |
| 576 | `<Link href="/building"` | `/soul/building` |
| 579 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/blueprint/diveink/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 124 | `<Link href="/"` | `/soul/` |
| 137 | `href="/building"` | `/soul/building` |
| 540 | `<Link href="/building"` | `/soul/building` |
| 543 | `<Link href="/connect"` | `/soul/connect` |

### File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/writing/sacred-potato/page.tsx`

| Line | Current Link | Target Link |
|------|--------------|-------------|
| 62 | `<Link href="/"` | `/soul/` |
| 75 | `href="/writing"` | `/soul/writing` |
| 2287 | `<Link href="/writing"` | `/soul/writing` |
| 2290 | `<Link href="/journey"` | `/soul/journey` |
| 2293 | `<Link href="/connect"` | `/soul/connect` |

## Navigation Components

### Pattern 1: Navigation Array (building/page.tsx)
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/building/page.tsx`, lines 953-958
```typescript
{[
  { name: "Home", href: "/" },
  { name: "Journey", href: "/journey" },
  { name: "Writing", href: "/writing" },
  { name: "Connect", href: "/connect" },
].map((item) => (
```

### Pattern 2: Direct Link Components (all other pages)
Most pages use inline Link components for navigation:
```tsx
<Link href="/" className="flex items-center space-x-3 group">
  // Logo
</Link>
<Link href="/journey" className="text-slate-300 hover:text-white">Journey</Link>
<Link href="/building" className="text-slate-300 hover:text-white">Building</Link>
// etc.
```

### Pattern 3: Dynamic Links from Data Arrays
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/writing/page.tsx`, lines 28-69
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
  // ...
];
```

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/building/page.tsx`, lines 793-862
```typescript
const projects: Project[] = [
  {
    blueprintLink: "/blueprint/selah",
    // ...
  },
  // ...
];
```

## Special Considerations

### 1. Hash Links
- Line 308 in `page.tsx`: `href="/building#selah"` - needs to become `/soul/building#selah`

### 2. External Links (DO NOT MODIFY)
- `href="mailto:ahiya.butman@gmail.com"` - Multiple occurrences in connect page
- `href="https://mirror-of-truth.xyz"` - External live link in mirror-of-truth blueprint
- `liveLink` variables in blueprint pages - These are external URLs

### 3. Dynamic Link Construction
The `writings` array in `/writing/page.tsx` and `projects` array in `/building/page.tsx` use string literals for links. These are used with `<Link href={writing.link}>` and `<Link href={project.blueprintLink}>` patterns.

### 4. Logo Navigation
Every page has a logo that links to home (`href="/"`). This appears at:
- Navigation bar (top of page)
- Footer section

### 5. Pages Referenced But Not Existing
Two writing articles are referenced but don't have pages yet:
- `/writing/sacred-wound` (referenced but no page file exists)
- `/writing/edge-space` (referenced but no page file exists)

These should either:
- Be moved to `/soul/writing/sacred-wound` and `/soul/writing/edge-space` when created
- Have placeholder pages created
- Be commented out in the writings array

### 6. Anchor/ID References
`/building#selah` assumes there's an element with `id="selah"` in the building page. Need to verify this ID exists.

## Link Update Summary

### Total Links by Route:
| Route | Count | Change To |
|-------|-------|-----------|
| `/` | 11 | `/soul/` |
| `/building` | 17 | `/soul/building` |
| `/writing` | 8 | `/soul/writing` |
| `/journey` | 7 | `/soul/journey` |
| `/connect` | 11 | `/soul/connect` |
| `/blueprint/selah` | 1 | `/soul/blueprint/selah` |
| `/blueprint/mirror-of-truth` | 1 | `/soul/blueprint/mirror-of-truth` |
| `/blueprint/aimafia` | 1 | `/soul/blueprint/aimafia` |
| `/blueprint/diveink` | 1 | `/soul/blueprint/diveink` |
| `/writing/sacred-potato` | 1 | `/soul/writing/sacred-potato` |
| `/writing/sacred-wound` | 1 | `/soul/writing/sacred-wound` |
| `/writing/edge-space` | 1 | `/soul/writing/edge-space` |
| `/building#selah` | 1 | `/soul/building#selah` |

**TOTAL: ~62 direct link changes needed**

## Recommended Approach

### Phase 1: Create Directory Structure
```bash
mkdir -p app/soul/building
mkdir -p app/soul/writing/sacred-potato
mkdir -p app/soul/journey
mkdir -p app/soul/connect
mkdir -p app/soul/blueprint/selah
mkdir -p app/soul/blueprint/mirror-of-truth
mkdir -p app/soul/blueprint/aimafia
mkdir -p app/soul/blueprint/diveink
```

### Phase 2: Move Files (in this order)
1. Move `/app/page.tsx` to `/app/soul/page.tsx`
2. Move `/app/building/page.tsx` to `/app/soul/building/page.tsx`
3. Move `/app/writing/page.tsx` to `/app/soul/writing/page.tsx`
4. Move `/app/writing/sacred-potato/page.tsx` to `/app/soul/writing/sacred-potato/page.tsx`
5. Move `/app/journey/page.tsx` to `/app/soul/journey/page.tsx`
6. Move `/app/connect/page.tsx` to `/app/soul/connect/page.tsx`
7. Move `/app/blueprint/*` to `/app/soul/blueprint/*`

### Phase 3: Update All Links
Use find-and-replace with these patterns:
1. `href="/"` -> `href="/soul/"` (be careful not to replace external URLs)
2. `href="/building"` -> `href="/soul/building"`
3. `href="/writing"` -> `href="/soul/writing"`
4. `href="/journey"` -> `href="/soul/journey"`
5. `href="/connect"` -> `href="/soul/connect"`
6. `href="/blueprint/` -> `href="/soul/blueprint/`
7. `link: "/writing/` -> `link: "/soul/writing/`
8. `blueprintLink: "/blueprint/` -> `blueprintLink: "/soul/blueprint/`

### Phase 4: Create New Homepage
Create a new `/app/page.tsx` that serves as the new main landing page, with a link to `/soul/` for the archive.

### Phase 5: Verify
1. Start dev server: `npm run dev`
2. Test all navigation links
3. Verify no broken links
4. Check console for routing errors

## Files That Need No Changes
- `/app/layout.tsx` - Root layout, no internal links
- `/app/globals.css` - Styles only
- `/public/*` - Static assets

## Risk Assessment

### HIGH RISK
- Missing any link will result in 404 errors
- The `writings` array has links to non-existent pages (`/writing/sacred-wound`, `/writing/edge-space`)

### MEDIUM RISK
- Hash links (`#selah`) may break if target IDs aren't preserved
- Dynamic link patterns need careful regex replacement

### LOW RISK
- External links (mailto, https://) should be unaffected if regex is correct
