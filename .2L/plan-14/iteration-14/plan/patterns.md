# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── middleware.ts                              # Tracking middleware (ROOT level)
├── lib/
│   ├── db.ts                                  # Database connection and queries
│   ├── auth.ts                                # JWT and authentication utilities
│   └── types/
│       └── analytics.ts                       # Shared TypeScript types
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   └── track/
│   │   │       └── route.ts                   # POST - record page view
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts                   # POST - authenticate
│   │       └── logout/
│   │           └── route.ts                   # POST - clear session
│   └── admin/
│       ├── layout.tsx                         # Admin layout with auth gate
│       ├── page.tsx                           # Dashboard placeholder
│       ├── login/
│       │   └── page.tsx                       # Login form (public)
│       └── components/
│           ├── AdminSidebar.tsx               # Sidebar navigation
│           └── AdminHeader.tsx                # Header with logout
```

---

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `AdminSidebar.tsx` |
| Pages | lowercase + page.tsx | `login/page.tsx` |
| API Routes | lowercase + route.ts | `track/route.ts` |
| Utility files | camelCase | `auth.ts` |
| Types/Interfaces | PascalCase | `PageViewInsert` |
| Functions | camelCase | `createAdminToken()` |
| Constants | SCREAMING_SNAKE_CASE | `SESSION_MAX_AGE` |
| CSS classes | kebab-case | `contemplative-card` |

---

## Import Order Convention

```typescript
// 1. "use client" directive (if needed)
"use client";

// 2. React and Next.js imports
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 3. External libraries
import { sql } from "@vercel/postgres";
import * as jose from "jose";
import { UAParser } from "ua-parser-js";
import {
  LayoutDashboard,
  Activity,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

// 4. Internal components (absolute @/ paths)
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";
import { AdminHeader } from "@/app/admin/components/AdminHeader";

// 5. Type imports
import type { PageViewInsert } from "@/lib/types/analytics";
import type { AdminTokenPayload } from "@/lib/auth";

// 6. Data and utilities
import { verifyAdminToken } from "@/lib/auth";
import { insertPageView } from "@/lib/db";
```

---

## TypeScript Types

### Core Analytics Types

```typescript
// lib/types/analytics.ts

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
 * Session management
 */
export interface SessionInfo {
  sessionId: string;
  isNew: boolean;
}
```

### Auth Types

```typescript
// In lib/auth.ts or lib/types/auth.ts

/**
 * JWT payload structure for admin sessions
 */
export interface AdminTokenPayload {
  sub: "admin";
  iat: number;
  exp: number;
  jti: string;
}

/**
 * Result of token verification
 */
export interface TokenVerificationResult {
  valid: boolean;
  payload?: AdminTokenPayload;
  needsRefresh?: boolean;
}

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
}

/**
 * Login request body
 */
export interface LoginRequest {
  password: string;
}

/**
 * Login API response
 */
