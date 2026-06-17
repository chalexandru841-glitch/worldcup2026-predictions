import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
        <Crown className="text-gold" size={28} />
        <h2 className="text-3xl font-display tracking-wider text-white uppercase">Leaderboard</h2>
      </motion.div>
      <div className="glass rounded-2xl p-6 text-slate-500 text-center py-20">
        Rankings load here once predictions are scored
      </div>
    </div>
  );
}