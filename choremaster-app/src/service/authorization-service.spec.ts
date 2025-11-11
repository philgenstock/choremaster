import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization-service';
import { AuthorizationInfo } from '../model/authorization-info';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  const mockAuthInfo: AuthorizationInfo = {
    token: 'test-token-123',
    name: 'Test User',
    imgUrl: 'https://example.com/avatar.jpg'
  };

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true
    });

    TestBed.configureTestingModule({ 
      providers: [provideZonelessChangeDetection()] 
    });
  });

  afterEach(() => {
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
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

    it('should set authorizationInfo signal', () => {
      service.setAuthorizationInfo(mockAuthInfo);

      expect(service.authorizationInfo()).toEqual(mockAuthInfo);
    });

    it('should save authorizationInfo to localStorage', () => {
      service.setAuthorizationInfo(mockAuthInfo);

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'AUTHORIZATION_INFO',
        JSON.stringify(mockAuthInfo)
      );
    });

    it('should update authorizationInfo when called multiple times', () => {
      const firstAuth: AuthorizationInfo = {
        token: 'token-1',
        name: 'User 1',
        imgUrl: 'url-1'
      };
      const secondAuth: AuthorizationInfo = {
        token: 'token-2',
        name: 'User 2',
        imgUrl: 'url-2'
      };

      service.setAuthorizationInfo(firstAuth);
      expect(service.authorizationInfo()).toEqual(firstAuth);

      service.setAuthorizationInfo(secondAuth);
      expect(service.authorizationInfo()).toEqual(secondAuth);
      expect(localStorageSpy.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('removeAuthorizationInfo', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(AuthorizationService);
      service.setAuthorizationInfo(mockAuthInfo);
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

    it('should return signal that reflects current authorizationInfo', () => {
      service.setAuthorizationInfo(mockAuthInfo);
      const signal = service.getAuthorizationInfo();

      expect(signal()).toEqual(mockAuthInfo);
    });

    it('should return signal that updates when authorizationInfo changes', () => {
      const signal = service.getAuthorizationInfo();
      expect(signal()).toBeNull();

      service.setAuthorizationInfo(mockAuthInfo);
      expect(signal()).toEqual(mockAuthInfo);

      service.removeAuthorizationInfo();
      expect(signal()).toBeNull();
    });
  });
});
