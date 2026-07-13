import React, { useState } from "react";
import { Search, Download, Plus, Eye, Edit, ChevronLeft, CheckCircle, Paperclip } from "lucide-react";

// ── Sample data ──────────────────────────────────────────────────────────
// Replace with real data / API calls as needed.
const CONTRACTS = [
  { id: "CT-1001", name: "Master Services Agreement — Accenture", type: "Services", party: "Accenture LLP", effective: "Jan 15, 2024", expiry: "Jan 15, 2026", status: "Active", owner: "Sarah Chen", value: "$1,240,000" },
  { id: "CT-1002", name: "Office Lease — 5th Ave Tower", type: "Lease", party: "Vornado Realty", effective: "Mar 1, 2023", expiry: "Feb 28, 2027", status: "Active", owner: "Michael Grant", value: "$3,600,000" },
  { id: "CT-1003", name: "Software License — DataCore Suite", type: "Software", party: "DataCore Inc.", effective: "Jun 1, 2024", expiry: "May 31, 2025", status: "Expiring Soon", owner: "David Park", value: "$85,000" },
  { id: "CT-1004", name: "Employment Agreement — VP Engineering", type: "Employment", party: "Confidential", effective: "Sep 1, 2023", expiry: "Ongoing", status: "Active", owner: "Lisa Torres", value: "N/A" },
  { id: "CT-1005", name: "Mutual NDA — Northwind Traders", type: "NDA", party: "Northwind Traders", effective: "Nov 10, 2023", expiry: "Nov 10, 2025", status: "Under Review", owner: "Sarah Chen", value: "N/A" },
  { id: "CT-1006", name: "Vendor Agreement — Global Logistics", type: "Vendor", party: "Global Logistics Co.", effective: "Feb 1, 2024", expiry: "Jan 31, 2025", status: "Draft", owner: "David Park", value: "$420,000" },
  { id: "CT-1007", name: "Compliance Audit Retainer", type: "Compliance", party: "KPMG", effective: "Jan 1, 2022", expiry: "Dec 31, 2023", status: "Terminated", owner: "Michael Grant", value: "$150,000" },
];

const OBLIGATIONS = [
  { id: "OB-01", title: "Submit quarterly compliance report", assignee: "Sarah Chen", due: "Jan 31, 2025", priority: "High", status: "Active", category: "Compliance" },
  { id: "OB-02", title: "Renew insurance certificate", assignee: "David Park", due: "Feb 15, 2025", priority: "Medium", status: "Active", category: "Admin" },
  { id: "OB-03", title: "Deliver SOW milestone 3", assignee: "Lisa Torres", due: "Mar 1, 2025", priority: "High", status: "Under Review", category: "Delivery" },
  { id: "OB-04", title: "Vendor performance review", assignee: "Sarah Chen", due: "Mar 20, 2025", priority: "Low", status: "Active", category: "Vendor Mgmt" },
  { id: "OB-05", title: "Confirm auto-renewal notice window", assignee: "Michael Grant", due: "Apr 5, 2025", priority: "Medium", status: "Active", category: "Legal" },
];

// ── Shared UI primitives ────────────────────────────────────────────────
function Card({ className = "", children }) {
  return <div className={`bg-card border border-border rounded-lg ${className}`}>{children}</div>;
}

function SectionLabel({ children }) {
  return <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{children}</h2>;
}

