import {
  FaSearch,
  FaBell,
  FaCheckDouble,
  FaUserCircle,
} from "react-icons/fa";

function Header({ handleReadAll }) {
  return (
    <header className="dashboard-header">

      <div className="d-flex justify-content-between align-items-center flex-wrap">

        {/* Left Section */}
        <div>

          <div className="d-flex align-items-center mb-2">

            <span className="breadcrumb-text">
              Dashboard
            </span>

            <span className="mx-2 text-secondary">
              /
            </span>

            <span className="breadcrumb-active">
              Notifications
            </span>

          </div>

          <h2 className="page-title">
            Notification Dashboard
          </h2>

          <p className="page-subtitle">
            Monitor alerts, reminders and system notifications.
          </p>

        </div>

        {/* Right Section */}

        <div className="d-flex align-items-center gap-3 flex-wrap">

          {/* Search */}

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search notifications..."
            />

          </div>

          {/* Notification */}

          <button className="icon-btn">

            <FaBell />

            <span className="notification-dot"></span>

          </button>

          {/* Mark Read */}

          <button
          className="mark-btn"
          onClick={handleReadAll}
          >

            <FaCheckDouble className="me-2" />

            Mark All Read

          </button>

          {/* Profile */}

          <div className="profile-box">

            <FaUserCircle size={38} />

            <div className="ms-2">

              <h6 className="mb-0">
                Admin
              </h6>

              <small>
                Administrator
              </small>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;