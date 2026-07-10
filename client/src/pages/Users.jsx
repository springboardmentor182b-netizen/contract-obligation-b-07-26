import React from 'react';
import PageHeader from '../layouts/PageHeader';
import styles from './Pages.css';

const mockUsers = [
  { name: 'Sarah Mitchell', email: 's.mitchell@contractiq.com', role: 'Legal Manager', dept: 'Legal', status: 'Active' },
  { name: 'James Okonkwo', email: 'j.okonkwo@contractiq.com', role: 'Compliance Officer', dept: 'Operations', status: 'Active' },
  { name: 'David Reyes', email: 'd.reyes@contractiq.com', role: 'Contract Manager', dept: 'Procurement', status: 'Active' }
];

export default function Users() {
  return (
    <div>
      <PageHeader title="User Management" description="Review department system access matrices, permissions lines, and active user state controls." />
      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Profile Name</th>
                <th>Email Workspace</th>
                <th>Assigned Role</th>
                <th>Department</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{user.name}</td>
                  <td style={{ color: '#64748b' }}>{user.email}</td>
                  <td><span style={{ padding: '2px 6px', backgroundColor: '#eff6ff', color: '#1d4ed8', fontSize: '10px', fontWeight: 700, borderRadius: '4px' }}>{user.role}</span></td>
                  <td style={{ color: '#94a3b8' }}>{user.dept}</td>
                  <td style={{ color: '#10b981', fontWeight: 700 }}>● {user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}