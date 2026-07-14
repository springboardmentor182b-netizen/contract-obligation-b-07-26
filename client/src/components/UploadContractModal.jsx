import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import './UploadContractModal.scss'

const UploadContractModal = forwardRef(({ onContractUploaded }, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [contractData, setContractData] = useState({
    title: '',
    description: '',
    category: 'Vendor',
    department: '',
    owner: '',
    startDate: '',
    endDate: '',
    value: ''
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

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true)
    }
  }))

  const close = () => {
    setIsVisible(false)
    resetForm()
  }

  const resetForm = () => {
    setContractData({
      title: '',
      description: '',
      category: 'Vendor',
      department: '',
      owner: '',
      startDate: '',
      endDate: '',
      value: ''
    })
    setSelectedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  const onDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    
    const files = event.dataTransfer?.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const onFileSelect = (event) => {
    const input = event.target
    if (input.files && input.files.length > 0) {
      handleFileSelect(input.files[0])
    }
  }

  const handleFileSelect = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document')
      return
    }

    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const uploadContract = () => {
    if (!selectedFile) {
      alert('Please select a file to upload')
      return
    }

    if (!contractData.title) {
      alert('Please enter a contract title')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          
          const newContract = {
            id: Date.now(),
            contractNumber: 'CON-' + Date.now().toString(36).toUpperCase(),
            title: contractData.title,
            description: contractData.description,
            category: contractData.category,
            status: 'Draft',
            department: contractData.department,
            owner: contractData.owner,
            renewalDate: contractData.endDate,
            version: 'v1.0',
            starred: false,
            fileSize: formatFileSize(selectedFile.size),
            pageCount: Math.floor(Math.random() * 20) + 5
          }

          onContractUploaded(newContract)
          close()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (!isVisible) return null

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Contract</h2>
          <button className="close-btn" onClick={close}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* File Upload Section */}
          <div className="upload-section">
            <div 
              className={`upload-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}>
              <input 
                type="file" 
                ref={fileInputRef}
                className="file-input"
                onChange={onFileSelect}
                accept=".pdf,.doc,.docx"
              />
              
              {!selectedFile ? (
                <div className="upload-placeholder">
                  <svg className="upload-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                    <path d="M24 32V16M24 16L18 22M24 16L30 22"/>
                    <path d="M8 40h32a2 2 0 002-2V10a2 2 0 00-2-2H16l-6 6v24a2 2 0 002 2z"/>
                  </svg>
                  <p className="upload-text">Drag and drop your file here</p>
                  <p className="upload-subtext">or click to browse</p>
                  <p className="upload-formats">Supported formats: PDF, DOC, DOCX</p>
                </div>
              ) : (
                <div className="file-preview">
                  <svg className="file-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor">
                    <path d="M8 4h16l8 8v24a2 2 0 01-2 2H10a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    <path d="M24 4v8h8"/>
                  </svg>
                  <div className="file-info">
                    <div className="file-name">{selectedFile.name}</div>
                    <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                  </div>
                  <button className="remove-file-btn" onClick={(e) => { removeFile(); e.stopPropagation(); }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path d="M6 6l8 8M14 6l-8 8"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <div className="progress-text">{uploadProgress}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Contract Details Form */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group full-width">
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
                <label>Department</label>
                <input 
                  type="text" 
                  value={contractData.department}
                  onChange={(e) => setContractData({ ...contractData, department: e.target.value })}
                  placeholder="Enter department"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Owner</label>
                <input 
                  type="text" 
                  value={contractData.owner}
                  onChange={(e) => setContractData({ ...contractData, owner: e.target.value })}
                  placeholder="Enter owner name"
                />
              </div>
              <div className="form-group">
                <label>Contract Value</label>
                <input 
                  type="text" 
                  value={contractData.value}
                  onChange={(e) => setContractData({ ...contractData, value: e.target.value })}
                  placeholder="Enter contract value"
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
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={close}>Cancel</button>
          <button 
            className="btn btn-primary" 
            onClick={uploadContract}
            disabled={isUploading || !selectedFile}>
            {isUploading ? 'Uploading...' : 'Upload Contract'}
          </button>
        </div>
      </div>
    </div>
  )
})

UploadContractModal.displayName = 'UploadContractModal'

export default UploadContractModal
