import React, { useState, useEffect } from 'react';
import { Server, Database, Key, HardDrive, Bell } from 'lucide-react';

// Added our smart variable right here!
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function SystemMonitoring() {
  const [monitoring, setMonitoring] = useState([]);

  // Map icon components to the text names coming from backend
  const iconMap = {
    'API Server': Server,
    'Database Cluster': Database,
    'Authentication Svc': Key,
    'Storage Service': HardDrive,
    'Notification Engine': Bell,
  };

  useEffect(() => {
    // Replaced the hardcoded URL with our variable
    fetch(`${API_BASE_URL}/system-metrics/`)
      .then(res => res.json())
      .then(data => setMonitoring(data.monitoring))
      .catch(err => console.error("Error fetching monitoring data:", err));
  }, []);

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', height: '350px', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#111827' }}>System Monitoring</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6b7280' }}>Real-time infrastructure status</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {monitoring.map((sys, index) => {
          const IconComponent = iconMap[sys.name] || Server;
          
          return (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <IconComponent size={16} color={sys.color} />
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
          );
        })}
      </div>
    </div>
  );
}