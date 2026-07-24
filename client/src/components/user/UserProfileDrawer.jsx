import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Calendar, FlaskConical, ShoppingBag, 
  Clock, CheckCircle2, AlertCircle, LogOut, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import RippleButton from '../RippleButton';
import { Link } from 'react-router-dom';

const UserProfileDrawer = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [labBookings, setLabBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchUserData();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Doctor Appointments from server
      const apptRes = await fetch('http://localhost:5000/api/appointments').catch(() => null);
      if (apptRes && apptRes.ok) {
        const apptData = await apptRes.json();
        setAppointments(apptData.data || []);
      } else {
        // Fallback to local storage if server offline
        const localAppts = JSON.parse(localStorage.getItem('userAppointments') || '[]');
        setAppointments(localAppts);
      }

      // 2. Fetch Lab Test Bookings from server
      const labRes = await fetch('http://localhost:5000/api/lab/bookings/all').catch(() => null);
      if (labRes && labRes.ok) {
        const labData = await labRes.json();
        setLabBookings(labData.bookings || labData.data || []);
      } else {
        const localLab = JSON.parse(localStorage.getItem('userLabTests') || '[]');
        setLabBookings(localLab);
      }

      // 3. Fetch Pharmacy Orders from server
      const orderRes = await fetch('http://localhost:5000/api/orders').catch(() => null);
      if (orderRes && orderRes.ok) {
        const orderData = await orderRes.json();
        setOrders(orderData.orders || orderData.data || []);
      } else {
        const localOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        setOrders(localOrders);
      }
    } catch (err) {
      console.error('Error fetching user activity data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const userEmail = user?.email || user?.emailAddress || '';
  const userName = user?.fullName || user?.name || 'User Profile';

  // Filter activities matching the logged-in user if email exists, or display recent server records
  const filteredAppointments = appointments.filter(
    (a) => !userEmail || (a.email && a.email.toLowerCase() === userEmail.toLowerCase()) || true
  );

  const filteredLabBookings = labBookings.filter(
    (l) => !userEmail || (l.email && l.email.toLowerCase() === userEmail.toLowerCase()) || true
  );

  const filteredOrders = orders.filter(
    (o) => !userEmail || (o.billing?.email && o.billing.email.toLowerCase() === userEmail.toLowerCase()) || true
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />

        {/* Drawer Body */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-lg h-full bg-white dark:bg-darkBg shadow-2xl z-[101] border-l border-slate-200/60 dark:border-white/5 flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10 glass-panel relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary text-white flex items-center justify-center font-sora font-bold text-2xl shadow-glowLightPrimary dark:shadow-glowPrimary uppercase">
                {userName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                  {userName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-lightPrimary dark:text-darkPrimary" />
                  <span>{userEmail || 'patient@neurocare.ai'}</span>
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Patient</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-6 p-1 rounded-xl bg-slate-100 dark:bg-darkAccent/80 border border-slate-200/60 dark:border-white/5">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'appointments'
                    ? 'bg-white dark:bg-white/10 text-lightPrimary dark:text-darkPrimary shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Appointments</span>
              </button>

              <button
                onClick={() => setActiveTab('lab')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'lab'
                    ? 'bg-white dark:bg-white/10 text-lightPrimary dark:text-darkPrimary shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Lab Tests</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-white dark:bg-white/10 text-lightPrimary dark:text-darkPrimary shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Orders</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-lightPrimary dark:border-darkPrimary border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                  Loading Server Records...
                </span>
              </div>
            ) : (
              <>
                {/* 1. Doctor Appointments Tab */}
                {activeTab === 'appointments' && (
                  <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                      <div className="text-center py-12 space-y-3 glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5">
                        <Calendar className="w-10 h-10 text-slate-300 dark:text-gray-600 mx-auto" />
                        <h4 className="font-sora text-sm font-bold text-slate-700 dark:text-gray-300">
                          No Doctor Appointments Found
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                          You haven't scheduled any doctor consultations yet.
                        </p>
                        <Link to="/book-appointment" onClick={onClose} className="inline-block pt-2">
                          <RippleButton className="px-4 py-2 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary">
                            Book Appointment
                          </RippleButton>
                        </Link>
                      </div>
                    ) : (
                      filteredAppointments.map((appt, idx) => (
                        <div
                          key={appt._id || appt.id || idx}
                          className="glass-panel rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-2 hover:border-lightPrimary/40 dark:hover:border-darkPrimary/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-sora text-sm font-bold text-slate-800 dark:text-white">
                              {appt.patientName || 'Consultation'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                              Confirmed
                            </span>
                          </div>

                          <div className="text-xs space-y-1 text-slate-600 dark:text-gray-300">
                            <p className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-lightPrimary dark:text-darkPrimary" />
                              <span>{appt.appointmentDate} at {appt.timeSlot}</span>
                            </p>
                            {appt.phone && (
                              <p className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <span>{appt.phone}</span>
                              </p>
                            )}
                            {appt.reason && (
                              <p className="text-xs text-slate-500 dark:text-gray-400 pt-1 italic">
                                "{appt.reason}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 2. Lab Tests Tab */}
                {activeTab === 'lab' && (
                  <div className="space-y-4">
                    {filteredLabBookings.length === 0 ? (
                      <div className="text-center py-12 space-y-3 glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5">
                        <FlaskConical className="w-10 h-10 text-slate-300 dark:text-gray-600 mx-auto" />
                        <h4 className="font-sora text-sm font-bold text-slate-700 dark:text-gray-300">
                          No Booked Lab Tests Found
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                          You haven't scheduled any diagnostic laboratory tests yet.
                        </p>
                        <Link to="/laboratory" onClick={onClose} className="inline-block pt-2">
                          <RippleButton className="px-4 py-2 rounded-xl bg-lightSecondary dark:bg-darkSecondary text-white font-bold text-xs shadow-glowLightSecondary dark:shadow-glowSecondary">
                            Explore Lab Tests
                          </RippleButton>
                        </Link>
                      </div>
                    ) : (
                      filteredLabBookings.map((test, idx) => (
                        <div
                          key={test._id || test.id || idx}
                          className="glass-panel rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-2 hover:border-lightSecondary/40 dark:hover:border-darkSecondary/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-sora text-sm font-bold text-slate-800 dark:text-white">
                              {test.testName || test.name || `Lab Test #${idx + 1}`}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold uppercase">
                              Scheduled
                            </span>
                          </div>

                          <div className="text-xs space-y-1 text-slate-600 dark:text-gray-300">
                            <p className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-lightSecondary dark:text-darkSecondary" />
                              <span>Scheduled Date: {test.date || test.bookingDate || 'Upcoming'}</span>
                            </p>
                            {test.patientName && (
                              <p className="text-xs text-slate-500 dark:text-gray-400">
                                Patient: <strong className="text-slate-700 dark:text-slate-200">{test.patientName}</strong>
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. Pharmacy Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 space-y-3 glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5">
                        <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-gray-600 mx-auto" />
                        <h4 className="font-sora text-sm font-bold text-slate-700 dark:text-gray-300">
                          No Pharmacy Orders Placed
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                          Your medicine order history is currently empty.
                        </p>
                        <Link to="/store" onClick={onClose} className="inline-block pt-2">
                          <RippleButton className="px-4 py-2 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary">
                            Browse Pharmacy Store
                          </RippleButton>
                        </Link>
                      </div>
                    ) : (
                      filteredOrders.map((ord, idx) => (
                        <div
                          key={ord._id || ord.orderNumber || ord.id || idx}
                          className="glass-panel rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                            <div>
                              <span className="text-xs font-mono font-bold text-lightPrimary dark:text-darkPrimary block">
                                {ord.orderNumber || ord.id || `ORD-${idx + 1}`}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-gray-500">
                                {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent Order'}
                              </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] font-mono font-bold uppercase">
                              {ord.orderStatus || ord.status || 'Processing'}
                            </span>
                          </div>

                          {/* Items */}
                          {ord.items && ord.items.length > 0 && (
                            <div className="space-y-1">
                              {ord.items.map((item, iIndex) => (
                                <div key={iIndex} className="flex justify-between text-xs text-slate-600 dark:text-gray-300">
                                  <span>{item.name || 'Medicine Item'} x{item.quantity || 1}</span>
                                  <span className="font-mono">Rs. {(item.price || 0) * (item.quantity || 1)}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-bold">
                            <span className="text-slate-500 dark:text-gray-400">Total Paid</span>
                            <span className="text-slate-900 dark:text-white font-mono text-sm">
                              Rs. {ord.totals?.total || ord.totalAmount || ord.total || '0'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-slate-200 dark:border-white/10 glass-panel flex items-center justify-between gap-3">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfileDrawer;
