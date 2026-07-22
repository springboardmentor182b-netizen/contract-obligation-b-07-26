import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, Star, Plus } from 'lucide-react';
import { API_BASE_URL } from '../config';

import StatCard from '../features/repository/StatCard'; 
import ContractStatusChart from '../features/contracts/ContractStatusChart';
import ApprovalWorkflow from '../features/contracts/ApprovalWorkflow';
import ManagementTable from '../features/contracts/ManagementTable';
import CreateContractModal from '../features/contracts/CreateContractModal';

export default function Contracts() {
  const [stats, setStats] = useState({ draft: 0, under_review: 0, approved: 0, active: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable function to fetch dashboard statistics
  const fetchStats = () => {
   
    fetch(`${API_BASE_URL}/dashboard/stats/`)
      .then(response => response.json())
      .then(data => {
        setStats({
          draft: data.draft_count || 0,
          under_review: data.in_review_count || 0,
          approved: data.approved_count || 0,
          active: data.active_count || 0
        });
      })
      .catch(error => console.error('Error fetching stats:', error));
  };

  // Run on initial load
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#0f172a' }}>Contract Management</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Full contract lifecycle from creation through execution and archival</p>
        </div>
        
        <div style={{ width: '180px' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ background: '#3b82f6', color: 'white', padding: '10px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', width: '100%', justifyContent: 'center' }}
          >
            <Plus size={18} /> Create Contract
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <StatCard title="Draft Contracts" value={stats.draft} subtext="Awaiting submission" subtextColor="#64748b" Icon={FileText} iconColor="#64748b" iconBg="#f1f5f9" />
        <StatCard title="Under Review" value={stats.under_review} subtext="Pending legal review" subtextColor="#64748b" Icon={Clock} iconColor="#3b82f6" iconBg="#eff6ff" />
        <StatCard title="Approved" value={stats.approved} subtext="↗ +12 vs last quarter" subtextColor="#10b981" Icon={CheckCircle} iconColor="#10b981" iconBg="#ecfdf5" />
        <StatCard title="Active Contracts" value={stats.active} subtext="Total value $4.2M" subtextColor="#64748b" Icon={Star} iconColor="#8b5cf6" iconBg="#f5f3ff" />
      </div>

      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <ContractStatusChart />
        <ApprovalWorkflow />
      </div>

      <ManagementTable />

      <CreateContractModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          fetchStats(); // This calls the function to update the numbers instantly
        }} 
      />
    </div>
  );
}