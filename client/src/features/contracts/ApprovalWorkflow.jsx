import React from 'react';
import { Clock, Target, Edit3, XCircle } from 'lucide-react';

const pipeline = [
  { label: 'Draft', value: 34, color: '#64748b' },
  { label: 'Review', value: 28, color: '#3b82f6' },
  { label: 'Legal', value: 19, color: '#8b5cf6' },
  { label: 'Approved', value: 67, color: '#10b981' },
  { label: 'Active', value: 89, color: '#10b981' },
];

const MiniCard = ({ title, value, Icon, iconColor, iconBg }) => (
  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ background: iconBg, color: iconColor, padding: '10px', borderRadius: '50%' }}>
      <Icon size={18} />
    </div>
    <div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{value}</div>
    </div>
  </div>
);

export default function ApprovalWorkflow() {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Approval Workflow</h3>
      <p style={{ margin: '0 0 30px 0', fontSize: '13px', color: '#64748b' }}>Current pipeline distribution</p>
      
      {/* Pipeline Visual */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', position: 'relative' }}>
        {/* The connecting line behind the circles */}
        <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '2px', background: '#f1f5f9', zIndex: 0 }}></div>
        
        {pipeline.map((step, index) => (
          <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1, background: 'white', padding: '0 10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: `2px solid ${step.color}`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>
              {step.value}
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{step.label}</span>
          </div>
        ))}
      </div>

      {/* Mini Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <MiniCard title="Avg. Approval Time" value="4.2 days" Icon={Clock} iconColor="#3b82f6" iconBg="#eff6ff" />
        <MiniCard title="SLA Compliance" value="94.1%" Icon={Target} iconColor="#10b981" iconBg="#ecfdf5" />
        <MiniCard title="Pending Signatures" value="11 contracts" Icon={Edit3} iconColor="#f59e0b" iconBg="#fffbeb" />
        <MiniCard title="Rejected This Month" value="3 contracts" Icon={XCircle} iconColor="#ef4444" iconBg="#fef2f2" />
      </div>
    </div>
  );
}