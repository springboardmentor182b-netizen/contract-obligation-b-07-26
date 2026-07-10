import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Dashboard from '../pages/Dashboard';
import Contracts from '../pages/Contracts';
import Repository from '../pages/Repository';
import Obligations from '../pages/Obligations';
import Renewals from '../pages/Renewals';
import Compliance from '../pages/Compliance';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';
import AuditLogs from '../pages/AuditLogs';
import Users from '../pages/Users';
import Settings from '../pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'contracts', element: <Contracts /> },
      { path: 'repository', element: <Repository /> },
      { path: 'obligations', element: <Obligations /> },
      { path: 'renewals', element: <Renewals /> },
      { path: 'compliance', element: <Compliance /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'audit-logs', element: <AuditLogs /> },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}