const Appointment = require("../models/Appointment");

const bookAppointment = async (appointmentData) => {
  const appointment = await Appointment.create(appointmentData);

  return appointment;
};

const getAppointments = async () => {
  return await Appointment.find().sort({ createdAt: -1 });
};

const getAppointmentById = async (id) => {
  return await Appointment.findById(id);
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAppointmentById,
};