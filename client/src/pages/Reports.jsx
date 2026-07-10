import React from 'react';
import PageHeader from '../layouts/PageHeader';
import { BarChart3, FileSpreadsheet, FileText } from 'lucide-react';
import styles from './Pages.css';

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports & Analytics" description="Generate, schedule, and export compliance and contract reports." />
      <div className={styles.grid3}>
        {[
          { t: 'PDF Report', d: 'Fully formatted report with charts.', color: '#ef4444', bg: '#fef2f2', i: FileText },
          { t: 'Excel Export', d: 'Spreadsheet with data structures.', color: '#10b981', bg: '#ecfdf5', i: FileSpreadsheet },
          { t: 'CSV Export', d: 'Comma-separated structural lines.', color: '#3b82f6', bg: '#eff6ff', i: BarChart3 }
        ].map((item, idx) => {
          const Icon = item.i;
          return (
            <div key={idx} className={styles.card} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'start' }}>
                <div style={{ backgroundColor: item.bg, color: item.color, padding: '10px', borderRadius: '12px', display: 'flex' }}><Icon size={18}/></div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.t}</h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>{item.d}</p>
                </div>
              </div>
              <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>Configure Engine</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}