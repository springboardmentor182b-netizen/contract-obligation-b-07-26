import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly showPassword = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  private returnUrl = '/dashboard';

  // ── Left panel data ───────────────────────────────────────────────────────

  features = [
    {
      icon: '🔐',
      title: 'Secure Authentication',
      desc: 'JWT-based login with token refresh and role-based access control',
    },
    {
      icon: '📄',
      title: 'Contract Management',
      desc: 'Create, track and archive contracts with full version control',
    },
    {
      icon: '⏰',
      title: 'Obligation Tracking',
      desc: 'Monitor due dates and obligations with automated reminders',
    },
    {
      icon: '✅',
      title: 'Compliance Monitoring',
      desc: 'Real-time compliance scoring and risk assessment',
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      desc: 'Email, SMS and in-app alerts for renewals and deadlines',
    },
  ];

  roles = [
    'Administrator',
    'Legal Manager',
    'Compliance Officer',
    'Contract Manager',
    'Department Head',
    'Employee',
  ];

  demoAccounts = [
    {
      email: 'admin@company.com',
      password: 'admin123',
      role: 'Administrator',
      color: 'bg-purple-600'
    },
    {
      email: 'legal@company.com',
      password: 'legal123',
      role: 'Legal Manager',
      color: 'bg-blue-600'
    },
    {
      email: 'contract@company.com',
      password: 'contract123',
      role: 'Contract Manager',
      color: 'bg-green-600'
    }
  ];

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  fillDemo(email: string, password: string): void {
    this.form.patchValue({ email, password });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate([this.returnUrl]);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
