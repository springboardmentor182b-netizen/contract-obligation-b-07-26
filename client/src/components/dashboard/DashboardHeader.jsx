import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../layouts/PageHeader';
import styles from './Dashboard.css';

export default function DashboardHeader() {
  return (
    <PageHeader 
      title="Dashboard" 
      description="Real-time contract lifecycle metrics, operational obligations, and system analytics execution."
      actions={
        <button 
          style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Plus size={15} /> New Contract
        </button>
      }
    />
  );
}