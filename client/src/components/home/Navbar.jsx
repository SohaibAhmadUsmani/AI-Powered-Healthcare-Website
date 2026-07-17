import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(11, 15, 25, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.06)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "'Sora', 'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#06B6D4" }}>Neuro</span>Care
          <span style={{ color: "#64748B", fontWeight: 300, marginLeft: "2px" }}>AI</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "9px 20px",
              borderRadius: "10px",
              border: "1.5px solid rgba(6, 182, 212, 0.2)",
              background: "transparent",
              color: "#06B6D4",
              fontSize: "0.875rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Sign In
          </motion.button>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "9px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#06B6D4",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0891B2";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(6, 182, 212, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#06B6D4";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
