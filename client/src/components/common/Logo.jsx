import { motion } from "framer-motion";

const Logo = ({ size = "md", showText = true }) => {
  const sizes = {
    sm: { icon: 28, text: "1.1rem" },
    md: { icon: 36, text: "1.35rem" },
    lg: { icon: 48, text: "1.65rem" },
  };

  const { icon, text } = sizes[size] || sizes.md;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="12" fill="#06B6D4" fillOpacity="0.15" />
        <path d="M14 34V14H18L22 24L26 14H34V34H30V22L24 34L18 22V34H14Z" fill="#06B6D4" />
        <path d="M24 12L28 22H20L24 12Z" fill="#8B5CF6" fillOpacity="0.4" />
      </svg>
      {showText && (
        <span
          style={{
            fontSize: text,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            fontFamily: "'Sora', 'Inter', sans-serif",
          }}
        >
          <span style={{ color: "#06B6D4" }}>Neuro</span>Care
        </span>
      )}
    </motion.div>
  );
};

export default Logo;
