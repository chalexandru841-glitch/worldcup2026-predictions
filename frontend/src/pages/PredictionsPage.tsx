import { motion } from "framer-motion";

export default function PredictionsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-3xl font-display tracking-wider text-white uppercase">Your <span className="text-gold">Predictions</span></h2>
        <p className="text-slate-400 mt-1">Pick your scores before each match kicks off</p>
      </motion.div>
      {/* Match cards will be rendered here */}
      <div className="text-slate-500 text-center py-20">Loading matches...</div>
    </div>
  );
}