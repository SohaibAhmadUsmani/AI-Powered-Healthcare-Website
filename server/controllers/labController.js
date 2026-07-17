const LabTest = require("../models/LabTest");
const Booking = require("../models/Booking");

const getAllTests = async (req, res) => {
  try {
    const tests = await LabTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab tests", error: error.message });
  }
};

const getTestById = async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab test", error: error.message });
  }
};

const bookTest = async (req, res) => {
  try {
    const { testId, patientName, phone, date } = req.body;

    if (!testId || !patientName || !phone || !date) {
      return res.status(400).json({ message: "testId, patientName, phone, and date are required" });
    }

    const test = await LabTest.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    const newBooking = await Booking.create({
      testId,
      testName: test.name,
      patientName,
      phone,
      date,
    });

    res.status(201).json({
      message: "Test booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to book test", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

module.exports = { getAllTests, getTestById, bookTest, getAllBookings };