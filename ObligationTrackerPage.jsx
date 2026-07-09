import React, { useState } from "react";
import { Search, Bell, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import KanbanBoard from "./components/KanbanBoard";
import AddObligationModal from "./components/AddObligationModal";
import { useObligations } from "./hooks/useObligations";
import { STATUS_CONFIG } from "./constants";

export default function ObligationTrackerPage() {
  const { obligations, loading, error, addObligation, moveObligation, removeObligation } =
    useObligations();
  const [view, setView] = useState("Kanban");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = obligations.filter(
    (o) =>
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.contract.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Obligation Tracker</h1>
          <p className="text-xs text-slate-500">June 3, 2024</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contracts, obligations"
              className="pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="relative" aria-label="Notifications">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
              SC
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-900">Sarah Chen</p>
              <p className="text-xs text-blue-600">Legal Manager</p>
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search obligations..."
              className="pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex bg-slate-100 rounded-lg p-1">
            {["Kanban", "List"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-sm px-4 py-1.5 rounded-md font-medium transition-colors ${
                  view === v
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-2">
            {STATUS_CONFIG.map((s) => (
              <div key={s.key} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
                <span className="text-xs text-slate-500">
                  {obligations.filter((o) => o.status === s.key).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Obligation
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-6 mb-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2">
          {error}. Make sure the FastAPI backend is running at http://localhost:8000.
        </div>
      )}

      {/* Board / loading state */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading obligations...
        </div>
      ) : view === "Kanban" ? (
        <KanbanBoard
          obligations={filtered}
          onMove={moveObligation}
          onDelete={removeObligation}
        />
      ) : (
        <div className="px-6 pb-6">
          <table className="w-full bg-white rounded-lg border border-slate-200 text-sm overflow-hidden">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Contract</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Priority</th>
                <th className="text-left px-4 py-2">Assignee</th>
                <th className="text-left px-4 py-2">Due</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-900">{o.title}</td>
                  <td className="px-4 py-2 text-slate-500">{o.contract}</td>
                  <td className="px-4 py-2 text-slate-600">{o.status}</td>
                  <td className="px-4 py-2 text-slate-600">{o.priority}</td>
                  <td className="px-4 py-2 text-slate-600">{o.assignee.name}</td>
                  <td className="px-4 py-2 text-slate-600">{o.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scroll hint (matches the bottom scrollbar in the design) */}
      <div className="border-t border-slate-200 bg-white px-4 py-1.5 flex items-center justify-between">
        <ChevronLeft className="w-4 h-4 text-slate-400" />
        <div className="h-1.5 flex-1 mx-3 bg-slate-200 rounded-full">
          <div className="h-1.5 w-1/4 bg-slate-400 rounded-full"></div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>

      <AddObligationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addObligation}
      />
    </div>
  );
}
