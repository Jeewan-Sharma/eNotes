import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, LoaderService } from '@core/services';

export const authGuard: CanActivateFn = async (route, state) => {
  const _authService = inject(AuthService);
  const _loaderService = inject(LoaderService)
  const _router = inject(Router)

  _loaderService.showLoader()
  const isAuthenticated: boolean = await _authService.isAuthenticated()
  _loaderService.hideLoader()
  if (isAuthenticated) {
    return true;
  } else {
    _router.navigate(['auth/login']);
    return false
  }
};


