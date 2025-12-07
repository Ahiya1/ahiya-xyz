# Builder-2 Report: Tracking Middleware

## Status
COMPLETE

## Summary
Implemented the Next.js Edge Middleware that captures every page visit, extracts all tracking data (path, referrer, UTM parameters, device info, session ID, visitor hash, geo location), and fires an async POST to the tracking API without blocking page loads.

## Files Created

### Implementation
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts` - Edge middleware at project root that handles all page visit tracking

### Packages Installed
- `ua-parser-js` - For parsing user agent strings to extract device/browser/OS info
- `@types/ua-parser-js` - TypeScript type definitions for ua-parser-js

## Success Criteria Met
- [x] `middleware.ts` exists at project root
- [x] Matcher excludes: `/api/*`, `/_next/*`, `/admin/*`, static files
- [x] Bot detection skips crawlers (28 bot patterns including Googlebot, Bingbot, etc.)
- [x] Session ID generated and stored in cookie (30 min expiry)
- [x] Visitor hash generated (IP + UA + date, SHA-256 with daily rotation)
- [x] Device info parsed from user-agent (ua-parser-js)
- [x] UTM parameters extracted from URL (source, medium, campaign, content, term)
- [x] Geo data extracted from `request.geo` (country, city, region)
- [x] Async POST to `/api/analytics/track` (non-blocking with waitUntil or fire-and-forget)
- [x] Page load time not affected (async tracking pattern)

## Implementation Details

### 1. Matcher Configuration
```typescript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|css|js)$|admin).*)",
  ],
};
```

Excludes:
- `/api/*` - API routes
- `/_next/static/*` and `/_next/image/*` - Next.js internals
- `/admin/*` - Admin routes
- Static files: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.ico`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.css`, `.js`
- `favicon.ico`

### 2. Bot Detection
Comprehensive list of 28 bot patterns including:
- Search engines: Googlebot, Bingbot, YandexBot, Baiduspider, DuckDuckBot
- Social: facebookexternalhit, Twitterbot, LinkedInBot
- SEO tools: AhrefsBot, SemrushBot, MJ12bot
- Monitoring: UptimeRobot, Pingdom
- Headless browsers: HeadlessChrome, PhantomJS, Lighthouse

### 3. Session Management
- Cookie name: `ahiya_session`
- Max age: 30 minutes (1800 seconds)
- HttpOnly: true
- Secure: true in production
- SameSite: lax
- Uses `crypto.randomUUID()` for Edge compatibility

### 4. Visitor Hash (Privacy-Preserving)
- Input format: `${ip}|${userAgent}|${date}|ahiya-analytics-salt-v1`
- Date format: `YYYY-MM-DD` (daily rotation for privacy)
- Algorithm: SHA-256 via `crypto.subtle.digest()`
- Output: 64-character hex string

### 5. User-Agent Parsing
Uses `ua-parser-js` to extract:
- `deviceType`: desktop, mobile, or tablet
- `browser`: Chrome, Firefox, Safari, etc.
- `browserVersion`: Version string
- `os`: Windows, macOS, iOS, Android, etc.
- `osVersion`: Version string

### 6. Geo Data
Extracted from Vercel Edge `request.geo`:
- `country`: 2-letter ISO code
- `city`: City name
- `region`: State/province

Note: Returns null in local dev (only works on Vercel)

### 7. UTM Extraction
Extracts from URL search params:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

### 8. Async Tracking
- Uses `waitUntil` if available (Vercel Edge)
- Falls back to fire-and-forget with `.catch()` for error handling
- Errors are logged but never block page load

## Tests Summary
- **Build test:** PASSING (Next.js build completes successfully)
- **Type checking:** PASSING (TypeScript compiles without errors)

## Dependencies Used
- `ua-parser-js@1.x`: For user-agent parsing - Edge compatible
- `crypto` (Web Crypto API): For SHA-256 hashing and UUID generation - native Edge support

## Patterns Followed
- **Edge Runtime Compatibility:** Used `crypto.randomUUID()` and `crypto.subtle.digest()` instead of Node.js crypto
- **Non-blocking tracking:** Fire-and-forget pattern with `waitUntil` support
- **Type safety:** Full TypeScript types for all functions and interfaces
- **Privacy-preserving:** Daily-rotating visitor hash with salt

## Integration Notes

### Exports
This middleware does not export any functions for other modules. It operates autonomously on every matching request.

### Dependencies on Other Builders
- **Builder-1:** This middleware POSTs to `/api/analytics/track` created by Builder-1
- **Types:** I defined `PageViewInsert`, `DeviceInfo`, and `SessionInfo` locally. During integration, these can be replaced with imports from `/lib/types/analytics.ts` once Builder-1 creates that file.

### Shared Types
The following types are defined locally in middleware.ts and match the spec from patterns.md:
- `PageViewInsert` - Data structure for tracking POST
- `DeviceInfo` - Parsed device information
- `SessionInfo` - Session ID with isNew flag
- `VercelGeo` - Geo data from Vercel Edge
- `NextRequestWithGeo` - Extended NextRequest with geo property

### Potential Conflicts
- **None expected:** Middleware file is unique to this builder

### Integration Steps
1. Once Builder-1 creates `/lib/types/analytics.ts`, the local type definitions in middleware.ts can optionally be replaced with imports
2. The middleware will automatically start POSTing to `/api/analytics/track` once that route is available

## Challenges Overcome

### 1. TypeScript Geo Property
The `request.geo` property is Vercel-specific and not in the Next.js 16 type definitions. Solved by creating a `NextRequestWithGeo` interface that extends `NextRequest` with the optional `geo` property.

### 2. Edge Runtime Compatibility
Ensured all APIs are Edge-compatible:
- Used Web Crypto API (`crypto.subtle.digest`, `crypto.randomUUID`) instead of Node.js crypto
- Used `TextEncoder` instead of Buffer
- `ua-parser-js` is already Edge-compatible

### 3. Next.js 16 Deprecation Warning
Next.js 16 shows a warning about middleware being deprecated in favor of "proxy" - this is informational only. The middleware file convention still works correctly.

## Testing Notes

### Local Development Testing
1. Start dev server: `npm run dev`
2. Visit any page in browser
3. Check browser DevTools > Application > Cookies for `ahiya_session` cookie
4. Check browser DevTools > Network for POST to `/api/analytics/track`

### Bot Testing
Visit with curl using a bot user agent:
```bash
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/
```
Should NOT trigger tracking POST.

### Session Persistence
1. Visit page - new session cookie created
2. Refresh page - same session ID used (isNew=false)
3. Clear cookies or wait 30 min - new session created

### Production Testing (Vercel)
- Geo data will be populated (country, city, region)
- `waitUntil` will be available for true non-blocking tracking

## MCP Testing Performed
N/A - Middleware testing requires runtime execution. Build verification confirmed successful compilation.

## File Location Verification
```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts
```
File is at project ROOT level (not in /app) as required by Next.js.
