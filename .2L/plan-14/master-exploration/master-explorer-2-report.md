# Master Explorer 2: Dependencies & Risk Assessment

## Explorer ID
master-explorer-2

## Focus Area
Dependencies & Risk Assessment

## Vision Summary
Build a privacy-respecting analytics dashboard for the Ahiya portfolio site with middleware-based tracking, Vercel Postgres storage, real-time views, and admin authentication.

---

## Executive Summary

- **Minimal existing dependencies**: Current stack is lean (Next.js 16, React 19, Tailwind 4) with no database, auth, or charting libraries installed
- **7 new packages required**: @vercel/postgres, recharts, react-simple-maps, jose, ua-parser-js, maxmind (optional), and d3-geo types
- **No API routes exist**: All API infrastructure must be created from scratch
- **No middleware exists**: Tracking middleware will be greenfield implementation
- **Primary risks**: Vercel Postgres setup complexity, real-time updates without WebSockets, and IP geolocation reliability

---

## Current Dependencies Audit

### Production Dependencies
| Package | Version | Purpose | Relevant to Analytics? |
|---------|---------|---------|------------------------|
| next | ^16.0.7 | React framework | Yes - middleware, API routes |
| react | ^19.0.0 | UI library | Yes - dashboard components |
| react-dom | ^19.0.0 | React DOM | Yes - rendering |
| tailwindcss | ^4.1.10 | CSS framework | Yes - dashboard styling |
| @tailwindcss/postcss | ^4.1.10 | PostCSS plugin | No |
| lucide-react | ^0.517.0 | Icons | Yes - dashboard icons |
| @react-pdf/renderer | ^4.3.1 | PDF generation | No |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5 | Type checking |
| @types/node | ^20 | Node types |
| @types/react | ^19 | React types |
| eslint | ^9 | Linting |
| sharp | ^0.34.5 | Image processing |

### Key Observations
1. **No database library installed** - Will need @vercel/postgres
2. **No authentication library** - Will need jose or iron-session
3. **No charting library** - Will need recharts or similar
4. **No user agent parser** - Will need ua-parser-js
5. **No geolocation library** - Will need maxmind or API-based solution
6. **No existing API routes** - app/api directory does not exist
7. **No existing middleware.ts** - Must create from scratch

---

## Required New Dependencies

### Core Dependencies (Required)

| Package | Purpose | Version | Bundle Size | Notes |
|---------|---------|---------|-------------|-------|
| @vercel/postgres | Database connectivity | ^0.10.0 | ~15kb | Official Vercel package, serverless-optimized |
| recharts | Charts and visualizations | ^3.5.1 | ~140kb | React-native, composable, excellent types |
| react-simple-maps | World map visualization | ^3.0.0 | ~50kb | D3-based, React integration |
| jose | JWT/session handling | ^6.1.3 | ~30kb | Edge runtime compatible, no Node.js deps |
| ua-parser-js | User agent parsing | ^2.0.6 | ~20kb | Mature, comprehensive detection |

### Optional Dependencies (Recommended)

| Package | Purpose | Version | Notes |
|---------|---------|---------|-------|
| maxmind | Offline IP geolocation | ^5.0.1 | Uses GeoLite2 free database, no API calls |
| @types/react-simple-maps | TypeScript definitions | ^3.0.6 | Type safety for map components |
| d3-geo | Map projections | ^3.1.1 | Peer dependency for react-simple-maps |
| topojson-client | TopoJSON parsing | ^3.1.0 | For world map data |

### Alternative Considerations

| Need | Option A | Option B | Recommendation |
|------|----------|----------|----------------|
| Charting | recharts | @nivo/core | **recharts** - lighter, simpler API |
| Auth | jose + cookies | iron-session | **jose** - Edge compatible, more control |
| Geolocation | maxmind (local DB) | ip-api.com (API) | **maxmind** - no external calls, faster |
| Maps | react-simple-maps | @react-leaflet/core | **react-simple-maps** - simpler for heat maps |

---

## Environment Variables Required

### Required for MVP

| Variable | Purpose | Example Value | Where to Set |
|----------|---------|---------------|--------------|
| `POSTGRES_URL` | Vercel Postgres connection | `postgres://...` | Vercel project settings |
| `ADMIN_PASSWORD` | Dashboard login password | Strong random string | Vercel env vars |
| `SESSION_SECRET` | JWT signing key | 32+ char random string | Vercel env vars |

### Optional/Conditional

| Variable | Purpose | When Needed |
|----------|---------|-------------|
| `GEOIP_DB_PATH` | Path to GeoLite2 database | If using maxmind local DB |
| `IPINFO_API_KEY` | API key for IPInfo.io | If using API-based geolocation |

### Environment Variable Configuration Notes

