import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, LoaderService } from '@core/services';

export const preventAuthGuard: CanActivateFn = async (route, state) => {
  const _loaderService = inject(LoaderService);
  const _authService = inject(AuthService);
  const _router = inject(Router);

  _loaderService.showLoader();
  const isAuthenticated: boolean = await _authService.isAuthenticated();
  _loaderService.hideLoader();
  if (isAuthenticated) {
    _router.navigate(['/']);
    return false;
  }
  return true;
};
