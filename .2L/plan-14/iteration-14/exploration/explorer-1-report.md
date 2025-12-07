# Explorer 1 Report: Architecture & Structure for Foundation Iteration

## Executive Summary

This report provides detailed implementation specifications for Iteration 14 (Foundation & Tracking) of the Ahiya Analytics system. The analysis covers database schema design, middleware implementation patterns, authentication architecture, file structure, and integration points. The existing codebase follows clean Next.js 16 App Router patterns with a consistent dark theme design system that should be maintained.

---

## 1. Database Schema Details

### page_views Table Structure

```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  
  -- Timing
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Page & Navigation
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(2000),
  
  -- UTM Attribution
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(200),
  utm_content VARCHAR(200),
  utm_term VARCHAR(200),
  
  -- Visitor Identification (Privacy-Preserving)
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  
  -- Device Information
  device_type VARCHAR(20) NOT NULL DEFAULT 'desktop',
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  
  -- Geography (from Vercel Edge Geo)
  country VARCHAR(2),
  city VARCHAR(100),
  region VARCHAR(100),
  
  -- Request Metadata
  user_agent TEXT
);
```

### Column Types and Constraints

| Column | Type | Constraint | Purpose |
|--------|------|------------|---------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Event timestamp with timezone |
| path | VARCHAR(500) | NOT NULL | Page path, max 500 chars |
| referrer | VARCHAR(2000) | NULLABLE | Full referrer URL |
| utm_source | VARCHAR(100) | NULLABLE | Campaign source |
| utm_medium | VARCHAR(100) | NULLABLE | Campaign medium |
| utm_campaign | VARCHAR(200) | NULLABLE | Campaign name |
| utm_content | VARCHAR(200) | NULLABLE | Campaign content |
| utm_term | VARCHAR(200) | NULLABLE | Campaign search term |
| session_id | VARCHAR(36) | NOT NULL | UUID format session identifier |
| visitor_hash | VARCHAR(64) | NOT NULL | SHA-256 hash of visitor fingerprint |
| device_type | VARCHAR(20) | NOT NULL, DEFAULT 'desktop' | desktop/mobile/tablet |
| browser | VARCHAR(50) | NULLABLE | Browser name |
| browser_version | VARCHAR(20) | NULLABLE | Browser version |
| os | VARCHAR(50) | NULLABLE | Operating system |
| os_version | VARCHAR(20) | NULLABLE | OS version |
| country | VARCHAR(2) | NULLABLE | ISO 3166-1 alpha-2 country code |
| city | VARCHAR(100) | NULLABLE | City name |
| region | VARCHAR(100) | NULLABLE | State/Province |
| user_agent | TEXT | NULLABLE | Full user agent string |

### Index Definitions

```sql
-- Primary query pattern: Time-based aggregations
CREATE INDEX idx_page_views_created_at ON page_views (created_at DESC);

-- Path-based queries (top pages)
CREATE INDEX idx_page_views_path ON page_views (path);

-- Session grouping for journey analysis
CREATE INDEX idx_page_views_session_id ON page_views (session_id);

-- Campaign attribution queries
CREATE INDEX idx_page_views_utm_campaign ON page_views (utm_campaign)
  WHERE utm_campaign IS NOT NULL;

-- Composite index for dashboard overview queries
CREATE INDEX idx_page_views_date_path ON page_views (DATE(created_at), path);

-- Visitor uniqueness queries
CREATE INDEX idx_page_views_visitor_hash ON page_views (visitor_hash);
```

### Complete SQL Creation Statement

```sql
-- Create page_views table with all columns and indexes
BEGIN;

CREATE TABLE IF NOT EXISTS page_views (
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

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_campaign ON page_views (utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_page_views_date_path ON page_views (DATE(created_at), path);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_hash ON page_views (visitor_hash);

COMMIT;
```

---

## 2. Middleware Implementation

