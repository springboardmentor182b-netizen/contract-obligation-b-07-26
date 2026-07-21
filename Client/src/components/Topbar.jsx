import { Bell, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4 lg:px-8">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">
          Compliance Dashboard
        </h1>
        <p className="text-sm text-ink-soft">
          Contract compliance status across all active vendors
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="focus-ring relative rounded-md p-2 text-ink-soft hover:bg-bg">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-expired" />
        </button>
        <button className="focus-ring flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          <Plus className="h-4 w-4" />
          New Contract
        </button>
      </div>
    </header>
  );
}
