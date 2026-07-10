import React from 'react';
import PageHeader from '../layouts/PageHeader';
import { Plus } from 'lucide-react';
import styles from './Pages.css';

export default function Dashboard() {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Real-time contract overview analytics telemetry data frame."
        actions={<button className={`${styles.btn} ${styles.btnPrimary}`}><Plus size={16} /> New Contract</button>}
      />
      <div className={`${styles.card} ${styles.textCenter}`}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>Dashboard modules populate through Branch 2 components.</p>
      </div>
    </div>
  );
}