### Exact Matcher Configuration

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, *.png, *.jpg, *.svg (static assets)
     * - admin (admin dashboard - tracked separately or excluded)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$|admin).*)',
  ],
};
```

### Request Parsing Approach

```typescript
// Extract all tracking data from the request
function parseRequest(request: NextRequest) {
  const url = new URL(request.url);
  
  // 1. Path extraction
  const path = url.pathname;
  
  // 2. Referrer extraction
  const referrer = request.headers.get('referer') || null;
  
  // 3. UTM parameter extraction
  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');
  const utmContent = url.searchParams.get('utm_content');
  const utmTerm = url.searchParams.get('utm_term');
  
  // 4. User-Agent extraction
  const userAgent = request.headers.get('user-agent') || '';
  
  // 5. Vercel Edge Geo (available on Edge runtime)
  const geo = request.geo || {};
  const country = geo.country || null;
  const city = geo.city || null;
  const region = geo.region || null;
  
  return {
    path,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    userAgent,
    country,
    city,
    region,
  };
}
```

### Session ID Generation Algorithm

```typescript
// Generate a unique session ID using crypto API (Edge-compatible)
function generateSessionId(): string {
  // Use crypto.randomUUID() which is available in Edge runtime
  return crypto.randomUUID();
}

// Session cookie configuration
const SESSION_COOKIE_NAME = 'ahiya_session';
const SESSION_COOKIE_MAX_AGE = 30 * 60; // 30 minutes

function getOrCreateSessionId(request: NextRequest): {
  sessionId: string;
  isNew: boolean;
} {
  const existingSession = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  
  if (existingSession) {
    return { sessionId: existingSession, isNew: false };
  }
  
  return { sessionId: generateSessionId(), isNew: true };
}
```

### Visitor Hash Algorithm (Privacy-Preserving)

```typescript
// Create a privacy-preserving visitor hash
// Uses: IP + User-Agent + Date (daily rotation for privacy)
async function generateVisitorHash(request: NextRequest): Promise<string> {
  // Get IP from Vercel headers (Edge-specific)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  
  const userAgent = request.headers.get('user-agent') || '';
  
  // Daily rotation key - changes at midnight UTC
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Combine components with a salt
  const input = `${ip}|${userAgent}|${date}|ahiya-analytics-salt-v1`;
  
  // Hash using SHA-256 (Edge-compatible via Web Crypto API)
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
```

### Device/Browser Parsing with ua-parser-js

```typescript
// Parse user agent for device information
// Note: ua-parser-js must be imported carefully for Edge runtime
import { UAParser } from 'ua-parser-js';

interface DeviceInfo {
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
}

function parseUserAgent(userAgent: string): DeviceInfo {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  // Determine device type
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  const deviceTypeFromParser = result.device?.type;
  if (deviceTypeFromParser === 'mobile') {
    deviceType = 'mobile';
  } else if (deviceTypeFromParser === 'tablet') {
    deviceType = 'tablet';
  }
  
  return {
    deviceType,
    browser: result.browser?.name || null,
    browserVersion: result.browser?.version || null,
    os: result.os?.name || null,
    osVersion: result.os?.version || null,
  };
}
```

### Complete Middleware Structure

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UAParser } from 'ua-parser-js';

const SESSION_COOKIE_NAME = 'ahiya_session';
const SESSION_MAX_AGE = 30 * 60; // 30 minutes

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip if it's a bot (basic check)
  const userAgent = request.headers.get('user-agent') || '';
  if (isBot(userAgent)) {
    return response;
  }
  
  // Get or create session
  const { sessionId, isNew } = getOrCreateSessionId(request);
  
  // Set session cookie if new
  if (isNew) {
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });
  }
  
  // Fire async tracking (non-blocking)
  const trackingPromise = trackPageView(request, sessionId);
  
  // Use waitUntil if available (Vercel Edge)
  if ('waitUntil' in response && typeof response.waitUntil === 'function') {
    (response as any).waitUntil(trackingPromise);
  } else {
    // Fire and forget for other environments
    trackingPromise.catch(console.error);
  }
  
  return response;
}

async function trackPageView(request: NextRequest, sessionId: string) {
  try {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    const geo = request.geo || {};
    const deviceInfo = parseUserAgent(userAgent);
    const visitorHash = await generateVisitorHash(request);
    
    // Construct tracking payload
    const payload = {
      path: url.pathname,
      referrer: request.headers.get('referer') || null,
      utmSource: url.searchParams.get('utm_source'),
      utmMedium: url.searchParams.get('utm_medium'),
      utmCampaign: url.searchParams.get('utm_campaign'),
      utmContent: url.searchParams.get('utm_content'),
      utmTerm: url.searchParams.get('utm_term'),
      sessionId,
      visitorHash,
      deviceType: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      browserVersion: deviceInfo.browserVersion,
      os: deviceInfo.os,
      osVersion: deviceInfo.osVersion,
      country: geo.country || null,
      city: geo.city || null,
      region: geo.region || null,
      userAgent,
    };
    
    // POST to tracking API (internal)
    const origin = url.origin;
    await fetch(`${origin}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('[Analytics] Tracking error:', error);
  }
}

