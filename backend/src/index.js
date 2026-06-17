const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const matchRoutes = require("./routes/matches");
const predictionRoutes = require("./routes/predictions");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/health", (_, res) => res.json({ status: "ok", time: new Date().toISOString() }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
