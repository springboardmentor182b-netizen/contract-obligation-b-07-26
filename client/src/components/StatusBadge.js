import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'badge-active';
      case 'approved':
        return 'badge-approved';
      case 'under review':
        return 'badge-review';
      case 'draft':
        return 'badge-draft';
      case 'expired':
        return 'badge-expired';
      case 'terminated':
        return 'badge-terminated';
      default:
        return 'badge-default';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
