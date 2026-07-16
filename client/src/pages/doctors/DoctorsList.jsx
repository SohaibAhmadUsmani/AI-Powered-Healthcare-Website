import { useState } from "react";
import SearchBar from "../../components/doctors/SearchBar";
import doctors from "../../assets/data/doctors";
import DoctorCard from "../../components/doctors/DoctorCard";

function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      doctor.specialization.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <section className="min-h-screen bg-[#0B0F19] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block border border-cyan-500 text-cyan-400 uppercase tracking-[0.2em] text-sm px-6 py-3 rounded-full">
            Find Your Specialist
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-white mt-8">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Doctors
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg leading-8">
            Search experienced healthcare professionals by name or
            specialization and connect with the right doctor for your
            healthcare journey.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-16">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Doctors */}
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white">
              No Doctors Found
            </h2>

            <p className="text-gray-400 mt-4">
              We couldn't find any doctor matching your search.
              Try searching using another name or specialization.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default DoctorsList;