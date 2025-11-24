import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationInfoService } from './authorization-info-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authInfoService = inject(AuthorizationInfoService);
  const authInfo = authInfoService.authorizationInfo();

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
