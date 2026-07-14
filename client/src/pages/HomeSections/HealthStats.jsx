import React from 'react';

const HealthStats = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto relative">
      <div className="glass-panel rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2">Live Health Statistics</h3>
          <p className="text-gray-400 max-w-lg">
            Track real-time data insights, clinical outcomes, patient recovery records, and medical consultations.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-darkPrimary text-darkBg font-semibold shadow-glowPrimary hover:bg-darkPrimary/90 transition-all duration-300 hover:scale-[1.03] shrink-0">
          Sync Live Counters
        </button>
      </div>
    </section>
  );
};

export default HealthStats;
