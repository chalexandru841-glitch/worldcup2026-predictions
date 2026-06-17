const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

// General API limiter — 100 req/15min per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

// Auth limiter — strict: 10 attempts/15min (prevents brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});

// Slow down repeated requests progressively
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
});

// Prediction limiter — 1 submission per match per user (enforced in DB too)
const predictionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many prediction submissions." },
});

module.exports = { apiLimiter, authLimiter, speedLimiter, predictionLimiter };
