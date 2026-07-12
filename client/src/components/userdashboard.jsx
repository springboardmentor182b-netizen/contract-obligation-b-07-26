import React, { useState } from 'react';
import ObligationTracker from './ObligationTracker';
import NotificationsPanel from './NotificationsPanel';
import KanbanView from './KanbanView';
import ListView from './ListView';

export default function UserDashboardScreen() {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
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
      </header>

      <section className="dashboard-content">
        <ObligationTracker />
        <NotificationsPanel />

        {viewMode === 'kanban' ? (
          <KanbanView />
        ) : (
          <ListView />
        )}
      </section>
    </div>
  );
}
