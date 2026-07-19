const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const TimeSlots = ({ selectedTime, setSelectedTime }) => {
  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Time
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => setSelectedTime(slot)}
            className={`p-4 rounded-lg border transition-all ${
              selectedTime === slot
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-slate-800 text-white border-gray-600 hover:border-blue-500"
}`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;