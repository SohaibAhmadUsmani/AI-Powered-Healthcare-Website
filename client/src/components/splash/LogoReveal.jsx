import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_TEXT = "NeuroCare AI";
const CHARS = FULL_TEXT.split("");

const LogoReveal = ({ phase, onCharReveal }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const prevVisibleRef = useRef(0);

  const startTyping = phase === "brand";

  useEffect(() => {
    if (!startTyping) return;
    setVisibleCount(0);
    setShowTagline(false);
    prevVisibleRef.current = 0;

    const timers = [];
    CHARS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
        }, 120 + i * 70)
      );
    });

    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 120 + CHARS.length * 70 + 400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(taglineTimer);
    };
  }, [startTyping]);

  useEffect(() => {
    if (visibleCount > prevVisibleRef.current && onCharReveal) {
      prevVisibleRef.current = visibleCount;
      onCharReveal(visibleCount - 1);
    }
  }, [visibleCount, onCharReveal]);

  if (!startTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {CHARS.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 16, filter: "blur(16px)" }}
            animate={
              i < visibleCount
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    textShadow:
                      i < 5
                        ? "0 0 24px rgba(6,182,212,0.35)"
                        : "0 0 0px transparent",
                  }
                : { opacity: 0, y: 16, filter: "blur(16px)" }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: i >= CHARS.length - 2 ? 300 : i < 5 ? 700 : 600,
              fontFamily: "'Sora', 'Inter', sans-serif",
              color:
                i >= CHARS.length - 2
                  ? "#64748B"
                  : i < 5
                    ? "#06B6D4"
                    : "#FFFFFF",
              letterSpacing: "0.05em",
              display: "inline-block",
              marginRight: i === 4 ? "0.2em" : i === 10 ? "0" : "0.02em",
            }}
          >
            {char === " " ? "\u00A0\u00A0" : char}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            style={{
              fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
              color: "#64748B",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.08em",
              marginTop: "14px",
            }}
          >
            Healthcare, Reimagined.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoReveal;
