import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from './authorization-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthorizationService);
  const authInfo = authService.authorizationInfo();

  if (authInfo?.token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authInfo.token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
