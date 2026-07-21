import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
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
  const { addItem, items } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceCap, setPriceCap] = useState(50);
  const [sortBy, setSortBy] = useState("recommended");
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

  const handleAddToCart = (medicine) => {
    addItem(medicine);
    setSelectedMedicine(medicine);
  };

  const formatPrice = (value) => `$${value.toFixed(2)}`;
  const selectedReviews = selectedMedicine?.reviews || [];

  return (
    <main className="min-h-screen bg-darkBg text-slate-100 bg-grid-pattern py-28 sm:py-32 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="glass-panel bg-slate-950/80 border border-slate-800/70 shadow-premiumLight rounded-[32px] p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
              >
                Medicine Store
              </motion.h1>
              <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-7">
                Find the right treatment, compare prices, and keep your cart ready. Browse categories, adjust your budget, and view medicine details in one smooth experience.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 shadow-glowPrimary">
              <ShoppingCart className="w-5 h-5 text-lightPrimary" />
              <div>
                <p className="text-sm uppercase text-slate-500 tracking-[0.2em]">Cart items</p>
                <p className="text-2xl font-semibold text-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">Search medicines</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by medicine, category, or symptom"
                  className="w-full rounded-3xl border border-slate-700/80 bg-slate-950/90 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-lightPrimary/70 focus:ring-2 focus:ring-lightPrimary/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Max price</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-white">{formatPrice(priceCap)}</span>
                  <span className="text-sm text-slate-500">Up to</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={priceCap}
                  onChange={(e) => setPriceCap(Number(e.target.value))}
                  className="mt-4 w-full accent-lightPrimary"
                />
              </div>

              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5">
                <label className="text-sm text-slate-400">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700/80 bg-slate-950/90 py-3 px-4 text-sm text-white outline-none transition focus:border-lightPrimary/70 focus:ring-2 focus:ring-lightPrimary/20"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-slate-400">Categories</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = category === selectedCategory;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-lightPrimary text-slate-950 shadow-glowLightPrimary" : "bg-slate-950/80 text-slate-300 border border-slate-700/80 hover:border-lightPrimary/50 hover:text-white"}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.45fr_1fr]">
          <section className="grid gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Available medicines</p>
                <h2 className="text-2xl font-semibold text-white">{filteredMedicines.length} options</h2>
              </div>
              <p className="text-sm text-slate-400">Showing medicines under {formatPrice(priceCap)} and matching search terms.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredMedicines.map((medicine) => {
                const isActive = selectedMedicine?.id === medicine.id;
                return (
                  <motion.article
                    key={medicine.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`group rounded-[28px] border p-5 shadow-premiumLight transition ${isActive ? "border-lightPrimary/50 bg-slate-950/90 shadow-glowPrimary" : "border-slate-800/80 bg-slate-950/70 hover:border-lightPrimary/30 hover:bg-slate-950/90"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lightPrimary/10 text-lightPrimary">{medicine.category.charAt(0)}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-300">{medicine.category}</p>
                            <p className="text-lg font-bold text-white">{medicine.name}</p>
                          </div>
                        </div>

                        <p className="text-sm leading-6 text-slate-400 line-clamp-2">{medicine.description}</p>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">{medicine.dosage}</span>
                          <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">{formatPrice(medicine.price)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="h-24 w-24 rounded-3xl object-cover border border-slate-700/80"
                        />
                        <button
                          onClick={() => handleAddToCart(medicine)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-lightPrimary px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-lightPrimary/95"
                        >
                          Add to Cart
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {selectedMedicine ? (
            <aside className="glass-panel rounded-[32px] border border-slate-800/70 bg-slate-950/85 p-6 shadow-premiumLight">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Medicine details</p>
                  <h2 className="text-3xl font-semibold text-white">{selectedMedicine.name}</h2>
                </div>
                <span className="rounded-3xl bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-200">{selectedMedicine.category}</span>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-slate-800/80">
                <img src={selectedMedicine.image} alt={selectedMedicine.name} className="h-72 w-full object-cover" />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3 rounded-3xl bg-slate-950/80 p-5 border border-slate-800/80">
                  <p className="text-sm text-slate-400">Dosage</p>
                  <p className="text-lg font-semibold text-white">{selectedMedicine.dosage}</p>
                </div>
                <div className="space-y-3 rounded-3xl bg-slate-950/80 p-5 border border-slate-800/80">
                  <p className="text-sm text-slate-400">Price</p>
                  <p className="text-3xl font-semibold text-lightPrimary">{formatPrice(selectedMedicine.price)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${index < Math.round(selectedReviews.reduce((acc, review) => acc + review.rating, 0) / selectedReviews.length) ? "text-lightPrimary" : "text-slate-700"}`}
                    />
                  ))}
                  <p className="text-sm text-slate-400">{selectedReviews.length} reviews</p>
                </div>
                <p className="text-slate-300 leading-7">{selectedMedicine.description}</p>
              </div>

              <div className="mt-8 grid gap-4">
                <button
                  onClick={() => handleAddToCart(selectedMedicine)}
                  className="rounded-full bg-lightPrimary px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-lightPrimary/95"
                >
                  Add to Cart
                </button>

                <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-5">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Customer reviews</p>
                    <span className="text-sm text-slate-400">{selectedReviews.length} feedback</span>
                  </div>
                  <div className="space-y-4">
                    {selectedReviews.map((review) => (
                      <div key={review.author} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-white">{review.author}</p>
                          <div className="inline-flex items-center gap-1 text-sm text-lightPrimary">
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star key={index} className={`w-4 h-4 ${index < review.rating ? "text-lightPrimary" : "text-slate-700"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          ) : (
            <aside className="glass-panel rounded-[32px] border border-slate-800/70 bg-slate-950/85 p-8 shadow-premiumLight text-slate-400">
              No medicines match your search. Adjust your filters to browse more options.
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default StorePage;