function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i, /spider/i, /crawl/i, /slurp/i, /mediapartners/i,
    /Googlebot/i, /Bingbot/i, /Baiduspider/i, /YandexBot/i,
    /facebookexternalhit/i, /Twitterbot/i, /LinkedInBot/i,
  ];
  return botPatterns.some(pattern => pattern.test(userAgent));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$|admin).*)',
  ],
};
```

---

## 3. Authentication Flow

### JWT Payload Structure

```typescript
// lib/auth.ts
import * as jose from 'jose';

interface AdminTokenPayload {
  sub: 'admin';           // Subject - always 'admin' for single-user
  iat: number;            // Issued at timestamp
  exp: number;            // Expiration timestamp
  jti: string;            // JWT ID for potential revocation
}

// Token configuration
const TOKEN_EXPIRY = '7d';          // 7 day token lifetime
const TOKEN_REFRESH_THRESHOLD = 60 * 60 * 24; // Refresh if <24h remaining

// Secret key generation from env
async function getSecretKey(): Promise<Uint8Array> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

// Create admin JWT
export async function createAdminToken(): Promise<string> {
  const secret = await getSecretKey();
  
  const token = await new jose.SignJWT({ sub: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .setJti(crypto.randomUUID())
    .sign(secret);
  
  return token;
}

// Verify admin JWT
export async function verifyAdminToken(token: string): Promise<{
  valid: boolean;
  payload?: AdminTokenPayload;
  needsRefresh?: boolean;
}> {
  try {
    const secret = await getSecretKey();
    const { payload } = await jose.jwtVerify(token, secret);
    
    // Check if refresh is needed
    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);
    const needsRefresh = (exp - now) < TOKEN_REFRESH_THRESHOLD;
    
    return {
      valid: true,
      payload: payload as unknown as AdminTokenPayload,
      needsRefresh,
    };
  } catch (error) {
    return { valid: false };
  }
}
```

### Cookie Configuration

```typescript
// Cookie settings for auth token
const AUTH_COOKIE_NAME = 'ahiya_admin_session';

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,                      // Not accessible via JavaScript
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'lax' as const,            // CSRF protection
  path: '/',                           // Available on all routes
  maxAge: 60 * 60 * 24 * 7,            // 7 days (matches JWT expiry)
};

// Set auth cookie
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
}

// Clear auth cookie
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
}

// Get auth cookie from request
export function getAuthCookie(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value || null;
}
```

### Rate Limiting Approach

```typescript
// In-memory rate limiting for login attempts
// For production, consider Redis or Vercel KV

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,           // Max failed attempts
  windowMs: 15 * 60 * 1000, // 15 minute window
  blockDurationMs: 30 * 60 * 1000, // 30 minute block
};

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export function checkRateLimit(request: NextRequest): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const ip = getClientIP(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  
  // No previous attempts
  if (!entry) {
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }
  
  // Check if blocked
  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000),
    };
  }
  
  // Check if window has expired
  if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.delete(ip);
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }
  
  // Check attempt count
  const remaining = RATE_LIMIT_CONFIG.maxAttempts - entry.attempts;
  return { allowed: remaining > 0, remainingAttempts: Math.max(0, remaining) };
}

export function recordFailedAttempt(request: NextRequest): void {
  const ip = getClientIP(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || {
    attempts: 0,
    firstAttempt: now,
    blockedUntil: null,
  };
  
  entry.attempts++;
  
  if (entry.attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
    entry.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
  }
  
  rateLimitStore.set(ip, entry);
}

export function clearRateLimit(request: NextRequest): void {
  const ip = getClientIP(request);
  rateLimitStore.delete(ip);
}
```

### Login Form Validation

```typescript
// Login request validation schema
interface LoginRequest {
  password: string;
}

function validateLoginRequest(body: unknown): {
  valid: boolean;
  password?: string;
  error?: string;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  
  const { password } = body as Record<string, unknown>;
  
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 1 || password.length > 256) {
    return { valid: false, error: 'Invalid password format' };
  }
  
  return { valid: true, password };
}

