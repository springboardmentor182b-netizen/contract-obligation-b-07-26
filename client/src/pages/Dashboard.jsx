import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KPICards from '../components/dashboard/KPICards';
import Analytics from '../components/dashboard/Analytics';
import Charts from '../components/dashboard/Charts';
import RenewalTrend from '../components/dashboard/RenewalTrend';
import RecentActivity from '../components/dashboard/RecentActivity';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationsWidget from '../components/dashboard/NotificationsWidget';

import { fetchLiveTelemetry } from '../services/dashboardApi';
import styles from '../components/dashboard/Dashboard.module.css';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveTelemetry().then((res) => {
      setMetrics(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
        Loading analytical telemetry grids...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DashboardHeader />
      
      <div className={styles.dashboardGrid}>
        {/* Row 1: Key Performance Indicators Metric Modules Block */}
        <KPICards data={metrics.kpis} />

        {/* Row 2: Double Column Visual Analytics Charts */}
        <div className={styles.col8}>
          <Analytics data={metrics.volumes} />
        </div>
        <div className={styles.col4}>
          <Charts data={metrics.compliance} />
        </div>

        {/* Row 3: Auxiliary Analytical Feed and Vectors */}
        <div className={styles.col4}>
          <RenewalTrend />
        </div>
        <div className={styles.col4}>
          <RecentActivity data={metrics.activities} />
        </div>
        <div className={styles.col4} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <QuickActions />
          <NotificationsWidget />
        </div>

        {/* Row 4: Wide Primary Operational Table Queue Grid */}
        <div className={styles.col12}>
          <UpcomingDeadlines data={metrics.deadlines} />
        </div>
      </div>
    </div>
  );
}