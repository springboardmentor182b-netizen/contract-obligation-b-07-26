import React from 'react';
import { Search, Filter } from 'lucide-react';

const logs = [
  { id: 'LOG-4821', initials: 'AT', name: 'Alexandra Thornton', action: 'User account blocked', module: 'User Mgmt', ip: '192.168.1.42', severity: 'Warning', date: 'Jul 4, 09:14 AM', color: '#f59e0b', bg: '#fef3c7', avatarBg: '#2563eb' },
  { id: 'LOG-4820', initials: 'MD', name: 'Marcus Delgado', action: 'Contract status updated', module: 'Contracts', ip: '192.168.1.55', severity: 'Info', date: 'Jul 4, 08:52 AM', color: '#3b82f6', bg: '#dbeafe', avatarBg: '#2563eb' },
  { id: 'LOG-4819', initials: 'PN', name: 'Priya Nair', action: 'Document uploaded', module: 'Repository', ip: '10.0.0.18', severity: 'Info', date: 'Jul 4, 08:41 AM', color: '#3b82f6', bg: '#dbeafe', avatarBg: '#2563eb' },
  { id: 'LOG-4818', initials: '⚠️', name: 'Unknown', action: 'Failed login attempt', module: 'Auth', ip: '45.33.22.197', severity: 'Critical', date: 'Jul 4, 07:55 AM', color: '#ef4444', bg: '#fee2e2', avatarBg: '#fee2e2' },
  { id: 'LOG-4817', initials: '⚠️', name: 'Unknown', action: 'Failed login attempt', module: 'Auth', ip: '45.33.22.197', severity: 'Critical', date: 'Jul 4, 07:54 AM', color: '#ef4444', bg: '#fee2e2', avatarBg: '#fee2e2' },
  { id: 'LOG-4816', initials: 'SR', name: 'Sofia Reinholt', action: 'Compliance report generated', module: 'Compliance', ip: '192.168.1.60', severity: 'Info', date: 'Jul 4, 07:40 AM', color: '#3b82f6', bg: '#dbeafe', avatarBg: '#2563eb' },
  { id: 'LOG-4815', initials: 'DO', name: 'Derek Okafor', action: 'Role permissions modified', module: 'User Mgmt', ip: '192.168.1.77', severity: 'Warning', date: 'Jul 3, 05:30 PM', color: '#f59e0b', bg: '#fef3c7', avatarBg: '#2563eb' },
];

export default function AuditTable() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      
      {/* Table Header Controls */}
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Audit Log Table</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', padding: '6px 12px' }}>
            <Search size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
            <input type="text" placeholder="Search logs..." style={{ border: 'none', outline: 'none', fontSize: '14px' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
            <Filter size={16} /> Severity
          </button>
        </div>
      </div>

      {/* Table Data */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Log ID</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>User</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Action</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Module</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>IP Address</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Severity</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '16px 20px', color: '#3b82f6', fontWeight: '500' }}>{log.id}</td>
              <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', color: log.name === 'Unknown' ? '#ef4444' : '#111827' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: log.avatarBg, color: log.name === 'Unknown' ? '#ef4444' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  {log.initials}
                </div>
                {log.name}
              </td>
              <td style={{ padding: '16px 20px', color: '#4b5563' }}>{log.action}</td>
              <td style={{ padding: '16px 20px', color: '#6b7280' }}>{log.module}</td>
              <td style={{ padding: '16px 20px', color: '#6b7280' }}>{log.ip}</td>
              <td style={{ padding: '16px 20px' }}>
                <span style={{ backgroundColor: log.bg, color: log.color, padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: log.color }}></span>
                  {log.severity}
                </span>
              </td>
              <td style={{ padding: '16px 20px', color: '#6b7280' }}>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', fontSize: '14px', color: '#6b7280' }}>
        <span>Showing 7 of 4,821 entries</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>1</button>
          <button style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>2</button>
          <span style={{ padding: '6px' }}>...</span>
          <button style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>482</button>
        </div>
      </div>

    </div>
  );
}