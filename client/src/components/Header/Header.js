import { Download } from 'lucide-react'
import './Header.css'
import { exportDashboard } from '../../api/headerApi'
import { exportPDF } from '../../utils/exportPDF'

function Header({ openModal, obligations }) {
  const isTracker = typeof openModal === 'function'
  const handleExport = isTracker ? () => exportPDF(obligations || []) : exportDashboard

  return (
    <div className="header">
      <div className="header-left">
        <h1>{isTracker ? 'Obligation Tracker' : 'Compliance Monitoring'}</h1>
        <p>{isTracker ? 'Track and manage contractual obligations efficiently.' : 'Track, monitor, and manage compliance across all obligations.'}</p>
      </div>
      <div className="header-right">
        <button className="export-btn" onClick={handleExport}><Download className="export-icon" />Export {isTracker ? 'PDF' : 'Dashboard'}</button>
        {isTracker && <button className="add-btn" onClick={openModal}>+ Add Obligation</button>}
      </div>
    </div>
  )
}

export default Header