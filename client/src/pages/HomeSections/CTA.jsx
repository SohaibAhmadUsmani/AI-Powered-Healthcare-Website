import React, { useState } from 'react';
import { Mail, Sparkles, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import RippleButton from '../../components/RippleButton';

const CTA = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto relative my-16" id="cta">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-r from-darkPrimary/10 to-darkSecondary/10 blur-[130px] pointer-events-none"></div>

      <ScrollReveal direction="scale">
        <div className="relative glass-panel rounded-3xl p-8 md:p-16 overflow-hidden border border-white/10 shadow-2xl">
          {/* Highlight top-left glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-darkPrimary via-indigo-500 to-darkSecondary"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-darkPrimary mb-6 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Empower Your Health Journey
              </div>

              <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to Experience <span className="bg-gradient-to-r from-darkPrimary to-darkSecondary bg-clip-text text-transparent">Next-Gen Care</span>?
              </h2>

              <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                Create your patient profile to connect biometrics, receive automated diagnosis warnings, and consult board-certified specialists 24/7.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/book-appointment">
                  <RippleButton className="px-6 py-3.5 rounded-xl bg-darkPrimary text-darkBg font-bold shadow-glowPrimary hover:bg-darkPrimary/95 transition-all">
                    Get Started Free
                  </RippleButton>
                </Link>
                
                <Link to="/emergency">
                  <button className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center gap-2 transition-all cursor-pointer">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    Emergency Hotline
                  </button>
                </Link>
              </div>
            </div>

            {/* Email Portal Subscription card */}
            <div className="lg:col-span-5 w-full">
              <div className="glass-panel border-white/5 bg-darkAccent/40 p-8 rounded-2xl border">
                <h3 className="font-sora text-lg font-bold text-white mb-2">
                  Subscribe to Medical Insights
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Get weekly AI-curated health digests, preventative therapy articles, and platform updates.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address" 
                      className="w-full bg-darkBg/60 border border-white/10 focus:border-darkPrimary/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <RippleButton type="submit" className="w-full py-3 rounded-xl bg-darkSecondary text-white font-semibold text-sm shadow-glowSecondary hover:bg-darkSecondary/90 transition-all">
                    Subscribe
                  </RippleButton>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-[10px] text-gray-500 font-mono">
                    🛡️ HIPAA Compliant & Encrypted Data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTA;
