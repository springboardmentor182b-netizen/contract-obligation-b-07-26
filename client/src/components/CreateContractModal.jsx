import { useState, forwardRef, useImperativeHandle } from 'react'
import './CreateContractModal.scss'

const CreateContractModal = forwardRef(({ onContractCreated }, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [contractData, setContractData] = useState({
    contractNumber: '',
    title: '',
    description: '',
    category: 'Vendor',
    status: 'Draft',
    department: '',
    owner: '',
    startDate: '',
    endDate: '',
    value: '',
    renewalDate: ''
  })

  const categories = [
    'Vendor',
    'Service',
    'Employment',
    'Lease',
    'NDA',
    'Partnership',
    'Compliance',
    'Insurance'
  ]

  const statuses = [
    'Draft',
    'Under Review',
    'Approved',
    'Active',
    'Expired',
    'Terminated'
  ]

  const departments = [
    'HR',
    'IT',
    'Procurement',
    'Legal',
    'Finance',
    'Marketing',
    'Facilities',
    'Security',
    'Compliance',
    'Risk Management'
  ]

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true)
      generateContractNumber()
    }
  }))

  const close = () => {
    setIsVisible(false)
    resetForm()
  }

  const resetForm = () => {
    setContractData({
      contractNumber: '',
      title: '',
      description: '',
      category: 'Vendor',
      status: 'Draft',
      department: '',
      owner: '',
      startDate: '',
      endDate: '',
      value: '',
      renewalDate: ''
    })
    setIsSaving(false)
  }

  const generateContractNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    setContractData(prev => ({ ...prev, contractNumber: `CON-${timestamp}` }))
  }

  const saveContract = () => {
    if (!contractData.title) {
      alert('Please enter a contract title')
      return
    }

    setIsSaving(true)

    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      
      const newContract = {
        id: Date.now(),
        contractNumber: contractData.contractNumber,
        title: contractData.title,
        description: contractData.description,
        category: contractData.category,
        status: contractData.status,
        department: contractData.department,
        owner: contractData.owner,
        renewalDate: contractData.renewalDate || contractData.endDate,
        version: 'v1.0',
        starred: false,
        fileSize: '0.5 MB',
        pageCount: 5
      }

      onContractCreated(newContract)
      close()
    }, 1000)
  }

  const onStatusChange = () => {
    // Auto-set status based on dates if needed
    if (contractData.status === 'Active' && !contractData.startDate) {
      setContractData(prev => ({ 
        ...prev, 
        startDate: new Date().toISOString().split('T')[0] 
      }))
    }
  }

  if (!isVisible) return null

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Contract</h2>
          <button className="close-btn" onClick={close}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label>Contract Number</label>
                <input 
                  type="text" 
                  value={contractData.contractNumber}
                  placeholder="Auto-generated"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Contract Title *</label>
                <input 
                  type="text" 
                  value={contractData.title}
                  onChange={(e) => setContractData({ ...contractData, title: e.target.value })}
                  placeholder="Enter contract title"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  value={contractData.description}
                  onChange={(e) => setContractData({ ...contractData, description: e.target.value })}
                  placeholder="Enter contract description"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select 
                  value={contractData.category}
                  onChange={(e) => setContractData({ ...contractData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select 
                  value={contractData.status}
                  onChange={(e) => {
                    setContractData({ ...contractData, status: e.target.value })
                    onStatusChange()
                  }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select 
                  value={contractData.department}
                  onChange={(e) => setContractData({ ...contractData, department: e.target.value })}
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Owner</label>
                <input 
                  type="text" 
                  value={contractData.owner}
                  onChange={(e) => setContractData({ ...contractData, owner: e.target.value })}
                  placeholder="Enter owner name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  value={contractData.startDate}
                  onChange={(e) => setContractData({ ...contractData, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  value={contractData.endDate}
                  onChange={(e) => setContractData({ ...contractData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contract Value</label>
                <input 
                  type="text" 
                  value={contractData.value}
                  onChange={(e) => setContractData({ ...contractData, value: e.target.value })}
                  placeholder="Enter contract value"
                />
              </div>
              <div className="form-group">
                <label>Renewal Date</label>
                <input 
                  type="date" 
                  value={contractData.renewalDate}
                  onChange={(e) => setContractData({ ...contractData, renewalDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={close}>Cancel</button>
          <button 
            className="btn btn-primary" 
            onClick={saveContract}
            disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Create Contract'}
          </button>
        </div>
      </div>
    </div>
  )
})

CreateContractModal.displayName = 'CreateContractModal'

export default CreateContractModal
