import React from "react";
import {
  FiSearch,
  FiBell,
  FiPlus,
  FiUpload,
  FiChevronRight,
} from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ onNewContract }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="breadcrumb">
          <span className="breadcrumb-item">ContractIQ</span>
          <FiChevronRight className="breadcrumb-separator" />
          <span className="breadcrumb-item current">Contracts</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-actions">
          <button className="btn btn-secondary">
            <FiUpload className="btn-icon" />
            Import
          </button>

          <button
            className="btn btn-primary"
            onClick={onNewContract}
          >
            <FiPlus className="btn-icon" />
            New Contract
          </button>
        </div>

        <div className="nav-global-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="nav-search-input"
          />
        </div>

        <button className="icon-btn notification-btn">
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">PS</div>

          <div className="user-info">
            <span className="user-name">
              Pragna Sree
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;