import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';

export const preventAuthGuard: CanActivateFn = async (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router)

  const isAuthenticated: boolean = await _authService.isAuthenticated()
  if (isAuthenticated) {
    _router.navigate(['/']);
    return false;
  }
  return true
};
