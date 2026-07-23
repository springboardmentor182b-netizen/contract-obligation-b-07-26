import React from 'react';
import { FiFilter, FiDownload } from 'react-icons/fi';
import './ContractHeader.css';

const ContractHeader = () => {
  return (
    <div className="contract-header">
      <div className="header-titles">
        <h1 className="page-title">Contract Management</h1>
        <p className="page-subtitle">Create, edit, and manage the full contract lifecycle</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-secondary action-btn">
          <FiFilter className="btn-icon" />
          Filter
        </button>
        <button className="btn btn-secondary action-btn">
          <FiDownload className="btn-icon" />
          Export
        </button>
      </div>
    </div>
  );
};

export default ContractHeader;