// Password verification (constant-time comparison)
async function verifyPassword(input: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    throw new Error('ADMIN_PASSWORD not configured');
  }
  
  // Use subtle timing-safe comparison via hashing
  const encoder = new TextEncoder();
  const inputHash = await crypto.subtle.digest('SHA-256', encoder.encode(input));
  const correctHash = await crypto.subtle.digest('SHA-256', encoder.encode(correctPassword));
  
  const inputArray = new Uint8Array(inputHash);
  const correctArray = new Uint8Array(correctHash);
  
  if (inputArray.length !== correctArray.length) {
    return false;
  }
  
  let match = true;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] !== correctArray[i]) {
      match = false;
    }
  }
  
  return match;
}
```

---

## 4. File Structure Details

### New Files to Create

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── middleware.ts                              # Tracking middleware (root level)
├── lib/
│   ├── db.ts                                  # Vercel Postgres connection
│   └── auth.ts                                # JWT auth utilities
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   ├── track/
│   │   │   │   └── route.ts                   # POST - record page view
│   │   │   └── overview/
│   │   │       └── route.ts                   # GET - basic metrics
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts                   # POST - authenticate
│   │       └── logout/
│   │           └── route.ts                   # POST - clear session
│   └── admin/
│       ├── layout.tsx                         # Admin layout with auth gate
│       ├── page.tsx                           # Dashboard placeholder
│       ├── login/
│       │   └── page.tsx                       # Login form
│       └── components/
│           ├── AdminSidebar.tsx               # Sidebar navigation
│           └── AdminHeader.tsx                # Header with logout
```

### Import Patterns to Follow

Based on existing codebase analysis:

```typescript
// Absolute imports using @/ alias (from tsconfig.json paths)
import { Navigation } from "@/app/components/Navigation";
import { portfolioProjects } from "@/app/data/portfolio";

// Type imports
import type { Metadata, Viewport } from "next";
import type { NextRequest } from "next/server";

// React imports
import React, { useState, useEffect, useRef } from "react";

// Next.js specific
import { NextResponse } from "next/server";
import Link from "next/link";
import Image from "next/image";

// Lucide icons (already in project)
import { Mail, Github, Menu, X, ArrowUpRight } from "lucide-react";
```

### Component Patterns from Existing Code

**Client Components Pattern:**
```typescript
"use client";

import React, { useState, useEffect } from "react";

export function ComponentName({ prop1, prop2 }: Props) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

**Server Component Pattern:**
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Ahiya Butman",
  description: "...",
};

export default function PageName() {
  return (
    <main className="...">
      {/* JSX */}
    </main>
  );
}
```

**Layout Pattern:**
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin Dashboard",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Layout wrapper */}
      {children}
    </>
  );
}
```

---

## 5. Integration Points

### Middleware Integration with Next.js Config

The middleware file should be placed at the **project root** (not in /app):

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── middleware.ts          # <-- HERE at root level
├── next.config.ts
├── package.json
├── app/
│   └── ...
```

**Why root level:**
- Next.js 16 looks for middleware at project root
- Middleware runs before route handlers
- Matcher config controls which routes trigger middleware

**No changes needed to next.config.ts** - middleware is auto-detected by Next.js.

### Admin Route Protection

**Two-layer protection:**

1. **Layout-level auth check (Server Component):**

```typescript
// app/admin/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ahiya_admin_session')?.value;
  
  // Skip auth check for login page
  // (handled via nested layout or conditional)
  
  if (!token) {
    redirect('/admin/login');
  }
  
  const { valid } = await verifyAdminToken(token);
  
  if (!valid) {
    redirect('/admin/login');
  }
  
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Sidebar + Header + Content */}
      {children}
    </div>
  );
}
```

2. **Login page bypass:**

Create a separate layout for login page that doesn't have auth check:

```typescript
// app/admin/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

Or use a route group:

```
app/admin/
├── (authenticated)/
│   ├── layout.tsx        # Has auth check
│   ├── page.tsx          # Dashboard
│   └── ...
└── login/
    └── page.tsx          # No auth check
```

### API Route Patterns

**Standard API route structure:**

```typescript
// app/api/analytics/track/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate body
    // Insert into database
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Protected API route pattern:**

