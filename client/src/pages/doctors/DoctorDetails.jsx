import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { fadeUp  } from "../../animations/variants"
import RippleButton from "../../components/RippleButton";
import { useState , useEffect } from "react";
 

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
const [doctor , setDoctor] = useState(null);

  useEffect(() => {
      const fetchDoctor = async () => {
        try {  
          const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch doctor. ")
          }
          const result = await response.json();
          setDoctor(result.data);
        }
        catch (error) {
             console.error(error);
             alert("Failed to fetch doctor. ")
        }
      };
      fetchDoctor();
    }, [id]);

    if (doctor === null) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightBg dark:bg-darkBg">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-700 dark:text-gray-300">
        Loading doctor...
      </p>
    </div>
  );
}
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightBg dark:bg-darkBg text-slate-900 dark:text-white transition-colors duration-300">
        <h1 className="text-3xl font-bold">Doctor not found.</h1>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-lightBg dark:bg-darkBg text-slate-900 dark:text-white py-10 px-6 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <RippleButton
          onClick={() => navigate("/doctors")}
          className="mb-6 px-5 py-2 rounded-lg bg-lightAccent dark:bg-darkAccent border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-300"
        >
          ← Back
        </RippleButton>

        {/* Top Section */}

        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl grid md:grid-cols-3 gap-8 transition-all duration-300">

          {/* Doctor Image */}

          <div className="flex justify-center items-center">

            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-72 h-72 rounded-2xl object-cover border-4 border-lightPrimary dark:border-darkPrimary"
            />

          </div>

          {/* Doctor Info */}

          <div className="md:col-span-2 flex flex-col justify-center space-y-4">

            <h1 className="text-4xl font-bold">
              {doctor.name}
            </h1>

            <p className="text-xl font-medium text-lightPrimary dark:text-darkPrimary">
              {doctor.specialization}
            </p>

            <p className="text-lg">
              ⭐ {doctor.rating} ({doctor.reviews} Reviews)
            </p>

            <p className="text-lg">
              {doctor.experience} Years Experience
            </p>

            <p className="text-lg">
              {doctor.hospital}
            </p>

            <RippleButton
              onClick={() => navigate("/book-appointment")}
              className="w-fit mt-4 px-6 py-3 rounded-xl bg-lightPrimary dark:bg-darkPrimary hover:bg-lightPrimary/90 dark:hover:bg-darkPrimary/90 text-white font-semibold shadow-glowLightPrimary dark:shadow-glowPrimary transition-all duration-300"
            >
              Book Appointment
            </RippleButton>

          </div>

        </div>

        {/* About Doctor */}

        <div className="glass-panel rounded-3xl mt-8 p-8 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300">

          <h2 className="text-3xl font-bold mb-6">
            About Doctor
          </h2>

          <p className="text-slate-600 dark:text-gray-400 leading-8">
            {doctor.description}
          </p>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2">
              Qualifications
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {doctor.qualification}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2">
              Institution
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {doctor.institute}
            </p>

          </div>

        </div>

        {/* Professional Information */}

        <div className="glass-panel rounded-3xl mt-8 p-8 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300">

          <h2 className="text-3xl font-bold mb-6">
            Professional Information
          </h2>

          <div>

            <h3 className="text-xl font-semibold mb-2">
              Research
            </h3>

            <p className="text-slate-600 dark:text-gray-400 leading-8">
              {doctor.research}
            </p>

          </div>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2 text-slate-500 dark:text-gray-500">
              Publications
            </h3>

            <p className="text-slate-500 dark:text-gray-500 italic">
              Coming Soon...
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2 text-slate-500 dark:text-gray-500">
              Certifications
            </h3>

            <p className="text-slate-500 dark:text-gray-500 italic">
              Coming Soon...
            </p>

          </div>

        </div>

        {/* Availability */}

        <div className="glass-panel rounded-3xl mt-8 p-8 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300">

          <h2 className="text-3xl font-bold mb-6">
            Availability
          </h2>

          <div className="space-y-4">

            <p className="text-lg">
              <span className="font-semibold text-lightPrimary dark:text-darkPrimary">
                Days:
              </span>{" "}
              Monday – Friday
            </p>

            <p className="text-lg">
              <span className="font-semibold text-lightPrimary dark:text-darkPrimary">
                Time:
              </span>{" "}
              {doctor.availability}
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default DoctorDetails;