import React from "react";
import {
  FaHome,
  FaClipboardCheck,
  FaFolderOpen,
  FaTasks,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { icon: <FaHome />, title: "Dashboard" },
    { icon: <FaClipboardCheck />, title: "Compliance", active: true },
    { icon: <FaFolderOpen />, title: "Contract Repository" },
    { icon: <FaTasks />, title: "Obligation Tracker" },
    { icon: <FaChartBar />, title: "Reports & Export" },
    { icon: <FaBell />, title: "Notification Center" },
  ];

  return (
    <div className="sidebar">

      <div className="logo">
        ContractIQ
      </div>

      <div className="profile">
        <div className="avatar">
          R
        </div>

        <div>
          <h4>Rakhi</h4>
          <small>Administrator</small>
        </div>
      </div>

      <div className="menu">
        {menu.map((item, index) => (
          <div
            key={index}
            className={
              item.active
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            {item.icon}

            <span>{item.title}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;