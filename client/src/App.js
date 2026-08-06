import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Settings from './pages/Settings/Settings'
import { UserProvider } from './context/UserContext'
import Layout from './components/Layout/Layout'

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
            to: '/settings',
            replace: true,
          }),
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
            to: '/settings',
            replace: true,
          }),
        }),
      ),
    ),
  )
}
