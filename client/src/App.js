import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Reports from './pages/Reports'
import { Auth } from './features/authentication/Auth'

function ProtectedRoute({ page }) {
  const token = window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token')
  return token ? React.createElement(page) : React.createElement(Navigate, { to: '/login', replace: true })
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
        path: '*',
        element: React.createElement(Navigate, {
          to: '/login',
          replace: true,
        }),
      }),
    ),
  )
}
