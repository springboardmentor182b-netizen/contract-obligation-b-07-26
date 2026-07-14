function Navbar({ onToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="toggle-button" onClick={onToggle}>
          ?
        </button>
        <div className="topbar-title-group">
          <p className="page-tag">Renewal Management</p>
          <h2>Contract Obligation Tracker</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <span className="search-icon">??</span>
          <input placeholder="Search contracts, obligations" />
        </div>
        <div className="profile-card">
          <div className="profile-avatar">SC</div>
          <div className="profile-details">
            <div className="profile-name">Sarah Chen</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
