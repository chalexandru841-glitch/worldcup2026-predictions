# Security Architecture

## Overview
This document describes all security controls implemented in the WC2026 Prediction Platform.

---

## Authentication

| Control | Implementation |
|---------|---------------|
| Password hashing | bcrypt (cost factor 12) |
| Access tokens | JWT, 15-minute expiry, signed with HS256 |
| Refresh tokens | Opaque 64-byte random hex, httpOnly cookie, 7-day expiry |
| Token rotation | Every refresh issues a new token and revokes the old one |
| Token revocation | In-memory blacklist (Redis in production) |
| Timing-safe login | Dummy hash compared even when user not found |

## Transport Security

- **HTTPS only** in production (enforced via HSTS with preload)
- **HSTS header:** `max-age=31536000; includeSubDomains; preload`
- **TLS:** TLS 1.2+ only (configure on nginx/load balancer)

## HTTP Security Headers (via Helmet)

| Header | Value |
|--------|-------|
| Content-Security-Policy | Strict — self only, no eval, no inline scripts |
| X-Frame-Options | DENY (clickjacking protection) |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| X-Powered-By | Removed |

## Input Security

- **Zod validation** on every request body — rejects unknown fields
- **Body size limit:** 10KB max (rejects payload bombs)
- **Parameterized SQL queries** — no string interpolation (zero SQL injection risk)
- **UUID validation** on all ID parameters

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| All `/api/*` | 100 req / 15 min per IP |
| `/api/auth/login` | 10 attempts / 15 min per IP |
| `/api/auth/register` | 10 req / 15 min per IP |
| `/api/predictions` | 20 req / 1 min per IP |

Progressive slowdown kicks in after 50 requests.

## CORS

Strict allowlist — only configured frontend origins accepted. Credentials allowed for cookie transport.

## Database Security

- **Row Level Security (RLS)** on `predictions` table — users can only access their own rows
- **Kickoff lock trigger** — predictions become immutable once a match starts
- **Refresh token hashing** — stored as SHA-256 hash, never raw
- **Dedicated DB user** with minimal grants (no superuser, no DDL in production)
- **SSL connections** enforced in production

## Cookie Security

| Attribute | Value |
|-----------|-------|
| HttpOnly | ✅ (JS cannot access refresh token) |
| Secure | ✅ in production (HTTPS only) |
| SameSite | Strict |
| Path | `/api/auth/refresh` only |

## Frontend Security

- Access tokens stored **in memory only** (not localStorage — XSS safe)
- CSRF token attached to all mutating requests
- Axios interceptor auto-refreshes tokens silently
- CSP headers prevent injected script execution

## Audit Logging

All sensitive actions logged with timestamp, user ID, IP, and metadata:
- Login attempts (success + failure)
- Logouts
- Prediction submissions
- Admin actions
- Suspicious activity patterns

## Error Handling

Stack traces and internal details **never** returned to the client in production. All errors logged server-side only.

## Dependency Security

- `npm audit` runs in CI on every push
- Pin all dependency versions
- Dependabot alerts enabled on GitHub

## Responsible Disclosure

Found a vulnerability? Please open a **private security advisory** on GitHub — do not create a public issue.
