import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, Props>(
  ({ label, icon, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = Boolean(props.value || props.defaultValue);

    return (
      <div className="relative w-full">
        {/* Glow border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 2px rgba(245,197,24,0.5), 0 0 20px rgba(245,197,24,0.15)"
              : "0 0 0 1px rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon */}
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{ color: focused ? "#f5c518" : "#64748b" }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          </div>
        )}

        {/* Floating label */}
        <motion.label
          className="absolute left-10 pointer-events-none text-slate-500 origin-left z-10"
          animate={
            focused || hasValue
              ? { top: "6px", scale: 0.72, color: focused ? "#f5c518" : "#64748b" }
              : { top: "50%", scale: 1, y: "-50%", color: "#64748b" }
          }
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {label}
        </motion.label>

        <input
          ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full bg-white/5 rounded-xl px-4 pt-6 pb-2
            ${icon ? "pl-10" : "pl-4"}
            text-white text-sm outline-none
            transition-colors duration-200
            ${className || ""}
          `}
          {...props}
        />

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 text-xs text-red-400 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";
export default AnimatedInput;
