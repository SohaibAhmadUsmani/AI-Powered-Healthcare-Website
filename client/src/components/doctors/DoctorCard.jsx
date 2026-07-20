import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { fadeUp, cardHover } from "../../animations/variants"
import RippleButton from "../RippleButton"; 

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0, y: -20,
        transition: {
          duration: 0.2
        }
      }}
      whileHover={cardHover}

      className="w-full max-w-[360px] glass-panel glass-card-glow rounded-2xl p-5 border border-slate-200 dark:border-white/5 shadow-premiumLight dark:shadow-2xl transition-all duration-300  hover:shadow-premiumLightHover dark:hover:shadow-glowPrimary">

      <motion.img
        whileHover={{
          scale: 1.08,
        }}
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-56 object-contain rounded-xl bg-lightAccent dark:bg-white"
      />

      <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
        {doctor.name}
      </h2>

      <p className="text-lightPrimary dark:text-darkPrimary font-semibold mt-1 transition-colors duration-300">
        {doctor.specialization}
      </p>

      <p className="text-slate-600 dark:text-gray-300 mt-2 transition-colors duration-300">
        {doctor.qualification}
      </p>

      <p className="text-slate-500 dark:text-gray-400 transition-colors duration-300">
        {doctor.experience} Years Experience
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-500 dark:text-yellow-400 font-semibold">
          ⭐ {doctor.rating}
        </span>

        <span className="text-sm text-slate-500 dark:text-gray-400">
          {doctor.hospital}
        </span>
      </div>

      <RippleButton       
        onClick={() => navigate(`/doctors/${doctor.id}`)}
        className="w-full mt-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary hover:opacity-90 transition-all duration-300 shadow-glowLightPrimary dark:shadow-glowPrimary"
      >
        View Details
      </RippleButton>

    </motion.div>
  );
}

export default DoctorCard;