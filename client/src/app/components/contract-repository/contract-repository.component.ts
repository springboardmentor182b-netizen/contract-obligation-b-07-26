import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadContractModalComponent } from '../upload-contract-modal/upload-contract-modal.component';
import { CreateContractModalComponent } from '../create-contract-modal/create-contract-modal.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';

@Component({
  selector: 'app-contract-repository',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadContractModalComponent, CreateContractModalComponent, FilterPanelComponent],
  templateUrl: './contract-repository.component.html',
  styleUrl: './contract-repository.component.scss'
})
export class ContractRepositoryComponent {
  stats = {
    totalContracts: 12,
    starred: 3,
    archived: 0
  };

  categories = [
    { name: 'All', icon: '📋', count: 12 },
    { name: 'Vendor', icon: '🏢', count: 4 },
    { name: 'Service', icon: '⚙️', count: 2 },
    { name: 'Employment', icon: '👥', count: 1 },
    { name: 'Lease', icon: '🏠', count: 1 },
    { name: 'NDA', icon: '🔒', count: 1 },
    { name: 'Partnership', icon: '🤝', count: 1 },
    { name: 'Compliance', icon: '✓', count: 1 },
    { name: 'Insurance', icon: '🛡️', count: 1 }
  ];

  selectedCategory = 'All';
  sortBy = 'modified';
  searchTerm = '';
  selectedContract: any = null;
  activeTab = 'Details';
  detailTabs = ['Details', 'Versions', 'Activity'];

  activeFilters = {
    category: 'All',
    status: 'All',
    department: 'All',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    starred: false,
    archived: false
  };

  @ViewChild(UploadContractModalComponent) uploadModal!: UploadContractModalComponent;
  @ViewChild(CreateContractModalComponent) createModal!: CreateContractModalComponent;
  @ViewChild(FilterPanelComponent) filterPanel!: FilterPanelComponent;

  contracts = [
    {
      id: 1,
      contractNumber: 'CON-001',
      title: 'Employment Agreement - John Doe',
      description: 'Full-time employment contract for Software Engineer position',
      category: 'Employment',
      status: 'Active',
      department: 'HR',
      owner: 'Sarah Johnson',
      renewalDate: '2025-01-15',
      version: 'v1.2',
      starred: true,
      fileSize: '2.4 MB',
      pageCount: 12,
      modifiedDate: '2024-01-15',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      contractNumber: 'CON-002',
      title: 'Vendor Agreement - Tech Corp',
      description: 'Software licensing and support agreement',
      category: 'Vendor',
      status: 'Under Review',
      department: 'Procurement',
      owner: 'Mike Chen',
      renewalDate: '2024-12-01',
      version: 'v1.0',
      starred: false,
      fileSize: '1.8 MB',
      pageCount: 8,
      modifiedDate: '2024-03-01',
      createdDate: '2024-02-15'
    },
    {
      id: 3,
      contractNumber: 'CON-003',
      title: 'Service Agreement - Cloud Services',
      description: 'Cloud infrastructure and hosting services',
      category: 'Service',
      status: 'Active',
      department: 'IT',
      owner: 'David Wilson',
      renewalDate: '2025-03-20',
      version: 'v2.1',
      starred: true,
      fileSize: '3.2 MB',
      pageCount: 15,
      modifiedDate: '2024-06-20',
      createdDate: '2024-05-10'
    },
    {
      id: 4,
      contractNumber: 'CON-004',
      title: 'Office Lease Agreement',
      description: 'Commercial office space lease for headquarters',
      category: 'Lease',
      status: 'Active',
      department: 'Facilities',
      owner: 'Emily Brown',
      renewalDate: '2025-06-01',
      version: 'v1.0',
      starred: false,
      fileSize: '4.1 MB',
      pageCount: 20,
      modifiedDate: '2024-04-01',
      createdDate: '2024-03-15'
    },
    {
      id: 5,
      contractNumber: 'CON-005',
      title: 'Non-Disclosure Agreement',
      description: 'Confidentiality agreement for project collaboration',
      category: 'NDA',
      status: 'Draft',
      department: 'Legal',
      owner: 'James Lee',
      renewalDate: '2024-11-30',
      version: 'v0.5',
      starred: false,
      fileSize: '0.5 MB',
      pageCount: 3,
      modifiedDate: '2024-10-30',
      createdDate: '2024-10-25'
    },
    {
      id: 6,
      contractNumber: 'CON-006',
      title: 'Strategic Partnership Agreement',
      description: 'Joint venture and partnership terms',
      category: 'Partnership',
      status: 'Under Review',
      department: 'Business Development',
      owner: 'Lisa Anderson',
      renewalDate: '2025-02-28',
      version: 'v1.1',
      starred: true,
      fileSize: '2.9 MB',
      pageCount: 14,
      modifiedDate: '2024-07-28',
      createdDate: '2024-06-15'
    },
    {
      id: 7,
      contractNumber: 'CON-007',
      title: 'Compliance Audit Report',
      description: 'Annual compliance and regulatory audit',
      category: 'Compliance',
      status: 'Active',
      department: 'Compliance',
      owner: 'Robert Taylor',
      renewalDate: '2025-01-01',
      version: 'v1.0',
      starred: false,
      fileSize: '1.5 MB',
      pageCount: 10,
      modifiedDate: '2024-08-01',
      createdDate: '2024-07-20'
    },
    {
      id: 8,
      contractNumber: 'CON-008',
      title: 'Insurance Policy - Liability',
      description: 'General liability insurance coverage',
      category: 'Insurance',
      status: 'Active',
      department: 'Risk Management',
      owner: 'Amanda White',
      renewalDate: '2025-04-15',
      version: 'v1.0',
      starred: false,
      fileSize: '2.1 MB',
      pageCount: 11,
      modifiedDate: '2024-09-15',
      createdDate: '2024-08-20'
    },
    {
      id: 9,
      contractNumber: 'CON-009',
      title: 'Vendor Agreement - Marketing Agency',
      description: 'Digital marketing and advertising services',
      category: 'Vendor',
      status: 'Active',
      department: 'Marketing',
      owner: 'Chris Martin',
      renewalDate: '2025-05-01',
      version: 'v1.2',
      starred: false,
      fileSize: '1.9 MB',
      pageCount: 9,
      modifiedDate: '2024-10-01',
      createdDate: '2024-09-10'
    },
    {
      id: 10,
      contractNumber: 'CON-010',
      title: 'Service Agreement - IT Support',
      description: 'Managed IT services and technical support',
      category: 'Service',
      status: 'Expired',
      department: 'IT',
      owner: 'David Wilson',
      renewalDate: '2024-10-01',
      version: 'v1.5',
      starred: false,
      fileSize: '2.7 MB',
      pageCount: 13,
      modifiedDate: '2024-09-01',
      createdDate: '2024-08-01'
    },
    {
      id: 11,
      contractNumber: 'CON-011',
      title: 'Vendor Agreement - Office Supplies',
      description: 'Office equipment and supplies procurement',
      category: 'Vendor',
      status: 'Active',
      department: 'Procurement',
      owner: 'Mike Chen',
      renewalDate: '2025-07-01',
      version: 'v1.0',
      starred: false,
      fileSize: '1.2 MB',
      pageCount: 6,
      modifiedDate: '2024-11-01',
      createdDate: '2024-10-15'
    },
    {
      id: 12,
      contractNumber: 'CON-012',
      title: 'Vendor Agreement - Security Services',
      description: 'Physical security and monitoring services',
      category: 'Vendor',
      status: 'Under Review',
      department: 'Security',
      owner: 'Tom Harris',
      renewalDate: '2025-08-15',
      version: 'v1.1',
      starred: false,
      fileSize: '2.3 MB',
      pageCount: 12,
      modifiedDate: '2024-12-15',
      createdDate: '2024-11-20'
    }
  ];