export interface LoginResponse {
  success: boolean;
  error?: string;
}
```

---

## API Route Patterns

### Public API Route (Track)

```typescript
// app/api/analytics/track/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { insertPageView } from "@/lib/db";
import type { PageViewInsert } from "@/lib/types/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PageViewInsert;

    // Validate required fields
    if (!body.path || !body.sessionId || !body.visitorHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into database
    await insertPageView(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics Track] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Authenticated API Route Pattern

```typescript
// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookie, verifyAdminToken, clearAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Verify authentication
  const token = getAuthCookie(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { valid } = await verifyAdminToken(token);

  if (!valid) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  // Perform authenticated action
  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);

  return response;
}
```

### Rate-Limited API Route Pattern

```typescript
// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  verifyPassword,
  createAdminToken,
  setAuthCookie,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Check rate limit first
  const rateLimit = checkRateLimit(request);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many attempts. Try again later.",
        retryAfter: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(password);

    if (!isValid) {
      recordFailedAttempt(request);
      return NextResponse.json(
        {
          error: "Invalid password",
          remainingAttempts: rateLimit.remainingAttempts - 1,
        },
        { status: 401 }
      );
    }

    // Success - clear rate limit and create session
    clearRateLimit(request);
    const token = await createAdminToken();

    const response = NextResponse.json({ success: true });
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("[Auth Login] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Database Patterns

### Database Connection

```typescript
// lib/db.ts
import { sql } from "@vercel/postgres";
import type { PageViewInsert } from "@/lib/types/analytics";

/**
 * Insert a new page view record
 */
export async function insertPageView(data: PageViewInsert): Promise<void> {
  await sql`
    INSERT INTO page_views (
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      session_id,
      visitor_hash,
      device_type,
      browser,
      browser_version,
      os,
      os_version,
      country,
      city,
      region,
      user_agent
    ) VALUES (
      ${data.path},
      ${data.referrer},
      ${data.utmSource},
      ${data.utmMedium},
      ${data.utmCampaign},
      ${data.utmContent},
      ${data.utmTerm},
      ${data.sessionId},
      ${data.visitorHash},
      ${data.deviceType},
      ${data.browser},
      ${data.browserVersion},
      ${data.os},
      ${data.osVersion},
      ${data.country},
      ${data.city},
      ${data.region},
      ${data.userAgent}
    )
  `;
}
```

### Schema Creation SQL

```sql
-- Run this in Vercel Postgres console or via migration script
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

## Authentication Patterns

### JWT Creation

```typescript
// lib/auth.ts
import * as jose from "jose";

const TOKEN_EXPIRY = "7d";

async function getSecretKey(): Promise<Uint8Array> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(): Promise<string> {
  const secret = await getSecretKey();

  const token = await new jose.SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .setJti(crypto.randomUUID())
    .sign(secret);

  return token;
}
```

### JWT Verification

```typescript
// lib/auth.ts
export async function verifyAdminToken(
  token: string
): Promise<TokenVerificationResult> {
  try {
    const secret = await getSecretKey();
    const { payload } = await jose.jwtVerify(token, secret);

    // Check if refresh is needed (less than 24h remaining)
    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);
    const needsRefresh = exp - now < 60 * 60 * 24;

    return {
      valid: true,
      payload: payload as unknown as AdminTokenPayload,
      needsRefresh,
    };
  } catch {
    return { valid: false };
  }
}
```

### Cookie Management

```typescript
// lib/auth.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "ahiya_admin_session";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getAuthCookie(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value || null;
}
```

### Rate Limiting

```typescript
// lib/auth.ts
interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000, // 30 minutes
};

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkRateLimit(request: NextRequest): RateLimitResult {
  const ip = getClientIP(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }

  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000),
    };
  }

  if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.delete(ip);
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }

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

### Password Verification (Constant-Time)

```typescript
// lib/auth.ts
export async function verifyPassword(input: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    throw new Error("ADMIN_PASSWORD not configured");
  }

  // Constant-time comparison via hashing
  const encoder = new TextEncoder();
  const inputHash = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(input)
  );
  const correctHash = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(correctPassword)
  );

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

## Middleware Patterns

### Session ID Generation

```typescript
// middleware.ts
const SESSION_COOKIE_NAME = "ahiya_session";
const SESSION_MAX_AGE = 30 * 60; // 30 minutes

function getOrCreateSessionId(request: NextRequest): SessionInfo {
  const existingSession = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (existingSession) {
    return { sessionId: existingSession, isNew: false };
  }

  return { sessionId: crypto.randomUUID(), isNew: true };
}
```

### Visitor Hash Generation (Privacy-Preserving)

```typescript
// middleware.ts
async function generateVisitorHash(request: NextRequest): Promise<string> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "";
  const date = new Date().toISOString().split("T")[0]; // Daily rotation

  const input = `${ip}|${userAgent}|${date}|ahiya-analytics-salt-v1`;

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
```

### User Agent Parsing

```typescript
// middleware.ts
import { UAParser } from "ua-parser-js";
import type { DeviceInfo } from "@/lib/types/analytics";

function parseUserAgent(userAgent: string): DeviceInfo {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  const deviceTypeFromParser = result.device?.type;
  if (deviceTypeFromParser === "mobile") {
    deviceType = "mobile";
  } else if (deviceTypeFromParser === "tablet") {
    deviceType = "tablet";
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

### Bot Detection

```typescript
// middleware.ts
function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /slurp/i,
    /mediapartners/i,
    /Googlebot/i,
    /Bingbot/i,
    /Baiduspider/i,
    /YandexBot/i,
    /facebookexternalhit/i,
    /Twitterbot/i,
    /LinkedInBot/i,
  ];
  return botPatterns.some((pattern) => pattern.test(userAgent));
}
```

### Complete Middleware Structure

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

const SESSION_COOKIE_NAME = "ahiya_session";
const SESSION_MAX_AGE = 30 * 60;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const userAgent = request.headers.get("user-agent") || "";
  if (isBot(userAgent)) {
    return response;
  }

  const { sessionId, isNew } = getOrCreateSessionId(request);

  if (isNew) {
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
  }

  // Fire async tracking (non-blocking)
  const trackingPromise = trackPageView(request, sessionId);

  // Use waitUntil if available (Vercel Edge)
  if ("waitUntil" in response && typeof response.waitUntil === "function") {
    (response as unknown as { waitUntil: (p: Promise<unknown>) => void }).waitUntil(
      trackingPromise
    );
  } else {
    trackingPromise.catch(console.error);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$|admin).*)",
  ],
};
```

