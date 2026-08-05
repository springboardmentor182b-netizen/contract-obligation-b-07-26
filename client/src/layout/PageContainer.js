import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <div style={{
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#f7fafc'
    }}>
      {children}
    </div>
  );
};

export default PageContainer;
