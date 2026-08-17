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
import Profile from './pages/Profile/Profile'
import { Auth } from './features/authentication/Auth'

function isAuthenticated() {
  return Boolean(
    window.localStorage.getItem('contractiq_token') ||
    window.sessionStorage.getItem('contractiq_token') ||
    window.localStorage.getItem('access_token')
  )
}

function Protected({ children }) {
  return isAuthenticated()
    ? children
    : React.createElement(Navigate, {
        to: '/login',
        replace: true,
      })
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>

          {/* Default */}
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Auth />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />

          {/* Contracts */}
          <Route
            path="/contracts"
            element={
              <Protected>
                <ContractRepository />
              </Protected>
            }
          />

          {/* Repository redirects to Contracts */}
          <Route
            path="/repository"
            element={
              <Navigate
                to="/contracts"
                replace
              />
            }
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />

          {/* Compliance */}
          <Route
            path="/compliance"
            element={
              <Protected>
                <ComplianceDashboard />
              </Protected>
            }
          />

          <Route
            path="/compliance-dashboard"
            element={
              <Protected>
                <ComplianceDashboard />
              </Protected>
            }
          />

          {/* Obligations */}
          <Route
            path="/obligations"
            element={
              <Protected>
                <ObligationTracker />
              </Protected>
            }
          />

          {/* Audit Logs */}
          <Route
            path="/audit-logs"
            element={
              <Protected>
                <AuditLogs />
              </Protected>
            }
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={
              <Protected>
                <Reports />
              </Protected>
            }
          />

          {/* Users */}
          <Route
            path="/users"
            element={
              <Protected>
                <UserManagement />
              </Protected>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <Protected>
                <Layout>
                  <Settings />
                </Layout>
              </Protected>
            }
          />

          {/* Unknown routes */}
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App