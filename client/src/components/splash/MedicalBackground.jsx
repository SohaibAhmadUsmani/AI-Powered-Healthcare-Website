import { useMemo } from "react";
import { motion } from "framer-motion";

import capsulePng from "../../assets/pngs/Capsule.png";
import stethoscopePng from "../../assets/pngs/Stethoscope.png";
import syringePng from "../../assets/pngs/Syringe.png";
import heartbeatPng from "../../assets/pngs/Heartbeat Icon.png";

const MedicalBackground = ({ isActive }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 8,
      baseOpacity: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  const floatingAssets = useMemo(() => {
    const configs = [
      { src: capsulePng, label: "capsule", x: 8, y: 12, size: 100 },
      { src: stethoscopePng, label: "stethoscope", x: 78, y: 14, size: 130 },
      { src: syringePng, label: "syringe", x: 82, y: 72, size: 90 },
      { src: heartbeatPng, label: "heartbeat", x: 10, y: 74, size: 85 },
    ];
    return configs.map((asset, i) => ({
      ...asset,
      floatDuration: 28 + i * 5,
      floatDelay: i * 2,
      rotDirection: i % 2 === 0 ? 1 : -1,
      driftX: (i % 2 === 0 ? 1 : -1) * (100 + i * 12),
      driftY: (i < 2 ? -1 : 1) * (80 + i * 10),
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {/* STARS */}
      <div style={{ position: "absolute", inset: 0 }}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: star.id % 3 === 0 ? "#06B6D4" : "#FFFFFF",
              opacity: star.baseOpacity * 0.3,
              boxShadow: star.id % 4 === 0 ? `0 0 ${star.size * 2}px rgba(6,182,212,0.08)` : "none",
            }}
            animate={{
              opacity: [star.baseOpacity * 0.3, star.baseOpacity * 0.7, star.baseOpacity * 0.15, star.baseOpacity * 0.3],
            }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* FLOATING HOLOGRAPHIC PNGS */}
      <div style={{ position: "absolute", inset: 0 }}>
        {floatingAssets.map((asset) => (
          <motion.div
            key={asset.label}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.85, filter: "drop-shadow(0 0 8px rgba(6,182,212,0.15)) brightness(1.2)" }}
            animate={{
              opacity: isActive ? [0.2, 0.45, 0.28, 0.38, 0.5, 0.22, 0.2] : 0,
              x: [0, asset.driftX * 0.25, -asset.driftX * 0.12, asset.driftX * 0.35, -asset.driftX * 0.2, 0],
              y: [0, asset.driftY * 0.28, -asset.driftY * 0.1, -asset.driftY * 0.22, asset.driftY * 0.18, 0],
              scale: [0.88, 1.1, 0.94, 1.06, 0.9, 1.08, 0.88],
              rotate: [0, asset.rotDirection * 18, -asset.rotDirection * 22, asset.rotDirection * 12, -asset.rotDirection * 10, 0],
              filter: [
                "drop-shadow(0 0 8px rgba(6,182,212,0.15)) brightness(1.2)",
                "drop-shadow(0 0 28px rgba(6,182,212,0.4)) brightness(1.5)",
                "drop-shadow(0 0 6px rgba(6,182,212,0.1)) brightness(1.1)",
                "drop-shadow(0 0 22px rgba(6,182,212,0.35)) brightness(1.4)",
                "drop-shadow(0 0 14px rgba(139,92,246,0.25)) brightness(1.3)",
                "drop-shadow(0 0 8px rgba(6,182,212,0.15)) brightness(1.2)",
              ],
            }}
            transition={{
              duration: asset.floatDuration,
              repeat: Infinity,
              delay: asset.floatDelay,
              ease: "easeInOut",
              times: [0, 0.06, 0.2, 0.4, 0.6, 0.82, 1],
            }}
            style={{
              position: "absolute",
              left: `${asset.x}%`,
              top: `${asset.y}%`,
              width: `${asset.size}px`,
              willChange: "transform, opacity, filter",
            }}
          >
            <img
              src={asset.src}
              alt={asset.label}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                opacity: 0.9,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* SCANNING RINGS */}
      {[0, 1].map((i) => (
        <motion.div
          key={`scan-${i}`}
          animate={{
            opacity: isActive ? [0, 0.04, 0] : 0,
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{ duration: 10 + i * 5, repeat: Infinity, delay: i * 4, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: `${35 + i * 18}%`,
            left: `${15 + i * 25}%`,
            width: `${120 + i * 80}px`,
            height: `${120 + i * 80}px`,
            borderRadius: "50%",
            border: `0.5px solid rgba(6,182,212,${0.03 + i * 0.01})`,
          }}
        />
      ))}
    </div>
  );
};

export default MedicalBackground;
