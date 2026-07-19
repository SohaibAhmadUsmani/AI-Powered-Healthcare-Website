import React, { useEffect, useState, useRef } from 'react';
import RippleButton from '../components/RippleButton';

const fallbackTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', price: 'Rs. 800' },
  { id: 2, name: 'Blood Sugar (Fasting)', price: 'Rs. 400' },
  { id: 3, name: 'Liver Function Test (LFT)', price: 'Rs. 1500' },
  { id: 4, name: 'Kidney Function Test (KFT)', price: 'Rs. 1400' },
  { id: 5, name: 'Lipid Profile', price: 'Rs. 1200' },
  { id: 6, name: 'Thyroid Profile (T3, T4, TSH)', price: 'Rs. 1800' },
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

const BookingForm = ({ test, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !phone || !date) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    fetch('http://localhost:5000/api/lab/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId: test.id,
        patientName,
        phone,
        date,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking failed');
        return res.json();
      })
      .then(() => {
        setConfirmed(true);
        setSubmitting(false);
      })
      .catch(() => {
        setErrorMsg('Could not book right now. Please try again.');
        setSubmitting(false);
      });
  };

  if (confirmed) {
    return (
      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
        Test booked successfully for {patientName} on {date}.
        <button onClick={onClose} className="block mt-2 text-sky-600 underline text-xs">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t pt-4">
      <input
  type="text"
  placeholder="Patient Name"
  value={patientName}
  onChange={(e) => setPatientName(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
/>
<input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
/>
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
/>

      {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

      <div className="flex gap-2">
        <RippleButton
          type="submit"
          disabled={submitting}
          className="flex-1 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm"
        >
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </RippleButton>
        <RippleButton
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
        >
          Cancel
        </RippleButton>
      </div>
    </form>
  );
};

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/lab')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((t) => ({
          id: t._id,
          name: t.name,
          price: 'Rs. ' + t.price,
        }));
        setTests(formatted);
        setLoading(false);
      })
      .catch(() => {
        setTests(fallbackTests);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-sky-600 mb-2">Lab Tests</h2>
      <p className="text-gray-600 mb-8">Browse available lab tests and book the ones you need.</p>

      {error && (
        <p className="text-amber-600 text-sm mb-4">Couldn't reach the live server — showing sample data instead.</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading tests...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <RevealCard key={test.id}>
              <div className="bg-white rounded-xl shadow-md p-6 hover-card-zoom">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.name}</h3>
                <p className="text-sky-600 font-bold mb-4">{test.price}</p>

                {activeBookingId === test.id ? (
                  <BookingForm test={test} onClose={() => setActiveBookingId(null)} />
                ) : (
                  <RippleButton
                    onClick={() => {
                      setActiveBookingId(test.id);
                    }}
                    className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Book Test
                  </RippleButton>
                )}
              </div>
            </RevealCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default LabTests;