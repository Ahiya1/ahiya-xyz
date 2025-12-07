# Builder Task Breakdown

## Overview

**4 builders** will work in parallel to complete Iteration 14 (Foundation & Tracking).

| Builder | Focus | Complexity | Est. Time |
|---------|-------|------------|-----------|
| Builder-1 | Database & Tracking API | MEDIUM | 1-1.5 hrs |
| Builder-2 | Tracking Middleware | HIGH | 1.5-2 hrs |
| Builder-3 | Admin Authentication | MEDIUM-HIGH | 1.5-2 hrs |
| Builder-4 | Admin Layout & Navigation | MEDIUM | 1-1.5 hrs |

## Builder Assignment Strategy

- **Builder-1** and **Builder-3** are completely independent and can run in parallel
- **Builder-2** depends on types from Builder-1 (can stub initially)
- **Builder-4** depends on auth functions from Builder-3 (can stub initially)

---

## Builder-1: Database & Tracking API

### Scope

Set up the Vercel Postgres database connection, create the `page_views` table schema, and implement the tracking API endpoint that receives page view data from the middleware.

### Complexity Estimate

**MEDIUM**

- Vercel Postgres is straightforward with `@vercel/postgres`
- SQL schema is well-defined
- Track API is a simple INSERT operation

### Success Criteria

- [ ] `@vercel/postgres` and `@types/ua-parser-js` packages installed
- [ ] `/lib/types/analytics.ts` exports `PageViewInsert` and `DeviceInfo` types
- [ ] `/lib/db.ts` exports `insertPageView()` function
- [ ] `POST /api/analytics/track` accepts JSON body and inserts into database
- [ ] SQL schema file created with table and indexes
- [ ] Track endpoint returns `{ success: true }` on valid input
- [ ] Track endpoint returns `{ error: "..." }` with status 400/500 on errors

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/types/analytics.ts` | Shared TypeScript types |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts` | Database utilities |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/track/route.ts` | Track API endpoint |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql` | Database schema SQL |

### File Contents

#### 1. `/lib/types/analytics.ts`

```typescript
/**
 * Data required to insert a new page view
 */
export interface PageViewInsert {
  path: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  sessionId: string;
  visitorHash: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  userAgent: string | null;
}

/**
 * Device information parsed from user agent
 */
export interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
}

/**
 * Session management info
 */
export interface SessionInfo {
  sessionId: string;
  isNew: boolean;
}
```

#### 2. `/lib/db.ts`

Implement:
- `insertPageView(data: PageViewInsert): Promise<void>`
- Use `sql` tagged template from `@vercel/postgres`
- Handle all 18 columns in INSERT statement
- Use parameterized queries (template literals) for SQL injection safety

Reference the full implementation in `patterns.md` section "Database Patterns".

#### 3. `/app/api/analytics/track/route.ts`

Implement:
- `POST` handler that accepts JSON body
- Validate required fields: `path`, `sessionId`, `visitorHash`
- Call `insertPageView()` with the data
- Return `{ success: true }` on success
- Return appropriate error responses with status codes

Reference the full implementation in `patterns.md` section "API Route Patterns > Public API Route (Track)".

#### 4. `/scripts/schema.sql`

Include complete SQL for:
- `CREATE TABLE page_views` with all 18 columns
- All 6 indexes
- Wrapped in transaction (`BEGIN`/`COMMIT`)

Reference the full SQL in `patterns.md` section "Database Patterns > Schema Creation SQL".

### Dependencies

**Depends on:** Nothing (can start immediately)

**Blocks:** Builder-2 (needs types), Integration

### Implementation Notes

1. **Install packages first:**
   ```bash
   npm install @vercel/postgres jose ua-parser-js
   npm install -D @types/ua-parser-js
   ```

2. **Environment variable required:** `POSTGRES_URL` must be set

3. **Column naming:** Use snake_case in database, camelCase in TypeScript

4. **Null handling:** Most fields can be NULL - use `${value}` directly, Vercel Postgres handles nulls

### Patterns to Follow

- Use pattern from `patterns.md` > "Database Patterns"
- Use type definitions from `patterns.md` > "TypeScript Types"
- Follow import order from `patterns.md` > "Import Order Convention"

