import React from 'react';

const HealthStats = () => {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto text-center">
      <h3 className="text-2xl font-bold mb-8">Health Statistics Placeholder</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl font-extrabold text-sky-600">0</div>
          <div className="text-gray-500">Stat 1</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl font-extrabold text-sky-600">0</div>
          <div className="text-gray-500">Stat 2</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl font-extrabold text-sky-600">0</div>
          <div className="text-gray-500">Stat 3</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl font-extrabold text-sky-600">0</div>
          <div className="text-gray-500">Stat 4</div>
        </div>
      </div>
    </section>
  );
};

export default HealthStats;
