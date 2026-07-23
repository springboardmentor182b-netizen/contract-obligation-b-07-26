import { useState } from "react";
import { Search, Download, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card } from "../../../components/Card";
import { Dropdown } from "../../../components/Dropdown";
import { statusBadge } from "../../../components/Badge";
import { useContracts } from "../hooks/useContracts";
import { NewContractModal } from "./NewContractModal";
import { contractsApi } from "../services/contractsApi";

const TYPE_OPTIONS = ["All", "Vendor", "Employment", "Lease", "Software", "NDA", "Services", "Compliance"];
const STATUS_OPTIONS = ["All", "Active", "Expiring Soon", "Under Review", "Draft", "Terminated"];

function exportCsv(rows) {
  const headers = ["ID", "Name", "Type", "Party", "Effective", "Expiry", "Status", "Owner", "Value"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers, ...rows.map((c) => [c.id, c.name, c.type, c.party, c.effective, c.expiry, c.status, c.owner, c.value])]
    .map((row) => row.map(escape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url; a.download = "contractiq-contracts.csv"; a.click();
  URL.revokeObjectURL(url);
}

export function ContractRepository({ onSelectContract }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewContract, setShowNewContract] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const { contracts, summary, loading, error, refetch } = useContracts({ search, type: typeFilter, status: statusFilter });

  async function removeContract(contract) {
    if (!window.confirm(`Delete "${contract.name}"? This cannot be undone.`)) return;
    try { await contractsApi.remove(contract.id); await refetch(); }
    catch (err) { window.alert(err.message); }
  }

  return (
    <div className="p-6 space-y-4 max-w-screen-xl">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by name, party, ID, or owner…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <Dropdown value={typeFilter} options={TYPE_OPTIONS} onChange={setTypeFilter} className="w-36" />
        <Dropdown value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} className="w-40" />
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => exportCsv(contracts)} className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <Download size={13} /> Export CSV
          </button>
          <button onClick={() => setShowNewContract(true)} className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={13} /> New Contract
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[["Total Contracts", summary.total], ["Active", summary.active], ["Expiring Soon", summary.expiring_soon], ["Showing", summary.showing]].map(([label, value]) => (
          <div key={label} className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold text-foreground mt-1">{value}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-border bg-muted">
              {["ID","Contract Name","Type","Counterparty","Effective","Expiry","Status","Owner","Value","Actions"].map((h) => <th key={h} className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {contracts.map((contract) => <tr key={contract.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.id}</td>
                <td className="px-4 py-3 max-w-xs"><button onClick={() => onSelectContract(contract.id)} className="font-semibold text-foreground group-hover:text-blue-600 transition-colors text-left truncate block max-w-xs">{contract.name}</button></td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{contract.type}</td>
                <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.party}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.effective}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.expiry}</td>
                <td className="px-4 py-3">{statusBadge(contract.status)}</td>
                <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.owner}</td>
                <td className="px-4 py-3 font-mono font-semibold text-foreground whitespace-nowrap">{contract.value || "—"}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2">
                  <button title="View" onClick={() => onSelectContract(contract.id)} className="text-muted-foreground hover:text-blue-600"><Eye size={13}/></button>
                  <button title="Edit" onClick={() => setEditingContract(contract)} className="text-muted-foreground hover:text-foreground"><Edit size={13}/></button>
                  <button title="Delete" onClick={() => removeContract(contract)} className="text-muted-foreground hover:text-red-600"><Trash2 size={13}/></button>
                </div></td>
              </tr>)}
            </tbody>
          </table>
          {!loading && contracts.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">{error ? `Couldn't load contracts: ${error}` : "No contracts match your search criteria."}</div>}
          {loading && <div className="text-center py-12 text-sm text-muted-foreground">Loading contracts…</div>}
        </div>
        <div className="px-5 py-3 border-t border-border"><p className="text-xs text-muted-foreground">Showing {contracts.length} of {summary.total} contracts</p></div>
      </Card>

      {showNewContract && <NewContractModal onClose={() => setShowNewContract(false)} onCreated={refetch} />}
      {editingContract && <NewContractModal contract={editingContract} onClose={() => setEditingContract(null)} onCreated={async () => { setEditingContract(null); await refetch(); }} />}
    </div>
  );
}
