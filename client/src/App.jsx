import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// React Icons
import {
  FiGrid,
  FiShield,
  FiFolder,
  FiCheckSquare,
  FiRepeat,
  FiFileText,
  FiBell,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiLogOut,
  FiPlus,
  FiUserPlus,
  FiUsers,
  FiKey,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLock,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiPower,
  FiTv,
  FiLayers,
  FiX
} from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview & Profile');
  const [profile, setProfile] = useState({
    employee_id: 'EMP-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@contractiq.com',
    phone: '+1 (555) 010-2345',
    department: 'Legal',
    designation: 'Senior Legal Manager',
    role: 'Legal Manager',
    status: 'Active',
    last_login: 'Jun 3, 2024 9:14 AM'
  });
  const [metrics, setMetrics] = useState({
    total_users: 8,
    active_users: 7,
    roles_defined: 6,
    permissions_count: 42,
    departments_count: 7,
    active_sessions: 2
  });
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  
  // Modals state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Legal',
    designation: '',
    role: 'Legal Manager'
  });
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: ''
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch Data
  const fetchData = async () => {
    try {
      const metricsRes = await axios.get(`${API_BASE_URL}/api/metrics`);
      setMetrics(metricsRes.data);

      const profileRes = await axios.get(`${API_BASE_URL}/api/profile`);
      setProfile(profileRes.data);

      const usersRes = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(usersRes.data);

      const sessionsRes = await axios.get(`${API_BASE_URL}/api/sessions`);
      setSessions(sessionsRes.data);
    } catch (err) {
      console.log('Using local mock data (Backend not started yet)');
      // If backend fails, use initial/fallback mock data
      const mockUsers = [
        { employee_id: 'EMP-001', name: 'Sarah Chen', email: 'sarah.chen@contractiq.com', phone: '+1 (555) 010-2345', department: 'Legal', designation: 'Senior Legal Manager', role: 'Legal Manager', status: 'Active', last_login: 'Jun 3, 2024 9:14 AM' },
        { employee_id: 'EMP-002', name: 'David Park', email: 'david.park@contractiq.com', phone: '+1 (555) 010-6789', department: 'Compliance', designation: 'Compliance Officer', role: 'Compliance Officer', status: 'Active', last_login: 'Jun 3, 2024 8:52 AM' },
        { employee_id: 'EMP-003', name: 'Lisa Torres', email: 'lisa.torres@contractiq.com', phone: '+1 (555) 010-4321', department: 'Operations', designation: 'Operations Director', role: 'Legal Manager', status: 'Active', last_login: 'Jun 2, 2024 4:31 PM' },
        { employee_id: 'EMP-004', name: 'Mark Johnson', email: 'mark.johnson@contractiq.com', phone: '+1 (555) 010-1122', department: 'Procurement', designation: 'Procurement Lead', role: 'Contract Manager', status: 'Active', last_login: 'Jun 1, 2024 11:07 AM' },
        { employee_id: 'EMP-005', name: 'James Lee', email: 'james.lee@contractiq.com', phone: '+1 (555) 010-9988', department: 'Procurement', designation: 'Contract Analyst', role: 'Contract Manager', status: 'Inactive', last_login: 'May 28, 2024 2:45 PM' },
        { employee_id: 'EMP-006', name: 'Alexandra Ross', email: 'admin@contractiq.com', phone: '+1 (555) 010-5566', department: 'Administration', designation: 'Sysadmin', role: 'Administrator', status: 'Active', last_login: 'Jun 3, 2024 10:01 AM' },
        { employee_id: 'EMP-007', name: 'Michael Grant', email: 'rm.grant@contractiq.com', phone: '+1 (555) 010-8877', department: 'Finance', designation: 'Finance VP', role: 'Department Head', status: 'Active', last_login: 'Jun 2, 2024 3:22 PM' },
        { employee_id: 'EMP-008', name: 'Jennifer Walsh', email: 'j.walsh@contractiq.com', phone: '+1 (555) 010-3344', department: 'Executive', designation: 'CEO', role: 'Department Head', status: 'Active', last_login: 'Jun 1, 2024 9:00 AM' }
      ];
      setUsers(mockUsers);
      setSessions([
        { id: 'sess-01', device: 'Chrome 124 / Windows 11', location: 'New York, US', login_time: 'Jun 3, 2024 9:14 AM', expires_time: 'Jun 3, 2024 5:14 PM', is_current: true },
        { id: 'sess-02', device: 'Safari 17 / macOS Sonoma', location: 'Remote - VPN', login_time: 'Jun 3, 2024 8:00 AM', expires_time: 'Jun 3, 2024 4:00 PM', is_current: false }
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/users`, inviteForm);
      setShowInviteModal(false);
      setInviteForm({
        name: '',
        email: '',
        phone: '',
        department: 'Legal',
        designation: '',
        role: 'Legal Manager'
      });
      fetchData();
    } catch (err) {
      // Fallback
      const newEmp = {
        employee_id: `EMP-0${users.length + 1}`,
        ...inviteForm,
        status: 'Active',
        last_login: 'Just now'
      };
      setUsers([...users, newEmp]);
      setShowInviteModal(false);
      setMetrics(prev => ({
        ...prev,
        total_users: prev.total_users + 1,
        active_users: prev.active_users + 1
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await axios.put(`${API_BASE_URL}/api/users/${selectedUser.employee_id}`, selectedUser);
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      setUsers(users.map(u => u.employee_id === selectedUser.employee_id ? selectedUser : u));
      setShowEditModal(false);
    }
  };

  const handleDeleteUser = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${employeeId}`);
      fetchData();
    } catch (err) {
      setUsers(users.filter(u => u.employee_id !== employeeId));
      setMetrics(prev => ({
        ...prev,
        total_users: prev.total_users - 1
      }));
    }
  };

  const toggleUserStatus = async (user) => {
    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await axios.put(`${API_BASE_URL}/api/users/${user.employee_id}`, { status: nextStatus });
      fetchData();
    } catch (err) {
      setUsers(users.map(u => u.employee_id === user.employee_id ? { ...u, status: nextStatus } : u));
      setMetrics(prev => ({
        ...prev,
        active_users: prev.active_users + (nextStatus === 'Active' ? 1 : -1)
      }));
    }
  };

  const handleLogoutSession = async (sessionId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/sessions/${sessionId}`);
      fetchData();
    } catch (err) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      setMetrics(prev => ({
        ...prev,
        active_sessions: prev.active_sessions - 1
      }));
    }
  };

  const handleLogoutAllOther = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/sessions/logout-all`);
      fetchData();
    } catch (err) {
      setSessions(sessions.filter(s => s.is_current));
      setMetrics(prev => ({
        ...prev,
        active_sessions: 1
      }));
    }
  };

  const handleCreateRole = (e) => {
    e.preventDefault();
    alert(`Role "${roleForm.name}" created successfully!`);
    setShowRoleModal(false);
    setRoleForm({ name: '', description: '' });
  };

  // Helper for Initials
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'SC';
  };

  // Helper for Status color
  const getRoleClass = (role) => {
    if (!role) return 'badge-role';
    return `badge-role ${role.toLowerCase().replace(/ /g, '-')}`;
  };

  // Filters logic
  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === '' || user.role === roleFilter;
    const matchStatus = statusFilter === '' || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>

        <div className="sidebar-profile">
          <div className="profile-label">Signed in as</div>
          <div className="profile-name">{profile.name}</div>
          <span className="profile-role-badge">Administrator</span>
        </div>

        <div className="sidebar-menu">
          <div className="menu-section-title">Workspace</div>
          <div className="menu-item">
            <FiGrid className="menu-item-icon" />
            <span className="menu-item-text">Dashboard</span>
          </div>
          <div className="menu-item">
            <FiShield className="menu-item-icon" />
            <span className="menu-item-text">Compliance</span>
          </div>
          <div className="menu-item">
            <FiFolder className="menu-item-icon" />
            <span className="menu-item-text">Contract Repository</span>
          </div>
          <div className="menu-item">
            <FiCheckSquare className="menu-item-icon" />
            <span className="menu-item-text">Obligation Tracker</span>
          </div>

          <div className="menu-section-title">Renewals</div>
          <div className="menu-item">
            <FiRepeat className="menu-item-icon" />
            <span className="menu-item-text">Renewal Management</span>
          </div>

          <div className="menu-section-title">Reports</div>
          <div className="menu-item">
            <FiFileText className="menu-item-icon" />
            <span className="menu-item-text">Reports & Export</span>
          </div>

          <div className="menu-section-title">Tools</div>
          <div className="menu-item">
            <FiBell className="menu-item-icon" />
            <span className="menu-item-text">Notification Center</span>
          </div>
          <div className="menu-item active">
            <FiUsers className="menu-item-icon" />
            <span className="menu-item-text">User & Role Mgmt</span>
          </div>

          <div className="menu-section-title">Admin</div>
          <div className="menu-item">
            <FiSettings className="menu-item-icon" />
            <span className="menu-item-text">Admin Panel</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            <span>Collapse sidebar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Body */}
      <main className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="nav-left">
            <span className="nav-title">User & Role Management</span>
            <span className="nav-date">June 3, 2024</span>
          </div>

          <div className="nav-right">
            <div className="search-bar">
              <FiSearch />
              <input type="text" placeholder="Search contracts, obligations..." />
            </div>

            <button className="nav-icon-btn">
              <FiBell />
              <span className="badge"></span>
            </button>

            <div className="user-dropdown">
              <div className="avatar-circle">{getInitials(profile.name)}</div>
              <div className="user-info">
                <span className="user-name">{profile.name}</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Title & Description */}
        <section className="page-header">
          <div className="header-title-area">
            <h2>User & Role Management</h2>
            <p>Manage users, roles, permissions, and authentication across ContractIQ</p>
          </div>

          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setShowInviteModal(true)}>
              <FiUserPlus /> Invite User
            </button>
            <button className="btn btn-primary" onClick={() => setShowRoleModal(true)}>
              <FiPlus /> New Role
            </button>
          </div>
        </section>

        {/* Tab Selection */}
        <div className="tab-bar">
          <div 
            className={`tab-item ${activeTab === 'Overview & Profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('Overview & Profile')}
          >
            Overview & Profile
          </div>
          <div 
            className={`tab-item ${activeTab === 'User Management' ? 'active' : ''}`}
            onClick={() => setActiveTab('User Management')}
          >
            User Management
          </div>
          <div className="tab-item">Roles & Permissions</div>
          <div className="tab-item">Permission Matrix</div>
          <div className="tab-item">Activity Logs</div>
        </div>

        {/* Content View */}
        <div className="content-area">
          {activeTab === 'Overview & Profile' && (
            <>
              {/* Metrics Grid */}
              <div className="metrics-grid">
                <div className="metric-card metric-total-users">
                  <div className="metric-icon-wrapper">
                    <FiUsers />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.total_users}</span>
                    <span className="metric-label">Total Users</span>
                  </div>
                </div>

                <div className="metric-card metric-active-users">
                  <div className="metric-icon-wrapper">
                    <FiCheckSquare />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.active_users}</span>
                    <span className="metric-label">Active Users</span>
                  </div>
                </div>

                <div className="metric-card metric-roles">
                  <div className="metric-icon-wrapper">
                    <FiLayers />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.roles_defined}</span>
                    <span className="metric-label">Roles Defined</span>
                  </div>
                </div>

                <div className="metric-card metric-permissions">
                  <div className="metric-icon-wrapper">
                    <FiKey />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.permissions_count}</span>
                    <span className="metric-label">Permissions</span>
                  </div>
                </div>

                <div className="metric-card metric-departments">
                  <div className="metric-icon-wrapper">
                    <FiFolder />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.departments_count}</span>
                    <span className="metric-label">Departments</span>
                  </div>
                </div>

                <div className="metric-card metric-sessions">
                  <div className="metric-icon-wrapper">
                    <FiTv />
                  </div>
                  <div className="metric-info">
                    <span className="metric-value">{metrics.active_sessions}</span>
                    <span className="metric-label">Active Sessions</span>
                  </div>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="dashboard-details-grid">
                {/* My Profile */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">My Profile</h3>
                    <span className="card-link" onClick={() => {
                      setSelectedUser(profile);
                      setShowEditModal(true);
                    }}>Edit Profile</span>
                  </div>

                  <div className="profile-card-content">
                    <div className="profile-identity">
                      <div className="profile-avatar-large">{getInitials(profile.name)}</div>
                      <div className="profile-meta">
                        <h3>{profile.name}</h3>
                        <span className="role-badge">{profile.role}</span>
                        <div className="status-text">Active - Last login: {profile.last_login}</div>
                      </div>
                    </div>

                    <div className="profile-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Employee ID</span>
                        <span className="detail-value">{profile.employee_id}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{profile.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{profile.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Department</span>
                        <span className="detail-value">{profile.department}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Designation</span>
                        <span className="detail-value">{profile.designation}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Role</span>
                        <span className="detail-value">{profile.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Sessions & Security */}
                <div className="right-dashboard-column">
                  {/* Sessions */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Active Sessions</h3>
                      <span className="card-link" onClick={handleLogoutAllOther} style={{ color: '#ef4444' }}>
                        Logout All Devices
                      </span>
                    </div>

                    <div className="sessions-list">
                      {sessions.map(sess => (
                        <div key={sess.id} className="session-item">
                          <div className="session-left">
                            <FiTv className="session-icon" />
                            <div className="session-info">
                              <div className="session-device">
                                {sess.device}
                                {sess.is_current && <span className="badge-current">Current</span>}
                              </div>
                              <div className="session-loc">{sess.location}</div>
                              <div className="session-time">
                                Login: {sess.login_time} | Expires: {sess.expires_time}
                              </div>
                            </div>
                          </div>
                          {!sess.is_current && (
                            <button className="btn-logout-device" onClick={() => handleLogoutSession(sess.id)}>
                              Logout
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security & Authentication */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Security & Authentication</h3>
                    </div>

                    <div className="security-grid">
                      <div className="security-subcard">
                        <FiLock className="security-subcard-icon" />
                        <div className="security-subcard-info">
                          <span className="detail-label">Authentication Method</span>
                          <span className="detail-value">JWT + Bearer Token</span>
                        </div>
                      </div>

                      <div className="security-subcard">
                        <FiPower className="security-subcard-icon" />
                        <div className="security-subcard-info">
                          <span className="detail-label">Session Timeout</span>
                          <span className="detail-value">8 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'User Management' && (
            <div className="card" style={{ padding: '24px 0' }}>
              <div className="user-mgmt-header" style={{ padding: '0 24px' }}>
                <div className="mgmt-header-left">
                  <h3>All Users</h3>
                  <p>{filteredUsers.length} of {users.length} users shown</p>
                </div>

                <div className="mgmt-header-right">
                  <div className="search-bar" style={{ width: '220px' }}>
                    <FiSearch />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select 
                    className="select-filter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="">All Roles</option>
                    <option value="Legal Manager">Legal Manager</option>
                    <option value="Compliance Officer">Compliance Officer</option>
                    <option value="Contract Manager">Contract Manager</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Department Head">Department Head</option>
                  </select>

                  <select 
                    className="select-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <button className="btn btn-primary" onClick={() => setShowInviteModal(true)}>
                    <FiPlus /> Invite
                  </button>
                </div>
              </div>

              <div className="table-container" style={{ boxShadow: 'none', border: 'none', borderRadius: 0, marginTop: '20px' }}>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.employee_id}>
                        <td>{user.employee_id}</td>
                        <td>
                          <div className="user-table-name-cell">
                            <div className="avatar-circle" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                              {getInitials(user.name)}
                            </div>
                            <span style={{ fontWeight: '500' }}>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.department}</td>
                        <td>
                          <span className={getRoleClass(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span 
                            className={`badge-status ${user.status === 'Active' ? 'active' : 'inactive'}`}
                            onClick={() => toggleUserStatus(user)}
                            style={{ cursor: 'pointer' }}
                            title="Click to toggle status"
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>{user.last_login}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn" 
                              title="View User"
                              onClick={() => {
                                alert(`User details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nDepartment: ${user.department}\nRole: ${user.role}`);
                              }}
                            >
                              <FiEye />
                            </button>
                            <button 
                              className="action-btn" 
                              title="Edit User"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                            >
                              <FiEdit3 />
                            </button>
                            <button className="action-btn" title="API Credentials"><FiKey /></button>
                            <button 
                              className="action-btn" 
                              title="Toggle Active/Inactive"
                              onClick={() => toggleUserStatus(user)}
                            >
                              <FiPower />
                            </button>
                            <button 
                              className="action-btn btn-delete" 
                              title="Delete User"
                              onClick={() => handleDeleteUser(user.employee_id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Invite New User</h3>
              <button className="modal-close-btn" onClick={() => setShowInviteModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleInviteSubmit} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. David Park"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({...inviteForm, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. david.park@contractiq.com"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. +1 (555) 010-6789"
                  value={inviteForm.phone}
                  onChange={(e) => setInviteForm({...inviteForm, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select 
                  value={inviteForm.department}
                  onChange={(e) => setInviteForm({...inviteForm, department: e.target.value})}
                >
                  <option value="Legal">Legal</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Operations">Operations</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Compliance Officer"
                  value={inviteForm.designation}
                  onChange={(e) => setInviteForm({...inviteForm, designation: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select 
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                >
                  <option value="Legal Manager">Legal Manager</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="Contract Manager">Contract Manager</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Department Head">Department Head</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Role Modal */}
      {showRoleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Role</h3>
              <button className="modal-close-btn" onClick={() => setShowRoleModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleCreateRole} className="modal-form">
              <div className="form-group">
                <label>Role Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. External Audit Partner"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Role Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Access to audit logs and obligation compliance reports"
                  value={roleForm.description}
                  onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowRoleModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit User Info</h3>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  required
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select 
                  value={selectedUser.department}
                  onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                >
                  <option value="Legal">Legal</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Operations">Operations</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <input 
                  type="text" 
                  required
                  value={selectedUser.designation}
                  onChange={(e) => setSelectedUser({...selectedUser, designation: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select 
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  <option value="Legal Manager">Legal Manager</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="Contract Manager">Contract Manager</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Department Head">Department Head</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
