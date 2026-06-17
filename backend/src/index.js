const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = require("./config/cors");
const securityHeaders = require("./middleware/securityHeaders");
const { apiLimiter, speedLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const matchRoutes = require("./routes/matches");
const predictionRoutes = require("./routes/predictions");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use("/api/", apiLimiter);
app.use("/api/", speedLimiter);
app.disable("x-powered-by");

app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
module.exports = app;
