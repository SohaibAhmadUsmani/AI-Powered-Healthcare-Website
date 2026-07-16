import React from 'react';
import Hero from './HomeSections/Hero';
import Services from './HomeSections/Services';
import FeaturedDoctors from './HomeSections/FeaturedDoctors';
import Testimonials from './HomeSections/Testimonials';
import HealthStats from './HomeSections/HealthStats';
import CTA from './HomeSections/CTA';

const Home = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <Services />
      <FeaturedDoctors />
      <HealthStats />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
