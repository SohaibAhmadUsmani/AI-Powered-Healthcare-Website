import React from 'react';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';

const reviewsList = [
  {
    name: 'Clara Oswald',
    role: 'Verified Patient',
    condition: 'Treated: Early Cardio Detection',
    text: 'The AI Symptom Checker flagged a subtle cardiovascular anomaly. The platform booked me with Dr. Sarah Jenkins within 10 minutes. Absolute lifesaver.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Robert Downey',
    role: 'Wearable Sync User',
    condition: 'Treated: Post-Op Bio-monitoring',
    text: 'Connecting my smartwatch vitals was effortless. My heart rate and oxygen metrics stream live to the clinic, keeping my care team constantly informed.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Dr. Amara Vance',
    role: 'Clinical Partner & Advisor',
    condition: 'Consultant: Neural Diagnostics',
    text: 'As a practicing physician, integrating their AI diagnostic engine has dramatically reduced administrative review times. A gold standard for digital health.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="reviews">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-lightPrimary/5 dark:bg-indigo-500/5 blur-[120px] pointer-events-none transition-colors"></div>

      <ScrollReveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-darkAccent border border-lightPrimary/20 dark:border-darkPrimary/30 text-xs font-mono font-semibold text-lightPrimary dark:text-darkPrimary mb-4 uppercase tracking-wider">
            ⭐ Verified Patient Care
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Loved by Patients & <span className="text-lightPrimary dark:bg-gradient-to-r dark:from-darkPrimary dark:to-indigo-400 dark:bg-clip-text dark:text-transparent">Clinicians</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4 text-base sm:text-lg">
            Read stories of recovery, automated diagnostic accuracy, and premium telemedicine experiences.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {reviewsList.map((review, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 0.1}>
            <div className="group relative glass-panel rounded-2xl p-8 h-full transition-all duration-300 border border-slate-200/60 dark:border-white/5 hover:border-lightPrimary/20 dark:hover:border-darkPrimary/20 hover:-translate-y-1 shadow-premiumLight hover:shadow-premiumLightHover dark:shadow-none flex flex-col justify-between">
              
              {/* Quote icon & Rating stars */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lightPrimary/30 dark:text-darkPrimary/40">
                    <Quote className="w-8 h-8 transform rotate-180" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Patient Profile info */}
              <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200/50 dark:border-white/10"
                />
                <div>
                  <h4 className="font-sora text-sm font-bold text-slate-800 dark:text-white">
                    {review.name}
                  </h4>
                  <div className="flex flex-col text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{review.role}</span>
                    <span className="text-lightPrimary dark:text-darkPrimary font-semibold mt-0.5">{review.condition}</span>
                  </div>
                </div>
              </div>


            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};


export default Testimonials;
