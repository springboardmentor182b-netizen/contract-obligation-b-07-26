<<<<<<< HEAD
import { Search, Bell } from "lucide-react";

export function Navbar({ title, subtitle, userName = "Sarah Chen", userRole = "Legal Manager" }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div>
        <h1 className="text-sm font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contracts, obligations…"
            className="pl-8 pr-3 py-1.5 bg-muted border border-border rounded-lg text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
            {userName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="text-xs">
            <p className="font-semibold text-foreground leading-tight">{userName}</p>
            <p className="text-muted-foreground leading-tight">{userRole}</p>
=======
function Navbar({ onToggle, onSearchChange, notifications = [], onToggleNotifications }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="toggle-button" onClick={onToggle} aria-label="Toggle sidebar">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="topbar-title-group">
          <p className="page-tag">Renewal Management</p>
          <h2>Contract Obligation Tracker</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <input placeholder="Search contracts, obligations" onChange={e => onSearchChange?.(e.target.value)} />
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={onToggleNotifications} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Notifications">
            <div style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 8C18 5.23858 15.7614 3 13 3H11C8.23858 3 6 5.23858 6 8V13C6 14.0543 5.57857 15.0533 4.82843 15.8284L4 16.6569V17H20V16.6569L19.1716 15.8284C18.4214 15.0533 18 14.0543 18 13V8Z" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', right: -6, top: -6, background: '#ef4444', color: '#fff', borderRadius: 999, padding: '2px 6px', fontSize: 11 }}>{notifications.length}</span>
              )}
            </div>
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">SC</div>
          <div className="profile-details">
            <div className="profile-name">Sarah Chen</div>
            <div className="profile-role">Administrator</div>
>>>>>>> 5b0fc5b9d (Fixed Tailwind setup, cleared git cache, and secured environment variables)
          </div>
        </div>
      </div>
    </header>
<<<<<<< HEAD
  );
}
=======
  )
}

export default Navbar
>>>>>>> 5b0fc5b9d (Fixed Tailwind setup, cleared git cache, and secured environment variables)
