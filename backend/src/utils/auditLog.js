const fs = require("fs");
const path = require("path");

// In production: send to a SIEM or logging service (Datadog, Sentry, etc.)
// Here we log to file + console

const LOG_FILE = path.join(__dirname, "../../logs/audit.log");

function log(action, userId, metadata = {}) {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    userId: userId || "anonymous",
    ...metadata,
  });

  console.log("[AUDIT]", entry);

  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, entry + "\n");
  } catch (_) {
    // Non-fatal — do not crash app for logging failure
  }
}

module.exports = {
  logLogin: (userId, ip, success) => log("AUTH_LOGIN", userId, { ip, success }),
  logLogout: (userId, ip) => log("AUTH_LOGOUT", userId, { ip }),
  logPrediction: (userId, matchId, action) => log("PREDICTION_" + action.toUpperCase(), userId, { matchId }),
  logAdminAction: (userId, action, target) => log("ADMIN_" + action.toUpperCase(), userId, { target }),
  logSuspiciousActivity: (ip, reason) => log("SUSPICIOUS", null, { ip, reason }),
};
