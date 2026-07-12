import {
  FaTachometerAlt,
  FaBuilding,
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
    <aside className="sidebar">
      <div>
        <div className="logo-section">
          <FaFileContract className="logo-icon" />
          <div className="logo-text">
            <h2>ContractIQ</h2>
            <p>COMPLIANCE PLATFORM</p>
          </div>
        </div>

        <div className="company-card">
          <div className="company-icon">
            <FaBuilding/>
          </div>
          <div className="company-info">
            <h3>Nexora Group</h3>
            <p>Enterprise · 214 Contracts</p>
          </div>
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

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>

        <div className="profile-card">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>Jennifer Davis</h4>
            <p>Chief Compliance Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;