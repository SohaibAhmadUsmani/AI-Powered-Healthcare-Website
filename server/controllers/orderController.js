const Order = require("../models/Order");
const { calculateBilling, generateOrderNumber } = require("../utils/billing");

// POST /api/orders
async function createOrder(req, res) {
  try {
    const { items, billing, paymentMethod, promoCode } = req.body;

    if (!items || !billing || !paymentMethod) {
      return res.status(400).json({
        message: "items, billing, and paymentMethod are required",
      });
    }

    // Server recalculates totals — never trust client-supplied totals
    const totals = calculateBilling(items, promoCode);

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: req.user?.id, // populated by auth middleware if the user is logged in
      items,
      billing,
      paymentMethod,
      ...totals,
      status: paymentMethod === "cod" ? "confirmed" : "pending",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: {
        id: order.orderNumber,
        _id: order._id,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// GET /api/orders/:orderNumber
async function getOrder(req, res) {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json({ order });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch order" });
  }
}

// GET /api/orders  (current user's order history)
async function listOrders(req, res) {
  try {
    const filter = req.user?.id ? { user: req.user.id } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
}

// PATCH /api/orders/:orderNumber/status
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const allowed = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json({ order });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update order" });
  }
}

// DELETE /api/orders/:orderNumber  (cancel — only while pending/confirmed)
async function cancelOrder(req, res) {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        message: `Order already ${order.status}, cannot be cancelled`,
      });
    }

    order.status = "cancelled";
    await order.save();
    return res.json({ message: "Order cancelled", order });
  } catch (err) {
    return res.status(500).json({ message: "Failed to cancel order" });
  }
}

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  updateOrderStatus,
  cancelOrder,
};
