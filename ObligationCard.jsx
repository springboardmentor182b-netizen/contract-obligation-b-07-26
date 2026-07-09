import React from "react";
import { Calendar, ArrowRight, ArrowLeft, Trash2 } from "lucide-react";
import { STATUS_ORDER } from "../constants";

const PRIORITY_STYLES = {
  Low: "bg-slate-50 text-slate-600 border border-slate-200",
  Medium: "bg-blue-50 text-blue-600 border border-blue-200",
  High: "bg-amber-50 text-amber-600 border border-amber-200",
  Critical: "bg-red-50 text-red-600 border border-red-200",
};

function PriorityTag({ priority }) {
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-md whitespace-nowrap ${PRIORITY_STYLES[priority]}`}
    >
      {priority}
    </span>
  );
}

export default function ObligationCard({ obligation, onMove, onDelete }) {
  const currentIndex = STATUS_ORDER.indexOf(obligation.status);
  const prevStatus = STATUS_ORDER[currentIndex - 1];
  const nextStatus = STATUS_ORDER[currentIndex + 1];

  return (
    <div className="group bg-white rounded-lg border border-slate-200 p-4 mb-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">
          {obligation.title}
        </h3>
        <PriorityTag priority={obligation.priority} />
      </div>
      <p className="text-xs text-slate-500 mt-1.5">{obligation.contract}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full ${obligation.assignee.color} text-white text-[10px] font-semibold flex items-center justify-center`}
          >
            {obligation.assignee.initials}
          </div>
          <span className="text-xs text-slate-600">{obligation.assignee.name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          {obligation.due}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
          {obligation.category}
        </span>

        {/* Move / delete controls — appear on hover, this is our stand-in for drag-and-drop */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {prevStatus && (
            <button
              title={`Move to ${prevStatus}`}
              onClick={() => onMove(obligation.id, prevStatus)}
              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
          {nextStatus && (
            <button
              title={`Move to ${nextStatus}`}
              onClick={() => onMove(obligation.id, nextStatus)}
              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            title="Delete obligation"
            onClick={() => onDelete(obligation.id)}
            className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
