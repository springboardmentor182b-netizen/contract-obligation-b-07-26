import {
  FaSearch,
  FaBell,
  FaPlus,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">
      <div className="search-container">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search contracts, obligations, parties..."
        />
      </div>

      <div className="navbar-right">

        <button className="new-contract-btn">
          <FaPlus />
          <span>New Contract</span>
        </button>

        <div className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </div>

        <div className="top-profile">
          <FaUserCircle className="top-avatar" />

          <div>
            <h4>Jennifer Davis</h4>
            <p>CCO . Nexora Group</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;