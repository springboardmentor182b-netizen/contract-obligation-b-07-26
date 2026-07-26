import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import SecurityChart from '../components/SecurityChart';
import SystemMonitoring from '../components/SystemMonitoring';
import AuditTable from '../components/AuditTable';
import { Database, ShieldAlert, Lock, Activity, Download } from 'lucide-react';

// Added our smart variable right here!
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_logs: 0,
    security_events: 0,
    failed_logins: 0,
    user_activities: 0
  });

  useEffect(() => {
    // Replaced the hardcoded URL
    fetch(`${API_BASE_URL}/audit-stats/`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const handleDownloadLogs = () => {
    // Replaced the hardcoded URL here as well
    fetch(`${API_BASE_URL}/audit-logs/`)
      .then(res => res.json())
      .then(data => {
        const headers = ["Log ID", "User", "Action", "Module", "IP Address", "Severity", "Timestamp"];
        const rows = data.map(log => [
          log.log_id,
          `"${log.user_name}"`,
          `"${log.action}"`,
          log.module,
          log.ip_address,
          log.severity,
          log.timestamp
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + 
          [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "audit_logs.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => alert("Failed to download logs from server."));
  };

  const handleSecurityReport = () => {
    alert("Generating Security Summary Report... Your report will be ready shortly.");
  };

  return (
    <div style={{ 
      padding: '32px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
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
          <button 
            onClick={handleDownloadLogs}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#334155' }}
          >
            <Download size={16} /> Download Logs
          </button>
          <button 
            onClick={handleSecurityReport}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
          >
            <ShieldAlert size={16} /> Security Report
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <StatCard title="AUDIT LOGS" value={stats.total_logs} subtitle="Total recorded" icon={Database} />
        <StatCard title="SECURITY EVENTS" value={stats.security_events} subtitle="Critical severities" icon={ShieldAlert} />
        <StatCard title="FAILED LOGINS" value={stats.failed_logins} subtitle="Auth failures" subtitleColor="#ef4444" icon={Lock} />
        <StatCard title="USER ACTIVITIES" value={stats.user_activities} subtitle="Active sessions" icon={Activity} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <SecurityChart />
        <SystemMonitoring />
      </div>

      <div style={{ width: '100%' }}>
        <AuditTable />
      </div>

    </div>
  );
}