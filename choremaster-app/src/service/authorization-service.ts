import { Injectable, Signal, signal } from '@angular/core';
import { AuthorizationInfo } from '../model/authorization-info';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  authorizationInfo = signal<AuthorizationInfo | null>(null)

  constructor() {
    const localStorageAuthorization = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(localStorageAuthorization) {
      this.authorizationInfo.set(JSON.parse(localStorageAuthorization))
    }
    console.debug('loaded user', this.authorizationInfo()?.name)
  
  }

  setAuthorizationInfo(authorizationInfo: AuthorizationInfo) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authorizationInfo))
    this.authorizationInfo.set(authorizationInfo)
    console.debug('set info', authorizationInfo)
  }

  removeAuthorizationInfo() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    this.authorizationInfo.set(null)
  }

  getAuthorizationInfo(): Signal<AuthorizationInfo | null> {
    return this.authorizationInfo
  }
  
}

const LOCAL_STORAGE_KEY = "AUTHORIZATION_INFO"