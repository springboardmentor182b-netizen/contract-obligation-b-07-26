import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './PageContainer.css';

const PageContainer = ({ children }) => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
