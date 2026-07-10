import React from 'react';
import { AlertCircle, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import styles from './Dashboard.css';

export default function RecentActivity({ data }) {
  const iconMap = {
    danger: { i: AlertCircle, c: '#ef4444', bg: '#fef2f2' },
    warn: { i: RefreshCw, c: '#f59e0b', bg: '#fffbeb' },
    info: { i: FileText, c: '#3b82f6', bg: '#eff6ff' },
    success: { i: CheckCircle, c: '#10b981', bg: '#ecfdf5' }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Recent Activity</h3>
          <p className={styles.cardSubtitle}>System ledger state events</p>
        </div>
        <button className={styles.btnText}>View all</button>
      </div>

      <div className={styles.activityList}>
        {data.map((item, idx) => {
          const config = iconMap[item.type] || iconMap.info;
          const Icon = config.i;
          return (
            <div key={idx} className={styles.activityItem}>
              <div className={styles.activityIndicator} style={{ backgroundColor: config.bg, color: config.c }}>
                <Icon size={14} />
              </div>
              <div className={styles.activityBody}>
                <div className={styles.activityRow}>
                  <span className={styles.activityText}>{item.title}</span>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
                <p className={styles.activityDesc}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}