### Testing Requirements

- Test track API with curl command from `patterns.md`
- Verify row appears in database after POST
- Test with missing required fields (should return 400)
- Test with null optional fields (should succeed)

---

## Builder-2: Tracking Middleware

### Scope

Implement the Next.js Edge Middleware that captures every page visit, extracts all tracking data, and fires an async POST to the tracking API.

### Complexity Estimate

**HIGH**

- Edge runtime constraints require careful API selection
- Multiple parsing functions (UA, geo, session, hash)
- Async non-blocking pattern is critical
- Cookie management for sessions

### Success Criteria

- [ ] `middleware.ts` exists at project root
- [ ] Matcher excludes: `/api/*`, `/_next/*`, `/admin/*`, static files
- [ ] Bot detection skips crawlers
- [ ] Session ID generated and stored in cookie (30 min expiry)
- [ ] Visitor hash generated (IP + UA + date, SHA-256)
- [ ] Device info parsed from user-agent (ua-parser-js)
- [ ] UTM parameters extracted from URL
- [ ] Geo data extracted from `request.geo`
- [ ] Async POST to `/api/analytics/track` (non-blocking)
- [ ] Page load time not affected (<50ms overhead)

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts` | Edge middleware (ROOT level) |

### File Contents

#### `/middleware.ts`

**CRITICAL:** File must be at project root, not in `/app`.

Implement these functions:
1. `isBot(userAgent: string): boolean` - Detect crawlers
2. `getOrCreateSessionId(request: NextRequest): SessionInfo` - Session management
3. `generateVisitorHash(request: NextRequest): Promise<string>` - Privacy hash
4. `parseUserAgent(userAgent: string): DeviceInfo` - Device detection
5. `trackPageView(request: NextRequest, sessionId: string): Promise<void>` - Async tracking
6. `middleware(request: NextRequest): Promise<NextResponse>` - Main handler

**Matcher config:**
```typescript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$|admin).*)",
  ],
};
```

Reference the complete implementation in `patterns.md` section "Middleware Patterns > Complete Middleware Structure".

### Dependencies

**Depends on:** Builder-1 (for `PageViewInsert` type and track API)

**Blocks:** Integration

**Workaround if Builder-1 not ready:**
- Define `PageViewInsert` interface locally (can be removed later)
- Test with console.log instead of actual fetch

### Implementation Notes

1. **Edge Runtime Compatibility:**
   - Use `crypto.randomUUID()` not `uuid` package
   - Use `crypto.subtle.digest()` not `crypto.createHash()`
   - Use `TextEncoder` not `Buffer`
   - Import `ua-parser-js` normally (it's Edge-compatible)

2. **Session Cookie:**
   - Name: `ahiya_session`
   - Max age: 30 minutes (1800 seconds)
   - HttpOnly: true
   - Secure: true in production
   - SameSite: lax

3. **Visitor Hash Algorithm:**
   - Input: `${ip}|${userAgent}|${date}|ahiya-analytics-salt-v1`
   - Hash: SHA-256
   - Output: 64-character hex string
   - Date format: `YYYY-MM-DD` (rotates daily for privacy)

4. **Non-blocking tracking:**
   - Use `waitUntil` if available (Vercel Edge)
   - Otherwise fire-and-forget with `.catch(console.error)`

5. **Geo data:**
   - `request.geo.country` - 2-letter ISO code
   - `request.geo.city` - City name
   - `request.geo.region` - State/province
   - May be null in local dev (only works on Vercel)

### Patterns to Follow

- Use all patterns from `patterns.md` > "Middleware Patterns"
- Follow device parsing from `patterns.md` > "User Agent Parsing"
- Use session pattern from `patterns.md` > "Session ID Generation"

### Testing Requirements

- Visit a page in browser, check console for tracking POST
- Check database for new row after visit
- Test with bot user-agent (should NOT track)
- Verify session cookie is set on first visit
- Verify same session ID used on subsequent visits
- Confirm page load is not noticeably slower

### Potential Issues

1. **ua-parser-js import in Edge:** Should work, but if issues occur, use dynamic import
2. **waitUntil type:** May need type assertion, see pattern in `patterns.md`
3. **Geo undefined in dev:** Handle gracefully with null fallback

---

## Builder-3: Admin Authentication

### Scope

Implement the complete authentication system: JWT token management with jose, login/logout API routes with rate limiting, and the login page with styled form.

### Complexity Estimate

**MEDIUM-HIGH**

- jose JWT is well-documented but requires understanding
- Rate limiting adds complexity
- Cookie security configuration is critical
- Login page needs proper state management

### Success Criteria

- [ ] `/lib/auth.ts` exports all auth functions
- [ ] JWT tokens use HS256 with 7-day expiry
- [ ] Auth cookie is httpOnly, secure (prod), sameSite: lax
- [ ] Rate limiting: 5 attempts per 15 min, 30 min block
- [ ] `POST /api/auth/login` validates password and sets cookie
- [ ] `POST /api/auth/logout` clears cookie
- [ ] `/admin/login` page has styled form matching design system
- [ ] Login shows error messages for invalid password
- [ ] Login shows rate limit message when blocked
- [ ] Password comparison is constant-time

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/auth.ts` | Auth utilities |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/auth/login/route.ts` | Login API |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/auth/logout/route.ts` | Logout API |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/login/page.tsx` | Login page |

### File Contents

#### 1. `/lib/auth.ts`

Export these functions:
- `createAdminToken(): Promise<string>`
- `verifyAdminToken(token: string): Promise<TokenVerificationResult>`
- `setAuthCookie(response: NextResponse, token: string): void`
- `clearAuthCookie(response: NextResponse): void`
- `getAuthCookie(request: NextRequest): string | null`
- `verifyPassword(input: string): Promise<boolean>`
- `checkRateLimit(request: NextRequest): RateLimitResult`
- `recordFailedAttempt(request: NextRequest): void`
- `clearRateLimit(request: NextRequest): void`

Export these types:
- `AdminTokenPayload`
- `TokenVerificationResult`
- `RateLimitResult`

Reference complete implementations in `patterns.md` section "Authentication Patterns".

#### 2. `/app/api/auth/login/route.ts`

Implement `POST` handler:
1. Check rate limit first
2. Parse and validate password from body
3. Verify password with constant-time comparison
4. On failure: record attempt, return error
5. On success: clear rate limit, create token, set cookie

Reference pattern in `patterns.md` > "Rate-Limited API Route Pattern".

#### 3. `/app/api/auth/logout/route.ts`

Implement `POST` handler:
1. Get auth cookie from request
2. Verify token is valid
3. Clear auth cookie
4. Return success

Reference pattern in `patterns.md` > "Authenticated API Route Pattern".

#### 4. `/app/admin/login/page.tsx`

Implement client component with:
- Password input field
- Submit button with loading state
- Error message display
- Redirect to /admin on success

Reference complete component in `patterns.md` > "Login Page (Client Component)".

### Dependencies

**Depends on:** Nothing (can start immediately)

**Blocks:** Builder-4 (needs `verifyAdminToken`)

### Implementation Notes

1. **Environment variables required:**
   - `ADMIN_PASSWORD` - The password to match
   - `SESSION_SECRET` - 32+ characters for JWT signing

2. **Cookie configuration:**
   - Name: `ahiya_admin_session`
   - Max age: 7 days (604800 seconds)
   - HttpOnly: true (prevents XSS)
   - Secure: true in production only
   - SameSite: lax

3. **Rate limiting storage:**
   - Use in-memory Map (acceptable for single-user admin)
   - No cleanup mechanism needed (Map won't grow large)

4. **Constant-time password comparison:**
   - Hash both passwords with SHA-256
   - Compare hashes byte-by-byte
   - Don't short-circuit on mismatch

5. **Login page location:**
   - `/app/admin/login/page.tsx` is OUTSIDE the auth-gated layout
   - It will NOT be wrapped by the admin layout's auth check

### Patterns to Follow

- Use all patterns from `patterns.md` > "Authentication Patterns"
- Use login page pattern from `patterns.md` > "Login Page (Client Component)"
- Follow styling patterns from `patterns.md` > "Styling Patterns"

### Testing Requirements

- Test login with correct password (should set cookie, redirect)
- Test login with wrong password (should show error)
- Test 5 wrong attempts (should show rate limit error)
- Wait 30 minutes (or clear Map) and retry (should allow again)
- Test logout (should clear cookie, redirect to login)
- Verify cookie is httpOnly (check browser DevTools)

---

## Builder-4: Admin Layout & Navigation

### Scope

Create the admin dashboard shell with protected layout, sidebar navigation, and header with logout button. Set up the basic structure that will hold all dashboard content.

### Complexity Estimate

**MEDIUM**

- Server Component auth check is straightforward
- Sidebar/header are standard components
- Must match existing design system exactly

### Success Criteria

- [ ] `/app/admin/layout.tsx` redirects unauthenticated users to login
- [ ] `AdminSidebar.tsx` shows navigation items with icons
- [ ] Active nav item is highlighted
- [ ] `AdminHeader.tsx` has working logout button
- [ ] `/app/admin/page.tsx` shows placeholder dashboard
- [ ] Styling matches site design system (dark theme, purple accents)
- [ ] Layout is responsive (sidebar can collapse on mobile)

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/layout.tsx` | Auth-gated layout |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/page.tsx` | Dashboard placeholder |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/AdminSidebar.tsx` | Sidebar nav |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/AdminHeader.tsx` | Header |

### File Contents

#### 1. `/app/admin/layout.tsx`

Server Component that:
1. Gets auth cookie using `cookies()` from `next/headers`
2. Calls `verifyAdminToken()` from `/lib/auth.ts`
3. Redirects to `/admin/login` if invalid
4. Renders sidebar + header + children layout

Reference pattern in `patterns.md` > "Admin Layout with Auth Gate (Server Component)".

#### 2. `/app/admin/page.tsx`

Simple Server Component placeholder:
- Page title "Dashboard Overview"
- Message that dashboard is coming in next iteration
- Use `contemplative-card` styling

Reference pattern in `patterns.md` > "Dashboard Placeholder Page".

#### 3. `/app/admin/components/AdminSidebar.tsx`

Client Component with:
- Logo/brand section at top
- Navigation items with icons (lucide-react)
- Active state highlighting using `usePathname()`
- Link back to main site at bottom

Navigation items (for Iteration 15):
1. Overview - `/admin` - `LayoutDashboard` icon
2. Real-Time - `/admin/realtime` - `Activity` icon
3. Pages - `/admin/pages` - `FileText` icon
4. Acquisition - `/admin/acquisition` - `TrendingUp` icon
5. Visitors - `/admin/visitors` - `Users` icon
6. Export - `/admin/export` - `Download` icon

Reference pattern in `patterns.md` > "Sidebar Component (Client Component)".

#### 4. `/app/admin/components/AdminHeader.tsx`

Client Component with:
- Logout button on right side
- Loading state during logout
- Calls `/api/auth/logout` on click
- Redirects to `/admin/login` after logout

Reference pattern in `patterns.md` > "Header Component (Client Component)".

### Dependencies

**Depends on:** Builder-3 (needs `verifyAdminToken` from `/lib/auth.ts`)

**Blocks:** Integration

**Workaround if Builder-3 not ready:**
- Create stub `verifyAdminToken` that always returns `{ valid: true }`
- Replace with real implementation during integration

### Implementation Notes

1. **Login page bypass:**
   - The login page at `/admin/login/page.tsx` is NOT inside this layout
   - It has its own implicit layout (no auth check needed)
   - This is because Next.js routes closer layouts override parent layouts

2. **Sidebar width:**
   - Fixed width: `w-64` (256px)
   - Background: `bg-[#0a0f1a]`
   - Border: `border-r border-white/10`

3. **Active link detection:**
   ```typescript
   const isActive = pathname === item.href ||
     (item.href !== "/admin" && pathname.startsWith(item.href));
   ```

4. **Icon imports from lucide-react:**
   ```typescript
   import {
     LayoutDashboard, Activity, FileText,
     TrendingUp, Users, Download, LogOut
   } from "lucide-react";
   ```

5. **Responsive consideration:**
   - For MVP, sidebar can be always visible
   - Mobile hamburger menu can be added post-MVP

### Patterns to Follow

- Use patterns from `patterns.md` > "Frontend Patterns"
- Match styling from `patterns.md` > "Styling Patterns"
- Follow component structure from `patterns.md` > "Component Patterns"

### Testing Requirements

- Visit `/admin` without auth cookie (should redirect to login)
- Visit `/admin` with valid auth cookie (should show dashboard)
- Click each nav item (should navigate, highlight active)
- Click logout (should clear cookie, redirect to login)
- Verify styling matches site design system

---

## Builder Execution Order

### Phase 1: Parallel Start (No dependencies)

| Builder | Tasks |
|---------|-------|
| Builder-1 | Install packages, create types, db.ts, track API |
| Builder-3 | Create auth.ts, login/logout APIs, login page |

### Phase 2: Parallel Continue (Light dependencies)

| Builder | Tasks | Waits For |
|---------|-------|-----------|
| Builder-2 | Create middleware.ts | Builder-1 types (can stub) |
| Builder-4 | Create layout, sidebar, header | Builder-3 auth (can stub) |

### Phase 3: Integration

1. Verify Builder-2 middleware calls Builder-1 track API
2. Verify Builder-4 layout uses Builder-3 auth functions
3. Test complete flow: visit page -> tracking -> login -> dashboard

---

## Integration Notes

### How Builder Outputs Connect

```
User visits page
       |
       v
[Builder-2: middleware.ts]
       |
       | POST /api/analytics/track
       v
[Builder-1: track/route.ts]
       |
       | INSERT INTO page_views
       v
[Builder-1: db.ts + schema.sql]


User visits /admin
       |
       v
[Builder-4: layout.tsx]
       |
       | verifyAdminToken()
       v
[Builder-3: auth.ts]
       |
       | Valid? -> Show dashboard
       | Invalid? -> Redirect to login
       v
[Builder-4: page.tsx] or [Builder-3: login/page.tsx]
```

### Shared Files

| File | Created By | Used By |
|------|------------|---------|
| `/lib/types/analytics.ts` | Builder-1 | Builder-2 |
| `/lib/db.ts` | Builder-1 | Builder-2 (via API) |
| `/lib/auth.ts` | Builder-3 | Builder-4 |

### Potential Conflicts

1. **Package.json:** All builders may need to install packages
   - Resolution: Builder-1 installs all packages first
   - Or: Each builder only adds what they need, merge carefully

2. **No file conflicts:** Each builder has distinct files

### Integration Checklist

- [ ] All 4 builders' files present
- [ ] `npm install` runs without errors
- [ ] `npm run build` succeeds
- [ ] Middleware fires on page visit
- [ ] Track API receives and stores data
- [ ] Login page loads at `/admin/login`
- [ ] Correct password grants access
- [ ] Wrong password shows error
- [ ] Admin layout shows after login
- [ ] Logout clears session
- [ ] Protected routes redirect when not authenticated

---

## Acceptance Criteria Summary

### Builder-1: Database & Tracking API

| # | Criterion | Test Method |
|---|-----------|-------------|
| 1 | Packages installed | `npm ls @vercel/postgres jose ua-parser-js` |
| 2 | Types exported | Import in other file |
| 3 | Track API returns success | curl POST |
| 4 | Data appears in database | Query table |

### Builder-2: Tracking Middleware

| # | Criterion | Test Method |
|---|-----------|-------------|
| 1 | Middleware at root level | Check file exists |
| 2 | Tracks page visits | Visit page, check DB |
| 3 | Skips bots | Visit with bot UA, check DB |
| 4 | Session cookie set | Check browser cookies |
| 5 | No latency impact | Page loads fast |

### Builder-3: Admin Authentication

| # | Criterion | Test Method |
|---|-----------|-------------|
| 1 | Login succeeds with password | Login, check redirect |
| 2 | Login fails with wrong password | Wrong password, see error |
| 3 | Rate limiting works | 5 wrong attempts, see block |
| 4 | Logout clears cookie | Logout, check cookie gone |

### Builder-4: Admin Layout & Navigation

| # | Criterion | Test Method |
|---|-----------|-------------|
| 1 | Layout requires auth | Visit /admin logged out |
| 2 | Sidebar navigation works | Click links |
| 3 | Active state highlights | Check CSS class |
| 4 | Logout button works | Click, verify redirect |
| 5 | Styling matches design | Visual inspection |
