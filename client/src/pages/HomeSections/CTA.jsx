import React from 'react';

const CTA = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto relative my-12">
      <div className="glass-panel rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 border-l-4 border-l-darkPrimary">
        <div>
          <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Prioritize Your Health?</h3>
          <p className="text-gray-400 max-w-lg">
            Create an account today to schedule doctor appointments, manage prescriptions, and track your daily biometrics.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-darkPrimary text-darkBg font-semibold shadow-glowPrimary hover:bg-darkPrimary/90 transition-all duration-300 hover:scale-[1.03] shrink-0">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CTA;
