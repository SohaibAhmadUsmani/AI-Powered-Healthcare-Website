import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );

      setAppointments(response.data.data);
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
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
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

      alert(response.data.message);

      setPatientName("");
      setEmail("");
      setPhone("");
      setReason("");
      setSelectedDate("");
      setSelectedTime("");

      await fetchAppointments();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-xl border"
    >
      <div>
        <label className="block mb-2 font-medium">
          Patient Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full border border-gray-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          type="text"
          placeholder="03001234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Reason <span className="text-gray-400">(Optional)</span>
        </label>

        <textarea
          placeholder="Describe your problem"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full border border-gray-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;