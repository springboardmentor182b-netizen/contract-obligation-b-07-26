import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-contract-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-contract-modal.component.html',
  styleUrl: './create-contract-modal.component.scss'
})
export class CreateContractModalComponent {
  isVisible = false;
  isSaving = false;

  @Output() contractCreated = new EventEmitter<any>();

  contractData = {
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
  };

  categories = [
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
    'Draft',
    'Under Review',
    'Approved',
    'Active',
    'Expired',
    'Terminated'
  ];

  departments = [
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

  open() {
    this.isVisible = true;
    this.generateContractNumber();
  }

  close() {
    this.isVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.contractData = {
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
    };
    this.isSaving = false;
  }

  generateContractNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    this.contractData.contractNumber = `CON-${timestamp}`;
  }

  saveContract() {
    if (!this.contractData.title) {
      alert('Please enter a contract title');
      return;
    }

    this.isSaving = true;

    // Simulate save
    setTimeout(() => {
      this.isSaving = false;
      
      const newContract = {
        id: Date.now(),
        contractNumber: this.contractData.contractNumber,
        title: this.contractData.title,
        description: this.contractData.description,
        category: this.contractData.category,
        status: this.contractData.status,
        department: this.contractData.department,
        owner: this.contractData.owner,
        renewalDate: this.contractData.renewalDate || this.contractData.endDate,
        version: 'v1.0',
        starred: false,
        fileSize: '0.5 MB',
        pageCount: 5
      };

      this.contractCreated.emit(newContract);
      this.close();
    }, 1000);
  }

  onStatusChange() {
    // Auto-set status based on dates if needed
    if (this.contractData.status === 'Active' && !this.contractData.startDate) {
      this.contractData.startDate = new Date().toISOString().split('T')[0];
    }
  }
}
