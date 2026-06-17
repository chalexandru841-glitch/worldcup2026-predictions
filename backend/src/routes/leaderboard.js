const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// GET /api/leaderboard
router.get("/", auth, async (req, res) => {
  const { limit = 50, offset = 0 } = req.query;
  // TODO: query aggregated scores from DB
  res.json({ rankings: [], total: 0, limit: Number(limit), offset: Number(offset) });
});

module.exports = router;