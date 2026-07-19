import { useNavigate } from "react-router-dom";
import RippleButton from "../RippleButton";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <div className="w-[360px] glass-panel glass-card-glow rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-56 object-contain rounded-xl bg-white"
      />

      <h2 className="text-2xl font-bold text-white">
        {doctor.name}
      </h2>

      <p className="text-cyan-400 font-semibold mt-1">
        {doctor.specialization}
      </p>

      <p className="text-gray-300 mt-2">
        {doctor.qualification}
      </p>

      <p className="text-gray-400">
        {doctor.experience} Years Experience
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-400 font-semibold">
          ⭐ {doctor.rating}
        </span>

        <span className="text-sm text-gray-400">
          {doctor.hospital}
        </span>
      </div>

      <RippleButton  
         onClick={() => navigate(`/doctors/${doctor.id}`)}
        className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-semibold transition duration-300 hover:opacity-90 hover:shadow-lg"
      >
        View Details
      </RippleButton>
    </div>
  );
}

export default DoctorCard;