import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = {
    totalContracts: 150,
    activeContracts: 120,
    expiringSoon: 15,
    pendingApprovals: 8
  };

  recentActivities = [
    { id: 1, contract: 'CON-001', action: 'Created', user: 'John Doe', date: '2024-07-13' },
    { id: 2, contract: 'CON-002', action: 'Updated', user: 'Jane Smith', date: '2024-07-13' },
    { id: 3, contract: 'CON-003', action: 'Approved', user: 'Bob Johnson', date: '2024-07-12' },
    { id: 4, contract: 'CON-004', action: 'Archived', user: 'Alice Brown', date: '2024-07-12' }
  ];

  upcomingRenewals = [
    { id: 1, contract: 'CON-005', title: 'Service Agreement', renewalDate: '2024-07-20', daysLeft: 7 },
    { id: 2, contract: 'CON-006', title: 'Vendor Contract', renewalDate: '2024-07-25', daysLeft: 12 },
    { id: 3, contract: 'CON-007', title: 'Lease Agreement', renewalDate: '2024-08-01', daysLeft: 19 }
  ];
}
