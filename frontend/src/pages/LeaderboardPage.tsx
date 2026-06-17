import { motion } from "framer-motion";

const players = [
  { rank: 1, name: "Mihai V.", country: "🇷🇴", pts: 184, exact: 7, correct: 12 },
  { rank: 2, name: "Lucas B.", country: "🇧🇷", pts: 171, exact: 6, correct: 11 },
  { rank: 3, name: "Sophie L.", country: "🇫🇷", pts: 159, exact: 5, correct: 13 },
  { rank: 4, name: "James C.", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", pts: 143, exact: 4, correct: 10 },
  { rank: 5, name: "Yuki T.", country: "🇯🇵", pts: 138, exact: 5, correct: 9 },
  { rank: 6, name: "Ana M.", country: "🇪🇸", pts: 127, exact: 3, correct: 11 },
];

const medal = (r: number) =>
  r === 1 ? "#e8b84b" : r === 2 ? "#9ca3af" : r === 3 ? "#b87333" : "transparent";

export default function LeaderboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
          color: "#e8b84b", textTransform: "uppercase", marginBottom: 8,
        }}>Global standings</div>
        <h1 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: 32, color: "#fff", letterSpacing: "-0.02em",
        }}>
          Leaderboard
        </h1>
      </motion.div>

      {/* Top 3 podium strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
        {players.slice(0, 3).map((p, i) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            style={{
              background: "#0d1626",
              border: `1px solid ${p.rank === 1 ? "rgba(232,184,75,0.25)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 14, padding: "20px 18px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{p.country}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d4dce8", marginBottom: 2 }}>{p.name}</div>
            <div style={{
              fontSize: 28, fontWeight: 800,
              fontFamily: "Syne, sans-serif",
              color: p.rank === 1 ? "#e8b84b" : "#fff",
            }}>{p.pts}</div>
            <div style={{ fontSize: 11, color: "#4a5568" }}>points</div>
          </motion.div>
        ))}
      </div>

      {/* Full table */}
      <div style={{
        background: "#0d1626",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr 80px 80px 80px",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          color: "#4a5568", textTransform: "uppercase",
        }}>
          <span>#</span>
          <span>Player</span>
          <span style={{ textAlign: "center" }}>Exact</span>
          <span style={{ textAlign: "center" }}>Correct</span>
          <span style={{ textAlign: "right" }}>Points</span>
        </div>

        {players.map((p, i) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            whileHover={{ background: "rgba(255,255,255,0.02)" }}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr 80px 80px 80px",
              padding: "14px 20px",
              borderBottom: i < players.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              alignItems: "center",
              transition: "background 0.15s",
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: p.rank <= 3 ? medal(p.rank) : "rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              color: p.rank <= 3 ? "#080e1a" : "#4a5568",
            }}>
              {p.rank}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{p.country}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#d4dce8" }}>{p.name}</span>
            </div>
            <div style={{ textAlign: "center", fontSize: 13, color: "#6b7a8d" }}>{p.exact}</div>
            <div style={{ textAlign: "center", fontSize: 13, color: "#6b7a8d" }}>{p.correct}</div>
            <div style={{
              textAlign: "right",
              fontSize: 15, fontWeight: 700,
              color: p.rank === 1 ? "#e8b84b" : "#d4dce8",
            }}>{p.pts}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
