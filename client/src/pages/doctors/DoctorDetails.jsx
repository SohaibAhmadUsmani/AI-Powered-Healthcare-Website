import { useParams, useNavigate } from "react-router-dom";
import doctors from "../../assets/data/doctors";
import { motion } from "framer-motion";
import { fadeUp  } from "../../animations/variants";
import RippleButton from "../../components/RippleButton";
import { ArrowLeft } from "lucide-react";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const correctDoctor = doctors.find(
    (doctor) => doctor.id === Number(id)
  );

  if (!correctDoctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightBg dark:bg-darkBg text-slate-900 dark:text-white transition-colors duration-300">
        <h1 className="font-sora text-3xl font-bold">Doctor not found.</h1>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-lightBg dark:bg-darkBg text-slate-900 dark:text-white py-12 px-4 sm:px-6 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <RippleButton
          onClick={() => navigate("/doctors")}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-lightPrimary dark:hover:text-darkPrimary hover:border-lightPrimary/40 dark:hover:border-darkPrimary/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer font-sans font-semibold text-xs uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Doctors</span>
        </RippleButton>

        {/* Top Section */}

        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl grid md:grid-cols-3 gap-8 transition-all duration-300">

          {/* Doctor Image */}

          <div className="flex justify-center items-center">

            <img
              src={correctDoctor.image}
              alt={correctDoctor.name}
              className="w-72 h-72 rounded-2xl object-cover border-4 border-lightPrimary dark:border-darkPrimary"
            />

          </div>

          {/* Doctor Info */}

          <div className="md:col-span-2 flex flex-col justify-center space-y-4">

            <h1 className="text-4xl font-bold">
              {correctDoctor.name}
            </h1>

            <p className="text-xl font-medium text-lightPrimary dark:text-darkPrimary">
              {correctDoctor.specialization}
            </p>

            <p className="text-lg">
              ⭐ {correctDoctor.rating} ({correctDoctor.reviews} Reviews)
            </p>

            <p className="text-lg">
              {correctDoctor.experience} Years Experience
            </p>

            <p className="text-lg">
              {correctDoctor.hospital}
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
            {correctDoctor.description}
          </p>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2">
              Qualifications
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {correctDoctor.qualification}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2">
              Institution
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {correctDoctor.institute}
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
              {correctDoctor.research}
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
              {correctDoctor.availability}
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default DoctorDetails;