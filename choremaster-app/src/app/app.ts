import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../components/header/header';
import { SocialAuthService, SocialUser, GoogleSigninButtonDirective, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthorizationService } from '../service/authorization-service';
import { Login } from './components/login/login';
@Component({
  selector: 'app-root',
  imports: [Header, Login  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
  
})
export class App{
  protected readonly title = signal('choremaster-app');

}
