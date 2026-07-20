import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

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
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
          Order Summary
        </span>
      </div>

      {onApplyPromo && (
        <div className="mb-5 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={handleApply}
            className="whitespace-nowrap rounded-lg border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Apply
          </button>
        </div>
      )}
      {promoMessage && (
        <p
          className={`-mt-3 mb-4 text-xs ${
            promoMessage.success ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {promoMessage.message}
        </p>
      )}

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-400">
          <dt>Subtotal</dt>
          <dd className="text-slate-200">${totals.subtotal.toFixed(2)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-slate-400">
            <dt>Discount</dt>
            <dd className="text-emerald-400">-${totals.discount.toFixed(2)}</dd>
          </div>
        )}
        <div className="flex justify-between text-slate-400">
          <dt>Shipping</dt>
          <dd className="text-slate-200">
            {totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}
          </dd>
        </div>
        <div className="flex justify-between text-slate-400">
          <dt>Tax (5%)</dt>
          <dd className="text-slate-200">${totals.tax.toFixed(2)}</dd>
        </div>
      </dl>

      <div className="my-4 border-t border-dashed border-slate-800" />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">Total</span>
        <span className="text-2xl font-bold text-cyan-400">
          ${totals.total.toFixed(2)}
        </span>
      </div>

      {ctaLabel && (
        <button
          type="button"
          onClick={onCta}
          disabled={ctaDisabled}
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 py-3 text-sm font-semibold text-[#0B0F19] shadow-[0_0_20px_rgba(6,182,212,0.35)] transition hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ctaLabel}
        </button>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-cyan-500" />
        Secure checkout, encrypted end to end
      </div>
    </div>
  );
}
