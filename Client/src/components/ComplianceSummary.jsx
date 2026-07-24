import {
  FaShieldAlt,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getComplianceSummary } from "../api/dashboardApi";

function ComplianceSummary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await getComplianceSummary();
        setSummary(response);
      } catch (error) {
        console.error("Error fetching compliance summary:", error);
      }
    }

    fetchSummary();
  }, []);

  const cardClass = {
    Compliant: "green",
    Pending: "orange",
    Delayed: "red",
    "Non-Compliant": "pink",
    "High Risk": "purple",
  };

  const iconMap = {
    Compliant: <FaShieldAlt />,
    Pending: <FaClock />,
    Delayed: <FaShieldAlt />,
    "Non-Compliant": <FaShieldAlt />,
    "High Risk": <FaExclamationCircle />,
  };

  return (
    <div className="summary-section">
      {summary.map((item) => (
        <div
          key={item.name}
          className={`summary-card ${cardClass[item.name]}`}
        >
          {iconMap[item.name]}
          <div>
            <h2>{item.value}</h2>
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComplianceSummary;