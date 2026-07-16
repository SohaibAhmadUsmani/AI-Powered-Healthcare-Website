import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import neuroCareLogo from "../assets/logo (2).png";
import loginBg from "../assets/sigin.jpg";
import signupBg from "../assets/sign up.jpg";

const AuthLayout = () => {
  const location = useLocation();

  const bgImage = useMemo(() => {
    return location.pathname === "/auth/signup" ? signupBg : loginBg;
  }, [location.pathname]);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5, duration: 18 + Math.random() * 25, delay: Math.random() * 12,
      baseOpacity: 0.06 + Math.random() * 0.1, driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40, isCyan: Math.random() < 0.6,
    }));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0B0F19",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE WITH OVERLAYS */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "saturate(0.85) brightness(0.9)",
      }}>
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(8, 12, 24, 0.70)",
        }} />

        {/* Gradient vignette overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 30% 20%, rgba(139,92,246,0.03) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(8,12,24,0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(8,12,24,0.4) 0%, transparent 40%)
          `,
        }} />

        {/* Animated gradient light */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-5%", "5%", "-10%"],
            y: ["-5%", "5%", "-10%", "10%", "-5%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(6,182,212,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* FLOATING PARTICLES */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: "50%",
              backgroundColor: p.isCyan ? "#06B6D4" : "#8B5CF6",
              opacity: p.baseOpacity,
              boxShadow: p.isCyan
                ? `0 0 ${p.size * 3}px rgba(6,182,212,0.04)`
                : `0 0 ${p.size * 3}px rgba(139,92,246,0.03)`,
            }}
            animate={{
              x: [0, p.driftX * 0.5, -p.driftX * 0.3, p.driftX * 0.2, 0],
              y: [0, -p.driftY * 0.4, p.driftY * 0.3, -p.driftY * 0.2, 0],
              opacity: [p.baseOpacity, p.baseOpacity * 1.8, p.baseOpacity * 0.4, p.baseOpacity * 1.2, p.baseOpacity],
              scale: [1, 1.3, 0.7, 1.1, 1],
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* HEADER */}
      <header
        style={{
          padding: "28px 32px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <img
              src={neuroCareLogo}
              alt="NeuroCare AI"
              style={{
                width: "48px",
                height: "auto",
                aspectRatio: "auto",
                display: "block",
                filter: "drop-shadow(0 0 12px rgba(6,182,212,0.2))",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Sora', 'Inter', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                <span style={{ color: "#06B6D4" }}>Neuro</span>Care
                <span style={{ color: "#64748B", fontWeight: 300, marginLeft: "4px" }}>AI</span>
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#475569",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.06em",
                  fontWeight: 400,
                  marginTop: "1px",
                }}
              >
                Healthcare, Reimagined.
              </span>
            </div>
          </motion.div>
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: "440px" }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: "16px 32px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#475569",
          position: "relative",
          zIndex: 2,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        &copy; {new Date().getFullYear()} NeuroCare AI. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
