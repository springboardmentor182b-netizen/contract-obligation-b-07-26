import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications.js'
import ComplianceDashboard from './pages/ComplianceDashboard'
import ObligationTracker from './pages/ObligationTracker'
import AuditLogs from './pages/AuditLogs'
import UserManagement from './pages/UserManagement'
import { Auth } from './features/authentication/Auth'

function isAuthenticated() {
  return Boolean(window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token'))
}

function ProtectedRoute({ page }) {
  return isAuthenticated() ? React.createElement(page) : React.createElement(Navigate, { to: '/login', replace: true })
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
        element: React.createElement(ProtectedRoute, { page: Home }),
      }),
      React.createElement(Route, {
        path: '/reports',
        element: React.createElement(ProtectedRoute, { page: Reports }),
      }),
      React.createElement(Route, {
        path: '/notifications',
        element: React.createElement(ProtectedRoute, { page: Notifications }),
      }),
      React.createElement(Route, {
        path: '/compliance',
        element: React.createElement(ProtectedRoute, { page: ComplianceDashboard }),
      }),
      React.createElement(Route, {
        path: '/compliance-dashboard',
        element: React.createElement(ProtectedRoute, { page: ComplianceDashboard }),
      }),
      React.createElement(Route, {
        path: '/obligations',
        element: React.createElement(ProtectedRoute, { page: ObligationTracker }),
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

function ProtectedComplianceDashboard() {
  return isAuthenticated() ? React.createElement(ComplianceDashboard) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedObligationTracker() {
  return isAuthenticated() ? React.createElement(ObligationTracker) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedAuditLogs() {
  return isAuthenticated() ? React.createElement(AuditLogs) : React.createElement(Navigate, { to: '/login', replace: true })
}

function ProtectedUserManagement() {
  return isAuthenticated() ? React.createElement(UserManagement) : React.createElement(Navigate, { to: '/login', replace: true })
}

function isAuthenticated() {
  return Boolean(window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token'))
}

