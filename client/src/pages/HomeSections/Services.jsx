import React from 'react';
import { Brain, Activity, Video, Pill, Cpu, Dna, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import RippleButton from '../../components/RippleButton';

const servicesList = [
  {
    icon: Brain,
    title: 'AI Symptom Checker',
    desc: 'Instant, clinical-grade analysis of symptoms powered by advanced deep learning medical algorithms.',
    color: 'from-cyan-500/20 to-blue-500/20',
    badge: 'Popular',
    route: '/blog'
  },
  {
    icon: Activity,
    title: 'Cardio Analytics',
    desc: 'Continuous real-time tracking of heart rate variability, blood pressure, and biometrics via wearables.',
    color: 'from-emerald-500/20 to-teal-500/20',
    badge: 'Live',
    route: '/doctors'
  },
  {
    icon: Video,
    title: 'Telehealth Portal',
    desc: 'On-demand video consultations with board-certified physicians, specialists, and clinical advisors.',
    color: 'from-violet-500/20 to-fuchsia-500/20',
    badge: '24/7',
    route: '/doctors'
  },
  {
    icon: Pill,
    title: 'Smart Pharmacy',
    desc: 'AI-driven medication matching, e-prescriptions, automated refills, and quick medicine delivery.',
    color: 'from-amber-500/20 to-orange-500/20',
    route: '/store'
  },
  {
    icon: Cpu,
    title: 'Robotic Surgery Assist',
    desc: 'Explore details on advanced minimally invasive robotic procedures and machine-guided precision.',
    color: 'from-red-500/20 to-rose-500/20',
    route: '/blog'
  },
  {
    icon: Dna,
    title: 'Genomic Risk Mapping',
    desc: 'Analyze genetic markers to understand disease predispositions, lifestyle plans, and longevity insights.',
    color: 'from-indigo-500/20 to-purple-500/20',
    badge: 'Advanced',
    route: '/laboratory'
  }
];

const Services = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="services">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

      <ScrollReveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-darkAccent border border-darkPrimary/30 text-xs font-mono font-semibold text-darkPrimary mb-4 uppercase tracking-wider">
            🔬 Our Clinical Innovations
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            AI-Driven Medical <span className="bg-gradient-to-r from-darkPrimary to-darkSecondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Empowering patients and physicians with automated diagnostics, virtual care, and precision medicine.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, index) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={index} direction="up" delay={index * 0.08}>
              <Link to={service.route} className="block h-full">
                <div className="group relative glass-panel rounded-3xl p-8 h-full transition-all duration-300 hover:border-darkPrimary/30 hover:shadow-glowPrimary/10 flex flex-col justify-between overflow-hidden cursor-pointer">
                  {/* Accent background blur */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} blur-[30px] group-hover:scale-150 transition-all duration-500 pointer-events-none`}></div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-darkAccent border border-white/5 text-darkPrimary group-hover:border-darkPrimary/40 transition-colors duration-300">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {service.badge && (
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-darkPrimary/10 border border-darkPrimary/20 text-darkPrimary">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-sora text-xl font-bold text-white mb-3 group-hover:text-darkPrimary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-400 transition-colors">
                      Learn more
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 text-white/60 group-hover:bg-darkPrimary group-hover:text-darkBg group-hover:-translate-x-1 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal direction="up" delay={0.4}>
        <div className="mt-12 text-center">
          <Link to="/doctors">
            <RippleButton className="px-8 py-3.5 rounded-2xl bg-transparent border border-darkPrimary/40 text-darkPrimary font-bold hover:bg-darkPrimary/10 hover:shadow-glowPrimary transition-all duration-300">
              Explore Medical Capabilities
            </RippleButton>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Services;
