import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
        <User className="text-gold" size={28} />
        <h2 className="text-3xl font-display tracking-wider text-white uppercase">My Profile</h2>
      </motion.div>
      <div className="glass rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-2xl">👤</div>
          <div>
            <div className="font-bold text-white text-lg">Player Name</div>
            <div className="text-slate-400 text-sm">player@email.com</div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-4 grid grid-cols-3 gap-4 text-center">
          {[["Points", "127"], ["Rank", "#14"], ["Accuracy", "62%"]].map(([label, value]) => (
            <div key={label}>
              <div className="text-xl font-bold text-gold">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}