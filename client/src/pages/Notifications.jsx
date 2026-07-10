import React from 'react';
import PageHeader from '../layouts/PageHeader';
import { AlertTriangle, Info } from 'lucide-react';
import styles from './Pages.css';

const mockNotifications = [
  { title: 'Obligation Overdue', text: 'Building maintenance audit for CTR-002 is 4 days overdue. Immediate action required.', time: '2 hours ago', type: 'error' },
  { title: 'Contract Renewal in 67 Days', text: 'Manufacturing Supply Agreement with Apex Components Ltd. expires September 9, 2025.', time: '1 day ago', type: 'warning' },
  { title: 'Contract Pending Review', text: 'Cloud Infrastructure Services (CTR-007) has been submitted to Legal for review and approval.', time: '2 days ago', type: 'info' }
];

export default function Notifications() {
  return (
    <div>
      <PageHeader title="Notifications" description="Manage actions, dynamic validation flags, and operational alerts." />
      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        {mockNotifications.map((n, i) => (
          <div key={i} style={{ padding: '16px', display: 'flex', gap: '14px', borderBottom: i !== mockNotifications.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <div style={{ 
              padding: '6px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignSelf: 'start',
              backgroundColor: n.type === 'error' ? '#fef2f2' : n.type === 'warning' ? '#fffbeb' : '#eff6ff',
              color: n.type === 'error' ? '#ef4444' : n.type === 'warning' ? '#f59e0b' : '#3b82f6'
            }}>
              <AlertTriangle size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{n.title}</h4>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}