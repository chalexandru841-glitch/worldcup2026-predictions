import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const upcomingMatches = [
  { home: "🇺🇸 USA", away: "🇲🇽 Mexico", time: "Jun 22 · 20:00", venue: "AT&T Stadium, Dallas", group: "A" },
  { home: "🇧🇷 Brazil", away: "🇦🇷 Argentina", time: "Jun 23 · 18:00", venue: "MetLife Stadium, NJ", group: "B" },
  { home: "🇫🇷 France", away: "🇩🇪 Germany", time: "Jun 23 · 21:00", venue: "SoFi Stadium, LA", group: "C" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" },
});

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

      {/* Hero — type-forward, no gimmicks */}
      <section className="space-y-6">
        <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
            color: "#e8b84b", textTransform: "uppercase",
            background: "rgba(232,184,75,0.08)",
            border: "1px solid rgba(232,184,75,0.2)",
            padding: "4px 10px", borderRadius: 4,
          }}>
            FIFA World Cup 2026
          </div>
          <div style={{ fontSize: 12, color: "#4a5568" }}>Group Stage · Jun 11 – Jul 19</div>
        </motion.div>

        <motion.h1 {...fade(0.06)} style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 64px)",
          lineHeight: 1.08,
          color: "#fff",
          letterSpacing: "-0.02em",
        }}>
          Make your picks.<br />
          <span style={{ color: "#e8b84b" }}>Back them.</span>
        </motion.h1>

        <motion.p {...fade(0.1)} style={{ fontSize: 16, color: "#6b7a8d", maxWidth: 480, lineHeight: 1.7 }}>
          Predict the score of every World Cup match. Earn points for accuracy.
          Climb the global leaderboard.
        </motion.p>

        <motion.div {...fade(0.14)} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            to="/predictions"
            style={{
              padding: "10px 22px",
              background: "#e8b84b",
              color: "#080e1a",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 9,
              textDecoration: "none",
            }}
          >
            Start predicting
          </Link>
          <Link
            to="/leaderboard"
            style={{
              padding: "10px 22px",
              background: "rgba(255,255,255,0.05)",
              color: "#d4dce8",
              fontWeight: 500,
              fontSize: 14,
              borderRadius: 9,
              border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none",
            }}
          >
            Leaderboard
          </Link>
        </motion.div>
      </section>

      {/* Scoreline divider */}
      <motion.div {...fade(0.18)} style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {[
          { n: "48", label: "Matches" },
          { n: "12", label: "Host cities" },
          { n: "32", label: "Nations" },
          { n: "3 pts", label: "Exact score" },
        ].map(({ n, label }) => (
          <div key={label} style={{
            padding: "20px 24px",
            background: "#0d1626",
            borderRight: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "Syne, sans-serif" }}>{n}</div>
            <div style={{ fontSize: 12, color: "#4a5568", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Upcoming matches */}
      <section>
        <motion.div {...fade(0.22)} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>
            Upcoming matches
          </h2>
          <Link to="/predictions" style={{ fontSize: 13, color: "#e8b84b" }}>View all →</Link>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {upcomingMatches.map((m, i) => (
            <motion.div
              key={i}
              {...fade(0.26 + i * 0.06)}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: "#0d1626",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <div style={{ fontWeight: 500, fontSize: 14, color: "#d4dce8" }}>{m.home}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                color: "#4a5568", textTransform: "uppercase",
              }}>vs</div>
              <div style={{ fontWeight: 500, fontSize: 14, color: "#d4dce8", textAlign: "right" }}>{m.away}</div>
              <div style={{ textAlign: "right", minWidth: 130 }}>
                <div style={{ fontSize: 12, color: "#6b7a8d" }}>{m.time}</div>
                <div style={{ fontSize: 11, color: "#4a5568" }}>{m.venue}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
