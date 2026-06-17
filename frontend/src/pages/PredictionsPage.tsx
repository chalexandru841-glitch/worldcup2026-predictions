import { useState } from "react";
import { motion } from "framer-motion";

const matches = [
  { id: 1, home: "USA", homeFlag: "🇺🇸", away: "Mexico", awayFlag: "🇲🇽", time: "Jun 22 · 20:00", venue: "AT&T Stadium", group: "A", status: "upcoming" },
  { id: 2, home: "Brazil", homeFlag: "🇧🇷", away: "Argentina", awayFlag: "🇦🇷", time: "Jun 23 · 18:00", venue: "MetLife Stadium", group: "B", status: "upcoming" },
  { id: 3, home: "France", homeFlag: "🇫🇷", away: "Germany", awayFlag: "🇩🇪", time: "Jun 23 · 21:00", venue: "SoFi Stadium", group: "C", status: "upcoming" },
  { id: 4, home: "Spain", homeFlag: "🇪🇸", away: "Portugal", awayFlag: "🇵🇹", time: "Jun 24 · 18:00", venue: "Rose Bowl", group: "D", status: "upcoming" },
];

export default function PredictionsPage() {
  const [picks, setPicks] = useState<Record<number, { h: string; a: string }>>({});

  const set = (id: number, side: "h" | "a", val: string) => {
    const n = val.replace(/\D/g, "").slice(0, 2);
    setPicks(p => ({ ...p, [id]: { ...(p[id] || { h: "", a: "" }), [side]: n } }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
          color: "#e8b84b", textTransform: "uppercase", marginBottom: 8,
        }}>Group Stage</div>
        <h1 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: 32, color: "#fff", letterSpacing: "-0.02em",
        }}>Your predictions</h1>
        <p style={{ fontSize: 14, color: "#4a5568", marginTop: 6 }}>
          Predictions lock at kickoff. 3 pts for exact score, 1 pt for correct winner.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {matches.map((m, i) => {
          const pick = picks[m.id] || { h: "", a: "" };
          const saved = pick.h !== "" && pick.a !== "";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: "#0d1626",
                border: `1px solid ${saved ? "rgba(232,184,75,0.2)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 14,
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 24,
                transition: "border-color 0.2s",
              }}
            >
              {/* Home */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.homeFlag}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#d4dce8" }}>{m.home}</div>
                  <div style={{ fontSize: 11, color: "#4a5568" }}>Group {m.group}</div>
                </div>
              </div>

              {/* Score input */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  value={pick.h}
                  onChange={e => set(m.id, "h", e.target.value)}
                  placeholder="–"
                  style={{
                    width: 48, height: 48, textAlign: "center",
                    background: "#111f35",
                    border: `1px solid ${pick.h !== "" ? "rgba(232,184,75,0.4)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10, color: "#fff",
                    fontSize: 20, fontWeight: 700,
                    fontFamily: "Syne, sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
                <span style={{ color: "#4a5568", fontWeight: 700, fontSize: 18 }}>:</span>
                <input
                  value={pick.a}
                  onChange={e => set(m.id, "a", e.target.value)}
                  placeholder="–"
                  style={{
                    width: 48, height: 48, textAlign: "center",
                    background: "#111f35",
                    border: `1px solid ${pick.a !== "" ? "rgba(232,184,75,0.4)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10, color: "#fff",
                    fontSize: 20, fontWeight: 700,
                    fontFamily: "Syne, sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>

              {/* Away */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#d4dce8" }}>{m.away}</div>
                  <div style={{ fontSize: 11, color: "#4a5568" }}>{m.time}</div>
                </div>
                <span style={{ fontSize: 28 }}>{m.awayFlag}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
      >
        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "11px 28px",
            background: "#e8b84b", color: "#080e1a",
            fontWeight: 700, fontSize: 14,
            borderRadius: 10, border: "none", cursor: "pointer",
          }}
        >
          Save predictions
        </motion.button>
      </motion.div>
    </div>
  );
}
