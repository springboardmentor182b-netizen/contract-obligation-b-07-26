import './KPICard.css'

function KPICard({ title, value, badge, icon, iconBg, badgeBg, badgeColor }) {
  return (
    <div className="kpi-card">
      <div className="top">
        <div className="icon" style={iconBg ? { background: iconBg } : undefined}>{icon}</div>
        <span className="badge" style={badgeBg || badgeColor ? { background: badgeBg, color: badgeColor } : undefined}>{badge}</span>
      </div>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  )
}

export default KPICard
