/**
 * NOTE: this fills the previously-empty `routes.js` placeholder.
 * Written for react-router-dom v6 — adjust the shape if the team picks a
 * different router. Only the Reports route is new; the rest are listed
 * here as placeholders matching the existing files in pages/ so this file
 * is immediately useful rather than a single-route stub.
 */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

const routes = [
  { path: '/', element: Home, private: false },
  { path: '/login', element: Login, private: false },
  { path: '/register', element: Register, private: false },
  { path: '/forgot-password', element: ForgotPassword, private: false },
  { path: '/dashboard', element: Dashboard, private: true },
  { path: '/reports', element: Reports, private: true },
  { path: '/settings', element: Settings, private: true },
];

export default routes;
