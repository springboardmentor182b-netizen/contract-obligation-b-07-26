import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Top Navigation Bar -->
      <nav class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-gray-900">ContractIQ</h1>
                <p class="text-xs text-gray-500 leading-none">Contract Obligation Platform</p>
              </div>
            </div>

            <!-- Right side: user info + logout -->
            <div class="flex items-center gap-4">
              <!-- Notifications -->
              <button class="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <!-- User Profile -->
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">{{ initials() }}</span>
                </div>
                <div class="hidden sm:block">
                  <p class="text-sm font-semibold text-gray-800">{{ user()?.full_name }}</p>
                  <p class="text-xs text-gray-500 capitalize">{{ roleLabel() }}</p>
                </div>
              </div>
              
              <!-- Logout Button -->
              <button (click)="logout()"
                class="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="hidden sm:inline font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">Welcome back, {{ getFirstName() }} 👋</h2>
              <p class="text-blue-100">
                You're logged in as <span class="font-semibold capitalize">{{ roleLabel() }}</span>
                <span *ngIf="user()?.department"> · {{ user()?.department }}</span>
              </p>
            </div>
            <div class="hidden md:flex flex-col items-end">
              <p class="text-blue-100 text-sm mb-1">Today's Date</p>
              <p class="font-semibold text-lg">{{ currentDate }}</p>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active Contracts</span>
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">—</p>
            <p class="text-xs text-gray-400">Module coming soon</p>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Obligations Due</span>
              <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">—</p>
            <p class="text-xs text-gray-400">Module coming soon</p>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Renewals Pending</span>
              <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">—</p>
            <p class="text-xs text-gray-400">Module coming soon</p>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Compliance Score</span>
              <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">—</p>
            <p class="text-xs text-gray-400">Module coming soon</p>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Account Info Card -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            <h3 class="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account Details
            </h3>

            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="text-sm text-gray-500">Full Name</span>
                <span class="text-sm font-medium text-gray-800">{{ user()?.full_name }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="text-sm text-gray-500">Email</span>
                <span class="text-sm font-medium text-gray-800 truncate ml-2">{{ user()?.email }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="text-sm text-gray-500">Role</span>
                <span class="text-xs font-semibold text-blue-600 capitalize px-3 py-1 bg-blue-50 rounded-full">
                  {{ roleLabel() }}
                </span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="text-sm text-gray-500">Department</span>
                <span class="text-sm font-medium text-gray-800">{{ user()?.department || 'Not Set' }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="text-sm text-gray-500">Status</span>
                <span class="text-xs font-semibold px-3 py-1 rounded-full"
                  [class.bg-green-50]="user()?.is_active"
                  [class.text-green-600]="user()?.is_active"
                  [class.bg-red-50]="!user()?.is_active"
                  [class.text-red-600]="!user()?.is_active">
                  {{ user()?.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-3">
                <span class="text-sm text-gray-500">Verified</span>
                <span class="text-sm font-medium" 
                  [class.text-green-600]="user()?.is_verified" 
                  [class.text-orange-500]="!user()?.is_verified">
                  {{ user()?.is_verified ? '✓ Verified' : '⏳ Pending' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modules Status Card -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            <h3 class="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Platform Modules
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div *ngFor="let mod of modules" 
                class="flex items-center gap-3 p-4 rounded-xl border transition hover:shadow-md cursor-pointer"
                [class.border-green-200]="mod.status === 'done'"
                [class.bg-green-50]="mod.status === 'done'"
                [class.border-gray-200]="mod.status !== 'done'"
                [class.bg-gray-50]="mod.status !== 'done'">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  [class.bg-green-100]="mod.status === 'done'"
                  [class.bg-gray-100]="mod.status !== 'done'">
                  <span class="text-2xl">{{ mod.icon }}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-gray-800 mb-1">{{ mod.name }}</p>
                  <span class="inline-block text-xs px-2 py-1 rounded-full font-medium"
                    [class.bg-green-200]="mod.status === 'done'"
                    [class.text-green-800]="mod.status === 'done'"
                    [class.bg-gray-200]="mod.status === 'pending'"
                    [class.text-gray-600]="mod.status === 'pending'">
                    {{ mod.status === 'done' ? '✓ Complete' : 'Coming soon' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Section -->
        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 text-white shadow-xl">
          <h3 class="text-xl font-bold mb-6">Quick Actions</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button class="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition group">
              <svg class="w-8 h-8 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-sm font-medium">New Contract</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition group">
              <svg class="w-8 h-8 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="text-sm font-medium">View Reports</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition group">
              <svg class="w-8 h-8 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="text-sm font-medium">Notifications</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition group">
              <svg class="w-8 h-8 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  user = signal<User | null>(null);
  currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  modules = [
    { name: 'User Auth & Roles', icon: '🔐', status: 'done' },
    { name: 'Contract Service', icon: '📄', status: 'pending' },
    { name: 'Obligation Service', icon: '⏰', status: 'pending' },
    { name: 'Renewal Service', icon: '🔄', status: 'pending' },
    { name: 'Compliance Service', icon: '✅', status: 'pending' },
    { name: 'Notification Service', icon: '🔔', status: 'pending' },
    { name: 'Report Service', icon: '📊', status: 'pending' },
    { name: 'Repository Service', icon: '📁', status: 'pending' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const current = this.authService.currentUser();
    if (current) {
      this.user.set(current);
    } else {
      this.authService.getProfile().subscribe({
        next: (u) => this.user.set(u),
        error: () => this.router.navigate(['/auth/login']),
      });
    }
  }

  initials(): string {
    const name = this.user()?.full_name ?? '';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  roleLabel(): string {
    return (this.user()?.role ?? '').replace(/_/g, ' ');
  }

  getFirstName(): string {
    return this.user()?.full_name?.split(' ')[0] ?? '';
  }

  logout(): void {
    this.authService.logout();
  }
}
