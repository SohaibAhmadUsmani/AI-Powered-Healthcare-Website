import { useEffect, useState, useMemo } from "react";
import SearchBar from "../../components/doctors/SearchBar";
import DoctorCard from "../../components/doctors/DoctorCard";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import RippleButton from "../../components/RippleButton";
import { ChevronDown } from "lucide-react";

const fallbackDoctors = [
  {
    _id: "1",
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialization: "Cardiology",
    rating: 4.9,
    reviews: 124,
    experience: 15,
    hospital: "Mayo Clinic",
    qualification: "MD, Johns Hopkins University",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=400&h=400&q=80"
  },
  {
    _id: "2",
    id: 2,
    name: "Dr. Marcus Chen",
    specialization: "Neurology",
    rating: 4.8,
    reviews: 98,
    experience: 12,
    hospital: "Stanford Hospital",
    qualification: "MD-PhD in Biomedical Informatics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&crop=faces&w=400&h=400&q=80"
  },
  {
    _id: "3",
    id: 3,
    name: "Dr. Elena Rostova",
    specialization: "Pediatrics",
    rating: 5.0,
    reviews: 156,
    experience: 10,
    hospital: "Johns Hopkins Hospital",
    qualification: "MD in Pediatric Neurological Surgery",
    image: "https://images.unsplash.com/photo-1594824813566-88855ce78947?auto=format&fit=crop&crop=faces&w=400&h=400&q=80"
  }
];

function DoctorsList() {
  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [rating, setRating] = useState("");
  const [experience, setExperience] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // fetching doctor data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) {
          params.set("search", debouncedSearch);
        }
        if (specialization) {
          params.set("specialization", specialization);
        }
        if (experience) {
          params.set("experience", experience);
        }
        if (rating) {
          params.set("rating", rating);
        }

        const response = await fetch(`http://localhost:5000/api/doctors?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }
        const result = await response.json();
        setDoctors(result.data || []);
      } catch (err) {
        console.error(err);
        // Fallback to local static doctors list if backend server is unavailable
        const lowerSearch = debouncedSearch.toLowerCase();
        const filtered = fallbackDoctors.filter((doc) => {
          const matchesSearch =
            doc.name.toLowerCase().includes(lowerSearch) ||
            doc.specialization.toLowerCase().includes(lowerSearch);
          const matchesSpecialization =
            !specialization || doc.specialization === specialization;
          const matchesExperience =
            !experience || doc.experience >= Number(experience);
          const matchesRating =
            !rating || doc.rating >= Number(rating);

          return matchesSearch && matchesSpecialization && matchesExperience && matchesRating;
        });
        setDoctors(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [debouncedSearch, specialization, rating, experience]);

  const uniqueSpecialization = useMemo(() => {
    const pool = doctors.length > 0 ? doctors : fallbackDoctors;
    return [...new Set(pool.map((doctor) => doctor.specialization))];
  }, [doctors]);

  const hasActiveFilters =
    searchTerm !== "" || specialization !== "" || experience !== "" || rating !== "";

  return (
    <section className="min-h-screen bg-lightBg dark:bg-darkBg py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-amber-600 dark:text-amber-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block border border-lightPrimary dark:border-darkPrimary text-lightPrimary dark:text-darkPrimary uppercase tracking-[0.2em] text-sm px-6 py-3 rounded-full transition-colors duration-300">
            Find Your Specialist
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mt-8 transition-colors duration-300">
            Our{" "}
            <span className="bg-gradient-to-r from-lightPrimary via-cyan-500 to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary bg-clip-text text-transparent">
              Doctors
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-600 dark:text-gray-400 text-lg leading-8 transition-colors duration-300">
            Search experienced healthcare professionals by name or
            specialization and connect with the right doctor for your
            healthcare journey.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="glass-panel rounded-3xl p-6 mb-14 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300">
          {/* Search */}
          <div className="mb-6">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Specialization */}
            <div className="relative">
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 text-slate-800 dark:text-white pl-4 pr-10 py-3 text-xs sm:text-sm font-sans outline-none focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 transition-all cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">All Specializations</option>
                {uniqueSpecialization.map((spec) => (
                  <option
                    key={spec}
                    value={spec}
                    className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  >
                    {spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>

            {/* Experience */}
            <div className="relative">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 text-slate-800 dark:text-white pl-4 pr-10 py-3 text-xs sm:text-sm font-sans outline-none focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 transition-all cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">All Experience</option>
                <option value="15" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">15+ Years</option>
                <option value="10" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">10+ Years</option>
                <option value="5" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">5+ Years</option>
                <option value="1" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">1+ Years</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>

            {/* Rating */}
            <div className="relative">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 text-slate-800 dark:text-white pl-4 pr-10 py-3 text-xs sm:text-sm font-sans outline-none focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 transition-all cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">All Ratings</option>
                <option value="4.8" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">4.8+</option>
                <option value="4.5" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">4.5+</option>
                <option value="4.3" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">4.3+</option>
                <option value="4.0" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">4.0+</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end mt-5">
              <RippleButton
                onClick={() => {
                  setSearchTerm("");
                  setSpecialization("");
                  setRating("");
                  setExperience("");
                }}
                className="px-6 py-2.5 rounded-xl bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-xs shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all duration-300 cursor-pointer"
              >
                🧹 Clear Filters
              </RippleButton>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-8 px-5 py-4 rounded-2xl glass-panel bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/5 shadow-premiumLight dark:shadow-lg transition-colors duration-300">
          <p className="text-slate-700 dark:text-gray-300 text-base">
            🩺 Showing{" "}
            <span className="font-bold text-lightPrimary dark:text-darkPrimary">
              {doctors.length}
            </span>{" "}
            {doctors.length === 1 ? "Doctor" : "Doctors"}
          </p>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-lightPrimary dark:border-darkPrimary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-300 text-sm font-mono">
              Loading doctors...
            </p>
          </div>
        ) : doctors.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
            >
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id || doctor.id}
                  doctor={doctor}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-2xl mx-auto border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              No Doctors Found
            </h2>

            <p className="text-slate-600 dark:text-gray-400 mt-4 leading-7">
              We couldn't find any doctor matching your search.
              <br />
              Try searching using another name or specialization.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorsList;