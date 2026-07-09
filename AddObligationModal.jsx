import React, { useState } from "react";
import { X } from "lucide-react";
import { STATUS_ORDER, PRIORITIES, ASSIGNEE_COLORS } from "../constants";

const EMPTY_FORM = {
  title: "",
  contract: "",
  status: "Pending",
  priority: "Medium",
  assigneeName: "Sarah",
  due: "",
  category: "",
};

function initialsOf(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AddObligationModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  if (!open) return null;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      contract: form.contract,
      status: form.status,
      priority: form.priority,
      due: form.due,
      category: form.category,
      assignee: {
        name: form.assigneeName,
        initials: initialsOf(form.assigneeName),
        color: ASSIGNEE_COLORS[form.assigneeName] || "bg-slate-500",
      },
    });
    setForm(EMPTY_FORM);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Add Obligation</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-600">Title</label>
            <input
              required
              value={form.title}
              onChange={update("title")}
              className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Vendor Contract Renewal Review"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Related contract</label>
            <input
              required
              value={form.contract}
              onChange={update("contract")}
              className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Vendor Services Agreement"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600">Status</label>
              <select
                value={form.status}
                onChange={update("status")}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Priority</label>
              <select
                value={form.priority}
                onChange={update("priority")}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600">Assignee</label>
              <select
                value={form.assigneeName}
                onChange={update("assigneeName")}
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(ASSIGNEE_COLORS).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Due date</label>
              <input
                required
                value={form.due}
                onChange={update("due")}
                placeholder="e.g. Aug 15"
                className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Category</label>
            <input
              required
              value={form.category}
              onChange={update("category")}
              placeholder="e.g. Renewal, Review, Reporting"
              className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Add Obligation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
