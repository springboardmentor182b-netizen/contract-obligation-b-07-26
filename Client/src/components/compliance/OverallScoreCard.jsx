const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = 78;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function tierFor(score) {
  if (score >= 85) return { color: "#22C55E", label: "Excellent" };
  if (score >= 65) return { color: "#F59E0B", label: "Good" };
  return { color: "#EF4444", label: "Needs Attention" };
}

export default function OverallScoreCard({ score, deltaLabel }) {
  const progress = (score / 100) * CIRCUMFERENCE;
  const tier = tierFor(score);

  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#98A2B3]">
        Overall Compliance Score
      </p>

      <div className="mt-6 flex flex-col items-center">
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
            <span className="text-4xl font-bold text-[#1F2937]">{score}</span>
            <span className="text-xs text-[#98A2B3]">%</span>
          </div>
        </div>

        <span
          className="mt-4 rounded-full px-4 py-1.5 text-sm font-medium"
          style={{ color: tier.color, backgroundColor: `${tier.color}1A` }}
        >
          {tier.label}
        </span>

        {deltaLabel && (
          <p className="mt-3 text-xs text-[#6B7280]">{deltaLabel}</p>
        )}
      </div>
    </div>
  );
}
