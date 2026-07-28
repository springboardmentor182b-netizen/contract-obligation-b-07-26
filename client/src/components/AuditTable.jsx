import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

// Added: Pull the base URL from your .env file
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function AuditTable() {
  const [logs, setLogs] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('');
  const { globalSearch } = useSearch();

  useEffect(() => {
    // Changed: Using the API_BASE_URL variable here
    let url = `${API_BASE_URL}/audit-logs/?`;
    if (globalSearch) url += `search=${globalSearch}&`;
    if (severityFilter) url += `severity=${severityFilter}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [globalSearch, severityFilter]);

  const getSeverityStyles = (severity) => {
    if (severity === 'Critical') return { color: '#ef4444', bg: '#fee2e2' };
    if (severity === 'Warning') return { color: '#f59e0b', bg: '#fef3c7' };
    return { color: '#3b82f6', bg: '#dbeafe' };
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Audit Log Table</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', padding: '6px 12px', backgroundColor: '#f9fafb' }}>
            <Search size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder={globalSearch ? globalSearch : "Use top navbar to search..."} 
              style={{ border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent', color: '#6b7280' }} 
            />
          </div>

          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', outline: 'none' }}
          >
            <option value="">All Severities</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>
          
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Log ID</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>User</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Action</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Module</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>IP Address</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Severity</th>
            <th style={{ padding: '16px 20px', fontWeight: '600' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, i) => {
              const styles = getSeverityStyles(log.severity);
              const avatarBg = log.user_name === 'Unknown' ? '#fee2e2' : '#2563eb';
              
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 20px', color: '#3b82f6', fontWeight: '500' }}>{log.log_id}</td>
                  <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', color: log.user_name === 'Unknown' ? '#ef4444' : '#111827' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: avatarBg, color: log.user_name === 'Unknown' ? '#ef4444' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                      {log.user_initials}
                    </div>
                    {log.user_name}
                  </td>
                  <td style={{ padding: '16px 20px', color: '#4b5563' }}>{log.action}</td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>{log.module}</td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>{log.ip_address}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: styles.bg, color: styles.color, padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: styles.color }}></span>
                      {log.severity}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>{formatDate(log.timestamp)}</td>
                </tr>
              );
            })
          ) : (
            /* NEW: This shows up when the database is empty! */
            <tr>
              <td colSpan="7" style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                No audit logs found. The system is currently quiet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', fontSize: '14px', color: '#6b7280' }}>
        <span>Showing {logs.length} entries</span>
        
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {logs.length > 0 ? (
            <button style={{ padding: '4px 10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>1</button>
          ) : (
            <span style={{ fontSize: '12px' }}>No records found</span>
          )}
        </div>
      </div>

    </div>
  );
}