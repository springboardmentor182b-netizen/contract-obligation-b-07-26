import React, { useState, useEffect, useRef } from 'react';
import { FiFilter, FiDownload } from 'react-icons/fi';
import './ContractHeader.css';
import { exportContractsCSV, exportContractsExcel } from '../api';

const ContractHeader = ({ filters = {} }) => {
  const [exportLoading, setExportLoading] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

  const handleExport = async (format) => {
    setExportLoading(true);
    try {
      let blob;
      let filename;
      
      if (format === 'csv') {
        blob = await exportContractsCSV(filters);
        filename = 'contracts.csv';
      } else if (format === 'excel') {
        blob = await exportContractsExcel(filters);
        filename = 'contracts.xlsx';
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setShowExportMenu(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export contracts. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="contract-header">
      <div className="header-titles">
        <h1 className="page-title">Contract Management</h1>
        <p className="page-subtitle">Create, edit, and manage the full contract lifecycle</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-secondary action-btn">
          <FiFilter className="btn-icon" />
          Filter
        </button>
        <div className="export-container" style={{ position: 'relative' }} ref={menuRef}>
          <button 
            className="btn btn-secondary action-btn"
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={exportLoading}
          >
            <FiDownload className="btn-icon" />
            {exportLoading ? 'Exporting...' : 'Export'}
          </button>
          {showExportMenu && (
            <div className="export-menu" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1000,
              minWidth: '150px'
            }}>
              <button 
                className="export-option"
                onClick={() => handleExport('csv')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                Export as CSV
              </button>
              <button 
                className="export-option"
                onClick={() => handleExport('excel')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                Export as Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractHeader;
