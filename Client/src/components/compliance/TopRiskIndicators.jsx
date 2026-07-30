const SEVERITY_STYLES = {
  Critical: "text-[#EF4444] bg-[#FEECEB]",
  High: "text-[#B54708] bg-[#FFF4E5]",
  Medium: "text-[#5925DC] bg-[#F1EBFF]",
};

const DOT_COLOR = {
  Critical: "#EF4444",
  High: "#F59E0B",
  Medium: "#8B5CF6",
};

export default function TopRiskIndicators({ items, onViewAll }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#1F2937]">Top Risk Indicators</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-[#D4AF37] hover:underline"
          >
            View all &rsaquo;
          </button>
        )}
      </div>

      {items.length === 0 && (
        <p className="mt-4 text-sm text-[#98A2B3]">No open high-priority risks right now.</p>
      )}

      <ul className="mt-4 divide-y divide-[#ECE7DE]">
        {items.map((item) => (
          <li key={item.title} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: DOT_COLOR[item.severity] ?? "#98A2B3" }}
              />
              <div>
                <p className="text-sm font-medium text-[#1F2937]">{item.title}</p>
                <p className="text-xs text-[#98A2B3]">{item.meta}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                SEVERITY_STYLES[item.severity] ?? "text-[#6B7280] bg-[#F1F5F9]"
              }`}
            >
              {item.severity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
