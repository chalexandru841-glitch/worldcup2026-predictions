const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// GET /api/matches — all matches
router.get("/", auth, async (req, res) => {
  try {
    // TODO: query DB
    res.json({ matches: [], total: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/matches/:id
router.get("/:id", auth, async (req, res) => {
  res.json({ match: null });
});

module.exports = router;