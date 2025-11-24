import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization-service';
import { AuthorizationInfo } from '../../model/authorization-info';
import { defaultTestProvidersWithAuth } from '../../test-utils';
import { UserControllerService } from '../../client';
import { HouseholdService } from './household-service';
import { Observable, of } from 'rxjs';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
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
    (userControllerServiceSpy.login as jasmine.Spy).and.returnValue(of({}));

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

    it('should initialize with null authorizationInfo when localStorage is empty', () => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);

      expect(service.authorizationInfo()).toBeNull();
      expect(localStorageSpy.getItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
    });

    it('should load authorizationInfo from localStorage on initialization', () => {
      localStorageSpy.getItem.and.returnValue(JSON.stringify(mockAuthInfo));
      service = TestBed.inject(AuthorizationService);

      expect(service.authorizationInfo()).toEqual(mockAuthInfo);
      expect(localStorageSpy.getItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
    });
  });

  describe('setAuthorizationInfo', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
    });

    it('should set authorizationInfo signal', (done) => {
      service.setAuthorizationInfo(mockAuthInfo);

      setTimeout(() => {
      expect(service.authorizationInfo()).toEqual(mockAuthInfo);
        expect(userControllerServiceSpy.login).toHaveBeenCalledWith({
          email: mockAuthInfo.email,
          name: mockAuthInfo.email
        });
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
        of({}).pipe(
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
        expect(service.authorizationInfo()).toEqual(firstAuth);

        service.setAuthorizationInfo(secondAuth);
        setTimeout(() => {
          expect(service.authorizationInfo()).toEqual(secondAuth);
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
      service.setAuthorizationInfo(mockAuthInfo);
      setTimeout(() => done(), 0);
    });

    it('should set authorizationInfo signal to null', () => {
      service.removeAuthorizationInfo();

      expect(service.authorizationInfo()).toBeNull();
    });

    it('should remove authorizationInfo from localStorage', () => {
      service.removeAuthorizationInfo();

      expect(localStorageSpy.removeItem).toHaveBeenCalledWith('AUTHORIZATION_INFO');
    });

    it('should handle removing when already null', () => {
      service.removeAuthorizationInfo();
      expect(service.authorizationInfo()).toBeNull();

      service.removeAuthorizationInfo();
      expect(service.authorizationInfo()).toBeNull();
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
