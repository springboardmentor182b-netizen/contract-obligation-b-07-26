import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './Dashboard.css';

export default function KPICard({ title, value, subtext, trend, trendUp, icon: Icon, themeColor }) {
  // Theme definitions mapped across static assets styles context
  const themeMap = {
    blue: { icon: '#2563eb', bg: '#eff6ff' },
    emerald: { icon: '#10b981', bg: '#ecfdf5' },
    amber: { icon: '#f59e0b', bg: '#fffbeb' },
    rose: { icon: '#ef4444', bg: '#fef2f2' },
    cyan: { icon: '#06b6d4', bg: '#ecfeff' }
  };

  const selectedTheme = themeMap[themeColor] || themeMap.blue;

  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiTop}>
        <span className={styles.kpiLabel}>{title}</span>
        <div className={styles.iconWrapper} style={{ backgroundColor: selectedTheme.bg, color: selectedTheme.icon }}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <h2 className={styles.kpiValue}>{value}</h2>
        <div className={styles.kpiFooter}>
          <span className={styles.kpiSubtext}>{subtext}</span>
          <span className={styles.trendBadge} style={{ 
            backgroundColor: trendUp ? '#ecfdf5' : '#fef2f2', 
            color: trendUp ? '#047857' : '#b91c1c' 
          }}>
            {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}