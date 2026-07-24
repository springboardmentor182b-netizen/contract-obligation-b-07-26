import React from 'react'

export default function RecentActivity({ activities = [] }) {
  return React.createElement('section', { className: 'dashboard-card activity-card' },
    React.createElement('div', { className: 'card-heading activity-title' }, React.createElement('h2', null, 'Recent Activity'), React.createElement('a', { href: '/audit-logs' }, 'View all  >')),
    React.createElement('div', { className: 'activity-list' }, activities.length
      ? activities.slice(0, 5).map((activity) => React.createElement('div', { className: 'activity-item', key: activity.id }, React.createElement('span', { className: `activity-icon ${activity.type || 'default'}` }, '+'), React.createElement('div', null, React.createElement('p', null, activity.message), React.createElement('small', null, activity.time_ago))))
      : React.createElement('p', { className: 'empty-state' }, 'No recent activity.')),
  )
}
