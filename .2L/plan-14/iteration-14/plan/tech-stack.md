# Technology Stack

## Core Framework

**Decision:** Next.js 16 with App Router (existing)

**Rationale:**
- Project already uses Next.js 16.0.7
- App Router provides Server Components for auth checks
- Middleware runs on Vercel Edge Runtime
- Built-in support for cookies() and headers() APIs

**No changes needed** - extend existing setup.

---

## Database

**Decision:** Vercel Postgres with raw SQL via `@vercel/postgres`

**Rationale:**
- Single table scope (page_views) doesn't warrant Prisma overhead
- `@vercel/postgres` provides connection pooling automatically
- SQL template literals prevent injection attacks
- Direct SQL gives full control over queries and indexes

**Package:** `@vercel/postgres` ^0.10.0

**Connection Pattern:**
```typescript
import { sql } from '@vercel/postgres';

// Tagged template literal prevents SQL injection
await sql`INSERT INTO page_views (path, ...) VALUES (${path}, ...)`;
```

**Schema Strategy:**
- Single `page_views` table with 18 columns
- 6 indexes for query performance
- No foreign keys (single table)
- Raw SQL schema creation (no migration tool)

---

## Authentication

**Decision:** jose JWT library with httpOnly cookies

**Rationale:**
- jose is Edge-runtime compatible (no Node.js crypto)
- HS256 signing is fast and sufficient for single-user auth
- httpOnly cookies prevent XSS token theft
- 7-day expiry with optional refresh at 24h remaining

**Package:** `jose` ^5.9.6

**Token Configuration:**
- Algorithm: HS256
- Expiry: 7 days
- Payload: `{ sub: 'admin', iat, exp, jti }`
- Cookie: `ahiya_admin_session`, httpOnly, secure (prod), sameSite: lax

**Implementation Notes:**
- Single admin user (no user table needed)
- Password stored in environment variable
- Constant-time password comparison via SHA-256 hashing

---

## Tracking Middleware

**Decision:** Next.js Edge Middleware with async tracking

**Rationale:**
- Edge Middleware runs before route handlers
- Vercel Edge provides geo data (country, city, region) for free
- Fire-and-forget pattern ensures zero latency impact
- `waitUntil` API allows async completion after response

**Package:** `ua-parser-js` ^2.0.0 (with `@types/ua-parser-js`)

**Key Techniques:**
- Session ID: `crypto.randomUUID()` (Edge-compatible)
- Visitor hash: SHA-256 of IP + UA + date (daily rotation for privacy)
- Device detection: ua-parser-js for browser/OS/device type
- Geo data: `request.geo` from Vercel Edge

---

## API Layer

**Decision:** Next.js Route Handlers with standard REST patterns

**Rationale:**
- Native to Next.js 16 App Router
- Server-side only execution
- Easy to add auth checks per route
- Standard JSON responses

**Route Structure:**
```
/api/analytics/track  - POST (public, called by middleware)
/api/auth/login       - POST (public, rate-limited)
/api/auth/logout      - POST (authenticated)
```

**Authentication on Routes:**
- Track API: No auth (called internally by middleware)
- Login API: No auth (public), rate-limited by IP
- Logout API: Requires valid session cookie

---

## Frontend (Admin Dashboard)

**Decision:** React Server Components + minimal Client Components

**Rationale:**
- Server Components for auth checks and data fetching
- Client Components only where needed (forms, interactive nav)
- Matches existing codebase patterns

**UI Components:**
- No component library - use existing globals.css design system
- `contemplative-card` for cards
- `gentle-button` for buttons
- Lucide React for icons (already installed)

**Styling:**
- Tailwind CSS 4 (existing)
- Dark theme: #0a0f1a background
- Purple accents: rgba(168, 85, 247, ...)
- Typography classes from globals.css

---

## Dependencies Overview

### Production Dependencies (to install)

