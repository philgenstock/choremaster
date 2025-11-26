import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { httpErrorInterceptor } from './http-error.interceptor';
import { provideZonelessChangeDetection } from '@angular/core';
import { throwError, of } from 'rxjs';

describe('httpErrorInterceptor', () => {
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let mockNext: jasmine.Spy<HttpHandlerFn>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockNext = jasmine.createSpy('HttpHandlerFn');

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
  });

  it('should show snackbar on 4xx error', (done) => {
    const errorMessage = 'Not found';
    const error = new HttpErrorResponse({
      error: { message: errorMessage },
      status: 404,
      statusText: 'Not Found',
      url: '/test'
    });

    mockNext.and.returnValue(throwError(() => error));
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(request, mockNext).subscribe({
        next: () => fail('should have failed'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(404);
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            errorMessage,
            'Close',
            jasmine.objectContaining({
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
          );
          done();
        }
      });
    });
  });

  it('should show snackbar on 5xx error', (done) => {
    const errorMessage = 'Internal server error';
    const error = new HttpErrorResponse({
      error: { message: errorMessage },
      status: 500,
      statusText: 'Internal Server Error',
      url: '/test'
    });

    mockNext.and.returnValue(throwError(() => error));
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(request, mockNext).subscribe({
        next: () => fail('should have failed'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(500);
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            errorMessage,
            'Close',
            jasmine.objectContaining({
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
          );
          done();
        }
      });
    });
  });

  it('should use default message when error has no message', (done) => {
    const error = new HttpErrorResponse({
      error: {},
      status: 400,
      statusText: 'Bad Request',
      url: '/test'
    });

    mockNext.and.returnValue(throwError(() => error));
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(request, mockNext).subscribe({
        next: () => fail('should have failed'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(400);
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            'Http failure response for /test: 400 Bad Request',
            'Close',
            jasmine.objectContaining({
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
          );
          done();
        }
      });
    });
  });

  it('should show snackbar when backend is unreachable', (done) => {
    const error = new HttpErrorResponse({
      error: 'Network error',
      status: 0,
      statusText: 'Unknown Error',
      url: '/test'
    });

    mockNext.and.returnValue(throwError(() => error));
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(request, mockNext).subscribe({
        next: () => fail('should have failed'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(0);
          expect(snackBarSpy.open).toHaveBeenCalledWith(
            'Unable to reach the server. Please check your connection and try again.',
            'Close',
            jasmine.objectContaining({
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
          );
          done();
        }
      });
    });
  });

  it('should not show snackbar on successful request', () => {
    const response = new HttpResponse({ status: 200, body: {} });
    mockNext.and.returnValue(of(response));
    const request = new HttpRequest('GET', '/test');

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(request, mockNext).subscribe({
        next: () => {
          expect(snackBarSpy.open).not.toHaveBeenCalled();
        },
        error: () => fail('should have succeeded')
      });
    });
  });
});
