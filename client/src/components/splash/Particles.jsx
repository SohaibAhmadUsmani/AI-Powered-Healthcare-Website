import { useMemo } from "react";
import { motion } from "framer-motion";

const Particles = ({ count = 80 }) => {
  const particles = useMemo(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const dir = Math.floor(Math.random() * 4);
      const dx = dir === 0 ? 1 : dir === 1 ? -1 : (Math.random() - 0.5) * 0.5;
      const dy = dir === 2 ? 1 : dir === 3 ? -1 : (Math.random() - 0.5) * 0.5;
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 18 + Math.random() * 25,
        delay: Math.random() * 10,
        initialOpacity: 0.06 + Math.random() * 0.15,
        dx: dx * (5 + Math.random() * 8),
        dy: dy * (5 + Math.random() * 8),
      });
    }
    return result;
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: Math.random() > 0.5 ? "#06B6D4" : "#8B5CF6",
            opacity: p.initialOpacity,
            boxShadow: `0 0 ${p.size * 2}px ${Math.random() > 0.5 ? "rgba(6,182,212,0.15)" : "rgba(139,92,246,0.1)"}`,
          }}
          animate={{
            x: [0, p.dx * 0.3, -p.dx * 0.15, p.dx * 0.1, 0],
            y: [0, p.dy * 0.3, -p.dy * 0.15, p.dy * 0.1, 0],
            opacity: [p.initialOpacity, p.initialOpacity * 1.6, p.initialOpacity * 0.5, p.initialOpacity],
            scale: [1, 1.4, 0.7, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
