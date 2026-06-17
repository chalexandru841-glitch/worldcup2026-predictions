import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import ParticleField from "../components/common/ParticleField";
import FloatingFlags from "../components/login/FloatingFlags";
import TrophyHero from "../components/login/TrophyHero";
import AnimatedInput from "../components/common/AnimatedInput";
import SubmitButton from "../components/common/SubmitButton";

type Mode = "login" | "register";

// Stagger children animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "At least 8 characters";
    if (mode === "register" && !name) e.name = "Display name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1200));
    // navigate("/") here in real app
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setEmail(""); setPassword(""); setName("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-pitch">

      {/* Layer 1: particle network */}
      <ParticleField count={55} />

      {/* Layer 2: floating flag orbs */}
      <FloatingFlags />

      {/* Layer 3: radial glow behind card */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(10, 22, 40, 0.85)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(245,197,24,0.12)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">

            {/* Trophy hero */}
            <motion.div variants={item}>
              <TrophyHero />
            </motion.div>

            {/* Title */}
            <motion.div variants={item} className="text-center mt-2">
              <h1 className="text-3xl font-display tracking-widest text-white uppercase">
                WC26 <span className="text-gold">Predictor</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {mode === "login" ? "Sign in to enter the competition" : "Create your account and start predicting"}
              </p>
            </motion.div>

            {/* Mode toggle tabs */}
            <motion.div variants={item} className="flex w-full bg-white/5 rounded-xl p-1 gap-1">
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 capitalize"
                  style={{ color: mode === m ? "#0a1628" : "#64748b" }}
                >
                  {mode === m && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{m === "login" ? "Sign In" : "Register"}</span>
                </button>
              ))}
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <AnimatePresence>
                {mode === "register" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AnimatedInput
                      label="Display name"
                      icon={<span className="text-base">👤</span>}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                      autoComplete="name"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={item}>
                <AnimatedInput
                  label="Email address"
                  icon={<Mail size={16} />}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                />
              </motion.div>

              <motion.div variants={item} className="relative">
                <AnimatedInput
                  label="Password"
                  icon={<Lock size={16} />}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </motion.div>

              {mode === "login" && (
                <motion.div variants={item} className="text-right">
                  <a href="#" className="text-xs text-gold/70 hover:text-gold transition-colors">
                    Forgot password?
                  </a>
                </motion.div>
              )}

              <motion.div variants={item} className="pt-1">
                <SubmitButton loading={loading} success={success}>
                  {mode === "login" ? (
                    <span className="flex items-center justify-center gap-2">Sign In <ArrowRight size={16} /></span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">Create Account <ArrowRight size={16} /></span>
                  )}
                </SubmitButton>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div variants={item} className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-slate-600">or continue with</span>
              <div className="flex-1 h-px bg-white/5" />
            </motion.div>

            {/* OAuth buttons */}
            <motion.div variants={item} className="w-full grid grid-cols-2 gap-3">
              {[
                { label: "Google", icon: "🌐" },
                { label: "GitHub", icon: "🐙" },
              ].map(({ label, icon }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-300 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Footer note */}
            <motion.p variants={item} className="text-xs text-slate-600 text-center">
              By continuing you agree to our{" "}
              <a href="#" className="text-gold/60 hover:text-gold">Terms</a> &{" "}
              <a href="#" className="text-gold/60 hover:text-gold">Privacy Policy</a>
            </motion.p>
          </motion.div>
        </div>

        {/* Card bottom glow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "60%", height: 40,
            background: "rgba(245,197,24,0.12)",
            filter: "blur(20px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>
    </div>
  );
}
