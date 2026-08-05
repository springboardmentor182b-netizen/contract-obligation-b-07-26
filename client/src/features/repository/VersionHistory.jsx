import React from 'react';
import { FileText } from 'lucide-react';

// We add 'history' as a parameter (prop) here
export default function VersionHistory({ history = [] }) {
  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Version History</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Recent document updates</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* We map the 'history' prop passed from the parent component */}
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', color: '#64748b' }}>
                <FileText size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{item.version}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.time}</div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>No recent updates.</p>
        )}
      </div>
    </div>
  );
}