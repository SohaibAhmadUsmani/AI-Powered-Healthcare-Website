import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ShieldAlert, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import RippleButton from '../../components/RippleButton';
import { useCart } from '../../context/CartContext';

import aspirinPlusImage from "../../assets/pngs/aspirinPlus.png";
import calmzzImage from "../../assets/pngs/calmzz.png";
import syrupImage from "../../assets/pngs/coldCareSyrup.png";
import oralGuardImage from "../../assets/pngs/oralGuard.png";
import supplementsImage from "../../assets/pngs/supplements.png";

const medicines = [
  {
    id: "aspirin-plus",
    name: "Aspirin Plus",
    category: "Pain Relief",
    price: 12.99,
    dosage: "500mg • 20 tablets",
    image: aspirinPlusImage,
    rating: 4.8,
    reviews: 124,
    description: "Fast-acting pain relief for headaches, muscle aches, and minor discomfort with gentle stomach protection."
  },
  {
    id: "daily-vitamin-d",
    name: "Daily Vitamin D",
    category: "Vitamins",
    price: 18.99,
    dosage: "1000 IU • 30 softgels",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 98,
    description: "Support bone strength, immune health, and energy levels with a daily dose of Vitamin D in gentle softgels."
  },
  {
    id: "coldcare-syrup",
    name: "ColdCare Syrup",
    category: "Cold & Flu",
    price: 14.5,
    dosage: "10ml • 100ml bottle",
    image: syrupImage,
    rating: 4.9,
    reviews: 156,
    description: "Soothing syrup for coughs, congestion, and sore throat. Gentle, non-drowsy support with natural mint extract."
  },
  {
    id: "probiotic-balance",
    name: "Probiotic Balance",
    category: "Supplements",
    price: 24.99,
    dosage: "60 capsules",
    image: supplementsImage,
    rating: 4.7,
    reviews: 82,
    description: "A premium probiotic complex designed to support digestion and maintain a healthy microbiome all month long."
  },
  {
    id: "oralguard-gel",
    name: "OralGuard Gel",
    category: "Dental",
    price: 9.99,
    dosage: "10g tube",
    image: oralGuardImage,
    rating: 4.5,
    reviews: 64,
    description: "Cooling dental gel for sensitive gums, mouth sores, and aftercare. Provides soothing relief with antibacterial formula."
  },
  {
    id: "calmzzz-night",
    name: "CalmZzz Night",
    category: "Supplements",
    price: 29.99,
    dosage: "10mg • 30 capsules",
    image: calmzzImage,
    rating: 4.8,
    reviews: 110,
    description: "Gentle sleep support with melatonin and herbal extracts to help you relax and wake up refreshed."
  }
];

const categories = ["All", "Pain Relief", "Vitamins", "Supplements", "Cold & Flu", "Dental"];

const PharmacyPreview = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filteredMedicines = useMemo(() => {
    if (activeCategory === "All") {
      return medicines.slice(0, 3); // Show top 3 in all
    }
    return medicines.filter(m => m.category === activeCategory).slice(0, 3);
  }, [activeCategory]);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="pharmacy-preview">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-lightPrimary/5 dark:bg-darkPrimary/5 blur-[100px] sm:blur-[120px] pointer-events-none transition-colors"></div>

      <ScrollReveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-darkAccent border border-lightPrimary/20 dark:border-darkPrimary/30 text-xs font-mono font-semibold text-lightPrimary dark:text-darkPrimary mb-4 uppercase tracking-wider">
            💊 AI-Powered Smart Pharmacy
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Smart Medical <span className="text-lightPrimary dark:bg-gradient-to-r dark:from-darkPrimary dark:to-darkSecondary dark:bg-clip-text dark:text-transparent">Store</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4 text-base sm:text-lg">
            Consult, check interactions, and buy clinically verified medication. Secure checkout and ultra-fast home delivery.
          </p>
        </div>
      </ScrollReveal>

      {/* Categories Tabs Selector */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer border ${
                activeCategory === category
                  ? "bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg border-lightPrimary dark:border-darkPrimary shadow-glowLightPrimary dark:shadow-glowPrimary"
                  : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-lightPrimary/50 dark:hover:border-darkPrimary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Grid displaying medicines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="wait">
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative glass-panel rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 hover:border-lightPrimary/30 dark:hover:border-darkPrimary/30 shadow-premiumLight hover:shadow-premiumLightHover dark:shadow-none dark:hover:shadow-glowPrimary/10 flex flex-col justify-between overflow-hidden h-full"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-slate-50 dark:bg-darkAccent/50 border border-slate-200/50 dark:border-white/5 flex items-center justify-center p-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-darkBg/80 backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-[10px] font-bold text-slate-800 dark:text-darkPrimary">
                    <Star className="w-3 h-3 fill-lightPrimary text-lightPrimary dark:fill-darkPrimary dark:text-darkPrimary" />
                    <span>{medicine.rating}</span>
                    <span className="text-slate-400 dark:text-gray-400 font-normal">({medicine.reviews})</span>
                  </div>

                  {/* Dosage Badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 dark:bg-darkBg/80 backdrop-blur-md border border-slate-200/10 dark:border-white/10 text-[10px] font-mono font-semibold text-white">
                    <span>{medicine.dosage}</span>
                  </div>
                </div>

                {/* Product details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sora text-lg font-bold text-slate-800 dark:text-white group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors duration-300">
                      {medicine.name}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-lightSecondary/10 border border-lightSecondary/20 text-lightSecondary dark:text-darkSecondary">
                      {medicine.category}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {medicine.description}
                  </p>
                </div>
              </div>

              {/* Bottom strip: Price and CTA */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-gray-500 block">
                    Price
                  </span>
                  <span className="font-sora text-xl font-bold text-slate-800 dark:text-white">
                    ${medicine.price.toFixed(2)}
                  </span>
                </div>

                <RippleButton 
                  onClick={() => {
                    addItem({
                      id: medicine.id,
                      name: medicine.name,
                      category: medicine.category,
                      price: medicine.price,
                      image: medicine.image,
                      quantity: 1
                    });
                    navigate('/cart');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-semibold text-xs hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all duration-300 shadow-glowLightPrimary dark:shadow-glowPrimary flex items-center gap-2"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Buy Now
                </RippleButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-12 text-center flex flex-col items-center gap-3">
          <Link to="/store">
            <RippleButton className="px-8 py-3.5 rounded-xl bg-transparent border border-lightPrimary/40 dark:border-darkPrimary/40 text-lightPrimary dark:text-darkPrimary font-bold hover:bg-lightPrimary/5 dark:hover:bg-darkPrimary/10 hover:shadow-glowLightPrimary dark:hover:shadow-glowPrimary transition-all duration-300 flex items-center gap-2">
              Explore Pharmacy Store
              <ArrowRight className="w-4 h-4" />
            </RippleButton>
          </Link>
          
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500">
            <ShieldAlert className="w-3.5 h-3.5 text-lightPrimary dark:text-darkPrimary" />
            <span>Note: A secure account is required for placing orders.</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PharmacyPreview;
