import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/predictions", label: "Predictions" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/bracket", label: "Bracket" },
];

export default function Navbar() {
  return (
    <nav
      style={{
        background: "rgba(8,14,26,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        position: "sticky", top: 0, zIndex: 50,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">

        {/* Wordmark — no emoji spam */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div style={{
            width: 28, height: 28,
            background: "linear-gradient(135deg, #e8b84b, #c99a30)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>
            ⚽
          </div>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.04em",
            color: "#d4dce8",
          }}>
            PREDICTOR <span style={{ color: "#e8b84b" }}>26</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm transition-all duration-150 ${
                  isActive
                    ? "text-white bg-white/8"
                    : "text-slate-500 hover:text-slate-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth */}
        <Link
          to="/login"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 14px",
            background: "#e8b84b",
            color: "#080e1a",
            borderRadius: 8,
          }}
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
