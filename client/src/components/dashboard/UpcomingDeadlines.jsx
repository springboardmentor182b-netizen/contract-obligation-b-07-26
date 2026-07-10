import React from 'react';
import styles from './Dashboard.css';

export default function UpcomingDeadlines({ data }) {
  return (
    <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
      <div className={styles.cardHeader} style={{ padding: '20px 24px 12px 24px', margin: 0 }}>
        <div>
          <h3 className={styles.cardTitle}>Upcoming Deadlines</h3>
          <p className={styles.cardSubtitle}>Monitored lifecycle tracking lines (Next 90 days)</p>
        </div>
        <button className={styles.exportBtn}>Export Layout</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Obligation</th>
              <th>Due Date</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontWeight: 500 }}>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td style={{ color: '#2563eb', fontWeight: 700 }}>{row.id}</td>
                <td style={{ color: '#0f172a', fontWeight: 700 }}>{row.label}</td>
                <td style={{ color: '#64748b' }}>{row.date}</td>
                <td style={{ color: '#475569' }}>{row.user}</td>
                <td>
                  <span style={{ 
                    padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                    backgroundColor: row.priority === 'Critical' ? '#fef2f2' : '#fffbeb',
                    color: row.priority === 'Critical' ? '#b91c1c' : '#b45309',
                    border: row.priority === 'Critical' ? '1px solid #fca5a5' : '1px solid #fde68a'
                  }}>{row.priority}</span>
                </td>
                <td>
                  <span style={{
                    padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
                    backgroundColor: row.status === 'Overdue' ? '#fef2f2' : row.status === 'In Progress' ? '#fffbeb' : '#f1f5f9',
                    color: row.status === 'Overdue' ? '#ef4444' : row.status === 'In Progress' ? '#d97706' : '#475569'
                  }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}