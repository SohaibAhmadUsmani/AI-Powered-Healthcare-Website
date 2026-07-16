import { motion } from "framer-motion";

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "rgba(17,24,39,0.55)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderRadius: "20px",
        padding: "44px 40px",
        border: "1px solid rgba(6,182,212,0.06)",
        boxShadow: `
          0 0 60px rgba(6,182,212,0.04),
          0 0 120px rgba(139,92,246,0.02),
          0 20px 60px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255,255,255,0.02)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top edge glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent)",
        }}
      />
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: subtitle ? "8px" : "24px",
            letterSpacing: "-0.02em",
            fontFamily: "'Sora', 'Inter', sans-serif",
          }}
        >
          {title}
        </motion.h1>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            fontSize: "0.9rem",
            color: "#64748B",
            marginBottom: "28px",
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
};

export default AuthCard;
