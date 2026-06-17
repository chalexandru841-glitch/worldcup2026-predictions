const crypto = require("crypto");

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];
const TOKEN_COOKIE = "csrf_token";
const TOKEN_HEADER = "x-csrf-token";
const TOKEN_TTL = 60 * 60 * 1000; // 1 hour

// Generate and set a CSRF token cookie on safe requests
function issueToken(res) {
  const token = crypto.randomBytes(32).toString("hex");
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: false,      // Must be readable by JS to attach to header
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: TOKEN_TTL,
  });
  return token;
}

module.exports = function csrf(req, res, next) {
  // Always issue/refresh token on safe methods
  if (SAFE_METHODS.includes(req.method)) {
    if (!req.cookies?.[TOKEN_COOKIE]) issueToken(res);
    return next();
  }

  // Skip CSRF for token refresh (protected by httpOnly cookie instead)
  if (req.path === "/api/auth/refresh") return next();

  const cookieToken = req.cookies?.[TOKEN_COOKIE];
  const headerToken = req.headers[TOKEN_HEADER];

  if (!cookieToken || !headerToken) {
    return res.status(403).json({ error: "CSRF token missing" });
  }

  // Constant-time comparison to prevent timing attacks
  const cookieBuf = Buffer.from(cookieToken);
  const headerBuf = Buffer.from(headerToken);
  if (
    cookieBuf.length !== headerBuf.length ||
    !crypto.timingSafeEqual(cookieBuf, headerBuf)
  ) {
    return res.status(403).json({ error: "CSRF token invalid" });
  }

  // Rotate token after use
  issueToken(res);
  next();
};
