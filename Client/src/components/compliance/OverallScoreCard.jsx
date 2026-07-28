const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = 78;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function tierFor(score) {
  if (score >= 85) return { color: "#10B981", bg: "bg-emerald-50 text-emerald-600", label: "Excellent Health" };
  if (score >= 65) return { color: "#F59E0B", bg: "bg-amber-50 text-amber-600", label: "Moderate Risk" };
  return { color: "#EF4444", bg: "bg-rose-50 text-rose-600", label: "Needs Attention" };
}

export default function OverallScoreCard({ score, totalContracts }) {
  const progress = (score / 100) * CIRCUMFERENCE;
  const tier = tierFor(score);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Overall Compliance Score
      </p>

      <div className="mt-4 flex flex-col items-center">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={STROKE}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={tier.color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${progress} ${CIRCUMFERENCE - progress}`}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-900">{score}</span>
            <span className="text-xs font-semibold text-slate-400">%</span>
          </div>
        </div>

        <span className={`mt-4 rounded-full px-4 py-1 text-xs font-bold ${tier.bg}`}>
          {tier.label}
        </span>

        <p className="mt-3 text-xs font-medium text-slate-500">
          Evaluated from <span className="font-bold text-slate-700">{totalContracts}</span> active contract{totalContracts === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}