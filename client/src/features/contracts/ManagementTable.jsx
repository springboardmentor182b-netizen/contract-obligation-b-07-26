import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, X } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ManagementTable() {
  const [tableData, setTableData] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [viewingContract, setViewingContract] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = () => {
    fetch(`${API_BASE_URL}/contracts/`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          id: item.contract_id,
          name: item.contract_name || "Untitled",
          status: item.status || "Pending",
          category: item.category || "General"
        }));
        setTableData(formattedData);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      // Updated to use API_BASE_URL
      await fetch(`${API_BASE_URL}/contracts/${id}`, { method: 'DELETE' });
      setTableData(tableData.filter(row => row.id !== id));
    }
  };

  const handleSave = async (updatedContract) => {
    // Updated to use API_BASE_URL
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
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <th style={{ padding: '16px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '16px', textAlign: 'left' }}>CONTRACT</th>
            <th style={{ padding: '16px', textAlign: 'left' }}>STATUS</th>
            <th style={{ padding: '16px', textAlign: 'left' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc' }}>
              <td style={{ padding: '16px' }}>{row.id}</td>
              <td style={{ padding: '16px' }}>{row.name}</td>
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
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '350px', position: 'relative' }}>
            <X size={20} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }} onClick={() => setViewingContract(null)} />
            <h3>Contract Details</h3>
            
            <p><strong>ID:</strong> {viewingContract.id}</p>
            <p><strong>Contract Name:</strong> {viewingContract.name}</p>
            <p><strong>Status:</strong> {viewingContract.status}</p>
            <p><strong>Category:</strong> {viewingContract.category}</p>
            <button onClick={() => setViewingContract(null)} style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingContract && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', width: '300px' }}>
            <h3>Edit Contract</h3>
            <input value={editingContract.name} onChange={(e) => setEditingContract({...editingContract, name: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <select value={editingContract.status} onChange={(e) => setEditingContract({...editingContract, status: e.target.value})} style={{ width: '100%', marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setEditingContract(null)} style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleSave(editingContract)} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}