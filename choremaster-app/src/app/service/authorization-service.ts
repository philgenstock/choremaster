import { inject, Injectable, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationInfo } from '../../model/authorization-info';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserControllerService } from '../../client';
import { HouseholdService } from './household-service';
import { AuthorizationInfoService } from './authorization-info-service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private authorizationInfoService = inject(AuthorizationInfoService)
  private socialAuthService = inject(SocialAuthService)
  private userControllerService = inject(UserControllerService)
  private householdService = inject(HouseholdService)
  private router = inject(Router)
  
  constructor() {
    const localStorageAuthorization = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(localStorageAuthorization) {
      const authInfo = JSON.parse(localStorageAuthorization);
      // Try to validate the token with the backend
      this.userControllerService.login(authInfo.token).subscribe({
        next: () => {
          // Token is still valid
          this.authorizationInfoService.authorizationInfo.set(authInfo)
          this.householdService.loadHouseholds()
        },
        error: () => {
          // Token is invalid or expired, remove it
          console.debug('Stored token is invalid or expired, removing from localStorage')
          this.removeAuthorizationInfo()
        }
      })
    }
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

    this.userControllerService.login(authorizationInfo.token).subscribe(() => {
      this.authorizationInfoService.authorizationInfo.set(authorizationInfo)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authorizationInfo))
      this.householdService.loadHouseholds()

      // Navigate to the return URL or dashboard after successful login
      const urlTree = this.router.parseUrl(this.router.url);
      const returnUrl = urlTree.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl)
    })
  }

  removeAuthorizationInfo() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    this.authorizationInfoService.authorizationInfo.set(null)
    this.householdService.resetHouseholds()
  }

  getAuthorizationInfo(): Signal<AuthorizationInfo | null> {
    return this.authorizationInfoService.authorizationInfo
  }
  
}

const LOCAL_STORAGE_KEY = "AUTHORIZATION_INFO"