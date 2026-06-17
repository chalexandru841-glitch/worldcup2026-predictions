const { logSuspiciousActivity } = require("../utils/auditLog");

// In production use Redis for shared state across instances
const blocklist = new Map(); // ip -> { bannedAt, reason, strikes }
const STRIKE_THRESHOLD = 5;
const BAN_DURATION_MS = 60 * 60 * 1000; // 1 hour

function isBlocked(ip) {
  const entry = blocklist.get(ip);
  if (!entry) return false;
  // Auto-unban after duration
  if (Date.now() - entry.bannedAt > BAN_DURATION_MS) {
    blocklist.delete(ip);
    return false;
  }
  return true;
}

function strike(ip, reason) {
  const entry = blocklist.get(ip) || { strikes: 0, bannedAt: null, reason: "" };
  entry.strikes += 1;
  if (entry.strikes >= STRIKE_THRESHOLD) {
    entry.bannedAt = Date.now();
    entry.reason = reason;
    logSuspiciousActivity(ip, `Auto-banned after ${entry.strikes} strikes: ${reason}`);
  }
  blocklist.set(ip, entry);
}

module.exports = { 
  ipBlocklistMiddleware(req, res, next) {
    const ip = req.realIp || req.ip;
    if (isBlocked(ip)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  },
  strike,
  isBlocked,
};
