import React, { useState } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function UploadModal({ onClose }) {
  // We include all fields expected by schemas.py to avoid 422/500 errors
  const [formData, setFormData] = useState({ 
    contract_id: '', 
    contract_name: '', 
    counterparty: '', 
    status: '', 
    category: '',
    // Added defaults for missing fields:
    owner: 'N/A',
    value: 0.0,
    due_date: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    version: 'v1.0',
    file_size: '0 MB',
    uploaded_date: new Date().toISOString().split('T')[0]
  });

  const handleUpload = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Failed to upload:', errorData);
        // This alert now shows you the specific field validation error
        alert("Upload failed: " + JSON.stringify(errorData.detail || errorData));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Upload New Contract</h2>
          <X size={20} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input placeholder="Contract ID" onChange={(e) => setFormData({...formData, contract_id: e.target.value})} style={{ padding: '8px' }} />
          <input placeholder="Contract Name" onChange={(e) => setFormData({...formData, contract_name: e.target.value})} style={{ padding: '8px' }} />
          <input placeholder="Counterparty" onChange={(e) => setFormData({...formData, counterparty: e.target.value})} style={{ padding: '8px' }} />
          <input placeholder="Status" onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ padding: '8px' }} />
          <input placeholder="Category" onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ padding: '8px' }} />
          <button onClick={handleUpload} style={{ background: '#3b82f6', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
            Submit Contract
          </button>
        </div>
      </div>
    </div>
  );
}