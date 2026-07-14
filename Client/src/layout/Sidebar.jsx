function Sidebar({ open, onToggle }) {
  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">C</div>
        {open && <div className="brand-text">ContractIQ</div>}
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <span className="nav-icon">??</span>
          {open && <span>Renewal Management</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">??</span>
          {open && <span>Contract Repository</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">???</span>
          {open && <span>Compliance</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">??</span>
          {open && <span>Notification Center</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">??</span>
          {open && <span>Admin Panel</span>}
        </button>
      </nav>

      <button className="sidebar-toggle" onClick={onToggle}>
        {open ? 'Collapse Sidebar' : 'Expand Sidebar'}
      </button>
    </aside>
  )
}

export default Sidebar
