import "./StatusTabs.css";

const statuses = [
  { name: "Draft", count: 1 },
  { name: "Under Review", count: 1 },
  { name: "Approved", count: 1 },
  { name: "Active", count: 7 },
  { name: "Expired", count: 1 },
  { name: "Terminated", count: 1 },
];

function StatusTabs() {
  return (
    <div className="status-tabs">
      {statuses.map((status, index) => (
        <div className="status-item" key={status.name}>
          <div className="status-card">
            <span className="count">{status.count}</span>
            <span>{status.name}</span>
          </div>

          {/* Show arrow except after the last item */}
          {index !== statuses.length - 1 && (
            <span className="arrow">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default StatusTabs;