function Badge({ variant = "neutral", children }) {
  // Only uses color families already present in the source design:
  // primary (blue), emerald, and the muted/foreground grays.
  const variants = {
    neutral: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/10 text-emerald-600",
    info: "bg-primary/10 text-primary",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variants[variant] || variants.neutral}`}>
      {children}
    </span>
  );
}

function statusBadge(status) {
  const map = {
    Active: "success",
    "Expiring Soon": "info",
    "Under Review": "info",
    Draft: "neutral",
    Terminated: "neutral",
  };
  return <Badge variant={map[status] || "neutral"}>{status}</Badge>;
}

function priorityBadge(priority) {
  const map = { High: "info", Medium: "neutral", Low: "neutral" };
  return <Badge variant={map[priority] || "neutral"}>{priority}</Badge>;
}

// ── Contract Repository ────────────────────────────────────────────────────
function ContractRepository({ onSelectContract }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = CONTRACTS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.party.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || c.type === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="p-6 space-y-4 max-w-screen-xl">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by name, party, or ID…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none">
          {["All", "Vendor", "Employment", "Lease", "Software", "NDA", "Services", "Compliance"].map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none">
          {["All", "Active", "Expiring Soon", "Under Review", "Draft", "Terminated"].map(s => <option key={s}>{s}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <Download size={13} /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={13} /> New Contract
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Contracts", value: CONTRACTS.length },
          { label: "Active", value: CONTRACTS.filter(c => c.status === "Active").length },
          { label: "Expiring Soon", value: CONTRACTS.filter(c => c.status === "Expiring Soon").length },
          { label: "Showing", value: filtered.length },
        ].map(item => (
          <div key={item.label} className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-xl font-bold font-mono text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted">
                {["ID", "Contract Name", "Type", "Counterparty", "Effective", "Expiry", "Status", "Owner", "Value", ""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(contract => (
                <tr key={contract.id} className="hover:bg-muted/50 transition-colors group cursor-pointer">
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.id}</td>
                  <td className="px-4 py-3 max-w-xs">
                    <button onClick={() => onSelectContract(contract.id)}
                      className="font-semibold text-foreground group-hover:text-blue-600 transition-colors text-left truncate block max-w-xs">
                      {contract.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{contract.type}</td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.party}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.effective}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.expiry}</td>
                  <td className="px-4 py-3">{statusBadge(contract.status)}</td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.owner}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-foreground whitespace-nowrap">{contract.value}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onSelectContract(contract.id)} className="text-muted-foreground hover:text-blue-600 transition-colors"><Eye size={13} /></button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors"><Edit size={13} /></button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors"><Download size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground">No contracts match your search criteria.</div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {CONTRACTS.length} contracts</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 text-xs rounded transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── Contract Detail ────────────────────────────────────────────────────────
function ContractDetail({ contractId, onBack }) {
  const contract = CONTRACTS.find(c => c.id === contractId) || CONTRACTS[0];
  const [activeTab, setActiveTab] = useState("overview");

  const approvalSteps = [
    { step: "Drafting", status: "completed", person: "Lisa Torres", date: "Dec 1, 2023" },
    { step: "Legal Review", status: "completed", person: "Sarah Chen", date: "Jan 8, 2024" },
    { step: "Compliance Check", status: "completed", person: "David Park", date: "Jan 12, 2024" },
    { step: "Executive Approval", status: "completed", person: "Michael Grant — CEO", date: "Jan 14, 2024" },
    { step: "Counterparty Execution", status: "completed", person: "Accenture LLP", date: "Jan 15, 2024" },
    { step: "Active Monitoring", status: "current", person: "Sarah Chen", date: "Ongoing" },
  ];

  const versions = [
    { ver: "v3.0", date: "Jan 15, 2024", author: "Sarah Chen", note: "Final executed version — fully signed" },
    { ver: "v2.1", date: "Jan 10, 2024", author: "David Park", note: "Legal revisions — amended clause 8.2 liability cap" },
    { ver: "v2.0", date: "Dec 20, 2023", author: "Sarah Chen", note: "Counterparty redlines incorporated" },
    { ver: "v1.0", date: "Dec 1, 2023", author: "Lisa Torres", note: "Initial draft" },
  ];

  return (
    <div className="p-6 space-y-4 max-w-screen-xl">
      <div className="flex items-start gap-4 flex-wrap">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0">
          <ChevronLeft size={15} /> Back
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h1 className="text-base font-bold text-foreground">{contract.name}</h1>
            {statusBadge(contract.status)}
            <Badge variant="neutral">{contract.id}</Badge>
            <Badge variant="neutral">v3.0</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{contract.type} · {contract.party} · Owner: {contract.owner}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors">
            <Download size={12} /> Download PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
            <Edit size={12} /> Edit Contract
          </button>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-border">
        {["overview", "obligations", "versions", "documents"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <Card className="p-5">
              <SectionLabel>Contract Metadata</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Contract Type", value: contract.type },
                  { label: "Counterparty", value: contract.party },
                  { label: "Effective Date", value: contract.effective },
                  { label: "Expiration Date", value: contract.expiry },
                  { label: "Contract Value", value: contract.value },
                  { label: "Assigned Owner", value: contract.owner },
                  { label: "Governing Law", value: "State of Delaware, USA" },
                  { label: "Jurisdiction", value: "US Federal Court" },
                  { label: "Auto-Renewal", value: "Yes — 60 days notice" },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <SectionLabel>Key Terms</SectionLabel>
              <div className="space-y-3">
                {[
                  { term: "Payment Terms", detail: "Net-30 from invoice date. Late payment fee of 1.5% per month after 30 days." },
                  { term: "Scope of Services", detail: "Enterprise IT consulting, managed services, and digital transformation advisory per SOW v2.3." },
                  { term: "Termination Clause", detail: "Either party may terminate with 90 days written notice. Immediate termination for material breach with 15-day cure period." },
                  { term: "Liability Cap", detail: "Limited to 12 months of fees paid in the preceding 12-month period. Excludes IP infringement and gross negligence." },
                ].map(t => (
                  <div key={t.term} className="border-l-2 border-blue-200 pl-3.5">
                    <p className="text-xs font-semibold text-foreground">{t.term}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <SectionLabel>Contract Duration</SectionLabel>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Elapsed</span>
                  <span className="font-mono font-semibold text-foreground">35%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }} />
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>{contract.effective}</span>
                  <span>{contract.expiry}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-border">
                {[
                  { label: "Days Elapsed", value: "255" },
                  { label: "Days Remaining", value: "475" },
                  { label: "Total Duration", value: "730 days" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <SectionLabel>Approval Workflow</SectionLabel>
              <div>
                {approvalSteps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.status === "completed" ? "bg-emerald-500" : step.status === "current" ? "bg-blue-500 ring-3 ring-blue-100" : "bg-muted border border-border"
                      }`}>
                        {step.status === "completed" && <CheckCircle size={11} className="text-white" />}
                        {step.status === "current" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      {i < approvalSteps.length - 1 && (
                        <div className={`w-px my-0.5 ${step.status === "completed" ? "bg-emerald-300" : "bg-border"}`} style={{ height: 22 }} />
                      )}
                    </div>
                    <div className="pb-3 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-tight">{step.step}</p>
                      <p className="text-xs text-muted-foreground">{step.person}</p>
                      <p className="text-xs text-muted-foreground font-mono">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "obligations" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["ID", "Obligation", "Assignee", "Due Date", "Priority", "Status", "Category"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {OBLIGATIONS.slice(0, 5).map(obl => (
                  <tr key={obl.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{obl.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{obl.title}</td>
                    <td className="px-4 py-3 text-foreground">{obl.assignee}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{obl.due}</td>
                    <td className="px-4 py-3">{priorityBadge(obl.priority)}</td>
                    <td className="px-4 py-3">{statusBadge(obl.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{obl.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "versions" && (
        <Card className="p-5">
          <SectionLabel>Version History</SectionLabel>
          <div className="divide-y divide-border">
            {versions.map(v => (
              <div key={v.ver} className="flex items-center gap-4 py-3">
                <Badge variant="neutral">{v.ver}</Badge>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{v.note}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.author} · {v.date}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline whitespace-nowrap">
                  <Download size={11} /> Download
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card className="p-5">
          <SectionLabel>Attached Documents</SectionLabel>
          <div className="space-y-2">
            {[
              { name: "MSA_Accenture_v3.0_Executed.pdf", size: "2.4 MB", date: "Jan 15, 2024", type: "PDF" },
              { name: "SOW_v2.3_IT_Consulting.pdf", size: "1.1 MB", date: "Jan 15, 2024", type: "PDF" },
              { name: "Exhibit_A_Pricing_Schedule.xlsx", size: "380 KB", date: "Jan 10, 2024", type: "XLSX" },
              { name: "Legal_Review_Notes_v2.1.docx", size: "245 KB", date: "Jan 10, 2024", type: "DOCX" },
            ].map(doc => (
              <div key={doc.name} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center flex-shrink-0">
                  <Paperclip size={12} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · {doc.date}</p>
                </div>
                <Badge variant="neutral">{doc.type}</Badge>
                <button className="text-muted-foreground hover:text-foreground transition-colors"><Download size={13} /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── App (top-level router between list and detail) ─────────────────────────
export default function App() {
  const [selectedContractId, setSelectedContractId] = useState(null);

  return selectedContractId ? (
    <ContractDetail contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
  ) : (
    <ContractRepository onSelectContract={setSelectedContractId} />
  );
}
