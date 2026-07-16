import { FaHistory, FaArrowRight } from "react-icons/fa";
import {useState,useEffect} from "react";
import { getUpcomingRenewals } from "../api/dashboardApi";


export default function UpcomingRenewals() {
  const [renewals, setRenewals] = useState([]);

useEffect(() => {
  async function fetchRenewals() {
    try {
      const response = await getUpcomingRenewals();
      setRenewals(response);
    } catch (error) {
      console.error("Error fetching upcoming renewals:", error);
    }
  }

  fetchRenewals();
}, []);
  return (
    <div className="renewals-card">

      <div className="renewals-header">

        <div className="left">
          <h3>
            <FaHistory />
            Upcoming Renewals
          </h3>

          <span className="badge">
            {renewals.length}expiring soon
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