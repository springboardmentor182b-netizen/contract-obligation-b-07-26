import React from 'react';
import { Search, Download, Eye, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

const tableData = [
  { id: 'CTR-001', name: 'Master Services Agreement — Vertex Corp', category: 'Services', status: 'Active', version: 'v3.2', size: '2.4 MB', uploaded: 'Jan 15, 2026' },
  { id: 'CTR-002', name: 'Software License — CloudSys Inc', category: 'Technology', status: 'Active', version: 'v1.0', size: '1.1 MB', uploaded: 'Feb 3, 2026' },
  { id: 'CTR-003', name: 'NDA — Finport Ltd', category: 'NDA', status: 'Archived', version: 'v2.1', size: '0.6 MB', uploaded: 'Mar 22, 2026' },
  { id: 'CTR-004', name: 'Vendor Contract — SupplyGrid Global', category: 'Procurement', status: 'Active', version: 'v1.4', size: '3.2 MB', uploaded: 'Apr 10, 2026' },
  { id: 'CTR-005', name: 'Employment Contract — Sr. Engineer', category: 'HR', status: 'Active', version: 'v1.0', size: '0.8 MB', uploaded: 'May 1, 2026' },
  { id: 'CTR-006', name: 'Consulting Agreement — Apex Strategy', category: 'Consulting', status: 'Expired', version: 'v1.1', size: '1.7 MB', uploaded: 'Jun 20, 2026' },
];

const getStatusBadge = (status) => {
  let config = { bg: '', text: '', dot: '' };
  if (status === 'Active') { config = { bg: '#ecfdf5', text: '#10b981', dot: '#10b981' }; } 
  else if (status === 'Archived') { config = { bg: '#f1f5f9', text: '#64748b', dot: '#64748b' }; } 
  else if (status === 'Expired') { config = { bg: '#fef2f2', text: '#ef4444', dot: '#ef4444' }; }

  return (
    <span style={{ background: config.bg, color: config.text, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.dot }}></span>
      {status}
    </span>
  );
};

export default function ContractTable() {
  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
      
      {/* Managed by CSS for mobile stacking */}
      <div className="table-toolbar">
        <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>Contract Repository</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }} className="nav-tools">
          <div className="search-input-wrapper" style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              style={{ padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', width: '250px' }}
            />
          </div>
          <div style={{ width: '100px' }}>
            <Button styleType="secondary" style={{ padding: '8px 12px' }}>
              <Download size={16} /> Export
            </Button>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Contract Name</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Version</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Size</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Uploaded</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s', ':hover': { background: '#f8fafc' } }}>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#3b82f6', fontWeight: '500' }}>{row.id}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#0f172a', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>{row.category}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>{getStatusBadge(row.status)}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.version}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.size}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.uploaded}</td>
                <td style={{ padding: '16px 24px', display: 'flex', gap: '8px' }}>
                  <button style={{ background: '#eff6ff', border: 'none', padding: '6px', borderRadius: '6px', color: '#3b82f6', cursor: 'pointer' }}><Eye size={14} /></button>
                  <button style={{ background: '#fffbeb', border: 'none', padding: '6px', borderRadius: '6px', color: '#f59e0b', cursor: 'pointer' }}><Edit size={14} /></button>
                  <button style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}