| Package | Version | Purpose |
|---------|---------|---------|
| `@vercel/postgres` | ^0.10.0 | Database client for Vercel Postgres |
| `jose` | ^5.9.6 | JWT signing/verification (Edge-compatible) |
| `ua-parser-js` | ^2.0.0 | User-agent parsing for device detection |

### Dev Dependencies (to install)

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/ua-parser-js` | ^0.7.39 | TypeScript definitions |

### Install Command

```bash
npm install @vercel/postgres jose ua-parser-js
npm install -D @types/ua-parser-js
```

### Existing Dependencies (already in project)

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react` / `react-dom` | UI library |
| `typescript` | Type checking |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |

---

## Environment Variables

### Required Variables

Add to `.env.local` and Vercel project settings:

```env
# Vercel Postgres (auto-configured when database is linked)
POSTGRES_URL="postgres://..."

# Admin authentication
ADMIN_PASSWORD="your-secure-admin-password-here"
SESSION_SECRET="minimum-32-character-random-string-for-jwt-signing"
```

### Generating SESSION_SECRET

```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Example output: Kx7vM9nQ2pRt5wYz8bCd3fGh6jLm0sUv4xAeHiNoPqRsTuWx
```

### Variable Validation

```typescript
// lib/env.ts (optional but recommended)
export function validateEnv() {
  const required = ['POSTGRES_URL', 'ADMIN_PASSWORD', 'SESSION_SECRET'];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  if (process.env.SESSION_SECRET!.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }
}
```

---

## Performance Targets

| Metric | Target | How Measured |
|--------|--------|--------------|
| Tracking latency impact | <50ms | Fire-and-forget async pattern |
| Database write time | <100ms | Vercel Postgres in same region |
| Auth verification | <10ms | In-memory JWT verification |
| Login rate limit check | <1ms | In-memory Map lookup |
| Page load (admin) | <1s | Server Components, minimal JS |

---

## Security Considerations

| Concern | How Addressed |
|---------|---------------|
| SQL Injection | Tagged template literals in @vercel/postgres |
| XSS Token Theft | httpOnly cookies (not accessible via JavaScript) |
| CSRF | SameSite: lax cookie attribute |
| Brute Force Login | Rate limiting (5 attempts / 15 min, 30 min block) |
| Timing Attacks | Constant-time password comparison via hashing |
| Session Hijacking | Secure flag in production, short-lived JTI |
| IP Logging | Hash IP daily, never store raw IP |

---

## Database Schema

### page_views Table

```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(2000),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(200),
  utm_content VARCHAR(200),
  utm_term VARCHAR(200),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  device_type VARCHAR(20) NOT NULL DEFAULT 'desktop',
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  country VARCHAR(2),
  city VARCHAR(100),
  region VARCHAR(100),
  user_agent TEXT
);
```

### Indexes

```sql
CREATE INDEX idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX idx_page_views_path ON page_views (path);
CREATE INDEX idx_page_views_session_id ON page_views (session_id);
CREATE INDEX idx_page_views_utm_campaign ON page_views (utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX idx_page_views_date_path ON page_views (DATE(created_at), path);
CREATE INDEX idx_page_views_visitor_hash ON page_views (visitor_hash);
```

---

## Browser Support

Admin dashboard targets:
- Chrome 90+ (primary)
- Firefox 90+
- Safari 15+
- Edge 90+

Public tracking works on all browsers (server-side, no client JS).

---

## Edge Runtime Compatibility

The middleware MUST use only Edge-compatible APIs:

| API | Status | Notes |
|-----|--------|-------|
| `crypto.randomUUID()` | Supported | Session ID generation |
| `crypto.subtle.digest()` | Supported | Visitor hash SHA-256 |
| `TextEncoder` | Supported | String to bytes |
| `fetch()` | Supported | Internal API calls |
| `NextResponse` | Supported | Cookie management |
| `request.geo` | Supported | Vercel Edge only |
| `request.cookies` | Supported | Session reading |

**NOT supported in Edge:**
- `fs` module
- Node.js `crypto` module
- `Buffer` (use `Uint8Array`)
