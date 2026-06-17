const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const SALT_ROUNDS = 12; // bcrypt cost factor — high enough to resist brute force
const ACCESS_TOKEN_TTL = "15m";  // Short-lived access tokens
const REFRESH_TOKEN_TTL = "7d";  // Longer-lived refresh tokens (stored in DB)

// In-memory token blacklist (use Redis in production)
const tokenBlacklist = new Set();

async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
    issuer: "wc2026-api",
    audience: "wc2026-client",
  });
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex"); // Opaque, unguessable
}

function verifyAccessToken(token) {
  if (tokenBlacklist.has(token)) throw new Error("Token revoked");
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: "wc2026-api",
    audience: "wc2026-client",
  });
}

function revokeToken(token) {
  tokenBlacklist.add(token);
  // In production: store revocation in Redis with TTL matching token expiry
}

function generateCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  revokeToken,
  generateCsrfToken,
};
