import StatusBadge from "../StatusBadge";

const LEVEL_TO_STATUS = {
  Compliant: "Compliant",
  Pending: "Compliant",
  Delayed: "At Risk",
  "Non-Compliant": "At Risk",
  "High Risk": "Expired",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  // Cleans ISO strings like "2026-07-05 00:00:00+05:30" to "2026-07-05"
  return dateStr.split(" ")[0];
}

export default function ComplianceHistoryTable({ rows = [] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-xs font-semibold text-slate-400">
        No compliance checks have been logged yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-left text-xs">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase tracking-wider font-bold text-slate-400">
            <th className="px-5 py-3.5">Checked On</th>
            <th className="px-5 py-3.5">Contract</th>
            <th className="px-5 py-3.5">Obligation</th>
            <th className="px-5 py-3.5">Level</th>
            <th className="px-5 py-3.5">Checked By</th>
            <th className="px-5 py-3.5">Remarks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                {formatDate(r.checkedOn)}
              </td>
              <td className="px-5 py-3.5 font-bold text-slate-800">
                {r.contract}
              </td>
              <td className="px-5 py-3.5 text-slate-600 font-medium">
                {r.obligation}
              </td>
              <td className="px-5 py-3.5">
                {/* Fixed text overlap by rendering only the StatusBadge component */}
                <StatusBadge
                  status={LEVEL_TO_STATUS[r.complianceLevel] ?? "At Risk"}
                />
              </td>
              <td className="px-5 py-3.5 text-slate-600 font-medium">
                {r.checkedBy}
              </td>
              <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">
                {r.remarks || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}