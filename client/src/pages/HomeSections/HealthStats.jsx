import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, Brain, HeartHandshake, RefreshCw } from 'lucide-react';
import Counter from '../../components/Counter';
import ScrollReveal from '../../components/ScrollReveal';

const HealthStats = () => {
  const [stats, setStats] = useState({
    consultations: 24790,
    recoveryRate: 98.4,
    activePatients: 1250,
    aiDiagnoses: 84930
  });
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setIsLive(true);
      }
    } catch (err) {
      console.log('Backend API offline, utilizing fallback simulation system.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Live tick simulator to make dashboard feel alive
    const interval = setInterval(() => {
      setStats(prev => ({
        consultations: prev.consultations + (Math.random() > 0.4 ? 1 : 0),
        recoveryRate: parseFloat((Math.min(99.9, Math.max(95, prev.recoveryRate + (Math.random() * 0.04 - 0.02)))).toFixed(1)),
        activePatients: prev.activePatients + (Math.random() > 0.6 ? 1 : Math.random() > 0.6 ? -1 : 0),
        aiDiagnoses: prev.aiDiagnoses + Math.floor(Math.random() * 3) + 1
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const statsMeta = [
    {
      key: 'consultations',
      label: 'Consultations Completed',
      icon: HeartHandshake,
      color: 'text-lightPrimary dark:text-darkPrimary border-lightPrimary/20 dark:border-darkPrimary/20 bg-lightPrimary/5 dark:bg-darkPrimary/5',
      suffix: '+'
    },
    {
      key: 'activePatients',
      label: 'Active Monitored Patients',
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      suffix: '+'
    },
    {
      key: 'aiDiagnoses',
      label: 'AI Diagnoses Processed',
      icon: Brain,
      color: 'text-lightSecondary dark:text-darkSecondary border-lightSecondary/20 dark:border-darkSecondary/20 bg-lightSecondary/5 dark:bg-darkSecondary/5',
      suffix: '+'
    },
    {
      key: 'recoveryRate',
      label: 'Clinical Recovery Rate',
      icon: CheckCircle,
      color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      suffix: '%'
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="statistics">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-lightPrimary/5 dark:bg-darkPrimary/5 blur-[120px] pointer-events-none transition-colors"></div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl">
        {/* Border outline gradient glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-lightPrimary/10 to-lightSecondary/10 dark:from-darkPrimary/20 dark:to-darkSecondary/20 rounded-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                {isLive ? 'Connected to Hospital Server' : 'Biometric Simulation System'}
              </span>
            </div>
            
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Live Clinical <span className="text-lightPrimary dark:bg-gradient-to-r dark:from-darkPrimary dark:to-darkSecondary dark:bg-clip-text dark:text-transparent">Statistics</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mt-2 max-w-xl text-sm md:text-base">
              Real-time patient monitoring statistics synchronized from our connected wards, outpatient portals, and active AI neural engines.
            </p>
          </div>

          <button 
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-lightPrimary/30 dark:hover:border-darkPrimary/30 hover:bg-slate-200 dark:hover:bg-darkPrimary/10 text-xs font-bold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync Real-Time API
          </button>
        </div>

        {/* Counter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {statsMeta.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                <div className="glass-panel border border-slate-200/50 dark:border-white/5 p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-slate-350 dark:hover:border-white/15 shadow-premiumLight hover:shadow-premiumLightHover dark:shadow-none transition-all">
                  <div className="flex items-center justify-between mb-4 gap-4">
                    <span className="text-slate-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </span>
                    <div className={`p-2 rounded-xl border ${item.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-baseline">
                    <Counter targetValue={stats[item.key]} duration={1800} suffix={item.suffix} />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>


  );
};

export default HealthStats;
