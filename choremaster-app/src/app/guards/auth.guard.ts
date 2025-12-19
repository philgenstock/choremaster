import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationInfoService } from '../service/authorization-info-service';
import { AuthorizationService } from '../service/authorization-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authorizationInfoService = inject(AuthorizationInfoService);
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  if (authorizationService.isValidating()) {
    return true;
  }

  if (authorizationInfoService.authorizationInfo()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
