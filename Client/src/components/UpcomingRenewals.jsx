import { FaHistory, FaArrowRight } from "react-icons/fa";

const renewals = [
  {
    name: "Office Lease – Floor 12 & 13",
    owner: "Tom Weston",
    expiry: "2024-12-31",
    days: 26,
    risk: "High Risk",
  },
  {
    name: "Microsoft Azure Enterprise Agreement",
    owner: "Sarah Chen",
    expiry: "2025-03-15",
    days: 52,
    risk: "Medium Risk",
  },
  {
    name: "Data Processing Agreement – EU",
    owner: "James Park",
    expiry: "2025-05-20",
    days: 78,
    risk: "Low Risk",
  },
];

export default function UpcomingRenewals() {
  return (
    <div className="renewals-card">

      <div className="renewals-header">

        <div className="left">
          <h3>
            <FaHistory />
            Upcoming Renewals
          </h3>

          <span className="badge">
            3 expiring soon
          </span>
        </div>

        <div className="filters">
          <button>30 days</button>
          <button>60 days</button>
          <button>90 days</button>
        </div>

      </div>

      {renewals.map((item, index) => {

        const riskClass = item.risk.toLowerCase().replace(/\s+/g, "-");

        return (

          <div className="renewal-row" key={index}>

            <div className="renewal-left">

              <div className="renewal-icon">
                <FaHistory />
              </div>

              <div>
                <h4>{item.name}</h4>

                <p>
                  Owner: {item.owner}
                  &nbsp;&nbsp;&nbsp;
                  Expires: {item.expiry}
                </p>
              </div>

            </div>

            <div className="renewal-right">

              <div className="days">

                <div className={`days-number ${riskClass}`}>
                  {item.days}
                </div>

                <div className="days-text">
                  days left
                </div>

              </div>

              <div className={`risk-badge ${riskClass}`}>
                {item.risk}
              </div>

              <button className="renew-btn">
                Renew
                <FaArrowRight />
              </button>

            </div>

          </div>

        );
      })}

    </div>
  );
}