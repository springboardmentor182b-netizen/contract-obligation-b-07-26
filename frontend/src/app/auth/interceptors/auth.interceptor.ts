import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;

/**
 * Functional HTTP interceptor that:
 * 1. Attaches the Bearer access token to every API request.
 * 2. On 401, attempts a single token refresh and retries the original request.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  const addToken = (request: HttpRequest<unknown>): HttpRequest<unknown> => {
    const token = authService.getAccessToken();
    if (!token) return request;
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  };

  return next(addToken(req)).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only attempt refresh on 401 and not for auth endpoints themselves
      const isAuthEndpoint = req.url.includes('/auth/login') ||
                             req.url.includes('/auth/refresh');

      if (error.status === 401 && !isAuthEndpoint && !isRefreshing) {
        isRefreshing = true;
        return authService.refreshToken().pipe(
          switchMap(() => {
            isRefreshing = false;
            return next(addToken(req));
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
