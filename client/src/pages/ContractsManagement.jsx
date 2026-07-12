import React from 'react';
import { FileText, Clock, CheckCircle, Star, Plus } from 'lucide-react';
import Button from '../components/common/Button';

import StatCard from '../features/repository/StatCard'; 
import ContractStatusChart from '../features/contracts/ContractStatusChart';
import ApprovalWorkflow from '../features/contracts/ApprovalWorkflow';
import ManagementTable from '../features/contracts/ManagementTable';

export default function Contracts() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <div className="dashboard-header">
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#0f172a' }}>Contract Management</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Full contract lifecycle from creation through execution and archival</p>
        </div>
        <div style={{ width: '180px' }}>
          <Button styleType="primary">
            <Plus size={18} /> Create Contract
          </Button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Draft Contracts" value="34" subtext="Awaiting submission" subtextColor="#64748b" Icon={FileText} iconColor="#64748b" iconBg="#f1f5f9" />
        <StatCard title="Under Review" value="28" subtext="Pending legal review" subtextColor="#64748b" Icon={Clock} iconColor="#3b82f6" iconBg="#eff6ff" />
        <StatCard title="Approved" value="67" subtext="↗ +12 vs last quarter" subtextColor="#10b981" Icon={CheckCircle} iconColor="#10b981" iconBg="#ecfdf5" />
        <StatCard title="Active Contracts" value="89" subtext="Total value $4.2M" subtextColor="#64748b" Icon={Star} iconColor="#8b5cf6" iconBg="#f5f3ff" />
      </div>

      <div className="charts-grid">
        <ContractStatusChart />
        <ApprovalWorkflow />
      </div>

      <ManagementTable />
    </div>
  );
}