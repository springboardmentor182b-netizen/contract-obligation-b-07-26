import "./RiskSummaryCard.css";

function RiskSummaryCard({
  title,
  value,
  badge,
  icon,
  iconBg,
  badgeBg,
  badgeColor,
}) {
  return (
    <div className="risk-summary-card">

      <div className="risk-summary-top">

        <div
          className="risk-summary-icon"
          style={{ background: iconBg }}
        >
          {icon}
        </div>

        <span
          className="risk-summary-badge"
          style={{
            background: badgeBg,
            color: badgeColor,
          }}
        >
          {badge}
        </span>

      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default RiskSummaryCard;
