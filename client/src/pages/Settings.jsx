import React from 'react';
import PageHeader from '../layouts/PageHeader';
import styles from './Pages.css';

export default function Settings() {
  return (
    <div>
      <PageHeader title="System Settings" description="Global application overrides, notifications channels setup, and metadata schema configurations." />
      <div className={styles.card} style={{ maxWidth: '600px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Workspace Environment Profile</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Organization Identifier</label>
            <input type="text" disabled value="ContractIQ Core Production Global" style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc', color: '#334155', fontWeight: 500, fontSize: '13px' }}/>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Encryption Framework Matrix</label>
            <span style={{ color: '#047857', fontWeight: 700, backgroundColor: '#ecfdf5', padding: '6px 12px', borderRadius: '6px', inlineBlock: 'true', border: '1px solid #a7f3d0', fontSize: '12px' }}>AES-256 Cloud Standard Activated</span>
          </div>
        </div>
      </div>
    </div>
  );
}