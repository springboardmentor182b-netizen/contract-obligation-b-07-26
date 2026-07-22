import { FileText } from "lucide-react";

export default function ComplianceDocsTable({ rows }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ECE7DE] bg-white p-10 text-center text-sm text-[#98A2B3]">
        No contract documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ECE7DE] bg-white shadow-sm">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#ECE7DE] text-xs uppercase tracking-wide text-[#98A2B3]">
            <th className="px-5 py-3 font-medium">Document</th>
            <th className="px-5 py-3 font-medium">Contract</th>
            <th className="px-5 py-3 font-medium">Version</th>
            <th className="px-5 py-3 font-medium">Uploaded By</th>
            <th className="px-5 py-3 font-medium">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-[#ECE7DE] last:border-0 hover:bg-[#FFFDF8]">
              <td className="px-5 py-3">
                <div className="flex items-center gap-2 text-[#1F2937]">
                  <FileText size={14} className="text-[#98A2B3]" />
                  {r.documentPath.split("/").pop()}
                </div>
              </td>
              <td className="px-5 py-3 text-[#6B7280]">{r.contract}</td>
              <td className="px-5 py-3 font-mono text-xs text-[#6B7280]">v{r.version}</td>
              <td className="px-5 py-3 text-[#6B7280]">{r.uploadedBy}</td>
              <td className="px-5 py-3 font-mono text-xs text-[#6B7280]">{r.uploadedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
