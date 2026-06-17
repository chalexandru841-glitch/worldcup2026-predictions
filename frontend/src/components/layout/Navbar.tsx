import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, BarChart2, Grid, User, Target } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Trophy },
  { to: "/predictions", label: "Predictions", icon: Target },
  { to: "/leaderboard", label: "Leaderboard", icon: BarChart2 },
  { to: "/bracket", label: "Bracket", icon: Grid },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass sticky top-0 z-50 border-b border-white/10"
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <span className="font-display text-xl tracking-wider text-gold uppercase">WC26 Predictor</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-gold/10 text-gold" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}