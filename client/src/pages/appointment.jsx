import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import AppointmentForm from '../components/appointment/AppointmentForm';
import RippleButton from '../components/RippleButton';

const Appointment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg bg-grid-pattern text-slate-850 dark:text-slate-100 py-12 sm:py-16 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <RippleButton
          onClick={() => navigate('/doctors')}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-lightPrimary dark:hover:text-darkPrimary hover:border-lightPrimary/40 dark:hover:border-darkPrimary/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer font-sans font-semibold text-xs uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Doctors</span>
        </RippleButton>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 text-lightPrimary dark:text-darkPrimary text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Calendar className="w-4 h-4" />
            <span>Seamless Consultation Booking</span>
          </div>
          
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Book Your{' '}
            <span className="bg-gradient-to-r from-lightPrimary via-cyan-500 to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary bg-clip-text text-transparent">
              Appointment
            </span>
          </h1>
          
          <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Schedule a personalized session with our expert healthcare professionals at your preferred date and time.
          </p>
        </div>

        {/* Form Container */}
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;