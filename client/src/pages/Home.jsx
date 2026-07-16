import React from 'react';
import Navbar from '../components/home/Navbar';
import Hero from './HomeSections/Hero';
import Services from './HomeSections/Services';
import FeaturedDoctors from './HomeSections/FeaturedDoctors';
import Testimonials from './HomeSections/Testimonials';
import HealthStats from './HomeSections/HealthStats';
import CTA from './HomeSections/CTA';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="space-y-12">
        <Hero />
        <Services />
        <FeaturedDoctors />
        <HealthStats />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
};

export default Home;
