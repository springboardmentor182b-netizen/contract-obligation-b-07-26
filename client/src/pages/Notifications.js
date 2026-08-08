import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, CircleAlert, Clock3, Info, TriangleAlert } from 'lucide-react'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api/notificationsApi'
import './Notifications.css'

const filterOptions = ['All', 'Unread', 'Alerts', 'Renewal', 'Compliance', 'Approval']
const iconByType = { compliance: CircleAlert, renewal: TriangleAlert, approval: Info, obligation: CheckCircle2, contract: Info, system: CheckCircle2 }

function relativeTime(value) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000))
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return `${Math.floor(seconds / 604800)} weeks ago`
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [profile, setProfile] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [filter, setFilter] = useState('All')
  const [error, setError] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('contractiq_sidebar_collapsed') === 'true')

  useEffect(() => {
    let active = true
    getNotifications()
      .then((items) => { if (active) setNotifications(Array.isArray(items) ? items : []) })
      .catch((requestError) => { if (active) setError(requestError.message || 'Unable to load notifications.') })
    Promise.all([getProfile(), getDashboard()])
      .then(([user, dashboardData]) => { if (active) { setProfile(user); setDashboard(dashboardData) } })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const unreadCount = notifications.filter((notification) => !notification.read).length
  const filteredNotifications = useMemo(() => notifications.filter((notification) => {
    const type = notification.notification_type || notification.related_type || 'system'
    if (filter === 'All') return true
    if (filter === 'Unread') return !notification.read
    if (filter === 'Alerts') return type === 'compliance'
    return type === filter.toLowerCase()
  }), [filter, notifications])

  async function readNotification(notification) {
    if (notification.read) return
    try {
      await markNotificationRead(notification.id)
      setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, read: true } : item))
    } catch (requestError) { setError(requestError.message || 'Unable to update notification.') }
  }

  async function markAllRead() {
    try {
      await markAllNotificationsRead()
      setNotifications((items) => items.map((item) => ({ ...item, read: true })))
    } catch (requestError) { setError(requestError.message || 'Unable to mark all notifications as read.') }
  }

  function toggleSidebar() {
    setSidebarCollapsed((current) => { const next = !current; localStorage.setItem('contractiq_sidebar_collapsed', String(next)); return next })
  }

  return React.createElement('div', { className: 'app-shell' },
    React.createElement(Sidebar, { profile, stats: dashboard?.stats, collapsed: sidebarCollapsed, onToggle: toggleSidebar }),
    React.createElement('div', { className: 'app-main' },
      React.createElement(Navbar, { profile, pageTitle: 'Notifications', unreadCount }),
      React.createElement(PageContainer, null,
        React.createElement('section', { className: 'notifications-page', 'aria-labelledby': 'notifications-title' },
          React.createElement('div', { className: 'notifications-heading' },
            React.createElement('div', null,
              React.createElement('h1', { id: 'notifications-title' }, 'Notifications'),
              React.createElement('p', null, `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`),
            ),
            React.createElement('button', { type: 'button', className: 'mark-all-button', onClick: markAllRead, disabled: !unreadCount }, 'Mark all read'),
          ),
          React.createElement('div', { className: 'notification-filters', role: 'tablist', 'aria-label': 'Notification filters' },
            filterOptions.map((option) => React.createElement('button', {
              type: 'button', key: option, className: filter === option ? 'active' : '', onClick: () => setFilter(option),
            }, `${option}${option === 'Unread' ? ` (${unreadCount})` : ''}`)),
          ),
          error ? React.createElement('p', { className: 'notifications-error', role: 'alert' }, error) : null,
          React.createElement('div', { className: 'notification-list' },
            filteredNotifications.map((notification) => {
              const type = notification.notification_type || notification.related_type || 'system'
              const Icon = iconByType[type] || Clock3
              return React.createElement('button', {
                type: 'button', className: `notification-card ${type} ${notification.read ? 'is-read' : 'is-unread'}`,
                key: notification.id, onClick: () => readNotification(notification),
              },
              React.createElement('span', { className: 'notification-icon' }, React.createElement(Icon, { size: 20 })),
              React.createElement('span', { className: 'notification-content' },
                React.createElement('span', { className: 'notification-title' }, notification.title, !notification.read ? React.createElement('i', { 'aria-label': 'Unread' }) : null),
                React.createElement('span', { className: 'notification-message' }, notification.message),
                React.createElement('time', { dateTime: notification.created_at }, relativeTime(notification.created_at)),
              ),
              React.createElement('span', { className: 'notification-type' }, type),
              )
            }),
            !filteredNotifications.length && !error ? React.createElement('div', { className: 'notifications-empty' }, 'No notifications match this filter.') : null,
          ),
        ),
      ),
    ),
  )
}
