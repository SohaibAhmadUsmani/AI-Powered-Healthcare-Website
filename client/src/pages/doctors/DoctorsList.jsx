import { useState } from "react";
import SearchBar from "../../components/doctors/SearchBar";
import doctors from "../../assets/data/doctors";
import DoctorCard from "../../components/doctors/DoctorCard";
import { motion, AnimatePresence } from "framer-motion";
import {staggerContainer} from "../../animations/variants"

function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [rating, setRating] = useState("");
  const [experience, setExperience] = useState("");

  const uniqueSpecialization = [
    ...new Set(doctors.map((doctor) => doctor.specialization))
  ];


  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      doctor.specialization.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesSpecialization =
      specialization === "" || doctor.specialization === specialization;
    const matchesExperience =
      experience === "" || doctor.experience >= Number(experience)
    const matchesRating =
      rating === "" || doctor.rating >= Number(rating)


    return matchesSearch && matchesSpecialization && matchesExperience && matchesRating
  });
  const hasActiveFilters =
    searchTerm !== "" || specialization !== "" || experience !== "" || rating !== ""
  return (
    <section className="min-h-screen bg-lightBg dark:bg-darkBg py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

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

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-gray-700
      bg-white dark:bg-gray-900
      text-slate-700 dark:text-white
      px-4 py-3
      focus:outline-none focus:ring-2
      focus:ring-cyan-500 transition"
            >
              <option value="">All Specializations</option>

              {uniqueSpecialization.map((specialization) => (
                <option
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </option>
              ))}
            </select>

            {/* Experience */}

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-gray-700
      bg-white dark:bg-gray-900
      text-slate-700 dark:text-white
      px-4 py-3
      focus:outline-none focus:ring-2
      focus:ring-cyan-500 transition"
            >
              <option value="">All Experience</option>
              <option value="15">15+ Years</option>
              <option value="10">10+ Years</option>
              <option value="5">5+ Years</option>
              <option value="1">1+ Years</option>
            </select>

            {/* Rating */}

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-gray-700
      bg-white dark:bg-gray-900
      text-slate-700 dark:text-white
      px-4 py-3
      focus:outline-none focus:ring-2
      focus:ring-cyan-500 transition"
            >
              <option value="">All Ratings</option>
              <option value="4.8">4.8+</option>
              <option value="4.5">4.5+</option>
              <option value="4.3">4.3+</option>
              <option value="4.0">4.0+</option>
            </select>

          </div>
          {hasActiveFilters && (
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSpecialization("");
                  setRating("");
                  setExperience("");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                🧹 Clear Filters
              </button>
            </div>
          )}

        </div>


        <div className="flex items-center justify-between mb-8 px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 shadow-premiumLight dark:shadow-lg transition-colors duration-300">
          <p className="text-slate-700 dark:text-gray-300 text-lg">
            🩺 Showing{" "}
            <span className="font-bold text-lightPrimary dark:text-darkPrimary">
              {filteredDoctors.length}
            </span>{" "}
            {filteredDoctors.length === 1 ? "Doctor" : "Doctors"}
          </p>
        </div>
        {/* Doctors */}

        {filteredDoctors.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))}
            </motion.div></AnimatePresence>
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
    </section >
  );
}

export default DoctorsList;