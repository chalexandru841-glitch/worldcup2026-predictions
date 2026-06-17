# Security Architecture — v2

## Middleware Stack (execution order)

```
Request →
  [1] securityHeaders    — Helmet HTTP headers
  [2] cors               — Strict origin allowlist
  [3] bodyParser         — 10KB limit, no oversized payloads
  [4] cookieParser
  [5] requestContext     — UUID per request, real IP extraction
  [6] ipBlocklist        — Auto-ban IPs after repeated strikes
  [7] requestGuard       — Content-Type + Content-Length enforcement
  [8] apiLimiter         — 100 req/15min per IP
  [9] speedLimiter       — Progressive slowdown after 50 req
 [10] csrf               — Double-submit cookie CSRF token
 [11] hpp                — HTTP Parameter Pollution prevention
 [12] xssSanitizer       — DOMPurify on all body/query/params
 [13] threatDetector     — Regex scan for SQLi, XSS, path traversal, SSRF
      → route handler
 [14] errorHandler       — No stack trace leakage in production
```

---

## Attack Coverage

| Attack Type | Defense |
|-------------|---------|
| SQL Injection | Parameterized queries (pg) + threat pattern detector |
| XSS | DOMPurify sanitizer + CSP headers + httpOnly cookies |
| CSRF | Double-submit cookie pattern with timing-safe comparison |
| Brute Force | Auth rate limiter (10 req/15min) + auto-IP ban |
| DoS / Flood | Rate limiter + speed limiter + nginx connection limits |
| Payload Bomb | 10KB body limit (Express + nginx) |
| Clickjacking | X-Frame-Options: DENY |
| MIME Sniffing | X-Content-Type-Options: nosniff |
| Protocol Downgrade | HSTS with preload (1 year) |
| Parameter Pollution | HPP middleware — deduplicates query params |
| Path Traversal | Threat detector regex + nginx block |
| SSRF | Threat detector blocks internal IP patterns |
| Session Hijacking | HttpOnly + Secure + SameSite=Strict cookies |
| Token Theft | Access tokens in memory only (not localStorage) |
| Replay Attacks | Short JWT TTL (15min) + refresh token rotation |
| Mass Assignment | Zod schema strips all unknown fields |
| Info Disclosure | Error handler hides stack traces in production |
| Scanner Bots | nginx blocks sqlmap, nikto, nmap, masscan user-agents |
| Prediction Cheating | DB trigger locks predictions at match kickoff |
| Privilege Escalation | RBAC middleware + ownership checks |

## Infrastructure

- **nginx** terminates TLS, enforces TLS 1.2+, rate-limits at network level
- **TLS** with Let's Encrypt, ECDHE ciphers only, OCSP stapling
- **Server tokens off** — nginx version hidden
- **Dedicated DB user** — no superuser, no DDL access in production

## Testing

Run the security test suite:
```bash
cd backend && npm run test:security
```

Tests cover: rate limiting, input validation, SQL injection rejection, XSS stripping, security headers, auth token enforcement.

## Checklist Before Production

- [ ] Set strong `JWT_SECRET` (min 64 random chars)
- [ ] Set `NODE_ENV=production`
- [ ] Configure `ALLOWED_ORIGINS` to your real domain only
- [ ] Enable SSL in `DATABASE_URL`
- [ ] Set up Redis for rate limiter + token blacklist (shared state across instances)
- [ ] Enable Dependabot on GitHub
- [ ] Configure log aggregation (Datadog / Sentry)
- [ ] Run `npm audit` — fix any high/critical findings
- [ ] Enable GitHub secret scanning
