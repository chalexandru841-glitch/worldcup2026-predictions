const ALLOWED_CONTENT_TYPES = ["application/json", "application/x-www-form-urlencoded"];
const MAX_BODY_SIZE_BYTES = 10 * 1024; // 10KB

module.exports = function requestGuard(req, res, next) {
  // Skip for GET/HEAD/OPTIONS
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  // Enforce Content-Type on requests with bodies
  const ct = req.headers["content-type"]?.split(";")[0].trim();
  if (ct && !ALLOWED_CONTENT_TYPES.includes(ct)) {
    return res.status(415).json({ error: "Unsupported Media Type" });
  }

  // Enforce Content-Length — reject requests without it or over limit
  const length = parseInt(req.headers["content-length"] || "0", 10);
  if (length > MAX_BODY_SIZE_BYTES) {
    return res.status(413).json({ error: "Request body too large" });
  }

  next();
};
