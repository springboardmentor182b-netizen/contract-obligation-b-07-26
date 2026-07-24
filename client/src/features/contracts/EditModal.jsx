import React, { useState } from 'react';

export default function EditModal({ contract, onClose, onSave }) {
  const [name, setName] = useState(contract.name);
  const [status, setStatus] = useState(contract.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...contract, name, status });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
        <h3>Edit Contract</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', marginBottom: '20px' }}>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Approved">Approved</option>
        </select>
        <button type="submit" style={{ marginRight: '10px' }}>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}