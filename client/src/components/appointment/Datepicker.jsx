const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Date
      </label>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full border border-gray-600 bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DatePicker;