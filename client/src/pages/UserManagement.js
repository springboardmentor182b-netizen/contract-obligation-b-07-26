import React, { useEffect, useMemo, useState } from 'react'
import { ShieldCheck, UserCheck, UserPlus, UsersRound } from 'lucide-react'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { createManagedUser, getManagedUsers } from '../api/usersApi'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import './UserManagement.css'

const roles = ['Administrator', 'Legal Manager', 'Compliance Officer', 'Contract Manager', 'Department Head', 'Employee']
const initialForm = { name: '', email: '', password: '', role: 'Employee', department: '' }

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [profile, setProfile] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('contractiq_sidebar_collapsed') === 'true')

  function loadUsers() {
    getManagedUsers().then((data) => setUsers(Array.isArray(data) ? data : [])).catch((requestError) => setError(requestError.response?.data?.detail || 'Unable to load users.'))
  }

  useEffect(() => {
    loadUsers()
    Promise.all([getProfile(), getDashboard()]).then(([user, dashboardData]) => { setProfile(user); setDashboard(dashboardData) }).catch(() => {})
  }, [])

  const filteredUsers = useMemo(() => users.filter((user) => {
    const query = search.trim().toLowerCase()
    return (role === 'All' || user.role === role) && (!query || [user.name, user.email, user.department, user.role].some((value) => String(value || '').toLowerCase().includes(query)))
  }), [users, search, role])

  const activeUsers = users.filter((user) => user.is_active).length

  function toggleSidebar() {
    setSidebarCollapsed((current) => { const next = !current; localStorage.setItem('contractiq_sidebar_collapsed', String(next)); return next })
  }

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await createManagedUser(form)
      setForm(initialForm)
      setShowForm(false)
      loadUsers()
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to create user. Check that the email is unique and the password has at least 8 characters.')
    } finally { setSaving(false) }
  }

  return <div className="app-shell">
    <Sidebar profile={profile} stats={dashboard?.stats} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
    <div className="app-main">
      <Navbar profile={profile} pageTitle="Users" unreadCount={dashboard?.unread_notifications || 0} actionLabel="+ Add User" onAction={() => setShowForm(true)} />
      <PageContainer><main className="users-page">
        <header className="users-heading"><div><h1>User Management</h1><p>Manage platform users, access roles, and departments.</p></div></header>
        <section className="user-stat-grid">
          <UserStat icon={<UsersRound />} tone="blue" value={users.length} label="Total Users" />
          <UserStat icon={<UserCheck />} tone="green" value={activeUsers} label="Active Users" />
          <UserStat icon={<ShieldCheck />} tone="purple" value={new Set(users.map((user) => user.role)).size} label="Assigned Roles" />
        </section>
        <section className="users-card">
          <div className="users-tools"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, or department..." /><select value={role} onChange={(event) => setRole(event.target.value)}><option>All</option>{roles.map((item) => <option key={item}>{item}</option>)}</select></div>
          {error ? <p className="users-error">{error}</p> : null}
          <div className="users-table-wrap"><table className="users-table"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Joined</th></tr></thead><tbody>
            {filteredUsers.map((user) => <tr key={user.id}><td><span className="managed-user"><span>{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>{user.name}</span></td><td>{user.email}</td><td><b className="managed-role">{user.role}</b></td><td>{user.department || '—'}</td><td><b className={user.is_active ? 'managed-status active' : 'managed-status'}>{user.is_active ? 'Active' : 'Inactive'}</b></td><td>{new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(user.created_at))}</td></tr>)}
            {!filteredUsers.length ? <tr><td colSpan="6" className="users-empty">No users found.</td></tr> : null}
          </tbody></table></div>
        </section>
        {showForm ? <div className="user-modal-backdrop" role="presentation"><form className="user-modal" onSubmit={submit}><div><h2>Add User</h2><button type="button" onClick={() => setShowForm(false)} aria-label="Close">×</button></div><label>Full name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Password<input required type="password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label><label>Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label>Department<input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} /></label><button className="create-user-button" disabled={saving}>{saving ? 'Creating...' : 'Create User'}</button></form></div> : null}
      </main></PageContainer>
    </div>
  </div>
}

function UserStat({ icon, tone, value, label }) { return <article className="user-stat"><span className={tone}>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></article> }
