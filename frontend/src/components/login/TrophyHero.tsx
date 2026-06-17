import { motion } from "framer-motion";

export default function TrophyHero() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 120, height: 120,
          background: "radial-gradient(circle, rgba(245,197,24,0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner glow ring */}
      <motion.div
        className="absolute rounded-full border border-gold/20"
        style={{ width: 90, height: 90 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Trophy emoji */}
      <motion.div
        className="relative z-10 text-6xl"
        animate={{
          y: [0, -8, 0],
          filter: [
            "drop-shadow(0 0 8px rgba(245,197,24,0.4))",
            "drop-shadow(0 0 20px rgba(245,197,24,0.8))",
            "drop-shadow(0 0 8px rgba(245,197,24,0.4))",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🏆
      </motion.div>

      {/* Stars orbiting */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute text-xs"
          style={{ transformOrigin: "50px 50px", top: "50%", left: "50%", marginTop: -8, marginLeft: -8 }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
        >
          <span style={{ opacity: 0.4 + i * 0.1 }}>⭐</span>
        </motion.div>
      ))}
    </div>
  );
}
