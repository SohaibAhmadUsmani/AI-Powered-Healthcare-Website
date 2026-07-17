import { motion } from "framer-motion";

const LoadingButton = ({
  children,
  type = "submit",
  onClick,
  isLoading = false,
  disabled = false,
  fullWidth = true,
  variant = "primary",
  style,
}) => {
  const variants = {
    primary: {
      bg: "#06B6D4",
      bgHover: "#0891B2",
      text: "#FFFFFF",
    },
    outline: {
      bg: "transparent",
      bgHover: "rgba(6,182,212,0.06)",
      text: "#06B6D4",
    },
  };

  const v = variants[variant] || variants.primary;
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "13px 24px",
        fontSize: "0.9375rem",
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        color: v.text,
        backgroundColor: isDisabled ? "rgba(71,85,105,0.5)" : v.bg,
        border: variant === "outline" ? "1.5px solid rgba(6,182,212,0.2)" : "none",
        borderRadius: "10px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "background-color 250ms ease, border-color 250ms ease, box-shadow 250ms ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        opacity: isDisabled ? 0.6 : 1,
        letterSpacing: "0.01em",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.backgroundColor = v.bgHover;
          if (variant === "primary") {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.2)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.backgroundColor = v.bg;
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {isLoading && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ animation: "spin 0.7s linear infinite" }}
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
        </svg>
      )}
      {children}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
};

export default LoadingButton;
