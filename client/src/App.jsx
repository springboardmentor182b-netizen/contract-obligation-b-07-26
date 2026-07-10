import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './layout/Sidebar.jsx'
import Navbar from './layout/Navbar.jsx'
import PageContainer from './layout/PageContainer.jsx'
import RenewalDashboard from './pages/RenewalDashboard.jsx'
import './assets/global.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <BrowserRouter>
      <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />
        <div className="main-content">
          <Navbar onToggle={() => setSidebarOpen(prev => !prev)} />
          <PageContainer>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<RenewalDashboard />} />
            </Routes>
          </PageContainer>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
