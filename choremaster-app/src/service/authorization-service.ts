import { inject, Injectable, Signal, signal } from '@angular/core';
import { AuthorizationInfo } from '../model/authorization-info';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserControllerService, UserDto } from '../client';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  authorizationInfo = signal<AuthorizationInfo | null>(null)
  socialAuthService = inject(SocialAuthService)
  userControllerService = inject(UserControllerService)

  constructor() {
    const localStorageAuthorization = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(localStorageAuthorization) {
      this.authorizationInfo.set(JSON.parse(localStorageAuthorization))
    }
    console.debug('loaded user', this.authorizationInfo()?.name)
  
    this.socialAuthService.authState.subscribe((user) => {
      console.debug('user changed', user)
      if(user.idToken) {
      const name = user.firstName? `${user.firstName} ${user.lastName}`: undefined
     this.setAuthorizationInfo({
      imgUrl: user.photoUrl,
      name: name,
      token: user.idToken,
      email: user.email!!
     })
      } else {
        this.removeAuthorizationInfo()
      }
    });
  }

  setAuthorizationInfo(authorizationInfo: AuthorizationInfo) {
     this.userControllerService.login(
      {email: authorizationInfo.email,
        name: authorizationInfo.email,
      }
    ).subscribe(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authorizationInfo))
    this.authorizationInfo.set(authorizationInfo)
    })
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