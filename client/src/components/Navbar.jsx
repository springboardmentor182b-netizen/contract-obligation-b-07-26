import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiPlus,
  FiUpload,
  FiChevronRight,
} from "react-icons/fi";
import { get } from "../api";
import "./Navbar.css";

const Navbar = ({ onNewContract }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await get("/auth/me");
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

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

          <button className="btn btn-primary" onClick={onNewContract}>
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
          <div className="avatar">
            {user?.full_name
              ? user.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </div>

          <div className="user-info">
            <span className="user-name">
              {user?.full_name || "Loading..."}
            </span>

            <span className="user-role">
              {user?.role || ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;