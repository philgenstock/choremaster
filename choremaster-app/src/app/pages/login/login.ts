import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import { AuthorizationInfoService } from '../../service/authorization-info-service';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonDirective],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export default class Login implements OnInit {

  private authorizationInfoService = inject(AuthorizationInfoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // If user is already logged in, redirect to the intended page or dashboard
    if (this.authorizationInfoService.authorizationInfo()) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }
}
