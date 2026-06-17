import { motion } from "framer-motion";

export default function BracketPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-3xl font-display tracking-wider text-white uppercase">Knockout <span className="text-gold">Bracket</span></h2>
        <p className="text-slate-400 mt-1">Visualize the road to glory</p>
      </motion.div>
      <div className="glass rounded-2xl p-6 text-slate-500 text-center py-20">
        Bracket view coming after group stage
      </div>
    </div>
  );
}