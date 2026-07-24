import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, Send, User, 
  MessageSquare, CheckCircle2, AlertCircle, HelpCircle 
} from 'lucide-react';
import RippleButton from '../components/RippleButton';
import FloatingBackground from '../components/common/FloatingBackground';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch(() => {
        setErrorMsg('Could not send your message right now. Please try again later.');
        setSubmitting(false);
      });
  };

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'Response within 24 hours',
      value: 'support@medimind.ai',
      link: 'mailto:support@medimind.ai',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    },
    {
      icon: Phone,
      title: 'Phone & Emergency',
      subtitle: '24/7 Helpline',
      value: '+92 51 1234567',
      link: 'tel:+92511234567',
      badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      subtitle: 'Medical Tech Hub',
      value: 'Rawalpindi, Pakistan',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      subtitle: 'AI Support Active 24/7',
      value: 'Mon - Sun: 8:00 AM - 10:00 PM',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <div className="relative min-h-screen bg-lightBg dark:bg-darkBg bg-grid-pattern overflow-hidden py-12 lg:py-16 px-4 sm:px-6">
      <FloatingBackground />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-400/15 to-indigo-400/15 dark:from-darkPrimary/10 dark:to-darkSecondary/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br from-indigo-400/20 to-violet-400/20 dark:from-darkSecondary/15 dark:to-darkPrimary/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-darkAccent border border-lightPrimary/20 dark:border-darkPrimary/30 text-xs font-semibold text-lightPrimary dark:text-darkPrimary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightPrimary dark:bg-darkPrimary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lightPrimary dark:bg-darkPrimary"></span>
            </span>
            <span className="tracking-wider uppercase font-mono">24/7 Patient Support & Inquiry</span>
          </div>

          <h1 className="font-sora text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:bg-gradient-to-r dark:from-darkPrimary dark:via-indigo-400 dark:to-darkSecondary dark:bg-clip-text dark:text-transparent leading-tight">
            Get in Touch With Us
          </h1>

          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Have questions regarding AI diagnostics, doctor appointments, or pharmacy orders? Reach out to our dedicated healthcare team anytime.
          </p>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-glowLightPrimary dark:hover:shadow-glowPrimary flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${detail.badgeColor} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                      {detail.subtitle}
                    </span>
                  </div>

                  <h3 className="font-sora text-base font-bold text-slate-800 dark:text-white mb-1">
                    {detail.title}
                  </h3>

                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="text-sm text-lightPrimary dark:text-darkPrimary font-semibold hover:underline block truncate"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-600 dark:text-gray-300 font-medium">
                      {detail.value}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Grid: Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary"></div>

            <div className="mb-6">
              <h2 className="font-sora text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-lightPrimary dark:text-darkPrimary" />
                Send Us a Message
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">
                Fill out the form below and our medical coordinators will contact you shortly.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="font-sora text-lg font-bold">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
                    Thank you for contacting NeuroCare.AI. A medical team representative will reach out to your provided email address shortly.
                  </p>
                  <RippleButton
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all mt-2"
                  >
                    Send Another Message
                  </RippleButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
                      <input
                        type="text"
                        placeholder="e.g. Dr. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-lightPrimary dark:focus:border-darkPrimary rounded-xl outline-none transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
                      <input
                        type="email"
                        placeholder="e.g. john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-lightPrimary dark:focus:border-darkPrimary rounded-xl outline-none transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        placeholder="How can we help you today?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full p-4 bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-lightPrimary dark:focus:border-darkPrimary rounded-xl outline-none transition-all text-sm shadow-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <RippleButton
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-sm shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/90 dark:hover:bg-darkPrimary/90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </RippleButton>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Location Map & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-sora text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-lightPrimary dark:text-darkPrimary" />
                  Medical Tech Hub Location
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary border border-lightPrimary/20 dark:border-darkPrimary/20 font-bold uppercase">
                  Main Campus
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm relative group">
                <iframe
                  title="Google Map Location"
                  className="w-full h-64 border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Rawalpindi,Pakistan&output=embed"
                ></iframe>
              </div>
            </div>

            {/* Quick FAQ Box */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl space-y-3">
              <h4 className="font-sora text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-lightSecondary dark:text-darkSecondary" />
                Need Immediate Emergency Help?
              </h4>
              <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                If you require instant emergency medical attention, please visit our dedicated Emergency page or call our 24/7 hotline directly.
              </p>
              <a
                href="/emergency"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-lightSecondary dark:text-darkSecondary hover:underline pt-1"
              >
                Go to Emergency Contacts &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;