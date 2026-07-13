import { useRef, useState } from "react";
import { FileUp, Trash2 } from "lucide-react";
import PageLayout from "../layout/PageLayout";
import { addStoredContract, getStoredContracts, removeStoredContract } from "../services/contractRepository";

const initialForm = { title: "", counterparty: "", category: "General", status: "Active", expiryDate: "" };

export default function Repository() {
  const [contracts, setContracts] = useState(getStoredContracts);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  function submit(event) {
    event.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Choose a contract file before adding it to the repository." });
      return;
    }
    addStoredContract({ ...form, title: form.title.trim() || file.name.replace(/\.[^/.]+$/, ""), fileName: file.name });
    setContracts(getStoredContracts());
    setForm(initialForm);
    setFile(null);
    inputRef.current.value = "";
    setMessage({ type: "success", text: `${file.name} was added to the repository.` });
  }

  function remove(id) {
    removeStoredContract(id);
    setContracts(getStoredContracts());
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "ContractIQ", to: "/dashboard" }, { label: "Repository" }]}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-slate-900">Contract Repository</h1>
          <p className="mt-1 text-sm text-slate-500">Upload a contract here. The dashboard updates from these records.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-10 text-center hover:border-blue-500">
              <FileUp className="mb-3 text-blue-600" size={30} />
              <span className="font-medium text-slate-700">{file ? file.name : "Choose a contract file"}</span>
              <span className="mt-1 text-xs text-slate-400">PDF, DOCX, or other contract file</span>
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setMessage(null); }} />
            </label>
            <p className="text-xs text-slate-500"><span className="font-semibold text-red-600">Required:</span> contract file. All other fields are optional.</p>
            {message && <p role="status" className={`rounded-lg px-3 py-2 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{message.text}</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Contract title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
              <Input label="Counterparty" value={form.counterparty} onChange={(value) => setForm({ ...form, counterparty: value })} />
              <Input label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
              <Input label="Expiry date" type="date" value={form.expiryDate} onChange={(value) => setForm({ ...form, expiryDate: value })} />
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" type="submit">Add to repository</button>
          </form>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Uploaded contracts</h2>
          <div className="mt-4 space-y-3">
            {contracts.length === 0 ? <p className="text-sm text-slate-400">No contracts uploaded yet.</p> : contracts.map((contract) => <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3" key={contract.id}><div className="min-w-0"><p className="truncate text-sm font-medium text-slate-800">{contract.title}</p><p className="truncate text-xs text-slate-400">{contract.fileName}</p></div><button onClick={() => remove(contract.id)} className="text-slate-400 hover:text-red-600" aria-label={`Remove ${contract.title}`}><Trash2 size={16} /></button></div>)}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" /></label>;
}