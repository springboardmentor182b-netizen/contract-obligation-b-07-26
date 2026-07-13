import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  User,
} from '../models/user.model';

const ACCESS_TOKEN_KEY = 'ciq_access_token';
const REFRESH_TOKEN_KEY = 'ciq_refresh_token';
const API = '/api/v1/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Reactive user state — components subscribe via currentUser()
  private readonly _currentUser = signal<User | null>(this.loadUserFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly userRole = computed(() => this._currentUser()?.role ?? null);

  constructor(private http: HttpClient, private router: Router) {}

  // ── Registration ──────────────────────────────────────────────────────────

  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${API}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  // ── Login ─────────────────────────────────────────────────────────────────

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${API}/login`, data).pipe(
      tap((res) => this.storeSession(res)),
      catchError(this.handleError)
    );
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  logout(): void {
    // Fire and forget — backend revokes refresh token
    this.http.post(`${API}/logout`, {}).subscribe();
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  // ── Token refresh ─────────────────────────────────────────────────────────

  refreshToken(): Observable<TokenResponse> {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refresh_token) {
      this.clearSession();
      return throwError(() => new Error('No refresh token'));
    }
    return this.http
      .post<TokenResponse>(`${API}/refresh`, { refresh_token })
      .pipe(
        tap((res) => this.storeSession(res)),
        catchError((err) => {
          this.clearSession();
          this.router.navigate(['/auth/login']);
          return throwError(() => err);
        })
      );
  }

  // ── Password reset ────────────────────────────────────────────────────────

  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${API}/password-reset/request`, { email })
      .pipe(catchError(this.handleError));
  }

  confirmPasswordReset(
    token: string,
    new_password: string
  ): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${API}/password-reset/confirm`, {
        token,
        new_password,
      })
      .pipe(catchError(this.handleError));
  }

  // ── Profile ───────────────────────────────────────────────────────────────

  getProfile(): Observable<User> {
    return this.http.get<User>(`${API}/me`).pipe(
      tap((user) => this._currentUser.set(user)),
      catchError(this.handleError)
    );
  }

  // ── Token helpers ─────────────────────────────────────────────────────────

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private storeSession(res: TokenResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, res.refresh_token);
    this._currentUser.set(res.user);
  }

  private clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this._currentUser.set(null);
  }

  private loadUserFromStorage(): User | null {
    // Restore user object from localStorage on page refresh
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;
    try {
      // Decode payload (no verification — server validates on each request)
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        return null;
      }
      return null; // Full profile loaded via getProfile() on app init
    } catch {
      return null;
    }
  }

  private handleError(error: any): Observable<never> {
    const message =
      error?.error?.detail ?? error?.message ?? 'An unexpected error occurred';
    return throwError(() => new Error(message));
  }
}
