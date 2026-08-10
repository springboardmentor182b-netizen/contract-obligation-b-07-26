import React, { useState, useEffect } from 'react';
import ObligationTracker from './ObligationTracker';
import NotificationsPanel from './NotificationsPanel';
import KanbanView from './KanbanView';
import ListView from './ListView';
import AnalyticsPanel from './AnalyticsPanel';
import SettingsPanel from './SettingsPanel';
import UserProfileCard from './UserProfileCard';
import SearchBar from './SearchBar';
import SidebarMenu from './SidebarMenu';
import Footer from './Footer';

// Mock data for obligations, notifications, analytics
const mockObligations = [
  { id: 1, title: 'Contract Renewal', dueDate: '2026-07-15', status: 'Pending' },
  { id: 2, title: 'Payment Milestone', dueDate: '2026-07-20', status: 'Completed' },
  { id: 3, title: 'Compliance Check', dueDate: '2026-07-25', status: 'In Progress' },
];

const mockNotifications = [
  { id: 1, message: 'New contract uploaded', type: 'info' },
  { id: 2, message: 'Payment milestone reached', type: 'success' },
  { id: 3, message: 'Compliance deadline approaching', type: 'warning' },
];

const mockAnalytics = {
  contractsActive: 12,
  contractsCompleted: 8,
  obligationsPending: 5,
  obligationsCompleted: 15,
};

export default function UserDashboard() {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [activePanel, setActivePanel] = useState('dashboard'); // dashboard, analytics, settings
  const [obligations, setObligations] = useState(mockObligations);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching data from backend
    console.log('Fetching dashboard data...');
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter obligations based on query
    const filtered = mockObligations.filter(o =>
      o.title.toLowerCase().includes(query.toLowerCase())
    );
    setObligations(filtered);
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <SidebarMenu
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>User Dashboard</h1>
          <SearchBar onSearch={handleSearch} />
          <UserProfileCard username="Harshitha" role="Contract Manager" />
        </header>

        {/* Notifications */}
        <NotificationsPanel notifications={notifications} />

        {/* Conditional Panels */}
        {activePanel === 'dashboard' && (
          <section className="dashboard-content">
            <ObligationTracker obligations={obligations} />

            <div className="view-toggle">
              <button
                className={viewMode === 'kanban' ? 'active' : ''}
                onClick={() => setViewMode('kanban')}
              >
                Kanban View
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
            </div>

            {viewMode === 'kanban' ? (
              <KanbanView obligations={obligations} />
            ) : (
              <ListView obligations={obligations} />
            )}
          </section>
        )}

        {activePanel === 'analytics' && (
          <AnalyticsPanel data={analytics} />
        )}

        {activePanel === 'settings' && (
          <SettingsPanel />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function SidebarMenu({ activePanel, setActivePanel }) {
  return (
    <aside className="sidebar-menu">
      <ul>
        <li
          className={activePanel === 'dashboard' ? 'active' : ''}
          onClick={() => setActivePanel('dashboard')}
        >
          Dashboard
        </li>
        <li
          className={activePanel === 'analytics' ? 'active' : ''}
          onClick={() => setActivePanel('analytics')}
        >
          Analytics
        </li>
        <li
          className={activePanel === 'settings' ? 'active' : ''}
          onClick={() => setActivePanel('settings')}
        >
          Settings
        </li>
      </ul>
    </aside>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search obligations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}

function UserProfileCard({ username, role }) {
  return (
    <div className="user-profile-card">
      <img src="/avatar.png" alt="User Avatar" />
      <div>
        <h3>{username}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="dashboard-footer">
      <p>© 2026 ContractIQ Dashboard. All rights reserved.</p>
    </footer>
  );
}

