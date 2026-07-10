import React from 'react';
import KPICard from './KPICard';
import { FileText, CheckCircle, RefreshCw, AlertCircle, Shield } from 'lucide-react';
import styles from './Dashboard.css';

export default function KPICards({ data }) {
  const icons = [FileText, CheckCircle, RefreshCw, AlertCircle, Shield];

  return (
    <div className={styles.kpiGrid}>
      {data.map((kpi, idx) => (
        <KPICard 
          key={idx}
          title={kpi.title}
          value={kpi.value}
          subtext={kpi.subtext}
          trend={kpi.trend}
          trendUp={kpi.trendUp}
          themeColor={kpi.themeColor}
          icon={icons[idx] || FileText}
        />
      ))}
    </div>
  );
}