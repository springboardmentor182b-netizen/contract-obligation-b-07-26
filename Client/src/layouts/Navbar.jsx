import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search contracts & obligations..."
        />
      </div>

      <div className="navbar-right">

        <div className="notification">
          <FaBell />
        </div>

        <div className="user-info">

          <div className="user-avatar">
            R
          </div>

          <div>
            <h4>Rakhi</h4>
            <small>Administrator</small>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;