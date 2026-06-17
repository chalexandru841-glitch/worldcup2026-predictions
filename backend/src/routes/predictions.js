const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// GET /api/predictions — user predictions
router.get("/", auth, async (req, res) => {
  res.json({ predictions: [] });
});

// POST /api/predictions — submit prediction
router.post("/", auth, async (req, res) => {
  const { match_id, home_score, away_score } = req.body;
  if (home_score === undefined || away_score === undefined || !match_id) {
    return res.status(400).json({ error: "match_id, home_score, away_score required" });
  }
  // TODO: validate match hasnt started, upsert prediction
  res.status(201).json({ message: "Prediction saved" });
});

module.exports = router;