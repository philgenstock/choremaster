import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { AuthorizationService } from './authorization-service';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AuthorizationInfo } from '../../model/authorization-info';
import { of } from 'rxjs';
import { AuthorizationInfoService } from './authorization-info-service';

describe('authInterceptor', () => {
  let mockAuthService: Partial<AuthorizationInfoService>;
  let mockNext: jasmine.Spy<HttpHandlerFn>;

  beforeEach(() => {
    mockAuthService = {
      authorizationInfo: signal<AuthorizationInfo | null>(null)
    };

    mockNext = jasmine.createSpy('HttpHandlerFn').and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthorizationService, useValue: mockAuthService }
      ]
    });
  });

  it('should add Authorization header when token is present', () => {
    // Given
    const authInfo: AuthorizationInfo = {
      token: 'test-token-123',
      name: 'Test User',
      email: 'test@example.com',
      imgUrl: 'https://example.com/image.jpg'
    };
    mockAuthService.authorizationInfo!.set(authInfo);

    const request = new HttpRequest('GET', '/api/test');

    // When
    TestBed.runInInjectionContext(() => {
      authInterceptor(request, mockNext);
    });

    // Then
    expect(mockNext).toHaveBeenCalledTimes(1);
    const interceptedRequest = mockNext.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(interceptedRequest.headers.has('Authorization')).toBe(true);
    expect(interceptedRequest.headers.get('Authorization')).toBe('Bearer test-token-123');
  });

  it('should not add Authorization header when token is null', () => {
    // Given
    mockAuthService.authorizationInfo!.set(null);
    const request = new HttpRequest('GET', '/api/test');

    // When
    TestBed.runInInjectionContext(() => {
      authInterceptor(request, mockNext);
    });

    // Then
    expect(mockNext).toHaveBeenCalledTimes(1);
    const interceptedRequest = mockNext.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(interceptedRequest.headers.has('Authorization')).toBe(false);
  });

});
