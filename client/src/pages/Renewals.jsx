import React from 'react';
import PageHeader from '../layouts/PageHeader';
import { RefreshCw } from 'lucide-react';
import styles from './Pages.css';

const mockRenewals = [
  { id: 'CTR-003', name: 'Annual HR Consulting Retainer', company: 'Meridian HR Group', value: '$96,000', days: 180, date: 'Dec 31, 2025', state: 'Upcoming' },
  { id: 'CTR-004', name: 'Manufacturing Supply Agreement', company: 'Apex Components Ltd.', value: '$3,200,000', days: 67, date: 'Sep 9, 2025', state: 'Urgent' },
];

export default function Renewals() {
  return (
    <div>
      <PageHeader title="Renewal Management" description="Track contract expirations and manage renewal workflows." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockRenewals.map((r, i) => (
          <div key={i} className={styles.card} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                <span style={{ fontSize: '14px', color: '#2563eb' }}>{r.days}</span>
                <span style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', marginTop: '2px' }}>Days</span>
              </div>
              <div>
                <span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, uppercase: 'true', border: '1px solid', marginBottom: '6px', backgroundColor: r.state === 'Urgent' ? '#fffbeb' : '#eff6ff', borderColor: r.state === 'Urgent' ? '#fde68a' : '#bfdbfe', color: r.state === 'Urgent' ? '#b45309' : '#1d4ed8' }}>{r.state}</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{r.name}</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{r.company}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8', display: 'block' }}>Value</span>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{r.value}</span>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block' }}>Expiry</span>
                <span style={{ fontWeight: 700, color: '#334155' }}>{r.date}</span>
              </div>
              <button className={`${styles.btn} ${styles.btnPrimary}`}><RefreshCw size={12}/> Initiate Renewal</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}