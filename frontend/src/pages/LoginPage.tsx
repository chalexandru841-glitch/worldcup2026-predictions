import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "login" | "register";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "#111f35",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 10,
  color: "#d4dce8",
  fontSize: 14,
  outline: "none",
  fontFamily: "Inter, sans-serif",
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setErr("Fill in all fields."); return; }
    if (password.length < 8) { setErr("Password must be 8+ characters."); return; }
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false); setDone(true);
  };

  const switchMode = (m: Mode) => {
    setMode(m); setErr(""); setDone(false);
    setEmail(""); setPassword(""); setName("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080e1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,184,75,0.04) 0%, transparent 60%)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%", maxWidth: 400,
          background: "#0d1626",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "40px 36px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #e8b84b, #c99a30)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>⚽</div>
          <span style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: 15, letterSpacing: "0.04em", color: "#d4dce8",
          }}>
            PREDICTOR <span style={{ color: "#e8b84b" }}>26</span>
          </span>
        </div>

        <h1 style={{
          fontFamily: "Syne, sans-serif", fontWeight: 800,
          fontSize: 26, color: "#fff", letterSpacing: "-0.02em",
          marginBottom: 6,
        }}>
          {mode === "login" ? "Welcome back." : "Join the game."}
        </h1>
        <p style={{ fontSize: 14, color: "#4a5568", marginBottom: 28 }}>
          {mode === "login"
            ? "Sign in to manage your predictions."
            : "Create a free account to start predicting."}
        </p>

        {/* Tab toggle */}
        <div style={{
          display: "flex", gap: 20, marginBottom: 24,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                fontSize: 13, fontWeight: 600, paddingBottom: 10,
                color: mode === m ? "#e8b84b" : "#4a5568",
                borderBottom: `2px solid ${mode === m ? "#e8b84b" : "transparent"}`,
                background: "none", border: "none",
                borderBottomWidth: 2, borderBottomStyle: "solid",
                borderBottomColor: mode === m ? "#e8b84b" : "transparent",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {m === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <AnimatePresence>
            {mode === "register" && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  placeholder="Display name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: 44 }}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              style={{
                position: "absolute", right: 14, top: "50%",
                transform: "translateY(-50%)",
                background: "none", border: "none",
                color: "#4a5568", cursor: "pointer", fontSize: 12,
              }}
            >
              {showPw ? "hide" : "show"}
            </button>
          </div>

          {mode === "login" && (
            <a href="#" style={{ fontSize: 12, color: "#4a5568", textAlign: "right", marginTop: -4 }}>
              Forgot password?
            </a>
          )}

          {err && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 12, color: "#f87171", marginTop: -4 }}
            >
              {err}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading || done}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 4,
              padding: "11px 0",
              background: done ? "#22c55e" : "#e8b84b",
              color: "#080e1a",
              fontWeight: 700, fontSize: 14,
              borderRadius: 10, border: "none",
              cursor: loading || done ? "default" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in…" : done ? "✓  You're in" : mode === "login" ? "Sign in" : "Create account"}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: 12, color: "#4a5568" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[{ label: "Google", abbr: "G" }, { label: "GitHub", abbr: "GH" }].map(({ label, abbr }) => (
            <motion.button
              key={label}
              whileHover={{ background: "rgba(255,255,255,0.07)" }}
              style={{
                padding: "9px 0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 9, color: "#6b7a8d",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}
            >
              <span style={{
                fontSize: 10, fontWeight: 800, background: "rgba(255,255,255,0.1)",
                borderRadius: 4, padding: "2px 5px", color: "#9ca3af",
              }}>{abbr}</span>
              {label}
            </motion.button>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "#2d3748", textAlign: "center", marginTop: 20 }}>
          By continuing you agree to our{" "}
          <a href="#" style={{ color: "#4a5568" }}>Terms</a> and{" "}
          <a href="#" style={{ color: "#4a5568" }}>Privacy</a>.
        </p>
      </motion.div>
    </div>
  );
}
