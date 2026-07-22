import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import OrderSummaryCard from "../components/OrderSummaryCard";
import RippleButton from "../components/RippleButton";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, applyPromoCode, totals } =
    useCart();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg bg-grid-pattern text-slate-850 dark:text-slate-100 py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-lightPrimary/10 dark:bg-darkPrimary/10 border border-lightPrimary/30 dark:border-darkPrimary/30 text-lightPrimary dark:text-darkPrimary">
            <ShoppingCart size={24} />
          </div>
          <h1 className="font-sora text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your <span className="bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary bg-clip-text text-transparent">Cart</span>
          </h1>
          <span className="ml-2 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 px-3 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/70 dark:bg-slate-900/70 p-12 text-center shadow-premiumLight dark:shadow-2xl space-y-4">
            <p className="font-sora text-xl font-bold text-slate-800 dark:text-white">
              Your cart is currently empty
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Add medicines or lab test bookings to see your order summary here.
            </p>
            <div className="pt-2">
              <RippleButton
                onClick={() => navigate("/store")}
                className="rounded-xl bg-lightPrimary dark:bg-darkPrimary px-6 py-3 text-xs font-bold text-white dark:text-darkBg shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all"
              >
                Browse Medicine Store
              </RippleButton>
            </div>
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
                  <span className="flex items-center justify-center gap-2 font-bold text-sm">
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
