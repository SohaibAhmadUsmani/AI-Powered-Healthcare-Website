import { useParams, useNavigate } from "react-router-dom";
import doctors from "../../assets/data/doctors";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const correctDoctor = doctors.find(
    (doctor) => doctor.id === Number(id)
  );

  if (!correctDoctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <h1 className="text-3xl font-bold">Doctor not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => navigate("/doctors")}
          className="mb-6 px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          ← Back
        </button>

        {/* Top Section */}

        <div className="bg-gray-900 rounded-3xl shadow-lg p-8 grid md:grid-cols-3 gap-8">

          {/* Doctor Image */}

          <div className="flex justify-center items-center">

            <img
              src={correctDoctor.image}
              alt={correctDoctor.name}
              className="w-72 h-72 rounded-2xl object-cover border-4 border-cyan-500"
            />

          </div>

          {/* Doctor Info */}

          <div className="md:col-span-2 flex flex-col justify-center space-y-4">

            <h1 className="text-4xl font-bold">
              {correctDoctor.name}
            </h1>

            <p className="text-xl text-cyan-400 font-medium">
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

            <button
              className="w-fit mt-4 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
            >
              Book Appointment
            </button>

          </div>

        </div>

        {/* About Doctor */}

        <div className="bg-gray-900 rounded-3xl mt-8 p-8">

          <h2 className="text-3xl font-bold mb-6">
            About Doctor
          </h2>

          <p className="text-gray-300 leading-8">
            {correctDoctor.description}
          </p>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2">
              Qualifications
            </h3>

            <p className="text-gray-300">
              {correctDoctor.qualification}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2">
              Institution
            </h3>

            <p className="text-gray-300">
              {correctDoctor.institute}
            </p>

          </div>

        </div>

        {/* Professional Information */}

        <div className="bg-gray-900 rounded-3xl mt-8 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Professional Information
          </h2>

          <div>

            <h3 className="text-xl font-semibold mb-2">
              Research
            </h3>

            <p className="text-gray-300 leading-8">
              {correctDoctor.research}
            </p>

          </div>

          {/* Future Features */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2 text-gray-500">
              Publications
            </h3>

            <p className="text-gray-500 italic">
              Coming Soon...
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2 text-gray-500">
              Certifications
            </h3>

            <p className="text-gray-500 italic">
              Coming Soon...
            </p>

          </div>

        </div>

        {/* Availability */}

        <div className="bg-gray-900 rounded-3xl mt-8 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Availability
          </h2>

          <div className="space-y-4">

            <p className="text-lg">
              <span className="font-semibold text-cyan-400">
                Days:
              </span>{" "}
              Monday – Friday
            </p>

            <p className="text-lg">
              <span className="font-semibold text-cyan-400">
                Time:
              </span>{" "}
              {correctDoctor.availability}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorDetails;