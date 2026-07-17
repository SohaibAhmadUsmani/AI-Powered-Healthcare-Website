import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HexGrid from "./HexGrid";
import GradientOrbs from "./GradientOrbs";
import Particles from "./Particles";
import MedicalBackground from "./MedicalBackground";
import LogoReveal from "./LogoReveal";
import NeuralScanner from "./NeuralScanner";

const DnaScene = lazy(() => import("./DnaScene"));

const SplashScreen = ({ onFinish }) => {
  const [showDna, setShowDna] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [holdFrame, setHoldFrame] = useState(false);
  const [logoBright, setLogoBright] = useState(1);
  const [sceneActive, setSceneActive] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Prevent scroll during splash screen
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const tActive = setTimeout(() => {
      setSceneActive(true);
      setShowDna(true);
    }, 2000);
    const tScanner = setTimeout(() => setShowScanner(true), 5800);
    const tBrand = setTimeout(() => setShowTitle(true), 6400);
    const tDissolve = setTimeout(() => setShowScanner(false), 9000);
    const tHold = setTimeout(() => {
      setHoldFrame(true);
      setLogoBright(2);
    }, 10000);
    const tExit = setTimeout(() => {
      onFinish("/");
    }, 11000);

    return () => {
      clearTimeout(tActive);
      clearTimeout(tScanner);
      clearTimeout(tBrand);
      clearTimeout(tDissolve);
      clearTimeout(tHold);
      clearTimeout(tExit);
    };
  }, [onFinish]);

  const handleCharReveal = useCallback((index) => {
    setTypingIndex(index);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0B0F19",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <GradientOrbs />
      <HexGrid />
      <Particles count={80} />
      <MedicalBackground isActive={sceneActive} />

      <AnimatePresence>
        {showDna && (
          <motion.div
            key="dna-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
            }}
          >
            <Suspense fallback={null}>
              <DnaScene />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          position: "absolute",
          bottom: "clamp(60px, 10vh, 120px)",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 5,
          filter: `brightness(${logoBright})`,
          transition: "filter 1.2s ease",
        }}
      >
        <LogoReveal
          phase={showTitle ? "brand" : "hidden"}
          onCharReveal={handleCharReveal}
        />
      </div>

      <NeuralScanner show={showScanner} />
    </motion.div>
  );
};

export default SplashScreen;
