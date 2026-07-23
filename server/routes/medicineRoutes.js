const express = require("express");
const { getAllMedicines, getMedicineById } = require("../controllers/medicineController");

const router = express.Router();

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);

module.exports = router;
