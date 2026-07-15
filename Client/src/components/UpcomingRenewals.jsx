const renewals = [
  {
    name: "Office Lease – Floor 12 & 13",
    owner: "Tom Weston",
    expiry: "2024-12-31",
    risk: "High Risk",
    days: "26 days left",
    color: "high",
  },
  {
    name: "Microsoft Azure Enterprise Agreement",
    owner: "Sarah Chen",
    expiry: "2025-03-15",
    risk: "Medium Risk",
    days: "52 days left",
    color: "medium",
  },
  {
    name: "Data Processing Agreement – EU",
    owner: "James Park",
    expiry: "2025-05-20",
    risk: "Low Risk",
    days: "78 days left",
    color: "low",
  },
];

function UpcomingRenewals() {
  return (
    <div className="renewals-card">

      <div className="renewals-header">
        <div>
          <h2>Upcoming Renewals</h2>
          <p>Contracts requiring attention soon</p>
        </div>

        <div className="renewal-filter">
          <button className="active">30d</button>
          <button>60d</button>
          <button>90d</button>
        </div>
      </div>

      {renewals.map((item, index) => (
        <div className="renewal-item" key={index}>

          <div className="renewal-details">
            <h4>{item.name}</h4>

            <p>
              {item.owner} • {item.expiry}
            </p>

            <div className="renewal-bottom">
              <span className={`risk ${item.color}`}>
                {item.risk}
              </span>

              <span className="days">
                {item.days}
              </span>
            </div>
          </div>

          <a href="#" className="renew-link">
            Renew →
          </a>

        </div>
      ))}

    </div>
  );
}

export default UpcomingRenewals;