import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Star, ChevronRight, Check, Plus, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import RippleButton from "../../components/RippleButton";
import aspirinPlusImage from "../../assets/pngs/aspirinPlus.png";
import calmzzImage from "../../assets/pngs/calmzz.png";
import syrupImage from "../../assets/pngs/coldCareSyrup.png";
import oralGuardImage from "../../assets/pngs/oralGuard.png";
import supplementsImage from "../../assets/pngs/supplements.png";
import toast from "react-hot-toast";

const medicines = [
  {
    id: "aspirin-plus",
    name: "Aspirin Plus",
    category: "Pain Relief",
    price: 12.99,
    dosage: "500mg • 20 tablets",
    image: aspirinPlusImage,
    description:
      "Fast-acting pain relief for headaches, muscle aches, and minor discomfort. Trusted formula with gentle stomach protection.",
    reviews: [
      { author: "Maria K.", comment: "Works quickly and doesn't upset my stomach.", rating: 5 },
      { author: "Noah S.", comment: "Perfect for daily use after workouts.", rating: 4 },
    ],
  },
  {
    id: "daily-vitamin-d",
    name: "Daily Vitamin D",
    category: "Vitamins",
    price: 18.99,
    dosage: "1000 IU • 30 softgels",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    description:
      "Support bone strength, immune health, and energy levels with a daily dose of Vitamin D in gentle softgels.",
    reviews: [
      { author: "Lena P.", comment: "My energy feels more stable throughout the day.", rating: 5 },
      { author: "Omar N.", comment: "Great vitamin and easy to swallow.", rating: 4 },
    ],
  },
  {
    id: "coldcare-syrup",
    name: "ColdCare Syrup",
    category: "Cold & Flu",
    price: 14.5,
    dosage: "10ml • 100ml bottle",
    image: syrupImage,
    description:
      "Soothing syrup for coughs, congestion, and sore throat. Gentle, non-drowsy support with natural mint extract.",
    reviews: [
      { author: "Priya R.", comment: "Stopped my cough by morning.", rating: 5 },
      { author: "Elias M.", comment: "Nice mint flavor and easy on the throat.", rating: 5 },
    ],
  },
  {
    id: "probiotic-balance",
    name: "Probiotic Balance",
    category: "Supplements",
    price: 24.99,
    dosage: "60 capsules",
    image: supplementsImage,
    description:
      "A premium probiotic complex designed to support digestion and maintain a healthy microbiome all month long.",
    reviews: [
      { author: "Simone T.", comment: "My digestion feels much better after two weeks.", rating: 5 },
      { author: "Daniel W.", comment: "No bloating and easy to manage with meals.", rating: 4 },
    ],
  },
  {
    id: "oralguard-gel",
    name: "OralGuard Gel",
    category: "Dental",
    price: 9.99,
    dosage: "10g tube",
    image: oralGuardImage,
    description:
      "Cooling dental gel for sensitive gums, mouth sores, and aftercare. Provides soothing relief with a mild antibacterial formula.",
    reviews: [
      { author: "Aisha L.", comment: "Relief was instant after application.", rating: 5 },
      { author: "Jason H.", comment: "A must-have for my dental kit.", rating: 4 },
    ],
  },
  {
    id: "calmzzz-night",
    name: "CalmZzz Night",
    category: "Supplements",
    price: 29.99,
    dosage: "10mg • 30 capsules",
    image: calmzzImage,
    description:
      "Gentle sleep support with melatonin and herbal extracts to help you relax and wake up refreshed.",
    reviews: [
      { author: "Emilia D.", comment: "I sleep deeper and don't feel groggy.", rating: 5 },
      { author: "Chris V.", comment: "Nice calming effect without drowsiness during the day.", rating: 4 },
    ],
  },
];

const categories = ["All", "Pain Relief", "Vitamins", "Cold & Flu", "Supplements", "Dental"];
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

