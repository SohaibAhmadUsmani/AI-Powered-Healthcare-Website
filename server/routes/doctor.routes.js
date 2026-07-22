const {Router} = require("express");
const doctorController = require("../controllers/doctorController");
const router = Router();

router.get("/" , doctorController.getDoctors);
router.get("/:id" , doctorController.getDoctor);

module.exports = router;