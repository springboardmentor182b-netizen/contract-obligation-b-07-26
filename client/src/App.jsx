import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './layout/Sidebar.jsx'
import Navbar from './layout/Navbar.jsx'
import PageContainer from './layout/PageContainer.jsx'
import Home from './pages/Home.jsx'
import RenewalDashboard from './pages/RenewalDashboard.jsx'
import AddRenewalModal from './components/AddRenewalModal.jsx'
import Notifications from './components/Notifications.jsx'
import { exportCsv } from './utils/exportCsv.js'
import mockData from './services/mockData.js'
import './assets/global.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [renewals, setRenewals] = useState(mockData.renewals)
  const [notifications, setNotifications] = useState(mockData.notifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <BrowserRouter>
      <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />
        <div className="main-content">
          <Navbar
            onToggle={() => setSidebarOpen(prev => !prev)}
            onSearchChange={q => setSearchQuery(q)}
            notifications={notifications}
            onToggleNotifications={() => setShowNotifications(s => !s)}
          />
          {showNotifications && (
            <Notifications items={notifications} onClose={() => setShowNotifications(false)} />
          )}
          <PageContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={<RenewalDashboard renewals={renewals} searchQuery={searchQuery} onExport={() => exportCsv(renewals)} onAdd={() => setShowAddModal(true)} />}
              />
            </Routes>
          </PageContainer>
          <AddRenewalModal
            open={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={item => {
              setRenewals(prev => [item, ...prev])
              setShowAddModal(false)
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
