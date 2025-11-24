import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideZonelessChangeDetection } from '@angular/core';
import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { defaultTestProviders, defaultTestProvidersWithAuth } from '../../test-utils';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:defaultTestProvidersWithAuth,
      imports: [Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
