import React, { useEffect, useState, useRef } from 'react';
import RippleButton from '../components/RippleButton';
import { PhoneCall, ShieldAlert, Siren, PhoneForwarded } from 'lucide-react';

const fallbackContacts = [
  { id: 1, title: 'Ambulance Emergency', number: '1122', desc: '24/7 Rapid Response Medical Dispatch' },
  { id: 2, title: 'Blood Bank Helpline', number: '051-1234567', desc: 'Urgent Plasma & Whole Blood Availability' },
  { id: 3, title: 'Trauma & Nearby Hospitals', number: '051-9876543', desc: 'Direct Emergency Ward Hotline' },
  { id: 4, title: 'Police Assistance', number: '15', desc: 'Law Enforcement & Highway Rescue' },
];

const RevealCard = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? 'animate-fade-in' : 'opacity-0'}>
      {children}
    </div>
  );
};

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/emergency')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((c) => ({
          id: c._id,
          title: c.title,
          number: c.number,
          desc: c.desc || 'Immediate 24/7 Response Line'
        }));
        setContacts(formatted);
        setLoading(false);
      })
      .catch(() => {
        setContacts(fallbackContacts);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg bg-grid-pattern text-slate-850 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono font-semibold uppercase tracking-widest animate-pulse">
            <Siren className="w-4 h-4" />
            <span>24/7 Emergency Assistance Hotline</span>
          </div>

          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Emergency{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Contacts & Services
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Immediate access to critical healthcare services, ambulance dispatch, trauma care, and blood bank support.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs text-center flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Offline mode active — showing verified emergency numbers.</span>
          </div>
        )}

        {loading ? (
          <div className="min-h-[250px] flex items-center justify-center text-xs font-mono text-slate-400 animate-pulse">
            Connecting Emergency Services...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contacts.map((contact) => (
              <RevealCard key={contact.id}>
                <div className="glass-panel bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 shadow-premiumLight dark:shadow-2xl hover-card-zoom transition-all duration-300 flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                        {contact.title}
                      </h3>
                    </div>
                    <p className="font-mono text-xl font-bold text-red-500 dark:text-red-400 pl-1">
                      {contact.number}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">
                      {contact.desc}
                    </p>
                  </div>

                  <a href={'tel:' + contact.number} className="shrink-0">
                    <RippleButton className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-red-500/25 transition-all duration-300 cursor-pointer">
                      <PhoneForwarded className="w-4 h-4" />
                      <span>Call Now</span>
                    </RippleButton>
                  </a>
                </div>
              </RevealCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;