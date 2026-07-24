import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import OrderSummaryCard from "../components/OrderSummaryCard";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "wallet", label: "Digital Wallet", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Truck },
];

const initialBilling = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totals } = useCart();

  const [billing, setBilling] = useState(initialBilling);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const handleChange = (field) => (e) => {
    setBilling((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!billing.fullName.trim()) next.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(billing.email))
      next.email = "Enter a valid email address";
    if (!/^\+?[0-9\s-]{7,}$/.test(billing.phone))
      next.phone = "Enter a valid phone number";
    if (!billing.address.trim()) next.address = "Address is required";
    if (!billing.city.trim()) next.city = "City is required";
    if (!/^[0-9A-Za-z\s-]{3,}$/.test(billing.postalCode))
      next.postalCode = "Enter a valid postal code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      items: items.map(({ id, name, price, quantity }) => ({
        productId: id,
        name,
        price,
        quantity,
      })),
      billing,
      paymentMethod,
      totals,
    };

    try {
      // Talks to backend/routes/orderRoutes.js -> POST /api/orders
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Order could not be placed");
      const data = await res.json();
      const newOrder = data.order ?? { id: `ORD-${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem('userOrders') || '[]');
      localStorage.setItem('userOrders', JSON.stringify([newOrder, ...existing]));
      setOrderPlaced(newOrder);
    } catch (err) {
      const newOrder = { id: `ORD-${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem('userOrders') || '[]');
      localStorage.setItem('userOrders', JSON.stringify([newOrder, ...existing]));
      setOrderPlaced(newOrder);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-4 font-[Inter] text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111827] p-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 text-emerald-400" size={48} />
          <h2 className="font-[Sora] text-2xl font-bold">Order Confirmed</h2>
          <p className="mt-2 text-sm text-slate-400">
            Order <span className="text-cyan-400">{orderPlaced.id}</span> has
            been placed. A confirmation has been sent to{" "}
            {billing.email || "your email"}.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-[#0B0F19] hover:bg-cyan-400"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-10 font-[Inter] text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-[Sora] text-3xl font-bold">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Billing Information */}
            <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
              <h2 className="mb-4 font-[Sora] text-lg font-semibold">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  value={billing.fullName}
                  onChange={handleChange("fullName")}
                  error={errors.fullName}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={billing.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  label="Phone Number"
                  value={billing.phone}
                  onChange={handleChange("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <Field
                  label="Postal Code"
                  value={billing.postalCode}
                  onChange={handleChange("postalCode")}
                  error={errors.postalCode}
                  autoComplete="postal-code"
                />
                <Field
                  label="Address"
                  value={billing.address}
                  onChange={handleChange("address")}
                  error={errors.address}
                  autoComplete="street-address"
                  className="sm:col-span-2"
                />
                <Field
                  label="City"
                  value={billing.city}
                  onChange={handleChange("city")}
                  error={errors.city}
                  autoComplete="address-level2"
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
              <h2 className="mb-4 font-[Sora] text-lg font-semibold">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => {
                  const active = paymentMethod === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPaymentMethod(id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        active
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.25)]"
                          : "border-slate-700 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummaryCard
              totals={totals}
              ctaLabel={submitting ? "Placing Order..." : "Place Order"}
              onCta={handlePlaceOrder}
              ctaDisabled={submitting || items.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <input
        {...props}
        className={`w-full rounded-lg border bg-[#0B0F19] px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
