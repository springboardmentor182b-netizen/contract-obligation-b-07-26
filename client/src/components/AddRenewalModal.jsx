import { useState } from 'react'

function AddRenewalModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('Legal')
  const [renewalDate, setRenewalDate] = useState('')
  const [priority, setPriority] = useState('Medium')

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    const item = {
      id: `r${Date.now()}`,
      name,
      department,
      renewalDate,
      daysRemaining: Math.round((new Date(renewalDate) - new Date()) / (1000 * 60 * 60 * 24)),
      status: 'Upcoming',
      priority
    }
    onSubmit(item)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'grid', placeItems: 'center', zIndex: 2000 }}>
      <form onSubmit={submit} style={{ width: 640, background: '#fff', padding: 20, borderRadius: 12 }}>
        <h3 style={{ marginTop: 0 }}>Add Renewal</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          <label>
            Contract name
            <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
          </label>
          <label>
            Department
            <input value={department} onChange={e => setDepartment(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ flex: 1 }}>
              Renewal date
              <input type="date" value={renewalDate} onChange={e => setRenewalDate(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
            </label>
            <label style={{ width: 160 }}>
              Priority
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: 10, marginTop: 6 }}>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 14px' }}>Cancel</button>
            <button type="submit" style={{ padding: '10px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8 }}>Add renewal</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRenewalModal
