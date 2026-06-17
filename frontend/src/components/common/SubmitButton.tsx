import { motion, AnimatePresence } from "framer-motion";

interface Props {
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function SubmitButton({ loading, success, children, onClick, type = "submit" }: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading || success}
      whileHover={!loading && !success ? { scale: 1.02, boxShadow: "0 0 30px rgba(245,197,24,0.35)" } : {}}
      whileTap={!loading && !success ? { scale: 0.97 } : {}}
      className="relative w-full py-3.5 rounded-xl font-bold text-base overflow-hidden"
      style={{
        background: success
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #f5c518, #d4a017)",
        color: "#0a1628",
      }}
      animate={success ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          skewX: -20,
        }}
        initial={{ x: "-150%" }}
        whileHover={{ x: "150%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              className="w-4 h-4 border-2 border-pitch/30 border-t-pitch rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <span>Signing in...</span>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <span>✓</span>
            <span>Welcome back!</span>
          </motion.div>
        ) : (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
