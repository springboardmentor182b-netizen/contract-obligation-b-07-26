import React from 'react';
import PageHeader from '../layouts/PageHeader';
import { Folder, ArrowUpRight } from 'lucide-react';
import styles from './Pages.css';

export default function Repository() {
  return (
    <div>
      <PageHeader title="Repository" description="Secure directory for active legacy components and document structures." />
      <div className={styles.grid3}>
        {['Legal Agreements', 'Procurement Folders', 'Internal Frameworks'].map((folder, i) => (
          <div key={i} className={styles.card} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '8px', display: 'flex' }}><Folder size={20} /></div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{folder}</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>24 objects stored</p>
              </div>
            </div>
            <ArrowUpRight size={16} style={{ color: '#94a3b8' }} />
          </div>
        ))}
      </div>
    </div>
  );
}