const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ALWAYS use parameterized queries — never string interpolation
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn("Slow query detected:", { text, duration });
    }
    return res;
  } catch (err) {
    console.error("DB query error:", err.message);
    throw err;
  }
}

// Convenience helpers
async function getOne(text, params) {
  const res = await query(text, params);
  return res.rows[0] || null;
}

async function getMany(text, params) {
  const res = await query(text, params);
  return res.rows;
}

module.exports = { query, getOne, getMany, pool };
