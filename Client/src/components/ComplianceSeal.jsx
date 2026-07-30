// Signature element: a radial gauge styled like an audit/notary seal,
// with tick marks like a certification stamp rather than a generic donut chart.

const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TICKS = 40;

export default function ComplianceSeal({ score }) {
  const progress = (score / 100) * CIRCUMFERENCE;
  const dashArray = `${progress} ${CIRCUMFERENCE - progress}`;

  const tone =
    score >= 85
      ? { ring: "#12805C", bg: "#E7F6EF", label: "Strong" }
      : score >= 65
      ? { ring: "#B54708", bg: "#FFF4E5", label: "Watch" }
      : { ring: "#B42318", bg: "#FEECEB", label: "Critical" };

  return (
    <div className="flex flex-col items-center rounded-card border border-border bg-surface p-6 shadow-card">
      <p className="mb-4 self-start text-sm font-medium text-ink-soft">
        Overall Compliance Score
      </p>

      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* outer tick ring, like a seal's engraved edge */}
          {Array.from({ length: TICKS }).map((_, i) => {
            const angle = (i / TICKS) * 2 * Math.PI;
            const x1 = CENTER + (RADIUS + 14) * Math.cos(angle);
            const y1 = CENTER + (RADIUS + 14) * Math.sin(angle);
            const x2 = CENTER + (RADIUS + 19) * Math.cos(angle);
            const y2 = CENTER + (RADIUS + 19) * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D0D5DD"
                strokeWidth={1.5}
              />
            );
          })}

          {/* track */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill={tone.bg}
            stroke="#EAECF0"
            strokeWidth={10}
          />

          {/* progress ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={tone.ring}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-semibold text-ink">
            {score}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            / 100
          </span>
        </div>
      </div>

      <span
        className="mt-4 rounded-full px-3 py-1 font-mono text-xs font-medium"
        style={{ color: tone.ring, backgroundColor: tone.bg }}
      >
        {tone.label} standing
      </span>
    </div>
  );
}
