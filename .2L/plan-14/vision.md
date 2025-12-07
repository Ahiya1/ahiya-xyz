# Project Vision: Ahiya Analytics

**Created:** 2025-12-07T10:30:00Z
**Plan:** plan-14

---

## Problem Statement

You're actively doing outreach, sharing your portfolio with potential clients and collaborators. But you're flying blind - no visibility into who's visiting, what they're looking at, or whether your efforts are translating into engagement.

**Current pain points:**
- Zero insight into site traffic or visitor behavior
- No way to know if outreach efforts drive actual visits
- Can't identify which projects resonate most with visitors
- No understanding of visitor demographics or intent signals

---

## Target Users

**Primary user:** Ahiya (site owner)
- Needs quick daily overview of site performance
- Wants to correlate outreach efforts (tracked in SelahReach) with site visits
- Values privacy-respecting analytics that don't compromise visitor trust

**Secondary users (future):** Potential collaborators
- May need read-only dashboard access
- Could benefit from shared insights

---

## Core Value Proposition

**Complete visibility into your portfolio's performance without compromising visitor privacy.**

**Key benefits:**
1. Know exactly who's visiting, from where, and what they engage with
2. Identify which projects and content resonate most
3. Track outreach effectiveness through UTM attribution
4. Make data-driven decisions about portfolio improvements
5. Professional-grade analytics that match your premium brand

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **Event Tracking System**
   - Description: Lightweight, privacy-respecting tracking that captures visitor events without cookies or fingerprinting
   - User story: As the site owner, I want all visits tracked automatically so I have complete visibility
   - Technical approach:
     - Middleware-based tracking (no client-side script bloat)
     - Store: page views, referrers, UTM params, device info, geo (from IP)
     - Privacy-first: Hash IPs, no persistent identifiers
   - Acceptance criteria:
     - [ ] Every page view is captured with timestamp
     - [ ] Referrer and UTM parameters are extracted and stored
     - [ ] Device type, browser, OS detected from user agent
     - [ ] Geographic location resolved from IP (country, city)
     - [ ] No cookies set, no fingerprinting, GDPR-friendly
     - [ ] Tracking adds <50ms latency to page loads

#### 2. **Traffic Dashboard**
   - Description: Clean, premium dashboard showing key traffic metrics at a glance
   - User story: As the site owner, I want to see my site's performance in seconds
   - Metrics displayed:
     - Total page views (today, 7d, 30d, all time)
     - Unique visitors (session-based, not cookie-based)
     - Top pages by views
     - Traffic trend chart (daily views over time)
     - Bounce rate and avg session duration
   - Acceptance criteria:
     - [ ] Dashboard loads in <1 second
     - [ ] Time range selector (today, 7d, 30d, 90d, custom)
     - [ ] Metrics update without full page reload
     - [ ] Mobile-responsive design
     - [ ] Matches site's premium aesthetic

#### 3. **Acquisition Analytics**
   - Description: Understand where visitors come from
   - User story: As the site owner, I want to know which channels drive traffic so I can focus my outreach
   - Breakdown by:
     - Source type (direct, organic search, social, referral, email)
     - Specific referrers (linkedin.com, twitter.com, google.com, etc.)
     - UTM campaigns (for tagged outreach links)
     - Landing pages (which page they entered on)
   - Acceptance criteria:
     - [ ] Pie/bar chart of traffic sources
     - [ ] Drill-down into specific referrers
     - [ ] UTM parameter breakdown (source, medium, campaign, content)
     - [ ] Top landing pages list
     - [ ] Click any source to filter all metrics by it

#### 4. **Visitor Insights**
   - Description: Demographic and technical profile of your audience
   - User story: As the site owner, I want to understand who my visitors are
   - Breakdown by:
     - Geography (world map + country/city list)
     - Device type (desktop vs mobile vs tablet)
     - Browser and OS
     - Screen resolution
     - Language/locale
   - Acceptance criteria:
     - [ ] Interactive world map showing visitor locations
     - [ ] Device breakdown with percentages
     - [ ] Browser/OS distribution charts
     - [ ] All insights filterable by time range

