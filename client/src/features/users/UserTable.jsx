import React from 'react';
import { Pencil, Trash2, Power } from 'lucide-react';
import RoleBadge from './RoleBadge';
import StatusBadge from './StatusBadge';

const ROLES = [
  'Employee',
  'Department Head',
  'Contract Manager',
  'Compliance Officer',
  'Legal Manager',
  'Administrator',
];

/**
 * @param {Array} users
 * @param {(id, role) => void} onRoleChange
 * @param {(id, status) => void} onToggleStatus
 * @param {(user) => void} onEdit
 * @param {(user) => void} onDelete
 */
export default function UserTable({ users, onRoleChange, onToggleStatus, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="text-sm text-slate-400 py-10 text-center">No users match your filters.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
          <th className="py-2 font-medium">Name</th>
          <th className="py-2 font-medium">Email</th>
          <th className="py-2 font-medium">Department</th>
          <th className="py-2 font-medium">Role</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-b border-slate-50 last:border-0">
            <td className="py-3 font-medium text-slate-800">{u.name}</td>
            <td className="py-3 text-slate-500">{u.email}</td>
            <td className="py-3 text-slate-500">{u.department || '—'}</td>
            <td className="py-3">
              <div className="flex items-center gap-2">
                <RoleBadge role={u.role} />
                <select
                  value={u.role}
                  onChange={(e) => onRoleChange(u.id, e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-1.5 py-0.5 bg-white text-slate-500"
                  aria-label={`Change role for ${u.name}`}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <td className="py-3">
              <StatusBadge status={u.status} />
            </td>
            <td className="py-3">
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => onEdit(u)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onToggleStatus(u)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                  title={u.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  <Power size={14} />
                </button>
                <button
                  onClick={() => onDelete(u)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
