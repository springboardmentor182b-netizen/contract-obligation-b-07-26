import React from 'react';
import PageHeader from '../layouts/PageHeader';
import styles from './Pages.css';

export default function Obligations() {
  return (
    <div>
      <PageHeader title="Obligations Management" description="Track milestones, regulatory deliverables, and operational execution deadlines." />
      <div className={styles.card}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Active Framework Trackers</p>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Obligation metrics system layer working placeholder.</div>
      </div>
    </div>
  );
}