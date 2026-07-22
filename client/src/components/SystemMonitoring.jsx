import React from 'react';
import { Server, Database, Key, HardDrive, Bell } from 'lucide-react';

const systems = [
  { name: 'API Server', status: '99.9%', color: '#10b981', icon: Server },
  { name: 'Database Cluster', status: '100%', color: '#10b981', icon: Database },
  { name: 'Authentication Svc', status: '98.2%', color: '#f59e0b', icon: Key },
  { name: 'Storage Service', status: '94.1%', color: '#ef4444', icon: HardDrive },
  { name: 'Notification Engine', status: '100%', color: '#10b981', icon: Bell },
];

export default function SystemMonitoring() {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', height: '350px' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#111827' }}>System Monitoring</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6b7280' }}>Real-time infrastructure status</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {systems.map((sys, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <sys.icon size={16} color={sys.color} />
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>{sys.name}</span>
              </div>
              <span style={{ fontSize: '14px', color: sys.color, fontWeight: 'bold' }}>{sys.status}</span>
            </div>
            {/* Progress Bar Track */}
            <div style={{ width: '100%', backgroundColor: '#f3f4f6', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              {/* Progress Bar Fill */}
              <div style={{ width: sys.status, backgroundColor: sys.color, height: '100%', borderRadius: '3px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}