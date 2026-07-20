const { Router } = require("express");

const {
  bookAppointment,
  getAppointments,
  getAppointmentById,
} = require("../controllers/appointment.controller");

const router = Router();

router.post("/", bookAppointment);

router.get("/", getAppointments);

router.get("/:id", getAppointmentById);

module.exports = router;