import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto relative">
      <div className="glass-panel rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2">What Our Patients Say</h3>
          <p className="text-gray-400 max-w-lg">
            Discover how our digital healthcare services and dedicated staff have helped patients on their recovery journeys.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-transparent border border-darkPrimary/50 text-darkPrimary font-semibold hover:bg-darkPrimary/10 transition-all duration-300 hover:shadow-glowPrimary shrink-0">
          Read All Reviews
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
