import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Activity, Menu, X, Shield } from "lucide-react";

import Home from "./pages/Home";
import DoctorsList from "./pages/doctors/DoctorsList";
import PageTransition from "./components/PageTransition";
import RippleButton from "./components/RippleButton";

// Lightweight placeholder gateway for teammates' modules
const TeammatePlaceholder = ({ name }) => (
  <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
    <div className="glass-panel p-8 rounded-3xl max-w-md border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-darkPrimary to-darkSecondary"></div>

      <h2 className="font-sora text-2xl font-bold text-white mb-2">
        {name}
      </h2>

      <p className="text-gray-400 text-sm leading-relaxed">
        This section is managed under a separate teammate's branch. The module
        interface will be fully populated upon merging branches.
      </p>

      <Link to="/" className="inline-block mt-6">
        <RippleButton className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-all">
          Back to Homepage
        </RippleButton>
      </Link>
    </div>
  </div>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Pharmacy", href: "/store" },
    { name: "Lab Tests", href: "/laboratory" },
    { name: "Emergency", href: "/emergency" },
    { name: "Health Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-darkBg text-slate-100 font-sans selection:bg-darkPrimary/30 selection:text-white">

        {/* Navigation */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled
              ? "glass-panel py-4 shadow-lg border-b border-white/5"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-darkPrimary/10 border border-darkPrimary/30 group-hover:border-darkPrimary/60 transition-colors">
                <Activity className="w-5 h-5 text-darkPrimary animate-pulse" />
              </div>

              <span className="font-sora text-xl font-bold tracking-tight text-white group-hover:text-darkPrimary transition-colors">
                MediMind<span className="text-darkSecondary">.AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Link to="/book-appointment">
                <RippleButton className="px-5 py-2.5 rounded-xl bg-darkPrimary text-darkBg font-bold text-xs shadow-glowPrimary hover:bg-darkPrimary/95 transition-all">
                  Book Appointment
                </RippleButton>
              </Link>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown */}
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

              <Link
                to="/book-appointment"
                onClick={() => setMobileMenuOpen(false)}
              >
                <RippleButton className="w-full py-3 rounded-xl bg-darkPrimary text-darkBg font-bold text-xs shadow-glowPrimary transition-all">
                  Book Appointment
                </RippleButton>
              </Link>
            </div>
          )}
        </header>

        {/* Spacer */}
        <div className="h-20"></div>

        {/* Main */}
        <main className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route
                path="/book-appointment"
                element={<TeammatePlaceholder name="Appointment Booking" />}
              />
              <Route
                path="/store"
                element={<TeammatePlaceholder name="Medicine Store" />}
              />
              <Route
                path="/laboratory"
                element={<TeammatePlaceholder name="Laboratory Portal" />}
              />
              <Route
                path="/emergency"
                element={<TeammatePlaceholder name="Emergency Contacts" />}
              />
              <Route
                path="/blog"
                element={<TeammatePlaceholder name="Health Blog" />}
              />
              <Route
                path="/contact"
                element={<TeammatePlaceholder name="Contact Operations" />}
              />
            </Routes>
          </PageTransition>
        </main>

        {/* Footer */}
        <footer className="glass-panel border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-12">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-darkPrimary/30 via-indigo-500/30 to-darkSecondary/30"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5 relative z-10">

            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-darkPrimary/10 border border-darkPrimary/30">
                  <Activity className="w-5 h-5 text-darkPrimary animate-pulse" />
                </div>

                <span className="font-sora text-xl font-bold text-white">
                  MediMind<span className="text-darkSecondary">.AI</span>
                </span>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed">
                Revolutionizing healthcare through AI-powered diagnostics,
                telemedicine, and secure patient care.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold uppercase text-sm">Features</h4>

              <ul className="space-y-2 text-xs">
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/store">Pharmacy</Link></li>
                <li><Link to="/laboratory">Lab Tests</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-bold uppercase text-sm">
                Security & Trust
              </h4>

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <Shield className="w-4 h-4" />
                HIPAA Compliant
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 flex justify-between text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} MediMind.AI. All rights
              reserved.
            </p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;