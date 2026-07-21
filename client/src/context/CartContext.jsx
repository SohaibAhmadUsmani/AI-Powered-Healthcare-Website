import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

// Sample seed data — replace with items coming from the Medicine Store module
const initialItems = [
  {
    id: "med_001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 4.5,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
  },
  {
    id: "med_002",
    name: "Vitamin C Effervescent",
    category: "Immunity",
    price: 8.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=200&h=200&fit=crop",
  },
  {
    id: "med_003",
    name: "Digital Thermometer",
    category: "Devices",
    price: 12.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop",
  },
];

const TAX_RATE = 0.05; // 5% — kept in sync with backend/utils/billing.js
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FLAT = 4.99;

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = (code) => {
    // Mock promo logic — real validation should happen server-side (Order API)
    if (code.trim().toUpperCase() === "HEALTH10") {
      setAppliedDiscount(0.1);
      setPromoCode(code);
      return { success: true, message: "10% discount applied" };
    }
    setAppliedDiscount(0);
    return { success: false, message: "Invalid promo code" };
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = subtotal * appliedDiscount;
    const shipping =
      subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FLAT;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + shipping + tax;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  }, [items, appliedDiscount]);

  const value = {
    items,
    updateQuantity,
    removeItem,
    promoCode,
    applyPromoCode,
    appliedDiscount,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
