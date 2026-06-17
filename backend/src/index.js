const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Config
const corsOptions = require("./config/cors");

// Security middleware (order matters!)
const securityHeaders = require("./middleware/securityHeaders");     // 1. Helmet headers
const requestContext = require("./middleware/requestContext");        // 2. Request ID + real IP
const { ipBlocklistMiddleware } = require("./middleware/ipBlocklist"); // 3. IP blocklist
const requestGuard = require("./middleware/requestGuard");            // 4. Content-type + size
const { apiLimiter, speedLimiter } = require("./middleware/rateLimiter"); // 5. Rate limiting
const csrf = require("./middleware/csrf");                           // 6. CSRF protection
const hpp = require("./middleware/hpp");                             // 7. Param pollution
const xssSanitizer = require("./middleware/xssSanitizer");           // 8. XSS sanitize inputs
const threatDetector = require("./middleware/threatDetector");        // 9. Attack pattern scan
const errorHandler = require("./middleware/errorHandler");            // Last: error handler

// Routes
const authRoutes = require("./routes/auth");
const matchRoutes = require("./routes/matches");
const predictionRoutes = require("./routes/predictions");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

// ── 1. Security headers ────────────────────────────────────────────────────────
app.use(securityHeaders);

// ── 2. CORS ───────────────────────────────────────────────────────────────────
app.use(cors(corsOptions));

// ── 3. Body parsing (limit size before anything touches body) ─────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(cookieParser());

// ── 4. Trust proxy (correct IPs behind nginx) ─────────────────────────────────
app.set("trust proxy", 1);
app.disable("x-powered-by");

// ── 5. Request context (ID + real IP) ─────────────────────────────────────────
app.use(requestContext);

// ── 6. IP blocklist ───────────────────────────────────────────────────────────
app.use(ipBlocklistMiddleware);

// ── 7. Request guard (content-type + size) ────────────────────────────────────
app.use(requestGuard);

// ── 8. Rate limiting + slowdown ───────────────────────────────────────────────
app.use("/api/", apiLimiter);
app.use("/api/", speedLimiter);

// ── 9. CSRF ───────────────────────────────────────────────────────────────────
app.use(csrf);

// ── 10. HTTP Parameter Pollution ──────────────────────────────────────────────
app.use(hpp);

// ── 11. XSS sanitization ──────────────────────────────────────────────────────
app.use(xssSanitizer);

// ── 12. Threat pattern detection ──────────────────────────────────────────────
app.use(threatDetector);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Health (no auth required)
app.get("/health", (_, res) => res.json({ status: "ok", requestId: _.requestId }));

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// ── Global error handler (must be last) ───────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
module.exports = app;
