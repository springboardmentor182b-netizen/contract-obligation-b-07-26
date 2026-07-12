import React from 'react';
import { Filter, Eye, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

const tableData = [
  { id: 'CTR-001', name: 'Enterprise SaaS Agreement', counterparty: 'Nexus Technologies', status: 'Active', owner: 'P. Nair', value: '$420,000', due: 'Dec 31, 2026', priority: 'High' },
  { id: 'CTR-002', name: 'Professional Services Contract', counterparty: 'Apex Consulting', status: 'In Review', owner: 'M. Delgado', value: '$185,000', due: 'Aug 15, 2026', priority: 'Medium' },
  { id: 'CTR-003', name: 'Supply Chain Agreement', counterparty: 'GlobalSource Ltd', status: 'Draft', owner: 'D. Okafor', value: '$92,500', due: 'Sep 30, 2026', priority: 'Low' },
  { id: 'CTR-004', name: 'Data Processing Agreement', counterparty: 'CloudVault Inc', status: 'Approved', owner: 'S. Reinholt', value: '$67,000', due: 'Mar 31, 2027', priority: 'Medium' },
  { id: 'CTR-005', name: 'IT Infrastructure Contract', counterparty: 'TechBuild Solutions', status: 'Active', owner: 'J. Whitfield', value: '$210,000', due: 'Jan 31, 2027', priority: 'High' },
  { id: 'CTR-006', name: 'Marketing Partnership', counterparty: 'Brand Elevate Co', status: 'Draft', owner: 'T. Essien', value: '$38,500', due: 'Oct 15, 2026', priority: 'Low' },
];

const getStatusBadge = (status) => {
  let bg = '#f1f5f9', text = '#64748b', dot = '#64748b';
  if (status === 'Active' || status === 'Approved') { bg = '#ecfdf5'; text = '#10b981'; dot = '#10b981'; } 
  else if (status === 'In Review') { bg = '#eff6ff'; text = '#3b82f6'; dot = '#3b82f6'; } 
  
  return (
    <span style={{ background: bg, color: text, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot }}></span>
      {status}
    </span>
  );
};

const getPriorityDot = (priority) => {
  const colors = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500', color: colors[priority] }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[priority] }}></span>
      {priority}
    </div>
  );
};

export default function ManagementTable() {
  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
      
      <div className="table-toolbar" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>Contract Table</h3>
        <div style={{ width: '100px' }}>
          <Button styleType="secondary" style={{ padding: '8px 12px' }}>
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['ID', 'Contract', 'Counterparty', 'Status', 'Owner', 'Value', 'Due Date', 'Priority', 'Actions'].map(header => (
                <th key={header} style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s', ':hover': { background: '#f8fafc' } }}>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#3b82f6', fontWeight: '500' }}>{row.id}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#0f172a', fontWeight: '600' }}>{row.name}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.counterparty}</td>
                <td style={{ padding: '16px 24px' }}>{getStatusBadge(row.status)}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.owner}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#0f172a', fontWeight: '600' }}>{row.value}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>{row.due}</td>
                <td style={{ padding: '16px 24px' }}>{getPriorityDot(row.priority)}</td>
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