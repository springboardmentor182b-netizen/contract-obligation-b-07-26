import React from 'react'

function statusClass(value = '') {
  return value.toLowerCase().replaceAll(' ', '-')
}

export default function UpcomingDeadlines({ deadlines = [] }) {
  const rows = deadlines.length
    ? deadlines.map((deadline) => React.createElement('tr', { key: deadline.id },
      React.createElement('td', { className: 'contract-code' }, deadline.contract_number),
      React.createElement('td', null, deadline.obligation),
      React.createElement('td', null, deadline.due_date),
      React.createElement('td', null, React.createElement('span', { className: 'assignee' }, React.createElement('span', { className: 'assignee-avatar' }, deadline.assignee_initials), deadline.assignee)),
      React.createElement('td', null, React.createElement('span', { className: `tag priority-${statusClass(deadline.priority)}` }, deadline.priority)),
      React.createElement('td', null, React.createElement('span', { className: `tag status-${statusClass(deadline.status)}` }, deadline.status)),
    ))
    : React.createElement('tr', null, React.createElement('td', { colSpan: 6, className: 'empty-state' }, 'No upcoming deadlines.'))

  return React.createElement('section', { className: 'dashboard-card deadlines-card' },
    React.createElement('div', { className: 'card-heading deadlines-heading' }, React.createElement('div', null, React.createElement('h2', null, 'Upcoming Deadlines'), React.createElement('p', null, 'Next 90 days')), React.createElement('button', { className: 'secondary-button', type: 'button' }, 'Export')),
    React.createElement('div', { className: 'table-scroll' }, React.createElement('table', null,
      React.createElement('thead', null, React.createElement('tr', null, ['Contract', 'Obligation', 'Due Date', 'Assignee', 'Priority', 'Status'].map((title) => React.createElement('th', { key: title }, title)))),
      React.createElement('tbody', null, rows),
    )),
  )
}
