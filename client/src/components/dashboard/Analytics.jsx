import React from 'react';
import styles from './Dashboard.module.css';

export default function Analytics({ data }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Contract Volume</h3>
          <p className={styles.cardSubtitle}>Jan – Jul 2025</p>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#2563eb' }}></span>Active</div>
          <div className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#10b981' }}></span>New</div>
          <div className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#ef4444' }}></span>Expired</div>
        </div>
      </div>

      {/* Structured Pure Mini CSS Flex Bar Chart Matrix Elements */}
      <div className={styles.barChartCanvas}>
        {data.map((d, i) => (
          <div key={i} className={styles.barGroup}>
            <div className={styles.barStack}>
              <div style={{ height: `${(d.active / 50) * 100}%`, backgroundColor: '#2563eb' }} className={styles.bar}></div>
              <div style={{ height: `${(d.new / 50) * 100}%`, backgroundColor: '#10b981' }} className={styles.bar}></div>
              <div style={{ height: `${(d.expired / 50) * 100}%`, backgroundColor: '#ef4444' }} className={styles.bar}></div>
            </div>
            <span className={styles.axisLabel}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}