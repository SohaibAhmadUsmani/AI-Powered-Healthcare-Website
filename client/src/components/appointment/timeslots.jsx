import React from "react";
import RippleButton from "../RippleButton";

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const TimeSlots = ({ selectedTime, setSelectedTime, selectedDate, appointments = [] }) => {
  const bookedSlots = appointments
    .filter((appointment) => {
      if (!selectedDate || !appointment.appointmentDate) return false;
      return (
        new Date(appointment.appointmentDate).toDateString() ===
        new Date(selectedDate).toDateString()
      );
    })
    .map((appointment) => appointment.timeSlot);

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Available Time Slots <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {slots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = selectedTime === slot;

          return (
            <RippleButton
              key={slot}
              type="button"
              disabled={isBooked}
              onClick={() => setSelectedTime(slot)}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 text-center ${
                isBooked
                  ? "bg-slate-200/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border-slate-300 dark:border-slate-800 cursor-not-allowed line-through"
                  : isSelected
                  ? "bg-lightPrimary dark:bg-darkPrimary text-white dark:text-darkBg border-lightPrimary dark:border-darkPrimary shadow-glowLightPrimary dark:shadow-glowPrimary scale-[1.02]"
                  : "bg-slate-50 dark:bg-darkBg/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-lightPrimary dark:hover:border-darkPrimary hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {slot} {isBooked ? "(Booked)" : ""}
            </RippleButton>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;