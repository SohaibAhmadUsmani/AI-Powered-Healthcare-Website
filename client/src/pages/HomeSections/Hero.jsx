import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import RippleButton from '../../components/RippleButton';

const biometricsCards = [
  {
    id: 'cardio',
    tag: 'Real-time Biometrics',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    pingColor: 'bg-emerald-500 dark:bg-emerald-400',
    glowColor: 'bg-emerald-500',
    title: 'Cardio Analytics',
    desc: 'Connect your smart health device to monitor blood flow, vitals, and oxygen levels automatically.',
    metricLabel: 'Heart Rate',
    metricValue: '98.4',
    metricUnit: 'bpm',
    status: 'Active',
    statusColor: 'bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary border-lightPrimary/20 dark:border-darkPrimary/20',
    cardId: 'ID: H-9801'
  },
  {
    id: 'neural',
    tag: 'Brainwave Sync',
    tagColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    pingColor: 'bg-violet-500 dark:bg-violet-400',
    glowColor: 'bg-violet-500',
    title: 'Neural Diagnosis',
    desc: 'Automated monitoring of EEG metrics, cognitive fatigue, focus levels, and active neural feedback.',
    metricLabel: 'Cognitive Index',
    metricValue: '99.2',
    metricUnit: '%',
    status: 'Optimal',
    statusColor: 'bg-lightSecondary/10 dark:bg-darkSecondary/10 text-lightSecondary dark:text-darkSecondary border-lightSecondary/20 dark:border-darkSecondary/20',
    cardId: 'ID: N-4820'
  },
  {
    id: 'dna',
    tag: 'Genetic Risk Mapping',
    tagColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    pingColor: 'bg-cyan-500 dark:bg-cyan-400',
    glowColor: 'bg-cyan-500',
    title: 'DNA Bio-Mapping',
    desc: 'Constant molecular scanning of hereditary markers to prevent diseases and map health parameters.',
    metricLabel: 'Risk Indicators',
    metricValue: '12',
    metricUnit: 'markers',
    status: 'Synced',
    statusColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    cardId: 'ID: D-7721'
  },
  {
    id: 'glucose',
    tag: 'Continuous Glucose',
    tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    pingColor: 'bg-amber-500 dark:bg-amber-400',
    glowColor: 'bg-amber-500',
    title: 'Metabolic Tracker',
    desc: 'Continuously track insulin fluctuations, dietary glucose spikes, and general metabolic efficiency.',
    metricLabel: 'Glucose Level',
    metricValue: '104',
    metricUnit: 'mg/dL',
    status: 'Normal',
    statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    cardId: 'ID: G-1052'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % biometricsCards.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentCard = biometricsCards[currentIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-400/20 to-indigo-400/20 dark:from-darkPrimary/10 dark:to-darkSecondary/10 blur-[100px] sm:blur-[120px] pointer-events-none transition-colors"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br from-indigo-400/25 to-violet-400/25 dark:from-darkSecondary/15 dark:to-darkPrimary/10 blur-[100px] sm:blur-[120px] pointer-events-none transition-colors"></div>

      {/* Technical Biometric Heartbeat Line Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.45] dark:opacity-[0.15] transition-opacity">
        <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full text-lightPrimary/40 dark:text-darkPrimary/20 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path 
            d="M 0 150 L 250 150 L 270 70 L 290 260 L 310 100 L 325 200 L 340 150 L 800 150" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            filter="url(#neon-glow)"
          />
        </svg>
      </div>


      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

        {/* Left Column: Copy & Actions */}
        <div className="text-left flex flex-col items-start">
          {/* Glowing Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-darkAccent border border-lightPrimary/20 dark:border-darkPrimary/30 text-xs font-semibold text-lightPrimary dark:text-darkPrimary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightPrimary dark:bg-darkPrimary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lightPrimary dark:bg-darkPrimary"></span>
            </span>
            <span className="tracking-wider uppercase font-mono">✨ Next-Gen Healthcare Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-sora text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900 dark:bg-gradient-to-r dark:from-darkPrimary dark:via-indigo-400 dark:to-darkSecondary dark:bg-clip-text dark:text-transparent">
            AI-Powered Healthcare Redefined
          </h1>

          {/* Section Title */}
          <h2 className="font-sora text-lg sm:text-2xl font-semibold text-slate-700 dark:text-white/80 mt-4 mb-6">
            Smart Analytics, Better Life
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
            Experience the future of medicine with real-time health tracking, instant doctor consultations, and AI-driven insights. Connect your devices for a seamless care experience.
          </p>

          {/* Button Styles */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Link to="/book-appointment" className="w-full sm:w-auto">
              <RippleButton className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/90 dark:hover:bg-darkPrimary/90 transition-all duration-300">
                Book Appointment
              </RippleButton>
            </Link>
            <Link to="/store" className="w-full sm:w-auto">
              <RippleButton className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-lightSecondary dark:bg-darkSecondary text-white font-bold shadow-glowLightSecondary dark:shadow-glowSecondary hover:bg-lightSecondary/90 dark:hover:bg-darkSecondary/90 transition-all duration-300">
                Search Medicines
              </RippleButton>
            </Link>
            <Link to="/emergency" className="w-full sm:w-auto">
              <RippleButton className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent border border-lightPrimary/40 dark:border-darkPrimary/50 text-lightPrimary dark:text-darkPrimary font-bold hover:bg-lightPrimary/5 dark:hover:bg-darkPrimary/10 transition-all duration-300 hover:shadow-glowLightPrimary dark:hover:shadow-glowPrimary">
                Emergency Contact
              </RippleButton>
            </Link>
          </div>
        </div>

        {/* Right Column: Specimen Card */}
        <div className="w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
          <div className="w-full max-w-md relative min-h-[350px] sm:min-h-[340px]">
            {/* Soft backdrop glow specifically behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary rounded-2xl blur opacity-20 dark:opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative glass-panel glass-card-glow rounded-2xl p-6 sm:p-8 shadow-premiumLight dark:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${currentCard.tagColor}`}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentCard.pingColor}`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${currentCard.glowColor}`}></span>
                    </span>
                    <span>{currentCard.tag}</span>
                  </div>
                  <span className="text-slate-400 dark:text-gray-500 text-xs font-mono">{currentCard.cardId}</span>
                </div>

                <h3 className="font-sora text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {currentCard.title}
                </h3>
                
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                  {currentCard.desc}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                      {currentCard.metricLabel}
                    </span>
                    <div className="flex items-baseline gap-1 text-3xl font-bold text-lightPrimary dark:text-darkPrimary font-mono">
                      <span>{currentCard.metricValue}</span>
                      <span className="text-sm font-normal text-slate-400 dark:text-gray-400">{currentCard.metricUnit}</span>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest border uppercase ${currentCard.statusColor}`}>
                    {currentCard.status}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
