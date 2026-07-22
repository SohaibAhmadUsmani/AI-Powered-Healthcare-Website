import React from "react";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Select Date <span className="text-red-500">*</span>
      </label>

      <input
        type="date"
        value={selectedDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-xl p-3.5 outline-none transition-all focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 text-sm cursor-pointer"
      />
    </div>
  );
};

export default DatePicker;