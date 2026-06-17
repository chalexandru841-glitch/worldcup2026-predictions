import { motion } from "framer-motion";
import { Trophy, Users, Target, Zap } from "lucide-react";

const stats = [
  { icon: Users, label: "Players", value: "2,841" },
  { icon: Target, label: "Predictions Made", value: "48,320" },
  { icon: Trophy, label: "Matches Remaining", value: "32" },
  { icon: Zap, label: "Points Up For Grabs", value: "960" },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center py-16 rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #1a0a28 100%)" }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #f5c518 0%, transparent 60%)" }} />
        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <span className="text-7xl">🏆</span>
        </motion.div>
        <h1 className="mt-4 text-5xl font-display tracking-widest text-white uppercase">
          World Cup <span className="text-gold">2026</span>
        </h1>
        <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
          Predict every match. Climb the leaderboard. Glory awaits.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 px-8 py-3 bg-gold text-pitch font-bold rounded-xl text-lg shadow-lg shadow-gold/20"
        >
          Start Predicting →
        </motion.button>
      </motion.section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <Icon className="mx-auto mb-2 text-gold" size={22} />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}