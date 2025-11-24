import { Injectable, Signal, signal } from '@angular/core';
import { AuthorizationInfo } from '../../model/authorization-info';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInfoService {

  authorizationInfo = signal<AuthorizationInfo | null>(null)

  getAuthorizationInfo(): Signal<AuthorizationInfo | null> {
    return this.authorizationInfo
  }
}
