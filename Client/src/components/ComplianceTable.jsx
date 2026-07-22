import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import StatusBadge from "./StatusBadge";

const FILTERS = ["All", "Compliant", "At Risk", "Expired"];

function riskTone(score) {
  if (score >= 70) return "text-rose-600 bg-rose-50 border-rose-200/50";
  if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200/50";
  return "text-emerald-600 bg-emerald-50 border-emerald-200/50";
}

export default function ComplianceTable({ contracts = [] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = useMemo(() => {
    const listData = contracts || [];
    let list = listData.filter((c) => {
      const matchesFilter = filter === "All" || c.status === filter;
      const matchesQuery =
        (c.name || "").toLowerCase().includes(query.toLowerCase()) ||
        (c.vendor || "").toLowerCase().includes(query.toLowerCase()) ||
        (c.id || "").toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
    list = [...list].sort((a, b) =>
      sortAsc
        ? new Date(a.expiryDate) - new Date(b.expiryDate)
        : new Date(b.expiryDate) - new Date(a.expiryDate)
    );
    return list;
  }, [contracts, query, filter, sortAsc]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden my-6">
      {/* Header controls separated cleanly from table body */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 bg-slate-50/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contracts, vendors, IDs…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] uppercase tracking-wider font-bold text-slate-400">
              <th className="px-5 py-3">Contract</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Risk Score</th>
              <th className="px-5 py-3">
                <button
                  onClick={() => setSortAsc((v) => !v)}
                  className="flex items-center gap-1 font-bold hover:text-slate-700 transition"
                >
                  Expires
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition">
                <td className="px-5 py-3.5">
                  <div className="font-bold text-slate-800">{c.name}</div>
                  <div className="font-mono text-[10px] text-slate-400">
                    {c.id}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600 font-medium">
                  {c.vendor}
                </td>
                <td className="px-5 py-3.5 text-slate-600 font-medium">
                  {c.owner || "—"}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 border font-mono text-[11px] font-bold ${riskTone(
                      c.riskScore
                    )}`}
                  >
                    {c.riskScore}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-slate-500">
                  {c.expiryDate}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-xs font-semibold text-slate-400"
                >
                  No contracts match your search filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}