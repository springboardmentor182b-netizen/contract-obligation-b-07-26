import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-contract-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-contract-modal.component.html',
  styleUrl: './upload-contract-modal.component.scss'
})
export class UploadContractModalComponent {
  isVisible = false;
  isDragging = false;
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;
  fileInput: any;

  @Output() contractUploaded = new EventEmitter<any>();

  contractData = {
    title: '',
    description: '',
    category: 'Vendor',
    department: '',
    owner: '',
    startDate: '',
    endDate: '',
    value: ''
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

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.contractData = {
      title: '',
      description: '',
      category: 'Vendor',
      department: '',
      owner: '',
      startDate: '',
      endDate: '',
      value: ''
    };
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.isUploading = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelect(files[0]);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelect(input.files[0]);
    }
  }

  handleFileSelect(file: File) {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    this.selectedFile = file;
  }

  removeFile() {
    this.selectedFile = null;
  }

  uploadContract() {
    if (!this.selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!this.contractData.title) {
      alert('Please enter a contract title');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate upload progress
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
        
        const newContract = {
          id: Date.now(),
          contractNumber: 'CON-' + Date.now().toString(36).toUpperCase(),
          title: this.contractData.title,
          description: this.contractData.description,
          category: this.contractData.category,
          status: 'Draft',
          department: this.contractData.department,
          owner: this.contractData.owner,
          renewalDate: this.contractData.endDate,
          version: 'v1.0',
          starred: false,
          fileSize: this.formatFileSize(this.selectedFile!.size),
          pageCount: Math.floor(Math.random() * 20) + 5
        };

        this.contractUploaded.emit(newContract);
        this.close();
      }
    }, 200);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
