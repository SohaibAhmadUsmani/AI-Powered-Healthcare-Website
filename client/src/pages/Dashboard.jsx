import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RippleButton from "../components/RippleButton";
import PageTransition from "../components/PageTransition";

const Dashboard = () => {
  return (
    <PageTransition>
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "24px" }}
        >
          <Link to="/">
            <RippleButton className="px-6 py-3 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-sm shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all">
              Back to Home
            </RippleButton>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
