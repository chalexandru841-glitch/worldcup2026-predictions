import { motion } from "framer-motion";

const FLAGS = [
  "🇧🇷","🇦🇷","🇫🇷","🇩🇪","🇪🇸","🇵🇹","🇬🇧","🇯🇵",
  "🇺🇸","🇲🇽","🇳🇱","🇧🇪","🇭🇷","🇲🇦","🇸🇳","🇰🇷",
  "🇨🇦","🇨🇴","🇦🇺","🇵🇱","🇨🇭","🇺🇾","🇬🇭","🇸🇦",
];

interface FlagOrb {
  flag: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

const orbs: FlagOrb[] = FLAGS.map((flag, i) => ({
  flag,
  x: (i * 37 + 11) % 95,
  y: (i * 53 + 7) % 90,
  size: 20 + (i % 4) * 8,
  duration: 12 + (i % 6) * 3,
  delay: -(i * 1.3),
  drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 10),
}));

export default function FloatingFlags() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map(({ flag, x, y, size, duration, delay, drift }, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            fontSize: size,
            opacity: 0.07,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, drift, 0, -drift, 0],
            x: [0, drift * 0.4, 0, -drift * 0.4, 0],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {flag}
        </motion.div>
      ))}
    </div>
  );
}
