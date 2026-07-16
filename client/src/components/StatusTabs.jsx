import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./StatusTabs.css";

const statuses = [
  { id: "All", label: "All", count: 12, type: "all" },
  { id: "Draft", label: "Draft", count: 1, type: "draft" },
  { id: "Under Review", label: "Under Review", count: 1, type: "review" },
  { id: "Approved", label: "Approved", count: 1, type: "approved" },
  { id: "Active", label: "Active", count: 7, type: "active" },
  { id: "Expired", label: "Expired", count: 1, type: "expired" },
  { id: "Terminated", label: "Terminated", count: 1, type: "terminated" },
];

const StatusTabs = ({ selectedStatus, setSelectedStatus }) => {
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