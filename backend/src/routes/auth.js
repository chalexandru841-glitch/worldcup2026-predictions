const express = require("express");
const router = express.Router();
const { authLimiter } = require("../middleware/rateLimiter");
const { validate } = require("../middleware/sanitize");
const auth = require("../middleware/auth");
const {
  hashPassword, verifyPassword,
  generateAccessToken, generateRefreshToken,
  revokeToken
} = require("../services/authService");

// POST /api/auth/register
router.post("/register", authLimiter, validate("register"), async (req, res) => {
  try {
    const { email, password, display_name } = req.body;
    // TODO: check if email exists in DB
    const password_hash = await hashPassword(password);
    // TODO: INSERT INTO users ...
    const user = { id: "new-uuid", email, display_name };
    const accessToken = generateAccessToken({ sub: user.id, email: user.email });
    const refreshToken = generateRefreshToken();
    // TODO: store refreshToken in DB with user_id + expiry
    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh",
      })
      .status(201)
      .json({ access_token: accessToken, user: { id: user.id, email, display_name } });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", authLimiter, validate("login"), async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: fetch user from DB by email
    const user = null; // placeholder
    // Constant-time comparison even if user not found (prevents timing attacks)
    const dummyHash = "$2a$12$dummyhashtopreventtimingattacks000000000000000000000";
    const hash = user ? user.password_hash : dummyHash;
    const valid = await verifyPassword(password, hash);
    if (!user || !valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const accessToken = generateAccessToken({ sub: user.id, email: user.email });
    const refreshToken = generateRefreshToken();
    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh",
      })
      .json({ access_token: accessToken, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// POST /api/auth/refresh — rotate refresh token
router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: "No refresh token" });
  // TODO: validate token exists in DB and is not expired
  // TODO: delete old token, issue new one (rotation prevents reuse)
  res.status(501).json({ error: "Not implemented" });
});

// POST /api/auth/logout
router.post("/logout", auth, async (req, res) => {
  const bearer = req.headers.authorization?.split(" ")[1];
  if (bearer) revokeToken(bearer);
  res
    .clearCookie("refresh_token", { path: "/api/auth/refresh" })
    .json({ message: "Logged out" });
});

module.exports = router;
