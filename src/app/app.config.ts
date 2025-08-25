import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/app-title.strategy';
import { spotifyAuthInterceptor } from './shared/interceptors/spotify-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(MatIconModule),
    provideHttpClient(
      withFetch(),
      withInterceptors([spotifyAuthInterceptor]),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: AppTitleStrategy }
  ]
};