#### 5. **Page Performance**
   - Description: Deep dive into individual page engagement
   - User story: As the site owner, I want to know which projects get the most attention
   - Metrics per page:
     - Views and unique visitors
     - Avg time on page
     - Bounce rate (left without further navigation)
     - Entry rate (how often it's the landing page)
     - Exit rate (how often visitors leave from here)
   - Acceptance criteria:
     - [ ] Sortable table of all pages
     - [ ] Click to see detailed stats for any page
     - [ ] Highlight top performing pages
     - [ ] Identify underperforming pages

#### 6. **Real-Time View**
   - Description: Live feed of current site activity
   - User story: As the site owner, I want to see visitors as they happen, especially after sending outreach
   - Features:
     - Current active visitors count
     - Live feed of recent page views (last 30 minutes)
     - Show: page, location, device, referrer for each
   - Acceptance criteria:
     - [ ] Updates every 5 seconds without refresh
     - [ ] Shows visitor count "X people on site now"
     - [ ] Scrolling feed of recent activity
     - [ ] Visual indicator when new visit arrives

#### 7. **Admin Authentication**
   - Description: Secure access to the analytics dashboard
   - User story: As the site owner, I want only me to access my analytics
   - Approach:
     - Simple password protection for MVP
     - `/admin` route with login gate
     - Session-based auth (httpOnly cookie)
     - Environment variable for password
   - Acceptance criteria:
     - [ ] `/admin` redirects to login if not authenticated
     - [ ] Password stored securely (env var, not in code)
     - [ ] Session persists across browser closes (remember me)
     - [ ] Logout functionality
     - [ ] Rate limiting on login attempts

#### 8. **Data Storage**
   - Description: Persistent, queryable storage for all analytics data
   - Technical approach:
     - Vercel Postgres for structured event storage
     - Efficient schema for fast aggregation queries
     - Indexes on common query patterns (date, page, referrer)
   - Acceptance criteria:
     - [ ] All events persisted reliably
     - [ ] Queries for dashboard data complete in <200ms
     - [ ] Schema supports all required dimensions
     - [ ] Data integrity maintained

---

### Should-Have (Post-MVP)

1. **Export to CSV** - Download raw data or aggregated reports
2. **Scroll Depth Tracking** - See how far visitors scroll on each page
3. **Click Heatmaps** - Visualize where visitors click (requires client script)
4. **User Journeys** - Flow visualization: entry page -> navigation -> exit
5. **Weekly Email Digest** - Automated summary sent to your inbox
6. **Comparison Mode** - Compare this week vs last week, this month vs last
7. **Goals/Conversions** - Track specific actions (clicked contact, viewed 3+ projects)
8. **Annotations** - Mark events on timeline ("Launched LinkedIn campaign")
9. **API Access** - Programmatic access to analytics data

---

### Could-Have (Future)

1. **Multi-user Access** - Invite collaborators with role-based permissions
2. **Custom Dashboards** - Build personalized metric views
3. **Alerting** - Notifications for traffic spikes or anomalies
4. **A/B Testing Integration** - Track variant performance
5. **SEO Insights** - Search query data (requires Search Console integration)
6. **Performance Monitoring** - Page load times, Core Web Vitals
7. **Revenue Attribution** - Connect visits to actual client conversions
8. **White-label Mode** - Show analytics to clients for their projects

---

## User Flows

### Flow 1: Daily Analytics Check

**Steps:**
1. User navigates to `/admin`
2. If not logged in, sees login form
3. Enters password, submits
4. System validates, sets session cookie
5. Dashboard loads with today's overview
6. User sees: visitors today, top pages, recent activity feed
7. User adjusts time range to see weekly trends
8. User clicks on a specific referrer to filter

**Edge cases:**
- Wrong password: Show error, rate limit after 5 attempts
- Session expired: Redirect to login with "session expired" message
- No data yet: Show friendly empty state with "No visits recorded yet"

**Error handling:**
- Database unavailable: Show cached data if available, else error message
- Slow queries: Loading skeleton, don't block entire dashboard

### Flow 2: Post-Outreach Check

**Steps:**
1. User sends outreach emails with UTM-tagged links (via SelahReach)
2. User opens `/admin` real-time view
3. Watches live feed for incoming visits
4. Sees new visit arrive with UTM params matching their campaign
5. Notes which pages the visitor explored
6. Later, checks acquisition tab to see campaign performance

**Edge cases:**
- No UTM params: Visit still tracked, shows as "direct" or referrer-based
- Bot traffic: Filter out known bots from metrics

### Flow 3: Monthly Review

**Steps:**
1. User sets time range to "Last 30 days"
2. Reviews traffic trend chart for patterns
3. Checks top pages to see which projects performed best
4. Reviews geographic distribution
5. Exports data to CSV for records/analysis
6. Compares to previous month (post-MVP)

---

## Data Model Overview

**Key entities:**

1. **PageView** (core event)
   - Fields: id, timestamp, path, referrer, utm_source, utm_medium, utm_campaign, utm_content, country, city, device_type, browser, os, screen_width, session_id, visitor_hash
   - Indexes: timestamp, path, session_id, utm_campaign

2. **Session** (derived/computed)
   - Fields: session_id, started_at, ended_at, page_count, entry_page, exit_page, duration_seconds, visitor_hash
   - Note: Can be computed from PageViews or stored separately

3. **DailyAggregate** (for fast dashboard queries)
   - Fields: date, path, views, unique_visitors, avg_time_on_page
   - Purpose: Pre-computed rollups for performance

---

## Technical Requirements

**Must support:**
- High write throughput (handle traffic spikes without data loss)
- Fast read queries (dashboard loads in <1s)
- Privacy compliance (GDPR-friendly, no PII storage)
- Mobile-responsive admin interface
- Works with existing Next.js 15+ / App Router architecture

**Constraints:**
- Must use Vercel Postgres (already in stack) or add minimal new infrastructure
- Tracking must not degrade site performance (< 50ms added latency)
- No third-party tracking scripts (keep site fast and clean)

**Preferences:**
- Server-side tracking via middleware (more reliable than client-side)
- Consistent with existing site design system
- TypeScript throughout
- React Server Components for dashboard where appropriate

---

## Success Criteria

**The MVP is successful when:**

1. **Complete Visibility**
   - Metric: Every page view is tracked with full context
   - Target: 100% of visits captured with referrer, device, geo data

2. **Instant Insights**
   - Metric: Dashboard load time
   - Target: Full dashboard renders in < 1 second

3. **Actionable Attribution**
   - Metric: UTM tracking accuracy
   - Target: 100% of UTM-tagged visits properly attributed to campaigns

4. **Real-Time Awareness**
   - Metric: Live view latency
   - Target: New visits appear in feed within 5 seconds

5. **Production Ready**
   - Metric: Uptime and reliability
   - Target: No data loss, no dashboard errors for 7 days post-launch

---

## Out of Scope

**Explicitly not included in MVP:**
- Outreach/CRM tracking (handled by SelahReach)
- Revenue or conversion value tracking
- Multi-user access control
- Email reports/digests
- Click heatmaps (requires client-side script complexity)
- A/B testing
- SEO/search query data
- Third-party integrations

**Why:** Focus on core analytics foundation. These features build on top and can come later. SelahReach handles the outreach side - this is purely site observation.

---

## Assumptions

1. Vercel Postgres can handle expected write volume (likely low for portfolio site)
2. IP-based geolocation is sufficient (no need for paid GeoIP service)
3. Session identification via server-side heuristics is acceptable (vs cookies)
4. Bot filtering via user-agent detection is sufficient for MVP
5. Single-user auth is sufficient for now

---

## Open Questions

1. Should sessions be computed on-the-fly or stored as separate entities?
2. What's the data retention policy? (Keep forever vs rolling window)
3. Should there be a public "visitor counter" anywhere on the site? (Probably not, but worth considering)
4. Integration point with SelahReach - any data sharing needed, or purely separate?

---

## Admin Dashboard Structure

```
/admin
├── /login              # Authentication gate
├── /                   # Overview dashboard (default)
├── /realtime           # Live visitor feed
├── /pages              # Per-page analytics
├── /acquisition        # Traffic sources & campaigns
├── /visitors           # Demographics & devices
└── /export             # Data export tools
```

---

## Visual Design Direction

The admin dashboard should feel:
- **Premium** - Matches the portfolio's refined aesthetic
- **Clear** - Data visualization that's immediately understandable
- **Fast** - Snappy interactions, no waiting
- **Dark mode** - Consistent with site's dark theme
- **Minimal** - No clutter, just the insights that matter

Key UI elements:
- Metric cards with sparklines
- Clean data tables with sorting
- Chart.js or Recharts for visualizations
- World map for geographic view
- Activity feed with subtle animations

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-plan` for interactive master planning
- [ ] OR run `/2l-mvp` to auto-plan and execute

---

**Vision Status:** VISIONED
**Ready for:** Master Planning
