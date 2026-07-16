import { useMemo } from "react";
import { motion } from "framer-motion";

const ORBS = [
  { size: 700, x: "20%", y: "15%", color: "rgba(6,182,212,0.04)" },
  { size: 550, x: "70%", y: "25%", color: "rgba(139,92,246,0.035)" },
  { size: 450, x: "50%", y: "65%", color: "rgba(6,182,212,0.025)" },
  { size: 350, x: "80%", y: "75%", color: "rgba(139,92,246,0.03)" },
  { size: 400, x: "10%", y: "55%", color: "rgba(6,182,212,0.02)" },
  { size: 300, x: "30%", y: "40%", color: "rgba(139,92,246,0.02)" },
];

const GradientOrbs = () => {
  const orbs = useMemo(() => ORBS, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 0.92, 1.08, 1],
            x: ["-50%", "-48%", "-53%", "-49%", "-50%"],
            y: ["-50%", "-53%", "-47%", "-52%", "-50%"],
          }}
          transition={{
            duration: 30 + i * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GradientOrbs;
