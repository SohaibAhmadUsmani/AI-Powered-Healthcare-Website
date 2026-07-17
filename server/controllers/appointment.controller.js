const appointmentService = require("../services/appointment.service");

const bookAppointment = async (req, res) => {
  try {
    const result = await appointmentService.bookAppointment(req.body);

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const result = await appointmentService.getAppointments();

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const result = await appointmentService.getAppointmentById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAppointmentById,
};