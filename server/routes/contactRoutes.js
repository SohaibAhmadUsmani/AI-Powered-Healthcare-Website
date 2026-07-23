const express = require("express");
const { sendMessage, getAllMessages } = require("../controllers/contactController");

const router = express.Router();

router.get("/messages/all", getAllMessages);
router.post("/", sendMessage);

module.exports = router;