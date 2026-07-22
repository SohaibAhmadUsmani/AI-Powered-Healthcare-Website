import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";
import RippleButton from "../../components/RippleButton";
import { ArrowLeft } from "lucide-react";

const fallbackDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialization: "Cardiology",
    rating: 4.9,
    reviews: 124,
    experience: 15,
    hospital: "Mayo Clinic",
    qualification: "MD, Johns Hopkins University",
    institute: "Johns Hopkins Medical School",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description: "Chief of Cardiology specializing in advanced telemetry monitoring, vital tracking, and bio-integration diagnostics.",
    research: "Real-time telemetry algorithms, wearable cardiovascular sensors, predictive cardiac failure indicators.",
    availability: "Mon, Wed, Fri (9:00 AM - 1:00 PM)"
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    specialization: "Neurology",
    rating: 4.8,
    reviews: 98,
    experience: 12,
    hospital: "Stanford Hospital",
    qualification: "MD-PhD in Biomedical Informatics",
    institute: "Stanford University",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description: "Leads AI Genetics Research Initiative at Stanford. Specialized in neurological risk mapping and MRI diagnostic analytics.",
    research: "Neural disease risk mapping, genomic sequencing networks, predictive oncology biomarkers.",
    availability: "Tue, Thu (10:00 AM - 4:00 PM)"
  },
  {
    id: 3,
    name: "Dr. Elena Rostova",
    specialization: "Pediatrics",
    rating: 5.0,
    reviews: 156,
    experience: 10,
    hospital: "Johns Hopkins Hospital",
    qualification: "MD in Pediatric Neurological Surgery",
    institute: "Harvard Medical School",
    image: "https://images.unsplash.com/photo-1594824813566-88855ce78947?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
    description: "Pediatric care specialist focusing on child development, immunizations, and preventive pediatric healthcare.",
    research: "Pediatric bio-imaging, early development diagnostics.",
    availability: "Mon – Fri (8:00 AM - 2:00 PM)"
  }
];

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {  
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor.");
        }
        const result = await response.json();
        setDoctor(result.data);
      }
      catch (error) {
        console.error(error);
        // Fallback to local data if backend is offline
        const found = fallbackDoctors.find((d) => String(d.id) === String(id) || String(d._id) === String(id)) || fallbackDoctors[0];
        setDoctor(found);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-lightBg dark:bg-darkBg">
        <div className="w-12 h-12 border-4 border-lightPrimary dark:border-darkPrimary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-mono text-slate-600 dark:text-gray-400">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (!doctor) {
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
              ⭐ {doctor.rating} ({doctor.reviews || 100} Reviews)
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
            {doctor.description || doctor.bio}
          </p>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2">
              Qualifications
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {doctor.qualification || doctor.education}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-semibold mb-2">
              Institution
            </h3>

            <p className="text-slate-600 dark:text-gray-400">
              {doctor.institute || doctor.hospital}
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
              {doctor.availability || "9:00 AM - 5:00 PM"}
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default DoctorDetails;