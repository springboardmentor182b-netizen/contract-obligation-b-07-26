import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useUserManagement } from '../hooks/useUserManagement';
import UserTable from '../features/users/UserTable';
import UserFormModal from '../features/users/UserFormModal';
import ConfirmDialog from '../features/users/ConfirmDialog';

const ROLES = [
  'Employee',
  'Department Head',
  'Contract Manager',
  'Compliance Officer',
  'Legal Manager',
  'Administrator',
];

function TableSkeleton() {
  return (
    <div className="space-y-2 animate-pulse py-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 bg-slate-100 rounded-lg" />
      ))}
    </div>
  );
}

export default function Users() {
  const {
    users,
    total,
    page,
    pageSize,
    setPage,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    actionError,
    refetch,
    addUser,
    editUser,
    changeRole,
    toggleStatus,
    removeUser,
  } = useUserManagement();

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null); // { user, action: 'status' | 'delete' }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function openAddForm() {
    setEditingUser(null);
    setFormOpen(true);
  }

  function openEditForm(user) {
    setEditingUser(user);
    setFormOpen(true);
  }

  async function handleFormSubmit(payload) {
    if (editingUser) {
      await editUser(editingUser.id, payload);
    } else {
      await addUser(payload);
    }
  }

  function askToggleStatus(user) {
    setConfirmTarget({ user, action: 'status' });
  }

  function askDelete(user) {
    setConfirmTarget({ user, action: 'delete' });
  }

  async function handleConfirm() {
    if (!confirmTarget) return;
    const { user, action } = confirmTarget;
    if (action === 'status') {
      await toggleStatus(user.id, user.status);
    } else if (action === 'delete') {
      await removeUser(user.id);
    }
    setConfirmTarget(null);
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      <main className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">User Management</h1>
            <p className="text-sm text-slate-400 mt-1">Manage team members, roles, and access</p>
          </div>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            <Plus size={15} /> Add User
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          {actionError && <p className="text-xs text-red-600 mb-3">{actionError}</p>}

          {loading && <TableSkeleton />}

          {!loading && error && (
            <div className="text-center py-10">
              <p className="text-sm text-slate-600 mb-3">{error}</p>
              <button
                onClick={refetch}
                className="text-sm font-medium text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <UserTable
                users={users}
                onRoleChange={changeRole}
                onToggleStatus={askToggleStatus}
                onEdit={openEditForm}
                onDelete={askDelete}
              />

              {total > 0 && (
                <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                  <p>
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <UserFormModal open={formOpen} user={editingUser} onSubmit={handleFormSubmit} onClose={() => setFormOpen(false)} />

      <ConfirmDialog
        open={!!confirmTarget}
        title={
          confirmTarget?.action === 'delete'
            ? `Delete ${confirmTarget.user.name}?`
            : `${confirmTarget?.user.status === 'active' ? 'Deactivate' : 'Activate'} ${confirmTarget?.user.name}?`
        }
        message={
          confirmTarget?.action === 'delete'
            ? 'This permanently removes the user and cannot be undone.'
            : confirmTarget?.user.status === 'active'
            ? 'They will immediately lose access to ContractIQ.'
            : 'They will regain access to ContractIQ.'
        }
        confirmLabel={confirmTarget?.action === 'delete' ? 'Delete' : 'Confirm'}
        tone={confirmTarget?.action === 'delete' ? 'danger' : 'default'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
