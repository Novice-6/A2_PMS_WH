import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// Application Routes: The routes for the application.
import { routes } from './app.routes';
// Client Hydration: The configuration for the client-side hydration of the application.
import { provideClientHydration } from '@angular/platform-browser';

// Application Configuration: The configuration for the application.
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()]
};
