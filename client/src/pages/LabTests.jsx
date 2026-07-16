import React, { useEffect, useState } from 'react';

const fallbackTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', price: 'Rs. 800' },
  { id: 2, name: 'Blood Sugar (Fasting)', price: 'Rs. 400' },
  { id: 3, name: 'Liver Function Test (LFT)', price: 'Rs. 1500' },
  { id: 4, name: 'Kidney Function Test (KFT)', price: 'Rs. 1400' },
  { id: 5, name: 'Lipid Profile', price: 'Rs. 1200' },
  { id: 6, name: 'Thyroid Profile (T3, T4, TSH)', price: 'Rs. 1800' },
];

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      <p className="text-gray-600 mb-8">
        Browse available lab tests and book the ones you need.
      </p>

      {error && (
        <p className="text-amber-600 text-sm mb-4">
          Couldn't reach the live server — showing sample data instead.
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading tests...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {test.name}
              </h3>
              <p className="text-sky-600 font-bold mb-4">{test.price}</p>
              <button className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors">
                Book Test
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LabTests;