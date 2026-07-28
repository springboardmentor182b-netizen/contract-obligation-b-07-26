import React from "react";
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaTasks,
  FaSyncAlt,
  FaShieldAlt,
  FaChartBar,
  FaClipboardList,
  FaBell,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaFileContract,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-border bg-surface min-h-screen justify-between p-4">
      <div>
        <div className="logo-section">
          <FaFileContract className="logo-icon" />
          <div>
            <h2>ContractIQ</h2>
            <p>Compliance Platform</p>
          </div>
        </div>

        <div className="company-card">
          <h3>Nexora Group</h3>
          <span>234 Contracts</span>
        </div>
        <h4 className="menu-heading">MAIN MENU</h4>
        <ul className="menu">
          <li className="active"><FaTachometerAlt /> Dashboard</li>
          <li><FaFolderOpen /> Contract Repository</li>
          <li><FaTasks /> Obligation Tracking</li>
          <li><FaSyncAlt /> Renewal Management</li>
          <li><FaShieldAlt /> Compliance Monitoring</li>
          <li><FaChartBar /> Reports & Export</li>
          <li><FaClipboardList /> Audit Logs</li>
        </ul>

        <h4 className="menu-heading">ACCOUNT</h4>

        <ul className="menu">
          <li>
            <div className="menu-left">
              <FaBell /> 
              <span>  Notifications</span>
            </div>
            <span className="notification-badge">5</span>
          </li>
          <li><FaUsers /> User Management</li>
          <li><FaCog /> Settings</li>
        </ul>
      </div>

      {/* Footer / Profile */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-bg cursor-pointer">
          <div className="flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-brand bg-brand-light p-1.5 rounded-full" />
            <div>
              <p className="text-xs font-semibold text-ink">Jennifer Davis</p>
              <p className="text-[11px] text-ink-faint">Chief Compliance Officer</p>
            </div>
          </div>
        </div>

        <p className="font-mono text-[10px] text-ink-faint text-center">
          Audit sync: Jul 14, 2026
        </p>
      </div>
    </aside>
  );
}