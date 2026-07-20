import React from "react";
import { motion } from "framer-motion";

import capsulePng from "../../assets/pngs/Capsule.png";
import stethoscopePng from "../../assets/pngs/Stethoscope.png";
import syringePng from "../../assets/pngs/Syringe.png";
import heartbeatPng from "../../assets/pngs/Heartbeat Icon.png";

const FloatingBackground = () => {
  const assets = [
    {
      src: capsulePng,
      label: "capsule",
      // Desktop: top-right, Tablet: top-right, Mobile: top-right (scaled down)
      className: "absolute top-[12%] right-[6%] w-14 sm:w-16 md:w-22 lg:w-28 opacity-10 dark:opacity-[0.04] pointer-events-none select-none z-0",
      duration: 22,
      delay: 0,
      driftX: 18,
      driftY: -25,
      rotateDir: 1,
    },
    {
      src: stethoscopePng,
      label: "stethoscope",
      // Desktop: mid-left, Tablet: mid-left, Mobile: mid-left (scaled down)
      className: "absolute top-[32%] left-[4%] w-16 sm:w-20 md:w-26 lg:w-32 opacity-8 dark:opacity-[0.03] pointer-events-none select-none z-0",
      duration: 28,
      delay: 2,
      driftX: -22,
      driftY: 20,
      rotateDir: -1,
    },
    {
      src: syringePng,
      label: "syringe",
      // Desktop: lower-right, Tablet: hidden, Mobile: hidden
      className: "absolute bottom-[28%] right-[10%] w-12 sm:w-15 md:w-18 lg:w-24 opacity-8 dark:opacity-[0.03] pointer-events-none select-none z-0 hidden md:block",
      duration: 24,
      delay: 1,
      driftX: -18,
      driftY: 18,
      rotateDir: 1,
    },
    {
      src: heartbeatPng,
      label: "heartbeat",
      // Desktop: lower-left, Tablet: lower-left, Mobile: lower-left (scaled down)
      className: "absolute bottom-[12%] left-[6%] w-14 sm:w-16 md:w-20 lg:w-26 opacity-10 dark:opacity-[0.04] pointer-events-none select-none z-0",
      duration: 26,
      delay: 3,
      driftX: 20,
      driftY: -15,
      rotateDir: -1,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {assets.map((asset) => (
        <motion.div
          key={asset.label}
          className={`${asset.className} gpu-accelerated`}
          animate={{
            y: [0, asset.driftY, -asset.driftY * 0.4, asset.driftY * 0.6, 0],
            x: [0, asset.driftX, -asset.driftX * 0.2, asset.driftX * 0.5, 0],
            rotate: [0, asset.rotateDir * 12, -asset.rotateDir * 8, asset.rotateDir * 4, 0],
          }}
          transition={{
            duration: asset.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: asset.delay,
          }}
        >
          <img
            src={asset.src}
            alt={asset.label}
            className="w-full h-auto object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.1)] dark:drop-shadow-[0_0_20px_rgba(6,182,212,0.05)]"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;
