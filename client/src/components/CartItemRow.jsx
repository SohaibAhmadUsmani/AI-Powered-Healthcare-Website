import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="glass-panel flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-slate-900/70 p-4 transition-all hover:border-lightPrimary/40 dark:hover:border-darkPrimary/40 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 flex-shrink-0 rounded-xl object-cover border border-slate-200/80 dark:border-white/10"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-sora font-bold text-slate-900 dark:text-white text-sm sm:text-base">{item.name}</p>
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {item.category}
        </p>
        <p className="mt-0.5 text-sm font-bold text-lightPrimary dark:text-darkPrimary">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-darkBg/80 px-2 py-1">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-lightPrimary dark:hover:text-darkPrimary focus:outline-none transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center text-xs font-bold text-slate-900 dark:text-white">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-lightPrimary dark:hover:text-darkPrimary focus:outline-none transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="w-16 text-right text-sm font-bold text-slate-900 dark:text-white">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => onRemove(item.id)}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
