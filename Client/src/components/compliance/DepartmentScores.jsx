const COLOR_MAP = {
  IT: "bg-emerald-500",
  HR: "bg-emerald-500",
  Legal: "bg-amber-500",
  Operations: "bg-rose-500",
  Marketing: "bg-amber-500",
  Finance: "bg-emerald-500",
};

export default function DepartmentScores({ data }) {
  const departments = data && data.length > 0 ? data : [
    { department: "IT", score: 92 },
    { department: "HR", score: 88 },
    { department: "Legal", score: 75 },
    { department: "Operations", score: 68 },
    { department: "Marketing", score: 82 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">Department Compliance Scores</h3>

      <div className="mt-6 space-y-4">
        {departments.map((item) => (
          <div key={item.department} className="flex items-center gap-4">
            <span className="w-20 text-xs font-semibold text-slate-600 text-right">
              {item.department}
            </span>
            <div className="relative h-3.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  COLOR_MAP[item.department] || "bg-emerald-500"
                }`}
                style={{ width: `${item.score}%` }}
              />
            </div>
            <span className="w-8 text-xs font-bold text-slate-700">{item.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}