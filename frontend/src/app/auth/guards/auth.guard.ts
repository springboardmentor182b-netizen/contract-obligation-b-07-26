import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Guard that protects routes requiring authentication.
 * Redirects unauthenticated users to /auth/login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: router.url },
  });
  return false;
};

/**
 * Guard factory for role-based route protection.
 *
 * Usage in routes:
 *   canActivate: [roleGuard('administrator', 'legal_manager')]
 */
export const roleGuard = (...allowedRoles: UserRole[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      router.navigate(['/auth/login']);
      return false;
    }

    const role = auth.userRole();
    if (role && allowedRoles.includes(role)) {
      return true;
    }

    // Authenticated but wrong role → show 403 page
    router.navigate(['/forbidden']);
    return false;
  };
};
