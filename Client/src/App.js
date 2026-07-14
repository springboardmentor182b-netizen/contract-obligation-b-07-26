import { useState } from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from './layout/Navbar'
import PageContainer from './layout/PageContainer'
import './assets/global.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />
      <div className="main-content">
        <Navbar onToggle={() => setSidebarOpen(prev => !prev)} />
        <PageContainer>
          <div className="dashboard-hero">
            <div className="dashboard-header">
              <div className="header-copy">
                <p className="page-breadcrumb">Renewal Management</p>
                <h1>Renewal Management</h1>
                <p className="page-subtitle">
                  All contract renewals, approvals, reminders, and analytics in one place
                </p>
              </div>
              <div className="header-actions">
                <button className="btn-secondary">Export</button>
                <button className="btn-primary">Add Renewal</button>
              </div>
            </div>
            <div className="hero-content">
              <div className="dashboard-panel blank-panel">
                <div className="panel-title">Overview panel</div>
                <div className="panel-empty">This area is ready for your contract renewal widgets.</div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  )
}

export default App
