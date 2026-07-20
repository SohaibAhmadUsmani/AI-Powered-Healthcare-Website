const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  listOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// Swap in your real auth middleware once the Auth module is merged
// const { requireAuth } = require("../middleware/auth");

router.post("/", createOrder);
router.get("/", listOrders);
router.get("/:orderNumber", getOrder);
router.patch("/:orderNumber/status", updateOrderStatus);
router.delete("/:orderNumber", cancelOrder);

module.exports = router;
