const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server (no origin) only in development
    if (!origin && process.env.NODE_ENV !== "production") return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  exposedHeaders: ["X-RateLimit-Remaining"],
  credentials: true,   // Allow cookies (for refresh token)
  maxAge: 86400,       // Cache preflight for 24h
};

module.exports = corsOptions;
