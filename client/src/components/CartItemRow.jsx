import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#111827] p-4 transition-colors hover:border-cyan-500/40">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover border border-slate-800"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">{item.name}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {item.category}
        </p>
        <p className="mt-1 text-sm font-medium text-cyan-400">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0B0F19] px-1 py-1">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center text-sm font-medium text-white">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="w-16 text-right text-sm font-semibold text-white">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => onRemove(item.id)}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
