import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import RippleButton from "../RippleButton";

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );

      setAppointments(response.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !patientName ||
      !email ||
      !phone ||
      !selectedDate ||
      !selectedTime
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          patientName,
          email,
          phone,
          appointmentDate: selectedDate,
          timeSlot: selectedTime,
          reason,
        }
      );

      toast.success("Appointment booked successfully!");

      setPatientName("");
      setEmail("");
      setPhone("");
      setReason("");
      setSelectedDate("");
      setSelectedTime("");

      await fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3.5 outline-none transition-all focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel shadow-premiumLight dark:shadow-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300"
    >
      {/* Patient Name */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Patient Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="Enter full name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Grid for Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="03001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Reason for Visit <span className="text-xs text-slate-400 font-normal">(Optional)</span>
        </label>

        <textarea
          placeholder="Briefly describe your symptoms or medical query"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className={inputClasses}
        />
      </div>

      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TimeSlots
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDate={selectedDate}
        appointments={appointments}
      />

      <div className="pt-4">
        <RippleButton
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg font-bold text-sm px-8 py-3.5 rounded-xl shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Booking Appointment..." : "Confirm & Book Appointment"}
        </RippleButton>
      </div>
    </form>
  );
};

export default AppointmentForm;