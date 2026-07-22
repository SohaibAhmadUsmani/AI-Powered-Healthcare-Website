import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import RippleButton from "./RippleButton";

export default function OrderSummaryCard({
  totals,
  onApplyPromo,
  ctaLabel,
  onCta,
  ctaDisabled,
}) {
  const [code, setCode] = useState("");
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApply = () => {
    if (!onApplyPromo || !code.trim()) return;
    const result = onApplyPromo(code);
    setPromoMessage(result);
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-slate-900/70 p-6 shadow-premiumLight dark:shadow-2xl transition-all">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Order Summary
        </span>
      </div>

      {onApplyPromo && (
        <div className="mb-4 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 px-3.5 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-lightSecondary dark:focus:border-darkSecondary focus:outline-none transition-all"
          />
          <RippleButton
            type="button"
            onClick={handleApply}
            className="whitespace-nowrap rounded-xl border border-lightPrimary dark:border-darkPrimary px-4 py-2 text-xs font-bold text-lightPrimary dark:text-darkPrimary hover:bg-lightPrimary/10 dark:hover:bg-darkPrimary/10 transition-all cursor-pointer"
          >
            Apply
          </RippleButton>
        </div>
      )}
      {promoMessage && (
        <p
          className={`-mt-2 mb-4 text-xs font-semibold ${
            promoMessage.success ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {promoMessage.message}
        </p>
      )}

      <dl className="space-y-2.5 text-xs">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-slate-800 dark:text-slate-200">${totals.subtotal.toFixed(2)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <dt>Discount</dt>
            <dd className="font-semibold text-emerald-500">-${totals.discount.toFixed(2)}</dd>
          </div>
        )}
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <dt>Shipping</dt>
          <dd className="font-semibold text-slate-800 dark:text-slate-200">
            {totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}
          </dd>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <dt>Tax (5%)</dt>
          <dd className="font-semibold text-slate-800 dark:text-slate-200">${totals.tax.toFixed(2)}</dd>
        </div>
      </dl>

      <div className="my-4 border-t border-dashed border-slate-200 dark:border-white/10" />

      <div className="flex items-center justify-between">
        <span className="font-sora font-bold text-slate-900 dark:text-white text-base">Total Amount</span>
        <span className="font-sora text-2xl font-bold text-lightPrimary dark:text-darkPrimary">
          ${totals.total.toFixed(2)}
        </span>
      </div>

      {ctaLabel && (
        <RippleButton
          type="button"
          onClick={onCta}
          disabled={ctaDisabled}
          className="mt-6 w-full rounded-xl bg-lightPrimary dark:bg-darkPrimary py-3.5 text-xs font-bold text-white dark:text-darkBg shadow-glowLightPrimary dark:shadow-glowPrimary hover:bg-lightPrimary/95 dark:hover:bg-darkPrimary/95 transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {ctaLabel}
        </RippleButton>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <ShieldCheck size={14} className="text-lightPrimary dark:text-darkPrimary" />
        Fully HIPAA compliant & end-to-end encrypted
      </div>
    </div>
  );
}
