import React from 'react';
import { PlusCircle, FileCheck, ShieldAlert, UploadCloud } from 'lucide-react';
import styles from './Dashboard.css';

export default function QuickActions() {
  const actions = [
    { label: 'Create Contract', icon: PlusCircle, color: '#2563eb' },
    { label: 'Upload Document', icon: UploadCloud, color: '#10b981' },
    { label: 'Execute Review', icon: FileCheck, color: '#7c3aed' },
    { label: 'Audit Alert Trigger', icon: ShieldAlert, color: '#ef4444' }
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Quick Actions</h3>
          <p className={styles.cardSubtitle}>Workflow entrypoints</p>
        </div>
      </div>
      <div className={styles.actionGrid}>
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <button key={i} className={styles.actionBtn}>
              <Icon size={18} style={{ color: act.color }} />
              <span className={styles.actionLabel}>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}