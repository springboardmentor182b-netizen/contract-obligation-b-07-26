import React from "react";
import ObligationCard from "./ObligationCard";

export default function KanbanColumn({ config, items, onMove, onDelete }) {
  return (
    <div className="min-w-[280px] w-[280px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
          {items.length}
        </span>
      </div>
      <div>
        {items.map((o) => (
          <ObligationCard key={o.id} obligation={o} onMove={onMove} onDelete={onDelete} />
        ))}
        {items.length === 0 && (
          <div className="text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg p-4 text-center">
            No obligations
          </div>
        )}
      </div>
    </div>
  );
}
