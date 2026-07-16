import React, { useState } from 'react';
import { Star, Calendar, ShieldCheck, MapPin, X, GraduationCap, Microscope, Clock, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import RippleButton from '../../components/RippleButton';

const doctorsList = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Chief Cardiologist & Bio-researcher',
    rating: '4.9',
    reviews: '124',
    location: 'Mayo Clinic, Rochester',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=400&h=400&q=80',
    tags: ['Heart Care', 'Biometrics'],
    bio: 'Dr. Sarah Jenkins is the Chief of Cardiology at Mayo Clinic. With over 15 years of clinical practice, she specializes in advanced biometric vital monitoring, heart failure management, and bio-integration analytics.',
    education: 'MD, Johns Hopkins University School of Medicine; Fellowship in Cardiovascular Disease, Mayo School of Graduate Medical Education.',
    research: 'Real-time telemetry algorithms, wearable cardiovascular sensors, predictive cardiac failure indicators.',
    availability: 'Mon, Wed, Fri (9:00 AM - 1:00 PM)'
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Clinical Geneticist & AI Architect',
    rating: '4.8',
    reviews: '98',
    location: 'Stanford Hospital, Palo Alto',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&crop=faces&w=400&h=400&q=80',
    tags: ['DNA Mapping', 'AI Diagnostics'],
    bio: 'Dr. Marcus Chen leads the AI Genetics Research Initiative at Stanford. He bridges clinical genetic profiling with machine learning models to map hereditary diseases.',
    education: 'MD-PhD in Biomedical Informatics, Stanford University School of Medicine.',
    research: 'Neural disease risk mapping, genomic sequencing networks, predictive oncology biomarkers.',
    availability: 'Tue, Thu (10:00 AM - 4:00 PM)'
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Lead Neurologist & Robotic Surgeon',
    rating: '5.0',
    reviews: '156',
    location: 'Johns Hopkins, Baltimore',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&crop=faces&w=400&h=400&q=80',
    tags: ['Neurosurgery', 'Robotic Assist'],
    bio: 'Dr. Elena Rostova is a pioneer in machine-guided micro-neurosurgery. Operating out of Johns Hopkins, she specializes in robotic neurological resectioning and bio-electronic implants.',
    education: 'MD, Harvard Medical School; Residency in Neurosurgery, Massachusetts General Hospital.',
    research: 'Robotic stereotactic surgery, brain-computer interfaces, neural regeneration stimulation.',
    availability: 'Mon, Tue, Thu (8:00 AM - 12:00 PM)'
  }
];

const FeaturedDoctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="doctors">
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-darkSecondary/5 blur-[120px] pointer-events-none"></div>

      <ScrollReveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-darkAccent border border-darkSecondary/30 text-xs font-mono font-semibold text-darkSecondary mb-4 uppercase tracking-wider">
            🤝 Board Certified Specialists
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Consult Medical <span className="bg-gradient-to-r from-darkSecondary to-indigo-400 bg-clip-text text-transparent">Experts</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Connect with leading board-certified specialists for personalized clinical consultation and care.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorsList.map((doctor, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 0.1}>
            <div className="group relative glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-darkSecondary/30 hover:shadow-glowSecondary/10 flex flex-col justify-between overflow-hidden h-full">
              
              {/* Doctor Graphic Frame */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 bg-darkAccent/50 border border-white/5">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-80"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-darkBg/80 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-gray-400 font-normal">({doctor.reviews})</span>
                </div>

                {/* Verification Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-darkPrimary/25 backdrop-blur-md border border-darkPrimary/35 text-[10px] font-mono font-bold uppercase tracking-wider text-darkPrimary">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Partner</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="flex-grow">
                <h3 className="font-sora text-xl font-bold text-white mb-1 group-hover:text-darkSecondary transition-colors duration-300">
                  {doctor.name}
                </h3>
                <p className="text-darkSecondary text-xs font-semibold uppercase tracking-wider mb-3">
                  {doctor.role}
                </p>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>{doctor.location}</span>
                </div>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {doctor.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation trigger button */}
              <div className="pt-4 border-t border-white/5 flex gap-3 w-full">
                <Link to="/book-appointment" className="flex-grow">
                  <RippleButton className="w-full py-3 px-4 rounded-xl bg-darkSecondary text-white font-semibold text-sm hover:bg-darkSecondary/90 transition-all duration-300">
                    <Calendar className="w-4 h-4 mr-2 inline" />
                    Book Appointment
                  </RippleButton>
                </Link>
                <button 
                  onClick={() => setSelectedDoctor(doctor)}
                  className="px-4 py-3 rounded-xl bg-white/5 text-gray-300 font-semibold text-sm hover:bg-white/10 border border-white/5 hover:text-white transition-all cursor-pointer"
                >
                  Profile
                </button>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={0.3}>
        <div className="mt-12 text-center">
          <Link to="/doctors">
            <RippleButton className="px-8 py-3.5 rounded-2xl bg-transparent border border-darkPrimary/40 text-darkPrimary font-bold hover:bg-darkPrimary/10 hover:shadow-glowPrimary transition-all duration-300">
              View All Specialists
            </RippleButton>
          </Link>
        </div>
      </ScrollReveal>

      {/* Modal Profile Render */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-darkBg/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Doctor Avatar & Basics */}
                <div className="md:col-span-5 text-center md:text-left">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden mx-auto md:mx-0 mb-4 border border-white/10 bg-darkAccent">
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400 mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedDoctor.rating}</span>
                    <span className="text-gray-400 font-normal">({selectedDoctor.reviews})</span>
                  </div>

                  <h3 className="font-sora text-2xl font-bold text-white mb-1">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-darkSecondary text-xs font-semibold uppercase tracking-wider mb-4">
                    {selectedDoctor.role}
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-gray-400 text-xs mb-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{selectedDoctor.location}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Accepting Patients</span>
                  </div>
                </div>

                {/* Doctor Bio, Education, Form */}
                <div className="md:col-span-7 space-y-6">
                  {/* Bio */}
                  <div>
                    <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider mb-2">Biography</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedDoctor.bio}
                    </p>
                  </div>

                  {/* Credentials / Ed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-darkPrimary mb-2">
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Education</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {selectedDoctor.education}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-darkSecondary mb-2">
                        <Microscope className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Research Focus</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {selectedDoctor.research}
                      </p>
                    </div>
                  </div>

                  {/* Scheduling Mock Form */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-semibold">Consulting Hours: {selectedDoctor.availability}</span>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Appointment request sent to ${selectedDoctor.name}! We will contact you shortly.`);
                      setSelectedDoctor(null);
                    }} className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-darkBg/60 border border-white/10 focus:border-darkSecondary/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
                        required
                      />
                      <RippleButton type="submit" className="w-full py-2.5 rounded-xl bg-darkSecondary text-white font-semibold text-xs shadow-glowSecondary hover:bg-darkSecondary/95 transition-all">
                        Request Consultation Slot
                      </RippleButton>
                    </form>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedDoctors;
