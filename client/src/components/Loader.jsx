import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '200px',
      width: '100%',
      color: '#6b7280'
    }}>
      {/* The lucide icon with a spin animation */}
      <Loader2 
        size={32} 
        color="#2563eb" 
        style={{ animation: 'spin 1s linear infinite', marginBottom: '12px' }} 
      />
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{text}</span>
      
      {/* Add a global style for the spin animation if it doesn't exist */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}