import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Archive, AlertCircle, Upload } from 'lucide-react';
import StatCard from '../features/repository/StatCard'; 
import CategoryChart from '../features/repository/CategoryChart';
import VersionHistory from '../features/repository/VersionHistory';
import RepositoryTable from '../features/repository/RepositoryTable';
import UploadModal from '../features/repository/UploadModal';

export default function ContractsRepository() {
  const [contracts, setContracts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/contracts/')
      .then(res => res.json())
      .then(data => setContracts(data));
  }, []);

  const total = contracts.length;
  const active = contracts.filter(c => c.status === 'Active').length;
  const archived = contracts.filter(c => c.status === 'Archived').length;
  
  const expiring = contracts.filter(c => {
    if (!c.due_date) return false;
    const dueDate = new Date(c.due_date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 90 && diffDays >= 0;
  }).length;

  // Transform contracts data into history format
  const historyData = contracts.slice(-5).map(c => ({
    title: c.contract_name,
    version: 'v1.0', 
    time: 'Recent'
  }));

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '30px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#0f172a' }}>Contract Repository</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#3b82f6', color: 'white', padding: '10px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
          <Upload size={18} /> Upload Contract
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <StatCard title="TOTAL CONTRACTS" value={total} Icon={FileText} iconColor="#3b82f6" iconBg="#eff6ff" />
        <StatCard title="ACTIVE CONTRACTS" value={active} Icon={CheckCircle} iconColor="#10b981" iconBg="#ecfdf5" />
        <StatCard title="ARCHIVED" value={archived} Icon={Archive} iconColor="#64748b" iconBg="#f1f5f9" />
        <StatCard title="EXPIRING SOON" value={expiring} Icon={AlertCircle} iconColor="#eab308" iconBg="#fef9c3" />
      </div>

      {/* Middle: Chart and Version History */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <CategoryChart />
        <VersionHistory history={historyData} /> 
      </div>

      {/* Table */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <RepositoryTable data={contracts} />
      </div>

      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}