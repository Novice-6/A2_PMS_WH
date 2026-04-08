import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Server Configuration: The configuration for the server-side rendering of the application.
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};
// Merge the application configuration with the server configuration.
export const config = mergeApplicationConfig(appConfig, serverConfig);
