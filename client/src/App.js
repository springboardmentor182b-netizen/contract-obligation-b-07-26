import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Settings from './pages/Settings/Settings'
import { UserProvider } from './context/UserContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Notifications from './pages/Notifications.js'
import ComplianceDashboard from './pages/ComplianceDashboard'
import ObligationTracker from './pages/ObligationTracker'
import AuditLogs from './pages/AuditLogs'
import Reports from './pages/Reports'
import UserManagement from './pages/UserManagement'
import ContractRepository from './pages/ContractRepository'
import { Auth } from './features/authentication/Auth'

function ProtectedDashboard() {
  const token = window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token')
  return token ? React.createElement(Home) : React.createElement(Navigate, { to: '/login', replace: true })
}

export default function App() {
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

function isAuthenticated() {
  return Boolean(window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token'))
}

export default function App() {
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
            to: '/contracts',
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
          path: '/users',
          element: React.createElement(ProtectedUserManagement),
        }),
        React.createElement(Route, {
          path: '/settings',
          element: React.createElement(
            Layout,
            null,
            React.createElement(Settings),
          ),
        }),
        React.createElement(Route, {
          path: '*',
          element: React.createElement(Navigate, {
            to: '/contracts',
            replace: true,
          }),
        }),
      ),
    ),
  )
}