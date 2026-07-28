import { FaClock } from "react-icons/fa";

const deadlines = [
  { title: "GDPR Data Transfer Addendum", contract: "CTR-2026-0155", daysLeft: 4, risk: "high" },
  { title: "SOC 2 Vendor Attestation", contract: "CTR-2026-0161", daysLeft: 12, risk: "medium" },
  { title: "Vendor Insurance Certificate", contract: "CTR-2026-0103", daysLeft: 21, risk: "low" },
];

function DeadlineCard() {
  return (
    <div className="compliance-card">
      <h2>Upcoming Deadlines</h2>
      {deadlines.map((d, i) => (
        <div className="deadline-item" key={i}>
          <div className="deadline-icon"><FaClock /></div>
          <div className="deadline-details">
            <h4>{d.title}</h4>
            <p>{d.contract}</p>
          </div>
          <div className="deadline-right">
            <span className={`risk ${d.risk}`}>{d.risk}</span>
            <span className="days">{d.daysLeft} days left</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeadlineCard;