import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'

export default function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/dashboard', element: React.createElement(Home) }),
      React.createElement(Route, { path: '*', element: React.createElement(Navigate, { to: '/dashboard', replace: true }) }),
    ),
  )
}
