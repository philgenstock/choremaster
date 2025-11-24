import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorizationService } from '../../app/service/authorization-service';
import { AuthorizationInfoService } from '../../app/service/authorization-info-service';
import { GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import { HouseholdSelect } from "../../app/components/household-select/household-select";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MatButtonModule, GoogleSigninButtonDirective, HouseholdSelect],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  authorizationService = inject(AuthorizationService)
  authorizationInfoService = inject(AuthorizationInfoService)

  logout() {
    this.authorizationService.removeAuthorizationInfo()
  }

}
