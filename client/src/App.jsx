import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Activity, Shield } from 'lucide-react';
import Home from './pages/Home';
import LabTests from './pages/LabTests';
import EmergencyContacts from './pages/EmergencyContacts';
import RippleButton from './components/RippleButton';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Doctors', href: '/doctors' },
    { name: 'Pharmacy', href: '/store' },
    { name: 'Lab Tests', href: '/laboratory' },
    { name: 'Emergency', href: '/emergency' },
    { name: 'Health Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-sky-600">MediMind.AI</h1>

            <nav className="hidden xl:flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 hover:text-sky-600 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Portal Action Button */}
            <div className="hidden md:block">
              <Link to="/book-appointment">
                <RippleButton className="px-5 py-2.5 rounded-xl bg-darkPrimary text-darkBg font-bold text-xs shadow-glowPrimary hover:bg-darkPrimary/95 transition-all">
                  Book Appointment
                </RippleButton>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="xl:hidden glass-panel border-t border-white/5 mt-4 py-6 px-6 space-y-4 absolute left-0 w-full shadow-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                <RippleButton className="w-full py-3 rounded-xl bg-darkPrimary text-darkBg font-bold text-xs shadow-glowPrimary transition-all">
                  Book Appointment
                </RippleButton>
              </Link>
            </div>
          )}
        </header>

        {/* Spacer for Fixed Header */}
        <div className="h-20"></div>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laboratory" element={<LabTests />} />
            <Route path="/emergency" element={<EmergencyContacts />} />
          </Routes>
        </main>

        {/* Premium footer */}
        <footer className="glass-panel border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-12">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-darkPrimary/30 via-indigo-500/30 to-darkSecondary/30"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5 relative z-10">
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-xl bg-darkPrimary/10 border border-darkPrimary/30">
                  <Activity className="w-5 h-5 text-darkPrimary animate-pulse" />
                </div>
                <span className="font-sora text-xl font-bold tracking-tight text-white">
                  MediMind<span className="text-darkSecondary">.AI</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Revolutionizing clinical workflows, diagnostic speed, and personal wellness monitoring through custom AI engines and secure biometrics streaming.
              </p>
            </div>

            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider">Features</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/doctors" className="text-gray-400 hover:text-white transition-colors">AI Diagnostics</Link></li>
                <li><Link to="/doctors" className="text-gray-400 hover:text-white transition-colors">Telehealth Portal</Link></li>
                <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Pharmacy Store</Link></li>
                <li><Link to="/laboratory" className="text-gray-400 hover:text-white transition-colors">Laboratory Tests</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press Kit</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider">Security & Trust</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                All metrics are encrypted end-to-end. We adhere strictly to HIPAA compliance protocols and GDPR regulatory guidelines.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Fully HIPAA Compliant</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
            <p>&copy; {new Date().getFullYear()} MediMind.AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookie Settings</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;