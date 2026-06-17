const crypto = require("crypto");

module.exports = function requestContext(req, res, next) {
  // Unique ID for tracing each request through logs
  req.requestId = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.requestId);

  // Real IP extraction (handles proxies — trust proxy must be set)
  req.realIp =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    "unknown";

  // Attach to res.locals for downstream use
  res.locals.requestId = req.requestId;
  res.locals.ip = req.realIp;

  next();
};
