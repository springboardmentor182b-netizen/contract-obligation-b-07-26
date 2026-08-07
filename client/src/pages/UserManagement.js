import { useEffect, useMemo, useState } from 'react'
import { ShieldCheck, UserCheck, UsersRound } from 'lucide-react'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { createManagedUser, deleteManagedUser, getDeletedManagedUsers, getManagedUsers, getUserActivity, restoreManagedUser, updateManagedUser } from '../api/usersApi'
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
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [showDeletedUsers, setShowDeletedUsers] = useState(false)
  const [deletedUsers, setDeletedUsers] = useState([])
  const [activityUser, setActivityUser] = useState(null)
  const [activities, setActivities] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('contractiq_sidebar_collapsed') === 'true')

  function loadUsers() {
    getManagedUsers().then((data) => setUsers(Array.isArray(data) ? data : [])).catch((requestError) => setError(requestError.response?.data?.detail || 'Unable to load users.'))
  }

  function loadDeletedUsers() {
    getDeletedManagedUsers().then((data) => setDeletedUsers(Array.isArray(data) ? data : [])).catch((requestError) => setError(requestError.response?.data?.detail || 'Unable to load deleted users.'))
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
  const departments = new Set(users.map((user) => user.department).filter(Boolean)).size
  const assignedRoles = new Set(users.map((user) => user.role).filter(Boolean)).size

  function toggleSidebar() {
    setSidebarCollapsed((current) => { const next = !current; localStorage.setItem('contractiq_sidebar_collapsed', String(next)); return next })
  }

  async function submit(event) {
    event.preventDefault(); setSaving(true); setError('')
    try { await createManagedUser(form); setForm(initialForm); setShowForm(false); loadUsers() }
    catch (requestError) { setError(requestError.response?.data?.detail || 'Unable to create user. Check that the email is unique and the password has at least 8 characters.') }
    finally { setSaving(false) }
  }

  async function saveEdit(event) {
    event.preventDefault(); setSaving(true); setError('')
    try {
      const { password, ...userData } = editingUser
      await updateManagedUser(editingUser.id, password ? { ...userData, password } : userData)
      setEditingUser(null); loadUsers()
    }
    catch (requestError) { setError(requestError.response?.data?.detail || 'Unable to update this user.') }
    finally { setSaving(false) }
  }

  async function removeUser(user) {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return
    setError('')
    try { await deleteManagedUser(user.id); loadUsers() }
    catch (requestError) { setError(requestError.response?.data?.detail || 'Unable to delete this user.') }
  }

  async function showHistory(user) {
    setActivityUser(user)
    setActivities([])
    try { setActivities(await getUserActivity(user.id)) }
    catch (requestError) { setError(requestError.response?.data?.detail || 'Unable to load user activity.') }
  }

  async function restoreUser(user) {
    setError('')
    try { await restoreManagedUser(user.id); loadDeletedUsers(); loadUsers() }
    catch (requestError) { setError(requestError.response?.data?.detail || 'Unable to restore this user.') }
  }

  return <div className="app-shell">
    <Sidebar profile={profile} stats={dashboard?.stats} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
    <div className="app-main"><Navbar profile={profile} pageTitle="Users" unreadCount={dashboard?.unread_notifications || 0} actionLabel="+ Add User" onAction={() => setShowForm(true)} />
      <PageContainer><main className="users-page">
        <header className="users-heading"><div><h1>User Management</h1><p>Manage platform users, access roles, and departments.</p></div><button className="deleted-users-button" onClick={() => { setShowDeletedUsers(true); loadDeletedUsers() }}>Deleted users</button></header>
        <section className="user-stat-grid"><UserStat icon={<UsersRound />} tone="blue" value={users.length} label="Total Users" /><UserStat icon={<UserCheck />} tone="green" value={activeUsers} label="Active Users" /><UserStat icon={<UsersRound />} tone="orange" value={departments} label="Departments" /><UserStat icon={<ShieldCheck />} tone="purple" value={assignedRoles} label="Assigned Roles" /></section>
        <section className="users-card"><div className="role-tabs-container"><button className={role === 'All' ? 'role-tab active' : 'role-tab'} onClick={() => setRole('All')}>All <span>{users.length}</span></button>{roles.map((item) => <button key={item} className={role === item ? 'role-tab active' : 'role-tab'} onClick={() => setRole(item)}>{item} <span>{users.filter((user) => user.role === item).length}</span></button>)}</div>
          <div className="users-tools"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, role, or department..." /><select value={role} onChange={(event) => setRole(event.target.value)}><option>All</option>{roles.map((item) => <option key={item}>{item}</option>)}</select></div>
          {error ? <p className="users-error">{error}</p> : null}
          <div className="users-table-wrap"><table className="users-table"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody>{filteredUsers.map((user) => <tr key={user.id}><td><span className="managed-user"><span>{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>{user.name}</span></td><td>{user.email}</td><td><b className="managed-role">{user.role}</b></td><td>{user.department || '—'}</td><td><b className={user.is_active ? 'managed-status active' : 'managed-status'}>{user.is_active ? 'Active' : 'Inactive'}</b></td><td>{new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(user.created_at))}</td><td><div className="user-actions"><button onClick={() => setSelectedUser(user)}>View</button><button onClick={() => setEditingUser({ ...user, password: '' })}>Edit</button><button className="danger" onClick={() => removeUser(user)}>Delete</button></div></td></tr>)}{!filteredUsers.length ? <tr><td colSpan="7" className="users-empty">No users found.</td></tr> : null}</tbody></table></div>
        </section>
        {showForm ? <UserForm title="Add User" form={form} setForm={setForm} onClose={() => setShowForm(false)} onSubmit={submit} saving={saving} submitLabel="Create User" passwordRequired /> : null}
        {selectedUser ? <div className="user-modal-backdrop" role="presentation"><section className="user-modal user-details"><div><h2>User details</h2><button type="button" onClick={() => setSelectedUser(null)} aria-label="Close">×</button></div><p><b>Name:</b> {selectedUser.name}</p><p><b>Email:</b> {selectedUser.email}</p><p><b>Role:</b> {selectedUser.role}</p><p><b>Department:</b> {selectedUser.department || '—'}</p><p><b>Status:</b> {selectedUser.is_active ? 'Active' : 'Inactive'}</p><button className="create-user-button" onClick={() => { setSelectedUser(null); showHistory(selectedUser) }}>View activity history</button></section></div> : null}
        {editingUser ? <UserForm title="Edit User" form={editingUser} setForm={setEditingUser} onClose={() => setEditingUser(null)} onSubmit={saveEdit} saving={saving} submitLabel="Save changes" /> : null}
        {showDeletedUsers ? <div className="user-modal-backdrop" role="presentation"><section className="user-modal deleted-users-modal"><div><h2>Deleted users</h2><button type="button" onClick={() => setShowDeletedUsers(false)} aria-label="Close">×</button></div>{deletedUsers.length ? deletedUsers.map((user) => <div className="deleted-user-row" key={user.id}><span><b>{user.name}</b><small>{user.email}</small></span><button className="create-user-button" onClick={() => restoreUser(user)}>Restore</button></div>) : <p>No deleted users.</p>}</section></div> : null}
        {activityUser ? <div className="user-modal-backdrop" role="presentation"><section className="user-modal activity-modal"><div><h2>{activityUser.name}'s activity</h2><button type="button" onClick={() => setActivityUser(null)} aria-label="Close">×</button></div>{activities.length ? <ol className="activity-list">{activities.map((activity) => <li key={activity.id}><b>{activity.message || activity.action}</b><small>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(activity.created_at))}</small></li>)}</ol> : <p>No recorded activity for this user.</p>}</section></div> : null}
      </main></PageContainer>
    </div>
  </div>
}

function UserForm({ title, form, setForm, onClose, onSubmit, saving, submitLabel, passwordRequired = false }) {
  return <div className="user-modal-backdrop" role="presentation"><form className="user-modal" onSubmit={onSubmit}><div><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Close">×</button></div><label>Full name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>{passwordRequired ? 'Password' : 'New password (leave blank to keep current)'}<input required={passwordRequired} type="password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label><label>Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label>Department<input value={form.department || ''} onChange={(event) => setForm({ ...form, department: event.target.value })} /></label>{!passwordRequired ? <label><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Active user</label> : null}<button className="create-user-button" disabled={saving}>{saving ? 'Saving...' : submitLabel}</button></form></div>
}

function UserStat({ icon, tone, value, label }) { return <article className="user-stat"><span className={tone}>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></article> }