  filteredContracts = this.contracts;

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterContracts();
  }

  filterContracts() {
    this.filteredContracts = this.contracts.filter(contract => {
      const categoryMatch = this.selectedCategory === 'All' || contract.category === this.selectedCategory;
      const filterCategoryMatch = this.activeFilters.category === 'All' || contract.category === this.activeFilters.category;
      const filterStatusMatch = this.activeFilters.status === 'All' || contract.status === this.activeFilters.status;
      const filterDepartmentMatch = this.activeFilters.department === 'All' || contract.department === this.activeFilters.department;
      const filterStarredMatch = !this.activeFilters.starred || contract.starred;
      const searchMatch = !this.searchTerm || 
        contract.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.contractNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.owner.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return categoryMatch && filterCategoryMatch && filterStatusMatch && filterDepartmentMatch && filterStarredMatch && searchMatch;
    });

    this.sortContracts();
  }

  sortContracts() {
    this.filteredContracts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'modified':
        default:
          return new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime();
      }
    });
  }

  onSortChange() {
    this.sortContracts();
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.filterContracts();
  }

  selectContract(contract: any) {
    this.selectedContract = contract;
  }

  closeDetails() {
    this.selectedContract = null;
  }

  toggleStar(contractId: number, event: Event) {
    event.stopPropagation();
    const contract = this.contracts.find(c => c.id === contractId);
    if (contract) {
      contract.starred = !contract.starred;
      this.stats.starred = this.contracts.filter(c => c.starred).length;
    }
  }

  setView(view: string) {
    console.log('Set view:', view);
  }

  createNewContract() {
    this.createModal.open();
  }

  uploadContract() {
    this.uploadModal.open();
  }

  toggleFilter() {
    this.filterPanel.toggle();
  }

  onFiltersChanged(filters: any) {
    this.activeFilters = filters;
    this.filterContracts();
  }

  onFiltersReset() {
    this.activeFilters = {
      category: 'All',
      status: 'All',
      department: 'All',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      starred: false,
      archived: false
    };
    this.filterContracts();
  }

  onContractUploaded(contract: any) {
    this.contracts.unshift(contract);
    this.stats.totalContracts = this.contracts.length;
    this.filterContracts();
  }

  onContractCreated(contract: any) {
    this.contracts.unshift(contract);
    this.stats.totalContracts = this.contracts.length;
    this.filterContracts();
  }
}
