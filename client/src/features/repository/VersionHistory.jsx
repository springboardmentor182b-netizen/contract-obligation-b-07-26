import React from 'react';
import { File } from 'lucide-react';

const historyData = [
  { id: 1, title: 'MSA — Vertex Corp', version: 'v3.2 → v3.3', time: '2h ago' },
  { id: 2, title: 'Software License', version: 'v1.0', time: '1d ago' },
  { id: 3, title: 'Vendor Contract', version: 'v1.3 → v1.4', time: '2d ago' },
  { id: 4, title: 'Consulting Agmt', version: 'v1.0 → v1.1', time: '5d ago' },
  { id: 5, title: 'Employment Contract', version: 'v1.0', time: '1wk ago' },
];

export default function VersionHistory() {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Version History</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Recent document updates</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {historyData.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '6px', color: '#3b82f6' }}>
                <File size={16} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>{item.title}</h5>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{item.version}</span>
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}