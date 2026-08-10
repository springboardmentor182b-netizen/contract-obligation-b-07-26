import React, { useEffect } from 'react';
import { useUserDashboard } from '../hooks/useUserDashboard';

export default function UserDashboardScreen() {
  useEffect(() => {
    try {
      // @ts-ignore
      window.lucide?.createIcons();
    } catch (e) {}
  }, []);

  const {
    header,
    tabs,
    activeTab,
    setActiveTab,
    statistics,
    profile,
    sessions,
    securityCards,
    roleSummaries,
    users,
    permissionMatrix,
    activities,
    toggleUserStatus,
    updatePermission,
  } = useUserDashboard();
  // guard against missing data during initial render
  if (!permissionMatrix) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  const roleLabels = Object.keys(permissionMatrix) as Array<keyof typeof permissionMatrix>;
  const modules = roleLabels.length ? (Object.keys(permissionMatrix[roleLabels[0]]) as string[]) : [];
  const pm = permissionMatrix as any;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex flex-col">
          <h2 className="text-xs text-slate-400 font-medium">User & Role Management</h2>
          <span className="text-xs text-slate-500">June 3, 2024</span>
        </div>

        <div className="relative w-96 hidden sm:block">
          <i data-lucide="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input type="text" placeholder="Search contracts, obligations..." className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:bg-white transition" />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition">
            <i data-lucide="bell" className="w-5 h-5"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">SC</div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-semibold leading-tight">Sarah Chen</p>
              <span className="text-[10px] text-purple-600 font-medium bg-purple-50 px-1.5 py-0.2 rounded">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User & Role Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage users, roles, permissions, and authentication settings across ContractIQ</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-lg text-sm font-medium hover:bg-slate-50 transition">
              <i data-lucide="user-plus" className="w-4 h-4"></i> Invite User
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition">
              <i data-lucide="plus" className="w-4 h-4"></i> New Role
            </button>
          </div>
        </div>

        <div className="border-b border-slate-200">
          <nav className="flex gap-6 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  `pb-3 text-sm whitespace-nowrap flex items-center gap-2 ${tab === activeTab ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`
                }
              >
                <i data-lucide={
                  tab === 'Overview & Profile' ? 'user' : tab === 'User Management' ? 'users' : tab === 'Roles & Permissions' ? 'shield-check' : tab === 'Permission Matrix' ? 'grid' : 'history'
                } className="w-4 h-4"></i>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><i data-lucide="users" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">8</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Users</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><i data-lucide="user-check" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">7</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Active Users</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><i data-lucide="lock" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">6</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Roles Defined</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><i data-lucide="key" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">42</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Permissions</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg"><i data-lucide="building" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">7</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Departments</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><i data-lucide="monitor" className="w-5 h-5"></i></div>
            <div>
              <span className="text-2xl font-bold block">2</span>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Active Sessions</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">My Profile</h3>
              <button className="text-xs font-semibold text-blue-600 hover:underline">Edit Profile</button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-inner">SC</div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">Sarah Chen</h4>
                  <p className="text-sm font-medium text-blue-600">Legal Manager</p>
                  <span className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Active Â· Last login: Jun 3, 2024
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Employee ID</span>
                  <p className="font-medium text-slate-800">EMP-001</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Email Address</span>
                  <p className="font-medium text-slate-800">sarah.chen@contractiq.com</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Phone Number</span>
                  <p className="font-medium text-slate-800">+1 (555) 010-2345</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Department</span>
                  <p className="font-medium text-slate-800">Legal</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Designation</span>
                  <p className="font-medium text-slate-800">Senior Legal Manager</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Assigned Role</span>
                  <p className="font-medium text-slate-800">Legal Manager</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Active Sessions</h3>
                <button className="text-xs font-medium text-red-600 hover:underline">Logout All Devices</button>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg flex gap-3 items-start border border-slate-100">
                  <i data-lucide="chrome" className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"></i>
                  <div className="text-xs w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Chrome 124 / Windows 11</span>
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 font-bold rounded scale-90">Current</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">New York, US</p>
                    <p className="text-slate-500 font-mono mt-1">Login: Jun 3, 2024 9:14 AM</p>
                    <p className="text-slate-400 font-mono text-[11px]">Expires: Jun 3, 2024 5:14 PM</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg flex gap-3 items-start border border-slate-100">
                  <i data-lucide="compass" className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"></i>
                  <div className="text-xs w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Safari 17 / macOS Sonoma</span>
                      <button className="text-red-500 hover:underline font-medium">Logout</button>
                    </div>
                    <p className="text-slate-400 mt-0.5">Remote â€” VPN</p>
                    <p className="text-slate-500 font-mono mt-1">Login: Jun 3, 2024 8:00 AM</p>
                    <p className="text-slate-400 font-mono text-[11px]">Expires: Jun 3, 2024 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Security & Authentication</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Authentication Method</span>
                  <span className="font-mono font-semibold text-slate-800">JWT + Bearer Token</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Session Timeout</span>
                  <span className="font-semibold text-slate-800">8 hours</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Last Password Change</span>
                  <span className="font-semibold text-slate-800">Apr 15, 2024</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-400 font-medium">2FA Status</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic tab content */}
        {activeTab === 'Overview & Profile' && null}

        {activeTab === 'User Management' && (
          <section>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">User Registry</h2>
                  <p className="text-sm text-slate-500">Manage active users, teams, and role assignments across the enterprise.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Last Active</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{user.name.split(' ').map((n) => n[0]).join('').slice(0,2)}</div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{user.name}</div>
                              <div className="text-xs text-slate-400">{user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">{user.department}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{user.assignedRole}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{user.email}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`px-3 py-1 text-xs rounded-full font-semibold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
                          >
                            {user.status}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">{user.lastActive}</td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button className="text-slate-500 hover:text-slate-800">View</button>
                          <button className="text-blue-600 hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Roles & Permissions' && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roleSummaries.map((role) => (
                <div key={role.role} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">{role.role}</h3>
                    <div className="text-xs text-slate-400">{role.writeCount} write</div>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div>Read: <strong className="text-slate-800">{role.readCount}</strong></div>
                    <div>Write: <strong className="text-slate-800">{role.writeCount}</strong></div>
                    <div>None: <strong className="text-slate-800">{role.noneCount}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Permission Matrix' && (
          <section>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Module</th>
                    {roleLabels.map((r) => (
                      <th key={r} className="px-4 py-3 text-left text-xs font-medium text-slate-500">{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr key={module} className="border-t">
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">{module}</td>
                      {roleLabels.map((role) => (
                        <td key={`${module}-${role}`} className="px-4 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs bg-slate-100">{pm[role as any][module as any]}</span>
                            <div className="ml-auto">
                              <button
                                onClick={() => updatePermission(role as any, module as any, 'Read')}
                                className="text-xs text-slate-500 hover:text-slate-800 mr-2"
                              >
                                Read
                              </button>
                              <button
                                onClick={() => updatePermission(role as any, module as any, 'Write')}
                                className="text-xs text-slate-500 hover:text-slate-800"
                              >
                                Write
                              </button>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'Activity Logs' && (
          <section>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Activity Log</h2>
                  <p className="text-sm text-slate-500">Login history Â· Failed attempts Â· Password & role changes Â· Account locks</p>
                </div>
                <button className="text-sm text-slate-500">Export</button>
              </div>

              <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <div>
                      <div className="text-xs text-slate-400">{act.timestamp}</div>
                      <div className="text-sm font-medium text-slate-900">{act.user}</div>
                      <div className="text-sm text-slate-700">{act.action}</div>
                      <div className="text-xs text-slate-400">{act.module} Â· {act.ip}</div>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded">Success</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
