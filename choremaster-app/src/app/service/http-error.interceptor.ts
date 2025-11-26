import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      // Handle network errors (backend unreachable)
      if (error.status === 0) {
        message = 'Unable to reach the server. Please check your connection and try again.';
      }
      // Handle HTTP errors (4xx and 5xx)
      else if (error.status >= 400) {
        message = error.error?.message || error.message || 'An unexpected error occurred';
      } else {
        // For any other error types
        message = error.message || 'An unexpected error occurred';
      }

      snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

      return throwError(() => error);
    })
  );
};
