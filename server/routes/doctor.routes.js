const {Router} = require("express");
const doctorController = require("../controllers/doctorController");
const router = Router();

router.get("/" , doctorController.getDoctors);
router.get("/:id" , doctorController.getDoctorById);

module.exports = router;