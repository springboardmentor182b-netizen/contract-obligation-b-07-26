import { useState, forwardRef, useImperativeHandle } from 'react'
import './FilterPanel.scss'

const FilterPanel = forwardRef(({ onFiltersChanged, onFiltersReset }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const [filters, setFilters] = useState({
    category: 'All',
    status: 'All',
    department: 'All',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    starred: false,
    archived: false
  })

  const categories = [
    'All',
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
    'All',
    'Draft',
    'Under Review',
    'Approved',
    'Active',
    'Expired',
    'Terminated'
  ]

  const departments = [
    'All',
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

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ]

  useImperativeHandle(ref, () => ({
    toggle: () => setIsVisible(!isVisible),
    close: () => setIsVisible(false)
  }))

  const close = () => {
    setIsVisible(false)
  }

  const resetFilters = () => {
    setFilters({
      category: 'All',
      status: 'All',
      department: 'All',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      starred: false,
      archived: false
    })
    onFiltersReset()
  }

  const applyFilters = () => {
    onFiltersChanged(filters)
    close()
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category !== 'All') count++
    if (filters.status !== 'All') count++
    if (filters.department !== 'All') count++
    if (filters.dateRange !== 'all') count++
    if (filters.startDate || filters.endDate) count++
    if (filters.starred) count++
    if (filters.archived) count++
    return count
  }

  if (!isVisible) return null

  return (
    <div className="filter-panel-overlay" onClick={close}>
      <div className="filter-panel-container" onClick={(e) => e.stopPropagation()}>
        <div className="filter-panel-header">
          <h2>Filters</h2>
          <div className="header-actions">
            <button className="text-btn" onClick={resetFilters}>Reset</button>
            <button className="close-btn" onClick={close}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="filter-panel-body">
          {/* Category Filter */}
          <div className="filter-section">
            <h3>Category</h3>
            <div className="filter-options">
              {categories.map(cat => (
                <label key={cat} className="filter-option">
                  <input 
                    type="radio" 
                    checked={filters.category === cat}
                    onChange={() => setFilters({ ...filters, category: cat })}
                  />
                  <span className="option-label">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-section">
            <h3>Status</h3>
            <div className="filter-options">
              {statuses.map(status => (
                <label key={status} className="filter-option">
                  <input 
                    type="radio" 
                    checked={filters.status === status}
                    onChange={() => setFilters({ ...filters, status: status })}
                  />
                  <span className="option-label">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div className="filter-section">
            <h3>Department</h3>
            <div className="filter-options">
              {departments.map(dept => (
                <label key={dept} className="filter-option">
                  <input 
                    type="radio" 
                    checked={filters.department === dept}
                    onChange={() => setFilters({ ...filters, department: dept })}
                  />
                  <span className="option-label">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="filter-section">
            <h3>Date Range</h3>
            <div className="filter-options">
              {dateRanges.map(range => (
                <label key={range.value} className="filter-option">
                  <input 
                    type="radio" 
                    checked={filters.dateRange === range.value}
                    onChange={() => setFilters({ ...filters, dateRange: range.value })}
                  />
                  <span className="option-label">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="filter-section">
              <h3>Custom Date Range</h3>
              <div className="date-range-inputs">
                <div className="date-input">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                </div>
                <div className="date-input">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Filters */}
          <div className="filter-section">
            <h3>Additional Filters</h3>
            <div className="checkbox-filters">
              <label className="checkbox-option">
                <input 
                  type="checkbox" 
                  checked={filters.starred}
                  onChange={(e) => setFilters({ ...filters, starred: e.target.checked })}
                />
                <span className="option-label">Starred Only</span>
              </label>
              <label className="checkbox-option">
                <input 
                  type="checkbox" 
                  checked={filters.archived}
                  onChange={(e) => setFilters({ ...filters, archived: e.target.checked })}
                />
                <span className="option-label">Include Archived</span>
              </label>
            </div>
          </div>
        </div>

        <div className="filter-panel-footer">
          <div className="active-filters">
            <span className="filter-count">{getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}</span>
          </div>
          <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>
    </div>
  )
})

FilterPanel.displayName = 'FilterPanel'

export default FilterPanel
