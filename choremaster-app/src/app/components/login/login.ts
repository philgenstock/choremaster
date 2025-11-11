import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, inject, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../service/authorization-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  _authService = inject(SocialAuthService);
  authorizationService = inject(AuthorizationService)
  user = this.authorizationService.authorizationInfo  

ngOnInit() {
    this._authService.authState.subscribe((user) => {
      const userName = user.firstName ?  user.firstName :'Unknown'
      console.debug('user changed', user)
      if(user.idToken) {
        this.authorizationService.setAuthorizationInfo({
          token: user.idToken,
          imgUrl: user.photoUrl,
          name: userName
      })
      } else {
        this.authorizationService.removeAuthorizationInfo()
      }
    });
  }
}
