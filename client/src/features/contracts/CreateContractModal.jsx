import React, { useState } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../../config'; // Import the base URL

export default function CreateContractModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    contract_id: '',
    contract_name: '',
    counterparty: '',
    status: 'Draft',
    owner: '',
    value: 0,
    due_date: '',
    priority: 'Medium',
    category: 'Services',
    version: 'v1.0',
    file_size: '1.0 MB',
    uploaded_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data: ensure numeric values and correct date format
    const payload = {
      ...formData,
      value: parseFloat(formData.value),
      // Ensures date is YYYY-MM-DD
      due_date: formData.due_date ? new Date(formData.due_date).toISOString().split('T')[0] : null
    };

    try {
      // Use the imported API_BASE_URL here with template literals
      const response = await fetch(`${API_BASE_URL}/contracts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("Error saving: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Create New Contract</h2>
          <button onClick={onClose} style={{ cursor: 'pointer', border: 'none', background: 'none' }}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input required placeholder="Contract ID" name="contract_id" onChange={handleChange} style={{ padding: '10px' }} />
          <input required placeholder="Contract Name" name="contract_name" onChange={handleChange} style={{ padding: '10px' }} />
          <input required placeholder="Counterparty" name="counterparty" onChange={handleChange} style={{ padding: '10px' }} />
          <input required type="number" placeholder="Value ($)" name="value" onChange={handleChange} style={{ padding: '10px' }} />
          
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Due Date:</label>
          <input required type="date" name="due_date" onChange={handleChange} style={{ padding: '10px' }} />
          
          <input required placeholder="Owner Name" name="owner" onChange={handleChange} style={{ padding: '10px' }} />
          
          <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Save Contract
          </button>
        </form>
      </div>
    </div>
  );
}