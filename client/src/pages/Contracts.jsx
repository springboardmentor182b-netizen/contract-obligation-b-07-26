import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import PageLayout from "../layout/PageLayout";
import { getStoredContracts, removeStoredContract, updateStoredContract } from "../services/contractRepository";

const STATUSES = ["Active", "Draft", "Under Review", "Expired", "Terminated"];

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getStoredContracts().then(setContracts);
  }, []);

  async function refresh() {
    setContracts(await getStoredContracts());
  }

  async function remove(id) {
    await removeStoredContract(id);
    await refresh();
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "ContractIQ", to: "/dashboard" }, { label: "Contracts" }]}>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div><h1 className="text-xl font-semibold text-slate-900">Contracts</h1><p className="mt-1 text-sm text-slate-500">Manage contracts stored in the repository.</p></div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{contracts.length} stored</span>
        </div>
        {contracts.length === 0 ? <p className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No contracts are stored yet. Upload one from Repository.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><th className="pb-3 font-medium">Contract</th><th className="pb-3 font-medium">Counterparty</th><th className="pb-3 font-medium">Category</th><th className="pb-3 font-medium">Expiry</th><th className="pb-3 font-medium">Status</th><th className="pb-3 text-right font-medium">Actions</th></tr></thead><tbody>{contracts.map((contract) => <tr key={contract.id} className="border-b border-slate-50 last:border-0"><td className="py-4"><p className="font-medium text-slate-800">{contract.title}</p><p className="text-xs text-slate-400">{contract.fileName}</p></td><td className="py-4 text-slate-600">{contract.counterparty}</td><td className="py-4 text-slate-600">{contract.category}</td><td className="py-4 text-slate-600">{contract.expiryDate || "Not set"}</td><td className="py-4"><Status status={contract.status} /></td><td className="py-4"><div className="flex justify-end gap-2"><button onClick={() => setEditing(contract)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label={`Edit ${contract.title}`}><Pencil size={16} /></button><button onClick={() => remove(contract.id)} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${contract.title}`}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>}
      </div>
      {editing && <EditContract contract={editing} onClose={() => setEditing(null)} onSave={async (changes) => { await updateStoredContract(editing.id, changes); await refresh(); setEditing(null); }} />}
    </PageLayout>
  );
}

function Status({ status }) {
  const colors = { Active: "bg-emerald-50 text-emerald-700", Draft: "bg-slate-100 text-slate-600", "Under Review": "bg-amber-50 text-amber-700", Expired: "bg-red-50 text-red-600", Terminated: "bg-red-50 text-red-600" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[status] ?? colors.Draft}`}>{status}</span>;
}

function EditContract({ contract, onClose, onSave }) {
  const [form, setForm] = useState({ title: contract.title, counterparty: contract.counterparty, category: contract.category, expiryDate: contract.expiryDate ?? "", status: contract.status });
  return <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4"><form onSubmit={(event) => { event.preventDefault(); onSave(form); }} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold text-slate-900">Edit contract</h2><button type="button" onClick={onClose} className="text-sm text-slate-500">Cancel</button></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} /><Field label="Counterparty" value={form.counterparty} onChange={(value) => setForm({ ...form, counterparty: value })} /><Field label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} /><Field label="Expiry date" type="date" value={form.expiryDate} onChange={(value) => setForm({ ...form, expiryDate: value })} /><label className="text-sm font-medium text-slate-700">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Cancel</button><button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save changes</button></div></form></div>;
}

function Field({ label, type = "text", value, onChange }) {
  return <label className="text-sm font-medium text-slate-700">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" /></label>;
}
