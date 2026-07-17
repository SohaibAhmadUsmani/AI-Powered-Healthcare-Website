const express = require("express");
const { getAllTests, getTestById, bookTest, getAllBookings } = require("../controllers/labController");

const router = express.Router();

router.get("/", getAllTests);
router.get("/bookings/all", getAllBookings);
router.get("/:id", getTestById);
router.post("/book", bookTest);

module.exports = router;