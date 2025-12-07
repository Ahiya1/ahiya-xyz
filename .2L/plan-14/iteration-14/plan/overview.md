# 2L Iteration Plan - Ahiya Analytics: Foundation & Tracking

## Project Vision

Build a privacy-respecting, self-hosted analytics system for ahiya.xyz that captures every page visit with full context (referrer, UTM parameters, device info, geographic location) while maintaining zero impact on site performance. This iteration establishes the complete foundation: database schema, tracking middleware, admin authentication, and the admin dashboard shell.

## Success Criteria

Specific, measurable criteria for Iteration 14 completion:

- [ ] Database table `page_views` exists with all 18 columns and 6 indexes
- [ ] Every page visit triggers tracking middleware (excluding static files and /admin/*)
- [ ] Page view data successfully written to database via `/api/analytics/track`
- [ ] Admin can log in at `/admin/login` with password authentication
- [ ] Invalid login attempts are rate-limited (5 attempts per 15 minutes)
- [ ] JWT session persists for 7 days in httpOnly cookie
- [ ] Protected routes redirect unauthenticated users to `/admin/login`
- [ ] Admin sidebar shows navigation items with icons
- [ ] Logout clears session and redirects to login
- [ ] Tracking adds <50ms latency to page loads (non-blocking)

## MVP Scope

**In Scope (Iteration 14):**
- Vercel Postgres database setup with `page_views` table
- Tracking middleware at project root capturing all visitor data
- Session ID generation and visitor hash for privacy-preserving identification
- Device/browser/OS parsing from user-agent
- Admin authentication with jose JWT
- Rate limiting on login attempts
- Admin layout with sidebar navigation
- Admin header with logout button
- Login page with styled form
- Track API route (POST /api/analytics/track)
- Auth API routes (POST /api/auth/login, POST /api/auth/logout)

**Out of Scope (Iteration 15 - Dashboard & Insights):**
- Dashboard metrics and visualizations
- Real-time live feed
- Pages analytics
- Acquisition analytics
- Visitor insights with world map
- Data export functionality
- Charts and data tables

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current (this document)
3. **Building** - ~3-4 hours (4 parallel builders)
4. **Integration** - ~20 minutes
5. **Validation** - ~15 minutes
6. **Deployment** - Final

## Timeline Estimate

| Phase | Duration | Notes |
|-------|----------|-------|
| Exploration | Complete | 2 explorers analyzed codebase |
| Planning | Complete | This plan |
| Building | 3-4 hours | 4 builders in parallel |
| Integration | 20 min | Merge builder outputs, test connections |
| Validation | 15 min | Manual testing of all flows |
| **Total** | **~4 hours** | |

## Risk Assessment

### High Risks

| Risk | Mitigation |
|------|------------|
| Middleware blocks page load | Use fire-and-forget async pattern with `waitUntil` |
| Edge runtime incompatibility | Use only Edge-compatible packages (jose, ua-parser-js) |
| Database connection issues | Use Vercel Postgres which auto-manages connections |

### Medium Risks

| Risk | Mitigation |
|------|------------|
| Rate limiting memory leak | Use Map with time-based cleanup; acceptable for single-user admin |
| JWT secret exposure | Store in environment variable, never log |
| Cookie security | Use httpOnly, secure, sameSite:lax configuration |

### Low Risks

| Risk | Mitigation |
|------|------------|
| Geo data unavailable | Handle gracefully with null values |
| User-agent parsing fails | Return sensible defaults |

## Integration Strategy

### Builder Dependencies

```
Builder 1 (Database & Tracking API)
    |
    v
Builder 2 (Tracking Middleware) ----> needs lib/db.ts types

Builder 3 (Admin Authentication)
    |
    v
Builder 4 (Admin Layout & Navigation) ----> needs lib/auth.ts functions
```

### Parallel Execution

- **Builder 1** and **Builder 3** can work completely in parallel (no dependencies)
- **Builder 2** needs the `PageViewInsert` type from Builder 1 (can use stub initially)
- **Builder 4** needs `verifyAdminToken` from Builder 3 (can use stub initially)

### Integration Points

1. **Middleware -> Track API**: Builder 2 POSTs to route created by Builder 1
2. **Admin Layout -> Auth**: Builder 4 imports `verifyAdminToken` from Builder 3
3. **Login Page -> Auth API**: Builder 3's login page uses its own API routes

### Shared Types Location

All builders should reference types from `/lib/types/analytics.ts` (created by Builder 1):

```typescript
// Types shared across builders
export interface PageViewInsert { ... }
export interface AdminTokenPayload { ... }
export interface AuthResult { ... }
```

## Deployment Plan

1. **Environment Variables** (must be set before deployment):
   - `POSTGRES_URL` - Vercel Postgres connection string
   - `ADMIN_PASSWORD` - Admin login password
   - `SESSION_SECRET` - 32+ character JWT signing secret

2. **Database Setup**:
   - Connect Vercel Postgres via dashboard
   - Run schema creation SQL (provided in Builder 1 tasks)

3. **Deploy**:
   - Standard Vercel deployment
   - Middleware auto-detected at project root

4. **Verify**:
   - Visit any page, check database for new row
   - Log in to /admin/login
   - Check session cookie exists

## Architecture Decisions

### Why These Technology Choices

| Decision | Rationale |
|----------|-----------|
| Vercel Postgres over Prisma | Simpler for single-table scope, no migration complexity |
| jose over jsonwebtoken | Edge-compatible, smaller bundle, modern API |
| ua-parser-js | Well-maintained, comprehensive device detection |
| Fire-and-forget tracking | Zero impact on page load performance |
| In-memory rate limiting | Sufficient for single-user admin, no Redis needed |
| httpOnly JWT cookie | Prevents XSS token theft while maintaining sessions |

### Why This File Structure

```
middleware.ts          # Root level required by Next.js
lib/
  db.ts               # Database utilities isolated
  auth.ts             # Auth utilities isolated
  types/analytics.ts  # Shared types
app/
  api/
    analytics/track/  # Clear REST structure
    auth/login/       # Auth API namespace
  admin/
    layout.tsx        # Auth gate at layout level
    components/       # Admin-only components
    login/            # Public login page (no auth)
```

## Notes for Builders

1. **Read `patterns.md` first** - Contains exact code patterns to follow
2. **Use absolute imports** - `@/lib/auth` not `../../lib/auth`
3. **Match design system** - Dark theme (#0a0f1a), purple accents, contemplative-card style
4. **Handle errors gracefully** - Never expose internal errors to users
5. **Test incrementally** - Each file should work in isolation before integration
