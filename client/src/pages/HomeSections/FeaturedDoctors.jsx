import React from 'react';

const FeaturedDoctors = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto relative">
      <div className="glass-panel rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2">Our Featured Specialists</h3>
          <p className="text-gray-400 max-w-lg">
            Connect with board-certified medical experts and specialists dedicated to providing top-tier patient care.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-darkSecondary text-white font-semibold shadow-glowSecondary hover:bg-darkSecondary/90 transition-all duration-300 hover:scale-[1.03] shrink-0">
          Find a Doctor
        </button>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
