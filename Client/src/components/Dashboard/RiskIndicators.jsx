import React from "react";
import {
  FaExclamationTriangle,
  FaFileContract,
  FaUserSlash,
  FaClipboardList,
  FaSyncAlt,
} from "react-icons/fa";

import { risks } from "../../Data/dashboardData";

const getIcon = (title) => {
  if (title.includes("Expired"))
    return <FaFileContract />;

  if (title.includes("owner"))
    return <FaUserSlash />;

  if (title.includes("Obligations"))
    return <FaExclamationTriangle />;

  if (title.includes("documentation"))
    return <FaClipboardList />;

  return <FaSyncAlt />;
};

const getClass = (level) => {
  switch (level) {
    case "High":
      return "level high";

    case "Medium":
      return "level medium";

    default:
      return "level low";
  }
};

const RiskIndicators = () => {
  return (
    <div>

      <h2 style={{ marginBottom: "20px" }}>
        Risk Indicators
      </h2>

      <div className="risk-grid">

        {risks.map((risk, index) => (

          <div
            className="risk-card"
            key={index}
          >

            <div
              style={{
                fontSize: 28,
                color: "#2563EB",
                marginBottom: 18,
              }}
            >
              {getIcon(risk.title)}
            </div>

            <h3>{risk.title}</h3>

            <h1
              style={{
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              {risk.count}
            </h1>

            <span className={getClass(risk.level)}>
              {risk.level}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RiskIndicators;