1. **POSTGRES_URL**: Automatically provided when you add Vercel Postgres to project
2. **SESSION_SECRET**: Generate with `openssl rand -base64 32`
3. **ADMIN_PASSWORD**: Should be hashed at rest; store plaintext only in env var

---

## Technical Decisions

### Decision 1: Chart Library Selection

**Options:**
- **recharts** (v3.5.1) - React-native, declarative, good types, 140kb
- **@nivo/core** - More features, larger bundle, steeper learning curve
- **Chart.js + react-chartjs-2** - Canvas-based, less React-idiomatic
- **visx** - Low-level D3 wrappers, more control but more work

**Recommendation: recharts**

**Rationale:**
1. Native React component architecture matches existing codebase patterns
2. Excellent TypeScript support out of the box
3. Built-in responsive containers
4. Supports all required chart types (Line, Bar, Pie, Area)
5. Good documentation and active maintenance
6. Reasonable bundle size for feature set

### Decision 2: IP Geolocation Approach

**Options:**
- **MaxMind GeoLite2 (Local DB)** - Free database, no API calls, ~70MB DB file
- **ip-api.com** - Free tier (45 req/min), requires external calls
- **ipinfo.io** - Free tier (50k/month), good accuracy
- **Vercel Edge Geo** - Limited data (country only), built-in

**Recommendation: Vercel Edge Geo + ip-api.com fallback**

**Rationale:**
1. Vercel Edge Runtime provides `geo` object in middleware with country/city
2. This is free, instant, and requires no external dependencies
3. For more detailed geo (ISP, timezone), can optionally call ip-api.com
4. MaxMind requires managing a 70MB database file - overkill for portfolio site
5. Start simple, add MaxMind later if more precision needed

**Implementation:**
```typescript
// In middleware.ts
const geo = request.geo; // { country, city, region, latitude, longitude }
```

### Decision 3: Session Management Approach

**Options:**
- **jose** - Low-level JWT library, Edge compatible, full control
- **iron-session** - Higher-level, session-based, cookie encryption
- **next-auth** - Full auth solution, overkill for single password
- **Custom cookies** - Raw httpOnly cookies with signed tokens

**Recommendation: jose with httpOnly cookies**

**Rationale:**
1. Edge Runtime compatible (required for middleware)
2. Lightweight and focused - no unnecessary features
3. Full control over token payload and expiration
4. Works seamlessly with Next.js App Router
5. iron-session is good but jose offers more flexibility
6. next-auth is overkill for single-user password auth

**Implementation pattern:**
```typescript
import { SignJWT, jwtVerify } from 'jose';

// Create session
const token = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .sign(secret);

// Set as httpOnly cookie
cookies().set('admin_session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7 // 7 days
});
```

### Decision 4: Real-Time Updates Without WebSockets

**Options:**
- **WebSockets** - True real-time, requires persistent connections
- **Polling (setInterval)** - Simple, predictable load, slight delay
- **Server-Sent Events** - One-way stream, good for feeds
- **SWR/React Query** - Smart polling with caching

**Recommendation: SWR with short polling interval**

**Rationale:**
1. WebSockets add significant complexity and may not work with all Vercel plans
2. SSE works but adds complexity without major benefit for this use case
3. 5-second polling interval (per vision spec) is acceptable for visitor feed
4. SWR provides automatic caching, revalidation, and error handling
5. Dashboard can use `refreshInterval: 5000` for real-time tab

**Implementation:**
```typescript
const { data, error } = useSWR('/api/analytics/realtime', fetcher, {
  refreshInterval: 5000,
  revalidateOnFocus: true
});
```

### Decision 5: Database Schema Strategy

**Options:**
- **Single events table** - Simple, all data in one place
- **Events + aggregates tables** - Pre-computed rollups for speed
- **Events + sessions tables** - Explicit session tracking

**Recommendation: Events table with optional daily aggregates**

**Rationale:**
1. Start with single `page_views` table for simplicity
2. Add `daily_aggregates` table if query performance becomes issue
3. Sessions can be computed on-the-fly from page_views
4. Indexes on (timestamp, path, session_id) cover main query patterns
5. Vercel Postgres is PostgreSQL - can add materialized views later

---

## Risk Assessment

### High Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Vercel Postgres connection limits | Medium | High | Use connection pooling, optimize queries, consider Vercel KV for caching hot data |
| Real-time view performance | Medium | Medium | Use polling (5s) instead of WebSockets, cache recent events, limit query to last 30 min |
| Middleware tracking latency | Low | High | Async event logging, non-blocking writes, background processing |

### Medium Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| IP geolocation accuracy | Medium | Low | Use Vercel Edge geo (free), accept some inaccuracy, show "Unknown" gracefully |
| Session identification accuracy | Medium | Medium | Use visitor hash (IP + UA), accept some session duplication |
| Chart library bundle size | Low | Medium | Dynamic imports, code splitting, tree shaking |
| Bot traffic pollution | Medium | Low | User agent filtering, exclude known bot patterns |

