import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiGlobe,
  FiCreditCard,
  FiDatabase,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";

function OrganizationSettings() {
  const [organizationData, setOrganizationData] = useState([]);

  useEffect(() => {
    // Fetch organization details from backend later
    // Example:
    // fetch("http://localhost:8000/settings/organization")
    //   .then((res) => res.json())
    //   .then((data) => setOrganizationData(data));
  }, []);

  const iconMap = {
    company: <FiBriefcase />,
    domain: <FiGlobe />,
    billing: <FiCreditCard />,
    region: <FiDatabase />,
    timezone: <FiClock />,
    support: <FiHeadphones />,
  };

  return (
    <div className="organization-section">

      <h2 className="section-title">
        Organization Settings
      </h2>

      <p className="section-subtitle">
        Manage your company information, billing, and organizational preferences.
      </p>

      <div className="organization-card">

        {organizationData.length === 0 ? (
          <p className="organization-empty">
            No organization data available.
          </p>
        ) : (
          organizationData.map((item) => (
            <div
              key={item.title}
              className="organization-row"
            >
              <div className="organization-left">

                <div className="organization-icon">
                  {iconMap[item.type]}
                </div>

                <div>
                  <h5 className="organization-title">
                    {item.title}
                  </h5>

                  <p className="organization-value">
                    {item.value}
                  </p>
                </div>

              </div>

              <button className="edit-btn">
                Edit
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default OrganizationSettings;