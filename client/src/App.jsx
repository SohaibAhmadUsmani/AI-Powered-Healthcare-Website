import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { 
  Activity, Menu, X, Shield, Sun, Moon,
  Home as HomeIcon, Users, ShoppingBag, FlaskConical, PhoneCall, BookOpen, Mail
} from 'lucide-react';
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import OAuthCallback from "./pages/auth/OAuthCallback";
import Home from './pages/Home';
import SplashScreen from './components/splash/SplashScreen';
import PageTransition from './components/PageTransition';
import RippleButton from './components/RippleButton';
import ScrollToTop from "./components/common/ScrollToTop";

// Lazy load non-homepage routes for bundle size optimization and faster loading
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const LabTests = lazy(() => import("./pages/LabTests"));
const EmergencyContacts = lazy(() => import("./pages/EmergencyContacts"));
const DoctorsList = lazy(() => import("./pages/doctors/DoctorsList"));
const DoctorDetails = lazy(() => import("./pages/doctors/DoctorDetails"));
const Appointment = lazy(() => import("./pages/appointment"));

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
  const { user, isAuthenticated, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-panel py-4 shadow-premiumLight dark:shadow-lg dark:border-b dark:border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 group-hover:border-lightPrimary/60 dark:group-hover:border-darkPrimary/60 transition-colors">
              <Activity className="w-5 h-5 text-lightPrimary dark:text-darkPrimary animate-pulse" />
            </div>
            <span className="font-sora text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors">
              NeuroCare<span className="text-lightSecondary dark:text-darkSecondary">.AI</span>
            </span>
          </Link>

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

          <div className="hidden xl:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-gray-300 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center gap-2 select-none animate-fade-in shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary flex items-center justify-center font-bold text-[10px] uppercase font-sans">
                    {(user?.fullName || "U").charAt(0)}
                  </div>
                  <span className="text-slate-800 dark:text-white font-bold font-sans">{user?.fullName || "User"}</span>
                </span>
                <RippleButton 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-transparent border border-lightPrimary/40 dark:border-darkPrimary/50 text-lightPrimary dark:text-darkPrimary font-bold text-xs hover:bg-lightPrimary/5 dark:hover:bg-darkPrimary/10 transition-all cursor-pointer"
                >
                  Sign Out
                </RippleButton>
              </div>
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[90] xl:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
            
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

              <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex flex-col gap-3">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3 w-full animate-fade-in">
                    <div className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold tracking-wide text-slate-700 dark:text-gray-300 select-none flex items-center justify-center gap-2 animate-fade-in">
                      <div className="w-5 h-5 rounded-full bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary flex items-center justify-center font-bold text-[10px] uppercase font-sans">
                        {(user?.fullName || "U").charAt(0)}
                      </div>
                      <span className="text-slate-800 dark:text-white font-bold font-sans">{user?.fullName || "User"}</span>
                    </div>
                    <RippleButton 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-transparent border border-lightPrimary/40 dark:border-darkPrimary/50 text-lightPrimary dark:text-darkPrimary font-bold text-xs hover:bg-lightPrimary/5 dark:hover:bg-darkPrimary/10 transition-all cursor-pointer"
                    >
                      Sign Out
                    </RippleButton>
                  </div>
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

      <div className="h-20"></div>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Suspense fallback={
              <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 animate-pulse">
                  <Activity className="w-8 h-8 text-lightPrimary dark:text-darkPrimary animate-spin" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">Loading Portal...</span>
              </div>
            }>
              <Outlet />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <footer className="glass-panel dark:border-t dark:border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-12">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lightPrimary/30 via-indigo-500/30 to-lightSecondary/30 dark:from-darkPrimary/30 dark:via-indigo-500/30 dark:to-darkSecondary/30"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/5 relative z-10">

          {/* Branding column */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 group-hover:border-lightPrimary/60 dark:group-hover:border-darkPrimary/60 transition-colors">
                <Activity className="w-5 h-5 text-lightPrimary dark:text-darkPrimary animate-pulse" />
              </div>
              <span className="font-sora text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors">
                NeuroCare<span className="text-lightSecondary dark:text-darkSecondary">.AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Revolutionizing clinical workflows, diagnostic speed, and personal wellness monitoring through custom AI engines and secure biometrics streaming.
            </p>
          </div>


          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-2 space-y-4">
            <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4 block">Features</span>
            <ul className="space-y-3">
              <li>
                <Link to="/doctors" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  AI Diagnostics
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Telehealth Portal
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Pharmacy Store
                </Link>
              </li>
              <li>
                <Link to="/laboratory" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Laboratory Tests
                </Link>
              </li>
            </ul>
          </div>


          {/* Company Links */}
          <div className="md:col-span-4 lg:col-span-2 space-y-4">
            <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4 block">Company</span>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-lightPrimary dark:hover:text-darkPrimary transition-all duration-300 hover:translate-x-1 block text-sm">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Security Compliance */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4 block">Security & Trust</span>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              All metrics are encrypted end-to-end. We adhere strictly to HIPAA compliance protocols and GDPR regulatory guidelines.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Fully HIPAA Compliant</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-450 dark:text-slate-500 relative z-10">
          <p>&copy; {new Date().getFullYear()} NeuroCare AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors duration-200">Cookie Settings</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-md p-8 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-2xl relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500"></div>
              
              <h3 className="font-sora text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Sign Out
              </h3>
              
              <p className="text-slate-600 dark:text-gray-400 text-sm mb-8">
                Are you sure you want to log out of your session?
              </p>
              
              <div className="flex gap-4 justify-center">
                <RippleButton 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-white/10 transition-all"
                >
                  Cancel
                </RippleButton>
                <RippleButton 
                  onClick={() => {
                    logout();
                    setIsLogoutModalOpen(false);
                    window.location.href = "/";
                  }}
                  className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
                >
                  Yes, Sign Out
                </RippleButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

  return (
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        <AnimatePresence>
          {!appReady && (
            <SplashScreen onFinish={handleSplashFinish} />
          )}
        </AnimatePresence>
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
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
            <Route path="/doctors/:id" element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
            <Route path="/book-appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute><TeammatePlaceholder name="Medicine Store" /></ProtectedRoute>} />
            <Route path="/laboratory" element={<ProtectedRoute><LabTests /></ProtectedRoute>} />
            <Route path="/emergency" element={<EmergencyContacts />} />
            <Route path="/blog" element={<TeammatePlaceholder name="Health Blog" />} />
            <Route path="/contact" element={<TeammatePlaceholder name="Contact Operations" />} />
          </Route>

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