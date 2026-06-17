import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pitch px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-10 w-full max-w-md text-center"
      >
        <span className="text-5xl">🏆</span>
        <h1 className="mt-4 text-3xl font-display tracking-widest uppercase text-white">
          WC26 <span className="text-gold">Predictor</span>
        </h1>
        <p className="text-slate-400 mt-2 mb-8">Sign in to make your predictions</p>
        <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 mb-3 focus:outline-none focus:border-gold/50" />
        <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 mb-6 focus:outline-none focus:border-gold/50" />
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full py-3 bg-gold text-pitch font-bold rounded-xl text-base">
          Sign In
        </motion.button>
        <p className="mt-4 text-sm text-slate-500">No account? <a href="#" className="text-gold hover:underline">Create one free</a></p>
      </motion.div>
    </div>
  );
}