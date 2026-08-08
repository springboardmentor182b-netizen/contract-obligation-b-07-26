import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { fetchContractStats } from "../api";
import "./StatusTabs.css";

const statusConfig = [
  { id: "All", label: "All", type: "all", key: "total" },
  { id: "Draft", label: "Draft", type: "draft", key: "draft" },
  { id: "Under Review", label: "Under Review", type: "review", key: "under_review" },
  { id: "Approved", label: "Approved", type: "approved", key: "approved" },
  { id: "Active", label: "Active", type: "active", key: "active" },
  { id: "Expired", label: "Expired", type: "expired", key: "expired" },
  { id: "Terminated", label: "Terminated", type: "terminated", key: "terminated" },
];

const StatusTabs = ({ selectedStatus, setSelectedStatus }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchContractStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch contract stats:", error);
      }
    };
    loadStats();
  }, []);

  const statuses = statusConfig.map(status => ({
    ...status,
    count: stats[status.key] || 0
  }));

  return (
    <div className="status-flow">
      {statuses.map((status, index) => (
        <React.Fragment key={status.id}>
          <div
            className={`status-node ${
              selectedStatus === status.id ? "active" : ""
            }`}
            onClick={() => setSelectedStatus(status.id)}
            style={{ cursor: "pointer" }}
          >
            <span className={`status-count status-count-${status.type}`}>
              {status.count}
            </span>

            <span className="status-label">{status.label}</span>
          </div>

          {index < statuses.length - 1 && (
            <div className="status-arrow">
              <FiArrowRight />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusTabs;