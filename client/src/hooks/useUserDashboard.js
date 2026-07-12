import { useCallback, useMemo, useState } from 'react';

const initialUsers = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah.chen@contractiq.com', assignedRole: 'Legal Manager', department: 'Legal', status: 'Active', lastActive: '2 hours ago' },
  { id: 'u2', name: 'David Park', email: 'david.park@contractiq.com', assignedRole: 'Compliance Officer', department: 'Compliance', status: 'Active', lastActive: '23 minutes ago' },
  { id: 'u3', name: 'Lisa Torres', email: 'lisa.torres@contractiq.com', assignedRole: 'Contract Manager', department: 'Operations', status: 'Suspended', lastActive: '1 day ago' },
  { id: 'u4', name: 'Mark Johnson', email: 'mark.johnson@contractiq.com', assignedRole: 'Department Head', department: 'Procurement', status: 'Active', lastActive: '4 hours ago' },
  { id: 'u5', name: 'James Lee', email: 'james.lee@contractiq.com', assignedRole: 'Employee', department: 'Procurement', status: 'Active', lastActive: '5 hours ago' },
];

const initialPermissionMatrix = {
  Administrator: { Contracts: 'Write', Compliance: 'Write', Renewals: 'Read', Reports: 'Write', 'Admin Panel': 'Write' },
  'Legal Manager': { Contracts: 'Read', Compliance: 'Read', Renewals: 'None', Reports: 'Write', 'Admin Panel': 'Read' },
  'Compliance Officer': { Contracts: 'Read', Compliance: 'Write', Renewals: 'Read', Reports: 'Read', 'Admin Panel': 'None' },
  'Contract Manager': { Contracts: 'Write', Compliance: 'Read', Renewals: 'Write', Reports: 'Read', 'Admin Panel': 'None' },
  'Department Head': { Contracts: 'Read', Compliance: 'Read', Renewals: 'Read', Reports: 'Read', 'Admin Panel': 'None' },
  Employee: { Contracts: 'Read', Compliance: 'None', Renewals: 'Read', Reports: 'None', 'Admin Panel': 'None' },
};

const initialActivities = [
  { id: 'a1', timestamp: 'Jun 3, 2024 10:14 AM', user: 'Sarah Chen', module: 'Contracts', action: 'Updated access level for Contract Manager', ip: '192.168.1.42' },
  { id: 'a2', timestamp: 'Jun 3, 2024 09:52 AM', user: 'David Park', module: 'Compliance', action: 'Reviewed compliance checklist', ip: '192.168.1.55' },
  { id: 'a3', timestamp: 'Jun 3, 2024 09:31 AM', user: 'Admin', module: 'Admin Panel', action: 'Disabled user account for Lisa Torres', ip: '203.45.67.89' },
  { id: 'a4', timestamp: 'Jun 3, 2024 08:10 AM', user: 'Sarah Chen', module: 'Reports', action: 'Exported user activity log', ip: '192.168.1.42' },
  { id: 'a5', timestamp: 'Jun 2, 2024 02:45 PM', user: 'James Lee', module: 'Renewals', action: 'Created new renewal pipeline', ip: '10.0.0.44' },
];

export function useUserDashboard() {
  const [activeTab, setActiveTab] = useState('Overview & Profile');
  const [users, setUsers] = useState(initialUsers);
  const [permissionMatrix, setPermissionMatrix] = useState(initialPermissionMatrix);
  const [activities, setActivities] = useState(initialActivities);

  const statistics = useMemo(
    () => [
      { id: 'stat-1', value: 8, label: 'Total users', badge: 'users' },
      { id: 'stat-2', value: 7, label: 'Active users', badge: 'active' },
      { id: 'stat-3', value: 6, label: 'Roles defined', badge: 'roles' },
      { id: 'stat-4', value: 42, label: 'Permissions', badge: 'permissions' },
      { id: 'stat-5', value: 7, label: 'Departments', badge: 'departments' },
      { id: 'stat-6', value: 2, label: 'Active sessions', badge: 'sessions' },
    ],
    []
  );

  const profile = useMemo(
    () => ({
      initials: 'SC',
      name: 'Sarah Chen',
      title: 'Legal Manager',
      status: 'Active',
      lastLogin: 'Last login: Jun 3, 2024',
      details: [
        { label: 'Employee ID', value: 'EMP-001' },
        { label: 'Email', value: 'sarah.chen@contractiq.com' },
        { label: 'Phone', value: '+1 (555) 010-2345' },
        { label: 'Department', value: 'Legal' },
        { label: 'Designation', value: 'Senior Legal Manager' },
        { label: 'Role', value: 'Legal Manager' },
      ],
    }),
    []
  );

  const sessions = useMemo(
    () => [
      {
        id: 'session-1',
        browser: 'Chrome 124 / Windows 11',
        location: 'New York, US',
        status: 'Current',
        login: 'Jun 3, 2024 9:14 AM',
        expires: 'Jun 3, 2024 5:14 PM',
      },
      {
        id: 'session-2',
        browser: 'Safari 17 / macOS Sonoma',
        location: 'Remote â€” VPN',
        status: 'Logged out',
        login: 'Jun 3, 2024 8:00 AM',
        expires: 'Jun 3, 2024 4:00 PM',
      },
    ],
    []
  );

  const securityCards = useMemo(
    () => [
      { id: 'sec-1', title: 'Authentication method', value: 'JWT + Bearer Token', accent: '#8b5cf6' },
      { id: 'sec-2', title: 'Session timeout', value: '8 hours', accent: '#10b981' },
    ],
    []
  );

  const header = useMemo(
    () => ({
      title: 'User & Role Management',
      subtitle: 'Manage users, roles, permissions, and authentication across ContractIQ',
      date: 'June 3, 2024',
      actions: [
        { label: 'Invite User', outline: true },
        { label: '+ New Role', outline: false },
      ],
    }),
    []
  );

  const tabs = useMemo(
    () => ['Overview & Profile', 'User Management', 'Roles & Permissions', 'Permission Matrix', 'Activity Logs'],
    []
  );

  const roleSummaries = useMemo(
    () =>
      Object.entries(permissionMatrix).map(([role, modulePermissions]) => ({
        role,
        writeCount: Object.values(modulePermissions).filter((v) => v === 'Write').length,
        readCount: Object.values(modulePermissions).filter((v) => v === 'Read').length,
        noneCount: Object.values(modulePermissions).filter((v) => v === 'None').length,
      })),
    [permissionMatrix]
  );

  const toggleUserStatus = useCallback((id) => {
    setUsers((current) => current.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u)));
  }, []);

  const updatePermission = useCallback((role, module, level) => {
    setPermissionMatrix((current) => ({ ...current, [role]: { ...current[role], [module]: level } }));
    setActivities((current) => [
      {
        id: `a${current.length + 1}`,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
        user: 'System',
        module,
        action: `Updated ${role} permission for ${module} to ${level}`,
        ip: '10.0.0.1',
      },
      ...current,
    ]);
  }, []);

  return {
    header,
    tabs,
    activeTab,
    setActiveTab,
    users,
    permissionMatrix,
    activities,
    statistics,
    profile,
    sessions,
    securityCards,
    roleSummaries,
    toggleUserStatus,
    updatePermission,
  };
}
