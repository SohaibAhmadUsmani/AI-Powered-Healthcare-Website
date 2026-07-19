import { useState } from "react";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !selectedDate || !selectedTime) {
      alert("Please fill all fields.");
      return;
    }

    alert("Appointment Booked Successfully!");

    console.log({
      patientName,
      selectedDate,
      selectedTime,
    });

    // Reset form
    setPatientName("");
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-xl border"
    >
      {/* Patient Name */}
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

      {/* Date Picker */}
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Time Slots */}
      <TimeSlots
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      {/* Submit Button */}
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