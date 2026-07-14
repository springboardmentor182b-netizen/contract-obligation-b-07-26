import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {
  isVisible = false;

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() filtersReset = new EventEmitter<void>();

  filters = {
    category: 'All',
    status: 'All',
    department: 'All',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    starred: false,
    archived: false
  };

  categories = [
    'All',
    'Vendor',
    'Service',
    'Employment',
    'Lease',
    'NDA',
    'Partnership',
    'Compliance',
    'Insurance'
  ];

  statuses = [
    'All',
    'Draft',
    'Under Review',
    'Approved',
    'Active',
    'Expired',
    'Terminated'
  ];

  departments = [
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
  ];

  dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  toggle() {
    this.isVisible = !this.isVisible;
  }

  close() {
    this.isVisible = false;
  }

  applyFilters() {
    this.filtersChanged.emit(this.filters);
    this.close();
  }

  resetFilters() {
    this.filters = {
      category: 'All',
      status: 'All',
      department: 'All',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      starred: false,
      archived: false
    };
    this.filtersReset.emit();
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.filters.category !== 'All') count++;
    if (this.filters.status !== 'All') count++;
    if (this.filters.department !== 'All') count++;
    if (this.filters.dateRange !== 'all') count++;
    if (this.filters.startDate || this.filters.endDate) count++;
    if (this.filters.starred) count++;
    if (this.filters.archived) count++;
    return count;
  }
}
