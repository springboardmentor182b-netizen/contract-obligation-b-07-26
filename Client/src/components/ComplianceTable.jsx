import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import StatusBadge from "./StatusBadge";

const FILTERS = ["All", "Compliant", "At Risk", "Expired"];

function riskTone(score) {
  if (score >= 70) return "text-status-expired";
  if (score >= 40) return "text-status-risk";
  return "text-status-compliant";
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
    <div className="rounded-card border border-border bg-surface shadow-card">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contracts, vendors, IDs…"
            className="focus-ring w-full rounded-md border border-border bg-bg py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint"
          />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`focus-ring rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-brand text-white"
                  : "bg-bg text-ink-soft hover:bg-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-3 font-medium">Contract</th>
              <th className="px-5 py-3 font-medium">Vendor</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Risk</th>
              <th className="px-5 py-3 font-medium">
                <button
                  onClick={() => setSortAsc((v) => !v)}
                  className="focus-ring flex items-center gap-1"
                >
                  Expires
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border last:border-0 hover:bg-bg"
              >
                <td className="px-5 py-3">
                  <div className="font-medium text-ink">{c.name}</div>
                  <div className="font-mono text-xs text-ink-faint">
                    {c.id}
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{c.vendor}</td>
                <td className="px-5 py-3 text-ink-soft">{c.owner}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className={`px-5 py-3 font-mono ${riskTone(c.riskScore)}`}>
                  {c.riskScore}
                </td>
                <td className="px-5 py-3 font-mono text-ink-soft">
                  {c.expiryDate}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-ink-faint"
                >
                  No contracts match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}