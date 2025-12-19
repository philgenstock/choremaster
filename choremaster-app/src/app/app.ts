import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../components/header/header';
import { RouterOutlet } from "@angular/router";
import { AuthorizationService } from './service/authorization-service';
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('choremaster-app');

  protected authorizationService = inject(AuthorizationService)
}
