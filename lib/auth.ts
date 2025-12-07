/**
 * Admin Authentication Utilities
 *
 * Provides JWT-based authentication for the admin dashboard using jose.
 * Includes rate limiting, cookie management, and constant-time password verification.
 */

import * as jose from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Constants
// ============================================================================

const AUTH_COOKIE_NAME = "ahiya_admin_session";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds
const TOKEN_EXPIRY = "7d";

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000, // 30 minutes
};

// ============================================================================
// Rate Limiting Storage (In-Memory)
// ============================================================================

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Get the signing secret as a Uint8Array
 */
async function getSecretKey(): Promise<Uint8Array> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Extract client IP from request headers
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ============================================================================
// JWT Token Management
// ============================================================================

/**
 * Create a new admin JWT token
 */
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

/**
 * Verify an admin JWT token
 */
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

// ============================================================================
// Cookie Management
// ============================================================================

/**
 * Set the authentication cookie on the response
 */
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

/**
 * Clear the authentication cookie from the response
 */
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Get the authentication cookie from the request
 */
export function getAuthCookie(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value || null;
}

// ============================================================================
// Password Verification
// ============================================================================

/**
 * Verify password using constant-time comparison via SHA-256 hashing
 * This prevents timing attacks that could leak password information
 */
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

  // Constant-time comparison - always compare all bytes
  let match = true;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] !== correctArray[i]) {
      match = false;
    }
  }

  return match;
}

// ============================================================================
// Rate Limiting
// ============================================================================

/**
 * Check if the request is rate limited
 */
export function checkRateLimit(request: NextRequest): RateLimitResult {
  const ip = getClientIP(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // No previous attempts from this IP
  if (!entry) {
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }

  // Check if currently blocked
  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000),
    };
  }

  // Check if window has expired (reset if so)
  if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.delete(ip);
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts };
  }

  // Calculate remaining attempts
  const remaining = RATE_LIMIT_CONFIG.maxAttempts - entry.attempts;
  return { allowed: remaining > 0, remainingAttempts: Math.max(0, remaining) };
}

/**
 * Record a failed login attempt for rate limiting
 */
export function recordFailedAttempt(request: NextRequest): void {
  const ip = getClientIP(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || {
    attempts: 0,
    firstAttempt: now,
    blockedUntil: null,
  };

  entry.attempts++;

  // Block if max attempts exceeded
  if (entry.attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
    entry.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
  }

  rateLimitStore.set(ip, entry);
}

/**
 * Clear rate limit for an IP after successful login
 */
export function clearRateLimit(request: NextRequest): void {
  const ip = getClientIP(request);
  rateLimitStore.delete(ip);
}
