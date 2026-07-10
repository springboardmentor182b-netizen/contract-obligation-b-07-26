import React from 'react';
import PageHeader from '../layouts/PageHeader';
import styles from './Pages.css';

export default function Compliance() {
  return (
    <div>
      <PageHeader title="Compliance Monitoring" description="Real-time compliance posture across frameworks, departments and controls." />
      <div className={styles.card}>
        <div style={{ fontSize: '13px', color: '#64748b' }}>Framework metric tracking grid placeholder.</div>
      </div>
    </div>
  );
}