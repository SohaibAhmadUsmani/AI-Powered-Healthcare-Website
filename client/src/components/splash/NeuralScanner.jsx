import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEGMENTS = 20;
const SEGMENT_ANGLE = 360 / SEGMENTS;

const NeuralScanner = ({ show }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!show) { setProgress(0); progressRef.current = 0; return; }
    const interval = setInterval(() => {
      progressRef.current = Math.min(1, progressRef.current + 0.006);
      setProgress(progressRef.current);
    }, 50);
    return () => clearInterval(interval);
  }, [show]);

  const segmentElements = useMemo(() => {
    return Array.from({ length: SEGMENTS }, (_, i) => {
      const angle = i * SEGMENT_ANGLE;
      const active = i / SEGMENTS < progress;
      return { angle, active, isLeading: i / SEGMENTS >= progress - 0.1 && i / SEGMENTS < progress };
    });
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            width: "100px",
            height: "100px",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(6,182,212,0.06)",
            }}
          >
            {segmentElements.map((seg, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "2.5px",
                  height: "14px",
                  backgroundColor: seg.isLeading
                    ? "rgba(6,182,212,0.6)"
                    : seg.active
                      ? "rgba(6,182,212,0.3)"
                      : "rgba(6,182,212,0.03)",
                  borderRadius: "1.5px",
                  transform: `translate(-50%, -100%) rotate(${seg.angle}deg) translateY(-32px)`,
                  transformOrigin: "bottom center",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "8px",
              borderRadius: "50%",
              border: "1px dashed rgba(139,92,246,0.05)",
            }}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "20px",
              borderRadius: "50%",
              border: "1px solid rgba(6,182,212,0.03)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "1.5px solid rgba(6,182,212,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#06B6D4",
                boxShadow: "0 0 14px rgba(6,182,212,0.5)",
              }}
            />
          </div>

          <motion.div
            animate={{ opacity: [0.12, 0.35, 0.12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "76px",
              height: "76px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuralScanner;
