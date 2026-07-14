import { useState, useRef, useEffect } from 'react'
import UploadContractModal from './UploadContractModal'
import CreateContractModal from './CreateContractModal'
import FilterPanel from './FilterPanel'
import './ContractRepository.scss'

function ContractRepository() {
  const [stats, setStats] = useState({
    totalContracts: 12,
    starred: 3,
    archived: 1
  })

  const categories = [
    { name: 'All', icon: '📋', count: 12 },
    { name: 'Vendor', icon: '🏢', count: 4 },
    { name: 'Service', icon: '⚙️', count: 2 },
    { name: 'Employment', icon: '👥', count: 1 },
    { name: 'Lease', icon: '🏠', count: 1 },
    { name: 'NDA', icon: '🔒', count: 1 },
    { name: 'Partnership', icon: '🤝', count: 1 },
    { name: 'Compliance', icon: '✓', count: 1 },
    { name: 'Insurance', icon: '🛡️', count: 1 }
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('modified')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContract, setSelectedContract] = useState(null)
  const [activeTab, setActiveTab] = useState('Details')
  const detailTabs = ['Details', 'Versions', 'Activity']

  const [activeFilters, setActiveFilters] = useState({
    category: 'All',
    status: 'All',
    department: 'All',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    starred: false,
    archived: false
  })

  const uploadModalRef = useRef(null)
  const createModalRef = useRef(null)
  const filterPanelRef = useRef(null)

  const [contracts, setContracts] = useState([
    {
      id: 1,
      contractNumber: 'CTR-2024-012',
      title: 'Logistics Framework Agreement – DHL',
      description: 'Comprehensive logistics and supply chain management agreement',
      category: 'Vendor',
      status: 'Under Review',
      department: 'Operations',
      owner: 'Tom Weston',
      renewalDate: '2025-08-01',
      version: 'v1.0',
      starred: true,
      fileSize: '2.4 MB',
      pageCount: 18,
      modifiedDate: '2024-11-28',
      createdDate: '2024-11-20',
      parties: ['Our Company', 'DHL Express'],
      startDate: '2024-12-01',
      endDate: '2025-11-30',
      value: '$1,250,000',
      tags: ['Logistics', 'Supply Chain', 'Operations']
    },
    {
      id: 2,
      contractNumber: 'CTR-2024-008',
      title: 'Microsoft Azure Enterprise Agreement',
      description: 'Enterprise cloud infrastructure and services agreement',
      category: 'Vendor',
      status: 'Active',
      department: 'IT',
      owner: 'Sarah Chen',
      renewalDate: '2025-03-15',
      version: 'v3.1',
      starred: true,
      fileSize: '3.2 MB',
      pageCount: 24,
      modifiedDate: '2024-10-15',
      createdDate: '2024-01-10',
      parties: ['Our Company', 'Microsoft Corporation'],
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      value: '$2,500,000',
      tags: ['Cloud', 'Infrastructure', 'IT']
    },
    {
      id: 3,
      contractNumber: 'CTR-2024-015',
      title: 'SaaS Platform License – Salesforce',
      description: 'CRM platform licensing and support services',
      category: 'Vendor',
      status: 'Active',
      department: 'Sales',
      owner: 'Alex Ruiz',
      renewalDate: '2025-06-30',
      version: 'v4.0',
      starred: true,
      fileSize: '1.8 MB',
      pageCount: 12,
      modifiedDate: '2024-11-10',
      createdDate: '2024-02-01',
      parties: ['Our Company', 'Salesforce.com'],
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      value: '$850,000',
      tags: ['CRM', 'Sales', 'SaaS']
    },
    {
      id: 4,
      contractNumber: 'CTR-2024-020',
      title: 'AWS Reserved Instances Agreement',
      description: 'Amazon Web Services reserved instances for cost optimization',
      category: 'Vendor',
      status: 'Active',
      department: 'IT',
      owner: 'Sarah Chen',
      renewalDate: '2025-12-31',
      version: 'v1.1',
      starred: false,
      fileSize: '1.5 MB',
      pageCount: 8,
      modifiedDate: '2024-11-25',
      createdDate: '2024-11-01',
      parties: ['Our Company', 'Amazon Web Services'],
      startDate: '2024-11-15',
      endDate: '2025-11-14',
      value: '$1,800,000',
      tags: ['Cloud', 'Infrastructure', 'Cost Optimization']
    },
    {
      id: 5,
      contractNumber: 'CTR-2024-005',
      title: 'Strategic Partnership – Deloitte',
      description: 'Strategic consulting and professional services partnership',
      category: 'Partnership',
      status: 'Draft',
      department: 'Legal',
      owner: 'Nia Foster',
      renewalDate: '2025-09-30',
      version: 'v0.5',
      starred: false,
      fileSize: '2.8 MB',
      pageCount: 20,
      modifiedDate: '2024-11-20',
      createdDate: '2024-11-15',
      parties: ['Our Company', 'Deloitte Consulting'],
      startDate: '2025-01-01',
      endDate: '2027-12-31',
      value: '$3,200,000',
      tags: ['Consulting', 'Strategy', 'Partnership']
    },
    {
      id: 6,
      contractNumber: 'CTR-2024-010',
      title: 'Employment Agreement – Software Engineer',
      description: 'Full-time employment contract for senior software engineer',
      category: 'Employment',
      status: 'Active',
      department: 'HR',
      owner: 'Emily Watson',
      renewalDate: '2025-01-20',
      version: 'v1.2',
      starred: false,
      fileSize: '0.8 MB',
      pageCount: 6,
      modifiedDate: '2024-06-01',
      createdDate: '2024-05-15',
      parties: ['Our Company', 'John Smith'],
      startDate: '2024-05-20',
      endDate: '2025-05-19',
      value: '$150,000',
      tags: ['Employment', 'Engineering', 'HR']
    },
    {
      id: 7,
      contractNumber: 'CTR-2024-002',
      title: 'Office Lease Agreement – Downtown',
      description: 'Commercial office space lease for headquarters',
      category: 'Lease',
      status: 'Active',
      department: 'Facilities',
      owner: 'James Miller',
      renewalDate: '2026-01-01',
      version: 'v1.0',
      starred: false,
      fileSize: '4.5 MB',
      pageCount: 22,
      modifiedDate: '2024-07-01',
      createdDate: '2024-06-01',
      parties: ['Our Company', 'Prime Properties LLC'],
      startDate: '2024-07-01',
      endDate: '2029-06-30',
      value: '$2,400,000',
      tags: ['Real Estate', 'Facilities', 'Lease']
    },
    {
      id: 8,
      contractNumber: 'CTR-2024-018',
      title: 'Supplier NDA – TechParts Ltd',
      description: 'Non-disclosure agreement for supplier partnership',
      category: 'NDA',
      status: 'Active',
      department: 'Procurement',
      owner: 'Dana Kim',
      renewalDate: '2025-04-01',
      version: 'v1.0',
      starred: false,
      fileSize: '0.5 MB',
      pageCount: 3,
      modifiedDate: '2024-04-05',
      createdDate: '2024-03-20',
      parties: ['Our Company', 'TechParts Ltd'],
      startDate: '2024-03-25',
      endDate: '2027-03-24',
      value: 'Confidential',
      tags: ['NDA', 'Procurement', 'Supplier']
    },
    {
      id: 9,
      contractNumber: 'CTR-2024-014',
      title: 'IT Managed Services Agreement',
      description: 'Comprehensive IT support and managed services',
      category: 'Service',
      status: 'Active',
      department: 'IT',
      owner: 'David Park',
      renewalDate: '2025-05-20',
      version: 'v2.0',
      starred: false,
      fileSize: '2.8 MB',
      pageCount: 14,
      modifiedDate: '2024-09-20',
      createdDate: '2024-08-05',
      parties: ['Our Company', 'TechSolutions Inc'],
      startDate: '2024-08-15',
      endDate: '2025-08-14',
      value: '$450,000',
      tags: ['IT', 'Managed Services', 'Support']
    },
    {
      id: 10,
      contractNumber: 'CTR-2024-022',
      title: 'Annual Compliance Audit Report',
      description: 'Regulatory compliance and audit documentation',
      category: 'Compliance',
      status: 'Active',
      department: 'Compliance',
      owner: 'Rachel Green',
      renewalDate: '2025-02-28',
      version: 'v1.0',
      starred: false,
      fileSize: '1.5 MB',
      pageCount: 10,
      modifiedDate: '2024-10-10',
      createdDate: '2024-09-15',
      parties: ['Our Company', 'Audit Partners LLC'],
      startDate: '2024-09-20',
      endDate: '2025-09-19',
      value: '$75,000',
      tags: ['Compliance', 'Audit', 'Regulatory']
    },
    {
      id: 11,
      contractNumber: 'CTR-2024-025',
      title: 'General Liability Insurance Policy',
      description: 'Business liability insurance coverage',
      category: 'Insurance',
      status: 'Active',
      department: 'Risk Management',
      owner: 'Tom Anderson',
      renewalDate: '2025-06-01',
      version: 'v1.0',
      starred: false,
      fileSize: '1.2 MB',
      pageCount: 7,
      modifiedDate: '2024-11-05',
      createdDate: '2024-10-20',
      parties: ['Our Company', 'Insurance Corp'],
      startDate: '2024-11-01',
      endDate: '2025-10-31',
      value: '$125,000',
      tags: ['Insurance', 'Risk Management', 'Liability']
    },
    {
      id: 12,
      contractNumber: 'CTR-2024-028',
      title: 'Vendor Agreement – Office Supplies',
      description: 'Office equipment and supplies procurement contract',
      category: 'Vendor',
      status: 'Archived',
      department: 'Procurement',
      owner: 'Dana Kim',
      renewalDate: '2024-12-31',
      version: 'v1.1',
      starred: false,
      fileSize: '0.9 MB',
      pageCount: 5,
      modifiedDate: '2024-12-01',
      createdDate: '2024-11-15',
      parties: ['Our Company', 'Office Supplies Co'],
      startDate: '2024-11-20',
      endDate: '2024-12-31',
      value: '$25,000',
      tags: ['Procurement', 'Supplies', 'Vendor']
    }
  ])

  const [filteredContracts, setFilteredContracts] = useState(contracts)

  useEffect(() => {
    filterContracts()
  }, [selectedCategory, activeFilters, searchTerm, sortBy])

  const filterContracts = () => {
    const filtered = contracts.filter(contract => {
      const categoryMatch = selectedCategory === 'All' || contract.category === selectedCategory
      const filterCategoryMatch = activeFilters.category === 'All' || contract.category === activeFilters.category
      const filterStatusMatch = activeFilters.status === 'All' || contract.status === activeFilters.status
      const filterDepartmentMatch = activeFilters.department === 'All' || contract.department === activeFilters.department
      const filterStarredMatch = !activeFilters.starred || contract.starred
      const searchMatch = !searchTerm || 
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      return categoryMatch && filterCategoryMatch && filterStatusMatch && filterDepartmentMatch && filterStarredMatch && searchMatch
    })

    sortContracts(filtered)
  }

  const sortContracts = (contractsToSort) => {
    const sorted = [...contractsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'date':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case 'modified':
        default:
          return new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
      }
    })
    setFilteredContracts(sorted)
  }

  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  const selectContract = (contract) => {
    setSelectedContract(contract)
  }

  const closeDetails = () => {
    setSelectedContract(null)
  }

  const toggleStar = (contractId, event) => {
    event.stopPropagation()
    setContracts(prev => {
      const updated = prev.map(c => {
        if (c.id === contractId) {
          return { ...c, starred: !c.starred }
        }
        return c
      })
      setStats({ ...stats, starred: updated.filter(c => c.starred).length })
      return updated
    })
  }

  const setView = (view) => {
    console.log('Set view:', view)
  }

  const createNewContract = () => {
    createModalRef.current?.open()
  }

  const uploadContract = () => {
    uploadModalRef.current?.open()
  }

  const toggleFilter = () => {
    filterPanelRef.current?.toggle()
  }

  const onFiltersChanged = (filters) => {
    setActiveFilters(filters)
  }

  const onFiltersReset = () => {
    setActiveFilters({
      category: 'All',
      status: 'All',
      department: 'All',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      starred: false,
      archived: false
    })
  }

  const onContractUploaded = (contract) => {
    setContracts(prev => {
      const updated = [contract, ...prev]
      setStats({ ...stats, totalContracts: updated.length })
      return updated
    })
  }

  const onContractCreated = (contract) => {
    setContracts(prev => {
      const updated = [contract, ...prev]
      setStats({ ...stats, totalContracts: updated.length })
      return updated
    })
  }

  const getStatusClass = (status) => {
    if (!status) return ''
    return `status-${status.toLowerCase().replace(' ', '-')}`
  }

  const getCategoryClass = (category) => {
    if (!category) return ''
    return `badge-${category.toLowerCase()}`
  }

  return (
    <div className={`contract-repository ${selectedContract ? 'split-view' : ''}`}>
      {/* Header Section */}
      <div className="header-section">
        <h1 className="page-title">Contract Repository</h1>
        <p className="page-subtitle">{stats.totalContracts} contracts • {stats.starred} starred • {stats.archived} archived</p>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="action-left">
          <button className="icon-btn" onClick={toggleFilter}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
          </button>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="modified">Last Modified</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
          <div className="view-toggle">
            <button className="view-btn active" onClick={() => setView('list')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 10h16M4 14h16"/>
              </svg>
            </button>
            <button className="view-btn" onClick={() => setView('grid')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M4 4h4v4H4zM12 4h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="action-right">
          <button className="btn btn-secondary" onClick={createNewContract}>Create New</button>
          <button className="btn btn-primary" onClick={uploadContract}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" style={{marginRight: 8}}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Upload Contract
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(category => (
          <button 
            key={category.name}
            className={`category-tab ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => selectCategory(category.name)}>
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, owner, department, category..."
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Contract List Panel */}
        <div className={`contract-list-panel ${selectedContract ? 'expanded' : ''}`}>
          <div className="contract-card">
            <table className="contract-table">
              <thead className="table-header">
                <tr>
                  <th className="col-star"></th>
                  <th className="col-id">Contract ID</th>
                  <th className="col-name">Contract Name</th>
                  <th className="col-category">Category</th>
                  <th className="col-department">Department</th>
                  <th className="col-owner">Owner</th>
                  <th className="col-status">Status</th>
                  <th className="col-renewal">Renewal Date</th>
                  <th className="col-version">Version</th>
                  <th className="col-size">Size</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map(contract => (
                  <tr 
                    key={contract.id}
                    className={`contract-row ${selectedContract?.id === contract.id ? 'selected' : ''}`}
                    onClick={() => selectContract(contract)}>
                    <td className="col-star">
                      <button 
                        className={`star-btn ${contract.starred ? 'starred' : ''}`} 
                        onClick={(e) => toggleStar(contract.id, e)}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </button>
                    </td>
                    <td className="col-id">{contract.contractNumber}</td>
                    <td className="col-name">
                      <div className="contract-name-cell">
                        <div className="contract-title">{contract.title}</div>
                        <div className="contract-subtitle">{contract.description}</div>
                      </div>
                    </td>
                    <td className="col-category">
                      <span className={`category-badge ${getCategoryClass(contract.category)}`}>
                        {contract.category}
                      </span>
                    </td>
                    <td className="col-department">{contract.department}</td>
                    <td className="col-owner">{contract.owner}</td>
                    <td className="col-status">
                      <span className={`status-badge ${getStatusClass(contract.status)}`}>
                        <span className="status-dot"></span>
                        {contract.status}
                      </span>
                    </td>
                    <td className="col-renewal">{contract.renewalDate}</td>
                    <td className="col-version">{contract.version}</td>
                    <td className="col-size">{contract.fileSize}</td>
                    <td className="col-actions">
                      <div className="action-icons">
                        <button className="action-icon" onClick={(e) => { e.stopPropagation(); console.log('View:', contract.id) }} title="View">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button className="action-icon" onClick={(e) => { e.stopPropagation(); console.log('Download:', contract.id) }} title="Download">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                          </svg>
                        </button>
                        <button className="action-icon danger" onClick={(e) => { e.stopPropagation(); console.log('Delete:', contract.id) }} title="Delete">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="table-footer">
            <div className="pagination">
              <span className="pagination-info">Showing {filteredContracts.length} of {contracts.length} contracts</span>
              <div className="pagination-controls">
                <button className="page-btn" disabled>&lt;</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn" disabled>&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className={`details-panel ${selectedContract ? 'visible' : ''}`}>
          <div className="details-header">
            <div className="contract-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M16 21H8"/>
              </svg>
            </div>
            <div className="contract-info">
              <h2 className="contract-title">{selectedContract?.title}</h2>
              <div className="contract-meta">
                <span className="contract-number">{selectedContract?.contractNumber}</span>
                <span className={`status-badge ${getStatusClass(selectedContract?.status)}`}>
                  <span className="status-dot"></span>
                  {selectedContract?.status}
                </span>
                <span className="version-badge">v{selectedContract?.version}</span>
              </div>
            </div>
            <button className="close-btn" onClick={closeDetails}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="details-tabs">
            {detailTabs.map(tab => (
              <button 
                key={tab}
                className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'Details' && (
              <div className="details-tab-content">
                <div className="detail-section">
                  <h3 className="detail-section-title">Contract Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Contract ID</label>
                      <span>{selectedContract?.contractNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Category</label>
                      <span className={`category-badge ${getCategoryClass(selectedContract?.category)}`}>{selectedContract?.category}</span>
                    </div>
                    <div className="detail-item">
                      <label>Department</label>
                      <span>{selectedContract?.department}</span>
                    </div>
                    <div className="detail-item">
                      <label>Owner</label>
                      <span>{selectedContract?.owner}</span>
                    </div>
                    <div className="detail-item">
                      <label>Contract Value</label>
                      <span>{selectedContract?.value}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status</label>
                      <span className={`status-badge ${getStatusClass(selectedContract?.status)}`}>
                        <span className="status-dot"></span>
                        {selectedContract?.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h3 className="detail-section-title">Parties</h3>
                  <div className="parties-list">
                    {selectedContract?.parties?.map((party, index) => (
                      <div key={index} className="party-item">{party}</div>
                    ))}
                  </div>
                </div>
                <div className="detail-section">
                  <h3 className="detail-section-title">Dates</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Start Date</label>
                      <span>{selectedContract?.startDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>End Date</label>
                      <span>{selectedContract?.endDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Renewal Date</label>
                      <span>{selectedContract?.renewalDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Created Date</label>
                      <span>{selectedContract?.createdDate}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h3 className="detail-section-title">Description</h3>
                  <p className="detail-description">{selectedContract?.description}</p>
                </div>
                <div className="detail-section">
                  <h3 className="detail-section-title">Tags</h3>
                  <div className="tags-list">
                    {selectedContract?.tags?.map((tag, index) => (
                      <span key={index} className="tag-item">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Versions' && (
              <div className="versions-tab-content">
                <div className="versions-header">
                  <h3 className="versions-title">Version History</h3>
                  <button className="btn btn-primary btn-sm">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" style={{marginRight: 6}}>
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    New Version
                  </button>
                </div>
                <div className="versions-list">
                  <div className="version-item current">
                    <div className="version-header">
                      <span className="version-number">{selectedContract?.version}</span>
                      <span className="version-current-badge">Current</span>
                    </div>
                    <div className="version-details">
                      <p className="version-description">Current active version of the contract</p>
                      <div className="version-meta">
                        <span>Created by: {selectedContract?.owner}</span>
                        <span>Created on: {selectedContract?.createdDate}</span>
                      </div>
                    </div>
                    <div className="version-actions">
                      <button className="version-btn">View</button>
                      <button className="version-btn">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Activity' && (
              <div className="activity-tab-content">
                <h3 className="activity-title">Activity Timeline</h3>
                <div className="activity-timeline">
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <span className="activity-event">Contract Created</span>
                        <span className="activity-date">{selectedContract?.createdDate}</span>
                      </div>
                      <p className="activity-description">Contract was created by {selectedContract?.owner}</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <span className="activity-event">Last Modified</span>
                        <span className="activity-date">{selectedContract?.modifiedDate}</span>
                      </div>
                      <p className="activity-description">Contract was last modified</p>
                    </div>
                  </div>
                  {selectedContract?.status === 'Under Review' && (
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <span className="activity-event">Submitted for Review</span>
                          <span className="activity-date">{selectedContract?.modifiedDate}</span>
                        </div>
                        <p className="activity-description">Contract submitted to legal team for review</p>
                      </div>
                    </div>
                  )}
                  {selectedContract?.status === 'Active' && (
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <span className="activity-event">Contract Approved</span>
                          <span className="activity-date">{selectedContract?.modifiedDate}</span>
                        </div>
                        <p className="activity-description">Contract approved and activated</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn primary">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit Contract
            </button>
            <button className="action-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download
            </button>
            <button className="action-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
              </svg>
              Duplicate
            </button>
            <button className="action-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
              Archive
            </button>
            <button className="action-btn danger">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadContractModal ref={uploadModalRef} onContractUploaded={onContractUploaded} />
      <CreateContractModal ref={createModalRef} onContractCreated={onContractCreated} />
      <FilterPanel ref={filterPanelRef} onFiltersChanged={onFiltersChanged} onFiltersReset={onFiltersReset} />
    </div>
  )
}

export default ContractRepository
