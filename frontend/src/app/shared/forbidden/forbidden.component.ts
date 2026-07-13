import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white rounded-2xl shadow p-10 max-w-md w-full text-center">
        <p class="text-5xl mb-4">🔒</p>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p class="text-gray-500 text-sm mb-6">You don't have permission to view this page.</p>
        <a routerLink="/dashboard"
           class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition">
          Back to Dashboard
        </a>
      </div>
    </div>
  `,
})
export class ForbiddenComponent {}