const StorePage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceCap, setPriceCap] = useState(50);
  const [sortBy, setSortBy] = useState("recommended");
  const [addedMap, setAddedMap] = useState({});
  const { addItem, items } = useCart();
  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const [selectedMedicine, setSelectedMedicine] = useState(medicines[0]);

  const filteredMedicines = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return medicines
      .filter((medicine) => {
        const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
        const matchesPrice = medicine.price <= priceCap;
        const matchesSearch =
          medicine.name.toLowerCase().includes(normalizedQuery) ||
          medicine.category.toLowerCase().includes(normalizedQuery) ||
          medicine.description.toLowerCase().includes(normalizedQuery);

        return matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [query, selectedCategory, priceCap, sortBy]);

  useEffect(() => {
    if (!filteredMedicines.some((medicine) => medicine.id === selectedMedicine?.id)) {
      setSelectedMedicine(filteredMedicines[0] || null);
    }
  }, [filteredMedicines, selectedMedicine]);

  const handleAddToCart = (medicine, e) => {
    if (e) e.stopPropagation();
    addItem({
      id: medicine.id,
      name: medicine.name,
      category: medicine.category,
      price: medicine.price,
      image: medicine.image,
      quantity: 1
    });
    setSelectedMedicine(medicine);

    // Provide visual feedback state on button
    setAddedMap(prev => ({ ...prev, [medicine.id]: true }));
    toast.success(`${medicine.name} added to cart!`, { id: `cart-${medicine.id}` });
    
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [medicine.id]: false }));
    }, 1600);
  };

  const formatPrice = (value) => `$${value.toFixed(2)}`;
  const selectedReviews = selectedMedicine?.reviews || [];

  return (
    <main className="min-h-screen bg-lightBg dark:bg-darkBg text-slate-850 dark:text-slate-100 bg-grid-pattern py-20 sm:py-24 px-4 sm:px-8 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Hero Section & Filters */}
        <section className="glass-panel border border-slate-200/60 dark:border-white/5 shadow-premiumLight dark:shadow-2xl rounded-[32px] p-6 sm:p-8 lg:p-10 transition-all duration-300">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Pharmacy{" "}
                <span className="bg-gradient-to-r from-lightPrimary via-cyan-500 to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary bg-clip-text text-transparent">
                  Medicine Store
                </span>
              </motion.h1>
              <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Find prescribed medications, compare prices, and order online with fast delivery. Browse categories, adjust budget caps, and view comprehensive drug descriptions.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-darkBg/80 px-5 py-3.5 shadow-sm dark:shadow-glowPrimary">
              <div className="p-2 rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Cart Items</p>
                <p className="font-sora text-2xl font-bold text-slate-900 dark:text-white leading-none">{cartCount}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Search Medicines</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by medicine, category, or symptom..."
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 py-3.5 pl-11 pr-4 text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20"
                />
              </div>
            </div>

            {/* Filter Sliders & Dropdown */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Max Budget</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-sora text-base font-bold text-lightPrimary dark:text-darkPrimary">{formatPrice(priceCap)}</span>
                  <span className="text-xs text-slate-400">Cap limit</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={priceCap}
                  onChange={(e) => setPriceCap(Number(e.target.value))}
                  className="mt-3 w-full accent-lightPrimary dark:accent-darkPrimary cursor-pointer"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 p-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sort By</label>
                <div className="relative mt-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 py-2.5 pl-3.5 pr-10 text-xs font-semibold text-slate-800 dark:text-white outline-none transition focus:border-lightPrimary dark:focus:border-darkPrimary cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Categories</p>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const isActive = category === selectedCategory;
                return (
                  <RippleButton
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg shadow-glowLightPrimary dark:shadow-glowPrimary font-bold"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-lightPrimary/40 dark:hover:border-darkPrimary/40 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {category}
                  </RippleButton>
                );
              })}
            </div>
          </div>
        </section>

        {/* Medicines Grid & Detail Sidebar */}
        <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          
          {/* Available Medicines List */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Inventory Catalog</p>
                <h2 className="font-sora text-2xl font-bold text-slate-900 dark:text-white">{filteredMedicines.length} Medicines Available</h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Showing items up to {formatPrice(priceCap)}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {filteredMedicines.map((medicine) => {
                const isActive = selectedMedicine?.id === medicine.id;
                const isAdded = !!addedMap[medicine.id];

                return (
                  <motion.article
                    key={medicine.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedMedicine(medicine)}
                    className={`group relative rounded-3xl border p-5 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "glass-panel border-lightPrimary/60 dark:border-darkPrimary/60 bg-lightPrimary/5 dark:bg-darkPrimary/10 shadow-premiumLight dark:shadow-glowPrimary"
                        : "glass-panel bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-white/5 hover:border-lightPrimary/30 dark:hover:border-darkPrimary/30 shadow-sm hover:shadow-md hover:-translate-y-1"
                    }`}
                  >
                    <div className="flex flex-col justify-between h-full gap-4">
                      
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 text-lightPrimary dark:text-darkPrimary font-bold text-xs font-sora">
                              {medicine.category.charAt(0)}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{medicine.category}</p>
                              <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white group-hover:text-lightPrimary dark:group-hover:text-darkPrimary transition-colors">
                                {medicine.name}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                            {medicine.description}
                          </p>
                        </div>

                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="h-20 w-20 rounded-2xl object-cover border border-slate-200/80 dark:border-white/10 shrink-0"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/5">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-slate-400">{medicine.dosage}</p>
                          <p className="font-sora text-lg font-bold text-slate-900 dark:text-white">{formatPrice(medicine.price)}</p>
                        </div>

                        <RippleButton
                          onClick={(e) => handleAddToCart(medicine, e)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm ${
                            isAdded
                              ? "bg-emerald-500 text-white animate-bounce-short shadow-emerald-500/20"
                              : "bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg shadow-glowLightPrimary dark:shadow-glowPrimary hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ✓</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </RippleButton>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* Selected Medicine Details Sidebar */}
          {selectedMedicine ? (
            <aside className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-premiumLight dark:shadow-2xl space-y-6 self-start sticky top-28">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-white/5">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Selected Medicine</p>
                  <h2 className="font-sora text-2xl font-bold text-slate-900 dark:text-white">{selectedMedicine.name}</h2>
                </div>
                <span className="rounded-xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/20 dark:border-darkPrimary/20 px-3 py-1.5 text-xs font-semibold text-lightPrimary dark:text-darkPrimary">
                  {selectedMedicine.category}
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 max-h-60 bg-slate-100 dark:bg-slate-950">
                <img src={selectedMedicine.image} alt={selectedMedicine.name} className="h-56 w-full object-cover" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dosage Spec</p>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white mt-1">{selectedMedicine.dosage}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Unit Price</p>
                  <p className="font-sora text-2xl font-bold text-lightPrimary dark:text-darkPrimary mt-1">{formatPrice(selectedMedicine.price)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < Math.round(selectedReviews.reduce((acc, review) => acc + review.rating, 0) / (selectedReviews.length || 1)) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">({selectedReviews.length} Verified Reviews)</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{selectedMedicine.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-4">
                <RippleButton
                  onClick={(e) => handleAddToCart(selectedMedicine, e)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    addedMap[selectedMedicine.id]
                      ? "bg-emerald-500 text-white animate-bounce-short"
                      : "bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95"
                  }`}
                >
                  {addedMap[selectedMedicine.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Cart ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add {selectedMedicine.name} to Cart</span>
                    </>
                  )}
                </RippleButton>

                {/* Customer Reviews Accordion */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Customer Feedback</span>
                    <span className="text-[10px] text-slate-400">{selectedReviews.length} reviews</span>
                  </div>
                  
                  <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                    {selectedReviews.map((review, i) => (
                      <div key={i} className="rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-slate-900 p-3 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">{review.author}</span>
                          <span className="text-amber-500 font-bold">★ {review.rating}.0</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          ) : (
            <aside className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 p-8 shadow-premiumLight text-slate-500 text-sm text-center">
              No medicines match your search filter. Try clearing your category selection.
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default StorePage;
