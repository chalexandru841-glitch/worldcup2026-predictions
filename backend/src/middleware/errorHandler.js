// Global error handler — never expose stack traces or internal details in production
module.exports = function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== "production";

  // Log full error server-side always
  console.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userId: req.user?.sub || "anonymous",
  });

  // Specific known errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Authentication failed" });
  }
  if (err.code === "23505") { // Postgres unique violation
    return res.status(409).json({ error: "Resource already exists" });
  }
  if (err.code === "23503") { // Postgres FK violation
    return res.status(400).json({ error: "Invalid reference" });
  }

  // Generic — never leak internals in production
  res.status(err.status || 500).json({
    error: isDev ? err.message : "An unexpected error occurred",
    ...(isDev && { stack: err.stack }),
  });
};
