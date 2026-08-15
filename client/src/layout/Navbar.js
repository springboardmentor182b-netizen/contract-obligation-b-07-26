import React from 'react'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

// Shared legacy navbar used across Dashboard, Obligations, Compliance,
// Notifications, Audit Logs, and Users.  Contracts has its own navbar.
export default function Navbar({ profile, pageTitle = 'Dashboard', unreadCount = 0 }) {
  const { userData } = useUser()
  const displayedProfile = {
    ...profile,
    ...(userData || {}),
    name: userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || profile?.name : profile?.name,
    role: userData?.job_title || profile?.role,
  }
  const initials = displayedProfile?.name?.split(' ').map((name) => name[0]).join('').slice(0, 2).toUpperCase() || '-'

  const logout = async () => {
    const token = window.localStorage.getItem('contractiq_token')
      || window.sessionStorage.getItem('contractiq_token')
      || window.localStorage.getItem('access_token')
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/logout`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
    } catch {
      // The local logout still succeeds if the server is unavailable.
    }
    window.localStorage.removeItem('contractiq_token')
    window.localStorage.removeItem('contractiq_role')
    window.localStorage.removeItem('access_token')
    window.sessionStorage.removeItem('contractiq_token')
    window.sessionStorage.removeItem('contractiq_role')
    window.location.assign('/login')
  }

  return React.createElement(
    'header',
    { className: 'navbar' },
    React.createElement('div', { className: 'breadcrumb' },
      React.createElement(Link, { to: '/dashboard' }, 'ContractIQ'),
      React.createElement('span', { className: 'breadcrumb-arrow' }, '>'),
      React.createElement('strong', null, pageTitle),
    ),
    React.createElement('div', { className: 'navbar-actions' },
      React.createElement(Link, { className: 'notification-button', to: '/notifications', 'aria-label': 'Notifications' },
        React.createElement(Bell, { size: 20, strokeWidth: 1.8, 'aria-hidden': true }),
        unreadCount ? React.createElement('span', { className: 'notification-dot' }) : null,
      ),
      React.createElement('div', { className: 'profile-summary' },
        displayedProfile?.profile_image
          ? React.createElement('img', { className: 'avatar avatar-image', src: displayedProfile.profile_image, alt: `${displayedProfile.name || 'User'} profile` })
          : React.createElement('span', { className: 'avatar' }, initials),
        React.createElement('span', { className: 'profile-copy' },
          React.createElement('strong', null, displayedProfile?.name || '-'),
          React.createElement('small', null, displayedProfile?.role || ''),
        ),
      ),
      React.createElement('button', { className: 'logout-button', type: 'button', onClick: logout }, 'Logout'),
    ),
  )
}
