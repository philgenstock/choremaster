import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';


const mockSocialAuthServiceConfig: SocialAuthServiceConfig = {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('mock-client-id'),
      },
    ],
  };

export const mockSocialAuthProvider = {
          provide: SOCIAL_AUTH_CONFIG,
          useValue: mockSocialAuthServiceConfig
}

export const defaultTestProviders= [
     provideZonelessChangeDetection(),
     provideHttpClient(),
     provideHttpClientTesting(),
     provideRouter([])
]

export const defaultTestProvidersWithAuth = [
  ... defaultTestProviders,
  mockSocialAuthProvider
]