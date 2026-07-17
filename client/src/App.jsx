import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { 
  Activity, Menu, X, Shield, Sun, Moon,
  Home as HomeIcon, Users, ShoppingBag, FlaskConical, PhoneCall, BookOpen, Mail
} from 'lucide-react';
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OAuthCallback from "./pages/auth/OAuthCallback";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SplashScreen from './components/splash/SplashScreen';
import PageTransition from './components/PageTransition';
import RippleButton from './components/RippleButton';
import DoctorsList from "./pages/doctors/DoctorsList";
import DoctorDetails from "./pages/doctors/DoctorDetails"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Lightweight placeholder gateway for teammates' modules (to prevent branch conflicts)
const TeammatePlaceholder = ({ name }) => (
  <div className="min-h-[70vh] flex items-center justify-center p-6 text-center relative z-10">
    <div className="glass-panel p-8 rounded-2xl max-w-md border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary"></div>
      <h2 className="font-sora text-2xl font-bold text-slate-800 dark:text-white mb-2">{name}</h2>
      <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
        This section is managed under a separate teammate's branch. The module interface will be fully populated upon merging branches.
      </p>
      <Link to="/" className="inline-block mt-6">
        <RippleButton className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-white/10 transition-all">
          Back to Homepage
        </RippleButton>
      </Link>
    </div>
  </div>
);

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Find Doctors', href: '/doctors', icon: Users },
    { name: 'Pharmacy', href: '/store', icon: ShoppingBag },
    { name: 'Lab Tests', href: '/laboratory', icon: FlaskConical },
    { name: 'Emergency', href: '/emergency', icon: PhoneCall },
    { name: 'Health Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-lightBg dark:bg-darkBg bg-grid-pattern text-slate-850 dark:text-slate-100 font-sans selection:bg-lightPrimary/20 dark:selection:bg-darkPrimary/30 selection:text-lightPrimary dark:selection:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-panel py-4 shadow-premiumLight dark:shadow-lg dark:border-b dark:border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 group-hover:border-lightPrimary/60 dark:group-hover:border-darkPrimary/60 transition-colors">
              <Activity className="w-5 h-5 text-lightPrimary dark:text-darkPrimary animate-pulse" />
            </div>
            <span className="font-sora text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors">
              NeuroCare<span className="text-lightSecondary dark:text-darkSecondary">.AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-sm font-semibold tracking-wide text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Portal & Theme Toggle (desktop only) */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <Link to="/dashboard">
                <RippleButton className="px-5 py-2.5 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all">
                  Dashboard
                </RippleButton>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <RippleButton className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white font-bold text-xs transition-all">
                    Sign In
                  </RippleButton>
                </Link>
                <Link to="/signup">
                  <RippleButton className="px-5 py-2.5 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all">
                    Sign Up
                  </RippleButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu (menu + theme toggle) */}
          <div className="flex items-center gap-3 xl:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[90] xl:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Slide out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[290px] sm:w-[350px] bg-white dark:bg-darkBg shadow-2xl z-[100] p-6 flex flex-col justify-between border-l border-slate-200/60 dark:border-white/5 xl:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/50 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-lightPrimary dark:text-darkPrimary animate-pulse" />
                    <span className="font-sora text-base font-bold text-slate-900 dark:text-white">NeuroCare.AI</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/30 dark:border-white/10 text-slate-600 dark:text-gray-305 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, idx) => {
                    const LinkIcon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <Link 
                          to={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-semibold text-slate-700 dark:text-gray-200 hover:text-lightPrimary dark:hover:text-darkPrimary hover:translate-x-1 transition-all duration-200"
                        >
                          <LinkIcon className="w-5 h-5 text-slate-400 dark:text-gray-500 group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors" />
                          <span>{link.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <RippleButton className="w-full py-3.5 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all">
                      Dashboard
                    </RippleButton>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                      <RippleButton className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/30 dark:border-white/10 text-slate-700 dark:text-gray-300 font-bold text-xs transition-all">
                        Sign In
                      </RippleButton>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                      <RippleButton className="w-full py-3 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all">
                        Sign Up
                      </RippleButton>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for Fixed Header */}
      <div className="h-20"></div>

      {/* Main Content Layout with Transition Wrapper */}
      <main className="flex-grow">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Premium footer */}
      <footer className="glass-panel dark:border-t dark:border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-12">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lightPrimary/30 via-indigo-500/30 to-lightSecondary/30 dark:from-darkPrimary/30 dark:via-indigo-500/30 dark:to-darkSecondary/30"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/5 relative z-10">
          {/* Branding column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30">
                <Activity className="w-5 h-5 text-lightPrimary dark:text-darkPrimary animate-pulse" />
              </div>
              <span className="font-sora text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                NeuroCare<span className="text-lightSecondary dark:text-darkSecondary">.AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Revolutionizing clinical workflows, diagnostic speed, and personal wellness monitoring through custom AI engines and secure biometrics streaming.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="font-sora text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/doctors" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">AI Diagnostics</Link></li>
              <li><Link to="/doctors" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Telehealth Portal</Link></li>
              <li><Link to="/store" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pharmacy Store</Link></li>
              <li><Link to="/laboratory" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Laboratory Tests</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="font-sora text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* Security Compliance */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sora text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Security & Trust</h4>
            <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed">
              All metrics are encrypted end-to-end. We adhere strictly to HIPAA compliance protocols and GDPR regulatory guidelines.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Fully HIPAA Compliant</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-gray-500 relative z-10">
          <p>&copy; {new Date().getFullYear()} NeuroCare AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-gray-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const isOAuthCallback = window.location.pathname === "/auth/oauth/callback";
  const [appReady, setAppReady] = useState(isOAuthCallback);

  const handleSplashFinish = useCallback(() => {
    window.history.replaceState(null, "", "/");
    setAppReady(true);
  }, []);

  if (!appReady) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#0F172A",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: { primary: "#16A34A", secondary: "#FFFFFF" },
            },
            error: {
              iconTheme: { primary: "#DC2626", secondary: "#FFFFFF" },
            },
          }}
        />
        <Routes>
          {/* Main Website Pages layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/book-appointment" element={<TeammatePlaceholder name="Appointment Booking" />} />
            <Route path="/store" element={<TeammatePlaceholder name="Medicine Store" />} />
            <Route path="/laboratory" element={<TeammatePlaceholder name="Laboratory Portal" />} />
            <Route path="/emergency" element={<TeammatePlaceholder name="Emergency Contacts" />} />
            <Route path="/blog" element={<TeammatePlaceholder name="Health Blog" />} />
            <Route path="/contact" element={<TeammatePlaceholder name="Contact Operations" />} />
          </Route>

          {/* Dashboard (protected) */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Auth Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>

          <Route path="/auth/oauth/callback" element={<OAuthCallback />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;