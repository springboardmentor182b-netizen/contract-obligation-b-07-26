import React, { useState, useEffect } from 'react';
import { Clock, Target, Edit3, XCircle } from 'lucide-react';

export default function ApprovalWorkflow() {
  const [stats, setStats] = useState({
    draft: 0,
    review: 0,
    approved: 0,
    active: 0
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/dashboard/stats/')
      .then(response => response.json())
      .then(data => {
        setStats({
          draft: data.draft_count || 0,
          review: data.in_review_count || 0,
          approved: data.approved_count || 0,
          active: data.active_count || 0
        });
      })
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  // We map the 4 stages we track in our database to the pipeline circles
  const steps = [
    { name: 'Draft', count: stats.draft, color: '#64748b' },
    { name: 'Review', count: stats.review, color: '#3b82f6' },
    { name: 'Approved', count: stats.approved, color: '#10b981' },
    { name: 'Active', count: stats.active, color: '#8b5cf6' }
  ];

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Approval Workflow</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Current pipeline distribution</p>

      {/* The Timeline Graphic */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px', backgroundColor: '#e2e8f0', zIndex: 1, transform: 'translateY(-50%)' }}></div>
        
        {steps.map((step, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: `2px solid ${step.color}`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: '600', color: step.color, marginBottom: '8px' }}>
              {step.count}
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{step.name}</span>
          </div>
        ))}
      </div>

      {/* Static Sub-metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
         <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '50%', color: '#3b82f6' }}><Clock size={16} /></div>
            <div>
               <div style={{ fontSize: '12px', color: '#64748b' }}>Avg. Approval Time</div>
               <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>4.2 days</div>
            </div>
         </div>
         <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#ecfdf5', padding: '8px', borderRadius: '50%', color: '#10b981' }}><Target size={16} /></div>
            <div>
               <div style={{ fontSize: '12px', color: '#64748b' }}>SLA Compliance</div>
               <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>94.1%</div>
            </div>
         </div>
         <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#fef3c7', padding: '8px', borderRadius: '50%', color: '#d97706' }}><Edit3 size={16} /></div>
            <div>
               <div style={{ fontSize: '12px', color: '#64748b' }}>Pending Signatures</div>
               <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>2 contracts</div>
            </div>
         </div>
         <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#fef2f2', padding: '8px', borderRadius: '50%', color: '#ef4444' }}><XCircle size={16} /></div>
            <div>
               <div style={{ fontSize: '12px', color: '#64748b' }}>Rejected This Month</div>
               <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>0 contracts</div>
            </div>
         </div>
      </div>
    </div>
  );
}