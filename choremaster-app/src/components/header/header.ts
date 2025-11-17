import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorizationService } from '../../service/authorization-service';
import { GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MatButtonModule, GoogleSigninButtonDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  authorizationService = inject(AuthorizationService)

  logout() {
    this.authorizationService.removeAuthorizationInfo()
  }

}
