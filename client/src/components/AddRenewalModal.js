import React, { useState } from 'react';

// ─── PURE JS ALIAS ───
const e = React.createElement;

function AddRenewalModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Legal');
  const [renewalDate, setRenewalDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    const item = {
      id: `r${Date.now()}`,
      name,
      department,
      renewalDate,
      daysRemaining: Math.round((new Date(renewalDate) - new Date()) / (1000 * 60 * 60 * 24)),
      status: 'Upcoming',
      priority
    };
    onSubmit(item);
  }

  // ─── PURE JS RENDER TREE ───
  return e('div', { style: { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'grid', placeItems: 'center', zIndex: 2000 } },
    e('form', { onSubmit: submit, style: { width: 640, background: '#fff', padding: 20, borderRadius: 12 } },
      
      e('h3', { style: { marginTop: 0 } }, 'Add Renewal'),
      
      e('div', { style: { display: 'grid', gap: 10 } },
        
        // Contract Name Input
        e('label', null,
          'Contract name',
          e('input', { 
            value: name, 
            onChange: (evt) => setName(evt.target.value), 
            required: true, 
            style: { width: '100%', padding: 10, marginTop: 6 } 
          })
        ),

        // Department Input
        e('label', null,
          'Department',
          e('input', { 
            value: department, 
            onChange: (evt) => setDepartment(evt.target.value), 
            required: true, 
            style: { width: '100%', padding: 10, marginTop: 6 } 
          })
        ),

        // Date and Priority Row
        e('div', { style: { display: 'flex', gap: 10 } },
          
          e('label', { style: { flex: 1 } },
            'Renewal date',
            e('input', { 
              type: 'date', 
              value: renewalDate, 
              onChange: (evt) => setRenewalDate(evt.target.value), 
              required: true, 
              style: { width: '100%', padding: 10, marginTop: 6 } 
            })
          ),

          e('label', { style: { width: 160 } },
            'Priority',
            e('select', { 
              value: priority, 
              onChange: (evt) => setPriority(evt.target.value), 
              style: { width: '100%', padding: 10, marginTop: 6 } 
            },
              e('option', null, 'Critical'),
              e('option', null, 'High'),
              e('option', null, 'Medium'),
              e('option', null, 'Low')
            )
          )
        ),

        // Action Buttons
        e('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 8 } },
          e('button', { 
            type: 'button', 
            onClick: onClose, 
            style: { padding: '10px 14px' } 
          }, 'Cancel'),
          
          e('button', { 
            type: 'submit', 
            style: { padding: '10px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8 } 
          }, 'Add renewal')
        )
      )
    )
  );
}

export default AddRenewalModal;