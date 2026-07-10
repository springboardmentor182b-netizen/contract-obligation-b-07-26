import React from 'react'

function Notifications({ items = [], onClose }) {
  return (
    <div style={{ position: 'absolute', right: 24, top: 72, zIndex: 1200, width: 320 }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(2,6,23,0.12)', overflow: 'hidden' }}>
        <div style={{ padding: 12, borderBottom: '1px solid #eef2f6', fontWeight: 700 }}>Notifications</div>
        <div style={{ maxHeight: 320, overflow: 'auto' }}>
          {items.map(n => (
            <div key={n.id} style={{ padding: 12, borderBottom: '1px solid #f3f6fb' }}>
              <div style={{ fontWeight: 700 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{n.time}</div>
            </div>
          ))}
          {items.length === 0 && <div style={{ padding: 12, color: '#64748b' }}>No notifications</div>}
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Notifications
