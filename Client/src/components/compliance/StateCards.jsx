export function LoadingCard({ label = "Loading\u2026" }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-[#ECE7DE] bg-white p-6 text-sm text-[#98A2B3]">
      {label}
    </div>
  );
}

export function ErrorCard({ message = "Couldn't load this data.", onRetry }) {
  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#B42318]">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-[#B42318] px-3 py-1 text-xs font-medium hover:bg-[#FEECEB]"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyCard({ label = "No data yet." }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-[#ECE7DE] bg-white p-6 text-sm text-[#98A2B3]">
      {label}
    </div>
  );
}