```typescript
// app/api/analytics/overview/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookie, verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // Auth check
  const token = getAuthCookie(request);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { valid } = await verifyAdminToken(token);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
  
  // Proceed with protected logic
  try {
    // Query database
    // Return data
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 6. Styling Consistency

### Design System from globals.css

**Color Palette:**
- Background: `#0a0f1a`
- Text primary: `#f8fafc` (slate-50)
- Text secondary: `#cbd5e1` (slate-300)
- Text muted: `#64748b` (slate-500)
- Accent primary: `rgba(168, 85, 247, ...)` (purple-500)
- Border: `rgba(255, 255, 255, 0.08)`

**Card Style (contemplative-card):**
```css
.contemplative-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

**Button Style (gentle-button):**
```css
.gentle-button {
  padding: 12px 24px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  color: #e2e8f0;
}
```

**Container Classes:**
- `.container-wide`: max-width 1200px
- `.container-content`: max-width 800px
- `.container-narrow`: max-width 600px

**Typography:**
- Font families: Inter (body), Crimson Text (display)
- Available via CSS variables: `--font-inter`, `--font-crimson`

---

## 7. Dependencies to Install

### Production Dependencies

```bash
npm install @vercel/postgres jose ua-parser-js
```

| Package | Version | Purpose |
|---------|---------|---------|
| @vercel/postgres | ^0.10.0 | Vercel Postgres client |
| jose | ^5.9.6 | JWT signing/verification (Edge-compatible) |
| ua-parser-js | ^2.0.0 | User-agent parsing |

### DevDependencies

```bash
npm install -D @types/ua-parser-js
```

---

## 8. Environment Variables

### Required Variables

Add to `.env.local` (and Vercel project settings):

```env
# Vercel Postgres (auto-configured when you connect a database)
POSTGRES_URL="postgres://..."

# Admin authentication
ADMIN_PASSWORD="your-secure-admin-password-here"
SESSION_SECRET="minimum-32-character-random-string-for-jwt-signing"
```

**Generating SESSION_SECRET:**
```bash
openssl rand -base64 32
```

---

## 9. Complexity Assessment

### Builder 1: Database & Tracking API
**Complexity: MEDIUM**
- Vercel Postgres is straightforward
- SQL schema is well-defined
- Track API is simple INSERT

### Builder 2: Tracking Middleware
**Complexity: HIGH**
- Edge runtime constraints
- Async non-blocking pattern
- Multiple parsing functions
- Cookie management

### Builder 3: Admin Authentication
**Complexity: MEDIUM-HIGH**
- jose JWT is well-documented
- Rate limiting adds complexity
- Cookie security is critical

### Builder 4: Admin Layout & Navigation
**Complexity: MEDIUM**
- Server Component auth check
- Sidebar/header components
- Match existing design system

---

## 10. Recommendations for Planner

1. **Builder 2 (Middleware) is the critical path** - other builders depend on tracking working correctly.

2. **Builder 1 and Builder 3 can work in parallel** - no dependencies between them.

3. **Builder 4 should start after Builder 3 creates lib/auth.ts** - needs auth utilities for layout protection.

4. **Environment variables must be set before any builder can test** - coordinate early.

5. **Consider creating a shared types file** early:
   ```typescript
   // lib/types.ts
   export interface PageViewEvent { ... }
   export interface AdminTokenPayload { ... }
   ```

6. **Middleware testing is tricky** - recommend Builder 2 includes manual curl tests and documents them.

---

## 11. Questions for Planner

1. Should admin dashboard be excluded from tracking, or track it separately?

2. Should there be a "test mode" that logs to console instead of database?

3. What's the fallback if Vercel geo is unavailable (non-Vercel deployments)?

4. Should session duration extend on activity, or be fixed 30 minutes?

---

## 12. Resource Map

### Critical Files

| Path | Purpose |
|------|---------|
| `/middleware.ts` | Tracking middleware (root level) |
| `/lib/db.ts` | Database connection and queries |
| `/lib/auth.ts` | JWT and authentication utilities |
| `/app/api/analytics/track/route.ts` | Record page views |
| `/app/admin/layout.tsx` | Admin auth gate and shell |

### Key Dependencies

- `@vercel/postgres` - Database client
- `jose` - Edge-compatible JWT
- `ua-parser-js` - User-agent parsing
- `lucide-react` - Icons (already installed)

---

**Report Status:** COMPLETE
**Prepared for:** Planner Agent
**Iteration:** 14 (Foundation & Tracking)
