import React from 'react';
import StatCard from '../components/common/StatCard';
import SecurityChart from '../components/SecurityChart';
import SystemMonitoring from '../components/SystemMonitoring';
import AuditTable from '../components/AuditTable';
import { Database, ShieldAlert, Lock, Activity, Download } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ 
      padding: '32px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>
            Audit & Activity Logs
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Complete audit trail, security event monitoring, and system activity tracking
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
            <Download size={16} /> Download Logs
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
            <ShieldAlert size={16} /> Security Report
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <StatCard title="Audit Logs" value="4,821" subtitle="+48 today" icon={Database} />
        <StatCard title="Security Events" value="31" subtitle="This month" icon={ShieldAlert} />
        <StatCard title="Failed Logins" value="7" subtitle="Last 24 hours" subtitleColor="#ef4444" icon={Lock} />
        <StatCard title="User Activities" value="142" subtitle="Active sessions" icon={Activity} />
      </div>

      {/* 3. MIDDLE SECTION: CHARTS & MONITORING */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <SecurityChart />
        <SystemMonitoring />
      </div>

      {/* 4. BOTTOM SECTION: FULL WIDTH TABLE */}
      <div style={{ width: '100%' }}>
        <AuditTable />
      </div>

    </div>
  );
}