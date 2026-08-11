import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Settings from './pages/Settings/Settings'
import { UserProvider } from './context/UserContext'
import { getAppearance } from './api/settingsApi'
import Home from './pages/Home'
import Notifications from './pages/Notifications.js'
import ComplianceDashboard from './pages/ComplianceDashboard'
import ObligationTracker from './pages/ObligationTracker'
import RenewalManagement from './pages/RenewalManagement'
import AuditLogs from './pages/AuditLogs'
import Reports from './pages/Reports'
import UserManagement from './pages/UserManagement'
import ContractRepository from './pages/ContractRepository'
import Profile from './pages/Profile/Profile'
import { Auth } from './features/authentication/Auth'

function ProtectedDashboard() {
  const token = window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token')
  return token ? React.createElement(Home) : React.createElement(Navigate, { to: '/login', replace: true })
}

function LegacyApp() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, {
        path: '/',
        element: React.createElement(Navigate, {
          to: '/login',
          replace: true,
        }),
      }),
      React.createElement(Route, {
        path: '/login',
        element: React.createElement(Auth),
      }),
      React.createElement(Route, {
        path: '/dashboard',
        element: React.createElement(ProtectedDashboard),
      }),
      React.createElement(Route, {
        path: '/contracts',
        element: React.createElement(ProtectedContracts),
      }),
      React.createElement(Route, {
        path: '/repository',
        element: React.createElement(Navigate, { to: '/contracts', replace: true }),
      }),
      React.createElement(Route, {
        path: '/notifications',
        element: React.createElement(ProtectedNotifications),
      }),
      React.createElement(Route, {
        path: '/compliance',
        element: React.createElement(ProtectedComplianceDashboard),
      }),
      React.createElement(Route, {
        path: '/compliance-dashboard',
        element: React.createElement(ProtectedComplianceDashboard),
      }),
      React.createElement(Route, {
        path: '/obligations',
        element: React.createElement(ProtectedObligationTracker),
      }),
      React.createElement(Route, {
        path: '/audit-logs',
        element: React.createElement(ProtectedAuditLogs),
      }),
      React.createElement(Route, {
        path: '/reports',
        element: React.createElement(ProtectedReports),
      }),
      React.createElement(Route, {
        path: '/users',
        element: React.createElement(ProtectedUserManagement),
      }),
      React.createElement(Route, {
        path: '*',
        element: React.createElement(Navigate, {
          to: '/login',
          replace: true,
        }),
      }),
    ),
  )
}

function ProtectedNotifications() {
  const token = window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token')
  return token ? React.createElement(Notifications) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedContracts() {
  return isAuthenticated() ? React.createElement(ContractRepository) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedComplianceDashboard() {
  return isAuthenticated() ? React.createElement(ComplianceDashboard) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedObligationTracker() {
  return isAuthenticated() ? React.createElement(ObligationTracker) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedAuditLogs() {
  return isAuthenticated() ? React.createElement(AuditLogs) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedReports() {
  return isAuthenticated() ? React.createElement(Reports) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedUserManagement() {
  return isAuthenticated() ? React.createElement(UserManagement) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedRenewals() {
  return isAuthenticated() ? React.createElement(RenewalManagement) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedProfile() {
  return isAuthenticated() ? React.createElement(Profile) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedSettings() {
  return isAuthenticated()
    ? React.createElement(Settings)
    : React.createElement(Navigate, { to: '/login', replace: true })
}

function isAuthenticated() {
  return Boolean(window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token'))
}

export default function App() {
  React.useEffect(() => {
    const applyAccent = (accent) => {
      const value = accent || '#3b82f6'
      document.documentElement.style.setProperty('--accent-color', value)
      document.documentElement.style.setProperty('--primary-color', value)
    }
    const applyTheme = (theme) => {
      const resolved = theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme
      const root = document.documentElement
      root.classList.toggle('dark', resolved === 'dark')
      const colors = resolved === 'dark'
        ? { bgPrimary: '#1f2937', bgSecondary: '#111827', bgSidebar: '#111827', bgHover: '#374151', textPrimary: '#f9fafb', textSecondary: '#d1d5db', border: '#4b5563' }
        : { bgPrimary: '#ffffff', bgSecondary: '#f3f4f6', bgSidebar: '#111827', bgHover: '#fafafa', textPrimary: '#111827', textSecondary: '#6b7280', border: '#e5e7eb' }
      root.style.setProperty('--bg-primary', colors.bgPrimary)
      root.style.setProperty('--bg-secondary', colors.bgSecondary)
      root.style.setProperty('--bg-sidebar', colors.bgSidebar)
      root.style.setProperty('--bg-hover', colors.bgHover)
      root.style.setProperty('--text-primary', colors.textPrimary)
      root.style.setProperty('--text-secondary', colors.textSecondary)
      root.style.setProperty('--border-color', colors.border)
    }
    applyTheme(window.localStorage.getItem('contractiq_theme') || 'light')
    applyAccent(window.localStorage.getItem('contractiq_accent_color'))
    getAppearance().then((appearance) => {
      if (appearance?.theme) {
        window.localStorage.setItem('contractiq_theme', appearance.theme)
        applyTheme(appearance.theme)
      }
      if (appearance?.accent_color) {
        window.localStorage.setItem('contractiq_accent_color', appearance.accent_color)
        applyAccent(appearance.accent_color)
      }
    }).catch(() => {})
  }, [])

  return React.createElement(
    UserProvider,
    null,
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(
        Routes,
        null,
        React.createElement(Route, {
          path: '/',
          element: React.createElement(Navigate, {
            to: '/login',
            replace: true,
          }),
        }),
        React.createElement(Route, {
          path: '/login',
          element: React.createElement(Auth),
        }),
        React.createElement(Route, {
          path: '/dashboard',
          element: React.createElement(ProtectedDashboard),
        }),
        React.createElement(Route, {
          path: '/contracts',
          element: React.createElement(ProtectedContracts),
        }),
        React.createElement(Route, {
          path: '/repository',
          element: React.createElement(Navigate, { to: '/contracts', replace: true }),
        }),
        React.createElement(Route, {
          path: '/notifications',
          element: React.createElement(ProtectedNotifications),
        }),
        React.createElement(Route, {
          path: '/compliance',
          element: React.createElement(ProtectedComplianceDashboard),
        }),
        React.createElement(Route, {
          path: '/compliance-dashboard',
          element: React.createElement(ProtectedComplianceDashboard),
        }),
        React.createElement(Route, {
          path: '/obligations',
          element: React.createElement(ProtectedObligationTracker),
        }),
        React.createElement(Route, {
          path: '/renewals',
          element: React.createElement(ProtectedRenewals),
        }),
        React.createElement(Route, {
          path: '/audit-logs',
          element: React.createElement(ProtectedAuditLogs),
        }),
        React.createElement(Route, {
          path: '/users',
          element: React.createElement(ProtectedUserManagement),
        }),
        React.createElement(Route, {
          path: '/reports',
          element: React.createElement(ProtectedReports),
        }),
        React.createElement(Route, {
          path: '/profile',
          element: React.createElement(ProtectedProfile),
        }),
        React.createElement(Route, {
          path: '/settings',
          element: React.createElement(ProtectedSettings),
        }),
        React.createElement(Route, {
          path: '*',
          element: React.createElement(Navigate, {
            to: '/login',
            replace: true,
          }),
        }),
      ),
    ),
  )
}
