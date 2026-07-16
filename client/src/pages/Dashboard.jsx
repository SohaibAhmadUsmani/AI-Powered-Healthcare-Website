import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0F19",
        color: "#FFFFFF",
        fontFamily: "'Sora', 'Inter', sans-serif",
        padding: "24px",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: "12px",
        }}
      >
        Dashboard
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "1.1rem",
          color: "#64748B",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Welcome to NeuroCare AI
      </motion.p>
    </div>
  );
};

export default Dashboard;
