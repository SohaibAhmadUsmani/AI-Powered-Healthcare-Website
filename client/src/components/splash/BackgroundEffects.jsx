import { useMemo } from "react";
import { motion } from "framer-motion";

const BackgroundEffects = ({ scene }) => {
  const isActive = scene !== "silence";

  const scanRings = useMemo(() => {
    return [0, 1, 2].map((i) => ({
      size: 140 + i * 60,
      duration: 8 + i * 3,
      delay: i * 1.5,
      opacity: 0.04 - i * 0.01,
    }));
  }, []);

  const neuralDots = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 2 + Math.random() * 3,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Medical scanning rings */}
      {scanRings.map((ring, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: isActive ? ring.opacity : 0,
            scale: [0.6, 1.1, 0.6],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            delay: ring.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: ring.size,
            height: ring.size,
            borderRadius: "50%",
            border: `1px solid rgba(6,182,212,${ring.opacity * 2})`,
          }}
        />
      ))}

      {/* Neural connection dots */}
      {neuralDots.map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isActive ? [0, 0.08, 0] : 0,
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#06B6D4" : "#8B5CF6",
            opacity: 0.05,
          }}
        />
      ))}

      {/* Holographic circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`holo-${i}`}
          animate={{
            opacity: isActive ? [0.02, 0.05, 0.02] : 0,
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 10 + i * 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${30 + i * 15}%`,
            left: `${20 + i * 25}%`,
            width: `${100 + i * 60}px`,
            height: `${100 + i * 60}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)`,
            border: `1px solid rgba(6,182,212,${0.02 + i * 0.005})`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
