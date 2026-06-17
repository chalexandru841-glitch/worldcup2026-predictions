const { logSuspiciousActivity } = require("../utils/auditLog");

// Patterns that indicate attack attempts
const THREAT_PATTERNS = [
  // SQL Injection
  /(\b(union|select|insert|update|delete|drop|truncate|exec|execute|xp_)\b)/i,
  /(-{2}|;|\/\*|\*\/)/,
  // XSS
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  // Path traversal
  /\.\.[\/\\]/,
  // Command injection
  /[;&|`$(){}[\]]/,
  // SSRF patterns
  /(localhost|127\.0\.0\.1|169\.254\.|10\.|192\.168\.|::1)/i,
];

function scanValue(val) {
  if (typeof val !== "string") return false;
  return THREAT_PATTERNS.some((p) => p.test(val));
}

function scanObject(obj, depth = 0) {
  if (depth > 5) return false; // Prevent deep recursion DoS
  if (typeof obj === "string") return scanValue(obj);
  if (Array.isArray(obj)) return obj.some((v) => scanObject(v, depth + 1));
  if (obj && typeof obj === "object") {
    return Object.values(obj).some((v) => scanObject(v, depth + 1));
  }
  return false;
}

module.exports = function threatDetector(req, res, next) {
  const suspicious =
    scanObject(req.body) ||
    scanObject(req.query) ||
    scanObject(req.params);

  if (suspicious) {
    logSuspiciousActivity(req.realIp || req.ip, `Threat pattern in ${req.method} ${req.path}`);
    // Return generic 400 — do not reveal what was detected
    return res.status(400).json({ error: "Invalid request" });
  }
  next();
};
