import React from 'react';
import styles from './Dashboard.css';

export default function RenewalTrend() {
  const values = [60, 45, 85, 65, 75, 55, 40];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Renewals Trend</h3>
          <p className={styles.cardSubtitle}>Monthly renewal activity 2025</p>
        </div>
      </div>
      
      {/* Dynamic line vector canvas matching dashboard metrics definitions mapping context */}
      <div style={{ position: 'relative', height: '140px', marginTop: '10px' }}>
        <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <path 
            d="M 10 40 Q 60 70 100 15 T 190 35 T 290 65" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <circle cx="100" cy="15" r="4" fill="#f59e0b" />
          <circle cx="190" cy="35" r="4" fill="#f59e0b" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: '8px', marginTop: '12px' }}>
          {months.map((m, i) => (
            <span key={i} style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}