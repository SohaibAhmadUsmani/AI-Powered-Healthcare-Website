const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const TimeSlots = ({selectedTime,setSelectedTime,selectedDate,appointments,}) => {
  
  const bookedSlots = appointments
    .filter((appointment) => {
      return (
        new Date(appointment.appointmentDate).toDateString() ===
        new Date(selectedDate).toDateString()
      );
    })
    .map((appointment) => appointment.timeSlot);

  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Time
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {slots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);

          return (
            <button
              key={slot}
              type="button"
              disabled={bookedSlots.includes(slot)}
              onClick={() => setSelectedTime(slot)}
              className={`p-4 rounded-lg border transition-all ${
              bookedSlots.includes(slot)
              ? "bg-gray-700 text-gray-400 border-gray-700 cursor-not-allowed opacity-60"
              : selectedTime === slot
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-slate-800 text-white border-gray-600 hover:border-blue-500"
}`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;