### Low Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Auth security vulnerabilities | Low | High | Use jose (audited library), httpOnly cookies, rate limiting |
| Data loss on tracking failures | Low | Medium | Queue failed events, retry logic, error logging |
| Dashboard performance | Low | Medium | Server Components, streaming, skeleton loading |

---

## Dependency Chain Analysis

### Build Order (Critical Path)

```
1. Database Setup (Vercel Postgres)
   ├── Create project integration
   ├── Schema migration (page_views table)
   └── Connection testing
         ↓
2. Tracking Middleware
   ├── Event capture (path, referrer, UA, geo)
   ├── Database write (async, non-blocking)
   └── Session identification
         ↓
3. Admin Authentication
   ├── Login API route
   ├── Session management (jose)
   └── Protected route middleware
         ↓
4. Dashboard APIs
   ├── Overview stats endpoint
   ├── Real-time feed endpoint
   ├── Page analytics endpoint
   └── Acquisition data endpoint
         ↓
5. Dashboard UI
   ├── Layout and navigation
   ├── Metric cards
   ├── Charts (recharts)
   └── World map (react-simple-maps)
```

### Parallel Work Opportunities

- **After Database**: Tracking middleware and Auth can be built in parallel
- **After APIs**: All dashboard UI components can be built in parallel
- **Charts and Maps**: Independent of each other, can parallelize

---

## Integration Considerations

### Existing Codebase Integration Points

1. **Layout consistency**: Dashboard should use existing Inter/Crimson fonts
2. **Dark mode**: Site uses dark theme - dashboard must match
3. **Tailwind config**: Use existing Tailwind 4 setup, extend as needed
4. **Component patterns**: Follow existing component structure in `app/components/`

### External Service Integration

1. **Vercel Postgres**: Add via Vercel dashboard, auto-configures env vars
2. **No other external services required for MVP**
3. **Future**: SelahReach integration mentioned but explicitly out of scope

### Data Flow Architecture

```
Visitor Request
      ↓
middleware.ts (capture event data)
      ↓
/api/analytics/track (async write to Postgres)
      ↓
page_views table
      ↓
/api/analytics/* (aggregation queries)
      ↓
Dashboard UI (recharts, react-simple-maps)
```

---

## Recommendations

### Iteration Breakdown Recommendation

**Recommendation: 2-3 Iterations**

**Iteration 1: Foundation (Database + Tracking + Auth)**
- Duration: 4-6 hours
- Risk: MEDIUM (database setup, middleware complexity)
- Components:
  - Vercel Postgres integration and schema
  - Tracking middleware
  - Admin authentication
  - Basic API routes

**Iteration 2: Dashboard MVP (Core Visualizations)**
- Duration: 4-6 hours
- Risk: LOW (standard UI work)
- Components:
  - Dashboard layout and navigation
  - Metric cards and overview
  - Traffic charts (recharts)
  - Top pages table

**Iteration 3: Advanced Features (Maps + Real-time)**
- Duration: 3-4 hours
- Risk: LOW (enhancement layer)
- Components:
  - World map visualization
  - Real-time visitor feed
  - Acquisition breakdown
  - Polish and responsive design

### Key Decisions to Make

1. **Confirm geolocation approach**: Vercel Edge geo vs MaxMind
2. **Confirm polling interval**: 5 seconds acceptable for real-time?
3. **Data retention policy**: Keep all data forever or rolling window?
4. **Bot filtering approach**: User agent patterns vs dedicated library?

### Installation Commands

```bash
# Core dependencies
npm install @vercel/postgres recharts react-simple-maps jose ua-parser-js

# Type definitions
npm install -D @types/react-simple-maps

# Peer dependencies for maps
npm install d3-geo topojson-client

# Optional: SWR for data fetching with caching
npm install swr
```

### Environment Setup Checklist

1. [ ] Add Vercel Postgres integration to project
2. [ ] Set `ADMIN_PASSWORD` environment variable
3. [ ] Set `SESSION_SECRET` environment variable
4. [ ] Verify `POSTGRES_URL` is auto-configured
5. [ ] Create database schema via migration script

---

## Notes & Observations

1. **Greenfield advantage**: No existing database or auth means no migration concerns
2. **React 19 compatibility**: All recommended packages support React 19
3. **Next.js 16 compatibility**: jose and @vercel/postgres fully support App Router
4. **Bundle size consideration**: Total new dependencies add ~255kb (pre-tree-shaking)
5. **Vercel-native approach**: Using @vercel/postgres ensures optimal serverless performance
6. **Privacy-first design**: Hashed IPs, no cookies, no fingerprinting aligns with GDPR

---

*Exploration completed: 2025-12-07T10:45:00Z*
*This report informs master planning decisions*
