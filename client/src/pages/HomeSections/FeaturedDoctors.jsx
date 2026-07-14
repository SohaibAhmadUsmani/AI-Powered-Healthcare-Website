import React from 'react';

const FeaturedDoctors = () => {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto bg-gray-50 rounded-2xl">
      <h3 className="text-2xl font-bold text-center mb-8">Featured Doctors Placeholder</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">Doctor 1</div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">Doctor 2</div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">Doctor 3</div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">Doctor 4</div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
