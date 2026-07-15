import React from "react";
import {
  FaHome,
  FaClipboardCheck,
  FaFolderOpen,
  FaTasks,
  FaChartBar,
  FaBell,
  FaChevronLeft,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
    <div className="logo">
  <div className="logo-icon">
    CI
  </div>

  <h2>
    Contract<span>IQ</span>
  </h2>
</div>

      {/* User Card */}
     <div className="profile-card">
    <p className="signed-text">SIGNED IN AS</p>

    <div className="profile-info">
        <div className="profile-avatar">
            SC
        </div>

        <div>
            <h4 className="user-name">Sarah Chen</h4>
            <p className="user-role">Compliance Officer</p>
        </div>
    </div>
</div>

      {/* Workspace */}
      <div className="menu-section">
        <p className="section-title">WORKSPACE</p>

        <div className="menu-item">
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div className="menu-item active-menu">
          <FaClipboardCheck />
          <span>Compliance</span>
        </div>

        <div className="menu-item">
          <FaFolderOpen />
          <span>Contract Repository</span>
        </div>

        <div className="menu-item">
          <FaTasks />
          <span>Obligation Tracker</span>
        </div>
      </div>

      {/* Reports */}
      <div className="menu-section">
        <p className="section-title">REPORTS</p>

        <div className="menu-item">
          <FaChartBar />
          <span>Reports & Export</span>
        </div>
      </div>

      {/* Tools */}
      <div className="menu-section">
        <p className="section-title">TOOLS</p>

        <div className="menu-item">
          <FaBell />
          <span>Notification Center</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="sidebar-footer">
        <FaChevronLeft />
        <span>Collapse sidebar</span>
      </div>
    </aside>
  );
};

export default Sidebar;