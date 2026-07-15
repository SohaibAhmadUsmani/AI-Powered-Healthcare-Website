import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-darkPrimary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-darkSecondary/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column: Copy & Actions */}
        <div className="text-left flex flex-col items-start">
          {/* Glowing Badget Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-darkAccent border border-darkPrimary/30 text-xs font-semibold text-darkPrimary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-darkPrimary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-darkPrimary"></span>
            </span>
            <span className="tracking-wider uppercase font-mono">✨ Next-Gen Healthcare Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            AI-Powered <span className="bg-gradient-to-r from-darkPrimary via-indigo-400 to-darkSecondary bg-clip-text text-transparent">Healthcare Redefined</span>
          </h1>

          {/* Section Title */}
          <h2 className="font-sora text-xl sm:text-2xl font-semibold text-white/80 mt-4 mb-6">
            Smart Analytics, Better Life
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Experience the future of medicine with real-time health tracking, instant doctor consultations, and AI-driven insights. Connect your devices for a seamless care experience.
          </p>

          {/* Button Styles */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-darkPrimary text-darkBg font-semibold shadow-glowPrimary hover:bg-darkPrimary/90 transition-all duration-300 hover:scale-[1.03]">
              Book Appointment
            </button>
            <button className="px-6 py-3 rounded-xl bg-darkSecondary text-white font-semibold shadow-glowSecondary hover:bg-darkSecondary/90 transition-all duration-300 hover:scale-[1.03]">
              Search Medicines
            </button>
            <button className="px-6 py-3 rounded-xl bg-transparent border border-darkPrimary/50 text-darkPrimary font-semibold hover:bg-darkPrimary/10 transition-all duration-300 hover:shadow-glowPrimary">
              Emergency Contact
            </button>
          </div>
        </div>

        {/* Right Column: Specimen Card */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md relative">
            {/* Soft backdrop glow specifically behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-darkPrimary to-darkSecondary rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            {/* Specimen Card Content */}
            <div className="relative glass-panel glass-card-glow rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>Real-time Biometrics</span>
                </div>
                <span className="text-gray-500 text-xs font-mono">ID: H-9801</span>
              </div>

              <h3 className="font-sora text-2xl font-bold text-white mb-2">
                Cardio Analytics
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Connect your smart health device to monitor blood flow, vitals, and oxygen levels automatically.
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Heart Rate</span>
                  <div className="flex items-baseline gap-1 text-3xl font-bold text-darkPrimary font-mono">
                    <span>98.4</span>
                    <span className="text-sm font-normal text-gray-400">bpm</span>
                  </div>
                </div>
                
                <div className="px-3 py-1.5 rounded-lg bg-darkPrimary/10 text-darkPrimary text-xs font-bold tracking-widest border border-darkPrimary/20 uppercase">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
