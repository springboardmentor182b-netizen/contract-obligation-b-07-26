import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showPassword = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group(
    {
      full_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200), this.noNumbersValidator]],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirm_password: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  constructor() {}

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { confirm_password, ...payload } = this.form.getRawValue();

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMessage.set(
          'Account created! Please check your email to verify your account, then log in.'
        );
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/auth/login']), 2500);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  // ── Validators ────────────────────────────────────────────────────────────

  private noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    return /\d/.test(control.value) ? { noNumbers: true } : null;
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const v: string = control.value ?? '';
    const errors: ValidationErrors = {};
    if (!/[A-Z]/.test(v)) errors['noUppercase'] = true;
    if (!/\d/.test(v)) errors['noDigit'] = true;
    if (!/[!@#$%^&*()_+\-=\[\]{}|;':",./<>?]/.test(v)) errors['noSpecial'] = true;
    return Object.keys(errors).length ? errors : null;
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirm_password')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  // ── Field helpers for template ────────────────────────────────────────────

  get f() { return this.form.controls; }

  get currentYear(): number { return new Date().getFullYear(); }

  getPasswordErrors(): string[] {
    const errs = this.f.password.errors ?? {};
    const messages: string[] = [];
    if (errs['minlength']) messages.push('At least 8 characters');
    if (errs['noUppercase']) messages.push('One uppercase letter');
    if (errs['noDigit']) messages.push('One number');
    if (errs['noSpecial']) messages.push('One special character (!@#$%...)');
    return messages;
  }
}
