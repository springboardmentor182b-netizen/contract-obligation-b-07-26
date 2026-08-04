import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, X } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function RepositoryTable({ data = [] }) {
  const [tableData, setTableData] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [viewingContract, setViewingContract] = useState(null);

  // Safely format the incoming contract data so the table can read it
  useEffect(() => {
    if (data) {
      const formatted = data.map(item => ({
        id: item.id,
        name: item.contract_name || item.name || "Untitled", // Fallbacks if name is in either field
        category: item.category || "General",
        status: item.status || "Pending"
      }));
      setTableData(formatted);
    }
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      // UPDATED: Using API_BASE_URL
      await fetch(`${API_BASE_URL}/contracts/${id}`, { method: 'DELETE' });
      setTableData(tableData.filter(row => row.id !== id));
    }
  };

  const handleSave = async (updatedContract) => {
    // UPDATED: Using API_BASE_URL
    await fetch(`${API_BASE_URL}/contracts/${updatedContract.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contract_name: updatedContract.name,
        status: updatedContract.status,
        category: updatedContract.category
      })
    });
    setTableData(tableData.map(c => c.id === updatedContract.id ? updatedContract : c));
    setEditingContract(null);
  };

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
            <th style={{ padding: '16px' }}>ID</th>
            <th style={{ padding: '16px' }}>CONTRACT NAME</th>
            <th style={{ padding: '16px' }}>CATEGORY</th>
            <th style={{ padding: '16px' }}>STATUS</th>
            <th style={{ padding: '16px' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc' }}>
              <td style={{ padding: '16px' }}>{row.id}</td>
              <td style={{ padding: '16px' }}>{row.name}</td>
              <td style={{ padding: '16px' }}>{row.category}</td>
              <td style={{ padding: '16px' }}>{row.status}</td>
              <td style={{ padding: '16px', display: 'flex', gap: '10px' }}>
                <Eye size={16} style={{ cursor: 'pointer', color: '#64748b' }} onClick={() => setViewingContract(row)} />
                <Edit size={16} style={{ cursor: 'pointer', color: '#3b82f6' }} onClick={() => setEditingContract(row)} />
                <Trash2 size={16} style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => handleDelete(row.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewingContract && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '350px' }}>
            <X size={20} style={{ float: 'right', cursor: 'pointer' }} onClick={() => setViewingContract(null)} />
            <h3>Contract Details</h3>
            <p style={{ marginTop: '15px' }}><strong>Name:</strong> {viewingContract.name}</p>
            <p><strong>Category:</strong> {viewingContract.category}</p>
            <p><strong>Status:</strong> {viewingContract.status}</p>
            <button onClick={() => setViewingContract(null)} style={{ width: '100%', padding: '10px', marginTop: '10px', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#e2e8f0' }}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingContract && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', width: '300px' }}>
            <h3>Edit Contract</h3>
            <input value={editingContract.name} onChange={(e) => setEditingContract({...editingContract, name: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
            <select value={editingContract.status} onChange={(e) => setEditingContract({...editingContract, status: e.target.value})} style={{ width: '100%', marginBottom: '20px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
            </select>
            <button onClick={() => handleSave(editingContract)} style={{ width: '100%', padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}