---

## Frontend Patterns

### Admin Layout with Auth Gate (Server Component)

```typescript
// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";
import { AdminHeader } from "@/app/admin/components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("ahiya_admin_session")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const { valid } = await verifyAdminToken(token);

  if (!valid) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
```

### Login Page (Client Component)

```typescript
// app/admin/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6">
      <div className="contemplative-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="display-lg text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-colors disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-400/30 text-white font-medium transition-all hover:bg-purple-500/30 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
```

### Sidebar Component (Client Component)

```typescript
// app/admin/components/AdminSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  FileText,
  TrendingUp,
  Users,
  Download,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/realtime", label: "Real-Time", icon: Activity },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/acquisition", label: "Acquisition", icon: TrendingUp },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/export", label: "Export", icon: Download },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0a0f1a] flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-semibold text-white">Analytics</h1>
            <p className="text-xs text-slate-500">ahiya.xyz</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-purple-500/20 text-purple-400 border border-purple-400/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <span>Back to site</span>
        </Link>
      </div>
    </aside>
  );
}
```

### Header Component (Client Component)

```typescript
// app/admin/components/AdminHeader.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0a0f1a] flex items-center justify-between px-6">
      <div>
        {/* Placeholder for page title or breadcrumbs */}
      </div>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
      >
        {loggingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">Logout</span>
      </button>
    </header>
  );
}
```

### Dashboard Placeholder Page

```typescript
// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-xl text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">
          Analytics dashboard coming in the next iteration.
        </p>
      </div>

      <div className="contemplative-card p-8 text-center">
        <p className="text-slate-400">
          Tracking is active. Data is being collected.
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Dashboard visualizations will be added in Iteration 15.
        </p>
      </div>
    </div>
  );
}
```

---

## Styling Patterns

### Card Style

```typescript
// Use contemplative-card class for all cards
className="contemplative-card p-6"
// Provides: bg-rgba(255,255,255,0.04), backdrop-blur, border, rounded-16px
```

### Button Styles

```typescript
// Primary button
className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-400/30 text-white font-medium transition-all hover:bg-purple-500/30 hover:border-purple-400/50"

// Secondary button
className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"

// Icon button
className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
```

### Input Style

```typescript
className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-colors"
```

### Error/Alert Style

```typescript
// Error
className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"

// Success
className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
```

### Typography

```typescript
// Page title
className="heading-xl text-white"

// Subtitle
className="text-slate-400"

// Body text
className="text-slate-300"

// Muted text
className="text-sm text-slate-500"
```

---

## Error Handling Pattern

### API Error Response

```typescript
// Consistent error response structure
return NextResponse.json(
  { error: "Human-readable error message" },
  { status: 400 | 401 | 429 | 500 }
);
```

### Client-Side Error Handling

```typescript
const handleAction = async () => {
  setError(null);
  setLoading(true);

  try {
    const response = await fetch("/api/...");
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "An error occurred");
      return;
    }

    // Success handling
  } catch {
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};
```

---

## Testing Patterns

### Manual Curl Test for Track API

```bash
# Test tracking endpoint
curl -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/test",
    "referrer": null,
    "utmSource": null,
    "utmMedium": null,
    "utmCampaign": null,
    "utmContent": null,
    "utmTerm": null,
    "sessionId": "test-session-123",
    "visitorHash": "abc123hash",
    "deviceType": "desktop",
    "browser": "Chrome",
    "browserVersion": "120",
    "os": "macOS",
    "osVersion": "14",
    "country": "IL",
    "city": "Tel Aviv",
    "region": "Tel Aviv",
    "userAgent": "test-agent"
  }'
```

### Manual Curl Test for Login API

```bash
# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password": "your-test-password"}' \
  -c cookies.txt

# Test protected route with cookie
curl http://localhost:3000/api/auth/logout \
  -X POST \
  -b cookies.txt
```
