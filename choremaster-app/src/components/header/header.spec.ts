import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideZonelessChangeDetection } from '@angular/core';
import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  const mockSocialAuthServiceConfig: SocialAuthServiceConfig = {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('mock-client-id'),
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: SOCIAL_AUTH_CONFIG,
          useValue: mockSocialAuthServiceConfig
        }
      ],
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
