import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import OrderSummaryCard from "../components/OrderSummaryCard";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, applyPromoCode, totals } =
    useCart();

  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-10 font-[Inter] text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <ShoppingCart className="text-cyan-400" size={28} />
          <h1 className="font-[Sora] text-3xl font-bold">
            Your <span className="text-cyan-400">Cart</span>
          </h1>
          <span className="ml-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-12 text-center">
            <p className="text-lg font-semibold text-white">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Add medicines or lab tests to see them here.
            </p>
            <button
              onClick={() => navigate("/store")}
              className="mt-6 rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-[#0B0F19] hover:bg-cyan-400"
            >
              Browse Medicines
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div>
              <OrderSummaryCard
                totals={totals}
                onApplyPromo={applyPromoCode}
                ctaLabel={
                  <span className="flex items-center justify-center gap-2">
                    Proceed to Checkout <ArrowRight size={16} />
                  </span>
                }
                onCta={() => navigate("/checkout")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
