const TAX_RATE = 0.05; // 5%
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FLAT = 4.99;

const PROMO_CODES = {
  HEALTH10: 0.1,
};

/**
 * Recalculates billing totals from raw items on the server.
 * Never trust totals sent from the client — always recompute here.
 * @param {Array<{price:number, quantity:number}>} items
 * @param {string} [promoCode]
 */
function calculateBilling(items, promoCode = "") {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const subtotal = items.reduce((sum, item) => {
    if (item.price < 0 || item.quantity < 1) {
      throw new Error(`Invalid item: ${item.name || item.productId}`);
    }
    return sum + item.price * item.quantity;
  }, 0);

  const discountRate = PROMO_CODES[promoCode?.trim().toUpperCase()] || 0;
  const discount = subtotal * discountRate;

  const taxableAmount = subtotal - discount;
  const shipping =
    taxableAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + shipping + tax;

  return {
    subtotal: round2(subtotal),
    discount: round2(discount),
    shipping: round2(shipping),
    tax: round2(tax),
    total: round2(total),
  };
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

module.exports = { calculateBilling, generateOrderNumber, TAX_RATE, SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD };
