import React from 'react';
import styles from './Dashboard.module.css';

export default function Charts({ data }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Compliance Status</h3>
          <p className={styles.cardSubtitle}>All 84 active framework controls</p>
        </div>
      </div>

      <div className={styles.donutContainer}>
        <svg className={styles.donutSvg} width="130" height="130" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="3" strokeDasharray="58 42" strokeDashoffset="25" />
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="67" />
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray="12 88" strokeDashoffset="47" />
        </svg>
        <div className={styles.donutMeta}>
          <span className={styles.donutValue}>87%</span>
          <span className={styles.donutLabel}>Rating</span>
        </div>
      </div>

      <div className={styles.complianceList}>
        <div className={styles.complianceRow}><span>🟢 Compliant</span><span>{data.compliant}%</span></div>
        <div className={styles.complianceRow}><span>🔵 Pending</span><span>{data.pending}%</span></div>
        <div className={styles.complianceRow}><span>🟡 Delayed</span><span>{data.delayed}%</span></div>
        <div className={styles.complianceRow}><span>🔴 High Risk</span><span>{data.highRisk}%</span></div>
      </div>
    </div>
  );
}