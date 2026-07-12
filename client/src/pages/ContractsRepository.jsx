import React from 'react';
import { FileText, CheckCircle, Archive, AlertCircle, Upload } from 'lucide-react';
import Button from '../components/common/Button';
import StatCard from '../features/repository/StatCard';
import CategoryChart from '../features/repository/CategoryChart';
import VersionHistory from '../features/repository/VersionHistory';
import ContractTable from '../features/repository/ContractTable';

export default function Dashboard() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div className="dashboard-header">
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#0f172a' }}>Contract Repository</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Centralized document storage, version control, and contract management</p>
        </div>
        <div style={{ width: '200px' }}>
          <Button styleType="primary">
            <Upload size={18} /> Upload Contract
          </Button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Contracts" value="340" subtext="↗ +24 this quarter" subtextColor="#10b981" Icon={FileText} iconColor="#3b82f6" iconBg="#eff6ff" />
        <StatCard title="Active Contracts" value="218" subtext="64.1% of total" subtextColor="#64748b" Icon={CheckCircle} iconColor="#10b981" iconBg="#ecfdf5" />
        <StatCard title="Archived" value="89" subtext="26.2% of total" subtextColor="#64748b" Icon={Archive} iconColor="#64748b" iconBg="#f1f5f9" />
        <StatCard title="Expiring Soon" value="33" subtext="↘ Within 90 days" subtextColor="#ef4444" Icon={AlertCircle} iconColor="#f59e0b" iconBg="#fffbeb" />
      </div>

      <div className="charts-grid">
        <CategoryChart />
        <VersionHistory />
      </div>

      <ContractTable />
    </div>
  );
}