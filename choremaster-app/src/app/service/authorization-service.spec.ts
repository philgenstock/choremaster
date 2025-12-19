import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization-service';
import { AuthorizationInfo } from '../../model/authorization-info';
import { defaultTestProvidersWithAuth } from '../../test-utils';
import { UserControllerService } from '../../client';
import { HouseholdService } from './household-service';
import { AuthorizationInfoService } from './authorization-info-service';
import { Observable, of, throwError } from 'rxjs';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let authorizationInfoService: AuthorizationInfoService;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let userControllerServiceSpy: jasmine.SpyObj<UserControllerService>;
  let householdServiceSpy: jasmine.SpyObj<HouseholdService>;

  const mockAuthInfo: AuthorizationInfo = {
    token: 'test-token-123',
    name: 'Test User',
    imgUrl: 'https://example.com/avatar.jpg',
    email: 'test@mail.de'
  };

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true
    });

    userControllerServiceSpy = jasmine.createSpyObj('UserControllerService', ['login']);
    (userControllerServiceSpy.login as jasmine.Spy).and.returnValue(of(undefined as any));

    householdServiceSpy = jasmine.createSpyObj('HouseholdService', ['loadHouseholds', 'resetHouseholds']);

    TestBed.configureTestingModule({
      providers: [
        ...defaultTestProvidersWithAuth,
        { provide: UserControllerService, useValue: userControllerServiceSpy },
        { provide: HouseholdService, useValue: householdServiceSpy }
      ]
    });
  });

  afterEach(() => {
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
    userControllerServiceSpy.login.calls.reset();
    householdServiceSpy.loadHouseholds.calls.reset();
    householdServiceSpy.resetHouseholds.calls.reset();
  });

  describe('constructor', () => {
    it('should be created', () => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      expect(service).toBeTruthy();
    });

    it('should initialize with null authorizationInfo when not validated yet', () => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      authorizationInfoService = TestBed.inject(AuthorizationInfoService);

      expect(authorizationInfoService.authorizationInfo()).toBeNull();
      expect(service.isValidating()).toBe(false);
    });
  });

  describe('validateStoredAuth', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      authorizationInfoService = TestBed.inject(AuthorizationInfoService);
    });

    it('should set isValidating to true during validation', async () => {
      localStorageSpy.getItem.and.returnValue(JSON.stringify(mockAuthInfo));
      userControllerServiceSpy.login.and.returnValue(of(undefined as any));

      const validationPromise = service.validateStoredAuth();
      expect(service.isValidating()).toBe(true);

      await validationPromise;
      expect(service.isValidating()).toBe(false);
    });

    it('should do nothing when localStorage is empty', async () => {
      localStorageSpy.getItem.and.returnValue(null);

      await service.validateStoredAuth();

      expect(authorizationInfoService.authorizationInfo()).toBeNull();
      expect(localStorageSpy.getItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
      expect(userControllerServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should load authorizationInfo from localStorage when token is valid', async () => {
      localStorageSpy.getItem.and.returnValue(JSON.stringify(mockAuthInfo));
      userControllerServiceSpy.login.and.returnValue(of(undefined as any));

      await service.validateStoredAuth();

      expect(authorizationInfoService.authorizationInfo()).toEqual(mockAuthInfo);
      expect(localStorageSpy.getItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
      expect(userControllerServiceSpy.login).toHaveBeenCalledWith(mockAuthInfo.token);
      expect(householdServiceSpy.loadHouseholds).toHaveBeenCalledTimes(1);
    });

    it('should remove expired token from localStorage', async () => {
      const expiredAuthInfo: AuthorizationInfo = {
        token: 'expired-token',
        name: 'Test User',
        imgUrl: 'https://example.com/avatar.jpg',
        email: 'test@mail.de'
      };
      localStorageSpy.getItem.and.returnValue(JSON.stringify(expiredAuthInfo));
      userControllerServiceSpy.login.and.returnValue(
        throwError(() => ({ status: 401, message: 'Unauthorized' }))
      );

      await service.validateStoredAuth();

      expect(authorizationInfoService.authorizationInfo()).toBeNull();
      expect(userControllerServiceSpy.login).toHaveBeenCalledWith(expiredAuthInfo.token);
      expect(localStorageSpy.removeItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
    });

    it('should set isValidating to false even when validation fails', async () => {
      localStorageSpy.getItem.and.returnValue(JSON.stringify(mockAuthInfo));
      userControllerServiceSpy.login.and.returnValue(
        throwError(() => ({ status: 500, message: 'Server error' }))
      );

      await service.validateStoredAuth();

      expect(service.isValidating()).toBe(false);
    });
  });

  describe('setAuthorizationInfo', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      authorizationInfoService = TestBed.inject(AuthorizationInfoService);
    });

    it('should set authorizationInfo signal', (done) => {
      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
      expect(authorizationInfoService.authorizationInfo()).toEqual(mockAuthInfo);
        expect(userControllerServiceSpy.login).toHaveBeenCalledWith(mockAuthInfo.token);
        done();
      }, 0);
    });

    it('should save authorizationInfo to localStorage', (done) => {
      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
        expect(localStorageSpy.setItem).toHaveBeenCalledWith(
          'AUTHORIZATION_INFO',
          JSON.stringify(mockAuthInfo)
        );
        done();
      }, 0);
    });

    it('should call loadHouseholds on household service when setting authorization info', (done) => {
      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
        expect(householdServiceSpy.loadHouseholds).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    });

    it('should call login and then loadHouseholds in correct order', (done) => {
      let loginCalled = false;
      (userControllerServiceSpy.login as jasmine.Spy).and.returnValue(
        of(undefined as any).pipe(
          // Use tap to verify order
          (source) => {
            return new Observable(observer => {
              source.subscribe({
                next: (value) => {
                  loginCalled = true;
                  observer.next(value);
                },
                error: (err) => observer.error(err),
                complete: () => observer.complete()
              });
            });
          }
        )
      );

      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
        expect(loginCalled).toBe(true);
        expect(householdServiceSpy.loadHouseholds).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    });

    it('should update authorizationInfo when called multiple times', (done) => {
      const firstAuth: AuthorizationInfo = {
        token: 'token-1',
        name: 'User 1',
        imgUrl: 'url-1',
        email: 'user-1@mail.de'
      };
      const secondAuth: AuthorizationInfo = {
        token: 'token-2',
        name: 'User 2',
        imgUrl: 'url-2',
        email: 'user-2@mail.de'
      };

      service.setAuthorizationInfo(firstAuth);

      setTimeout(() => {
        expect(authorizationInfoService.authorizationInfo()).toEqual(firstAuth);

        service.setAuthorizationInfo(secondAuth);
        setTimeout(() => {
          expect(authorizationInfoService.authorizationInfo()).toEqual(secondAuth);
          expect(localStorageSpy.setItem).toHaveBeenCalledTimes(2);
          done();
        }, 0);
      }, 0);
    });
  });

  describe('removeAuthorizationInfo', () => {
    beforeEach((done) => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      authorizationInfoService = TestBed.inject(AuthorizationInfoService);
      service.setAuthorizationInfo(mockAuthInfo);
      setTimeout(() => done(), 0);
    });

    it('should set authorizationInfo signal to null', () => {
      service.removeAuthorizationInfo();

      expect(authorizationInfoService.authorizationInfo()).toBeNull();
    });

    it('should remove authorizationInfo from localStorage', () => {
      service.removeAuthorizationInfo();

      expect(localStorageSpy.removeItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
    });

    it('should handle removing when already null', () => {
      service.removeAuthorizationInfo();
      expect(authorizationInfoService.authorizationInfo()).toBeNull();

      service.removeAuthorizationInfo();
      expect(authorizationInfoService.authorizationInfo()).toBeNull();
      expect(localStorageSpy.removeItem).toHaveBeenCalledTimes(2);
    });

    it('should call resetHouseholds on household service when removing authorization info', () => {
      service.removeAuthorizationInfo();

      expect(householdServiceSpy.resetHouseholds).toHaveBeenCalledTimes(1);
    });

    it('should call resetHouseholds every time removeAuthorizationInfo is called', () => {
      service.removeAuthorizationInfo();
      service.removeAuthorizationInfo();

      expect(householdServiceSpy.resetHouseholds).toHaveBeenCalledTimes(2);
    });
  });

  describe('getAuthorizationInfo', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      authorizationInfoService = TestBed.inject(AuthorizationInfoService);
    });

    it('should return the authorizationInfo signal', () => {
      const signal = service.getAuthorizationInfo();

      expect(signal()).toBeNull();
    });

    it('should return signal that reflects current authorizationInfo', (done) => {
      service.setAuthorizationInfo(mockAuthInfo);
      const signal = service.getAuthorizationInfo();

      setTimeout(() => {
        expect(signal()).toEqual(mockAuthInfo);
        done();
      }, 0);
    });

    it('should return signal that updates when authorizationInfo changes', (done) => {
      const signal = service.getAuthorizationInfo();
      expect(signal()).toBeNull();

      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
        expect(signal()).toEqual(mockAuthInfo);

        service.removeAuthorizationInfo();
        expect(signal()).toBeNull();
        done();
      }, 0);
    });
  });
});
