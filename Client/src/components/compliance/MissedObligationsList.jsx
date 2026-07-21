function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MissedObligationsList({ items }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#1F2937]">Missed Obligations</h3>
        <button className="text-sm font-medium text-[#D4AF37] hover:underline">
          All &rsaquo;
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-between rounded-xl bg-[#FEF2F2] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#374151] shadow-sm">
                {initials(item.owner)}
              </span>
              <div>
                <p className="text-sm font-medium text-[#1F2937]">{item.title}</p>
                <p className="text-xs text-[#98A2B3]">
                  {item.due} &middot; {item.owner}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#EF4444]">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
